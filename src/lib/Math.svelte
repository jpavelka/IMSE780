<script lang="ts">
	import KatexDisp from "./KatexDisp.svelte";

	export let fontSize = 0.9;
	export let extraStyle = '';
	export let mouseOverFunction = undefined;
	export let mouseOutFunction = undefined;
	const options = {
		displayMode: false,
		throwOnError: false,
	};
</script>

<KatexDisp {options} {fontSize} {extraStyle} {mouseOverFunction} {mouseOutFunction}>
	<slot />
</KatexDisp>
