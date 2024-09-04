<script lang=ts>
    import { printMode, showToc } from "./stores";

    export let smallScreen = false;
</script>

{#if !$printMode}
    <div class=topBar>
        <div
            id='contentsClick'
            class=contents
            role=button
            tabindex="0"
            aria-label="Toggle show TOC"
            on:keydown={() => {showToc.update(s => !s)}}
            on:click={() => {showToc.update(s => !s)}}
        >
            Contents
        </div>
        <div class=courseNum>
            IMSE 780
        </div>
        {#if !smallScreen}
            <div class=term>
                Fall 2023
            </div>
        {/if}
    </div>
{/if}

<style>
    .topBar {
        position: fixed;
        top: 0;
        font-size: 1.5rem;
        background-color: #ebebeb;
        width: 100%;
        border-bottom: 1pt solid gray;
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        font-family: Georgia, serif;
        z-index: 4;
    }
    .topBar > div {
        padding: 0.5rem 1rem;
    }
    .contents {
        color: blue;
        cursor: pointer;
    }
</style>