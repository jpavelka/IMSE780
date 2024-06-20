<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Heading from "$lib/Heading.svelte";
</script>

<Heading level=2 refId=nlpSoftware>Software for nonlinear programs</Heading>

<BodyText>
    In this section we'll explore some options for solving nonlinear programs with Python. We'll highlight different libraries in each of the following notebooks, using the example problems from class as ways to explore each library's capabilities. I should stress that the state of software for nonlinear programs is a little less robust than the comparable worlds of linear and integer programming, and you may find that solution techniques do not scale as well. I should also stress that I don't know these solvers as well as I know linear and integer programming software, so you can take my recommendations as a starting point but don't assume that these options will always be your best choice.
</BodyText>
<BodyText>
    We'll start with a notebook focused on our old friend, <code>gurobipy</code>.
</BodyText>
<ColabGist
    colabId=1Mhw-tFd1LoMJrQOyfKhqMVk9VbdO3N0K
    gistId=24e356a02d828b955899aff42615507e
    refId=gurobipyNlp
    desc='Nonlinear programming with gurobipy'
/>

<BodyText>
    Next up is is <a href='https://www.cvxpy.org/index.html'><code>cvxpy</code></a>, which is an open-source convex optimization solver.
</BodyText>
<ColabGist
    colabId=1SBSnAWbp-hLevrgC3cXl6i1NT7AmwM0A
    gistId=5a336251ddc52b76c8af338a071976f9
    refId=cvxpyNlp
    desc='Nonlinear programming with cvxpy'
/>

<BodyText>
    Lastly, we'll show samples using the (commercial) modeling language <a href='https://ampl.com/'>AMPL</a> to build models, then solve them with the open-source solver <a href='https://coin-or.github.io/Ipopt/'>IPOPT</a>.
</BodyText>
<ColabGist
    colabId=1Ryt_O_3ICfuMSUuGxiFGZfRc1TdSCihN
    gistId=31c2b6a2f8209be8e9eee6ec9913434a
    refId=amplIpoptNlp
    desc='Nonlinear programming with AMPL and IPOPT'
/>
<BodyText>
    Another (commercial) solver worth mentioning is <a href='https://minlp.com/baron-solver'>BARON</a>. I would have included some examples for it too, but I couldn't find a good way to run it on Colab.
</BodyText>