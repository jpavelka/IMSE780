<script>
    import { refNumbering } from "$lib";
    import BodyText from "./BodyText.svelte";
    import { appendixProofs, theorems } from "./stores";

    export let refId;
    export let proofPlacement = "inText";
    export let thmType = "theorem";
    export let name = undefined;

    refId = refNumbering(theorems, refId, "thm");
    const thmNum = $theorems.numbers[refId];
    theorems.update((t) => {
        t.thmTypes[refId] = thmType.charAt(0).toUpperCase() + thmType.slice(1);
        return t;
    });
    const thmDivId = refId;
    const proofDivId = "proofEl:" + refId;
    if (proofPlacement === "appendix") {
        appendixProofs.update((p) => {
            p = p || [];
            p.push({ thm: thmDivId, proof: proofDivId });
            return p;
        });
    }
    $: returnId = $theorems.returnIds[refId];
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
{#if proofPlacement !== "none"}
    <div
        class="proof"
        id={proofDivId}
        style={`display:${proofPlacement === "appendix" ? "none" : "block"}`}
    >
        <div class="proofText">Proof:</div>
        <div class="proofContainer">
            <slot name="proof" />
        </div>
        <div class="qed">∎</div>
    </div>
{/if}
{#if proofPlacement === "appendix"}
    <BodyText
        >(<a href={"#" + proofDivId + ":Appendix"}>Proof</a> in the appendix)</BodyText
    >
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
