<script lang="ts">
    import TopBar from "$lib/TopBar.svelte";
    import TOC from "$lib/TOC.svelte";
    import { showToc, sections } from "$lib/stores";
    import Appendix from "$lib/sections/appendix/Appendix.svelte";
    import Bibliography from "$lib/Bibliography.svelte";
    import Welcome from "$lib/sections/Welcome.svelte";
    import IntroToOr from "$lib/sections/IntroToOR.svelte";
    import Python from "$lib/sections/Python.svelte";
    import LinearProgramming from "$lib/sections/linearProgramming/LinearProgramming.svelte";
    import IntegerProgramming from "$lib/sections/integerProgramming/IntegerProgramming.svelte";
    
    let innerWidth = 0;
    const notesMaxWidth = 800;
    const tocWidth = 350;

    $: stillLoading = Object.values($sections.headingTexts).map(s => {
        const spl = s.split(':');
        return spl[spl.length - 1].trim();
    }).filter(s => s === 'undefined').length > 0;

    const bodyClick = (e) => {
        if ($showToc) {
            let el = e.target;
            while (el.tagName !== 'BODY') {
                if ([...el.classList].includes('toc')) {
                    return
                }
                el = el.parentNode;
            }
            showToc.update(() => {
                return false
            });
        }
    }
</script>

<svelte:window bind:innerWidth />

<div style="
    --totalWidth: {innerWidth};
    --notesMaxWidth: {notesMaxWidth};
    --tocWidth: {tocWidth};
">
    <div class=allContent>
        {#if stillLoading}
            <div class=loading>Loading...</div>
        {/if}
        <div style={'display:' + (stillLoading ? 'none' : 'block')}>
            <TopBar />
            <div class=underBar on:click={bodyClick}>
                <TOC />
                <div
                    class={"notesContent" + ($showToc && (innerWidth - tocWidth > notesMaxWidth) ? ' noteContentShifted' : '')}
                >
                    <Welcome />
                    <IntroToOr />
                    <Python />
                    <LinearProgramming />
                    <IntegerProgramming />
                    <Appendix />
                    <Bibliography />
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .allContent {
        display: flex;
        flex-direction: column;
    }
    .underBar {
        margin-top: 4rem;
    }
    .notesContent {
        max-width: calc(var(--notesMaxWidth) * 1px);
        padding: 1rem;
        font-family: Georgia, serif;
        margin: auto;
        height: 100%;
    }
    .noteContentShifted {
        padding-left: calc(var(--tocWidth) * 1px)
    }
    .loading {
        text-align: center;
        font-size: 1.5rem;
        margin-top: 3rem;
    }
    :global(img) {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
    }
    :global(body) {
        margin: 0;
    }
    :global(body *) {
        scroll-margin-top: 4.5rem;
    }
    @keyframes -global-line-pulse {
        0% {
            stroke-width: 2;
        }
        30% {
            stroke-width: 5;
        }
        60% {
            stroke-width: 2;
        }
    }
</style>
