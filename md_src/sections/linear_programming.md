# Linear Programming

In the family of OR techniques, Linear Programming (LP) is certainly the matriarch. It was among the first methods to be seriously studied and find broad applications. To this day, LPs are relevant and used across industry to inform decision-making and help best make use of scarce resources.

So, what is an LP? Let's step back a bit - linear programming is a special type of mathematical programming problem. The word _programming_, in the language of the pre-computer-revolution era where these topics were first studied, was more or less a synonym for _planning_. So mathematical programming just means using math to make a plan.

And the linear part? This refers to the form of the mathematical objects used. All mathematical programs have _variables_ (quantities you get to set in order to get a desirable result), _constraints_ (limitations on how you can set your variables), and an _objective_ (the quantity you want to maximize/minimize). In linear programming, all constraints and objectives must be _linear_ functions of your variables.

## An example LP

Ok, before we get too far down this path of inscrutable definitions, maybe we should see an example problem where we can get more hands-on. The following comes from @classText, section 3.1.

> The Wyndor Glass Co. produces high-quality glass products, including windows and
> glass doors. It has three plants. Aluminum frames and hardware are made in Plant 1, wood
> frames are made in Plant 2, and Plant 3 produces the glass and assembles the products.
> Because of declining earnings, top management has decided to revamp the company’s
> product line. Unprofitable products are being discontinued, releasing production capacity
> to launch two new products having large sales potential:
>
> - Product 1: An 8-foot glass door with aluminum framing
> - Product 2: A 4 x 6 foot double-hung wood-framed window
>
> Product 1 requires some of the production capacity in Plants 1 and 3, but none in Plant 2.
> Product 2 needs only Plants 2 and 3. The marketing division has concluded that the company
> could sell as much of either product as could be produced by these plants. However,
> because both products would be competing for the same production capacity in Plant 3, it
> is not clear which mix of the two products would be most profitable.

Together with management, the company's OR team defines the problem as follows:

> Determine what the production rates should be for the two products in order to maximize
> their total profit, subject to the restrictions imposed by the limited production capacities
> available in the three plants. (Each product will be produced in batches of 20, so the
> production rate is defined as the number of batches produced per week.) Any combination
> of production rates that satisfies these restrictions is permitted, including producing none
> of one product and as much as possible of the other.

The team's next task is to gather data on production runs and potential profits. The findings are summarized in the table below:

![Data for the Wyndor Glass Co. problem [@classText]](images/lp-example-data.png)

### Formulating our first LP

How do we go about formulating this problem mathematically? We must first decide on the _decision variables_, the quantities we get to choose in order to affect profit. In this case, the variables are the quantities of Product 1 and Product 2 that we choose to produce. We will denote these quantities by $x_1$ and $x_2$ respectively. That is, $x_1$ is the number of batches of Product 1 we will produce in a week, and $x_2$ is the number of batches of Product 2 we produce in a week.

Next let's talk about the problem's _objective function_, the quantity that we are trying to optimize. Naturally, we'd like to optimize profit. From the table, we know that we get $3,000 in profit per batch of Product 1 and $5,000 per batch of Product 2. Thus the formula

$$
3x_1 + 5x_2
$$

tells us (in thousands of dollars) how much profit we expect for a given selection of $x_1$ and $x_2$.

Now, we can't select $x_1$ and $x_2$ to be arbitrarily high. We are restricted by the available production time at each plant. So we will add _constraints_ relating to these availabilities. We know that each batch of Product 1 requires 1 hour of time in Plant 1, while Product 2 does not require any time at Plant 1. So, adding that 4 hours of production time is available per week the constraint associated with production at Plant 1 is simply $x_1 \leq 4$. Similarly, at Plant 2, Product 2 is the only one that requires processing, at 2 hours per batch. With 12 hours per week available, the constraint for Plant 2 becomes $2x_2 \leq 12$.[^reducedTerms]

[^reducedTerms]: You might look at this and think "that just means $x_2 \leq 6$." You would be correct, and it would be completely valid to use that constraint instead.

