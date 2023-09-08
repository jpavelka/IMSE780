## Post-optimality analysis {#sec:lpPostOpt}

After a linear program has been solved, it is often the case that you'd like to consider separate, but similar scenarios for you problem of interest. In the case of our example LP +@eq:prototypeLp, the company might like to know how much the solution would change if they could add another hour of production time to one of their facilities. Additionally, often when a problem is formulated, the exact data ($\A, \b, \c$) that is used is only an estimate, or subject to decisions made by upper management. In these cases we might like to know something about how the objective could change with small updates to these values. These activities all fall under the heading of __post-optimality analysis__, and LP theory gives us some tools for dealing with them.

### Re-optimization

In the simplest and most general case, say that we've already solved a very large LP, and for whatever reason we need to make a few tweaks to the problem and see how the solution changes. One approach to this could be to re-run simplex from scratch on the new problem. But for very large LPs, a better approach may be __re-optimization__, which is essentially a way to "start where you left off" on the previous problem. The idea is to start from the previous optimal basis and deduce how changes in the data affect the simplex information from +@eq:simplexMatrixGeneralized.

The advantage here is that since the original problem is very similar to the one being solved now, the new optimal solution is likely to be "nearby" to the old optimal solution, and thus we can hope that fewer simplex iterations are needed to complete the re-optimization process when compared to re-solving the problem from scratch. It is very possible that, even with the changes, the previous optimal solution is still optimal for the new problem, which you could know by checking the newly-calculated reduced costs. Even if the old solution is no longer optimal, it may still be feasible, allowing you to continue the simplex algorithm from there. Lastly, even if the old solution is no longer feasible for the new problem, a few iterations of the _dual_ simplex algorithm may take you to an optimal solution.

### Shadow Prices {#sec:shadowPrices}
Consider a resource allocation problem, like e.g. our sample LP +@eq:prototypeLp, where the problem is of the form +@eq:standardFormLpMatrix and the constraints denote how much of each resource is needed for each possible activity. In these cases, at the optimal basis the reduced costs $\c_B\B\inv\b-\c$ corresponding to the slack variable for each constraint denote the so-called __shadow price__ of the associated resource.

Let's look again +@eq:simplexExampleFinalMatrix, which was how our system looked after we completed the simplex method while solving the sample LP in +@sec:simplexExample. The final three coefficients in the top row are the shadow prices of the three resources, i.e. an hour of production capacities at Plants 1, 2, and 3, respectively. Looking at the system, we see a shadow price of 0 for Plant 1, a price of $\frac{3}{2}$ for Plant 2, and a price of $1$ for Plant 3.

How do we interpret these shadow prices? Let's consider Plant 3, whose shadow price is 1. In the context of the final simplex iteration, that same value 1 was the reduced cost on $x_5$, the slack variable for the Plant 3 constraint. We interpret that to mean that a small increase in $x_5$ would decrease the objective value by \$1,000 per unit, which is why we decided not to bring $x_5$ into the basis. Since $x_5$ is the _slack_ in the Plant 3 constraint, we can interpret an increase in $x_5$ as _taking away_ capacity from Plant 3. So we could also interpret that reduced cost as telling us that taking away capacity from Plant 3 would cost us \$1,000 per hour. On the flip side, this should also mean that _increasing_ capacity at Plant 3 would be worth and extra \$1,000 per hour to us.

This insight is the key to interpreting the shadow price. It is the amount we would expect the objective to increase if we could gain a _little more_[^shadowPriceIncreaseSmall] of a given resource, and hence also the maximum _price_ we'd be willing to pay in order to secure this increase.

[^shadowPriceIncreaseSmall]: If you increase it too much, interactions from other constraints may change the effect. How much is too much? We'll explore this question in +@{sec:sensitivityAnalysis}

So in our sample problem, we should be willing to pay \$1,500 for an extra hour of capacity at Plant 2, and \$1,000 for an extra hour at Plant 3. But the shadow price for Plant 1 is 0. Why is that? Well, in the optimal solution to the sample problem, we only use 2 of the available 4 hours at Plant 1. We already have 2 hours of capacity there that we aren't using, so why would we pay anybody for even more?

Another nice interpretation for the shadow price comes from the dual problem. Recall in +@sec:corporateTakeover when we formulated our "corporate takeover" problem +@eq:prototypeLpDual, which we later found was actually the dual to our sample LP. In that formulation, the variables $y_1, y_2, y_3$ represented how much we'd be willing to pay for time at Wyndor's three facilities, and when we ran the notebook in +@sec:corporateTakeover the optimal values for these variables were again those same values from above, $0, \frac{3}{2}$, and $1$. Of course, it should be no surprise that these are exactly equal to the shadow prices, as we've already seen the connection between the two in the proof to <span class='thmRef' for='thm:simplexWorks'></span>.

