# Linear Programming {#sec:lp}

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

(In this formulation and going forward, we use "s.t." as a shorthand for "subject to" leading into the constraints section.)

## LP terminology

With this example in hand, let's get back to some definitions. The **decision variables** are the quantities we're deciding how to set. In our example these are $x_1$ and $x_2$, the number of batches run per week for the two products. The **objective** is the value we'd like to optimize, which in the example is the profit equation $3x_1 + 5x_2$. The **constraints** are the limitations on how we set the decision variables, which in this case is everything after the "subject to". Notice that the final constraint, $x_1,x_2\geq0$, is really two constraints so this is a abusing notation a bit. But these types of constraints (called _variable bound_ constraints, or in this case _nonnegativity_ constraints since they restrict variables to $\geq0$) are often treated separately in solution techniques, so it is common to see them grouped or written slightly differently like this.

A **solution** to an LP is any specification of values for the decision variables. And I do mean _any_, it doesn't matter if the values imply a good objective value or even if they satisfy the constraints. They are still called a solution. Hence $x_1=0, x_2=0$, $x_1=-20, x_2=6$, or $x_1=2, x_2=3$ are all solutions to our sample problem.

A **feasible solution** is a solution that satisfies all of the problem constraints. In contrast, an **infeasible solution** is one that violates _at least one_ constraint. The **feasible region** is the set of all feasible solutions. It is possible for a problem to have no feasible solutions, in which case the problem itself is said to be **infeasible**.

When solving an LP, the goal is to find an **optimal solution**, a feasible solution that give the most favorable value[^mostFavorable] of the objective function. Notice we said _an_ optimal solution, not _the_ optimal solution, as it is entirely possible for a problem to have more than one solution attain the optimal value. It is also possible to have no optimal solutions at all, as in the case of an infeasible problem. Another situation with no optimal solution is an **unbounded** problem, where there are no constraints to

[^mostFavorable]: The smallest value if we have a minimization problem, or the largest value for a maximization problem.

## LP visualized

Now that we have some more definitions in tow, let's get hands-on again to see them in action. Since our sample problem includes only two decision variables, we can visualize what's going on in a plot:

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"choosePoints": true}'> Sorry, your browser does not support inline SVG.</svg>

Here we have a plot with $x_1$ on the horizontal axis, $x_2$ and the vertical axis, and a line drawn for each of the model constraints in +@eq:prototypeLp. The feasible region is plainly visible as the gray-shaded region in the bottom-left.

<!-- examples of infeasible and unbounded problems -->

<!-- How should we go about solving our sample problem? Since the problem is in two dimensions it will be straightforward to solve it graphically with our eyes. This is not a good (or usually even feasible) method in practice, but for a toy problem it can really help build some intuition for what's going on. -->

## LP forms

## Solving LPs with software

<!-- book section 4.5 -->
