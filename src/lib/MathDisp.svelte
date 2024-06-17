<script lang="ts">
    import { equations, sections } from "./stores";
    import KatexDisp from "./KatexDisp.svelte";
    import { refNumbering } from "$lib";

    export let refId: string = "";
    export let ignoreOverflow: boolean = false;
    export let fontSize = '1';

    const options = {
        displayMode: true,
        throwOnError: false,
    };
    let eqnNum = "";
    if (refId !== "") {
        refId = refNumbering(equations, refId, 'eqn');
        eqnNum = $equations.numbers[refId]
    }
    $: returnId = $equations.returnIds[refId];
</script>

<div style="display:flex;align-items:center">
    <div style={"flex-grow:1;font-size:1.3rem;" + (ignoreOverflow ? "" : "overflow-x:auto")} id={refId}>
        <KatexDisp {options} fontSize={fontSize}>
            <slot />
        </KatexDisp>
    </div>
    {#if eqnNum !== ""}
        <div style="font-size:1.2rem;margin-left:0.5rem;">({eqnNum})</div>
    {/if}
</div>
{#if !!returnId}    
    <a
    style="float:right;font-size:1.4rem;"
    href={"#" + returnId}
    on:click={() => {
        sections.update((s) => {
            delete s.returnIds[refId];
            return s;
        });
    }}
    >
    ↩︎</a
    >
{/if}
