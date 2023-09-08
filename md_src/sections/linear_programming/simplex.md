## The simplex method {#sec:simplex}

<div class='lectureVideoEmbed' video-id='3bffb2e146dc437488375242ef326b511d' video-date='2023-09-06'>Simplex walkthrough. Unfortunately I do some board work in this one but didn't switch the recording to focus on the board, so some of that might be hard to make out.</div>

We're just about ready to talk about LP solving algorithms, and we're of course starting with the **simplex method** (also sometimes called the **simplex algorithm**). Arguably the most important breakthrough in the history of OR was the development of the simplex method by George Dantzig[^dantzigStory] during the late 1940s[^assumeLinear]. It was perhaps the first practical algorithm developed for linear programming, and it continues to be the workhorse in linear and integer programming solvers today[^simplexNotKnownPoly].

[^dantzigStory]: I'm not mentioning a lot of people by name in these notes, but I couldn't skip Dantzig. Mostly I wanted to bring up this famous story: A student comes late to class one day, sees two problems written on the board, and assumes they are the day's assigned homework. The problems are more difficult than usual, but he solves them. When he turns them in, the professor is elated - these weren't homework problems at all, but rather famous unsolved problems in the field! You can find several versions of this story out there, citing several different people as the supposed student. Turns out [this actually happened, and the student was Dantzig](https://www.snopes.com/fact-check/the-unsolvable-math-problem/#6oJOtz9WKFQUHhbw.99).
[^assumeLinear]: There's a neat story, quoting from @tspPursuit, in [this blog post](https://punkrockor.com/2014/04/29/happiness-is-assuming-the-world-is-linear/) (yes, OR blogs are a thing). It's specifically about Dantzig first introducing the simplex method during a talk in 1948, and more generally about understanding your assumptions 😀.
[^simplexNotKnownPoly]: Interestingly, several other linear programming algorithms have been devised whose theoretical properties seem to suggest they would be more efficient. But in practice that hasn't been the case. Simplex continues to be the best algorithm in practice for the widest array of problems.

### Corner-point solutions

Before we get to the algorithm itself, let's take a moment to dwell on some geometric insights the method relies on. We'll return to our sample problem +@eq:prototypeLp and once again we'll graph it below.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"showVertices": true}'> Sorry, your browser does not support inline SVG.</svg>

This time we've also plotted the solutions in the corners of the feasible region, because they are important to the simplex algorithm. We call these solutions **corner-point feasible (CPF) solutions**[^cornerPointInfeasible] or **vertices**[^cornerPointsVertices], which are feasible solutions that come at the intersection of two constraint boundaries (in the general case, for LPs in standard form +@eq:standardFormLp with $n$ decision variables, the CPF solutions come at the intersection of $n$ constraints boundaries).

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
[^simplexEveryVertex]: At least not generally - for common variants of the simplex method, there exist examples where every CPF solution is visited during execution ([@kleeMinty] is the first, most famous example). But this isn't usually an issue in practice.

In fact, the set of solutions we can move to in any iteration is limited to only the solutions that are adjacent to the current solution. In a standard-form LP with $n$ decision variables, two CPF solutions are **adjacent** if they share $n-1$ constraint boundaries. Recall that CPF solutions lie at the intersection of $n$ constraint boundaries, so we can also say that two adjacent CPF solutions share all but one boundary in common.

We have all the definitions now to describe simplex in a nutshell: The simplex method solves a linear programming problem by successively moving from one CPF solution to another, adjacent CPF solution, making sure each such move improves the objective function, until no such improvement exists[^oneThingToKnowAboutSimplex].

[^oneThingToKnowAboutSimplex]: This is really the key takeaway from our whole discussion in this section, and if this is the only thing you remember about the simplex method 10 years from now I'll still be satisfied. This is the key insight, you can always re-learn the details later.

### Simplex visualized {#sec:simplexVisualized}

Now that we have the basic idea, let's go ahead and walk through the steps of the simplex algorithm. We won't go fully general on our first time through, though. Let's again consider our sample problem of +@eq:prototypeLp, which we've plotted again below. This time, though, the plot contains some controls that let us step through the simplex method one iteration at a time. I should stress that the simplex method does not work _exactly_ like what we'll talk through below, but all the intuitions are the same and the exercise is, I think, a useful one.

<svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"simplexStart": [0, 0]}'> Sorry, your browser does not support inline SVG.</svg>

