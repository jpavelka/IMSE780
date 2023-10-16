## Single-variable unconstrained optimization

Let's now jump into our first class of nonlinear optimization problems. Naturally, we'll start with a simple case, and one you already know something about from your calculus class: optimizing a function $f(x)$ with a single variable and no constraints.

### Calculus review

Recall that for this course we're assuming $f$ to be differentiable everywhere. That being the case, a necessary condition for some $x'$ to be optimal for $f$ is that the derivative is equal to 0 at $x'$, i.e.:

$$
f'(x') = 0.
$$

These points $x'$ with $f'(x')=0$ are called the **critical points** of $f$. You probably remember this condition from calculus, but do you remember why it's necessary? Let's take a moment to recall the definition of a derivative:

$$
f'(x) = \lim_{h\rightarrow0}\frac{f(x + h) - f(x)}{h}.
$$

Suppose now that we'd like minimize some function $f$, and we know at some point $x'$ that $f'(x')<0$. Then by the above definition, there must be some $h>0$ such that

$$
\begin{align*}
\frac{f(x' + h) - f(x')}{h} < 0 &\Leftrightarrow f(x' + h) - f(x') < 0 \\
&\Leftrightarrow f(x' + h) < f(x')
\end{align*}
$$

and thus $x'$ cannot minimize $f$. Similar arguments hold for each combination of minimization/maximization and $f'(x')>0$ or $f'(x')<0$.

So $f'(x')=0$ is a necessary condition for $x'$ to be optimal, but as you'll recall it is not sufficient. A common example is the function $f(x)=x^3$ (plotted below), where we have $f'(0)=0$ but $x'=0$ is not any kind of maximum or minimum for the function. For any $h>0$, no matter how small, you'll have $f(h) > f(0)$ and $f(-h) < f(0)$.

<div style='width:350px;height:350px' class='plotlyFunctionPlot basicCenter' expression='x^3' xRange='[-1.5, 1.5]' extraPoints='[[0, 0]]'></div>

However, if $f$ has a second derivative there is more we can say. Suppose again we'd like to minimize $f$ and we have some point $x'$ such that $f'(x')=0$ and also $f''(x')>0$. By definition of the derivative, we have:

$$
f''(x')=\lim_{h\rightarrow0}\frac{f'(x' + h) - f'(x')}{h}
$$

Since $f'(x') = 0$, we simply have

$$
f''(x')=\lim_{h\rightarrow0}\frac{f'(x' + h)}{h}
$$

Since we've said that $f''(x') > 0$, we must have

$$
\frac{f'(x' + h)}{h} > 0
$$

for sufficiently small $h$[^sufficientlySmallNeighborhood]. When $h$ is sufficiently small and positive, we multiply each side by $h$ to see that

[^sufficientlySmallNeighborhood]: This is the usual trick when working with limits. When some condition is true in the limit, it just means that there is _some_ area (perhaps incredibly small) around the point of interest where the condition is always true.

$$
f'(x' + h) > 0
$$

i.e. $f$ is increasing in some small neighborhood to the right of $x'$. Similarly, if $h$ is sufficiently small and negative, multiplying by $h$ flips the sign and we get

$$
f'(x' + h) < 0
$$

i.e. $f$ is decreasing in the small neighborhood to the left of $x'$. Putting it all together (and staying within a sufficiently small neighborhood of $x'$), as we approach $x'$ from the left $f$ continues to decrease. Then we hit $x'$, and as we continue on to the right $f$ will start increasing. Thus $x'$ must be the minimum of $f$ within that neighborhood.

