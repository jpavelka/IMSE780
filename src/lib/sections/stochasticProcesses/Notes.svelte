<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
</script>

<Heading level=2 refId=stochProcNotes>Notes and further reading</Heading>
<BodyText>
    Our discussion of Markov chains included only the discrete-time version. <CitationRef refId=classText/> also covers a bit on the continuous-time version in section 28.8. There are also several classes of queueing models that we didn't cover, if you're interested you can peruse sections 17.7-17.9 in <CitationRef refId=classText/>. For more extensive coverage on stochastic processes and probability models, I highly recommend <CitationRef refId=ross2007introduction/>.
</BodyText>
<BodyText>
    Both <CitationRef refId=classText/> and <CitationRef refId=ross2007introduction/> also contain sections on simulation, which is a technique for analyzing stochastic processes where the interactions and underlying distributions make key metrics hard to derive mathematically. We did see something like this in the videos in <SectionRef refId=reinforcementLearning/> (basically anywhere he used the words "Monte Carlo", he was talking about simulation). This is a key technique used by OR professionals.
</BodyText>
<BodyText>
    When it comes to Markov decision processes, the standard reference is <CitationRef refId=puterman2014markov/>. As mentioned already, the standard reference for reinforcement learning is <CitationRef refId=sutton2018reinforcement/>.
</BodyText>
<BodyText>
    As far as other courses, the K-State IMSE department offers several courses that extend on ideas from this section. You can read up on these in the <a href='https://catalog.k-state.edu/content.php?catoid=58&navoid=11444'>course catalog</a>:
    <ul>
        <li>IMSE 643 - Industrial Simulation</li>
        <li>IMSE 865 - Simulation of Industrial Management Systems</li>
        <li>IMSE 866 - Applied Stochastic Processes</li>
        <li>IMSE 867 - Stochastic Programming</li>
        <li>IMSE 971 - Industrial Queuing Processes</li>
    </ul>
</BodyText>