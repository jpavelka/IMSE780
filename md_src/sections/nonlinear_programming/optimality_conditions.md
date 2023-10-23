## Optimality conditions

During our exploration of unconstrained optimization in the previous sections, we already knew some conditions for recognizing optimal solutions from your calculus classes. For example, for $x$ to be an optimizer for some function single-variable function $f$, we need $f'(x)=0$ (or $\nabla f(\x)=\zeros$ in the multivariate case). With further assumptions on the character of $f$ (e.g. convexity or concavity) we could go from necessary conditions to sufficient conditions.

These same conditions will not necessarily hold in the case of constrained optimization, however. Say we'd like to maximize $f(x)=-x^2$ but add the constraint $x\geq1$. Now the function's only critical point $x=0$ is no longer feasible, and the constrained optimizer $x=1$ does not satisfy $f'(x)=0$.

So clearly the conditions for optimal solutions are not the same when constraints are added. Luckily we _do_ know of similar conditions in the constrained case. They are not always practical for helping us _find_ an optimal solution directly, but they can at least provide a sanity check when verifying that a solution found by other means is indeed optimal. Further, we'll discuss how the theory can be used to build optimization algorithms that _are_ useful in practice.

### Lagrange multipliers

But before we get to the general optimality conditions, it will be helpful to recall a technique you may have seen in your calculus classes. For now, let's suppose our optimization problem has only equality constraints. That is, let $f$ be a function of $n$ variables that we'd like to optimize, while also satisfying the $m$ constraints:

$$
\begin{align*}
g_1(\x) &= b_1 \\
g_2(\x) &= b_2 \\
& \vdots \\
g_m(\x) &= b_m \\
\end{align*}
$$

One way to deal with this problem is the **method of Lagrange multipliers**. For this method, you construct the so-called **Lagrangian function** $h$, which is a function of both $\x\in\R^n$ and a new vector of variables $\boldsymbol\lambda\in\R^m$ (known as the **Lagrange multipliers**):

$$
h(\x,\boldsymbol\lambda) = f(\x) - \sum_{i=1}^m\lambda_i(g_i(x) - b_i)
$$

