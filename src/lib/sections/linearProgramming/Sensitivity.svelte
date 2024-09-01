
<script>
  import BlockQuote from "$lib/BlockQuote.svelte";
  import BodyText from "$lib/BodyText.svelte";
  import CitationRef from "$lib/CitationRef.svelte";
  import EquationRef from "$lib/EquationRef.svelte";
  import Footnote from "$lib/Footnote.svelte";
  import Heading from "$lib/Heading.svelte";
  import InteractiveLp from "$lib/InteractiveLp.svelte";
  import Math from "$lib/Math.svelte";
  import MathDisp from "$lib/MathDisp.svelte";
  import SectionRef from "$lib/SectionRef.svelte";
  import TheoremRef from "$lib/TheoremRef.svelte";
  import ChooseObjVals from "$lib/drawing/ChooseObjVals.svelte";
</script>

<Heading level=2 refId=lpPostOpt>Post-optimality analysis</Heading>
<BodyText>
  After a linear program has been solved, it is often the case that you'd like to consider separate, but similar scenarios for you problem of interest. In the case of our example LP <EquationRef refId=prototypeLp/>, the company might like to know how much the solution would change if they could add another hour of production time to one of their facilities. Additionally, often when a problem is formulated, the exact data (<Math>\A, \b, \c</Math>) that is used is only an estimate, or subject to decisions made by upper management. In these cases we might like to know something about how the objective could change with small updates to these values. These activities all fall under the heading of <em>_post-optimality analysis_</em>  and LP theory gives us some tools for dealing with them.
</BodyText>

<Heading level=3 refId=lpReopt>Re-optimization</Heading>
<BodyText>
  In the simplest and most general case, say that we've already solved a very large LP, and for whatever reason we need to make a few tweaks to the problem and see how the solution changes. One approach to this could be to re-run simplex from scratch on the new problem. But for very large LPs, a better approach may be <em>_re-optimization_</em>  which is essentially a way to "start where you left off" on the previous problem. The idea is to start from the previous optimal basis and deduce how changes in the data affect the simplex information from <EquationRef refId=simplexMatrixGeneralized/>.
</BodyText>
<BodyText>
  The advantage here is that since the original problem is very similar to the one being solved now, the new optimal solution is likely to be "nearby" to the old optimal solution, and thus we can hope that fewer simplex iterations are needed to complete the re-optimization process when compared to re-solving the problem from scratch. It is very possible that, even with the changes, the previous optimal solution is still optimal for the new problem, which you could know by checking the newly-calculated reduced costs. Even if the old solution is no longer optimal, it may still be feasible, allowing you to continue the simplex algorithm from there. Lastly, even if the old solution is no longer feasible for the new problem, a few iterations of the <em>dual</em> simplex algorithm may take you to an optimal solution.
</BodyText>

<Heading level=3 refId=shadowPrices>Shadow Prices</Heading>
<BodyText>
  Consider a resource allocation problem, like e.g. our sample LP <EquationRef refId=prototypeLp/>, where the problem is of the form <EquationRef refId=standardFormLpMatrix/> and the constraints denote how much of each resource is needed for each possible activity. In these cases, at the optimal basis the reduced costs <Math>\c_B\B\inv\b-\c</Math> corresponding to the slack variable for each constraint denote the so-called <em>shadow price</em> of the associated resource.
</BodyText>

<BodyText>
  Let's look again <EquationRef refId=simplexExampleFinalMatrix/>, which was how our system looked after we completed the simplex method while solving the sample LP in <SectionRef refId=simplexExample/>. The final three coefficients in the top row are the shadow prices of the three resources, i.e. an hour of production capacities at Plants 1, 2, and 3, respectively. Looking at the system, we see a shadow price of 0 for Plant 1, a price of <Math>\frac{3}{2}</Math> for Plant 2, and a price of <Math>1</Math> for Plant 3.
</BodyText>
<BodyText>
  How do we interpret these shadow prices? Let's consider Plant 3, whose shadow price is 1. In the context of the final simplex iteration, that same value 1 was the reduced cost on <Math>x_5</Math>, the slack variable for the Plant 3 constraint. We interpret that to mean that a small increase in <Math>x_5</Math> would decrease the objective value by $1,000 per unit, which is why we decided not to bring <Math>x_5</Math> into the basis. Since <Math>x_5</Math> is the <em>slack</em> in the Plant 3 constraint, we can interpret an increase in <Math>x_5</Math> as <em>taking away</em> capacity from Plant 3. So we could also interpret that reduced cost as telling us that taking away capacity from Plant 3 would cost us $1,000 per hour. On the flip side, this should also mean that <em>increasing</em> capacity at Plant 3 would be worth and extra $1,000 per hour to us.
