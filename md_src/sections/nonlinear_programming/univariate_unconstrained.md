## Single-variable unconstrained optimization {#sec:univariateUnconstrained}

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

<div class='lectureVideoEmbed' video-id='09799d31222943ccad1d47bf87fdf5b31d' video-date='2023-10-18'>HW 7 review, Bisection method, begin Newton's method.</div>

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

![Applying the bisection method on $f(x)=12x - 3x^4 - 2x^6$ [@classText]](images/bisection-example-table.png)

As another visual aid, consider the below plots that illustrate how $x'$ is updated from iteration to iteration. The bounds at the start of each iteration are shown are light red lines.

<div>
<script>
     bisectExClickFunc = (x) => {
          const plotNums = [1, 2, 3, 4, 5, 6, 7];
          for (plotNum of plotNums){
               plotEl = document.getElementById('bisectEx' + plotNum);
               if (plotEl.style.display === 'block') {
                    displayed = plotNum;
               }
          }
          newDisplayed = displayed + parseInt(x);
          newDisplayed = newDisplayed === (plotNums.length + 1) ? 1 : newDisplayed === 0 ? plotNums.length : newDisplayed;
          document.getElementById('bisectEx' + displayed).style.display = 'none';
          document.getElementById('bisectEx' + newDisplayed).style.display = 'block';
          document.getElementById('bisectExPlotLabel').textContent = 'Iteration ' + newDisplayed;
     }
