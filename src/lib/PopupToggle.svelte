<script>
    import { onMount } from "svelte";
    import { popupShown, notesMaxWidth, minPopupSideWidth } from "./stores";
    export let show
    export let divId = ''
    let popupEl
    const handleClose = (e) => {
        show = false;
        // let keepPopupShown = false;
        // for (const el of document.getElementsByClassName('popup')) {
        //     if (el.style.display === 'block' && el !== e.target.parentNode) {
        //         keepPopupShown = true;
        //     }
        // }
        // popupShown.update(x => {
        //     return keepPopupShown;
        // });
    }
    let checkForOpenPopups = () => {}
    onMount(() => {
        checkForOpenPopups = () => {
            let keepPopupShown = false;
            for (const el of document.getElementsByClassName('popup')) {
                if (el.style.display === 'block' && el !== popupEl) {
                    keepPopupShown = true;
                }
            }
            return keepPopupShown;
        }
    })
    let innerWidth = 0;
    $: popupShown.update(x => {
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
    <div class="closeX" on:click={handleClose}>×</div>
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
        max-width: 90%;
    }
    .popupCenter {
        left: 50%;
        transform: translateX(-50%);
        max-width: calc(var(--noteMaxWidth) * 0.9 * 1px);
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