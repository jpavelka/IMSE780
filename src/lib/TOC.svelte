<script>
    import TocInner from "./TOCInner.svelte";
    import { sections, showToc } from "./stores";
</script>

<div class=toc style={`width:${$showToc ? 'calc(var(--tocWidth) * 1px)' : '0px'}`}>
    <TocInner hierarchy={$sections.hierarchy}/>
</div>

<style>
    .toc {
        height: calc(100% - 4rem);
        width: 0;
        position: fixed;
        z-index: 3;
        top: 0;
        left: 0;
        background-color: #ebebeb;
        overflow-x: hidden;
        padding-top: 1rem;
        transition: 0.5s;
        overflow-y: scroll;
        margin-top: 3rem;
    }
</style>