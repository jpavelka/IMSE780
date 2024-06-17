<script>
    import BodyText from "$lib/BodyText.svelte";
import Heading from "$lib/Heading.svelte";
    import { appendixProofs } from "$lib/stores";
    import { onMount } from "svelte";

    onMount(() => {
        setTimeout(() => {
            const containingEl = document.getElementById('appendixProofsContainer')
            for (const ids of $appendixProofs){
                for (const copyId of [ids.thm, ids.proof]) {
                    const el = document.getElementById(copyId);
                    const cloned = el?.cloneNode(true);
                    if (copyId.startsWith('thm')) {
                        cloned.removeAttribute('id');
                        const linkEl = document.createElement('a');
                        linkEl.href = '#' + copyId;
                        linkEl.appendChild(cloned.childNodes[0]);
                        cloned?.insertBefore(linkEl, cloned.childNodes[0]);
                    } else {
                        cloned.style.display = 'block';
                        cloned.id = cloned.id + ':Appendix'
                    }
                    containingEl?.appendChild(cloned);
                }
            }
        }, 2000)
    })
</script>

<Heading level=2 refId=selectedProofs>Selected proofs</Heading>
<BodyText>This section contains proofs to selected statements in the main text.</BodyText>
<div id=appendixProofsContainer></div>