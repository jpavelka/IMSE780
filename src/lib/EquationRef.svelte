<script lang=ts>
    import { equations } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    export let refId: String;
    
    refId = 'eqn:' + refId
    const refNum = ($equations.numRefs[refId] || 0) + 1;
    equations.update(s => {
        if (!Object.keys(s.numRefs).includes(refId)) {
            s.numRefs[refId] = 0;
        }
        s.numRefs[refId] += 1;
        return s
    })
    $: retId = refId + '-ref' + refNum
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
        const popupEl = document.getElementById(retId);
        if (popupEl?.childElementCount === 1) {
            const el = document.getElementById(refId);
            const clonedNode = el.cloneNode(true);
            clonedNode.id += 'Ref' + refNum;
            popupEl?.appendChild(clonedNode);
            const linkEl = document.createElement('a');
            linkEl.innerHTML = 'jump to'
            linkEl.setAttribute('href', '#' + refId);
            linkEl.style.fontSize = '1.2rem';
            linkEl.style.float = 'right';
            linkEl.onclick = () => {
                equations.update(s => {
                    s.returnIds[refId] = retId;
                    return s
                })
            }
            popupEl?.appendChild(linkEl);
        }
    };
</script>

<PopupToggle show={showPopup} divId={retId}>
</PopupToggle>
<span class=eqRef id={retId} on:click={() => {
    popupOpenClose();
}}>Eq. {$equations.numbers[refId]}</span>

<style>
    .eqRef {
        color: green;
        cursor: pointer;
    }
</style>