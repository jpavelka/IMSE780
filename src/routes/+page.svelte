<script lang="ts">
    import { onMount } from "svelte";
    import TopBar from "$lib/TopBar.svelte";
    import TOC from "$lib/TOC.svelte";
    import { showToc, popupShown, notesMaxWidth, tocWidth, minPopupSideWidth, printMode, highlightKeyPoints } from "$lib/stores";
    import Sections from "$lib/sections/Sections.svelte";
    import CurrentSectionDisp from "$lib/CurrentSectionDisp.svelte";
    
    let innerWidth = 0;
    let stillLoading = true;
    let stillScrolling = true;

    const bodyClick = (e) => {
        let el = e.target;
        if ($showToc && el.id !== 'contentsClick') {
            while (!['BODY', 'HTML'].includes(el.tagName)) {
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
    onMount(() => {
        const { hash } = document.location;
        const scrollTo = hash && document.getElementById(hash.slice(1));
        stillLoading = false;
        setTimeout(() => {
            if (scrollTo) {
                scrollTo.scrollIntoView();
            }
            stillScrolling = false;
        }, 100);
        window.onbeforeprint = () => printMode.update(() => true);
        window.onafterprint = () => printMode.update(() => false)
    });
    try {
        document.onclick = bodyClick
    } catch {

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
            <div class=loading>
                <div>Your notes are loading.</div>
                <div>Hang in there, this can take some time.</div>
                <div class=loader></div>
            </div>
        {/if}
        <div style={'display:' + (stillLoading ? 'none' : 'block')}>
            <TopBar smallScreen={innerWidth < 400}/>
            <div class=underBar style={'visibility:' + (stillScrolling ? 'hidden' : 'visible')}>
                <TOC />
                <CurrentSectionDisp />
                <div
                    class={
                        "notesContent" +
                        ($printMode ? ' notesPrint' : 
                            ($showToc && (innerWidth - $tocWidth > $notesMaxWidth) ? ' noteContentShifted' : '') +
                            ($popupShown && (innerWidth - $notesMaxWidth > $minPopupSideWidth) ? ' noteContentWithPopup' : '')
                        )
                    }
                >
                    <Sections />
                    <div class=afterNotes></div>
                </div>
            </div>
            {#if !$printMode}
                <div class=footer>
                    © Copyright 2024, Jeffrey Pavelka
                    <span
                        class=footerActions
                        on:click={() => highlightKeyPoints.update(x => !x)}
                    >
                        &#128273;
                    </span>
                </div>
            {/if}
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
    .notesPrint {
        left: auto;
        padding: 2rem;
        font-size: 0.4rem;
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
        padding: 1pt;
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
        scroll-margin-top: 7.5rem;
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
    .afterNotes {
        height: 3rem;
    }
    .footer {
        position: fixed;
        bottom: 0;
        text-align: center;
        width: 100%;
        background: white;
        border-top: 1pt solid lightgray;
        font-size: 0.8rem;
    }
    .footerActions {
        float: right;
        padding-right: 1rem;
        font-size: 0.8rem;
        cursor: pointer;
    }
    .loader {
        border: 0.4rem solid #f3f3f3;
        border-radius: 50%;
        border-top: 0.4rem solid #7f7f7f;
        width: 2rem;
        height: 2rem;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
        margin: 1rem auto;
    }
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        33% { transform: rotate(90deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        33% { transform: rotate(90deg); }
        100% { transform: rotate(360deg); }
    }
</style>
