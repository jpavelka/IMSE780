<script>
    import Point from "./Point.svelte";

    export let constants
    export let vertices
</script>

{#each vertices as v}
    <Point {constants} point={v}/>
{/each}