What we've described here is just the familiar _second derivative test_ from calculus. Namely, if $x'$ is a critical point of $f$ and $f''(x')>0$ then $x'$ is a **local minimum** of $f$. Similarly, if $f''(x')<0$ then $x'$ is a **local maximum** of $f$.

Of course, the difficulty is in the word _local_. Being a local optimum means that you are the optimal solution within some portion of $f$, but not necessarily optimal when looking at the entire domain of $f$. As an example, the function $f(x)=x^3 - x$ (plotted below) has a local maximum at $x=\frac{-1}{\sqrt{3}}$ and a local minimum at $x=\frac{1}{\sqrt{3}}$. But neither point is a true optimum. Indeed, there is no optimal value for this function at all, as the plot goes off to $\infty$ to the right and $-\infty$ to the left.

<div style='width:350px;height:350px' class='plotlyFunctionPlot basicCenter' expression='x^3 - x' xRange='[-1.5, 1.5]' extraPoints='[["1 / sqrt(3)", "eval"], ["-1 / sqrt(3)", "eval"]]'></div>

What we'd usually like to find is a **global minimum** (or **global maximum**) of the function, i.e. the point $x^*$ at which $f(x^*) \leq f(x)$ (or $f(x^*) \geq f(x)$ for a maximum) for _any_ $x$ in the domain of $f$. For an arbitrary function $f$ it can be difficult to ascertain whether a given local optimum is also globally optimal. But there are certain types of functions for which we can make this determination easily.

### Convexity and concavity

Nonlinear programming can be challenging. Tell an OR practitioner to solve a nonlinear optimization problem and they may get a little nervous. But if you tell them the objective function is convex, they'll breathe a sigh of relief. Convexity makes everything better in OR land.

A function of a single variable $f$ is said to be a **convex function** if, for each pair of values $x',x''$ and any $\lambda$ with $0<\lambda<1$, we have

$$
f(\lambda x'' + (1-\lambda)x')\leq \lambda f(x'') + (1 - \lambda)f(x')
$$

{#eq:convexDefinition1d}

If the $\leq$ can be replaced by a $<$, then the we say that function is a **strictly convex function**.

That is an admittedly symbol-heavy definition, so let's try to unpack it. On the left-hand side we've taken a combination of $x'$ and $x''$ then evaluated $f$ at that combination. On the right-hand side we evaluated $f$ at each point $x'$ and $x''$ and then taken a combination of those values. So the difference is only in the order in which we apply the function and the combination.

But it's easier to see on a plot, so let's look at some. Below, I've plotted three functions: $f(x)=x^2 - \frac{1}{2}$ on the left, $f(x)=x^3 - x$ in the middle, and $f(x)=-x^2 + \frac{1}{2}$ on the right. For each one let's consider $x'=-1$ and $x''=1$. The red dots represent the points $(x', f(x'))$ and $(x'', f(x''))$.

<div style='display:flex;justify-content:space-around'>
<div style='width:200px;height:200px' class='plotlyFunctionPlot' expression='x^2 - 0.5' xRange='[-1.5, 1.5]' extraPoints='[[-1, "eval", "red", 8], [1, "eval", "red", 8]]' lineBetweenPoints='true'></div>
<div style='width:200px;height:200px' class='plotlyFunctionPlot' expression='x^3 - x' xRange='[-1.5, 1.5]' extraPoints='[[-1, "eval", "red", 8], [1, "eval", "red", 8]]' lineBetweenPoints='true'></div>
<div style='width:200px;height:200px' class='plotlyFunctionPlot' expression='-x^2 + 0.5' xRange='[-1.5, 1.5]' extraPoints='[[-1, "eval", "red", 8], [1, "eval", "red", 8]]' lineBetweenPoints='true'></div>
</div>

For any $\lambda$, the right-hand side of +@eq:convexDefinition1d $\lambda f(x'') + (1 - \lambda)f(x')$ will equate to some point on the red line segment. Meanwhile, the left-hand $f(\lambda x'' + (1-\lambda)x')$ side refers to a value on the function curve in the same vertical line. Hence the +@eq:convexDefinition1d will be satisfied for every lambda exactly when the red line segment is always above the corresponding segment of the curve. Given this, the second and third of our plots clearly do not correspond to convex functions.

What about the first plot? Unfortunately we can't prove convexity with just one line segment. The definition stipulates that _any_ such line segment is always above the curve _no matter where you put the end points_. But I think you can imagine that this is true for the first plot. Indeed, the first function $f(x)=x^2 + \frac{1}{2}$ _is_ convex.

The appeal of working with convex functions is due to the following result:

<div class='theorem' id='thm:convexLocalOptIsGlobalOpt'>
Suppose $f$ is a convex function and $x^*$ is a local minimum for $f$. Then $x^*$ is also a global minimum for $f$.
</div>
<div class='proof' for='thm:convexLocalOptIsGlobalOpt' placement='appendix'>
For this proof we'll assume that $f$ is a function of a single variable, but you should know that both the definition for convexity and this theorem are still valid when $f$ is a multivariate function.

Since $x^*$ is a local minimum, there exists some number $p\in \R$ such that for any $y$ with $|x^* - y| < p$ (i.e. any point within a distance of $p$ from $x^*$) we have $f(y) \geq f(x^*)$. Our proof will go by contradiction, so for contradiction assume that $x^*$ is not a global minimum and hence there exists some $x'$ that satisfies $f(x') < f(x^*)$.

However, by the definition of convexity, for any $0<\lambda<1$ we have

$$
\begin{align*}
f(\lambda x' + (1-\lambda)x^*)&\leq\lambda f(x') + (1-\lambda)f(x^*) \\
&<\lambda f(x^*) + (1-\lambda)f(x^*) \\
&=f(x^*)
\end{align*}
$$

But if we choose $\lambda$ small enough then we will have $|x^*-(\lambda x' + (1-\lambda)x^*)|<p$, contradicting that $x^*$ was a local minimum.

</div>

Luckily, we do not need to go about drawing graphs and line segments whenever we want to prove convexity, so long as $f$ has a second derivative. If this is the case, then $f$ is convex if and only if $f''(x)\geq0$ for every $x$. Similarly, $f$ is strictly convex if and only if $f''(x)>0$ for every $x$. In your calculus class, you may have called this a "concave up" function. Geometrically, this is interpreted as a function that is always "curving upward", which meshes well with our "curve below the line segment" definition above.

Furthermore, as you might suspect, there is a similar notion for maximization problem, which we obtain by flipping all the related inequalities. This time, we use the term **concave function** for any function $f$ that satisfies

$$
f(\lambda x'' + (1-\lambda)x')\geq \lambda f(x'') + (1 - \lambda)f(x')
$$

If the above is satisfied when replacing $\geq$ with $>$ then we have a **strictly concave function**. This time the interpretation is flipped, so that the line segment must lie _below_ the the function plot, as in the third plot in our above figure. Functions with a second derivative are concave if and only if $f''(x)\leq 0$ for every $x$, with strictness achieved if $f''(x)<0$. This type of function is also described as being "concave down"[^concaveUpDownConfusing], and is characterized by its "curving downward" nature.

[^concaveUpDownConfusing]: Yes, I agree it's confusing that a concave function in our new sense only corresponds to a "concave down" function, while a "concave up" function is convex and not at all concave. Sorry.

Regardless if we're working on a minimization problem over a convex function or a maximization problem over a concave function, we know that once we've found a critical point we have what we're looking for (no need to worry about the point only being a local optimum).

### Analytical vs. numerical methods

At this point, it may seem that we've covered everything we need to know about minimizing/maximizing convex/concave functions of single variables. For example, the previous section tells us that in order to find the maximum of $f(x)=-x^2$ it suffices to show

$$
f'(x) = 0 \Leftrightarrow -2x = 0 \Leftrightarrow x=0
$$

This is true, but sometimes we are not so lucky that we can analytically solve for $f'(x)=0$ as we did here, and in fact it comes up often in practice that an analytical solution is not practical. This motivates the need for **numerical methods** for solving such problems. In the next few sections, we'll show examples of **search procedures** for finding the optimal points for univariate functions. In each case, the approach will be to find a sequence of **trial solutions**. Each iteration begins at the current trial solution, then via some systematic search leads to a new and improved trial solution. The procedure continues until the trial solutions have converged to an optimal solution, should one exist.

### Bisection method

Our first search procedure is the bisection method. While no one would suggest you implement this technique to solve problems in practice, it is a relatively intuitive algorithm that is great for learning the tenor of these search techniques in general. For what follows, we will assume that we are trying to maximize some concave function.

Actually, concavity is not strictly required for this method. Technically, using $x^*$ to denote the maximum of $f$, the only requirements for the method to work are:

$$
\begin{align*}
f'(x^*) & = 0 \\
f'(x) & > 0 & \forall \ x<x^* \\
f'(x) & < 0 & \forall \ x>x^*
\end{align*}
$$

Of course, concavity is the most natural condition for which these criteria hold.

As with most numerical optimization procedures, we will not be guaranteed to find the true optimal solution. Instead, before we begin we'll need to select our **error tolerance**, which is how close we'll need to get to an optimal solution before we decide our answer is "good enough" and we terminate the algorithm. We'll denote this term by $\epsilon$.

To begin the algorithm, we'll need to know both an upper bound and a lower bound on $x^*$. One could write out a principled algorithm for finding these bounds, but for the purposes of this class we'll just find these by inspection. We'll denote these upper and lower bounds as $\overline x$ and $\underline x$, respectively.

At each iteration, these upper and lower bounds will essentially give the edges of our search space, since we know by concavity that the optimal solution must be between them. The purpose of each iteration is to select our next trial solution $x'$ such that we can reduce the size of our search space at the next iteration. One could go about determining this next trial solution in several different ways, but our selection in the bisection method is (fittingly for the name) to select the midpoint between $\underline x$ and $\overline x$. So we set $x'=\frac{\underline x + \overline x}{2}$.

At this point, we may have gotten lucky and have $f'(x')=0$. In that case, we would have found the optimal solution (due to concavity of $f$). But otherwise we can use the sign of $f'(x')$ to tighten our bounds. In particular, if $f'(x')<0$ then we must have $x^*<x'$ and so $x'$ can be the upper bound in our next iteration. Otherwise, $f'(x')>0$ and so $x^*>x'$ and $x'$ is the lower bound in the next iteration.

