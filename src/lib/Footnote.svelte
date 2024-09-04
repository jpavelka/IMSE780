<script lang="ts">
    import PopupToggle from "./PopupToggle.svelte";
    import { printMode } from "./stores";
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
    };
</script>

{#if $printMode}
    <span></span>
{:else}
    <PopupToggle show={showPopup}>
        <slot/>
    </PopupToggle><span
        class="footnote" on:click={popupOpenClose}
    >[note]</span>
{/if}

<style>
    .footnote {
        cursor: pointer;
        color: green;
        vertical-align: super;
        font-size: 0.7rem;
    }
</style>
