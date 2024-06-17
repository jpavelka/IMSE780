<script>
    import InlineMath from "$lib/Math.svelte";
    import Line from "./Line.svelte";
    import PlotText from "./PlotText.svelte";

    export let constants;
    const xTickRange = [
        Math.ceil(constants.x1Min),
        Math.floor(constants.x1Max),
    ];
    const yTickRange = [
        Math.ceil(constants.x2Min),
        Math.floor(constants.x2Max),
    ];
    const xTickMarkSpacing = Math.ceil((xTickRange[1] - xTickRange[0]) / 12);
    const yTickMarkSpacing = Math.ceil((yTickRange[1] - yTickRange[0]) / 12);
    let xTicks = [xTickRange[0]];
    while (xTicks[xTicks.length - 1] + xTickMarkSpacing <= xTickRange[1]) {
        xTicks.push(xTicks[xTicks.length - 1] + xTickMarkSpacing);
    }
    let yTicks = [yTickRange[0]];
    while (yTicks[yTicks.length - 1] + yTickMarkSpacing <= yTickRange[1]) {
        yTicks.push(yTicks[yTicks.length - 1] + yTickMarkSpacing);
    }
</script>

<Line
    {constants}
    startPt={[0, 0]}
    endPt={[constants.x1Max, 0]}
    color={"black"}
    addArrowhead={true}
/>
<Line
    {constants}
    startPt={[0, 0]}
    endPt={[0, constants.x2Max]}
    color={"black"}
    addArrowhead={true}
/>
<PlotText {constants} x={[constants.x1Max, -15]} y={[0, -3]}>
    <InlineMath>x_1</InlineMath>
</PlotText>
<PlotText {constants} x={[0, -25]} y={[constants.x2Max, 8]}>
    <InlineMath>x_2</InlineMath>
</PlotText>
{#each xTicks as xTick}
    <Line
        {constants}
        startPt={[xTick, 0]}
        endPt={[xTick, (constants.x1Max - constants.x1Min) / 25]}
    />
    <PlotText {constants} x={[xTick, -3]} y={[0, -5]} width='2rem'>
        <InlineMath fontSize={0.7}>{xTick}</InlineMath>
    </PlotText>
{/each}
{#each yTicks as yTick}
    <Line
        {constants}
        startPt={[0, yTick]}
        endPt={[(constants.x2Max - constants.x2Min) / 25, yTick]}
    />
    <PlotText {constants} x={[0, -22]} y={[yTick, 9]} width='2rem'>
        <InlineMath fontSize={0.7}>{yTick}</InlineMath>
    </PlotText>
{/each}