Brining it all together, the bisection method works like this:

- _Initialize_: Select error tolerance $\epsilon$ and find initial bounds $\underline x$, $\overline x$ by inspection. Select the initial trial solution as $x'=\frac{\underline x + \overline x}{2}$.
- _Iterate_:
  - Evaluate (the sign of) $f'(x')$:
  - If $f'(x')\geq 0$:
    - Set $\underline x=x'$.
  - Else:
    - Set $\overline x=x'$.
  - Set $x'=\frac{\underline x + \overline x}{2}$.
  - If $\overline x - \underline x <= 2\epsilon$:
    - $x'$ must be within $\epsilon$ of $x^*$, so terminate and return $x'$ as optimal within tolerance.

<h4>Example</h4>

Let's run the bisection method now using the function $f(x) = 12x - 3x^4 - 2x^6$, which we've plotted below. We can verify that $f''(x) = - 36x^2 - 60 x^4$, and so $f''(x)\leq0$ for all $x$ meaning $f$ is concave and hence suitable for the method.

<div style='width:350px;height:350px' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[-0.22, 1.3]'></div>

We'll let $\epsilon = 0.01$, and by inspection we can find that $0$ and $2$ are respectively lower and upper bounds on the maximum. So for our first iteration we'll have $\underline x=0$, $\overline x=2$, and $x'=\frac{0 + 2}{2}=1$.

