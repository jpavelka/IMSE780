<script lang="ts">
    import { refNumbering } from "$lib";
    import { figures } from "./stores";
    export let refId: string;

    refId = refNumbering(figures, refId, "fig");
    const figNum = $figures.numbers[refId];
</script>

<div class="figDiv">
    <slot />
    <div class="caption"><b>Figure {figNum}:</b> <slot name="caption" /></div>
</div>

<style>
    .figDiv {
        max-width: 90%;
        margin: 1.5rem auto;
        overflow-x: auto;
    }
    .caption {
        font-size: 1.2rem;
    }
</style>
