<script>
    import Heading from "./Heading.svelte";
    import { citations } from "./stores";

    let citeList = [];
    for (const citeId of Object.keys($citations)) {
        const ct = $citations[citeId];
        if (ct.referenced) {
            citeList.push(ct.biblio);
        }
    }
</script>

<Heading refId="bibliography" level=1 includeDispSecNum={false}>References</Heading>
{#each citeList.sort() as ct}
    <div class="bibline">{ct}</div>
{/each}

<style>
    .bibline {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        overflow-x: auto;
    }
</style>
