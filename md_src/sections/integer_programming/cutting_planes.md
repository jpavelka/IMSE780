## Cutting planes

We now turn our attention to cutting planes, another concept that is often used in conjunction with branch and bound in integer programming solvers.

### Cutting plane basics

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

Once again, the feasible region to the problem's LP relaxation is presented as the gray-shaded area, while the plotted points are the integer feasible solutions. Now suppose we were to re-formulate the problem, adding two new constraint like so:

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

Let's take a look at this new problem in the below plot. Using the "Toggle Plots" button allows you to switch back and forth between this new formulation +@eq:integerHullExample and +@eq:cuttingPlaneExample.

<div>
<script>
     bbExampleClickFunc = () => {
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
<button class='basicCenter' onClick='bbExampleClickFunc()' style='padding: 0.5rem'>Toggle Plots</button>
</div>

What do you see when comparing these plots? When moving from +@eq:cuttingPlaneExample to +@eq:integerHullExample the feasible region for the LP relaxation has shrunk. But notice that the set of feasible integer points has stayed exactly the same! In fact, +@eq:integerHullExample is in some sense the "tightest" formulation for an integer program with those points as its feasible solutions.

To properly describe what's going on here, we need a few definitions. Given two points $\x^1,\x^2\in\R^n$, a __convex combination__ of the two points is any point $\y$ of the form $\y = \lambda \x^1 + (1 - \lambda) \x^2$ for some $0\leq\lambda\leq1$. That definition may seem a little complicated, but it's really just saying that $\y$ falls on the line segment between $\x$ and $\y$.

Now let's extend that definition a bit. Given a collection of points $\x^1,\x^2,\dots,\x^m\in\R^n$ the __convex hull__ of these points is any point $\y$ of the form $\lambda_1\x^1+\lambda_2\x^2+\cdots+\lambda_m\x^m$ where $\sum_i\lambda_i=1$. Again, this seems a little complicated on first inspection, but the idea is pretty simple. For example take any three points $\x^1,\x^2,\x^3$ that don't lie on the same line. The convex hull of those tree points is any point inside the triangle that has $\x^1,\x^2$, and $\x^3$ as its corner points. Extending to larger sets $\x^1,\dots,\x^m$, the convex hull is the set of points with corners coming from $\x^1,\dots,\x^m$ and including anything "in the middle" of them.

Of particular importance to an integer program is the so-called _integer hull_ of the formulation. Given an IP, its __integer hull__ is the convex hull of all its integer feasible solutions. Looking back now to our previous plots, we can see that +@eq:integerHullExample actually defines the integer hull of +@eq:cuttingPlaneExample!

Why do we care about the integer hull? It is the convex hull of all the integer feasible solutions, so in particular all of the corner points are integer points. This means that if we have some IP and we do as we did in +@eq:integerHullExample and build a linear program whose feasible region is exactly the integer hull of the IP, then solving the IP becomes very easy. Why? Because <span class='thmRef' for='thm:cornerPointOpt'></span> told us that every linear program has an optimal corner point solution, and in particular the simplex method always returns a corner point solution. So running simplex on such a formulation is guaranteed to return an optimal integer point!

given a formulation that is not the integer hull, how could we go about finding it? cutting planes! the inequalities we added were cutting planes

### Tightening formulations