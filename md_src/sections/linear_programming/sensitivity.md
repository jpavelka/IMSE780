## Post-optimality analysis {#sec:lpPostOpt}

After a linear program has been solved, it is often the case that you'd like to consider separate, but similar scenarios for you problem of interest. In the case of our example LP +@eq:prototypeLp, the company might like to know how much the solution could change if they could add another hour of production time to one of their facilities. Additionally, often times when a problem is formulated, the exact data that is used is only an estimate of the true data, and we'd like to know something about how the objective might change will small updates to our estimates. These activities all fall under the heading of __post-optimality analysis__, and LP theory gives us some tools for dealing with them.

### Re-optimization

In the simplest and most general case, say that we've already solved a very large LP, and for whatever reason we need to make a few tweaks to the problem and see how the solution changes. One approach to this would be to re-run simplex from scratch on the new problem. But for very large problems, a better approach may be __re-optimization__, which is essentially a way to "start where you left off" on the previous problem. The idea is to start from the previous optimal basis and deduce how the changes introduced to the problem affect the simplex information from +@eq:simplexMatrixGeneralized.

The advantage here is that since the original problem is very similar to the one being solved now, the new optimal solution is likely to be "nearby" to the old optimal solution, and thus we can hope that fewer simplex iterations are needed to complete the re-optimization process when compared to re-solving the problem from scratch. It is very possible that, even with the changes, the previous optimal solution is still optimal for the new problem, which you could know by checking the newly-calculated reduced costs. Even if the old solution is no longer optimal, it may still be feasible, allowing you to continue the simplex algorithm from there. Lastly, even fn the old solution is no longer feasible for the new problem, a few iterations of the _dual_ simplex algorithm may take you to an optimal solution.

### Shadow Prices
Consider a resource allocation problem, like e.g. our sample LP +@eq:prototypeLp, where the problem is of the form +@eq:standardFormLpMatrix and the constraints denote how much of each resource is needed for each possible activity. In these cases, at the optimal basis the reduced costs $\c_B\B\inv\b-\c$ corresponding to the slack variable for each constraint denote the so-called __shadow price__ of the associated resource.

Let's look again +@eq:simplexExampleFinalMatrix, which was how our system looked after we completed the simplex method while solving the sample LP in +@sec:simplexExample. The final three coefficients in the top row are the shadow prices the three resources, i.e. an hour of production capacities at Plants 1, 2, and 3, respectively. Looking at the system, we see a shadow price of 0 for Plant 1, a price of $\frac{3}{2}$ for Plant 2, and a price of $1$ for Plant 3.

How do interpret these shadow prices? Let's consider Plant 3, whose shadow price is 1. In the context of the final simplex iteration, that same value 1 was the reduced cost on $x_5$, the slack variable for the Plant 3 constraint. We interpret that to mean that a small increase in $x_5$ would decrease the objective value by \$1,000 per unit, which is why we decided not to bring $x_5$ into the basis. Since $x_5$ is the _slack_ in the Plant 3 constraint, we can interpret an increase in $x_5$ as _taking away_ capacity from Plant 3. So we could also interpret that reduced cost as telling us that taking away capacity from Plant 3 would cost us \$1,000 per hour. On the flip side, this should also mean that _increasing_ capacity at Plant 3 would be worth and extra \$1,000 per hour to us.

This insight is the key to interpreting the shadow price. It is the amount we would expect the objective to increase[^shadowPriceIncreaseSmall] if we could gain more of a given resource, and hence also the maximum _price_ we'd be willing to pay in order to secure this increase.

[^shadowPriceIncreaseSmall]: In a local sense, at least. If you increase it too much, interactions from other constraints may change the effect.

So in our sample problem, we should be willing to pay \$1,500 for an extra hour of capacity at Plant 2, and \$1,000 for an extra hour at Plant 3. But the shadow price for Plant 1 is 0. Why is that? Well, in the optimal solution to the sample problem, we only use 2 of the available 4 hours at Plant 1. We already have 2 hours of capacity there that we aren't using, so why would we pay anybody for even more?

Another nice interpretation for the shadow price comes from the dual problem. Recall in +@sec:corporateTakeover when we formulated our "corporate takeover" problem +@eq:prototypeLpDual, which we later found was actually the dual to our sample LP. In that formulation, the variables $y_1, y_2, y_3$ represented how much we'd be willing to pay for time at Wyndor's three facilities, and when we ran the notebook in +@sec:corporateTakeover the optimal values for these variables were again those same values from above, $0, \frac{3}{2}$, and $1$. Of course, it should be no surprise that these are exactly equal to the shadow prices, as we've already seen the connection between the two in the proof to <span class='thmRef' for='thm:simplexWorks'></span>.

### Sensitivity Analysis
__Sensitivity analysis__ is the process of determining how small changes in problem data can alter the optimal solution. As explained in +@classText, section 7.2, 

> one assumption of linear programming is that all the parameters of the model ($a_{ij}$, $b_i$, and $c_j$) are known constants. Actually, the parameter values used in the model normally are just estimates based on a prediction of future conditions. The data obtained to develop these estimates often are rather crude or nonexistent, so that the parameters in the original formulation may represent little more than quick rules of thumb provided by busy line personnel. The data may even represent deliberate overestimates or underestimates to protect the interests of the estimators.

Thus it is valuable to know if changes in problem data will have outsized effects on the optimal solution. In this section, we'll discuss ways to determine the so-called _allowable range_ for different values, meaning the values a particular coefficient can take without changing the optimal solution.

For the sake of brevity, we'll only carry out this analysis for the right-hand side values $\b_i$. Changes in other problem data is covered in section 7.2 of +@classText.

<h4>Allowable range for constraint rhs values</h4>

include simultaneous analysis

### An intro to robust optimization?
