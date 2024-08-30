<script lang="ts">
    import TopBar from "$lib/TopBar.svelte";
    import TOC from "$lib/TOC.svelte";
    import { showToc, sections, popupShown, notesMaxWidth, tocWidth, minPopupSideWidth } from "$lib/stores";
    import Appendix from "$lib/sections/appendix/Appendix.svelte";
    import Bibliography from "$lib/Bibliography.svelte";
    import Welcome from "$lib/sections/Welcome.svelte";
    import IntroToOr from "$lib/sections/IntroToOR.svelte";
    import Python from "$lib/sections/Python.svelte";
    import LinearProgramming from "$lib/sections/linearProgramming/LinearProgramming.svelte";
    import IntegerProgramming from "$lib/sections/integerProgramming/IntegerProgramming.svelte";
    import NonlinearProgramming from "$lib/sections/nonlinearProgramming/NonlinearProgramming.svelte";
    import StochasticProcesses from "$lib/sections/stochasticProcesses/StochasticProcesses.svelte";
    
    let innerWidth = 0;

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
    --notesMaxWidth: {$notesMaxWidth};
    --tocWidth: {$tocWidth};
">
    <div class=allContent>
        {#if stillLoading}
            <div class=loading>Loading...</div>
        {/if}
        <div style={'display:' + (stillLoading ? 'none' : 'block')}>
            <TopBar smallScreen={innerWidth < 400}/>
            <div class=underBar on:click={bodyClick}>
                <TOC />
                <div
                    class={"notesContent" + ($showToc && (innerWidth - $tocWidth > $notesMaxWidth) ? ' noteContentShifted' : '') + ($popupShown && (innerWidth - $notesMaxWidth > $minPopupSideWidth) ? ' noteContentWithPopup' : '')}
                >
                    <Welcome />
                    <IntroToOr />
                    <Python />
                    <LinearProgramming />
                    <IntegerProgramming />
                    <!-- <NonlinearProgramming />
                    <StochasticProcesses />
                    <Appendix />
                    <Bibliography /> -->
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
        max-width: var(--totalWidth);
    }
    .notesContent {
        max-width: calc(min((var(--totalWidth) - 50) * 1px, var(--notesMaxWidth) * 1px));
        padding: 1rem;
        font-family: Georgia, serif;
        height: 100%;
        position: absolute;
        left: calc(max(0px, (var(--totalWidth) - var(--notesMaxWidth)) / 2 * 1px));
        transition: all .5s;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -o-transition: all .5s;
        -ms-transition: all .5s;
    }
    .noteContentWithPopup {
        left: 20px;
    }
    .noteContentShifted {
        left: calc(var(--tocWidth) * 1px)
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
    :global(.basicCenter) {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        max-width: 90vw;
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