{#eq:lagrangainFunction}

Now $h$ is just an ordinary function of $n + m$ variables. If we wanted to optimize the unconstrained function $h$ we could determine its gradient and set it equal to zero. The resulting system of equations (writing the partial derivative first for the $\x$ variables then the $\boldsymbol\lambda$ variables) is:

$$
f'_{x_1}(\x)-\sum_{i=1}^m\lambda_ig'_{x_i}(\x) = 0\\
\vdots \\
f'_{x_n}(\x)-\sum_{i=1}^m\lambda_ig'_{x_n}(\x) = 0\\
b_1-g_1(\x) = 0\\
\vdots \\
b_m-g_m(\x) = 0\\
$$

The key thing to notice is that when this system is satisfied, by the final $m$ equations we have $g_i(\x)=b_i$ for all $i$, i.e. every critical point of $h$ must satisfy the constraints to the original problem! Furthermore, this implies that $h(\x,\boldsymbol\lambda)=f(\x)$ for every critical point of $h$, so if one of these points $(\x^*,\boldsymbol\lambda^*)$ is an optimizer for $h$ then $\x^*$ must be an optimizer for the constrained problem.

<h4>Example</h4>

Suppose that we'd like to optimize the function $f(x_1, x_2)=x_1^2+2x_2$ subject to the constraint $x_1^2+x_2^2=1$. Then the Lagrangian function $h$ (+@eq:lagrangainFunction) is given by:

$$
h(x_1,x_2,\lambda_1)=x_1^2+2x_2-\lambda_1(x_1^2+x_2^2-1).
$$

Setting the partial derivatives equal to zero leaves us with the system:

$$
\begin{align*}
2x_1 - 2\lambda_1x_1 & = 0 && \qquad(x_1\text{ partial derivative})\\
2 - 2\lambda_1x_2 & = 0 && \qquad(x_2\text{ partial derivative})\\
-(x_1^2 + x_2^2 - 1) & = 0 && \qquad(\lambda_1\text{ partial derivative})
\end{align*}
$$

Solving these systems is not always straightforward. But we can manage it here with a little logical reasoning. The first equation can only be satisfied by $\lambda = 1$ or $x_1=0$. So let's examine each of the possibilities in turn and see what they might imply for the other equations.

If $\lambda=1$, then the second equation would require $x_2=1$, and subsequently the third equation requires $x_1=0$. If $x_1=0$, then the third equation would require either $x_2=1$ or $x_2=-1$, and either of those solutions can be accommodated in the second equation with a properly chosen $\lambda$. So in terms of the original variables $x_1,x_2$, the potential optimal solutions are either $(0, 1)$ or $(0, -1)$.

### KKT conditions

The Lagrange multiplier method is a good lead-in to the general optimality conditions for nonlinear programming, known as the **Karush-Kuhn-Tucker conditions** (or **KKT conditions** for short)[^KandKT]. These extend the work in the previous section by including the case of inequality constraints. So for completeness, the (very general) form of the problems we'll be dealing with here is:

$$
\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall \ i\in\{1,\dots,m\} \\
     && \x & \in \R^n_+
\end{align*}
$$

[^KandKT]: The conditions were first broadly known as the Kuhn-Tucker conditions due to a 1951 paper by two mathematicians named Kuhn and Tucker. Later, someone noticed that Karush had developed the same theory a dozen years earlier in his Masters thesis!

Notice that we're now requiring non-negative variables $\x\in\R^n_+$, in contrast to the definition I gave at the start of the non-linear programming section.

As usual, we will assume that all of our functions $f, g_1, \dots, g_m$ are differentiable. Furthermore, for the following result to hold we need the functions to satisfy certain other so-called _regularity conditions_, though we will not be covering these conditions in this class. Suffice it to say, you can assume that the conditions hold for any problem I give you in this class.

With that out of the way, let's present the main result

<div class='theorem' id='thm:kktConditions'>
Assume $f,g_1,\dots,g_m$ are differentiable functions satisfying certain regularity conditions. Then $\x^*\in\R^n$ can be an optimal solution for the nonlinear program only if there exists $\mathbf{u}\in\R^m$ such that all the following conditions are satisfied:

1.  $\x^*\geq\zeros$
1.  $\mathbf{u}\geq\zeros$
1.  $g_i(\x^*) - b_i\leq 0 \quad \forall i\in\{1,2,...,m\}$
1.  If $u_i > 0$ then
    $$
        g_i(\x^*) - b_i = 0
    $$
    for all $i\in\{1,2,...,m\}$
1.  $f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*)\leq0 \quad \forall j\in\{1,2,\dots,n\}$
1.  If $x^*_j > 0$ then
    $$
    f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*) = 0 \quad
    $$
    for all $j\in\{1,2,\dots,n\}$
    </div>

There is a lot here, but some of this should look familiar. Items to note:

- Conditions 1 and 3 are simply the conditions for a feasible solution.
- We've seen the left-hand side of condition 5 when studying Lagrange multipliers in the previous section. It's what you get when you take the partial derivative of the Lagrangian function with respect to $x_j$ (with $u_i$ taking the place of our Lagrange multiplier $\lambda_i$). Previously we set it equal to zero to find candidate solutions, but here we have $\leq0$.
- Condition 2 seems natural when you consider the $u_i$ variables in the context of the Lagrangian method, where you use it to multiply the equations. Since the constraints are now inequalities, it makes sense to keep them non-negative to preserve the direction of the inequality.
- Condition 4 looks a little foreign, but we can draw an analogy between $u_i$ and the dual variables (+@sec:lpDuality) and shadow prices (+@sec:shadowPrices) of linear programming. There, if some resource was used up completely at the optimal solution (so the associated resource constraint has $\mathbf{a}_i\x^*=b_i$) then the corresponding shadow price for that resource (i.e. the dual variable associate with the constraint) had a positive value, since likely procuring more of it would improve the objective value.
- Condition 6 is... well, I don't have a simple intuition for that one.

I'll note again that these are _necessary_ conditions for an optimal solution, not _sufficient_ ones. So even if some $\x'$ satisfies these conditions, it does not necessarily mean that $\x'$ is an optimal solution. But there are conditions under which the above KKT conditions do guarantee optimality (maybe you can guess what they are...)

<div class='theorem' id='thm:kktConditionsConcaveConvex'>
Consider the setup of <span class='thmRef' for='thm:kktConditions'></span> and futher assume that $f$ is a concave function and that $g_1,g_2,\dots,g_m$ are each convex functions. Then $\x^*$ is an optimal solution for the nonlinear program if and only if the KKT conditions of <span class='thmRef' for='thm:kktConditions'></span> hold.
</div>

<h4>Example</h4>

Consider the following nonlinear program:

$$
\begin{align*}
\max && \ln(x_1 + 1) + x_2 \\
\st  && 2x_1 + x_2 & \leq 3 \\
     && x_1,x_2 & \geq0
