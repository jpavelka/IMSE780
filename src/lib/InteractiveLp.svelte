<script lang="ts">
    import Figure from "./Figure.svelte";
    import InlineMath from "./Math.svelte";
    import Axes from "./drawing/Axes.svelte";
    import ChooseObjVals from "./drawing/ChooseObjVals.svelte";
    import ChoosePoints from "./drawing/ChoosePoints.svelte";
    import Constraint from "./drawing/Constraint.svelte";
    import FeasibleRegion from "./drawing/FeasibleRegion.svelte";
    import ShowIntegerPoints from "./drawing/ShowIntegerPoints.svelte";
    import ShowVertices from "./drawing/ShowVertices.svelte";
    import { checkPtFeasible, getConstraintInfo, getEdgeAndFeasibleIntersections, getVertices, pixToCoord } from "./drawing/utils";

    export let objective;
    export let inequalities;
    export let x1Min;
    export let x1Max;
    export let x2Min;
    export let x2Max;
    export let refId;
    export let svgHeight = 350;
    export let svgWidth = 350;
    export let choosePoints = false;
    export let chooseObjVals = false;
    export let showVertices = false;
    export let showIntegerPoints = false;
    export let feasibleRegionText = true;

    const constants = {
        h: svgHeight,
        w: svgWidth,
        x1Min: x1Min,
        x1Max: x1Max,
        x2Min: x2Min,
        x2Max: x2Max,
    };
    const constraintInfo = getConstraintInfo(inequalities);
    $: pointToShow = [0, 0];
    $: pointFeasible = checkPtFeasible(pointToShow, constraintInfo);
    $: pointObjVal = objective[0] * pointToShow[0] + objective[1] * pointToShow[1];
    $: objValToPlot = pointObjVal;
    let svgClickFunc = (e: MouseEvent) => {return};
    if (choosePoints || chooseObjVals) {
        svgClickFunc = (e: MouseEvent) => {
            pointToShow = pixToCoord(constants, e.offsetX, e.offsetY).map(x => {
                return Math.round(10 * x) / 10
            })
        }
    }
    $: edgeIntersections = [];
    $: feasibleIntersections = [];
    $: if (chooseObjVals) {
        [edgeIntersections, feasibleIntersections] = getEdgeAndFeasibleIntersections(
            constants, constraintInfo, objective, objValToPlot
        )
    }
    const vertices = getVertices(constraintInfo);
    let innerWidth: number;
</script>

<svelte:window bind:innerWidth />
<Figure {refId}>
    <div style={`margin-bottom:1rem;${innerWidth - svgWidth < 50 ? 'overflow-x:scroll;' : ''}`}>
        <svg
            style={`height:${svgHeight}px;width:${svgWidth}px`}
            class=svgBase
            role=button
            tabindex="0"
            aria-label=""
            on:keydown={(e) => {}}
            on:click={(e) => svgClickFunc(e)}
        >
            {#each constraintInfo.filter(cInfo => !cInfo.nonNegConstraint) as cInfo}
                <Constraint {constants} {cInfo} />
            {/each}
            <FeasibleRegion {constants} {constraintInfo} {feasibleRegionText}/>
            <Axes {constants} />
            {#if showVertices}
                <ShowVertices {constants} {vertices} />
            {/if}
            {#if showIntegerPoints}
                <ShowIntegerPoints {constants} {constraintInfo}/>
            {/if}
            {#if choosePoints}
                <ChoosePoints {constants} pt={pointToShow} feasible={pointFeasible} constraintInfo={constraintInfo} />
            {/if}
            {#if chooseObjVals}
                <ChooseObjVals {constants} {edgeIntersections} {feasibleIntersections} />
            {/if}
        </svg>
        {#if choosePoints}
            <div style='text-align:center;font-size:1.3rem;'>
                <div>
                    Objective: <InlineMath>{`${objective[0]}x_1 + ${objective[1]}x_2`}</InlineMath>
                </div>
                <div>
                    <InlineMath>x_1</InlineMath> =
                    <input type="number" bind:value={pointToShow[0]} min="0" max={Math.floor(constants.x1Max)}>
                    <InlineMath>x_2</InlineMath> =
                    <input type="number" bind:value={pointToShow[1]} min="0" max={Math.floor(constants.x2Max)}>
                </div>
                <div>
                    {`(${pointToShow[0]}, ${pointToShow[1]}) is ${pointFeasible ? '' : 'in'}feasible${pointFeasible ? ` with objective value ${Math.round(100 * pointObjVal) / 100}` : ''}`}
                </div>
            </div>
        {/if}
        {#if chooseObjVals}
            <div style='text-align:center;font-size:1.3rem;'>
                <div>
                    Plotting objective: <InlineMath>{`${objective[0]}x_1 + ${objective[1]}x_2 = `}</InlineMath>
                    <input type="number" bind:value={objValToPlot} style=width:3rem>
                </div>
                <div>
                    {
                        feasibleIntersections.length === 2 ? `Multiple feasible solutions with objective value ${objValToPlot}` : 
                        feasibleIntersections.length === 1 ? `Single feasible solution (${Math.round(100 * feasibleIntersections[0][0]) / 100}, ${Math.round(100 * feasibleIntersections[0][1]) / 100}) with objective value ${objValToPlot}` :
                        `No feasible solutions with objective value ${objValToPlot}`
                    }
                </div>
            </div>
        {/if}
    </div>
    <span slot=caption><slot name=caption/></span>
</Figure>

<style>
    .svgBase {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 2rem;
    }
</style>
