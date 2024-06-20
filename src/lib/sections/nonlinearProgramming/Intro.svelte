<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
</script>

<Heading level=1 refId=nonlinearProgramming>Nonlinear programming</Heading>

<BodyText>
    We will now spend some time discussing the broad topic of nonlinear programming. This will mark a bit of a shift in the class, as up to this point our discussions have mostly been building upon previous topics. As we'll see, the functional forms we deal with for nonlinear programs break fairly distinctly from what we've already seen in the linear/integer programming domains.
</BodyText>
<BodyText>
    Stated most generally, a <em>nonlinear programming</em> problem is an optimization problem of the form
</BodyText>

<MathDisp>{String.raw`\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall \ i\in\{1,\dots,m\} \\
     && \x & \in \R^n
\end{align*}`}
</MathDisp>
<BodyText>
    for some <Math>n</Math> (the number of variables) and <Math>m</Math> (number of constraints). In this class we will generally assume that <Math>f</Math> and <Math>g_i</Math> are differentiable (and often twice differentiable) everywhere, but otherwise this is a fairly general formulation. We will split our exploration into several sections, with problem classes generally differing over the following specs:
    <ul>
      <li>Number of variables</li>
      <li>Existence of constraints</li>
      <li>Qualities of the objective function <Math>f</Math></li>
      <li>Qualities of the constraint functions <Math>g_i</Math></li>
    </ul>
</BodyText>

<Heading level=2 refId=exampleNLP>Example nonlinear programs</Heading>
<BodyText>
    Turning away from the world of linear constraints and objectives, it is intuitively clear that the class of problems we can deal with now is much more broad. Here we give a few samples of where nonlinearities may naturally arise in optimization problems.
</BodyText>

<Heading level=3 refId=exNLPPriceElasticity>Price elasticity</Heading>
<BodyText>
    When we first modeled the Wyndor LP in <SectionRef refId=exampleLp/>, we made an important assumption with regards to the revenue generated from the products. We assumed that we could sell as much as we could produce at one fixed cost. This is necessary for a linear objective function, and may be a fine assumption in some scenarios. But it's not always going to match reality.
</BodyText>
<BodyText>
    If you've taken an economics class you're probably familiar with the relationship between the supply of an item and the price people are willing to pay for it. In practice, a store might set a certain price for an item and sell some number of them at that price, but not sell out of everything until the last remaining items go on sale. The effect is that each marginal unit produced is expected to command a slightly lower price than the previous units, and the only way to model this relationship in a mathematical program is with nonlinear functions.
</BodyText>

<Heading level=3 refId=portfolioOptimization>Investment risk</Heading>
<BodyText>
    One application where nonlinear programming is often used is in portfolio management. Usually portfolio managers are worried about both the expected returns and the risk associated with their investments. As we'll see, this risk factor is best modeled via nonlinear functions.
</BodyText>

<BodyText>
    Suppose that <Math>n</Math> stocks are being considered for inclusion into some portfolio, with decision variables <Math>x_j</Math>, <Math>j\in\{1,\dots,n\}</Math> being the number of shares of stock <Math>j</Math> to be included. Following the usual notation, we'll let <Math>\mu_j</Math> denote the expected return for investing in stock <Math>j</Math> over some time horizon, and let <Math>\sigma_{jj}</Math> represent the associated variance. Furthermore, there may be correlations between the risks of certain stocks, so it's important to also consider the <a href="https://en.wikipedia.org/wiki/Covariance">covariance</a> <Math>\sigma_{ij}</Math> of pairs of stocks <Math>i</Math> and <Math>j</Math>.
</BodyText>
<BodyText>
    If we let <Math>R(\x)</Math> denote the expected return of the portfolio defined by <Math>\x</Math>, and let <Math>V(\x)</Math> denote the variance, then we have
</BodyText>

<MathDisp>R(\x) = \sum_{j=1}^n\mu_jx_j \qquad\text{and}\qquad V(\x) = \sum_{i=1}^n\sum_{j=1}^n\sigma_{ij}x_ix_j.
</MathDisp>
<BodyText>
    Now, <Math>R(\x)</Math> is a linear function in <Math>\x</Math>, but <Math>V(\x)</Math> is nonlinear due to the quadratic terms <Math>x_ix_j</Math>. One might select <Math>V(\x)</Math> to be the objective to be minimized while constraining that <Math>R(\x)</Math> is above some threshold, or perhaps <Math>R(\x)</Math> is the objective to be maximized while <Math>V(\x)</Math> is constrained. Either way, the nonlinearity introduced by <Math>V(\x)</Math> means that we need new approaches to find an optimal solution.
</BodyText>