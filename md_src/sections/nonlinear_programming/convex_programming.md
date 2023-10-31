## Convex programming

<div class='lectureVideoEmbed' video-id='c4de6679db674101b4b68274b3a096821d' video-date='2023-10-30'>Convex programming</div>

We'll now get a little more general again and explore a form of nonlinear programming called **convex programming**, which is an optimization problem of the form

$$
\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall \ i\in\{1,\dots,m\} \\
     && \x & \in \R^n_+
\end{align*}
$$

where the objective function $f$ is concave and the constraint functions $g_i$ are convex. The quadratic programs we studied in the previous section are a special type of convex program.

There are several general methods for solving convex programs. We will cover two of them here.

### SUMT

The first method we'll explore is a **sequential unconstrained minimization technique** (**SUMT**). As you might guess, instead of attacking the original problem directly, a SUMT will instead solve a _sequence_ of _unconstrained_ optimization problems related to the original, such that the sequence of solutions converges to a solution to the original problem.

In each iteration of the method, some scalar value $r$ is chosen and the following unconstrained optimization problem is solved:

$$
\max \quad P(\x, r) = f(\x) - rB(\x)
$$

The function $B$ should be selected to satisfy the following:

1. $B(\x)$ is small when $\x$ is far from the boundary of the original problem's feasible region.
2. $B(\x)$ is large when $\x$ is close to the boundary of the original problem's feasible region.
3. $B(\x)\rightarrow\infty$ as the distance to the boundary of the feasible region $\rightarrow 0$.

Such a function is known as a **barrier function**, and a common choice for $B(\x)$ is

$$
B(\x) = \sum_{i=1}^m\frac{1}{b_i - g_i(\x)} + \sum_{j=1}^n\frac{1}{x_j}
$$

Each term in this function becomes large when the denominator is small, and each denominator gives the distance from $\x$ to the edge of one of the problem's (functional or non-negativity) constraints. Thus by subtracting $rB(\x)$ from the original problem's objective value $f(\x)$, an optimization algorithm is dissuaded from crossing (or even touching) the boundary of the original problem's feasible region. It is also worth noting that with this selection of $B$, $P(\x, r)$ will also be concave.

But there is a potential problem - if the barrier function keeps us away from the boundary of the feasible region, how can we ever find an optimal solution that happens to lay _on_ the boundary? The answer is right in the name of the method: we do not solve just one of these unconstrained problems but rather a sequence of them. We decrease the value of $r$ from iteration to iteration so as to allow solutions closer and closer to the boundary (in practice, we will pick a multiplier $\theta<1$ such that at each iteration, $r$ is reset to the value $\theta r$). None of the individual problems will solve to a solution on the border, but potentially we can recognize if the sequence of solutions approaches a boundary solution.

How do we know when to stop iterating? Like we've done before, we'd like to continue until we know we're "close to" the optimal solution $\x^*$. Furthermore, one can show that if $\x'$ is an maximizer for $P(\x, r)$ then

