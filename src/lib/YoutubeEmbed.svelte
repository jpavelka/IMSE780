<script lang='ts'>
    export let videoId
    export let params = undefined
    import { afterUpdate } from 'svelte';
    import { printMode } from './stores';
    import BodyText from './BodyText.svelte';

    let srcStr = "https://www.youtube.com/embed/" + videoId;
    let linkStr = "https://www.youtube.com/watch?v=" + videoId;
    if (params !== undefined) {
        srcStr += '?' + Object.entries(params).map(x => `${x[0]}=${x[1]}`).join('&');
    }

    $: seen = false
    let posEl: HTMLElement;
    let pos: number;
    let scrollY: number;
    let innerHeight: number;
    afterUpdate(() => {
        pos = (posEl || {offsetTop: 0}).offsetTop;
        if (pos > 0 && Math.abs(pos - scrollY) <= 2 * innerHeight) {
            seen = true;
        }
    })
</script>

<svelte:window bind:scrollY bind:innerHeight />
<div bind:this={posEl}>
    {#if $printMode}
        <BodyText>
            (Watch the video at <a href={linkStr}>{linkStr}</a>)
        </BodyText>
    {:else}
        {#if seen}
            <iframe
                class="basicCenter"
                width="560"
                height="315"
                src={srcStr}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        {:else}
            <div>Waiting for <a href={linkStr} target='_blank'>video</a> to load...</div>
        {/if}
    {/if}
</div>
