<script lang="ts">
	import '../app.css'
	import { page } from '$app/state'

	let { children } = $props()

	const url = $derived(page.url.origin)
	const title = 'Noah Zinsmeister'
	const description = "Noah Zinsmeister's personal website."
</script>

<svelte:head>
	<!-- url -->
	<meta property="og:url" content={url} />

	<!-- title -->
	<title>{title}</title>
	<meta property="og:title" content={title} />

	<!-- description -->
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
</svelte:head>

{@render children()}
