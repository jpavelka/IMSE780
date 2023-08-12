# Linear programming

In the family of OR techniques, linear programming (LP) is certainly the matriarch. It was among the first methods to be seriously studied and find broad applications. To this day, LPs are relevant and used across industry to inform decision-making and help best make use of scarce resources.

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

### Different constraint forms

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

### A word on notation

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
\max && \c\T\x \\
\st  && \A\x&\leq\b \\
     && \x&\geq\zeros
\end{align*}
$$

{#eq:standardFormLpMatrix}

Much nicer on the eyes, right!

Further, you may have noticed that though we've devoted significant time to it already, we haven't formally defined linear programming yet! I was waiting for this moment to do so. A **linear program** is an optimization problem in the form of +@eq:standardFormLpMatrix.

## The simplex method

We're just about ready to talk about LP solving algorithms, and we're of course starting with the simplex algorithm. Arguably the most important breakthrough in the history of OR was the development of the simplex method by George Dantzig[^dantzigStory] during the late 1940s[^assumeLinear]. It was perhaps the first practical algorithm developed for linear programming, and it continues to be the workhorse in linear and integer programming solvers today[^simplexNotKnownPoly].

[^dantzigStory]: I'm not mentioning a lot of people by name in these notes, but I couldn't skip Dantzig. Mostly I wanted to bring up this famous story: A student comes late to class one day, sees two problems written on the board, and assumes they are the day's assigned homework. The problems are more difficult than usual, but he solves them. When he turns them in, the professor is elated - these weren't homework, but rather famous unsolved problems in the field! You can find several versions of this story out there, citing several different people as the supposed student. Turns out [this actually happened, and the student was Dantzig](https://www.snopes.com/fact-check/the-unsolvable-math-problem/#6oJOtz9WKFQUHhbw.99).
[^assumeLinear]: There's a neat story, quoting from @tspPursuit, in [this blog post](https://punkrockor.com/2014/04/29/happiness-is-assuming-the-world-is-linear/) (yes, OR blogs are a thing). It's specifically about Dantzig first introducing the simplex method during a talk in 1948, and more generally about understanding your assumptions 😀.
[^simplexNotKnownPoly]: Interestingly, several other linear programming algorithms have been devised whose theoretical properties seem to suggest they would be more efficient. But in practice that hasn't been the case. Simplex continues to be the best algorithm in practice for the widest array of problems.

### Simplex visualized

Before we get to the algorithm itself, let's take a moment to dwell on some geometric insights the method relies on. We'll return to our sample problem +@eq:prototypeLp and once again we'll graph it below.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"showVertices": true}'> Sorry, your browser does not support inline SVG.</svg>

This time we've also plotted the solutions in the corners of the feasible region, because they are important to the simplex algorithm.

<!-- book section 4.5 -->
