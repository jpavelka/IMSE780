## Post-optimality analysis {#sec:lpPostOpt}

After a linear program has been solved, it is often the case that you'd like to consider separate, but similar scenarios for you problem of interest. In the case of our example LP +@eq:prototypeLp, the company might like to know how much the solution could change if they could add another hour of production time to one of their facilities. Additionally, often times when a problem is formulated, the exact data that is used is only an estimate of the true data, and we'd like to know something about how the objective might change will small updates to our estimates. These activities all fall under the heading of __post-optimality analysis__, and LP theory gives us some tools for dealing with them.

### Re-optimization

In the simplest and most general case, say that we've already solved a very large LP, and for whatever reason we need to make a few tweaks to the problem and see how the solution changes. One approach to this would be to re-run simplex from scratch on the new problem. But for very large problems, a better approach may be __re-optimization__, which is essentially a way to "start where you left off" on the previous problem. The idea is to start from the previous optimal basis and deduce how the changes introduced to the problem affect the simplex information from +@eq:simplexMatrixGeneralized.

The advantage here is that since the original problem is very similar to the one being solved now, the new optimal solution is likely to be "nearby" to the old optimal solution, and thus we can hope that fewer simplex iterations are needed to complete the re-optimization process when compared to re-solving the problem from scratch. It is very possible that, even with the changes, the previous optimal solution is still optimal for the new problem, which you could know by checking the newly-calculated reduced costs. Even if the old solution is no longer optimal, it may still be feasible, allowing you to continue the simplex algorithm from there. Lastly, even fn the old solution is no longer feasible for the new problem, a few iterations of the _dual_ simplex algorithm may take you to an optimal solution.

### Shadow Prices
pg 135

### Sensitivity Analysis
pg 137

### Duality
section 6.5

### rhs allowable range
pg 236
(other things in section 7.2, but I may just skip)