</BodyText>
<BodyText>
  This insight is the key to interpreting the shadow price. It is the amount we would expect the objective to increase if we could gain a <em>little more</em><Footnote>If you increase it too much, interactions from other constraints may change the effect. How much is too much? We'll explore this question in <SectionRef refId=sensitivityAnalysis/></Footnote> of a given resource, and hence also the maximum <em>price</em> we'd be willing to pay in order to secure this increase.
</BodyText>

<BodyText>
  So in our sample problem, we should be willing to pay $1,500 for an extra hour of capacity at Plant 2, and $1,000 for an extra hour at Plant 3. But the shadow price for Plant 1 is 0. Why is that? Well, in the optimal solution to the sample problem, we only use 2 of the available 4 hours at Plant 1. We already have 2 hours of capacity there that we aren't using, so why would we pay anybody for even more?
</BodyText>
<BodyText>
  Another nice interpretation for the shadow price comes from the dual problem. Recall in <SectionRef refId=corporateTakeover/> when we formulated our "corporate takeover" problem <EquationRef refId=prototypeLpDual/>, which we later found was actually the dual to our sample LP. In that formulation, the variables <Math>y_1, y_2, y_3</Math> represented how much we'd be willing to pay for time at Wyndor's three facilities, and when we ran the notebook in <SectionRef refId=corporateTakeover/> the optimal values for these variables were again those same values from above, <Math>0, \frac{3}{2}</Math>, and <Math>1</Math>. Of course, it should be no surprise that these are exactly equal to the shadow prices, as we've already seen the connection between the two in the proof to
  <TheoremRef refId=simplexWorks/>.
</BodyText>

<Heading level=3 refId=sensitivityAnalysis>Sensitivity Analysis</Heading>

<BodyText>
<em>Sensitivity analysis</em> is the process of determining how small changes in problem data can alter the optimal solution. As explained in <CitationRef refId=classText/>, section 7.2, 
</BodyText>

<BlockQuote>
<BodyText>
  one assumption of linear programming is that all the parameters of the model (<Math>a_{ij}</Math>, <Math>b_i</Math>, and <Math>c_j</Math>) are known constants. Actually, the parameter values used in the model normally are just estimates based on a prediction of future conditions. The data obtained to develop these estimates often are rather crude or nonexistent, so that the parameters in the original formulation may represent little more than quick rules of thumb provided by busy line personnel. The data may even represent deliberate overestimates or underestimates to protect the interests of the estimators.
</BodyText>
</BlockQuote>

<BodyText>
  Thus it is valuable to know if changes in problem data will have outsized effects on the optimal solution. In this section, we'll discuss ways to determine the so-called <em>allowable range</em> for different values, meaning the values a particular coefficient can take without changing the optimal solution.
</BodyText>

<BodyText>
  For the sake of brevity, we'll only carry out this analysis for the right-hand side values <Math>b_i</Math>. Changes in other problem data are covered in section 7.2 of <CitationRef refId=classText/>.
</BodyText>

<Heading level=4 refId=changeSingleRHS>Changing a single rhs value</Heading>


<BodyText>
Suppose after running simplex you would like to consider changes to the right-hand side values, from <Math>\b</Math> to <Math>\mathbf{\hat b}</Math>. From <EquationRef refId=simplexMatrixGeneralized/>, we know that the values of <Math>\b</Math> affect only the right-hand side of the final matrix system. So, in particular, the reduced costs on all variables will stay the same. Thus if the new right-hand side values <Math>\B\inv\mathbf{\hat b}</Math> are all non-negative, we're still at the optimal solution.
</BodyText>

<BodyText>
Let's take our the Wyndor Glass problem as an example. sample LP <EquationRef refId=prototypeLp/>. <CitationRef refId=classText/> gives the following exposition:
</BodyText>

<BlockQuote>
<BodyText>
  Sensitivity analysis is begun for the original Wyndor Glass Co. problem by examining the optimal values of the <Math>y_i</Math> dual variables <Math>( y_1^* = 0, y_2^* = \frac{3}{2}, y_3^*=1)</Math>. These shadow prices give the marginal value of each resource <Math>i</Math> (the available production capacity of Plant <Math>i</Math>) for the activities (two new products) under consideration, where marginal value is expressed in the units of <Math>Z</Math> (thousands of dollars of profit per week). As discussed previously, the total profit from these activities can be increased $1,500 per week (<Math>y_2^*</Math> times $1,000 per week) for each additional unit of resource 2 (hour of production time per week in Plant 2) that is made available. This increase in profit holds for relatively small changes that do not affect the feasibility of the current basic solution (and so do not affect the <Math>y_i^*</Math> values). Consequently, the OR team has investigated the marginal profitability from the other current uses of this resource to determine if any are less than $1,500 per week. This investigation reveals that one old product is far less profitable. The production rate for this product already has been reduced to the minimum amount that would justify its marketing expenses. However, it can be discontinued altogether, which would provide an additional 12 units of resource 2 for the new products. Thus, the next step is to determine the profit that could be obtained from the new products if this shift were made.This shift changes <Math>b_2</Math> from 12 to 24 in the linear programming model.
  </BodyText>
