# Nonlinear programming

<div class='lectureVideoEmbed' video-id='a1bace97c5f1459bb76588dfdba3d4c11d' video-date='2023-10-16'>Discussed the class project, then jumped into nonlinear programming and calculus background.</div>

We will now spend some time discussing the broad topic of nonlinear programming. This will mark a bit of a shift in the class, as up to this point our discussions have mostly been building upon previous topics. As we'll see, the functional forms we deal with for nonlinear programs break fairly distinctly from what we've already seen in the linear/integer programming domains.

Stated most generally, a **nonlinear programming** problem is an optimization problem of the form

$$
\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall \ i\in\{1,\dots,m\} \\
     && \x & \in \R^n
\end{align*}
$$

for some $n$ (the number of variables) and $m$ (number of constraints). In this class we will generally assume that $f$ and $g_i$ are differentiable (and often twice differentiable) everywhere, but otherwise this is a fairly general formulation. We will split our exploration into several sections, with problem classes generally differing over the following specs:

- Number of variables
- Existence of constraints
- Qualities of the objective function $f$
- Qualities of the constraint functions $g_i$

## Example nonlinear programs

Turning away from the world of linear constraints and objectives, it is intuitively clear that the class of problems we can deal with now is much more broad. Here we give a few samples of where nonlinearities may naturally arise in optimization problems.

### Price elasticity

When we first modeled the Wyndor LP in +@sec:exampleLp, we made an important assumption with regards to the revenue generated from the products. We assumed that we could sell as much as we could produce at one fixed cost. This is necessary for a linear objective function, and may be a fine assumption in some scenarios. But it's not always going to match reality.

If you've taken an economics class you're probably familiar with the relationship between the supply of an item and the price people are willing to pay for it. In practice, a store might set a certain price for an item and sell some number of them at that price, but not sell out of everything until the last remaining items go on sale. The effect is that each marginal unit produced is expected to command a slightly lower price than the previous units, and the only way to model this relationship in a mathematical program is with nonlinear functions.

### Investment risk {#sec:portfolioOptimization}

One application where nonlinear programming is often used is in portfolio management. Usually portfolio managers are worried about both the expected returns and the risk associated with their investments. As we'll see, this risk factor is best modeled via nonlinear functions.

Suppose that $n$ stocks are being considered for inclusion into some portfolio, with decision variables $x_j$, $j\in\{1,\dots,n\}$ being the number of shares of stock $j$ to be included. Following the usual notation, we'll let $\mu_j$ denote the expected return for investing in stock $j$ over some time horizon, and let $\sigma_{jj}$ represent the associated variance. Furthermore, there may be correlations between the risks of certain stocks, so it's important to also consider the [covariance](https://en.wikipedia.org/wiki/Covariance) $\sigma_{ij}$ of pairs of stocks $i$ and $j$.

If we let $R(\x)$ denote the expected return of the portfolio defined by $\x$, and let $V(\x)$ denote the variance, then we have

$$
R(\x) = \sum_{j=1}^n\mu_jx_j \qquad\text{and}\qquad V(\x) = \sum_{i=1}^n\sum_{j=1}^n\sigma_{ij}x_ix_j.
$$

Now, $R(\x)$ is a linear function in $\x$, but $V(\x)$ is nonlinear due to the quadratic terms $x_ix_j$. One might select $V(\x)$ to be the objective to be minimized while constraining that $R(\x)$ is above some threshold, or perhaps $R(\x)$ is the objective to be maximized while $V(\x)$ is constrained. Either way, the nonlinearity introduced by $V(\x)$ means that we need new approaches to find an optimal solution.
