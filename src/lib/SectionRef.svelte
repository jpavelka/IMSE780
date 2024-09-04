<script lang="ts">
    import { sections } from "./stores";
    export let refId: string;
    $: refId = "sec:" + refId;
    const refNum = $sections.numRefs[refId] || 0 + 1;
    sections.update((s) => {
        if (!Object.keys(s.numRefs).includes(refId)) {
            s.numRefs[refId] = 0;
        }
        s.numRefs[refId] += 1;
        return s;
    });
    $: retId = refId + "-ref" + refNum;
</script>

<a
    id={retId}
    href={"#" + refId}
    on:click={() => {
        sections.update((s) => {
            s.returnIds[refId] = retId;
            return s;
        });
    }}>Section {$sections.numbers[refId]}</a
>
