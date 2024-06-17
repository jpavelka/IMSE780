<script lang="ts">
    import { citations } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    export let refId: String;
    citations.update((c) => {
        c[refId].referenced = true;
        return c;
    });
    const citeObj = $citations[refId];
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
    };
</script>

<PopupToggle show={showPopup}>
    {citeObj.biblio}
</PopupToggle>
<span class="ref" on:click={popupOpenClose}>
    {citeObj.refStr}
</span>

<style>
    .ref {
        cursor: pointer;
        color: green;
    }
</style>
