<script>
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

</script>
<Heading level=2 refId=ipSoftware>Solving IPs with software</Heading>

<BodyText>
    Let's now talk a bit about using software to solve integer programming problems. This discussion is an extension to the one we already had in <SectionRef refId=lpSoftware/>, where we spoke about solvers in the context of linear programs. Much of what we said there applies here as well, and there is significant overlap between the best LP solvers and best IP solvers.
</BodyText>

<Heading level=3 refId=ipSolvers>Solvers</Heading>
<BodyText>
    Speaking of, let's talk a bit more about IP solvers. In my opinion, integer programs sit in something of a sweet spot where the types of problems you can model are broad and useful, while at the same time software has improved to a point that the models are viable to be solved within reasonable time frames. To illustrate the effects of recent software improvements, let's consider the case of Gurobi. The company was founded 2008. As of their latest major version release (10.0) in November 2022, <a href='https://www.gurobi.com/features/gurobi-optimizer-delivers-unmatched-performance/'>they reported a 75x speedup</a> in solve times over the 1.1 version. Note that this includes just the software improvements, not taking into account the hardware advances in that period as well.
</BodyText>

<BodyText>
    As mentioned earlier, there are basically two classes of solvers available: the free, open source ones (<a href='https://www.coin-or.org/'>CBC</a>, <a href='https://scipopt.org/'>SCIP</a>, <a href='https://highs.dev/'>HiGHS</a>), and the commercial (paid) ones (<a href='https://www.gurobi.com/'>Gurobi</a>, <a href='https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer'>CPLEX</a>, <a href='https://www.fico.com/en/products/fico-xpress-optimization'>Xpress</a>, <a href='https://www.shanshu.ai/copt/'>COPT</a>). As far as performance, you generally get what you pay for. For the last couple decades, regularly updated performance benchmarks for these solvers have been published [<CitationRef refId=solverBenchmarks/>]. The <a href='https://plato.asu.edu/ftp/milp.html'>latest MIP benchmarks</a><Footnote>You'll notice some of the big names (specifically CPLEX and Xpress) are missing from these benchmarks. They used to be included as well, but there was some bit of drama from a few years back that led to the big commercial solvers asking to be excluded from these public benchmarks. Gurobi has since returned.</Footnote> are indicative of the usual trend, that the commercial offerings can solve far more of the test instances within the specified time limit, and the solve times are generally 5-10x faster<Footnote>Note that, due to the nature of the benchmarks, the reported speed differences underestimate the differences on larger problems that are more likely to be of interest in industry applications.</Footnote>.
</BodyText>

<BodyText>
    License costs for this software can be expensive, but you don't always need to pay a lot to use them. You can usually download and use the big commercial solvers on smaller problems in non-commercial contexts, with limits on the number of variables and constraints in your models. But the limits are such that they would generally not be offering a large benefit over the free solvers anyway. More useful for you, the commercial solvers do offer free licenses to students and academics for non-commercial use, and these licenses do not come with any size limitations<Footnote>You may want to take advantage of this for your class project.</Footnote>. Lastly, even commercial users can request free (but temporary) trial licenses for development purposes, letting you "try before you buy" when you have a new use case in mind.
</BodyText>

<Heading level=3 refId=solvingIpsWithPython>Solving IPs with Python</Heading>

<BodyText>
    Now that we've got some modeling down, let's see how we can implement the models using Python code. In the following notebook, we illustrate how to set up several of the models explored above, with special attentions paid to the generalized models of <SectionRef refId=ipModelDataSep/>.
</BodyText>

<ColabGist
    colabId='1txl3wJn-QAZi9XpC3z0kG8fqUO78td6b'
    gistId='73f227dfef3ba217c11fe80db18d6b5f'
    refId='ipModeling'
    desc='Modeling IPs in Python'
/>
