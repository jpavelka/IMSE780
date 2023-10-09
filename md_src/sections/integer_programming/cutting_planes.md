## Cutting planes

<div class='lectureVideoEmbed' video-id='45565f4e661842a7b84de225dd8ed0a01d' video-date='2023-10-09'>Branch and bound wrap up, begin cutting planes.</div>

We now turn our attention to cutting planes, another concept that is often used in conjunction with branch and bound in integer programming solvers.

### The integer hull {#sec:integerHull}

Consider again our first sample IP in the branch and bound section, whose formulation I've provided again below:

$$
\begin{align*}
\max && 10x_1 + 12x_2 & \\
\st  && x_1 + x_2 & \leq \ \ 5  \\
     && 2x_1 + 4x_2 & \leq 15 \\
     && x_1,x_2 & \in \ \ \I_+
\end{align*}
$$

{#eq:cuttingPlaneExample}

When plotted out, the result is:

<svg width=350 height=350 class="lpDraw" base="bbExample1"> Sorry, your browser does not support inline SVG.</svg>

Once again, the feasible region to the problem's LP relaxation is presented as the gray-shaded area, while the plotted points are the integer feasible solutions. Now suppose we were to re-formulate the problem, adding two new constraints like so:

$$
\begin{align*}
\max && 10x_1 + 12x_2 & \\
\st  && x_1 + x_2 & \leq \ \ 5  \\
     && 2x_1 + 4x_2 & \leq 15 \\
     && x_1 + 2x_2 & \leq 7 \\
     && x_2 & \leq 3 \\
     && x_1,x_2 & \in \ \ \I_+
\end{align*}
$$

{#eq:integerHullExample}

Let's take a look at this new problem in the below plot. Using the "Toggle Plots" button allows you to switch back and forth between this new formulation +@eq:integerHullExample and the previous one +@eq:cuttingPlaneExample.

<div>
<script>
     cpExampleClickFunc = () => {
          for (plotNum of [1, 2]){
               plotEl = document.getElementById('cutPlaneExamplePlot' + plotNum);
               plotEl.style.display = plotEl.style.display === 'none' ? 'block' : 'none';
          }
     }
</script>
<div id='cutPlaneExamplePlot1' style="display:block">
<svg width=350 height=350 class="lpDraw" base="bbExample1" altArgs='{"addConstraints": [[[1, 2, 7, "l"], [4.5, 1.25]],[[0, 1, 3, "l"], [3, 3.6]]]}'> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='cutPlaneExamplePlot2' style="display:none">
<svg width=350 height=350 class="lpDraw" base="bbExample1"> Sorry, your browser does not support inline SVG.</svg>
</div>
<button class='basicCenter' onClick='cpExampleClickFunc()' style='padding: 0.5rem'>Toggle Plots</button>
</div>

What do you see when comparing these plots? When moving from +@eq:cuttingPlaneExample to +@eq:integerHullExample the feasible region for the LP relaxation has shrunk. But notice that the set of feasible integer points has stayed exactly the same! In fact, +@eq:integerHullExample is in some sense the "tightest" formulation for an integer program with those points as its feasible solutions.

To properly describe what's going on here, we need a few definitions. Given two points $\x^1,\x^2\in\R^n$, a **convex combination** of the two points is any point $\y$ of the form $\y = \lambda \x^1 + (1 - \lambda) \x^2$ for some $0\leq\lambda\leq1$. That definition may seem a little complicated, but it's really just saying that $\y$ falls on the line segment between $\x$ and $\y$.

Now let's extend that definition a bit. Given a collection of points $\x^1,\x^2,\dots,\x^m\in\R^n$ the **convex hull** of these points is any point $\y$ of the form $\lambda_1\x^1+\lambda_2\x^2+\cdots+\lambda_m\x^m$ where $\sum_i\lambda_i=1$. Again, this seems a little complicated on first inspection, but the idea is pretty simple. For example take any three points $\x^1,\x^2,\x^3$ that don't lie on the same line. The convex hull of those three points is any point inside the triangle that has $\x^1,\x^2$, and $\x^3$ as its corner points. Extending to larger sets $\x^1,\dots,\x^m$, the convex hull is the set of points with corners coming from $\x^1,\dots,\x^m$ and including anything "in the middle" of them.

Of particular importance to an integer program is the so-called _integer hull_ of the formulation. Given an IP, its **integer hull** is the convex hull of all its integer feasible solutions. Looking back now to our previous plots, we can see that +@eq:integerHullExample actually defines the integer hull of +@eq:cuttingPlaneExample!

Why do we care about the integer hull? It is the convex hull of all the integer feasible solutions, so in particular all of the corner points are integer points. This means that if we have some set of linear inequalities (like in +@eq:integerHullExample) whose feasible region is exactly its integer hull, then solving the associated IP becomes very easy. Why? Because <span class='thmRef' for='thm:cornerPointOpt'></span> told us that every linear program has an optimal corner point solution, and in particular the simplex method always returns a corner point solution. So running simplex on such a formulation is guaranteed to return an optimal integer point!

### Network flows - IP for free!

Of course, when we need to model an integer program, we're usually not so lucky that our formulation just so happens to yield the problem's integer hull. But there are some classes of problems for which we _do_ know the formulation of the integer hull, turning a seemingly difficult integer programming problem into an easily-solved linear program.

The most famous such example is the **minimum cost network flow** problem, and the setup is this: You're given a directed graph (in the [graph theory](https://en.wikipedia.org/wiki/Graph_theory) sense) with vertices $1,2,\dots,n$ and edges $(i,j), i,j\in\{1,\dots,n\}$. You need to move some supply of items along this network. Each vertex $i$ has a demand $d_i$ (which can be negative, with negative demand being interpreted as a supply). An example network is displayed below, with the external edges entering a vertex representing a supply for the vertex, while and external edge leaving the vertex represents a demand.

![Network flow example [@wolsey2020]](images/network-flow.png)

Items may be transported through the network via the arcs, with each edge $(i,j)$ having a per-unit cost $c_{ij}$ associated with using it, as well as a capacity $h_{ij}$ giving the maximum amount of product that may be moved along the edge. The minimum cost network flow problem is a natural way to model an inventory distribution network, or even literal flows (say of oil through a pipeline).

To model this problem, we'll use variables $x_{ij}$ to denote the amount of each product to transport down each edge. Also, as a convenience, let denote by $V$ and $E$ the sets of vertices and edges, respectively. For any vertex $i$ let's denote by $V^+(i)$ the set of edges that _exit_ $i$ and by $V^-(i)$ the set of edges the _enter_ $i$ (so for the above example, we have $V^+(1)=\{2, 4\}$ and $V^-(1)=\{3, 5\}$). Then a model for this problem could look like:

$$
\begin{align*}
\min && \sum_{(i,j)\in E}c_{ij}x_{ij} & \\
\st  && \sum_{k\in V^-(i)}x_{ki} - \sum_{k\in V^+(i)}x_{ik} & = b_i && \forall\ i\in V \\
     && x_{ij} & \geq 0 && \forall\ (i,j) \in E \\
     && x_{ij} & \leq h_{ij} && \forall\ (i,j) \in E \\
\end{align*}
$$

{#eq:networkFlow}

Note that the first group of constraints just say that the net amount leaving each vertex has to be equal to the demand of the vertex. Also note that I did not specify that the $x_{ij}$ variables are required to be integers. There are two reasons for this: first, you could imagine a scenario (say, where $x_{ij}$ represents gallons of water flowing through a pipe) where you are ok with non-integer solutions. But the more fundamental reason is due to the following theorem (a proof to which is beyond the scope of the class):

<div class='theorem' id='thm:networkFlowInteger'>
If the demands $b_i$ and capacities $h_{ij}$ are all integral, then every corner-point solution to +@eq:networkFlow is integral.
</div>

In other words, the inequality system of +@eq:networkFlow describes its own integer hull. That's pretty remarkable, right? On the face of it, this problem doesn't appear (at least to me) to be any easier than any of the various $\NP$-complete problems we've seen in class. And yet if we use this formulation, we can use linear programming techniques to recover an optimal integer solution in polynomial time![^cornerPointNotFromSimplex] There are also several purpose-built algorithms for min-cost network flows that are known to run in polynomial time. The practical knowledge to take away from this - any time you can formulate a problem as a network flow, it is usually a good idea to do so!

[^cornerPointNotFromSimplex]: We know that the simplex method always returns a corner-point solution, but we also don't have a version of simplex that is guaranteed to run in polynomial time. But don't worry, we won't cover it but there are other ways to recover an optimal corner-point solution to an LP in polynomial time.

### Valid inequalities

Unfortunately, we're not always so lucky as we were with the network flow problem. Most IPs we formulate will not coincide with their integer hulls, meaning the LP relaxation is unlikely to give us an integer solution directly. But it turns out one can (eventually) recover a description of the integer hull from any IP via the addition of **cutting planes**, which are basically extra inequalities that are valid for the integer program but violate some of the non-integer region of the IP's LP relaxation.

A definition: An inequality $\bpi\x\leq\pi_0$ (for some vector $\bpi$ and number $\pi_0$) is a **valid inequality** for an IP if every integer feasible solution to the IP satisfies it. For example, in +@sec:integerHull we took the formulation +@eq:cuttingPlaneExample and added two valid inequalities $x_1 + 2x_2 \leq 7$ and $x_2 \leq 3$ to turn it into a new formulation +@eq:integerHullExample. We can tell the inequalities were valid from the subsequent plot, which we'll show again here:

<svg width=350 height=350 class="lpDraw" base="bbExample1" altArgs='{"addConstraints": [[[1, 2, 7, "l"], [4.5, 1.25]],[[0, 1, 3, "l"], [3, 3.6]]]}'> Sorry, your browser does not support inline SVG.</svg>

Neither of the added inequalities violate any of the _integer_ feasible points for the original formulation. They do violate some _non-integer_ feasible points for the original problem's LP relaxation, but this is a fine and in fact desirable thing for a cutting plane to do.

Let's now point out a few more valid inequalities for some IP formulations, taken from +@wolsey2020.

Suppose the constraint[^knapsackOneConstraint] for a $\{0,1\}$ knapsack problem is given by:

[^knapsackOneConstraint]: Remember, the natural IP formulation for the knapsack problem has only one constraint aside from setting the variables to be binary.

$$
3x_1 - 4x_2 + 2x_3 - 3x_4 + 5x_5 \leq -2.
$$

If $x_2=x_4=0$, then every remaining coefficient on the left-hand side of the constraint is positive. Since each variable is binary, it would then be impossible to get the left-hand side value $\leq -2$ as required. So the inequality $x_2 + x_4 \geq 1$ is valid.

Now, let's consider the following set of inequalities:

$$
\begin{align*}
y&\leq9999x \\
y&\geq0 \\
y&\leq5 \\
x&\in\{0,1\}
\end{align*}
$$

Due to the upper bound on $y$ and since $x$ is binary, the inequality $y\leq 5x$ is valid.

Lastly, lets consider an integer program with a single functional constraint:

$$
\begin{align*}
13x_1 + 20x_2 + 11x_3 + 6x_4 &\geq 72 \\
x_1,x_2,x_3,x_4 &\in\I_+
\end{align*}
$$

Let's divide both sides by 11, which will result in the (clearly valid) inequality:

$$
\frac{13}{11}x_1+\frac{20}{11}x_2+x_3+\frac{6}{11}x_4\geq 6\frac{6}{11}
$$

Since every $x_i$ has been constrained non-negative and the constraint is of $\geq$ type, we can increase coefficients on the left-hand side and still end up with a valid inequality. For example, the fact that $2x_1\geq\frac{13}{11}x_1$ combined with the above inequality means that the following is valid:

$$
2x_1+\frac{20}{11}x_2+x_3+\frac{6}{11}x_4\geq 6\frac{6}{11}
$$

Similarly, if we round up _all_ the coefficients on the left-hand side we will still have a valid (but slightly weaker) inequality that every (even non-integer) solution to the original problem will satisfy:

$$
2x_1+2x_2+x_3+x_4\geq 6\frac{6}{11}
$$

But we can do one more thing: Every integer solution with have all of the $x_i$ values integer, and since all the coefficients on the left-hand side of the latest inequality are integer, the _entire_ left-hand side will be an integer. So we can round up the right-hand side without violating any integer solutions to the original problem, hence:

$$
2x_1+2x_2+x_3+x_4\geq 7
$$

is a valid inequality for the original IP.

### A general procedure for generating cuts

By reasoning through the examples, hopefully you can see why each of the preceding inequalities were valid for their respective problems. But if we're looking for a general way to solve integer programs, this kind of ad-hoc searching is not going to take us very far. Although maybe there was something to that last one...

Suppose we have in integer program defined by some set of linear constraints. We know from linear algebra that multiplying inequalities by a constant will yield valid inequalities, as will adding inequalities together (assuming the inequalities have the same sign). Indeed, any sequence of those operations will yield a valid inequality for the original linear system.

Let's take an example. Suppose we have an integer program with the following set of constraints:

$$
\begin{align*}
7x_1 + 2x_2 &\leq 14 \\
x_2 &\leq 3 \\
2x_1 - 2x_2 &\leq 3 \\
x_1,x_2,x_3&\in\I_+
\end{align*}
$$

If we multiply the first inequality by $\frac{2}{7}$, the second by $\frac{37}{63}$, the third by $0$, and add the results together, we get:

$$
2x_1 + \frac{1}{63}x_2\leq\frac{121}{21}
$$

We know this is valid for the linear programming relaxation. From here, we can repeat the process of our previous example: Since it is a $\leq$ constraint and each $x_i$ is non-negative, we may round down the coefficients on the left-hand side to get:

$$
2x_1 \leq\frac{121}{21}
$$

Then, since everything on the left-hand side is integral, rounding down the right-hand side will leave us an inequality that is still valid for all of the IP's _integer_ solutions. So

$$
2x_1\leq5
$$

is valid for the integer program.

### The Chvátal–Gomory procedure

It will turn out that, from a theory perspective, the procedure from that preceding section is kind of all we need to know. Let's formalize what we did above by presenting the **Chvátal–Gomory (CG)** procedure for generating valid inequalities.

Let $P=\{x:Ax\leq b\}$, with $A$ an $m\times n$ matrix with columns $(a_1,a_2,\dots,a_n)$, be the set of feasible solutions to a system of linear inequalities, and let $u\in\R_+^m$ be a non-negative vector. Then the inequality

$$
\sum_{j=1}^n\floor{ua_j}x_j\leq\floor{ub}
$$

is called a **CG inequality** for $P$. Furthermore, this inequality is valid for the set of integer solutions to $P$ (due to the same reasoning we went through in the preceding section).

Basically, building a CG inequality consists of creating linear combinations of the constraints defining $P$, then rounding down each coefficient. The **CG procedure** is the process of generating GC inequalities and adding them to the formulation for $P$. From there, you could build new cutting planes by taking linear combinations of the newly-added inequalities, which could also be added to the formulation for $P$. And it turns out that you can generate _any_ valid inequality by repeating this procedure (though once again, the proof is beyond the scope of this course):

<div class='theorem' id='thm:CGFinite'>
Every valid inequality for $P$'s integer hull can be obtained by applying the CG procedure a finite number of times.
</div>

This is a neat result, but how practical is it? While any inequality can be generated with finitely many rounds of the CG procedure, that finite number can sometimes be (as you might have guessed) exponentially large in $n$ (the dimension of $P$). You may also require exponentially many of these inequalities to define the integer hull.

Furthermore, the definition isn't very prescriptive. Sure, there is some sequence of multiplier vectors $u$ that will yield any inequality that you want, but we don't have a very practical way of determining this sequence.

### Gomory's fractional cutting plane algorithm

With that final critique in mind, let's see if we can do a little better and define an actual algorithm for solving IPs with cutting planes. As per usual, we'll start by solving the LP relaxation to our IP of interest. If the solution is not integral, we'd like to be able to add an inequality that is valid for the IP but also removes the previous LP optimal solution. Let's take the following IP as an example:

$$
\begin{align*}
\max && 4x_1 -  x_2 \\
\st  && 7x_1 - 2x_2 & \leq 14 \\
     &&         x_2 & \leq 3 \\
     && 2x_1 - 2x_2 & \leq 3 \\
     &&  x_1,   x_2 &  \in \I
\end{align*}
$$

{#eq:gomoryExampleInequalities}

Let's add slack variables (which, since $x_1,x_2$ are integer and all the data is integer, will be integer at an optimal solution as well) and re-write the problem in matrix form suitable for the simplex method:

$$
\begin{bmatrix}
1 & 4 & -1 & 0 & 0 & 0 \\
0 & 7 & -2 & 1 & 0 & 0 \\
0 & 0 &  1 & 0 & 1 & 0 \\
0 & 2 & -2 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 14 \\ 3 \\ 3
\end{bmatrix}
$$

If we solve this with the simplex method, the system at the optimal basis would look like:

$$
\begin{bmatrix}
1 & 0 &  0 & -4/7 & -1/7 & 0 \\
0 & 1 &  0 &  1/7 &  2/7 & 0 \\
0 & 0 &  1 &    0 &    1 & 0 \\
0 & 0 &  0 & -2/7 & 10/7 & 1
\end{bmatrix}
\begin{bmatrix}
Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
\end{bmatrix}
=
\begin{bmatrix}
59/7 \\ 20/7 \\ 3 \\ 23/7
\end{bmatrix}
$$

We see that the optimal basic solution is not integral. How can we add a cut that will be feasible for the IP but eliminate this basic solution? Let's take a look at the second row of the matrix, where $x_1$ is basic with a fractional value. That equation

$$
x_1 + \frac{1}{7}x_3 + \frac{2}{7}x_4 = \frac{20}{7}
$$

{#eq:gomoryEx1}

is valid for the LP relaxation. We will continue to use the trick of rounding down coefficients to get new valid inequalities. Rounding down the left-hand side coefficients will give us an inequality that is valid for the LP relaxation:

$$
x_1 + 0x_3 + 0x_4 \leq \frac{20}{7}
$$

then (as before) since the entire left-hand side is integral, any integer solution to the IP will have to satisfy

$$
x_1 + 0x_3 + 0x_4 \leq 2
$$

or equivalently

$$
-x_1 \geq -2.
$$

{#eq:gomoryEx2}

So with +@eq:gomoryEx2 valid for the IP and +@eq:gomoryEx1 valid for the LP relaxation (and thus also the IP), adding them together yields the following inequality which must also be valid for the IP:

$$
\frac{1}{7}x_3 + \frac{2}{7}x_4 \geq \frac{6}{7}.
$$

Not only is this valid, it is also violated by the prior basic solution, since the only variables remaining on the left-hand side are non-basic and thus take a value of 0 at the basic solution. We can even verify this graphically. The first step will be to write the new inequality in terms of the original variables, which we know how to do since $x_3$ and $x_4$ are the slack variables for the first and second constraints, respectively, of +@eq:gomoryExampleInequalities. So we can substitute $x_3=14-7x_1+2x_2$ and $x_4=3-x_2$ and cancel out terms to see that the inequality is equivalent to $x_1\leq2$. Below, you can see the plot of the original LP +@eq:gomoryExampleInequalities with the new cut $x_1\leq2$ added. Hit the "Toggle Plots" button to see the original formulation with the LP optimal point included. Notice how the new valid inequality cuts away the old LP solution while leaving all the integer points intact.

<div>
<script>
     gomoryExampleClickFunc = () => {
          for (plotNum of [1, 2]){
               plotEl = document.getElementById('gomoryExamplePlot' + plotNum);
               plotEl.style.display = plotEl.style.display === 'none' ? 'block' : 'none';
          }
     }
</script>
<div id='gomoryExamplePlot1' style="display:block">
<svg width=350 height=350 class="lpDraw" base="gomoryExample1" altArgs='{"addConstraints": [[[1, 0, 2, "l"],[0.75, 4]]]}'> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='gomoryExamplePlot2' style="display:none">
<svg width=350 height=350 class="lpDraw" base="gomoryExample1" altArgs='{"extraPoints": [[2.85714285714, 3, {"fill": "blue", "r": 5}]], "extraText": [["LP optimal", 240, 100, {"font-size": "0.7rem"}]]}'> Sorry, your browser does not support inline SVG.</svg>
</div>
<button class='basicCenter' onClick='gomoryExampleClickFunc()' style='padding: 0.5rem'>Toggle Plots</button>
</div>

To continue solving, we can add this new inequality to the problem formulation and re-solve with simplex. If the optimal basis has a fractional variable, we can add a new constraint in the way we just did above. Then we continue on like this until solving simplex yields an integral basic solution.

The process we just outlined is called **Gomory's fractional cutting plane algorithm**. In general, the new inequalities are drawn from any row in the simplex system at the optimal basis with a fractional right-hand side value. We can write that row as

$$
x_{b} + \sum_{j\in N}a_jx_j = r
$$

where $N$ is the set of non-basic variables, and $b$ is the index of the basic variable in that row. Then the cut we add is given by:

$$
\sum_{j\in N}(a_j-\floor{a_j})x_j\geq r-\floor{r}
$$

Gomory's algorithm is guaranteed to terminate at an optimal solution in a finite number of steps. But once again, that finite number can still grow exponentially with respect to the size of the problem instance. In practice, it has not been found to be competitive with branch and bound.

### Branch and cut

So far it sounds like cutting planes are not the way forward for solving integer programs in practice. But that is not quite true. Even if no solver uses cutting plane algorithms exclusively to solve IPs, they still have a role to play. The state of the art in IP solvers is a style of algorithm known as **branch and cut**. We won't cover it any detail, but we have given the main ideas already. There is a branch and bound tree governing the search, but at various times during the algorithm cutting planes are derived and added to either the base problems or any of the sub-problems. Other techniques come into play as well, such as several pre-solve steps that take the original problem and attempt to reformulate it in some way to make it easier to solve, as well as running heuristics to find/improve integer feasible solutions.