### Sensitivity Analysis {#sec:sensitivityAnalysis}
__Sensitivity analysis__ is the process of determining how small changes in problem data can alter the optimal solution. As explained in @classText, section 7.2, 

> one assumption of linear programming is that all the parameters of the model ($a_{ij}$, $b_i$, and $c_j$) are known constants. Actually, the parameter values used in the model normally are just estimates based on a prediction of future conditions. The data obtained to develop these estimates often are rather crude or nonexistent, so that the parameters in the original formulation may represent little more than quick rules of thumb provided by busy line personnel. The data may even represent deliberate overestimates or underestimates to protect the interests of the estimators.

Thus it is valuable to know if changes in problem data will have outsized effects on the optimal solution. In this section, we'll discuss ways to determine the so-called _allowable range_ for different values, meaning the values a particular coefficient can take without changing the optimal solution.

For the sake of brevity, we'll only carry out this analysis for the right-hand side values $b_i$. Changes in other problem data are covered in section 7.2 of @classText.

<h4>Changing a single rhs value</h4>

Suppose after running simplex you would like to consider changes to the right-hand side values, from $\b$ to $\mathbf{\hat b}$. From +@eq:simplexMatrixGeneralized, we know that the values of $\b$ affect only the right-hand side of the final matrix system. So, in particular, the reduced costs on all variables will stay the same. Thus if the new right-hand side values $\B\inv\mathbf{\hat b}$ are all non-negative, we're still at the optimal solution.

Let's take our the Wyndor Glass problem as an example. sample LP +@eq:prototypeLp. @classText gives the following exposition:

> Sensitivity analysis is begun for the original Wyndor Glass Co. problem by examining the optimal values of the $y_i$ dual variables $( y_1^* = 0, y_2^* = \frac{3}{2}, y_3^*=1)$. These shadow prices give the marginal value of each resource $i$ (the available production capacity of Plant $i$) for the activities (two new products) under consideration, where marginal value is expressed in the units of $Z$ (thousands of dollars of profit per week). As discussed previously, the total profit from these activities can be increased \$1,500 per week ($y_2^*$ times \$1,000 per week) for each additional unit of resource 2 (hour of production time per week in Plant 2) that is made available. This increase in profit holds for relatively small changes that do not affect the feasibility of the current basic solution (and so do not affect the $y_i^*$ values). Consequently, the OR team has investigated the marginal profitability from the other current uses of this resource to determine if any are less than $1,500 per week. This investigation reveals that one old product is far less profitable. The production rate for this product already has been reduced to the minimum amount that would justify its marketing expenses. However, it can be discontinued altogether, which would provide an additional 12 units of resource 2 for the new products. Thus, the next step is to determine the profit that could be obtained from the new products if this shift were made. This shift changes $b_2$ from 12 to 24 in the linear programming model.

So we'd like to know what happens when we change $b_2$ from 12 to 24. As a first step, let's take a look at the plot for this problem with the modified constraint:

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"chooseObjVals": true, "yMax": 14.99, "removeConstraints": [2], "addConstraints": [[[0, 2, 24, "l"], [6, 13.1]]]}'> Sorry, your browser does not support inline SVG.</svg>

Compared to our first plot of this problem from +@sec:lpVisualized, we see that the bounding line for the constraint on $x_2$ has been moved way up, such that this constraint does not even touch the feasible region anymore[^significantChangeToSample]. How might this affect the solution?

[^significantChangeToSample]: This might be a first hint that our problem has changed significantly.

Let's go ahead and calculate the altered right-hand side according to +@eq:simplexMatrixGeneralized. Following the formulas, we'll get
$$
Z = \c_B\B\inv\b = 54,\qquad \begin{bmatrix}x_3 \\ x_2 \\ x_1\end{bmatrix} = \x_B = \B\inv\b = \begin{bmatrix}6 \\ 12 \\ -2\end{bmatrix}
$$
at our previous optimal basis. For simplex, a negative right-hand side means a negative value for a basic variable, and thus an infeasible solution. So our old optimal basis is no longer feasible.

What happened here? In terms of the plots, the original basic solution came at the intersection of the constraints $3x_1 + 2x_2 \leq 18$ and $2x_2 \leq 12$. That intersection used to be in the feasible region, but when the second constraint was changed to $2x_2 \leq 24$ the intersection changed to somewhere off the plot entirely.

So finding the optimal solution to our new problem requires a change of basis. Starting from a primal-infeasible basis, the best way to proceed is an application of the dual simplex method to regain feasibility[^dualSimplexForSensitivity]. Doing so would bring us to a new basis of $(x_4, x_2, x_3)$ and a new optimal solution of $(x_1, x_2, x_3, x_4, x_5) = (0, 9, 4, 6, 0)$, which has a corresponding objective value of $Z=45$.

[^dualSimplexForSensitivity]: We aren't covering dual simplex in this course, but I think it's good for you to know that it exists, and in particular that it has a role to play in sensitivity analysis or re-optimization.