The first step is to find an initial CPF solution. In our case (and lots of practical instances too) the solution $(0, 0)$ is a feasible solution, and a corner point as well. It's not a particularly desirable solution in the context of our problem since it brings us no profit, but we don't care about desirability yet.

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

We have two directions in which we can move, $(1,0)$ and $(0,1)$. To keep things standardized we'll want to re-scale our directions to be unit vectors (i.e. vectors with length one), but in this case they're already unit vectors. The improvements associated with unit moves in these directions are $[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}=3$ and $[0\ 1]\begin{bmatrix}3\\5\end{bmatrix}=5$. These are both positive numbers, and since we're trying to maximize the objective value, that means that solutions in either direction are improvements.

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

To transform our sample problem into augmented form, we'll steal a trick from +@sec:lpConstraintTransform. We'll turn the inequality constraints into equations by adding a slack variable to each constraint, yielding the following formulation:

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

The key properties of basic solutions are the following (quoting from @classText):

> - Each variable is designated as either a nonbasic variable or a basic variable.
> - The number of basic variables equals the number of functional constraints (now equations). Therefore, the number of nonbasic variables equals the total number of variables
>   minus the number of functional constraints.
> - The nonbasic variables are set equal to zero.
> - The values of the basic variables are obtained as the simultaneous solution of the system
>   of equations (functional constraints in augmented form).
> - If the basic variables satisfy the non-negativity constraints, the basic solution is a BF solution.

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

We'd like to start iterating between adjacent BF solutions, but to do that we need a BF solution to start with. We'll go into more details on how to find initial BF solutions later in +@sec:lpOtherConsiderations, but for now let's notice that using the slack variables as the initial basis will make this system very easy to solve. Why? Since $x_1$ and $x_2$ are non-basic, we set their values to 0. Thus the system +@eq:simplexExampleMatrix1 reduces to:

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

This BF solution was easy to solve for because of how the system was set up. The portion of the matrix corresponding to the basic variables was essentially an identity matrix, so we just needed to read the values off the right-hand side. Indeed, as we move from one BF solution to another, we will explicitly manipulate the matrix (using basic row operations, as in +@sec:elementaryRowOperations) to yield an identity structure in the basic columns.

But we're not there yet. We just have an initial BF solution, and need to figure out how to move to an adjacent one while improving the objective value. Recall that adjacent solutions share all their basic variables in common except 1, so the decisions to make are

1.  Does an improving solution exist?
1.  If so, which of the current non-basic variables should we move into the basis?
1.  In light of the last decision, which of the current basic variables should we remove from the basis?

<h4>Optimality test</h4>

To decide whether an improving adjacent solution exists, we'll take a look at the top row of our matrix +@eq:simplexExampleMatrix1, which we set up to track the objective value $Z$. When multiplied by the variable vector, that top row currently reads as $Z - 3x_1 - 5x_2 = 0$, simply a rearranging of the usual objective $Z = 3x_1 + 5x_2$. Thus a negative value in the top row indicates that including that variable in the basis will improve the objective value. Since we have negative values in the top row, we conclude that the current solution is not optimal.

<h4>Determine the incoming variable</h4>

Since both $x_1$ and $x_2$ have negative values in the objective row, we now have two choices of incoming basic variables that will improve the objective value. As we did in +@sec:simplexVisualized, we will choose the variable that gives the highest such improvement per unit change in the variable, which in this case is $x_2$ (which has a coefficient of -5 in the top row, vs. -3 for $x_1$).

<h4>Determine the outgoing variable</h4>

We've decided that we want $x_2$ to enter the basis, i.e. we'd like its value to increase from 0 in the current solution to some positive value in the next solution. What effect does increasing $x_2$ have on the constraints? All of the equations are currently satisfied, so changing the value of $x_2$ means that we must change the values of other variables to compensate. Luckily, the way the matrix is set up, each constraint has only one basic variable with a non-zero coefficient. For example, the third row of +@eq:simplexExampleMatrix1, when multiplied out, reads:

$$
2x_2 + x_4 = 12.
$$

Importantly, $x_4$ is the only non-basic variable in this constraint, and this is the _only_ constraint that $x_4$ shows up in (due to the identity matrix structure in the basic variables). So each unit increase in $x_2$ will require a 2-unit _decrease_ in $x_4$ to balance the constraint. Since each variable (and so in particular, $x_4$) must stay non-negative, we can only increase $x_2$ from 0 to 6 and still remain feasible.

