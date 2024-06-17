<script>
    import Point from "./Point.svelte";
    import { checkPtFeasible } from "./utils";

    export let constants
    export let constraintInfo

    let feasiblePoints = [];
    let x1 = Math.ceil(constants.x1Min);
    while (x1 <= Math.floor(constants.x1Max)) {
        let x2 = Math.ceil(constants.x2Min);
        while (x2 <= Math.floor(constants.x2Max)) {
            if (checkPtFeasible([x1, x2], constraintInfo)) {
                feasiblePoints.push([x1, x2]);
            }
            x2 += 1;
        }
        x1 += 1;
    }
</script>

{#each feasiblePoints as point}
    <Point {constants} {point}/>
{/each}