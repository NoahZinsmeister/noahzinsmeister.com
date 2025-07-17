<script lang="ts">
	import '../../app.css'
	import { page } from '$app/state'

	let { children } = $props()

	const url = $derived(page.url.origin)
	const title = 'Noah Zinsmeister Photography'
	const description = "Noah Zinsmeister's photography portfolio."
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
