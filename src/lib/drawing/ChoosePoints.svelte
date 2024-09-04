<script>
    import Line from "./Line.svelte";
    import Point from "./Point.svelte";
    import { getPlotStartEnd } from "./utils";

    export let constants;
    export let pt;
    export let feasible;
    export let constraintInfo;

    $: color = feasible ? 'black' : 'red';
    $: lineStartEnds = constraintInfo.filter(cInfo => !cInfo.nonNegConstr).map(cInfo => {
        return getPlotStartEnd(cInfo, constants).concat([cInfo.checkFeasible(pt)]);
    });
</script>

<Point {constants} point={pt} {color} />
{#each lineStartEnds as x}
    <Line {constants}
        startPt={x[0]}
        endPt={x[1]}
        color={'red'}
        lineWidth={`${2}`}
        styleExtra={`animation:line-pulse 6s infinite;opacity:${x[2] ? 0 : 1}`}
    />
{/each}