What about Plant 3? Both products require time at this facility, so they could both contribute to the depletion of its 18 hours per week. Every batch of Product 1 requires 3 hours, while every batch of Product 2 requires 2 hours. So the constraint imposed by Plant 3 is simply $3x_1 + 2x_2 <= 18$.

Lastly, we know that $x_1$ and $x_2$ cannot be negative (there is no way to produce a negative number of products), so $x_1 \geq 0$ and $x_2 \geq 0$ must be part of our formulation as well. Bringing it all together, we can write the problem formulation as:

$$
\begin{align*}
\max        && 3x_1 + 5x_2 & \\
\text{s.t.} && x_1 & \leq \ \ 4  \\
            && 2x_2 & \leq 12 \\
            && 3x_1 + 2x_2 & \leq 18 \\
            && x_1,x_2 & \geq \ \ 0
\end{align*}
$$

{#eq:prototypeLp}

## LP terminology

With this example in hand, let's get back to some definitions. The **decision variables** are the quantities we're deciding how to set. In our example these are $x_1$ and $x_2$, the number of batches run per week for the two products. The **objective** is the value we'd like to optimize, which in the example is the profit equation $3x_1 + 5x_2$. In this case we'd like to maximize the objective, but minimization is possible as well. The **constraints** are the limitations on how we set the decision variables, which in this case is everything after the "s.t."[^subjectTo]. Notice that the final constraint, $x_1,x_2\geq0$, is really two constraints so this is a abusing notation a bit. But these types of constraints (called _variable bound_ constraints, or in this case _nonnegativity_ constraints since they restrict variables to $\geq0$) are often treated separately in solution techniques, so it is common to see them grouped or written slightly differently like this.

[^subjectTo]: The "s.t." is an abbreviation for "subject to" and is used in formulations leading into the constraints section.

A **solution** to an LP is any specification of values for the decision variables. And I do mean _any_[^anySolution], it doesn't matter if the values imply a good objective value or even if they satisfy the constraints. They are still called a solution. Hence each of:

- $x_1=0, x_2=0$
- $x_1=-20, x_2=6$
- $x_1=2, x_2=3$
  are all solutions to our sample problem, even though the second one violates nonnegativity.

[^anySolution]: So long as we're talking about real numbers, of course. Something like $x_1=\text{blue}$, $x_2=\text{elephant}$ is just nonsense and isn't a solution to our problem.

A **feasible solution** is a solution that satisfies all of the problem constraints. In contrast, an **infeasible solution** is one that violates _at least one_ constraint. The **feasible region** is the set of all feasible solutions. It is possible for a problem to have no feasible solutions, in which case the problem itself is said to be **infeasible**.

When solving an LP, the goal is to find an **optimal solution**, a feasible solution that gives the most favorable value[^mostFavorable] of the objective function. Notice we said _an_ optimal solution, not _the_ optimal solution, as it is entirely possible for a problem to have more than one solution attain the optimal value. It is also possible to have no optimal solutions at all, as in the case of an infeasible problem. Another situation with no optimal solution is an **unbounded** problem, where there are no constraints to

[^mostFavorable]: The smallest value if we have a minimization problem, or the largest value for a maximization problem.

## LP visualized

Let's get hands-on again to see our new definitions in action. Since our sample problem includes only two decision variables, we can visualize what's going on in a plot:

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"choosePoints": true}'> Sorry, your browser does not support inline SVG.</svg>

Here we have a plot with $x_1$ on the horizontal axis, $x_2$ on the vertical axis, and a line drawn for each of the constraints in +@eq:prototypeLp. Moreover, if you hover over a constraint line, the side of the line satisfied by the inequality is shaded light gray[^mobileHover]. The feasible region (where all three constraints are satisfied) is plainly visible as the gray-shaded region in the bottom-left. If you click on the plot (or enter values in the text boxes) a point will be drawn on the plot. If the point is a feasible solution, it will be colored black and the objective value at the solution is show below the plot. Otherwise, if the solution is infeasible the point will be colored red and the violated inequalities will flash.