</BlockQuote>

<BodyText>
  So we'd like to know what happens when we change <Math>b_2</Math> from 12 to 24. As a first step, let's take a look at the plot for this problem with the modified constraint:
</BodyText>

<InteractiveLp
    inequalities={[
        [1, 0, "l", 4, {'textPlacement': [2.3, 9]}],
        [0, 2, "l", 24, {'textPlacement': [6, 11.75]}],
        [3, 2, "l", 18, {'textPlacement': [5, 2.5]}],
    ]}
    objective={[3, 5, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={14.99}
    chooseObjVals={true}
    refId=wyndorLpb2Change24
><span slot=caption>Visualization of the Wyndor linear program (<EquationRef refId=prototypeLp/>) with <Math>b_2</Math> changed from 12 to 24.</span></InteractiveLp>

<BodyText>
  Compared to our first plot of this problem from <SectionRef refId=lpVisualized/>, we see that the bounding line for the constraint on <Math>x_2</Math> has been moved way up, such that this constraint does not even touch the feasible region anymore<Footnote>This might be a first hint that our problem has changed significantly.</Footnote>. How might this affect the solution?
</BodyText>

<BodyText>
  Let's go ahead and calculate the altered right-hand side according to <EquationRef refId=simplexMatrixGeneralized/>. Following the formulas, we'll get
  <MathDisp>
    Z = \c_B\B\inv\b = 54,\qquad \begin{bmatrix}x_3 \\ x_2 \\ x_1\end{bmatrix} = \x_B = \B\inv\b = \begin{bmatrix}6 \\ 12 \\ -2\end{bmatrix}
  </MathDisp>
  at our previous optimal basis. For simplex, a negative right-hand side means a negative value for a basic variable, and thus an infeasible solution. So our old optimal basis is no longer feasible.
</BodyText>
<BodyText>
  What happened here? In terms of the plots, the original basic solution came at the intersection of the constraints <Math>3x_1 + 2x_2 \leq 18</Math> and <Math>2x_2 \leq 12</Math>. That intersection used to be in the feasible region, but when the second constraint was changed to <Math>2x_2 \leq 24</Math> the intersection changed to somewhere off the plot entirely.
</BodyText>
<BodyText>
  So finding the optimal solution to our new problem requires a change of basis. Starting from a primal-infeasible basis, the best way to proceed is an application of the dual simplex method to regain feasibility<Footnote>We aren't covering dual simplex in this course, but I think it's good for you to know that it exists, and in particular that it has a role to play in sensitivity analysis or re-optimization.</Footnote>. Doing so would bring us to a new basis of <Math>(x_4, x_2, x_3)</Math> and a new optimal solution of <Math>(x_1, x_2, x_3, x_4, x_5) = (0, 9, 4, 6, 0)</Math>, which has a corresponding objective value of <Math>Z=45</Math>.
</BodyText>

<Heading level=4 refId=allowRangeDetermine>Determining the allowable range</Heading>
<BodyText>
  Let's recap what we've done here. We were considering a change to the right-hand side values of our LP. Our analysis involved changing the right-hand side then re-optimizing. We found that increasing <Math>b_2</Math> by 12 changed our optimal basis and increased the objective value by 9, from 36 to 45. But wait, the shadow price on <Math>b_2</Math> in the original model was <Math>\frac{3}{2}</Math>, so why didn't we get an increase of <Math>9\times\frac{3}{2}=13.5</Math>? And we're already past the re-optimization section, so why did we run simplex again?
</BodyText>
<BodyText>
  On the shadow price issue: We mentioned when introducing shadow prices in <SectionRef refId=shadowPrices/> that they are only valid <em>locally</em>  i.e. they hold from "small" changes in the resource, but if changes become too big then all bets are off. But how big is too big? We'll explore that next, and we won't even (fully) run simplex to do it!
</BodyText>
<BodyText>
  Let's first set some notation. We'll use the capital greek letter <Math>\Delta</Math> to denote the "change in" some value, so that <Math>\Delta b_2</Math> is the amount we change <Math>b_2</Math> for the analysis. So in our previous example, we had <Math>\Delta b_2 = 24 - 12 = 12</Math>. We'd like to find the range of values for <Math>\Delta b_2</Math> such that our previous basis is still optimal.
</BodyText>
<BodyText>
  Let's first consider feasibility. Recall that a basic solution is feasible if and only if all the variable values are non-negative, which from <EquationRef refId=simplexMatrixGeneralized/> gives us <Math>\B\inv\b\geq0</Math>. At the optimal solution to our sample problem, we have
</BodyText>

<MathDisp>
  \B\inv = \begin{bmatrix}
  1 & \frac{1}{3} & -\frac{1}{3} \\
  0 & \frac{1}{2} & 0 \\
  0 & -\frac{1}{3} & \frac{1}{3}
  \end{bmatrix}
</MathDisp>

<BodyText>
  Changing <Math>b_2</Math> to <Math>b_2 + \Delta b_2</Math> turns the requirement into:
</BodyText>

<MathDisp>
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
</MathDisp>

<BodyText>
  The first inequality implies <Math>\Delta b_2\geq-6</Math>, the second implies <Math>\Delta b_2\geq-12</Math>, and the third implies <Math>\Delta b_2\leq 6</Math>. So to satisfy all three simultaneously, we need to keep <Math>-6\leq\Delta b_2\leq6</Math>, the equivalent of saying <Math>6\leq b_2\leq 18</Math>.
</BodyText>
<BodyText>
  So keeping <Math>6\leq b_2\leq 18</Math> gives a feasible solution, but is the old basis still optimal? It turns out that we can answer that very simply, by noticing that changes to <Math>\b</Math> have no effect on the reduced cost vector <Math>\c_B\B\inv\A-\c</Math>. Since this basis was optimal for the original, those same reduced costs must still be non-negative, so the old optimal basis is still optimal whenever <Math>\Delta b_2</Math> is in the acceptable range.
</BodyText>
<BodyText>
  As for how much the objective changes, let's recall (again from <EquationRef refId=simplexMatrixGeneralized/>) that the objective value at a basic solution is given by <Math>Z=\c_B\B\inv\b</Math>. We've already calculated <Math>\c_B\B\inv = \begin{bmatrix}0 & \frac{3}{2} & 1\end{bmatrix}</Math> at the optimal basis, and thus altering <Math>b_2</Math> gives us
    <MathDisp>
      Z = \begin{bmatrix}0 & \frac{3}{2} & 1\end{bmatrix}\begin{bmatrix}4 \\ 12 + \Delta b_2 \\ 18\end{bmatrix}
        = 36 + \frac{3}{2}\Delta b_2.
    </MathDisp>
  So our interpretation of the shadow price holds over this range as well.
</BodyText>
<BodyText>
  Lastly, let's take a look at the plots of the problem when we take <Math>b_2</Math> at the limits of its allowable range. First, for <Math>b_2=6</Math>:
</BodyText>

<InteractiveLp
    inequalities={[
        [1, 0, "l", 4, {'textPlacement': [2.3, 9]}],
        [0, 2, "l", 6, {'textPlacement': [6, 4]}],
        [3, 2, "l", 18, {'textPlacement': [5.5, 1.5]}],
    ]}
    objective={[3, 5, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={10.99}
    chooseObjVals={true}
    refId=wyndorLpb2Change6
><span slot=caption>Visualization of the Wyndor linear program (<EquationRef refId=prototypeLp/>) with <Math>b_2</Math> changed from 12 to 6.</span></InteractiveLp>
<BodyText>
  And for <Math>b_2=18</Math>.
</BodyText>

<InteractiveLp
    inequalities={[
        [1, 0, "l", 4, {'textPlacement': [2.3, 8]}],
        [0, 2, "l", 18, {'textPlacement': [6, 10]}],
        [3, 2, "l", 18, {'textPlacement': [5, 2.5]}],
    ]}
    objective={[3, 5, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={10.99}
    chooseObjVals={true}
    refId=wyndorLpb2Change18
><span slot=caption>Visualization of the Wyndor linear program (<EquationRef refId=prototypeLp/>) with <Math>b_2</Math> changed from 12 to 18.</span></InteractiveLp>

<BodyText>
  We won't spend much time dwelling on this, but notice how the original optimal solution came at the intersection of the second and third constraints of <EquationRef refId=prototypeLp/>. Now on these two plots, the optimal is still at that intersection, while also adding a third intersecting constraint<Footnote>This also introduces potential degeneracy issues, but we'll ignore that for the purposes of this class.</Footnote>. Moving any further would make that intersection infeasible, which is why the allowable range stops there.
</BodyText>
