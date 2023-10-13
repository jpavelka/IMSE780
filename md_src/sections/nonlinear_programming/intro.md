# Nonlinear programming

We will now spend some time discussing the broad topic of nonlinear programming. This will mark a bit of a shift in the class, as up to this point our discussions have mostly been building upon previous topics. As we'll see, the functional forms we deal with for nonlinear programs break fairly distinctly from what we've already seen in the linear/integer programming domains.

Stated most generally, a **nonlinear programming** problem is an optimization problem of the form

$$
\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall i\in\{1,\dots,m\} \\
     && \x & \in \R^n
\end{align*}
$$

for some $n$ (the number of variables) and $m$ (number of constraints). In this class we will generally assume that $f$ and $g_i$ are differentiable (and sometimes twice differentiable) everywhere, but otherwise this is a fairly general formulation and solution techniques will vary depending on the specific character of the $f$ and $g_i$ functions.

## Example nonlinear programs

Turning away from the world of linear constraints and objectives, it is intuitively clear that the class of problems we can deal with now is much more broad. Here we give a few samples of where nonlinearities may naturally arise in optimization problems.

### Price elasticity

### Investment risk

## Convexity and concavity
