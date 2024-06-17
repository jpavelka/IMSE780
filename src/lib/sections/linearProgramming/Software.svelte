<script>
    import BodyText from "$lib/BodyText.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
</script>

<Heading level="2" refId="lpSoftware">Solving LPs with software</Heading>

<BodyText>
    Let's pause briefly now to explain, practically, how LPs can be solved in the real world. By which I mean: if given an LP in practice, what would you do to find the answer? I'm not talking about the theory behind what LP solving software does (we'll get the that later), just how to <em>use</em> the software. This won't be a comprehensive discussion, really just giving you enough to solve our example LP. We'll expand on this discussion some when we get to modeling in the integer programming section.
</BodyText>

<BodyText>
    There are two key components to solving mathematical programming problems in practice: the modeling language and the solver.
</BodyText>

<Heading level=3 refId=lpSoftwareModelLang>Modeling languages</Heading>

<BodyText>
    The job of a modeling language is to take a model specification like <EquationRef refId=prototypeLp/> and turn it into something the computer can understand and solve. Some popular modeling languages are their own standalone software, such as <a href='https://ampl.com/'>AMPL</a> and <a href='https://www.gams.com/'>GAMS</a>. The modeling languages we'll use are instead shipped as Python<Footnote>There are similar packages available in other popular programming languages as well.</Footnote> libraries. Sometimes these languages are built for use with a single solver, while others try to be compatible with several different solvers.
</BodyText>

<Heading level=3 refId=lpSoftwareSolvers>Solvers</Heading>

<BodyText>
    The solver is the software that takes the modeled problem and applies the necessary algorithms to solve it. There are several options here as well. The best solvers all require paid licenses to use fully for commercial purposes<Footnote>Most come with limited licenses for noncommercial uses, and also offer free unrestricted licenses for students and academics.</Footnote>. The two biggest names in this space are <a href='https://www.gurobi.com/'>Gurobi</a> and <a href='https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer'>CPLEX</a>, though <a href='https://www.fico.com/en/products/fico-xpress-optimization'>Xpress</a> and <a href='https://www.shanshu.ai/copt/'>COPT</a> are competitive as well. There are also free, open-source options, but these generally perform much worse than the commercial offerings. Some names in this space are <a href='https://www.coin-or.org/'>COIN-OR</a>, <a href='https://www.gnu.org/software/glpk/'>GLPK</a>, and <a href='https://scipopt.org/'>SCIP</a>.
</BodyText>

<Heading level=3 refId=lpSoftwarePython>Solving our LP with Python</Heading>

<BodyText>
    In the following notebook, I show how we can model and solve our sample LP in two different ways. The first way uses Gurobi as the solver and its purpose-built Python library <code>gurobipy</code> as the modeler. I should mention that since Gurobi is a commercial solver, we need some sort of license for unrestricted use. However, we do get a limited license automatically with the install of <code>gurobipy</code> which is good for problems with up to 2000 variables and 2000 linear constraints. This is pretty limiting for practical industry use, but most everything we'll do in this class will fall comfortably within those bounds.
</BodyText>

<BodyText>
    The second option is a fully open-source option using PuLP, a Python modeling language maintained by COIN-OR. By default, this will use COIN-OR's linear programming solver CLP to solve the model. However, a nice feature of PuLP is that it is solver-agnostic. This means that you can use it to model your problem but switch between any of the popular solvers (including the commercial ones). This is nice to avoid being locked-in to a single solver. But it also may be slightly less performant, or may lack some solver-specific features that come with a solver's built-in API.
</BodyText>

<ColabGist colabId='1_mwxc4xRRVjaMDZL0ObAc0ROqqw5UrJ3' gistId='9c7e1b589a3efb40590606ba6eed102f' refId=sampleLpSolve desc='Solving LPs with Python.'/>

<Heading level=3 refId=lpModelDataSep>Model/data separation</Heading>

<BodyText>
    Our Python models from the last notebook certainly work for the sample problem, but that's about it. The real power of programming comes when you can write one bit of code that can be applied in a wide range of contexts.
</BodyText>

<BodyText>
    Our sample LP is in the form of a <em>resource allocation problem</em>, where the decision is how much to engage in a certain set of possible activities, while staying within the bounds of the available resources. We'd be better off to use Python to set the <em>model logic</em> for such a problem, leaving placeholders where we can inject the particular <em>problem data</em> for any given instance. We'll do that in the next notebook.
</BodyText>

<ColabGist colabId='1Tml3o4GoJ1QuaZsLAEBQIk38spQygs2t' gistId='0a3d429db92daf96fac2eeb23a3197f7' refId=modelDataSep desc='Separating the model from the instance data.'/>
