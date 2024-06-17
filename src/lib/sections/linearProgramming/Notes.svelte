<script>
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
</script>

<Heading level=2 refId=lpNotes>Notes and further reading</Heading>

<BodyText>
    The presentation in this section followed very closely to various sections in chapters 3-7 in <CitationRef refId=classText/>. Many of the proofs in <SectionRef refId=lpDuality/> were adapted from <CitationRef refId=bertsimas-LPbook/>. Some other topics for the interested reader to follow up on:
    <ul>
        <li>We briefly mentioned <em>dual simplex</em> and some of its uses in these notes. <CitationRef refId=classText/> section 8.1 covers it in more detail.</li>
        <li>When covering sensitivity analysis (<SectionRef refId=sensitivityAnalysis/>) we only considered changes to a single rhs value. <CitationRef refId=classText/> (section 7.2) covers further cases, like analyzing changes in other problem data, or simultaneous changes in multiple rhs values.</li>
        <li>Section 7.4 in <CitationRef refId=classText/> briefly discusses <em>robust optimization</em>  where the setup includes ranges of potential values of model data, and the goal is to find solutions that will be feasible and close to optimal for the entire set of potential problem data.</li>
        <li>Simplex is not the only algorithm for solving LPs. Sections 4.9 and 8.4 of <CitationRef refId=classText/> study so-called <em>interior point</em> algorithms for linear programs. These algorithms have an interesting role in the history of LP. Most notably, many of these methods have been proven to terminate in a number of steps <em>polynomial</em> in the size of the LP considered, a feat that has not been duplicated for the simplex method. But even with this theoretical advantage, the interior point methods are not usually faster than simplex in practice. Even so, most solvers will include an interior point method that will be called upon in certain circumstances.</li>
    </ul>
</BodyText>

<BodyText>
    The K-State IMSE department offers <a href="https://catalog.k-state.edu/preview_course_nopop.php?catoid=54&coid=375882">IMSE 881</a>, a full semester course devoted to linear programming theory.
</BodyText>