So we carry out this procedure with each constraint in +@eq:simplexExampleMatrix1 (rows 2-4). $x_2$ has a coefficient of 0 in the second row, so this constraint will not be violated no matter how much we change $x_2$. Row four gives the equation $x_1 + 2x_2 + x_5 = 18$, so again a unit increase in $x_2$ requires a 2-unit decrease in $x_5$. Since the right-hand side is 18, we can only increase $x_2$ to 9 before $x_5$ will go negative.

Let's summarize what we've done now: for each constraint, we've compared the contribution of $x_2$ to the contribution of the corresponding basic variable. We saw above that when the coefficient on $x_2$ is zero for a given constraint, then changing the value of $x_2$ will not affect that constraint at all. We didn't have an example of this, but if the coefficient on $x_2$ were negative then increasing $x_2$ is counteracted by an _increase_ in the current basic variable. Variables must be non-negative, but there is no _upper_ bound, so we are free to increase a variable as much as we want. Thus the only constraints that restrict $x_2$ are the ones where the coefficient on $x_2$ is strictly positive.

So the rows where the $x_2$ coefficient is positive are where we need to worry about the current basic variable going negative, and where we need to calculate how much $x_2$ can increase before that happens. You may or may not have noticed, but because of the identity matrix structure in the basis, all we need to do for this calculation is divide the right-hand side (rhs) value by the coefficient on $x_2$ in each constraint! Thus our concern is the following ratios:

$$
x_2\text{ column: }\begin{bmatrix}0 \\ 2 \\ 2\end{bmatrix}\
\text{ rhs: }\begin{bmatrix}4 \\ 12 \\ 18\end{bmatrix}\
\text{ ratio: }\begin{bmatrix}- \\ 12/2 \\ 18/2\end{bmatrix} = \begin{bmatrix}- \\ 6 \\ 9\end{bmatrix}
$$

Then the variable leaving the basis should be the one in the constraint that gives the smallest such ratio (we call this process the **minimum ratio test**). Why? As we discussed above, the ratio in each column is the bound on how much we can increase the entering variable before the basic variable decreases to 0. So we must take the minimum such increase in order to keep the entire system feasible. In our case, the minimum ratio comes in the second constraint. The basic variable included in that constraint is $x_4$, so we must choose $x_4$ to leave the basis[^exitingVariableTies].

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
\text{ ratio: }\begin{bmatrix}4/1 \\ - \\ 6/3\end{bmatrix} = \begin{bmatrix}4 \\ - \\ 2\end{bmatrix}
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

