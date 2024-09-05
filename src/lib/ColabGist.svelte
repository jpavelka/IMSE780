<script lang='ts'>
    import { refNumbering } from "$lib";
    import BodyText from "./BodyText.svelte";
    import { notebooks, printMode } from "./stores";
    import { afterUpdate } from 'svelte';

    export let colabId
    export let gistId
    export let refId
    export let desc

    const toHex = (s: string) => {
        s = decodeURIComponent(encodeURIComponent(s));
        let h = ''
        for (let i = 0; i < s.length; i++) {
            h += s.charCodeAt(i).toString(16)
        }
        return h
    }
    const encUrl = toHex(`https://raw.githubusercontent.com/gist/jpavelka/${gistId}/raw`);

    refId = refNumbering(notebooks, refId, 'nb');
    const nbNum: string = $notebooks.numbers[refId];

    let seen = false;
    let posEl: HTMLElement;
    let pos;
    let scrollY: number;
    let innerHeight: number;
    afterUpdate(() => {
        pos = (posEl || {offsetTop: 0}).offsetTop;
        if (pos > 0 && Math.abs(pos - scrollY) <= 2 * innerHeight) {
            seen = true;
        } else if (pos > 0 && Math.abs(pos - scrollY) > 4 * innerHeight) {
            seen = false;
        }
    })
    const gistUrlBase = 'https://colab.research.google.com/gist/jpavelka/'
    // todo: some method to update gist from colab
</script>

<svelte:window bind:scrollY bind:innerHeight />
<div class=nbTitle><b>Notebook {nbNum}:</b> {desc}</div>
<div id={gistId} bind:this={posEl}>
    {#if $printMode}
        <BodyText>
            (Find the notebook at <a href={gistUrlBase + gistId}>{gistUrlBase}<wbr>{gistId}</a>)
        </BodyText>
    {:else}
        {#if seen}
            <iframe
                src={`https://notebooks.githubusercontent.com/view/ipynb?enc_url=${encUrl}`}
                title={'Notebook Embed ' + gistId}
            >
                Viewer requires iframe
            </iframe>
        {:else}
            <div>Waiting for notebook to load...</div>
        {/if}        
    {/if}
</div>

<style>
    iframe {
        width: 95%;
        height: 500px;
    }
    .nbTitle {
        font-size:1.2rem;
        margin-top:1rem;
        margin-bottom:0.25rem;
    }
</style>