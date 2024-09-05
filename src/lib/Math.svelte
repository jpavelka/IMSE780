<script lang="ts">
	import KatexDisp from "./KatexDisp.svelte";

	export let fontSize = 0.9;
	export let extraStyle = "";
	export let mouseOverFunction = undefined;
	export let mouseOutFunction = undefined;
	export let alwaysRender = false;
	const options = {
		displayMode: false,
		throwOnError: false,
	};
	let el: HTMLElement;
	$: {
		if (!!el) {
			const parent = el.parentElement || {classList: []};
			alwaysRender = ![...parent.classList].includes('bodyText');
		}
	}
</script>

<span bind:this={el}></span>
<KatexDisp
	{options}
	{fontSize}
	{extraStyle}
	{mouseOverFunction}
	{mouseOutFunction}
	{alwaysRender}
>
	<slot />
</KatexDisp>
