<script lang="ts">
    import PopupToggle from "./PopupToggle.svelte";
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
    };
</script>

<PopupToggle show={showPopup}>
    <slot/>
</PopupToggle>
<span class="footnote" on:click={popupOpenClose}>[note]</span>

<style>
    .footnote {
        cursor: pointer;
        color: green;
        vertical-align: super;
        font-size: 0.7rem;
        margin-left: -0.5em;
    }
</style>
