<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js'
	import * as Carousel from '$lib/components/ui/carousel/index.js'

	let dialogIsOpen = $state(false)
	let dialogContent: 'URBAN' | 'FOOD' | 'NATURE' | 'BUILDINGS' = $state('URBAN')
</script>

<h1 class="text-4xl font-bold"><a href="/">Noah<br />Zinsmeister</a><br />Photography</h1>

<Dialog.Root bind:open={dialogIsOpen}>
	<div class="flex flex-grow flex-row flex-wrap items-center justify-around gap-8 p-16">
		<Dialog.Trigger onclick={() => (dialogContent = 'URBAN')} class="h-fit">
			<div
				class="flex aspect-[3/2] w-64 cursor-pointer items-center justify-center rounded-2xl bg-cover bg-center text-4xl text-white"
				style="background-image: url('/urban0.jpg');"
			>
				<span class="rounded-2xl p-2 backdrop-blur-[2px]">Urban</span>
			</div>
		</Dialog.Trigger>
		<Dialog.Trigger onclick={() => (dialogContent = 'FOOD')} class="h-fit">
			<div
				class="flex aspect-[3/2] w-64 cursor-pointer items-center justify-center rounded-2xl bg-cover bg-center text-4xl text-white"
				style="background-image: url('/food0.jpg');"
			>
				<span class="rounded-2xl p-2 backdrop-blur-[2px]">Food</span>
			</div>
		</Dialog.Trigger>
		<Dialog.Trigger onclick={() => (dialogContent = 'NATURE')} class="h-fit">
			<div
				class="flex aspect-[3/2] w-64 cursor-pointer items-center justify-center rounded-2xl bg-cover bg-center text-4xl text-white"
				style="background-image: url('/nature0.jpg');"
			>
				<span class="rounded-2xl p-2 backdrop-blur-[2px]">Nature</span>
			</div>
		</Dialog.Trigger>
		<Dialog.Trigger onclick={() => (dialogContent = 'BUILDINGS')} class="h-fit">
			<div
				class="flex aspect-[3/2] w-64 cursor-pointer items-center justify-center rounded-2xl bg-cover bg-center text-4xl text-white"
				style="background-image: url('/buildings0.jpg');"
			>
				<span class="rounded-2xl p-2 backdrop-blur-[2px]">Buildings</span>
			</div>
		</Dialog.Trigger>
		<Dialog.Content
			showCloseButton={false}
			class="max-w-[85svw] min-w-[85svw] border-none bg-transparent shadow-none"
		>
			<Carousel.Root
				opts={{
					loop: true
				}}
			>
				<Carousel.Content class="flex items-center">
					{#if dialogContent === 'URBAN'}
						{#each Array(8), i}
							<Carousel.Item class="flex justify-center">
								<img class="max-h-[95svh]" src={`/urban${i}.jpg`} alt={`Urban ${i}`} />
							</Carousel.Item>
						{/each}
					{:else if dialogContent === 'FOOD'}
						{#each Array(8), i}
							<Carousel.Item class="flex justify-center">
								<img class="max-h-[95svh]" src={`/food${i}.jpg`} alt={`Food ${i}`} />
							</Carousel.Item>
						{/each}
					{:else if dialogContent === 'NATURE'}
						{#each Array(11), i}
							<Carousel.Item class="flex justify-center">
								<img class="max-h-[95svh]" src={`/nature${i}.jpg`} alt={`Nature ${i}`} />
							</Carousel.Item>
						{/each}
					{:else if dialogContent === 'BUILDINGS'}
						{#each Array(7), i}
							<Carousel.Item class="flex justify-center">
								<img class="max-h-[95svh]" src={`/buildings${i}.jpg`} alt={`Buildings ${i}`} />
							</Carousel.Item>
						{/each}
					{/if}
				</Carousel.Content>
				<Carousel.Previous class="cursor-pointer" />
				<Carousel.Next class="cursor-pointer" />
			</Carousel.Root>
		</Dialog.Content>
	</div>
</Dialog.Root>
