<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Heading from "$lib/Heading.svelte";
</script>

<Heading level=2 refId=ipNotes>Notes and further reading</Heading>

<BodyText>
    While I've taken many of this section's modeling examples from chapter 12 in<CitationRef refId=classText/>, for the theory and algorithms I prefer the presentation in<CitationRef refId=wolsey2020/>. Much of the content here is due to that book's chapters 3, 6, 7, and 8.
</BodyText>
<BodyText>
    In fact, there's even more from<CitationRef refId=wolsey2020/> that I would have liked to cover if I had the time:
    <ul>
        <li>More classes of cutting planes (that are used by solvers) are covered in later sections of chapter 8.</li>
        <li>There is some interesting theory behind when an integer program is easy to solve (as is the case with network flows) covered in chapter 3. The concepts to look for are total unimodularity and matroids.</li>
        <li>Column generation (chapter 11) is an nifty technique for tackling certain integer programs with large numbers of variables.</li>
        <li>Chapter 13 covers several different kinds of heuristics that a MIP solver might use to find good integer solutions or improve existing ones, which can help to fathom branch and bound nodes and keep the tree from growing too large.</li>
        <li>Sections 7.5 and 7.6 cover several aspects of the types of branch and cut algorithms that are used in the best integer programming solvers.</li>
    </ul>
</BodyText>

<BodyText>
    I could always say more about complexity theory. Since we didn't get too technical in our presentation here, I thought I could point out <a href='https://www.quantamagazine.org/complexity-theorys-50-year-journey-to-the-limits-of-knowledge-20230817/'>a recent article</a> I read talking about the history of complexity research and current trends. It also is non-technical and written for a general audience, so I think it is actually pretty approachable. Anyone interested by what we covered in class should certainly check it out.
</BodyText>
<BodyText>
    Lastly, I'll note that the K-State IMSE department offers <a href='https://catalog.k-state.edu/content.php?catoid=58&navoid=11444'>IMSE 884</a>, a full semester course devoted to integer programming and combinatorial optimization. Additionally, <a href='https://catalog.k-state.edu/content.php?catoid=58&navoid=11444'>IMSE 882</a> covers network flows and graph theory and has some intersection with the topics we covered here as well.
</BodyText>