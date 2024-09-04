<script lang="ts">
    import { onMount } from "svelte";
    import { popupShown, notesMaxWidth, minPopupSideWidth } from "./stores";
    export let show: Boolean
    export let divId = ''
    let popupEl: HTMLElement
    const handleClose = (e: any) => {
        show = false;
    }
    let checkForOpenPopups = () => {return false}
    onMount(() => {
        checkForOpenPopups = () => {
            let keepPopupShown = false;
            for (let el of Array.from(document.getElementsByClassName('popup') as HTMLCollectionOf<HTMLElement>)) {
                if (el.style.display === 'block' && el !== popupEl) {
                    keepPopupShown = true;
                }
            }
            return keepPopupShown;
        }
    })
    let innerWidth = 0;
    $: popupShown.update(() => {
        if (show) {
            return true;
        }
        return checkForOpenPopups();
    });
    $: popupLoc = innerWidth - $notesMaxWidth > $minPopupSideWidth ? 'Side' : 'Center';
</script>

<svelte:window bind:innerWidth />

<div
    bind:this={popupEl} 
    style={`display:${show ? 'block' : 'none'}`}
    class={`popup popup${popupLoc}`}
    id={divId}
>
    <div
        class="closeX"
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={handleClose}
        on:click={handleClose}
    >×</div>
    <slot/>
</div>

<style>
    .popup {
        border: 1pt solid black;
        border-radius: 10pt;
        position: absolute;
        background-color: #f4f4f4;
        padding: 1rem;
        box-shadow: 2px 3px 5px #999;
        z-index: 1;
        max-width: 100%;
    }
    .popupCenter {
        left: 50%;
        transform: translateX(-50%);
        max-width: calc(min(var(--notesMaxWidth) * 0.9, var(--totalWidth) * 0.8) * 1px);
        min-width: calc(min(var(--notesMaxWidth) * 0.8, var(--totalWidth) * 0.7) * 1px);
    }
    .popupSide {
        left: calc((var(--notesMaxWidth) + 20) * 1px);
        transform: translateY(-2rem);
        width: calc((var(--totalWidth) - var(--notesMaxWidth) - 40) * 0.9 * 1px);
    }
    .popupTop {
        top: 0;
        transform: translate(-50%, 0);
    }
    .closeX {
        color: #222;
        font-size: 30pt;
        font-weight: bold;
        float: right;
        margin-top: -1.2rem;
        margin-right: -0.2rem;
        cursor: pointer;
    }
</style>