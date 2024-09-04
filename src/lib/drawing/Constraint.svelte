<script lang='ts'>
    import Math from "$lib/Math.svelte";
    import Line from "./Line.svelte";
    import PlotText from "./PlotText.svelte";
    import { coordToPix, getConstraintInfo, getPlotStartEnd, getVertices } from "./utils";

    export let constants;
    export let cInfo;

    const origLineColor = '#777';
    $: lineColor = origLineColor;
    $: lineWidth = '1pt';
    $: extraMathStyle = '';
    $: showFeasibleRegion = false;
    const mouseOverFunction = () => {
        lineColor = 'black';
        lineWidth = '2pt';
        extraMathStyle = 'background-color:#ffff44';
        showFeasibleRegion = true;
    }
    const mouseOutFunction = () => {
        lineColor = '#777';
        lineWidth = '1pt';
        extraMathStyle = '';
        showFeasibleRegion = false;
    };
    const [startPt, endPt] = getPlotStartEnd(cInfo, constants);
    const vertices = getVertices([cInfo].concat(getConstraintInfo([
        [1, 0, 'l', constants.x1Max],
        [0, 1, 'l', constants.x2Max]
    ])));
    let pixPts = vertices.map(v => coordToPix(constants, ...v));
    pixPts.push(pixPts[0]);

</script>
{#if !!startPt}
    {#if showFeasibleRegion}
        <polygon points={pixPts.map(pix => `${pix[0]},${pix[1]}`).join(' ')} fill='#ddd' opacity='0.5'/>
    {/if}
    <Line
        {constants}
        startPt={startPt}
        endPt={endPt}
        color={lineColor}
        lineWidth={lineWidth}
        {mouseOverFunction}
        {mouseOutFunction}
    />
    {#if Object.keys(cInfo).includes('textPlacement')}
    <PlotText {constants} x={cInfo.textPlacement[0]} y={cInfo.textPlacement[1]}
        ><Math
            extraStyle={extraMathStyle}
            {mouseOverFunction}
            {mouseOutFunction}
        >{cInfo.latexStr}</Math>
    </PlotText>
    {/if}
{/if}
