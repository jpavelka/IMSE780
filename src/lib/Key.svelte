<script>
    import { highlightKeyPoints } from "./stores";
</script>

{#if $highlightKeyPoints}
    <span class='keyPoint'>
        <slot />
    </span>
{:else}
    <slot />
{/if}

<style>
    .keyPoint {
        background-color: #ffddaa;
    }
</style>