</script>
<div id=bisectEx1 style='width:350px;height:350px;display:block' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[1, "eval", "blue", 5], [0.5, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}'></div>
<div id=bisectEx2 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.5, "eval", "blue", 5], [0.75, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["1"]'></div>
<div id=bisectEx3 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.75, "eval", "blue", 5], [0.875, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["1", "0.5"]'></div>
<div id=bisectEx4 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.875, "eval", "blue", 5], [0.8125, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["1", "0.75"]'></div>
<div id=bisectEx5 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.8125, "eval", "blue", 5], [0.84375, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["0.875", "0.75"]'></div>
<div id=bisectEx6 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.84375, "eval", "blue", 5], [0.828125, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["0.875", "0.8125"]'></div>
<div id=bisectEx7 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.828125, "eval", "blue", 5], [0.8359375, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["0.84375", "0.8125"]'></div>
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

### Newton's method {#sec:newton1d}

<div class='lectureVideoEmbed' video-id='3714e949db2d431b8223a68477279b601d' video-date='2023-10-20'>Finish Newton's method, begin gradient method.</div>

The bisection method is certainly a valid optimization algorithm and its simplicity makes it a good choice for an introduction to search procedures. But its main drawback is that it is relatively slow to converge. Recall that we started the algorithm with 0 and 2 as our lower and upper bounds and a trial solution of 1, so the distance from our trial solution to the true optimal solution was at most 1. Each iteration reduces the gap by a factor $\frac{1}{2}$, so to reduce it below our chosen tolerance of $\epsilon=0.01$ we are required to complete $\ceil{\log_2(1) - \log_2(0.01)}=7$ iterations of the algorithm.

Without another method to compare to, it is hard to say whether or not this is good. But we will find that our next method, known as **Newton's method**[^newtonsMethodNamedForIsaac], will usually converge in fewer iterations. A key to the quicker convergence is that Newton's method will use more information about the function than the bisection method did. Namely, instead of considering just (the sign of) the first derivative of $f$, Newton's method considers both first and second derivative information in determining the next trial solution.

[^newtonsMethodNamedForIsaac]: Yes, the method is named for Sir Isaac Newton, pioneer of calculus and gravitation.

The motivation for how the derivative information is used comes from the Taylor series you learned about in calculus class. Assuming that $f$ is infinitely differentiable, the **Taylor series** of $f$ at some number $a\in\R$ is given by:

$$
f(a) + \frac{f'(a)}{1!}(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \dots
$$

The nice thing about the Taylor series is that it gives us a way to approximate _any_ function by a polynomial, by evaluating at least the first few terms of the series. Indeed, for any $x$ that is "close to" $a$, the second-degree Taylor polynomial approximates the value of $f(x)$ quite well, i.e. we have

$$
f(x) \approx f(a) + \frac{f'(a)}{1!}(x - a) + \frac{f''(a)}{2!}(x - a)^2
$$

This is precisely what Newton's method uses to determine its next trial solution. Essentially, we will use the second-degree Taylor polynomial as a quadratic approximation to $f$ and quickly solve for $x$ that maximizes the approximation.

How do we do this? Recall that $a$ is just some real number (in our algorithm, it will be the current trial solution), so that $f(a), f'(a)$, and $f''(a)$ are just constants. So the polynomial is really just a quadratic function of $x$, for which can we can easily take a derivative and say

$$
f'(x)\approx f'(a) + f''(a)(x - a)
$$

If we set that right-hand side to 0 and solve for $x$, we end up with:

$$
x = a - \frac{f'(a)}{f''(a)}.
$$

We won't prove it, but it is true that since we've assumed $f$ is concave, it is also true that the second-degree Taylor polynomial is concave. So that critical point $a - \frac{f'(a)}{f''(a)}$ we just found is a global maximum for the polynomial. Since the polynomial is a good estimate for $f$ (at least when near $a$) we might as well take that value as our next trial solution.

This is precisely what we'll do in Newton's method. Let's use the notation $x_i$ for the trial solution in the $i$th iteration of the method. Then the trial solutions follow the relation:

$$
x_{i + 1} = x_i - \frac{f'(x_i)}{f''(x_i)}.
$$

We've determined how to update the trial solution, but how do we know when to stop? Two common stopping criteria are to stop either when two consecutive trial solutions are sufficiently close, i.e. $|x_{i + 1} - x_i|\leq\epsilon$ for some small $\epsilon>0$, or for the derivative at the trial solution to be sufficiently close to zero, i.e. $f'(x_i)<\epsilon$. For our presentation below, we'll adopt the first standard.

Lastly, how should we determine the first trial solution? It ultimately does not matter - one could just start at $x=0$ or anywhere else you like. If you can plot out the function to find a good initial spot, or otherwise have a good idea where the optimum might be, you can just go with that as well.

Bringing it all together, here are the steps for executing Newton's method:

- _Initialize_: Select error tolerance $\epsilon$. Set $i=1$ and choose initial trial solution $x_1$.
- _Iterate_:
  - Set $x_{i+1}=x_i - \frac{f'(x_i)}{f''(x_i)}$.
  - If $|x_{i+1}-x_i|\leq\epsilon$:
    - Terminate and return $x_{i+1}$ as optimal within tolerance.
  - Else:
    - Set $i=i+1$.

<h4>Example</h4>

Let's go ahead and run Newton's method on the same example from last section, $f(x)=12x - 3x^4 - 2x^6$. We'll start from the same initial trial solution $x_1=1$, and decrease the error tolerance to $\epsilon=0.00001$. From here, the only information we need to complete the first iteration is $f'(1)$ and $f''(1)$. We have

$$
f'(x) = 12 - 12x^3 - 12x^5 = 12(1 - x^3 - x^5)
$$

and

$$
f''(x) = -12(3x^2 + 5x^4)
$$

meaning that the next trial solution should be

$$
x_2 = x_1 - \frac{12(1 - x_1^3 - x_1^5)}{-12(3x_1^2 + 5x_1^4)} = 1 - \frac{1}{8} = \frac{7}{8}.
$$

Since $|x_2-x_1|>\epsilon$ we must continue with another iteration. The results of subsequent iterations are given in the following table:

![Applying Newton's method on $f(x)=12x - 3x^4 - 2x^6$ [@classText]](images/newton-example-table.png)

Since $|x_4-x_3|\leq\epsilon$ we terminate after iteration 4 with $0.83762$ as our optimal (within tolerance) solution.

Analogous to last section, here's a group of plots illustrating how the trial solution changes from iteration to iteration. There is one change though, this time in light red I've plotted the curve of the second-degree Taylor polynomial constructed from the trial solution. With this in place, you can see how the polynomial closely mirrors the original function near the trial solution, though it can deviate quite a bit when you get outside that nearby neighborhood.

<div>
<script>
     newtonExClickFunc = (x) => {
          const plotNums = [1, 2, 3, 4];
          for (plotNum of plotNums){
               plotEl = document.getElementById('newtonEx' + plotNum);
               if (plotEl.style.display === 'block') {
                    displayed = plotNum;
               }
          }
          newDisplayed = displayed + parseInt(x);
          newDisplayed = newDisplayed === (plotNums.length + 1) ? 1 : newDisplayed === 0 ? plotNums.length : newDisplayed;
          document.getElementById('newtonEx' + displayed).style.display = 'none';
          document.getElementById('newtonEx' + newDisplayed).style.display = 'block';
          document.getElementById('newtonExPlotLabel').textContent = 'Iteration ' + newDisplayed;
     }
</script>
<div id=newtonEx1 style='width:350px;height:350px;display:block' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[1, "eval", "blue", 5], [0.875, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["19 - 12x - 48(x - 1)^2"]'></div>
<div id=newtonEx2 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.875, "eval", "blue", 5], [0.84003, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["9.76358795166016 - 2.1939697265625x - 31.36669921875(x - 0.875)^2"]'></div>
<div id=newtonEx3 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.84003, "eval", "blue", 5], [0.83763, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["7.99521555948513 - 0.132649616478645x - 27.6399818649099(x - 0.84003)^2"]'></div>
<div id=newtonEx4 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.83763, "eval", "blue", 5], [0.83762, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["7.88441482712907 - 0.000560278242124437x - 27.3975201369267(x - 0.83763)^2"]'></div>
<div id='newtonExPlotLabel' style='text-align: center'>Iteration 1</div>
<div style='display: flex; justify-content: center'>
<button class='forwardBackwardButton' id='newtonExPlotBackButton' onClick='newtonExClickFunc("-1")'></button>
<button class='forwardBackwardButton' id='newtonExPlotForwardButton' onClick='newtonExClickFunc("1")'></button>
</div>
<script>
     document.getElementById('newtonExPlotBackButton').textContent = '<<';
     document.getElementById('newtonExPlotForwardButton').textContent = '>>';
</script>
</div>

It's only a single sample, but it's still pretty impressive to see the difference in convergence speed between Newton's method and the bisection method. It only took 4 iterations for Newton's method while bisection took 7 iterations, and that's even with the more forgiving error tolerance $\epsilon=0.01$ instead of $\epsilon=0.00001$. If we were to run the bisection method with the more stringent error tolerance we would have required $\ceil{\log_2(1) - \log_2(0.00001)}=17$ iterations!

### A helpful Python library

As you're working through these examples and any class assignments, you may find it useful to have some software you can use to check your work. In the following notebook, I'll show you how to use the Python library `sympy` to evaluate functions and take derivatives.

{colabGist:15gc-yndmSb7l7mYU6FXF6ZQuy2Hq7H79,0203322233ae66678390be9daed02ea8}
