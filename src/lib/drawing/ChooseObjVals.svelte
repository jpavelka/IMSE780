<script>
    import Line from "./Line.svelte";
    import Point from "./Point.svelte";

    export let constants
    export let edgeIntersections;
    export let feasibleIntersections;
</script>

{#if edgeIntersections.length === 2}
    <Line {constants} startPt={edgeIntersections[0]} endPt={edgeIntersections[1]} color=#aaa/>
{/if}
{#if feasibleIntersections.length === 2}
    <Line {constants} startPt={feasibleIntersections[0]} endPt={feasibleIntersections[1]} color=purple lineWidth=2pt/>
{:else if feasibleIntersections.length === 1}
    <Point {constants} point={feasibleIntersections[0]} color=purple/>
{/if}