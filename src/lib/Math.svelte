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
	let el;
	$: {
		if (!!el) {
			alwaysRender = [...el.parentElement.classList].includes("headingData");
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
