<script>
    import { refNumbering } from "$lib";
    import { theorems } from "./stores";

    export let refId;
    export let thmType = "theorem";
    export let name = undefined;
    export let hideProof = false;

    refId = refNumbering(theorems, refId, "thm");
    const thmNum = $theorems.numbers[refId];
    theorems.update((t) => {
        t.thmTypes[refId] = thmType.charAt(0).toUpperCase() + thmType.slice(1);
        return t;
    });
    const thmDivId = refId;
    const proofDivId = "proofEl:" + refId;
    $: returnId = $theorems.returnIds[refId];
    $: showProof = hideProof;
</script>

<div
    class="theorem"
    id={thmDivId}
    style={!!returnId ? "padding-bottom:2rem;" : ""}
>
    <span class="thmName"
        >{$theorems.thmTypes[refId]} {thmNum}{!!name ? ` (${name})` : ""}:</span
    >
    <div class="underName"><slot /></div>
    {#if !!returnId}
        <a
            style="float:right;font-size:1.4rem;"
            href={"#" + returnId}
            on:click={() => {
                theorems.update((s) => {
                    delete s.returnIds[refId];
                    return s;
                });
            }}
        >
            ↩︎</a
        >
    {/if}
</div>
{#if $$slots.proof}
    <div
        class="proof"
        id={proofDivId}
    >
        <div class="proofText">
            Proof:
            {#if !hideProof}
                <button on:click={() => showProof = !showProof}>{showProof ? 'Hide' : 'Show'}</button>
            {/if}
        </div>
        <div class="proofContainer" style="display:{showProof ? 'block' : 'none'}">
            <slot name="proof" />
            <div class="qed">∎</div>
        </div>
    </div>
{/if}

<style>
    .theorem {
        border: 1pt solid gray;
        padding: 1rem;
        background-color: #eee;
        font-style: italic;
        margin-top: 1rem;
    }
    .thmName {
        font-size: 1.3rem;
        font-weight: bold;
        font-style: normal;
    }
    .underName {
        margin-top: -1rem;
        padding-left: 1rem;
    }
    .proof {
        font-size: 1.3rem;
        margin-top: 1rem;
        padding-left: 0.5rem;
        border-left: 1pt solid #ccc;
    }
    .proofText {
        font-weight: bold;
        margin-bottom: -1rem;
    }
    .proofContainer {
        padding-left: 0.5rem;
    }
    .qed {
        text-align: right;
        padding-right: 1rem;
    }
</style>
