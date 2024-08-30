<script lang="ts">
    import katex from "katex";
    import { macros } from "./latexMacros.ts";
    import { eqReferenced } from './stores';
    import { afterUpdate } from 'svelte';

    export let options;
    export let fontSize;
    export let refId = undefined;
    export let extraStyle = '';
    export let math = undefined;
	export let mouseOverFunction = undefined;
	export let mouseOutFunction = undefined;
    
    let data;

    $: style = `font-size:${fontSize}em;` + extraStyle;
    $: s = math || `${data?.innerText}`;
    $: s = s.replaceAll('{:underscore:}', '_');
    options = {...options, ...{macros: macros}}
    
    $: katexString = katex.renderToString(s, options);
    $: seen = false
    $: if ($eqReferenced.includes(refId)) {
        seen = true;
    }
    let posEl;
    let pos;
    let scrollY;
    let innerHeight
    afterUpdate(() => {
		pos = posEl.offsetTop;
	});
    $: if (Math.abs(pos - scrollY) <= 2 * innerHeight) {
        seen = true;
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossorigin="anonymous"
    />
</svelte:head>

<span style="display:none" bind:this={data}><slot /></span>
<svelte:window bind:scrollY bind:innerHeight />
<span
    bind:this={posEl}
    style={style}
    on:mouseover={mouseOverFunction}
    on:mouseout={mouseOutFunction}
>
    {#if seen}
        {@html katexString}
    {:else}
        {s}
    {/if}
</span>