{#eq:simplexExampleFinalMatrix}

Thus our new solution is $x_1=2, x_2=6, x_3=2, x_4=0$, and $x_5=0$[^slackInterpretation]. Since the top row has all positive coefficients, increasing these variables would only serve to decrease the objective. So we've passed the optimality test, and can terminate with the optimal solution!

[^slackInterpretation]: Now might be a good time to check out the simplex visualization in +@sec:simplexVisualized and see if you understand the interpretation of the slack variable values in the solutions we've found.

### Simplex in matrix notation

<div class='lectureVideoEmbed' video-id='aa0f8c8329cd4138a5313757a8f8f1a51d' video-date='2023-09-08'>Python basics. The video cut off a bit at the end, but you don't miss anything important.</div>

Now that we have the mechanics down, let's tidy up our presentation of the simplex method by writing out the steps in matrix notation. Recall that for simplex we need equality constraints and non-negative variables, so our problem is formulated as in +@eq:augmentedFormLpMatrix. Additionally, we will assume that the $m\times n$ matrix $A$ is has rank $m$ and is _non-singular_, so in particular $n\geq m$ and there are no _redundant_ constraints (which would be any constraint that is a linear combination of some of the others). The rank assumption can be done without loss of generality, because any redundant system can be reduced to non-redundant by removing constraints[^standardToAugmentedNoProblem].

[^standardToAugmentedNoProblem]: Note also that if you came to the equality-constrained problem ($\A\x=\b$) via a transformation from the inequality form ($\A\x\leq\b$) by adding slack variables, the slack variables themselves guarantee full row rank.

At each step of the simplex method, the matrix calculations required rely on the sub-matrix of $\A$ corresponding to the basic variables. Let's recall +@eq:simplexExampleMatrix1, the initial set of equations defining our sample LP when we solved it in +@sec:simplexExample. In this case, our matrix $\A$ is given by

$$
\A = \begin{bmatrix}
1  &  0 & 1 & 0 & 0 \\
0  &  2 & 0 & 1 & 0 \\
3  &  2 & 0 & 0 & 1 \\
\end{bmatrix}
$$

The sub-matrix we're after at any given iteration, which we'll call $\B$ is the subset of columns corresponding to our basic variables. Our initial basis in +@sec:simplexExample was $\{x_3, x_4, x_5\}$, and so the matrix of interest in the first iteration was

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

<div class='mathSmall'>
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
{#eq:basicVariableValues}
</div>

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

The top row coefficients $\c_B\B\inv\A - \c$ are often called the __reduced costs__ of the variables at the current solution.

Maybe this looks a little messy when seeing it the first time, but don't let that scare you! Look at all the constituent elements of this system. $\A, \b$, and $\c$ are all just vectors/matrices from the problem definition. The only thing you need to do from iteration to iteration is choose the basis, invert $\B$ (which is just a sub-matrix of $\A$), then multiply!

To finish off this section, let's use Python to verify that the system we recover from +@eq:simplexMatrixGeneralized matches with what we got during the iterations in +@sec:simplexExample.

{colabGist:1OrINYKwrk7OGhP1PAypxZ2nYpVbS-V4m,e5817bc5b1eb52dce2737969e0ee0c83}

### Presenting (finally) the simplex algorithm (mostly)

While we still have some edge cases and gotchas to discuss, we have what we need to now succinctly specify the core of the simplex algorithm. Remember, we assume any LP being solved by the simplex method has been converted (by means of the techniques in +@sec:lpForms) to the equality-constrained form of +@eq:augmentedFormLpMatrix.

 - _Initialize_: Determine an initial BF solution (we'll discuss general methods for this in +@sec:lpOtherConsiderations).
 - _Iterate_:
   - _Test for optimality_: Examine the values of $\c_B\B\inv\A - \c$ (i.e. the reduced costs, from the top row of +@eq:simplexMatrixGeneralized) corresponding to the non-basic variables. If all coefficients are non-negative, terminate with the optimal solution. Otherwise, continue with the iteration.
   - _Determine the entering basic variable_: Select some variable whose coefficient in $\c_B\B\inv\A - \c$ is negative.
   - _Determine the exiting basic variable_: Suppose the entering variable from the last step corresponds to the $j$th column of the original constraint matrix $A$. Perform the _minimum ratio test_ from +@sec:simplexExample, dividing the entries of the vector $\B\inv\b$ (the right-hand side of the constraints portion of +@eq:simplexMatrixGeneralized) by the entries in the $j$th column of $\B\inv\A$. For the exiting variable, select the basic variable corresponding to the row with the smallest positive ratio.

And that's it!

### Other considerations {#sec:lpOtherConsiderations}

Let's now discuss some implementation details that add slight complications to the simplex algorithm, and would need to be taken care of in any LP solving software.

<h4>Determining the initial BF solution</h4>

In our sample problem, determining an initial BF solution was simple because of the slack variables we added to convert the problem to equality form. But this won't always be possible. By way of example, suppose in our sample LP +@eq:prototypeLp the problem requires plant 3 to operate at full capacity. Then the third constraint becomes an equality constraint, $3x_1 + 2x_2 = 18$. Once slack variables are added to the other constraints, we have the following formulation:

$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st && x_1 + x_3 & = \ \ 4 \\
&& 2x_2 + x_4 & = 12 \\
&& 3x_1 + 2x_2 & = 18 \\
&& x_1,x_2,x_3,x_4 & \geq \ \ 0
\end{align*}
$$

There is no longer a nice identity matrix structure on which to base our initial BF solution. In this case, a good trick is to add an extra, so-called __artificial variable__ to the formulation. Additionally, we will add this variable to the objective function with a _huge_ negative coefficient denoted by $M$, a trick known as the __Big M method__. For the above problem, the artificial variable formulation will look like:

$$
\begin{align*}
\max && 3x_1 + 5x_2 - M\hat x_5& \\
\st && x_1 + x_3 & = \ \ 4 \\
&& 2x_2 + x_4 & = 12 \\
&& 3x_1 + 2x_2 + \hat x_5 & = 18 \\
&& x_1,x_2,x_3,x_4,\hat x_5 & \geq \ \ 0
\end{align*}
$$

Note that we require the artificial variable to be non-negative to conform with +@eq:augmentedFormLpMatrix, the form required for simplex. It is further worth noting that the right-hand side of the constraint needs to be non-negative to keep $\hat x_5\geq0$ in the initial solution. This is no big deal though, since if the right-hand side were negative we could simply multiply both sides of the constraint by $-1$ and use the resultant constraint in the formulation instead.

What good will this do us? We can initialize simplex now with $x_3, x_4$, and $\hat x_5$ as our original basis. Further, due to the massive penalty to the objective for including $\hat x_5$ in a solution, the artificial variable will eventually leave the basis if possible. So we keep running simplex until either:

 - $\hat x_5$ drops out of the basis, at which point we can remove it from the problem completely and continue iterating simplex as usual.
 - We find an optimal solution to the artificial problem that includes $\hat x_5>0$, in which case the original problem was infeasible.

Note that in this example we added only one artificial variable, but it is possible that an artificial variable needs to be added for every constraint. Either way the method is the same: make sure the right-hand sides are non-negative, add the artificial variables, and keep iterating through simplex until the artificial variables are gone.

<h4>Choosing the entering basic variable</h4>

We may choose the entering basic variable to be any non-basic variable with a negative coefficient for $\c_B\B\inv\A - \c$. If there are multiple qualifying non-basic variables, a common rule-of-thumb is to select the variable whose coefficient has the largest absolute value. This is not guaranteed to be a _better_ choice than any of the others. But the thinking is, might as well try the variable that gives you the most bang for your buck as far as objective value change.

But what if there is a tie for the largest absolute value among negative coefficients? You can just pick arbitrarily. As we mentioned, simplex doesn't really care that the largest absolute value is selected anyway. So no special tie-breaking rule is required here.

<h4>Tie for the exiting basic variable</h4>
We determine the exiting variable based on _minimum ratio test_. But what if the minimum ratio is shared between multiple basic variables? Unlike in the case of the entering basic variable, there actually _is_ something to worry about in this case.

Let's recall what the minimum ratio test was calculating. In each row, we were determining how much we could increase the value of the entering variable before the corresponding basic variable becomes zero. A tie in the minimum ratio test would mean that multiple of the current basic variables would take on a value of 0 when the entering variable joins the basis. Thus in the next basic solution, at least one basic variable will have a value of 0. Such a BF solution is called a __degenerate__ solution, and the 0-valued basic variables are called degenerate variables.

Degeneracy can cause issues for the simplex method. In particular, if a degenerate basic variable is the exiting variable in a subsequent simplex iteration, then the entering variable cannot increase in value from zero without making the degenerate variable take a negative value. So even with the basis change, the solution stayed the same from one iteration to the next. Even worse, this could continue in a cycle such that simplex never stops iterating!

Luckily these looping conditions are exceedingly rare in practical problems. Furthermore, there are rules for selecting the exiting basic variable that are guaranteed to avoid this infinite looping scenario (see e.g. @simplexPivotNoLoops), though we won't cover them in this course.

<h4>No exiting basic variable</h4>

Recall that during the minimum ratio test for determining the exiting basic variable, we only consider ratios in the rows where the coefficient on the entering variable is strictly positive. This is because a 0 or negative coefficient would imply that the entering variable could be increased arbitrarily without violating either the corresponding constraint or non-negativity for the corresponding basic variable. If _every_ such coefficient were $\leq 0$, this would imply that the entire system remains feasible no matter how much the entering variable is increased.

Recall that we selected an entering variable whose inclusion would improve the objective value. But if the entering variable can be increased indefinitely, then also the objective can be increased indefinitely, so our problem is unbounded. So if at any point the simplex method comes to an iteration where the entering variable's coefficients are all $\leq0$, we terminate and declare the problem unbounded.

### The revised simplex method

We'll end this section on the simplex method with a note on the so-called __revised simplex method__. Recall that every iteration of the simplex method requires us to find $\B\inv$, the inverse of the columns of $\A$ corresponding to the basis variables. In practice, doing this inversion can be computationally expensive. But it is possible to cut down on the computation time by applying a nice trick to derive $\B\inv$ for the current iteration from the inverted matrix from the previous iteration. We won't bother with the details here, but you can read about it in @classText, section 5.4.