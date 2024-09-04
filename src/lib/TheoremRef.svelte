<script lang="ts">
    import { theorems } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    export let refId: string;

    refId = "thm:" + refId;
    const refNum = ($theorems.numRefs[refId] || 0) + 1;
    theorems.update((s) => {
        if (!Object.keys(s.numRefs).includes(refId)) {
            s.numRefs[refId] = 0;
        }
        s.numRefs[refId] += 1;
        return s;
    });
    $: retId = refId + "-ref" + refNum;
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
        const popupEl = document.getElementById(retId);
        if (popupEl?.childElementCount === 1) {
            const el = document.getElementById(refId) as HTMLElement;
            const clonedNode = el.cloneNode(true) as HTMLElement;
            clonedNode.id += "Ref" + refNum;
            popupEl?.appendChild(clonedNode);
            const linkEl = document.createElement("a");
            linkEl.innerHTML = "jump to";
            linkEl.setAttribute("href", "#" + refId);
            linkEl.style.fontSize = "1.2rem";
            linkEl.style.float = "right";
            linkEl.onclick = () => {
                theorems.update((s) => {
                    s.returnIds[refId] = retId;
                    return s;
                });
            };
            popupEl?.appendChild(linkEl);
        }
    };
</script>

<PopupToggle show={showPopup} divId={retId}></PopupToggle><span
    class="thmRef"
    id={retId}
    role=button
    tabindex="0"
    aria-label="Toggle popup"
    on:keydown={popupOpenClose}
    on:click={popupOpenClose}
    >{$theorems.thmTypes[refId]} {$theorems.numbers[refId]}</span
>

<style>
    .thmRef {
        color: green;
        cursor: pointer;
    }
</style>
