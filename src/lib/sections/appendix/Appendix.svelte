<script>
    import Heading from "$lib/Heading.svelte";
    import BadIps from "./BadIps.svelte";
    import LinearAlgebra from "./LinearAlgebra.svelte";
    import ColabMath from "./ColabMath.svelte";
    import SelectedProofs from "./SelectedProofs.svelte";
    import Symbols from "./Symbols.svelte";
</script>

<Heading refId=appendix level=1 dispSecNum='A' includeDispSecNum={false}>Appendix</Heading>
<Symbols/>
<LinearAlgebra/>
<ColabMath/>
<BadIps/>
<SelectedProofs/>