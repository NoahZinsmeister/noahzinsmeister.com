import path from 'path'
import request from 'request-promise-native'
import pinataSDK from '@pinata/sdk'

const DOMAIN = 'noahzinsmeister.com'
const PINATA_NAME = 'noahzinsmeister.com'

const DNSLINK_REGEX = new RegExp(/dnslink=\/ipfs\/(.*)/)

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY)

async function main() {
  // get the existing dnslink record from zeit
  const record = await request
    .get(`https://api.zeit.co/v2/domains/${DOMAIN}/records`, {
      auth: {
        bearer: process.env.ZEIT_TOKEN
      },
      json: true
    })
    .then(({ records }) => {
      const record = records.filter(record => record.name === '_dnslink')[0]
      console.log('Successfully retrieved existing DNS record', record)
      return record
    })
  const existingHash = record.value.match(DNSLINK_REGEX)[1]
  // get the new ipfs hash from pinata and pin
  const newHash = await pinata
    .pinFromFS(path.join(__dirname, 'out'), { pinataMetadata: { name: PINATA_NAME } })
    .then(({ IpfsHash: hash }) => {
      console.log('Successfully pinned new files', hash)
      return hash
    })
  if (newHash !== existingHash) {
    // stop pinning the existing ipfs hash on pinata
    await pinata.removePinFromIPFS(existingHash).then(() => {
      console.log('Successfully unpinned existing files')
    })
    // delete the existing dnslink record from zeit
    await request
      .delete(`https://api.zeit.co/v2/domains/${DOMAIN}/records/${record.id}`, {
        auth: {
          bearer: process.env.ZEIT_TOKEN
        },
        json: true
      })
      .then(() => {
        console.log('Successfully deleted existing DNS record')
      })
    // add the new dnslink record to zeit
    await request
      .post(`https://api.zeit.co/v2/domains/${DOMAIN}/records`, {
        auth: {
          bearer: process.env.ZEIT_TOKEN
        },
        json: true,
        body: {
          name: '_dnslink',
          type: 'TXT',
          value: `dnslink=/ipfs/${newHash}`
        }
      })
      .then(() => {
        console.log('Successfully added new DNS record')
      })
  }
}

main()
