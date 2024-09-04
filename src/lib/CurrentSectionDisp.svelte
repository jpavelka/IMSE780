<script lang='ts'>
    import { printMode, sections } from "./stores";

    let scrollY: number;
    let innerHeight: number;
    let innerWidth: number;
    const smallWidth = 700;

    let secsToDisplay: Array<string> = [];

    $: doNotShow = $printMode || (innerWidth || 0) < smallWidth;

    $: {
        if (!doNotShow) {
            const sectionsPast = Object.keys($sections.numbers).map(refId => {
                try {
                    document
                } catch {
                    return [refId, -1];
                }
                const el = document.getElementById(refId) as HTMLElement;
                const ret: Array<any> = [refId, scrollY + 0.3 * innerHeight - el?.offsetTop]
                return ret
            }).filter(
                x => x[1] >= 0
            ).sort(
                (a, b) => a[1] > b[1] ? 1 : -1
            );
            let lastSection = undefined;
            if (sectionsPast.length > 0) {
                lastSection = sectionsPast[0][0];
                secsToDisplay = [lastSection];
                let lastNumber = $sections.numbers[lastSection];
                while (lastNumber.split('.').length > 1) {
                    lastNumber = lastNumber.split('.').slice(0, lastNumber.split('.').length - 1).join('.');
                    secsToDisplay = Object.keys($sections.numbers).filter(n => $sections.numbers[n] === lastNumber).concat(secsToDisplay); 
                }
            }
        }
    }
</script>

<svelte:window bind:scrollY bind:innerHeight bind:innerWidth />
{#if doNotShow}
    <span></span>
{:else}
    <div class=sectionDispContainer>
        <div class=sectionDisp>
            <br>
            {#each secsToDisplay as sec}
                <a href={`#${sec}`}>{@html $sections.headingTexts[sec]}</a>
                {#if sec !== secsToDisplay[secsToDisplay.length - 1]}
                    <span style=font-size:0.8rem>&#10095;</span>&nbsp;
                {/if}
            {/each}
        </div>
    </div>
    <br>
    <br>
{/if}

<style>
    .sectionDispContainer {
        position: fixed;
        top: 3rem;
        background-color: white;
        width: 100%;
        border-bottom: 1pt solid gray;
        z-index: 2;
    }
    .sectionDisp {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.5rem;
    }
</style>