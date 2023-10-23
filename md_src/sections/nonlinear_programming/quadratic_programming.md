## Quadratic programming

After spending the last few sections getting more and more general, we will now reverse that trend and talk about a very particular type of model called quadratic programming. This type of problem would arise in e.g. the portfolio optimization problem of +@sec:portfolioOptimization in the case that we're minimizing the amount of risk taken on for a given expected return.

Quadratic programs are nearly identical to linear programs except that now we allow for quadratic terms (i.e. $x_i^2$ or $x_ix_j$) in the objective function (but not the constraints). Written in matrix form, a **quadratic program** is an optimization problem of the form:

$$
\begin{align*}
\max && f(\x)=\c\x - \frac{1}{2}\x\T\Q\x & \\
\st  && \A\x & \leq\b \\
     && \x & \geq\zeros
\end{align*}
$$

{#eq:quadraticProgram}

(The superscript $\T$ denotes the transpose of a matrix.) For this class, we will require that the objective function be concave. By convention, the matrix $\Q$ should be symmetric, so that $q_{ij}$ (the entry of $\Q$ in its $i$th row and $j$th column) is the same as $q_{ji}$ ($j$th row and $i$th column).

Let's take a second to unpack that quadratic term $-\frac{1}{2}\x\T\Q\x$. Let's suppose that we have two variables in our problem. Then we'd have

$$
\begin{align*}
\x\T\Q\x &=
\begin{bmatrix}x_1 & x_2\end{bmatrix}
\begin{bmatrix}q_{11} & q_{12} \\ q_{21} & q_{22}\end{bmatrix}
\begin{bmatrix}x_1 \\ x_2\end{bmatrix}
\\&=
\begin{bmatrix}x_1 & x_2\end{bmatrix}
\begin{bmatrix}
q_{11}x_1 + q_{12}x_2 \\ q_{21}x_1 + q_{22}x_2
\end{bmatrix}
\\&=
q_{11}x_1^2 + q_{12}x_1x_2 + q_{21}x_2x_1 + q_{22}x_2^2
\end{align*}
$$

Since $q_{12}=q_{21}$, this could also be written as

$$
q_{11}x_1^2 + 2q_{12}x_1x_2 + q_{22}x_2^2.
$$

Then after we multiply by $-\frac{1}{2}$ we get:

$$
-\frac{1}{2}q_{11}x_1^2 - q_{12}x_1x_2 - \frac{1}{2}q_{22}x_2^2
$$

So to create the matrix $Q$, on the off-diagonal elements ($i$ and $j$ with $i\neq j$) we should have $-q_{ij}$ as the coefficient we want in front of the $x_ix_j$ term, while on the diagonal we'll have $-q_{ii}$ as double the coefficient we want on the $x_i^2$ term.

As an example, let's take the problem

$$
\begin{align*}
\max && 15x_1 + 30x_2 + 4x_1x_2 - 2x_1^2 - 4x2^2 \\
\st  && x_1 + 2x_2 &\leq 30 \\
     && x_1, x_2 &\geq 0
\end{align*}
$$

To put this in matrix form like +@eq:quadraticProgram, we need:

$$
\begin{align*}
&\x=\begin{bmatrix}x_1 \\ x_2\end{bmatrix}, \qquad \c=\begin{bmatrix}15 & 30\end{bmatrix}, \qquad \Q=\begin{bmatrix}4 & -4 \\ -4 & 8\end{bmatrix}, \\
&\A=\begin{bmatrix}1 & 2\end{bmatrix}, \qquad \b=\begin{bmatrix}30\end{bmatrix}
\end{align*}
$$

In this case, it is true that the objective is concave. A good way to verify concavity comes from linear algebra theory: the objective is concave if and only if $\Q$ is **positive semi-definite** (**PSD**), which means that $\x\T\Q\x\geq\zeros$ for _any_ $\x$. For this class, I'd use the following notebook to verify whether or not a matrix is PSD.

{colabGist:1Vv5iJYoxwPKDT3QhFBNBgKV_uGnpJ9-s,143dea2532ecffbc56b5557d22ce4197}

### KKT conditions for quadratic programming

When discussing KKT conditions in +@sec:optConditions, we mentioned how using the conditions directly for your problem will not always be useful, but sometimes examining the conditions for a class problems can lead you to an algorithm for that class. This will be the case for quadratic programming, as we'll soon see.

For a concrete example, let's take the sample quadratic program we just introduced above, and write out the conditions implied by <span class='thmRef' for='thm:kktConditions'></span>. Recall that the objective function for this problem is concave, thus by <span class='thmRef' for='thm:kktConditionsConcaveConvex'></span> these conditions are both necessary and sufficient for optimality:

1. $\quad x_1,x_2\geq 0$
2. $\quad u_1\geq 0$
3. $\quad x_1 + 2x_2 - 30 \leq 0$
4. $\quad u_1(x_1 + 2x_2 - 30) = 0$
5. a. $\quad 15 + 4x_2 - 4x_1 - u_1 \leq 0$
   b. $\quad 30 + 4x_1 - 8x_2 - 2u_1 \leq 0$
6. a. $\quad x_1(15 + 4x_2 - 4x_1 - u_1) = 0$
   b. $\quad x_2(30 + 4x_1 - 8x_2 - 2u_1) = 0$

We will now re-express these in a more convenient form (you will see why soon). Let's take the inequalities from conditions 3 and 5 and re-write them as equality constraints with non-negative slack variables:

$$
\begin{align*}
x_1 + 2x_2 + v_1 &= 30 \\
-4x_1 + 4x_2 - u_1 + y_1 &= -15 \\
4x_1 - 8x_2 - 2u_1 + y_2 &= -30 \\
\end{align*}
$$

These new slack variables will let us simplify some of the other conditions. Notice that this first new condition implies

$$
-v_1 = x_1 + 2x_2 - 30
$$

and so we may re-write condition 4 as

$$
u_1(-v_1) = 0
$$

and further, since $v_1=0\Leftrightarrow-v_1=$ we could instead write:

$$
u_1v_1 = 0
$$

Similarly, by rearranging for $y_1$ and $y_2$ we can replace condition 6 with:

$$
\begin{align*}
x_1y_1&=0\\
x_2y_2&=0
\end{align*}
$$

We call these pairs of variables $(x_1,y_1),(x_2,y_2),(u_1,v_1)$ **complementary variables** since only one of any pair may take a non-zero value. Furthermore, since each of the variables considered is non-negative, the set of conditions

$$
\begin{align*}
x_1y_1&=0\\
x_2y_2&=0\\
u_1v_1&=0
\end{align*}
$$

can be replaced by the single condition, so-called **complementarity constraint**:

$$
x_1y_1 + x_2y_2 + u_1v_1 = 0
$$

Bringing it all together, our revised KKT conditions are:

$$
\begin{align*}
x_1 + 2x_2 + v_1 &= 30 \\
-4x_1 + 4x_2 - u_1 + y_1 &= -15 \\
4x_1 - 8x_2 - 2u_1 + y_2 &= -30 \\
x_1y_1 + x_2y_2 + u_1v_1 &= 0 \\
x_1,x_2,y_1,y_2,u_1,v_1 &\geq 0
\end{align*}
$$

{#eq:quadraticKKTExample}

Notice that, with the exception of the complementarity constraint, these conditions are nothing but linear programming constraints!

More generally, for any quadratic programming problem, its KKT conditions can be modified in this manner and reduce to what amounts to a linear program, plus the single complementarity constraint:

$$
\begin{align*}
\Q\x + \A\T\mathbf{u} - \y &= \c\T \\
\A\x + \mathbf{v} = \b \\
\x,\y,\mathbf{u},\mathbf{v} \geq \zeros \\
\x\T\y + \mathbf{u}\T\mathbf{v} = 0
\end{align*}
$$

{#eq:quadraticKKT}

Recall that when the original objective $\c\x - \frac{1}{2}\x\T\Q\x$ is concave (and since all the constraints are linear and so also convex), due to <span class='thmRef' for='thm:kktConditionsConcaveConvex'></span> if there is some $\x,\y,\mathbf{u},\mathbf{v}$ that satisfies the KKT conditions then $\x$ must be an optimal solution for the quadratic program. So an algorithm that finds a _feasible_ solution to +@eq:quadraticKKT will also determine an _optimal_ solution for the quadratic program.

### Modified simplex method

As it turns out, since +@eq:quadraticKKT is _almost_ a set of linear programming constraints, we will be able to solve any quadratic program (with concave objective) via a slight modification to our dear old simplex method for linear programming.

But let's step back a bit. We said that we only need a feasible solution to +@eq:quadraticKKT in order to optimize the original quadratic problem. How hard can that be? We just added some slack variables, so can't we just use them as our initial basis and be done?

Actually, in general this will not work. Look back at +@eq:quadraticKKTExample. Those right-hand sides are negative, which means the basis $[y_1, y_2, v_1]$ isn't feasible. In fact, the right-hand side to these equations is defined by $-c$ (the cost coefficients in the objective's linear terms), which are unlikely to be $\leq0$ in a real application. So in most cases, using the slack variables as the a basis will not work.

But that's ok! We know how to deal with a system that doesn't have a convenient initial basis - the artificial variable method we learned back in +@sec:lpOtherConsiderations. So let's add artificial variables $z_j$ where necessary. In +@sec:lpOtherConsiderations we gave them some large negative objective coefficient $-M$ in order to make sure they would leave the basis if possible. But in this case, our objective function might as well have just been 0, since we're just looking for a feasible solution. So it will suffice to let the $z_j$ variables have an objective coefficient of -1, i.e. we will maximize $-\sum_jz_j$.

There's just one more thing to consider: how to deal with the complementarity constraint. In our modified simplex algorithm, we'll simply alter the selection of our entering variable so that we never choose a variable to enter the basis if its complementary variable is already a basic variables. Since the basic variables are the only ones with a value $>0$, making sure one of each complementary pair is non-basic suffices to satisfy the complementarity constraint.[^noGoodEnteringVariable]

[^noGoodEnteringVariable]: What happens if the only variables eligible to enter the basis are complementary with respect to another basic variable? In that case, it is possible that the problem is infeasible (though I'm not sure that _has_ to be the case... I need to read up on this a bit more.)

<h4>Example</h4>

We now have what we need to run the modified simplex algorithm on our sample problem. Recall that the problem was

$$
\begin{align*}
\max && 15x_1 + 30x_2 + 4x_1x_2 - 2x_1^2 - 4x2^2 \\
\st  && x_1 + 2x_2 &\leq 30 \\
     && x_1, x_2 &\geq 0
\end{align*}
$$

and by applying the KKT conditions and adding slack variables we reduced the above optimization problem to the problem of finding a feasible solution to:

$$
\begin{align*}
x_1 + 2x_2 + v_1 &= 30 \\
-4x_1 + 4x_2 - u_1 + y_1 &= -15 \\
4x_1 - 8x_2 - 2u_1 + y_2 &= -30 \\
x_1y_1 + x_2y_2 + u_1v_1 &= 0 \\
x_1,x_2,y_1,y_2,u_1,v_1 &\geq 0
\end{align*}
$$

Let's now do what we outlined below - add artificial variables $z_j$ as required to the above system and optimize the linear program that maximize $\sum_j -z_j$ with respect to all the above constraints except complementarity:

$$
\begin{align*}
\max && -z_1 - z_2 \\
\st  && 4x_1 - 4x_2 + u_1 - y_1 + z_1 & = 15 \\
     && -4x_1 + 8x_2 + 2u_1 - y_2 + z_2 & = 30 \\
     && x_1 + 2x_2 + v_1 &= 30 \\
     && x_1, x_2, y_1, y_2, z_1, z_2, u_1, v_1 \geq 0
\end{align*}
$$

Now let's write out the relevant matrix system:

$$
\begin{bmatrix}
1 &  0 &  0 & 0 &  0 &  0 & 0 & 1 & 1 \\
0 &  4 & -4 & 1 & -1 &  0 & 0 & 1 & 0 \\
0 & -4 &  8 & 2 &  0 & -1 & 0 & 0 & 1 \\
0 &  1 &  2 & 0 &  0 &  0 & 1 & 0 & 0
\end{bmatrix}
\begin{bmatrix}Z \\ x_1 \\ x_2 \\ u_1 \\ y_1 \\ y_2 \\ v_1 \\ z_1 \\ z_2\end{bmatrix}
= \begin{bmatrix}0 \\ 15 \\ 30 \\ 30\end{bmatrix}
$$

We'd like $z_1$ and $z_2$ to be part of our basis, so we'll need to eliminate the top row coefficients in their respective rows to obtain:

$$
\begin{bmatrix}
1 &  0 & -4 & -3 &  1 &  1 & 0 & 0 & 0 \\
0 &  4 & -4 &  1 & -1 &  0 & 0 & 1 & 0 \\
0 & -4 &  8 &  2 &  0 & -1 & 0 & 0 & 1 \\
0 &  1 &  2 &  0 &  0 &  0 & 1 & 0 & 0
\end{bmatrix}
\begin{bmatrix}Z \\ x_1 \\ x_2 \\ u_1 \\ y_1 \\ y_2 \\ v_1 \\ z_1 \\ z_2\end{bmatrix}
= \begin{bmatrix}-45 \\ 15 \\ 30 \\ 30\end{bmatrix}
$$

Now we're ready for simplex, with our basic variables being $z_1, z_2$ and $v_1$. Variables $x_2$ and $u_1$ have negative objective row coefficients, so ordinarily they would both be eligible for inclusion in the next basis. But in our modified simplex, we will not choose $u_1$ since its complementary variable $v_1$ is already in the basis. So our entering variable should be $x_2$, and by the usual ratio test we need to have $z_2$ exit the basis.

The following table shows how the simplex method would then progress to solve the problem[^zNegative]:

[^zNegative]: Don't be thrown off that the coefficient at the top of $Z$ column in the table is $-1$ vs. the one in my system being $1$. The book used a slightly different setup going from minimization to maximization.

![Applying the modified simplex method to an example quadratic programming problem [@classText]](images/modified-simplex-example.png)

As we see in the table, in the next iteration both $x_1$ and $u_1$ have negative coefficients in the objective row, but $v_1$ is still in the basis so we are not permitted to select $u_1$ by complementarity. But since $v_1$ exits at the same time $x_1$ enters, in the next iteration $u_1$ _is_ eligible to be added to the basis.
