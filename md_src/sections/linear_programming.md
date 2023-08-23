# Linear programming

In the family of OR techniques, linear programming (LP) is certainly the matriarch. It was among the first methods to be seriously studied and find broad applications. To this day, LPs are relevant and used across industry to inform decision-making and help best make use of scarce resources. This section will cover selected material from @classText, chapters 3-8.

So, what is an LP? Let's step back a bit - linear programming is a special type of mathematical programming problem. The word _programming_, in the language of the pre-computer-revolution era where these topics were first studied, was more or less a synonym for _planning_. So mathematical programming just means using math to make a plan.

And the linear part? This refers to the form of the mathematical objects used. All mathematical programs have _variables_ (quantities you get to set in order to get a desirable result), _constraints_ (limitations on how you can set your variables), and an _objective_ (the quantity you want to maximize/minimize). In linear programming, all constraints and objectives must be _linear_ functions of your variables. Meaning, you can multiply the variables by constants and add them together. No higher order terms, like squaring a variable or multiplying two variables together. We'll see an example in the next section.

## An example LP

Before we pile up too many definitions, maybe we should see an example problem where we can get more hands-on. The following comes from @classText, section 3.1.

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
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 \\
     && x_1,x_2 & \geq \ \ 0
\end{align*}
$$

{#eq:prototypeLp}

## LP terminology

With this example in hand, let's get back to some definitions. The **decision variables** are the quantities we're deciding how to set. In our example these are $x_1$ and $x_2$, the number of batches run per week for the two products. The **objective** is the value we'd like to optimize, which in the example is the profit equation $3x_1 + 5x_2$. In this case we'd like to maximize the objective, but minimization is possible as well. The **constraints** are the limitations on how we set the decision variables, which in this case is everything after the "s.t."[^subjectTo]. Notice that the final constraint, $x_1,x_2\geq0$, is really two constraints so this is a abusing notation a bit. But these types of constraints (called **variable bound** constraints, or in this case _nonnegativity_ constraints since they restrict variables to $\geq0$) are often treated separately in solution techniques, so it is common to see them grouped or written slightly differently like this. We call the rest of the constraints the **functional constraints**.

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

Here we have a plot with $x_1$ on the horizontal axis, $x_2$ on the vertical axis, and a line drawn for each **constraint boundary** (the line that forms the boundary of what is permitted by the corresponding constraint) for the constraints +@eq:prototypeLp. Moreover, if you hover over a constraint boundary, the side of the line satisfied by the inequality is shaded light gray[^mobileHover]. The feasible region is the portion of the plot where all the constraints are satisfied, and it is plainly visible as the gray-shaded region in the bottom-left. Such an intersection of linear inequalities is called a **polyhedron**, and in cases such as this where the polyhedron is bounded (i.e. doesn't go off to infinity in some direction) we also call it a **polytope**.

If you click on the plot (or enter values in the text boxes) a point will be drawn on the plot. If the point is a feasible solution, it will be colored black and the objective value at the solution is show below the plot. Otherwise, if the solution is infeasible the point will be colored red and the violated inequalities will flash.

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

In this example, we've altered the objective function to $6x_1 + 4x_2$ so that it has the same slope as one of our constraints. We can see by moving the objective up and down that the optimal solution comes at $Z=36$, where the intersects an entire face (bounding line) of the feasible region. Since any point on that bounding line attains the optimal objective value, they are all optimal solutions.

## Solving LPs with software

Let's pause briefly now to explain, practically, how LPs can be solved in the real world. By which I mean: if given an LP in practice, what would you do to find the answer? I'm not talking about the theory behind what LP solving software does (we'll get the that later), just how to use the software. This won't be a comprehensive discussion, really just giving you enough to solve our example LP. We'll expand on this discussion some when we get to modeling in the Integer Programming section.

There are two key components to solving mathematical programming problems in practice: the modeling language and the solver.

### Modeling languages

The job of a modeling language is to take a model specification like +@eq:prototypeLp and turn it into something the computer can understand and solve. Some popular modeling languages are their own standalone software, such as [AMPL](https://ampl.com/) and [GAMS](https://www.gams.com/). The modeling languages we'll use are instead shipped as Python[^modelingInOtherLanguages] libraries. Sometimes these languages are built for use with a single solver, while others try to be compatible with several different solvers.

[^modelingInOtherLanguages]: There are similar packages available in other popular programming languages as well.

### Solvers

The solver is the software that takes the modeled problem and applies the necessary algorithms to solve it. There are several options here as well. The best solvers all require paid licenses to use fully for commercial purposes[^academicLicenses]. The two biggest names in this space are [Gurobi](https://www.gurobi.com/) and [CPLEX](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer), though [Xpress](https://www.fico.com/en/products/fico-xpress-optimization) and [COPT](https://www.shanshu.ai/copt/) are competitive as well. There are also free, open-source options, but these generally perform much worse than the commercial offerings. Some names in this space are [COIN-OR](https://www.coin-or.org/), [GLPK](https://www.gnu.org/software/glpk/), and [SCIP](https://scipopt.org/).

[^academicLicenses]: Most come with limited licenses for noncommercial uses, and also offer free unrestricted licenses for students and academics.

### Solving our LP with Python

In the following notebook, I show how we can model and solve our sample LP in two different ways. The first way uses Gurobi as the solver and its purpose-built Python library `gurobipy` as the modeler. I should mention that since Gurobi is a commercial solver, we need some sort of license for unrestricted use. However, we do get a limited license automatically with the install of `gurobipy` which is good for problems with up to 2000 variables and 2000 linear constraints. This is pretty limiting for practical industry use, but most everything we'll do in this class will fall comfortably within those bounds.

The second option is a fully open-source option using PuLP, a Python modeling language maintained by COIN-OR. By default, this will use COIN-OR's linear programming solver CLP to solve the model. However, a nice feature of PuLP is that it is solver-agnostic. This means that you can use it to model your problem but switch between any of the popular solvers (including the commercial ones). This is nice to avoid being locked-in to a single solver. But it also may be slightly less performant, or may lack some solver-specific features that come with a solver's built-in API.

{colabGist:1_mwxc4xRRVjaMDZL0ObAc0ROqqw5UrJ3,9c7e1b589a3efb40590606ba6eed102f}

## LP forms

We're _almost_ ready to talk about algorithms for solving LPs, but first we should make a note on some different forms LPs can take. Crucially, it will turn out that all the forms we talk about here are, in a sense, equivalent. Thus no matter the specifics of how an LP is presented, we know we'll be able to solve it using the general methods.

### Standard form

Our formulation of the sample LP in +@eq:prototypeLp is in what is known as **standard form**. Generally, a linear program with $n$ variables and $m$ constraints is in standard form if it is written as:

$$
\begin{align*}
\max && c_1x_1 + c_2x_2 + \cdots + c_nx_n && && \\
\st  && a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n && \leq && b_1 \\
     && a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n && \leq && b_2 \\
     &&                                            && \vdots && \\
     && a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n && \leq && b_m \\
     && x_1, x_2, \cdots , x_n && \geq && 0
\end{align*}
$$

{#eq:standardFormLp}

Where all the $a$, $b$, and $c$ values (known as the **problem data**) are real numbers. Our sample problem, and many other practical LP problems, are naturally formulated like this. But it might at first glance feel a bit limiting. What if you'd rather minimize instead of maximizing? Or let your variables take negative values? We'll see in the following sections that such considerations are indeed possible, and we can consider them in the same framework as standard form problems.

### Minimization problems

What if your optimization problem is a minimization problem and not a maximization problem? For example, instead of maximizing profit, you'd like to minimize cost? No worries, it is actually quite straightforward to convert from minimization to maximization - just turn everything negative! The minimum cost is the same as the maximum "negative cost" $(-1\cdot\text{cost})$. So

$$
\min\ c_1x_1 + c_2x_2 + \cdots + c_nx_n
$$

is the same as

$$
\max -c_1x_1 -c_2x_2 - \cdots -c_nx_n.
$$

Since the problem data can be any real number (so, in particular, negative numbers are fine) this still follows the form of +@eq:standardFormLp.

### Different constraint forms {#sec:lpContraintTransform}

What is you wanted "greater than or equal" constraints instead of "less than or equal" constraints? This is again another case of a sign switch since if you take any inequality you can:

- multiply both sides by -1, and
- switch the direction of the inequality

to end up with another valid inequality[^quickInequalityFlipExample]. Thus any inequality of the form:

[^quickInequalityFlipExample]: A quick example: $5 \leq 10$ means the exact same thing as $-5 \geq -10$.

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \geq b_i
$$

can be written as

$$
-a_{i1}x_1 - a_{i2}x_2 - \cdots - a_{in}x_n \leq -b_i
$$

which brings us back into line with the standard form inequalities in +@eq:standardFormLp.

What about equality constraints? That is, constraints of the form

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n = b_i.
$$

Can these be converted into standard form? The answer is yes, but it comes at the cost of an extra constraint in the formulation. Because using the above constraint has the same effect as using these two in combination:

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \leq b_i \\
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \geq b_i
$$

Now, that second inequality does not fit in standard form since it is a "$\geq$" constraint, but we already know how to convert it. So the final standard-form-conforming formulation is:

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \leq b_i \\
-a_{i1}x_1 - a_{i2}x_2 - \cdots - a_{in}x_n \leq -b_i
$$

Great, so we can go from equality constraints to inequality constraints, but what about the other way? That is possible too, but this time we'll need to add a variable to the formulation. In particular, to convert the inquality

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \leq b_i
$$

to equality form, we'll add a so-called **slack variable** $s_i$. We'll enforce $s_i\geq0$ and rewrite the constraint as

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n + s_i = b_i.
$$

This works since, for any selection of the $x$ values that satisfies the inequality, we can simply select the value of $s_i$ as the difference between $b_i$ and the $a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n$, i.e. the _slack_ in the constraint. Going the other way, any variable selections that satisfy the equality will also satisfy the inequality since, by rearraning the equality, we get

$$
a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n = b_i - s_i
$$

and $s_i$ is nonnegative.

### Variable bounds

In the standard form problem, we enforce that all of our variables are nonnegative. But what if we don't want any explicit bounds on the variables? Is this a different class of problems? As it turns out, we can freely switch back and forth between nonnegative variables and these so-called **unrestricted** or **free variables**.

How do we do the transformations? The first direction is straightforward; say you have a formulation with nonnegative variables and you'd like to remove the variable bounds. Well, we still have the functional constraints, where we are allowed to use inequalities. So we'll "remove" the variable bound constraint $x_j\geq0$ by creating a new functional constraint

$$
a_1x_1 + \cdots + a_jx_j + \cdots + a_nx_n \leq b
$$

where $b=0$, $a_i=-1$, and all other coefficients equal $0$.

Now the less obvious transformation. Say we have a formulation where the variable $x_j$ is unrestricted. How do we convert to nonnegative variables? One way is to define two more variables, call them $y_j$ and $z_j$, which will be our new nonnegative variables. What we'll do is simply replace $x_j$ with $y_j-z_j$, so that the constraints become

$$
a_{i1}x_1 + \cdots + a_{ij}y_j - a_{ij}z_j + \cdots + a_{in}x_n \leq b_i
$$

for each $i$[^positiveAndNegativeParts].

[^positiveAndNegativeParts]: You can think of $y_j$ as the "positive part" and $z_j$ as the "negative part" of $x_j$. Note that we haven't done anything to enforce that only one of $y_j$ and $z_j$ are nonzero at a time. So for example if some solution to the original fomulation had $x_j=2$ then in the new formulation we could have $y_j=2$ and $z_j=0$, or we could just as easily have something like $y_j=12, z_j=10$ or $y_j=106.7, z_j=104.7$.

### Recap of allowed forms

As a recap: we defined the standard form LP where the objective is maximized, the functional constraints are $\leq$ inequalities, and variables are nonnegative. But it turns out there are several equivalent ways to formulate LPs, namely:

- Objectives can be either minimized or maximized.
- Constraints can be in $\leq$, $\geq$, or $=$ form.
- Variables may be bounded or not.

Crucially, any of these forms can be transformed into any of the others, so no matter how we specify a particular LP, any of the results and techniques we discuss here apply!

### Different notation

Last up for this section, let's discuss notation. I don't know about you, but I get a little overwhelmed when I look at formulations like +@eq:standardFormLp. There's a lot to look at there, and while I think it's good initially to see things written in full detail with simple notation like this, returns begin diminishing quickly. Especially in a case like this where there's a lot of repetition with minimal changes from line to line.

So, from here on out and where appropriate, I'll start using more concise notation. For example, +@eq:standardFormLp can be written more concisely like so:

$$
\begin{align*}
\max && \sum_{j=1}^n c_jx_j    & \\
\st  && \sum_{j=1}^n a_{ij}x_j & \leq b_i\quad \forall i\in\{1,...,m\} \\
     && x_j                    & \geq 0_i\quad \forall j\in\{1,...,n\}
\end{align*}
$$

This looks much cleaner to my eyes, and each line communicates different important information about the formulation. But to benefit from the compactness, one needs to be familiar with the notation used. I assume everyone reading this has seen the summation notation $\sum$ before, but some other notation (set inclusion $\in$ and "for all" $\forall$ in particular) may be new. And sometimes new is intimidating. But fear not! These things get clearer and clearer the more you see them, and I think the benefit is worth it. There is a section in the appendix (+@sec:symbols) dedicated to special symbols. Beyond that, if you're ever confused about something, you can always ask me!

We'll see more notation like the above as we formulate more specific problems, but for much of the theory sections to come I actually much prefer matrix notation. You should already be familiar with linear algebra (+@sec:linearAlgebra in the appendix gives a brief review), so you should be able to notice how matrix algebra fits nicely with the formulations we've already given. For some $m\times n$ matrix $\A$ and $n$ vector $\x$, if we multiply them we have:

$$
\begin{align*}
\A\x&=\begin{bmatrix}
    a_{11} & a_{12} & \cdots & a_{1n} \\
    a_{21} & a_{22} & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}\begin{bmatrix}
    x_1 \\ x_2 \\ \vdots \\ x_n
\end{bmatrix}\\
&=\begin{bmatrix}
    a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n \\
    a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n \\
    \vdots \\
    a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n \\
\end{bmatrix}
\end{align*}
$$

which looks just like the constraint section of the standard form LP +@eq:standardFormLp. Due to the conciseness, my favorite notation for the standard form LP is

$$
\begin{align*}
\max && \c\x \\
\st  && \A\x&\leq\b \\
     && \x&\geq\zeros
\end{align*}
$$

{#eq:standardFormLpMatrix}

Much nicer on the eyes, right!

Further, you may have noticed that though we've devoted significant time to it already, we haven't formally defined linear programming yet! I was waiting for this moment to do so. A **linear program** is an optimization problem in the form of +@eq:standardFormLpMatrix.

## The simplex method

We're just about ready to talk about LP solving algorithms, and we're of course starting with the **simplex algorithm** (also sometimes called the **simplex method**). Arguably the most important breakthrough in the history of OR was the development of the simplex method by George Dantzig[^dantzigStory] during the late 1940s[^assumeLinear]. It was perhaps the first practical algorithm developed for linear programming, and it continues to be the workhorse in linear and integer programming solvers today[^simplexNotKnownPoly].

[^dantzigStory]: I'm not mentioning a lot of people by name in these notes, but I couldn't skip Dantzig. Mostly I wanted to bring up this famous story: A student comes late to class one day, sees two problems written on the board, and assumes they are the day's assigned homework. The problems are more difficult than usual, but he solves them. When he turns them in, the professor is elated - these weren't homework, but rather famous unsolved problems in the field! You can find several versions of this story out there, citing several different people as the supposed student. Turns out [this actually happened, and the student was Dantzig](https://www.snopes.com/fact-check/the-unsolvable-math-problem/#6oJOtz9WKFQUHhbw.99).
[^assumeLinear]: There's a neat story, quoting from @tspPursuit, in [this blog post](https://punkrockor.com/2014/04/29/happiness-is-assuming-the-world-is-linear/) (yes, OR blogs are a thing). It's specifically about Dantzig first introducing the simplex method during a talk in 1948, and more generally about understanding your assumptions 😀.
[^simplexNotKnownPoly]: Interestingly, several other linear programming algorithms have been devised whose theoretical properties seem to suggest they would be more efficient. But in practice that hasn't been the case. Simplex continues to be the best algorithm in practice for the widest array of problems.

### Corner-point solutions

Before we get to the algorithm itself, let's take a moment to dwell on some geometric insights the method relies on. We'll return to our sample problem +@eq:prototypeLp and once again we'll graph it below.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"showVertices": true}'> Sorry, your browser does not support inline SVG.</svg>

This time we've also plotted the solutions in the corners of the feasible region, because they are important to the simplex algorithm. We call these solutions **corner-point feasible (CPF) solutions**[^cornerPointInfeasible] or **vertices**[^cornerPointsVertices], which are feasible solutions that come at the intersection of two constraint boundaries (in the general case, for LPs with $n$ decision variables, the CPF solution come at the intersection of $n$ constraints boundaries).

[^cornerPointInfeasible]: There are corner-point infeasible solutions as well, which sit at intersections outside the feasible region
[^cornerPointsVertices]: I'm used to calling them vertices, but the textbook tends to call them corner-point solutions, which I like as a more helpful, descriptive term. I'll try to stick to corner-point solution for the notes, but I expect to slip up a few times, especially during lectures.

The simplex algorithm makes use of the following key fact of linear programs:

<div class='theorem' id='thm:cornerPointOpt'>
If a linear program has an optimal solution (i.e. not unbounded or infeasible), then it has an optimal solution that is a corner-point solution.
</div>
<div class='proof' for='thm:cornerPointOpt' placement='appendix'>
We won't actually give a full proof of this theorem, instead we'll only consider the case of a standard form LP (+@eq:standardFormLpMatrix) with only two decision variables. Those of you that are familiar with [proofs by induction](https://en.wikipedia.org/wiki/Mathematical_induction) may be able to see how to generalize this to any number of variables.

In two dimensions we can visualize this, so let's continue to use the sample LP of +@eq:prototypeLp as our example. Any feasible solution to a two-dimensional LP must fall under exactly one of these categories:

1.  An interior solution (not on any constraint boundaries).
2.  On a single constraint boundary.
3.  A corner-point feasible (CPF) solution (i.e. at the intersection of two constraint boundaries).

What we can show is that for any solution of type 1 or 2, we can find a CPF solution with equal or greater objective value, and we will illustrate this in the plot below. To that end, suppose we have some solutions $\mat{z}$ on the interior of the feasible region, and $\mat{y}$ that lies on a single constraint boundary.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"extraPoints": [[2, 1], [3, 4.5]], "extraLines": [[2, 1, 3, 1.5, {"style": "stroke-width:2pt;stroke:black", "marker-end": "url(#blackArrowMarker)"}], [3, 4.5, 2.5, 5.25, {"style": "stroke-width:2pt;stroke:black", "marker-end": "url(#blackArrowMarker)"}]], "extraMathText": [["y", 3.25, 5, {"coordToPix": true}], ["z", 1.75, 1.75, {"coordToPix": true}], ["v", 2, 5.75, {"coordToPix": true}], ["u", 3.25, 1.75, {"coordToPix": true}]]}'> Sorry, your browser does not support inline SVG.</svg>

Let $\mat{v}$ be a (unit) vector that points in the same direction as the constraint boundary that $\mat{y}$ is on. Let $\mat{c}$ be the vector of objective function coefficients (so in our sample LP we would have $\mat{c}=\begin{bmatrix}3\\5\end{bmatrix}$). The objective value at solution $\mat{y}$ is $\mat{y}\c$. In contrast, if we move some amount $\delta$ from $\mat{y}$ along direction $\mat{v}$, the objective value is (due to distributivity of matrix operations) $(\mat{y} + \delta\mat{v})\c = \mat{y}\c + \delta\mat{v}\mat{c}$.

If $\mat{v}\mat{c}\geq0$, then moving from $\mat{y}$ along the constraint boundary in the direction of $\mat{v}$ improves the objective value. So we can continue in that direction until we meet another constraint, yielding a CPF solution with greater-or-equal objective value than $y$. If, on the other hand, $\mat{v}\mat{c}<0$, then we can move in the direction of $-\mat{v}$ to a CPF solution with greater objective value than $\mat{y}$. So either way, there is some CPF solution with objective value at least as good as $\mat{y}$.

The proof for the interior point $\mat{z}$ is very similar. Select some direction $\mat{u}$, and then travel from $\mat{z}$ along directions $\mat{u}$ or $\mat{u}$ until you hit a constraint boundary. One of these points will yield an objective value at least as good as $\mat{z}$, and it will be on either:

- The intersection of two constraints, in which case we've found the CPF solution with at least as good a value as $\mat{z}$.
- A single constraint, in which case we can repeat the procedure shown above for $\mat{y}$ to find the CPF solution.

In either case, we've found our required CPF solution, thus the proof is complete.

</div>

Thanks to this theorem[^theoremDefinition] we know that we only need to check CPF solutions when solving an LP! We make use of this fact during the simplex method, which only checks CPF solutions. We won't check _every_[^simplexEveryVertex] CPF solution, though. The key to simplex is that we jump from one CPF solution to the next while taking care that each move improves the objective value.

[^theoremDefinition]: For those that are not aware, a **theorem** is a mathematical statement that has been proven to be true, based on some set of standard axioms. Anything I cite as a theorem in these notes, you can be confident it holds true, even if we don't work through a rigorous proof.
[^simplexEveryVertex]: At least not generally - for common variants of the simplex method, there exist examples where every CPF solution is visited during execution ([@classText] is the first, most famous example). But this isn't usually an issue in practice.

In fact, the set of solutions we can move to in any iteration is limited to only the solutions that are adjacent to the current solution. In an LP with $n$ decision variables, two CPF solutions are **adjacent** if they share $n-1$ constraint boundaries. Recall that CPF solutions lie at the intersection of $n$ constraint boundaries, so we can also say that two adjacent CPF solutions share all but one boundary in common.

We have all the definitions now to describe simplex in a nutshell: The simplex method solves a linear programming problem by successively moving from one CPF solution to another, adjacent CPF solution, making sure each such move improves the objective function, until no such improvement exists[^oneThingToKnowAboutSimplex].

[^oneThingToKnowAboutSimplex]: This is really the key takeaway from our whole discussion in this section, and if this is the only thing you remember about the simplex method 10 years from now I'll still be satisfied. This is the key insight, you can always re-learn the details later.

### Simplex visualized {#sec:simplexVisualized}

Now that we have the basic idea, let's go ahead and walk through the steps of the simplex algorithm. We won't go fully general on our first time through, though. Let's again consider our sample problem of +@eq:prototypeLp, which we've plotted again below. This time, though, the plot contains some controls that let us step through the simplex method one iteration at a time. I should stress that the simplex method does not work _exactly_ like what we'll talk through below, but all the intuitions are the same and the exercise is, I think, a useful one.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"simplexStart": [0, 0]}'> Sorry, your browser does not support inline SVG.</svg>

The first step is to find an initial feasible CPF solution. In our case (and lots of practical instances too) the solution $(0, 0)$ is a feasible solution, and a corner point as well. It's not a particularly desirable solution in the context of our problem since it brings us no profit, but we don't care about desirability yet.

After initialization, we begin the algorithm's main loop. First we have to determine if there are any adjacent CPF solutions with improving objective value. Recall that an adjacent solution will share $n-1$ constraint boundaries with the current solution. Since we're in two dimensions, the adjacent solutions share one constraint boundary with the current solution. To find the adjacent solutions, we travel out from $(0,0)$ along the two boundary lines it sits on, which in this case are the two axes. Thus the two directions we can move in are $(1,0)$ and $(0,1)$.

How do we know if a solution in any particular direction is improving the objective value? Let's consider the direction $(1,0)$. Since we're moving from $(0,0)$ to some point in the direction of $(1,0)$, the resulting solution will look like $(0,0) + \alpha(1,0)$ for some number $\alpha$. The objective value of any point $\x$ is $\c\x$ where $\c$ is the vector of objective coefficients (which is $(3,5)$ in our sample problem). So the objective value of $(0,0) + \alpha(1,0)$ is

$$
([0\ 0] + \alpha[1\ 0])\begin{bmatrix}3\\5\end{bmatrix}
$$

and since matrix multiplication distributes through addition, this is the same as

$$
[0\ 0]\begin{bmatrix}3\\5\end{bmatrix} + \alpha[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}.
$$

That first term, $[0\ 0]\begin{bmatrix}3\\5\end{bmatrix}$, is just the objective value associated with the current solution $(0,0)$. So the second term $\alpha[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}$, is the _improvement_ associated with the move.

We have two directions in which we can move, $(1,0)$ and $(0,1)$. To keep things standardized we'll want to re-scale our directions to be unit vectors (i.e. vectors with length one), but in this case they're already unit vectors. The improvements associated with unit moves in these directions are $[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}=3$ and $[0\ 1]\begin{bmatrix}3\\5\end{bmatrix}=5$. These are both positive numbers, and since we're trying to maximize the objective value, that means that solutions in either direction are improvements to the objective value.

All that information is summarized in the table below the plot. The two directions are listed, as well as the per-unit change in objective function (under the heading $\Delta$ Obj / Unit[^deltaChange]). Since both directions improve the objective, you have the option to choose either one using the checkboxes in the final column.

[^deltaChange]: The greek capital letter $\Delta$ is commonly used to denote an amount of change, and in these context is often read as "change in."

Let's go ahead and choose the $(0,1)$ direction, since it gives the highest per-unit objective change[^highestPerUnitChange]. Press the forward button on the plot, and you'll see it finds the adjacent solution in that direction, $(0,6)$, and the directions to its adjacent solutions. But only one of the directions is improving, so we choose to move in that direction $(1,0)$ to the adjacent CPF solution $(2,6)$. At this point none of the adjacent directions are improvements, so the current point is optimal and the algorithm is finished.

[^highestPerUnitChange]: Note that having the highest per-unit change doesn't necessarily make it the "best" choice in any particular way. It may be that choosing a different (but still improving) direction will mean that we finish the algorithm faster. But in general we can't tell beforehand, so we often just choose the direction with the highest change as convenient rule-of-thumb.

One thing to note before we move on: All the information we gather during an iteration is in some sense "local" to the current CPF solution. We compute only the _directions_ to the neighboring solutions, not the actual solutions themselves. Only once we decide on a direction do we find the actual CPF solution. This is because finding the solutions is much more expensive computationally speaking, and we'd like to defer that step and only compute solutions when necessary. This isn't such a big deal on a small, two-dimensional example like this, but in larger scale instances this saves a good amount of time.

### Augmented form and basic solutions

We'll return again to our sample problem from +@eq:prototypeLp. The first thing we'll need to do is change the form of the problem. While we modeled the sample problem in standard form +@eq:standardFormLpMatrix, the simplex method requires constraints in equality form (along with the non-negative variables and maximizing the objective). We call this the **augmented form** linear program, which we write as

$$
\begin{align*}
\max && \c\x \\
\st  && \A\x&=\b \\
     && \x&\geq\zeros
\end{align*}
$$

{#eq:augmentedFormLpMatrix}

To transform our sample problem into augmented form, we'll steal a trick from +@sec:lpContraintTransform. We'll turn the inequality constraints into equations by adding a slack variable to each constraint, yielding the following formulation:

$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 + x_3 & = \ \ 4  \\
     && 2x_2 + x_4 & = 12 \\
     && 3x_1 + 2x_2 + x_5 & = 18 \\
     && x_1,x_2,x_3,x_4,x_5 & \geq \ \ 0
\end{align*}
$$

We call $x_3$ the _slack variable_ for the first constraint because its value in a feasible solution tells you how far away the solution's values for $x_1$ and $x_2$ were from the constraint boundary in +@eq:prototypeLp.

Simplex involves lots of matrix manipulations, so let's rewrite this in matrix form. Following usual convention, we'll also add an extra variable $Z$ which is equal to the problem's objective value. So in this case, we have

$$
Z = 3x_1 + 5x_2.
$$

Additionally, we'll go rogue a bit and neglect writing the non-negativity constraints. They're still there, but the simplex algorithm will take care of them implicitly. So in matrix form, our problem looks like:

$$
\begin{bmatrix}
1 & -3 & -5 & 0 & 0 & 0 \\
0 & 1  &  0 & 1 & 0 & 0 \\
0 & 0  &  2 & 0 & 1 & 0 \\
0 & 3  &  2 & 0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 4 \\ 12 \\ 18
\end{bmatrix}
$$

Recall in +@sec:simplexVisualized we made use of <span class='thmRef' for='thm:cornerPointOpt'></span> to solve the LP, jumping from CPF solution to CPF solution while increasing the objective value at every step. We'll do similar algebraically now, but instead of a CPF solution (which made sense in the standard-form world of +@eq:standardFormLpMatrix) we'll make use of **basic feasible (BF) solutions**, the augmented-form analogue. Indeed, the only real difference between corner-point and basic solutions is whether or not the slack variables are included.

That said, basic solutions have their own important properties. Studying the system of equations in the above matrix, we see that we have 5 variables but only 3 (linearly independent) constraints. As you may recall from linear algebra class, this means we have 2 _degrees of freedom_, and thus two of the variables may be set arbitrarily while solving the system. In the simplex method, these two variables will take the value 0. The variables set to 0 are called the **non-basic variables**. We can then solve the system of equations to retrieve values for the other 3 variables, which are called the **basic variables**, and collectively the **basis**. Together, the values of the basic and non-basic variables make up a **basic solution**.

The key properies of basic solutions are the following (quoting from @classText):

> - Each variable is designated as either a nonbasic variable or a basic variable.

- The number of basic variables equals the number of functional constraints (now equations). Therefore, the number of nonbasic variables equals the total number of variables
  minus the number of functional constraints.
- The nonbasic variables are set equal to zero.
- The values of the basic variables are obtained as the simultaneous solution of the system
  of equations (functional constraints in augmented form). (The set of basic variables
  is often referred to as the basis.)
- If the basic variables satisfy the non-negativity constraints, the basic solution is a BF solution.

Two BF solutions are said to be **adjacent** if _all but one_ of their non-basic variables are the same. Note that this means also that all but one of their basic variables are the same. Also note that we don't mean that these basic variables take on the same _values_, just that the identity of the variables are the same. So e.g. one basic solution with basic variables $x_1, x_2$ and $x_3$ is adjacent to another solution with basic variables $x_1, x_2, x_4$, no matter the values taken by those variables in the respective solutions.

### Solving the sample LP with simplex {#sec:simplexExample}

To recap with our new terminology, the goal of the simplex method is to take an LP in augmented form, and iteratively move from one BF solution to another, adjacent BF solution while improving the objective value at every step. We've already converted our sample problem to augmented form, summarized by the following matrix:

$$
\begin{bmatrix}
1 & -3 & -5 & 0 & 0 & 0 \\
0 & 1  &  0 & 1 & 0 & 0 \\
0 & 0  &  2 & 0 & 1 & 0 \\
0 & 3  &  2 & 0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 4 \\ 12 \\ 18
\end{bmatrix}
$$

{#eq:simplexExampleMatrix1}

<h4>Find an initial BF Solution</h4>

We'd like to start iterating between adjacent BF solutions, but to do that we need a BF solution to start with. We'll go into more details on how to find initial BF solutions later, but for now let's notice that using the slack variables as the initial basis will make this system very easy to solve. Why? Since $x_1$ and $x_2$ are non-basic, we set their values to 0. Thus the system +@eq:simplexExampleMatrix1 reduces to:

$$
\begin{bmatrix}
1 & -3 & -5 & 0 & 0 & 0 \\
0 & 1  &  0 & 1 & 0 & 0 \\
0 & 0  &  2 & 0 & 1 & 0 \\
0 & 3  &  2 & 0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ 0 \\ 0 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 4 \\ 12 \\ 18
\end{bmatrix}
$$

or, equivalently:

$$
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 4 \\ 12 \\ 18
\end{bmatrix}
$$

So the initial BF solution is $(x_1, x_2, x_3, x_4, x_5)$ = $(0, 0, 4, 12, 18)$, yielding objective value $Z=0$.

This BF solution was easy to solve for because of how the system was set up. The portion of the matrix corresponding to the basic variables was essentially an identity matrix, so we just needed to read the values off the right-hand side. Indeed, as we move from one BF solution to another, we will explicitly manipulate the matrix, (using basic row operations, as in +@sec:elementaryRowOperations) to yield an identity structure in the basic columns.

But we're not there yet. We just have an initial BF solution, and need to figure out how to move to an adjacent one while improving the objective value. Recall that adjacent solutions share all their basic variables in common except 1, so the decisions to make are

1.  Does an improving solution exist?
1.  If so, which of the current non-basic variables should we move into the basis?
1.  In light of the last decision, which of the current basic variables should we remove from the basis?

<h4>Optimality test</h4>

To decide whether an improving adjacent solution exists, we'll take a look at the top row of our matrix +@eq:simplexExampleMatrix1, which we set up to track the objective value $Z$. When multiplied by the variable vector, that top row current reads as $Z - 3x_1 - 5x_2 = 0$, simply a rearranging of the usual objective $Z = 3x_1 + 5x_2$. Thus a negative value in the top row indicates that including that variable in the basis will improve the objective value. Since we have negative values in the top row, we conclude that the current solution is not optimal.

<h4>Determine the incoming variable</h4>

Since both $x_1$ and $x_2$ have negative values in the objective row, we now have two choices of incoming basic variables that will improve the objective value. As we did in +@sec:simplexVisualized, we will choose the variable that gives the highest such improvement per unit change in the variable, which in this case is $x_2$ (which has a coefficient of -5 in the top row, vs. -3 for $x_1$).

<h4>Determine the outgoing variable</h4>

We've decided that we want $x_2$ to enter the basis, i.e. we'd like its value to increase from 0 in the current solution to some positive value in the next solution. What effect does increasing $x_2$ have on the constraints? All of the equations are currently satisfied, so changing the value of $x_2$ means that we must change the values of other variables to compensate. Luckily, the way the matrix is set up, each constraint has only one basic variable with a non-zero coefficient. For example, the third row of +@eq:simplexExampleMatrix1, when multiplied out, reads:

$$
2x_2 + x_4 = 12.
$$

Importantly, $x_4$ is the only non-basic variable in this constraint, and it is the _only_ constraint that $x_4$ shows up in (due to the identity matrix structure in the basic variables). So each unit increase in $x_2$ will require a 2-unit _decrease_ in $x_4$ to balance the constraint. Since each variable (and so in particular, $x_4$) must stay non-negative, we can only increase $x_2$ from 0 to 6 without and still remain feasible.

So we carry out this procedure with each constraint in +@eq:simplexExampleMatrix1 (rows 2-4). $x_2$ does not appears in the second row, so this constraint will not be violated no matter how much we change $x_2$. Row four gives the equation $x_1 + 2x_2 + x_5 = 18$, so again a unit increase in $x_2$ requires a 2-unit decrease in $x_5$. Since the right-hand side is 18, we can only increase $x_2$ to 9 before $x_5$ will go negative.

Let's summarize what we've done now: for each constraint, we've compared the contribution of $x_2$ in the constraint to the contribution of the corresponding basic variable. In fact, you may or may not have noticed, because of the identity matrix structure in the basis, all we need to do to make this calculation is divide the right-hand side (rhs) value by the coefficient on $x_2$ in each constraint! In summary, we found these ratios:

$$
x_2\text{ column: }\begin{bmatrix}0 \\ 2 \\ 2\end{bmatrix}\
\text{ rhs: }\begin{bmatrix}4 \\ 12 \\ 18\end{bmatrix}\
\text{ ratio: }\begin{bmatrix}4/0 \\ 12/2 \\ 18/2\end{bmatrix} = \begin{bmatrix}\infty \\ 6 \\ 9\end{bmatrix}
$$

Then the variable leaving the basis should be the one in the constraint that gives the smallest _positive_ ratio (we call this process the **minimum ratio test**). Why? Let's first thing, what would it mean for the ratio to be negative? We know all of the rhs values are non-negative, since these are the values taken by the basic variables at the current solution, and all variables must be $\geq0$. In fact, let's a assume the rhs is strictly positive ($>0$), as rhs values of 0 are a special case we'll cover later. So a negative ratio means a negative coefficient on the entering variable. So any increases in the entering variable must be counteracted in the constraint by _increases_ in the basic variable, not decreases, and we can increase the variables as much as we want because the only other constraint involving the basic variable is the non-negativity constraint.

So we can throw out all basic variables from constraints where the ratio is non-positive. Meanwhile, as we discussed above, a finite positive ratio is the bound on how much we can increase the entering variable before the basic variable decreases to 0. So we must take the minimum such increase in order to keep the entire system feasible. In our case, the minimum ratio comes in the second constraint. The basic variable included in that constraint is $x_4$, so we must choose $x_4$ to leave the basis[^exitingVariableTies].

[^exitingVariableTies]: It is also possible to have a tie in the minimum ratio test. This is another special case that we'll cover later.

<h4>Solve the new system</h4>

Now that we've identified the variables entering and exiting the basis, what remains is to find the values of the variables at the new solution. Since $x_1$ and $x_4$ are non-basic, their values will be 0. To find the other values, we'll essentially do [Gaussian elimination](https://en.wikipedia.org/wiki/Gaussian_elimination) on the matrix system +@eq:simplexExampleMatrix1 to yield an identity matrix structure over the columns corresponding to our basis.

Our basis variable swap came from the model's second constraint, which corresponds to row 3 in the matrix. This will be the "identity" row for the entering variable $x_2$, so we'll multiply that row by $1/2$ to get a new matrix:

$$
\begin{bmatrix}
1 & -3 & -5 & 0 & 0   & 0 \\
0 & 1  &  0 & 1 & 0   & 0 \\
0 & 0  &  1 & 0 & 1/2 & 0 \\
0 & 3  &  2 & 0 & 0   & 1 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 4 \\ 6 \\ 18
\end{bmatrix}
$$

To complete the identity matrix structure, we must change all other coefficients in the $x_2$ column to equal zero. So we'll do the following:

- Multiply the third row by 5 and add it to the first row.
- Multiply the third row by -2 and add it to the fourth row.

Our new matrix will have the identity structure we're after:

$$
\begin{bmatrix}
1 & -3 & 0 & 0 & 5/2 & 0 \\
0 & 1  & 0 & 1 & 0   & 0 \\
0 & 0  & 1 & 0 & 1/2 & 0 \\
0 & 3  & 0 & 0 & -1  & 1 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
30 \\ 4 \\ 6 \\ 6
\end{bmatrix}
$$

{#eq:simplexExampleMatrix2}

Lastly, as before, we can simply read the values of the objective and the basic variables from the rhs of the system: $Z=30, x_3=4, x_2=6, x_5=6$.

<h4>Keep iterating</h4>

We've now completed initialization and the first iteration of the method. So we continue iterating, starting from the optimality testing phase. In this case, the non-basic variable $x_1$ has a negative coefficient in the top row of +@eq:simplexExampleMatrix2, so we do not have on optimal solution.

The other non-basic variable, $x_4$, has a positive coefficient in the top row. So $x_1$ is our only candidate for entering the basis. Now let's set up our ratio test:

$$
x_1\text{ column: }\begin{bmatrix}1 \\ 0 \\ 3\end{bmatrix}\
\text{ rhs: }\begin{bmatrix}4 \\ 6 \\ 6\end{bmatrix}\
\text{ ratio: }\begin{bmatrix}4/1 \\ 6/0 \\ 6/3\end{bmatrix} = \begin{bmatrix}4 \\ \infty \\ 2\end{bmatrix}
$$

Then at most we can increase $x_1$ to 2, as going any further will make $x_5$ (the basic variable in the last constraint) negative. So we'll replace $x_5$ with $x_1$ as the basic variable in the last constraint. Using elimination to build our identity structure yields the following matrix:

$$
\begin{bmatrix}
1 & 0 & 0 & 0 &  3/2 &    1 \\
0 & 0 & 0 & 1 &  1/3 & -1/3 \\
0 & 0 & 1 & 0 &  1/2 &    0 \\
0 & 1 & 0 & 0 & -1/3 &  1/3 \\
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
36 \\ 2 \\ 6 \\ 2
\end{bmatrix}
$$

Thus our new solution is $x_1=2, x_2=6, x_3=2, x_4=0$, and $x_5=0$[^slackInterpretation]. Since the top row has all positive coefficients, increasing these variables would only serve to decrease the objective. So we've passed the optimality test, and can terminate with the optimal solution!

[^slackInterpretation]: Now might be a good time to check out the simplex visualization in +@sec:simplexVisualized and see if you understand the interpretation of the slack variable values in the solutions we've found.

### Simplex in matrix notation

Now that we have the mechanics down, let's tidy up our presentation of the simplex method by writing out the steps in matrix notation. Recall that for simplex we need equality constraints and non-negative variables, so our problem is formulated as in +@eq:augmentedFormLpMatrix. Additionally, we will assume that the $m\times n$ matrix $A$ is has rank $m$ and is _non-singular_, so in particular $n\geq m$ and there are no _redundant_ constraints (which would be any constraint that is a linear combination of some of the others). The rank assumption can be done without loss of generality, because any redundant system can be reduced to non-redundant by removing constraints[^standardToAugmentedNoProblem].

[^standardToAugmentedNoProblem]: Note also that if you came to the equality-constrained problem ($\A\x=\b$) via a transformation from the inequality form ($\A\x\leq\b$) by adding slack variables, the slack variables themselves guarantee full row rank.

At each step of the simplex method, the matrix calculations required rely on the submatrix of $\A$ corresponding to the basic variables. Let's recall +@eq:simplexExampleMatrix1, the initial set of equations defining our sample LP when we solved it in +@sec:simplexExample. In this case, our matrix $\A$ is given by 

$$
\A = \begin{bmatrix}
1  &  0 & 1 & 0 & 0 \\
0  &  2 & 0 & 1 & 0 \\
3  &  2 & 0 & 0 & 1 \\
\end{bmatrix}
$$

The submatrix we're after at any given iteration, which we'll call $\B$ is the subset of columns corresponding to our basic variables. Our initial basis in +@sec:simplexExample was $\{x_3, x_4, x_5\}$, and so the matrix of interest in the first iteration was

$$
\B = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}
$$.

The vector of variables $\x$ can similarly be segmented into the parts corresponding to basic variables, which we'll call $\x_B$, and non-basic variables $\x_N$. So for our example problem at the first iteration we had:

$$
\x=\begin{bmatrix}x_1\\x_2\\x_3\\x_4\\x_5\end{bmatrix}\quad\x_B=\begin{bmatrix}x_3\\x_4\\x_5\end{bmatrix}\quad\x_N=\begin{bmatrix}x_1\\x_2\end{bmatrix}
$$

To solve the system of equations at any iteration, we applied elementary row operations to create an identity matrix in the columns corresponding to our basis. But since $\B$ is non-singular, it has an inverse $\B\inv$ such that $\B\inv\B=\identity$, where $\identity$ is an identity matrix. So really, all of our row operations amounted to pre-multiplying the system of equations by $\B\inv$.

Given this, watch what happens when we pre-multiply both sides of our constraints by $\B\inv$:

$$
\begin{align*}
\A\x = \b
& \Leftrightarrow \B\inv\A\x = \B\inv\b && \quad(\text{pre-mult by }\B\inv) \\
& \Leftrightarrow \B\inv\A\begin{bmatrix}\x_B\\\x_N\end{bmatrix} = \B\inv\b && \quad(\text{partition }x\text{ into basic/non-basic}) \\
& \Leftrightarrow \B\inv\A\begin{bmatrix}\x_B\\\zeros\end{bmatrix} = \B\inv\b && \quad(\x_N=\zeros\text{ in basic solutions}) \\
& \Leftrightarrow \B\inv\B\x_B = \B\inv\b && \quad(\x_N=\zeros\text{ takes out other columns of }\A) \\
& \Leftrightarrow \identity\x_B = \B\inv\b && \quad(\text{definition of inverse}) \\
& \Leftrightarrow \x_B = \B\inv\b && \quad(\text{definition of identity})
\end{align*}
$$

So getting the variable values at a basic solution is as simple as taking $\x_N=\zeros$ and $\x_B=\B\inv\b$. If we similarly partition the objective vector $\c$ into $\c_B$ (corresponding to the basic variables) and $\c_N$ (non-basic variables) then the objective value at that solution is:

$$
\begin{align*}
\c\x & = \c_B\x_B + \c_N\x_N && \\
& = \c_B\x_B && \quad(\x_N=\zeros) \\
& = \c_B\B\inv\b && \quad(\text{sub above value for }\x_B) \\
\end{align*}
$$

So we know how to find the solution for any given basis, but what about determining entering and exiting variables? In +@sec:simplexExample we used the information from the objective (top) row of our problem matrix, so let's re-introduce that here. We can summarize all of our problem information in the following matrix formulation:

$$
\begin{bmatrix}
1 & -\c \\
\zeros & \A
\end{bmatrix}
\begin{bmatrix}
Z \\ \x
\end{bmatrix}
=
\begin{bmatrix}
0 \\ \b
\end{bmatrix}
$$
{#eq:simplexMatrixAllInfo}

where once again $Z$ is a "variable" representing the objective value. Note that this matches exactly with +@eq:simplexExampleMatrix1 from +@sec:simplexExample.

<h4>The magic matrix</h4>

We know from linear algebra that any sequence of elementary matrix operations can be performed simultaneously via matrix multiplication. All we did during the iterations +@sec:simplexExample was apply elementary row operations to the original matrix, so if we can find the correct matrix, recovering all the relevant information is as simple as multiplying by that matrix. With that in mind, let me present to you the following matrix[^magicMatrixDerivation].

[^magicMatrixDerivation]: Sorry to just present this to you as if it's a mystical gift from the gods. We could have totally derived it ourselves, but I didn't think it was worth the class time.

$$
\begin{bmatrix}1 & \c_B\B\inv \\ \zeros & \B\inv\end{bmatrix}
$$
{#eq:magicMatrix}

Watch what happens when we pre-multiply this on the right-hand side of +@eq:simplexMatrixAllInfo:

$$
\begin{bmatrix}1 & \c_B\B\inv \\ \zeros & \B\inv\end{bmatrix}
\begin{bmatrix}
0 \\ \b
\end{bmatrix}
=
\begin{bmatrix}
\c_B\B\inv\b \\ \B\inv\b
\end{bmatrix}
$$

The top of the result is the objective value $Z$ at the current basis solution, and the bottom give the values of $\x_B$. So it looks like +@eq:magicMatrix is precisely the matrix we need to encapsulate all the operations we did during a simplex iteration. Of course, any multiplication we apply on one side of an equation must also be applied to the other side to keep the system valid. So let's apply pre-multiply +@eq:magicMatrix on the left-hand side of +@eq:simplexMatrixAllInfo as well:

$$
\begin{bmatrix}1 & \c_B\B\inv \\ \zeros & \B\inv\end{bmatrix}
\begin{bmatrix}
1 & -\c \\
\zeros & \A
\end{bmatrix}
= \begin{bmatrix}1 & \c_B\B\inv\A - \c \\ \zeros & \B\inv\A\end{bmatrix}
$$

So for any given basis, the information we require for the simplex method is all present in the following system:

$$
\begin{bmatrix}1 & \c_B\B\inv\A - \c \\ \zeros & \B\inv\A\end{bmatrix}
\begin{bmatrix}Z \\ \x\end{bmatrix}
=
\begin{bmatrix}
\c_B\B\inv\b \\ \B\inv\b
\end{bmatrix}
$$
{#eq:simplexMatrixGeneralized}

Maybe this looks a little messy when seeing it the first time, but don't let that scare you! Look at all the constituent elements of this system. $\A, \b$, and $\c$ are all just vectors/matrices from the problem definition. The only thing you need to do from iteration to iteration is choose the basis, invert $\B$ (which is just a submatrix of $\A$), then multiply!

To finish off this section, let's use Python to verify that the system we recover from +@eq:simplexMatrixGeneralized matches with what we got during the iterations in +@sec:simplexExample.

{colabGist:1OrINYKwrk7OGhP1PAypxZ2nYpVbS-V4m,e5817bc5b1eb52dce2737969e0ee0c83}

### Presenting (finally) the simplex algorithm (mostly)

### Other considerations

### Revised simplex

Gotchas and edge cases

<!-- book section 4.5 -->

## Duality

## Sensitivity analysis
