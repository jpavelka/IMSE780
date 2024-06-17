<script>
    import { coordToPix, getConstraintInfo } from "./utils";
    import { getVertices } from "./utils";

    export let constants;
    export let constraintInfo;
    export let feasibleRegionText;
    
    const vertices = getVertices(constraintInfo.concat(getConstraintInfo([
        [1, 0, 'l', constants.x1Max],
        [0, 1, 'l', constants.x2Max]
    ])));
    let pixPts = [];
    let centerOfMass = undefined;
    if (vertices.length > 0) {
        pixPts = vertices.map(v => coordToPix(constants, ...v));
        centerOfMass = [0, 1].map(i => pixPts.map(p => p[i]).reduce((a, b) => a + b) / pixPts.length);
        pixPts.push(pixPts[0]);
    }
</script>

{#if vertices.length > 0}
    <polygon points={pixPts.map(pix => `${pix[0]},${pix[1]}`).join(' ')} stroke='black' fill='#ddd' />
    {#if feasibleRegionText}
        <text x={centerOfMass[0] - 25} y={centerOfMass[1]}>Feasible</text>
        <text x={centerOfMass[0] - 25} y={centerOfMass[1] + 20}>Region</text>
    {/if}
{/if}