The following table illustrates the how the values of $\underline x, \overline x$, and $x'$ change as we iterate through the bisection method.

![Applying the bisection method [@classText]](images/bisection-example-table.png)

As another visual aid, consider the below plots that illustrate how $x'$ is updated from iteration to iteration.

<div>
<script>
     bisectExClickFunc = (x) => {
          for (plotNum of [1, 2, 3, 4, 5, 6, 7]){
               plotEl = document.getElementById('bisectEx' + plotNum);
               if (plotEl.style.display === 'block') {
                    displayed = plotNum;
               }
          }
          newDisplayed = displayed + parseInt(x);
          newDisplayed = newDisplayed === 8 ? 1 : newDisplayed === 0 ? 7 : newDisplayed;
          document.getElementById('bisectEx' + displayed).style.display = 'none';
          document.getElementById('bisectEx' + newDisplayed).style.display = 'block';
          document.getElementById('bisectExPlotLabel').textContent = 'Iteration ' + newDisplayed;
     }
</script>
<div id=bisectEx1 style='width:350px;height:350px;display:block' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[1, "eval", "blue", 5], [0.5, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id=bisectEx2 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.5, "eval", "blue", 5], [0.75, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id=bisectEx3 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.75, "eval", "blue", 5], [0.875, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id=bisectEx4 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.875, "eval", "blue", 5], [0.8125, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id=bisectEx5 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.8125, "eval", "blue", 5], [0.84375, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id=bisectEx6 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.84375, "eval", "blue", 5], [0.828125, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id=bisectEx7 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.828125, "eval", "blue", 5], [0.8359375, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true'></div>
<div id='bisectExPlotLabel' style='text-align: center'>Iteration 1</div>
<div style='display: flex; justify-content: center'>
<button class='forwardBackwardButton' id='bisectExPlotBackButton' onClick='bisectExClickFunc("-1")'></button>
<button class='forwardBackwardButton' id='bisectExPlotForwardButton' onClick='bisectExClickFunc("1")'></button>
</div>
<script>
     document.getElementById('bisectExPlotBackButton').textContent = '<<';
     document.getElementById('bisectExPlotForwardButton').textContent = '>>';
</script>
</div>

<!-- ### Newton's method -->
