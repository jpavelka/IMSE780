<script lang="ts">
    import katex from "katex";
    import { macros } from "./latexMacros";
    import { eqReferenced, printMode } from "./stores";
    import { afterUpdate } from "svelte";

    export let options;
    export let fontSize;
    export let refId: string = '';
    export let extraStyle = "";
    export let math = undefined;
    export let mouseOverFunction = undefined;
    export let mouseOutFunction = undefined;
    export let alwaysRender = false;

    let data: HTMLElement;

    $: style = `font-size:${fontSize}em;` + extraStyle;
    let s: string
    $: {
        s = math || `${data?.innerText}`;
        s = s.replaceAll("{:underscore:}", "_");
    }
    options = { ...options, ...{ macros: macros } };

    $: seen = false;
    $: if ($eqReferenced.includes(refId)) {
        seen = true;
    }
    let posEl: HTMLElement;
    let pos: number;
    let scrollY: number;
    let innerHeight: number;
    afterUpdate(() => {
        pos = (posEl || { offsetTop: 0 }).offsetTop;
        if (pos > 0 && Math.abs(pos - scrollY) <= 2 * innerHeight) {
            seen = true;
        }
    });
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
    {style}
    role=button
    tabindex="0"
    on:mouseover={mouseOverFunction}
    on:mouseout={mouseOutFunction}
    on:focus={mouseOverFunction}
    on:blur={mouseOutFunction}
>
    {#if seen || $printMode || alwaysRender}
        {@html katex.renderToString(s, options)}
    {:else}
        <span class=notRendered>{s}</span>
    {/if}
</span>

<style>
    .notRendered {
        word-wrap: break-word;
    }
</style>
