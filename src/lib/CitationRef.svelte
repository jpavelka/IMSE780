<script lang="ts">
    import { citations } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    export let refId: string;
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
</PopupToggle><span
    class="ref"
    role=button
    tabindex="0"
    aria-label="Toggle popup"
    on:keydown={popupOpenClose}
    on:click={popupOpenClose}
>
    {citeObj.refStr}
</span>

<style>
    .ref {
        cursor: pointer;
        color: green;
    }
</style>
