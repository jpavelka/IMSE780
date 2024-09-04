<script lang="ts">
    import { equations, printMode } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    import { eqReferenced } from "./stores";
    export let refId: string;

    refId = "eqn:" + refId;
    const refNum = ($equations.numRefs[refId] || 0) + 1;
    equations.update((s) => {
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
            let timeout = 0;
            if (!$eqReferenced.includes(refId)) {
                eqReferenced.update((x) => {
                    x.push(refId);
                    return x;
                });
                timeout = 500;
            }
            const idEl = document.createElement("div");
            idEl.textContent = "Eq. " + $equations.numbers[refId];
            if (!!$equations.names[refId]){
                idEl.textContent += ` (${$equations.names[refId]})`
            }
            idEl.style.fontWeight = "bold";
            popupEl?.appendChild(idEl);
            setTimeout(function () {
                const el = document.getElementById(refId) as HTMLElement;
                const clonedNode = el.cloneNode(true) as HTMLElement;
                clonedNode.id = clonedNode.id || '';
                clonedNode.id += "Ref" + refNum;
                popupEl?.appendChild(clonedNode);
                const linkEl = document.createElement("a");
                linkEl.innerHTML = "jump to";
                linkEl.setAttribute("href", "#" + refId);
                linkEl.style.fontSize = "1.2rem";
                linkEl.style.float = "right";
                linkEl.onclick = () => {
                    equations.update((s) => {
                        s.returnIds[refId] = retId;
                        return s;
                    });
                };
                popupEl?.appendChild(linkEl);
            }, timeout);
        }
    };
</script>

{#if $printMode}
    <a class="eqRef" href={`#${refId}`}>
        Eq. {$equations.numbers[refId]}
    </a>
{:else}
    <PopupToggle show={showPopup} divId={retId}></PopupToggle><span
        class="eqRef"
        id={retId}
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={popupOpenClose}
        on:click={popupOpenClose}
    >
        Eq. {$equations.numbers[refId]}
    </span>
{/if}

<style>
    .eqRef {
        color: green;
        cursor: pointer;
    }
</style>
