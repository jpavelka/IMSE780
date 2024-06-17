<script>
    import { coordToPix } from "./utils";

    export let constants;
    export let point;
    export let color = 'black';
    export let r = 3.5;

    $: style = `stroke:${color};fill:${color};`
    $: pix = coordToPix(constants, ...point);
</script>

<circle cx={pix[0]} cy={pix[1]} {r} {style} />