$$
f(\x')\leq f(\x^*) \leq f(\x') + rB(\x')
$$

So $rB(\x')$ gives us a convenient bound on how far away each trial solution is from optimal. Thus one can select some small error tolerance $\epsilon > 0$ and stop once $rB(\x')<\epsilon$.

One final note - the presentation here assumes that all constraints are inequality constraints, so that there is an "interior" to the feasible region. One can alter the selection of $B(\x)$ to account for equality constraints, but we will not cover that here. With that out of the way, let's write out the algorithm:

- _Initialize_: Identify a feasible initial trial solution $\x^{(0)}$ that is not on the boundary of the feasible region. Set $k = 1$ and choose appropriate positive values for $r$, $\theta$ and $\epsilon$.
- _Iterate_:
  - Starting from $\x^{(k-1)}$, use a multi-variable unconstrained optimization procedure (like gradient search from +@sec:gradientSearch) to find a solution $\x^{(k)}$ that (approximately) maximizes $P(\x, r)=f(\x) - rB(\x)$.
  - If $rB(\x)<\epsilon$:
    - Stop with $\x^{(k)}$ as the (approximate) optimal solution.
  - Else:
    - Reset $k = k + 1$, $r = \theta r$ and continue iterating.

It is worth noting that instead of returning the final $\x^{(k)}$ as the optimal solution, you may decide to examine the sequence of trial solutions $\x^{(0)}, \x^{(1)}, \dots, \x^{(k)}$ and see if it seems to be converging to somewhere. Your textbook @classText includes an example where the sequence of trial solutions is given by $(1, 1)$, $(0.9, 1.36)$, $(0.987, 1.925)$, $(0.998, 1.993)$. This sequence appears to be converging on $(1, 2)$, which is indeed the optimal value for the problem[^noSUMTExample].

[^noSUMTExample]: We will not be stepping through an example here (and the book doesn't really either). The algorithm would use the gradient method as a sub-algorithm, which itself uses a single-variable optimization method as a sub-algorithm, and I felt like a full presentation would just be more confusing than it's worth. But I think the main idea isn't confusing at all, and wanted you all to know about it.

### Frank-Wolfe algorithm

In contrast to the sequential unconstrained method SUMT, our next method will instead sequentially solve constrained problems over a sequence of approximations to the real problem's objective function. In particular, the **Frank-Wolfe algorithm** is an algorithm for _linearly_ constrained convex programs, i.e. problems of the form:

$$
\begin{align*}
\max && f(\x) \\
\st  && \A\x&\leq\b \\
     &&   \x&\geq\zeros
\end{align*}
$$

where $f$ is a concave function.

The idea is to approximate this more difficult problem with a problem we already know how to solve. In particular, we'd like to approximate this as a linear program. Like usual, each iteration will begin with some trial solution $\x'$. We'd like to create an objective function that estimates $f$ decently in some neighborhood around $\x'$. This is something we've already done before: in Newton's method (+@sec:newton1d) we approximated the objective function at each trial solution via the second-degree Taylor polynomial. We'll do something similar here, except since we're trying to solve an approximate _linear_ program, we'll only be able to use the linear term from the Taylor polynomial. So the quantity to be maximized at each iteration is:

$$
\begin{align*}
&f(\x') + \nabla f(\x')(\x - \x') \\
=&f(\x') + \nabla f(\x')\x - \nabla f(\x')\x'
\end{align*}
$$

Furthermore, since $\x'$ is a known value, both the $f(\x')$ and $\nabla f(\x')\x'$ terms are just constants. Since they will never change, we can leave them out of the approximate objective altogether and maximize only over

$$
\nabla f(\x')\x
$$

So we maximize $\nabla f(\x')\x$[^thisIsALinearObjective] subject to $\A\x\leq\b,\x\geq\zeros$ using linear programming techniques, leading to some solution $\x_{\text{LP}}$. One could decide to use $\x_{\text{LP}}$ as the trial solution for the next iteration, but actually we'll add one more step - we'll instead use a single-variable optimization technique to find the point on the line between $\x'$ and $\x_{\text{LP}}$ that maximizes $f$ (analogous to how we determined $t^*$ in the iterations for the gradient method of +@sec:gradientSearch). We then continue this process like usual, stopping when the difference between successive trial solutions is small.

[^thisIsALinearObjective]: It's probably worth noting explicitly again that $\nabla f(\x')$ is nothing but a constant vector, so this does fit the usual form of a linear programming objective $\c\x$.

We now know everything we need to write out the algorithm:

- _Initialize_: Find an initial trial solution $\x^{(0)}$ (since the problem has linear constraints, you could do this by using LP techniques to find an initial basic feasible solution). Set $k=1$.
- _Iterate_:
  - Use LP techniques to find an optimal solution $\x_{\text{LP}}^{(k)}$ to the approximation linear program:
    $$
    \begin{align*}
    \max && \nabla f(\x^{(k-1)})\x \\
    \st  && \A\x&\leq\b \\
         &&   \x&\geq0
    \end{align*}
    $$
  - Use a single-variable optimization technique to find the point between $\x^{(k-1)}$ and $\x_{\text{LP}}^{(k)}$ that maximizes $f$. Let this point be $\x^{(k)}$
  - If $\x^{(k)}$ is sufficiently close to $\x^{(k-1)}$:
    - Stop with $\x^{(k)}$ as the (approximate) optimal solution.
  - Else:
    - Reset $k = k + 1$ and continue iterating.

<h4>Example</h4>

Consider the following example problem:

$$
\begin{align*}
\max && f(\x) = 5x_1 - x_1^2 + 8x_2 - 2x_2^2 \\
\st  && 3x_1 + 2x_2 &\leq 6 \\
     && x_1, x_2 &\geq 0
\end{align*}
$$

Let's set up the Frank-Wolfe method and run through one iteration. We'll initialize with trial solution $\x^{(0)}=(0,0)$ which is clearly feasible. The gradient of $f$ is:

$$
\nabla f(x_1, x_2) = (5 - 2x_1, 8 - 4x_2)
$$

and thus the gradient at the trial solution is given by $\nabla f(0, 0) = (5, 8)$. So the approximation LP is given by:

$$
\begin{align*}
\max && 5x_1 + 8x_2 \\
\st  && 3x_1 + 2x_2 &\leq 6 \\
     && x_1, x_2 &\geq 0
\end{align*}
$$

Using the LP techniques we learned in +@sec:lp we would find the optimal solution for this LP is $\x_{\text{LP}}^{(1)}=(0,3)$. That will not be our next trial solution, though. To find that, we want to find the point on the line segment between $\x^{(0)}$ and $\x_{\text{LP}}^{(1)}$ that maximizes $f$, i.e. we want to find the value $t$ that maximizes

$$
f((0, 0) + t((0, 3) - (0, 0))) = f(0, 3t) = 24t - 18t^2
$$

Taking the derivative with respect to $t$ and setting equal to zero, we get $t=\frac{2}{3}$. Thus the next trial solution will be

$$
\x^{(1)} = (0, 0) + \frac{2}{3}((0, 3) - (0, 0)) = (0, 2)
$$

We'll stop here, but the following image shows how the trial solutions would update should you continue iterating.

![Trial solutions from the Frank-Wolfe example problem [@classText]](images/frank-wolfe-example.png)