<h4>Determining the allowable range</h4>

Let's recap what we've done here. We were considering a change to the right-hand side values of our LP. Our analysis involved changing the right-hand side then re-optimizing. We found that increasing $b_2$ by 12 changed our optimal basis and increased the objective value by 9, from 36 to 45. But wait, the shadow price on $b_2$ in the original model was $\frac{3}{2}$, so why didn't we get an increase of $9\times\frac{3}{2}=13.5$? And we're already past the re-optimization section, so why did we run simplex again?

On the shadow price issue: We mentioned when introducing shadow prices in +@sec:shadowPrices that they are only valid _locally_, i.e. they hold from "small" changes in the resource, but if changes become too big then all bets are off. But how big is too big? We'll explore that next, and we won't even (fully) run simplex to do it!

Let's first set some notation. We'll use the capital greek letter $\Delta$ to denote the "change in" some value, so that $\Delta b_2$ is the amount we change $b_2$ for the analysis. So in our previous example, we had $\Delta b_2 = 24 - 12 = 12$. We'd like to find the range of values for $\Delta b_2$ such that our previous basis is still optimal.

Let's first consider feasibility. Recall that a basic solution is feasible if and only if all the variable values are non-negative, which from +@eq:simplexMatrixGeneralized gives us $\B\inv\b\geq0$. At the optimal solution to our sample problem, we have

$$
\B\inv = \begin{bmatrix}
1 & \frac{1}{3} & -\frac{1}{3} \\
0 & \frac{1}{2} & 0 \\
0 & -\frac{1}{3} & \frac{1}{3}
\end{bmatrix}
$$

Changing $b_2$ to $b_2 + \Delta b_2$ turns the requirement into:

$$
\begin{align*}
&&
\begin{bmatrix}
1 & \frac{1}{3} & -\frac{1}{3} \\
0 & \frac{1}{2} & 0 \\
0 & -\frac{1}{3} & \frac{1}{3}
\end{bmatrix}
\begin{bmatrix}
4 \\ 12 + \Delta b_2 \\ 18
\end{bmatrix}
&\geq\zeros\\
\Leftrightarrow &&
\begin{bmatrix}
2 + \frac{1}{3}\Delta b_2 \\
6 + \frac{1}{2}\Delta b_2 \\
2 - \frac{1}{3}\Delta b_2 \\
\end{bmatrix}
&\geq\zeros
\end{align*}
$$

The first inequality implies $\Delta b_2\geq-6$, the second implies $\Delta b_2\geq-12$, and the third implies $\Delta b_2\leq 6$. So to satisfy all three simultaneously, we need to keep $-6\leq\Delta b_2\leq6$, the equivalent of saying $6\leq b_2\leq 18$.

So keeping $6\leq b_2\leq 18$ gives a feasible solution, but is the old basis still optimal? It turns out that we can answer that very simply, by noticing that changes to $\b$ have no effect on the reduced cost vector $\c_B\B\inv\A-\c$. Since this basis was optimal for the original, those same reduced costs must still be non-negative, so the old optimal basis is still optimal whenever $\Delta b_2$ is in the acceptable range.

As for how much the objective changes, let's recall (again from +@eq:simplexMatrixGeneralized) that the objective value at a basic solution is given by $Z=\c_B\B\inv\b$. We've already calculated $\c_B\B\inv = \begin{bmatrix}0 & \frac{3}{2} & 1\end{bmatrix}$ at the optimal basis, and thus altering $b_2$ gives us

$$
Z = \begin{bmatrix}0 & \frac{3}{2} & 1\end{bmatrix}\begin{bmatrix}4 \\ 12 + \Delta b_2 \\ 18\end{bmatrix}
  = 36 + \frac{3}{2}\Delta b_2.
$$

So our interpretation of the shadow price holds over this range as well.

Lastly, let's take a look at the plots of the problem when we take $b_2$ at the limits of its allowable range. First, for $b_2=6$:

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"chooseObjVals": true, "removeConstraints": [2], "addConstraints": [[[0, 2, 6, "l"], [6, 4.1]]]}'> Sorry, your browser does not support inline SVG.</svg>

And for $b_2=18$.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"chooseObjVals": true, "removeConstraints": [2], "addConstraints": [[[0, 2, 18, "l"], [6, 10.1]]]}'> Sorry, your browser does not support inline SVG.</svg>

We won't spend much time dwelling on this, but notice how the original optimal solution came at the intersection of the second and third constraints of +@eq:prototypeLp. Now on these two plots, the optimal is still at that intersection, while also adding a third intersecting constraint[^prototypeDegeneracy]. Moving any further would make that intersection infeasible, which is why the allowable range stops there.

[^prototypeDegeneracy]: This also introduces potential degeneracy issues, but we'll ignore that for the purposes of this class.
