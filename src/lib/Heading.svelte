<script lang="ts">
    import { sections } from "./stores";
    export let level: string | undefined = undefined;
    export let refId: string;
    export let dispSecNum: string = '';
    export let includeDispSecNum: boolean = true;
    if (!refId) {
        throw new Error('refId required for Heading')
    }
    refId = "sec:" + refId;
    const levelInt = level === undefined ? 0 : parseInt(level);
    let secNum = `${$sections.hierarchy.length + (levelInt > 1 ? 0 : 1)}`;
    if (dispSecNum !== '') {
        sections.update(s => {
            s.dispSecNums[secNum] = dispSecNum;
            return s
        })
    }
    if (Object.keys($sections.dispSecNums).includes(secNum)) {
        secNum = $sections.dispSecNums[secNum];
    }
    $: if (!!level && !!sections && !Object.keys($sections.numRefs).includes(refId)) {
        sections.update(s => {
            s.numRefs[refId] = 0;
            return s;
        })
        let iter = 1;
        let pushArray = $sections.hierarchy
        while (iter < levelInt) {
            pushArray = pushArray[pushArray.length - 1].hierarchy;
            secNum += (secNum === "" ? "" : ".") + (pushArray.length + (iter < levelInt - 1 ? 0 : 1));
            iter += 1;
        }
        pushArray.push({
            id: refId,
            secNum: secNum,
            hierarchy: [],
            level: levelInt
        })
        sections.update(s => {
            s.numbers[refId] = secNum;
            return s;
        })
    }
    $: returnId = $sections.returnIds[refId];
    let data: HTMLElement;
    $: headingText =  `${includeDispSecNum ? (!!level ? secNum : '') + (!!level ? ": " : "") : ""}${data?.innerHTML}`;
    $: sections.update(s => {
        s.headingTexts[refId] = headingText;
        return s;
    })
</script>

<span style="display:none" class="headingData" bind:this={data}><slot /></span>
<span style="display:none" id={refId + 'Context'}>
    <slot name="context" />
</span>
{#if (levelInt || 1) === 1 && secNum !== '1'}
    <hr style="margin-top:3rem;margin-bottom:5rem" />
{/if}
<svelte:element this={"h" + (levelInt || 1)} id={refId}>
    {@html headingText}
    {#if !!returnId}
        <a
            style="float:right;"
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
</svelte:element>

<style>
    h1 {
        font-size: 2.2rem;
        margin-bottom: 2.2rem;
    }
    h2 {
        font-size: 1.9rem;
    }
    h3 {
        font-size: 1.6rem;
    }
    h4 {
        font-size: 1.4rem;
    }
</style>