[^mobileHover]: I couldn't think of a good way to do this with touch events, so this part doesn't work as well on a mobile device. Sorry.

How can we visualize the objective? Since the objective is given by $3x_1 + 5x_2$, any line we draw of the form $3x_1 + 5x_2 = Z$ (for some number $Z$) will show the solutions that give objective value $Z$. You can try this with the plot below: put your chosen $Z$ value in the input box (or click on the plot to get a line going through that point). The line will show up on the plot, and the intersection with the feasible region (if any exists) will be highlighted. These highlighted solutions each give objective value $Z$.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"chooseObjVals": true}'> Sorry, your browser does not support inline SVG.</svg>

### Solving an LP visually

We actually have tools to solve this problem now. For problems in two dimensions, it is fairly straightforward to draw a graph and see where the best solution is. This is not a good (or usually even feasible) method in practice, but for a toy problem it can really help build some intuition.

Let's look back at the above plot. Since we're maximizing, we'd like to choose the largest $Z$ that intersects the feasible region. Let's start with something too big, say $Z=50$. When we plot that, we see it is way too high above the feasible region. So we can start moving it lower. Maybe go to $Z=40$. It's still totally above the feasible region, so that's not it either. Now jump to $Z=30$. This intersects the plot, but there is a section of the feasible region above the line, and hence feasible solutions with a better objective value.

So keep searching. When you come to $Z=36$ the situation looks different. The line intersects the plot at a single point, $x_1=2, x_2=6$. If you move the objective up just a little bit, say to 36.1, you get no intersection with the feasible region[^roundingErrors]. Thus we know we've found the optimal solution[^prototypeOptimalityProof], and in this case it is unique.

[^roundingErrors]: Actually, my little widget here is not perfect. Depending how small of a decimal you add, you may get it to tell you there are optimal solutions at a slightly higher objective value. This is due to choosing a precision that this setup really can't handle. It is worth mentioning that even the most sophisticated solvers can have issues with rounding errors and numerical stability, but they're generally very good. As long as you are careful with your formulations you usually won't run into issues.
[^prototypeOptimalityProof]: Truth be told, this isn't a rigorous proof of optimality, at least in the strict sense of mathematical proofs. But the solution methods we'll study later do give such proofs.

### Visualizing other scenarios

Let see some examples of the other scenarios we defined above. In each case, we'll take our initial model +@eq:prototypeLp and modify it to show the desired property.

#### Infeasible problem

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"addConstraints": [[[1, 3, 30, "g"], [5, 9.25]]], "choosePoints": true}'> Sorry, your browser does not support inline SVG.</svg>

In this plot, we've added the constraint $x_1 + 3x_2 \geq 30$. All the points satisfying this inequality are well above the previous feasible region, so no solutions are feasible.


#### Unbounded problem

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"removeConstraints": [0, 1], "altFeasRegionTextPlace": [4.5, 3.5], "chooseObjVals": true}'> Sorry, your browser does not support inline SVG.</svg>

Here we've removed two constraints, with the only one remaining being $2x_2 <= 12$. We can see there is no constraint on $x_1$ at all now, so we can choose it arbitrarily large and still be in the feasible region[^unboundedDidSomethingWrong].

[^unboundedDidSomethingWrong]: In most practical applications, infeasiblity is a good indicator that you modeled something incorrectly. Like in the prototype example, it doesn't make sense that we could make arbitrarily many of some product. So if you find a problem you're working on is infeasible, it's a good idea to double-check your formulation.

#### Multiple optima

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"altObj": [6, 4], "chooseObjVals": true}'> Sorry, your browser does not support inline SVG.</svg>

In this example, we've altered the objective function to $6x_1 + 4x_2$ so that it has the same slope as one of our constraints. We can see by moving the objective up and down that the optimal solution comes at $Z=36$, where the intersects an entire face (bounding line) of the feasible region.

## LP forms

## Solving LPs with software

<!-- book section 4.5 -->
