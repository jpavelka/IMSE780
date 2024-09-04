<script lang='ts'>
    import { sections } from "./stores";
    export let hierarchy;
    let expand = hierarchy.map(() => false);
    const toggleExpand = (i: number) => {
        expand[i] = !expand[i];
    }
</script>

{#each hierarchy as s, i}
    <div class=tocItem>
        <a class=tocA href={'#' + s.id} style={`margin-left: ${(s.level - 1) * 20}pt`}>{@html $sections.headingTexts[s.id]}</a>
        {#if (s.hierarchy || []).length > 0}
            <span
                class=tocExpand
                role=button
                tabindex="0"
                aria-label="Toggle expand"
                on:keydown={() => toggleExpand(i)}
                on:click={() => toggleExpand(i)}
            >
                {expand[i] ? '-' : '+'}
            </span>
        {/if}
    </div>
    {#if (s.hierarchy || []).length > 0}
        <div style={`${expand[i] ? '' : 'height:0;display:none'}`}>
            <svelte:self hierarchy={s.hierarchy} />
        </div>
    {/if}
{/each}

<style>
    .tocItem {
        font-size: 1.6rem;
        line-height: 2.1rem;transition: 0.3s;
        border-bottom: 1pt solid lightgray;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tocA {
        color: black;
        text-decoration: none;
    }
    .tocExpand {
        float: right;
        cursor: pointer;
        font-size: 2.5rem;
        font-family: 'Courier New', Courier, monospace;
    }
</style>