\end{align*}
$$

($\ln$ denotes the natural logarithm). One can verify that the objective $f(x_1,x_2)=\ln(x_1 + 1) + x_2$ is concave and the lone constraint $g_1(x_1,x_2)=2x_1 + x_2$ is convex, so in this case the KKT conditions are both necessary and sufficient for optimality. Since there is only one constraint, there is only one corresponding multiplier $u_1$ to contend with. Let's list out all of the KKT requirements for the given problem:

1. Non-negativity of $\x$:
   $$
   x_1, x_2 \geq 0:
   $$
2. Non-negativity of $\mathbf{u}$:
   $$
   u_1 \geq 0
   $$
3. All constraints are satisfied. There is only one constraint, so this is just $g_1(x_1,x_2) - b_1 \leq 0$, i.e.
   $$
   2x_1 + x_2 - 3 \leq 0
   $$
4. If $u_1 > 0$ then $g_1(\x) - b_1 = 0$, which we can state equivalently as
   $$
   u_1(2x_1 + x_2 - 3) = 0
   $$
5. $f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*)\leq0$ for $j\in\{1,2\}$
   a. ($j=1$)
   $$
   \frac{1}{x_1 + 1} - 2u_1 \leq 0
   $$
   b. ($j=2$)
   $$
   1 - u_1 \leq 0
   $$
6. If $x^*_j > 0$ then $f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*) = 0$ for $j\in\{1,2\}$, which we can state equivalently as:
   a. ($j=1$)
   $$
   x_1\left(\frac{1}{x_1 + 1} - 2u_1\right) = 0
   $$
   b. ($j=2$)
   $$
   x_2(1 - u_1) = 0
   $$

Once again, there is not necessarily a good way to simultaneously solve for all the conditions in general. But we can reason our way to a solution in this case. Note:

- From 5b we know $u_1\geq 1$.
- From 1 we know $x_1\geq0$.
- Therefore, the $\frac{1}{x_1+1}$ term from 5a must be between 0 and 1, while the $-2u_1$ term is at most -2. Thus we have
  $$
  \frac{1}{x_1 + 1} - 2u_1 < 0
  $$
- So then by 6a we must have $x_1=0$.
- Since we already found $u_1\geq1$ from 5b, condition 4 tells us that
  $$
  2x_1 + x_2 - 3 = 0
  $$
- That equation (along with $x_1=0$) implies $x_2=3$.
- Since $x_2\neq0$, condition 6b implies $u_1=1$.

So the only solution that can simultaneously satisfy all the conditions is $x_1=0,x_2=3,u_1=1$. Indeed, if you plug those numbers into all of the conditions, you'll see that they are valid for all of them. Thus by <span class='thmRef' for='thm:kktConditionsConcaveConvex'></span>, $\x^*=(0, 3)$ is optimal for the problem.

### KKT and duality

While determining the KKT conditions is not usually directly applicable to solving nonlinear optimization problems, as a theoretical tool they are often used indirectly. One application is a generalized duality theory that exists for nonlinear programming. To wrap up this section, I'll quote a passage from @classText talking about nonlinear duality:

> [A theory of duality] has been developed for nonlinear programming to parallel the duality theory for linear programming presented in Chap. 6. In particular, for any given constrained maximization problem (call it the primal problem), the KKT conditions can be used to define a closely associated dual problem that is a constrained minimization problem. The variables in the dual problem consist of both the Lagrange multipliers $u_i$ $(i = 1, 2, . . . , m)$ and the primal variables $x_j$ $(j = 1, 2, . . . , n)$.
>
> In the special case where the primal problem is a linear programming problem, the $x_j$ variables drop out of the dual problem and it becomes the familiar dual problem of linear programming (where the $u_i$ variables here correspond to the $y_i$ variables in Chap. 6). When the primal problem is a convex programming problem, it is possible to establish relationships between the primal problem and the dual problem that are similar to those for linear programming. For example, the strong duality property of Sec. 6.1, which states that the optimal objective function values of the two problems are equal, also holds here. Furthermore, the values of the $u_i$ variables in an optimal solution for the dual problem can again be interpreted as shadow prices (see Secs. 4.7 and 6.2); i.e., they give the rate at which the optimal objective function value for the primal problem could be increased by (slightly) increasing the right-hand side of the corresponding constraint. Because duality theory for nonlinear programming is a relatively advanced topic, the interested reader is referred elsewhere for further information.
