<script>
    import { coordToPix } from "./utils";

    export let constants;
    export let x;
    export let y;
    export let height = '1.2rem';
    export let width = '15rem';
    let xPix = 0;
    let yPix = 0;
    if ((typeof x) === 'object') {
        [x, xPix] = x;
    }
    if ((typeof y) === 'object') {
        [y, yPix] = y;
    }
    
    const pix = coordToPix(constants, x, y);
    pix[0] += xPix;
    pix[1] = pix[1] - yPix;
</script>

<foreignObject
    class=svgPlotText
    x={pix[0]}
    y={pix[1]}
    height={height}
    width={width}
>
    <slot/>
</foreignObject>

