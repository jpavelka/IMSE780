<script lang="ts">
    import { coordToPix } from "./utils";

    export let constants;
    export let startPt;
    export let endPt;
    export let color = "#777";
    export let padding = "5pt";
    export let lineWidth = "1pt";
    export let addArrowhead = false;
    export let arrowheadLengthPx = 10;
    export let mouseOverFunction = undefined;
    export let mouseOutFunction = undefined;
    export let styleExtra = '';

    $: [x1, y1] = coordToPix(constants, ...startPt);
    $: [x2, y2] = coordToPix(constants, ...endPt);
    $: styleStr = `stroke:${color};padding:${padding};stroke-width:${lineWidth};` + styleExtra;
    const arrowheadBaseLengthPx = arrowheadLengthPx / 2.5;

    const arrowheadTip = [x2, y2];
    let arrowheadBaseCenter = [0, 0];
    let arrowheadBaseEnds = [
        [0, 0],
        [0, 0],
    ];
    if (addArrowhead) {
        const lineLengthPx = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        arrowheadBaseCenter = [
            x2 - (x2 - x1) * (arrowheadLengthPx / lineLengthPx),
            y2 - (y2 - y1) * (arrowheadLengthPx / lineLengthPx),
        ];
        const lineAngle = Math.atan((y2 - y1) / (x2 - x1));
        arrowheadBaseEnds = [1, -1].map((mult) => {
            const arrowheadAngle = lineAngle + (mult * Math.PI) / 2;
            return [
                arrowheadBaseCenter[0] +
                    arrowheadBaseLengthPx * Math.cos(arrowheadAngle),
                arrowheadBaseCenter[1] +
                    arrowheadBaseLengthPx * Math.sin(arrowheadAngle),
            ];
        });
    }
</script>

<line {x1} {y1} {x2} {y2} style={styleStr} />
{#if addArrowhead}
    <polygon
        points={`${arrowheadTip.join(",")} ${arrowheadBaseEnds[0].join(",")} ${arrowheadBaseEnds[1].join(",")}`}
        fill={color}
        stroke={color}
    />
{/if}
{#if !!mouseOverFunction}
    <line {x1} {y1} {x2} {y2} style={"stroke-width:10pt;stroke:black;stroke-opacity:0"}
        on:mouseover={mouseOverFunction}
        on:mouseout={mouseOutFunction}
    />
{/if}
