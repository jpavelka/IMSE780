## Duality

In this section we'll discuss the important concept of LP duality. This neat bit of theory will allow us to prove the correctness of the simplex method, and open up avenues to potentially solve LPs faster in practice. We'll also see its fingerprints when discussing sensitivity analysis. But before we get there, let's start with some light fiction.

### The corporate takeover {#sec:corporateTakeover}

Suppose you really want to get into the glass manufacturing business. You figure that Wyndor Glass Co. (the company from +@sec:exampleLp, where we derived our sample LP +@eq:prototypeLp) might be willing to sell you time in their facilities. But you don't just want _some_ time, you have big plans and could really use _all_ their facility time for the next week. You decide to propose to buy their facility time at a cost of $y_i$ per hour in facility $i\in\{1, 2, 3\}$. How do you know what price to propose?

You know a little bit about linear programming now, so you decide to solve an LP to guide your decision. Naturally, you want to pay the least amount possible for their facility time. Since the facilities are open for 4, 12, and 18 hours per week respectively, your objective is to minimize $4y_1 + 12y_2 + 18y_3$.

But how do you know if Wyndor will accept your offer? At a minimum, you know that they won't accept anything less than \$3,000 for an hour at Plant 1 plus three hours at Plant 3. Why? You've done your homework. With that time Wyndor can produce a full batch of Product 1 at a profit of that same \$3,000 figure. Similarly, you'll need to at least \$5,000 for two hours each at Plant 2 and Plant 3, to account for their profit on batches of Product 2. And they certainly won't be _paying_ you to take their valuable facility time, so for each Plant $i$ you must have $y_i\geq 0$.

Brining it all together, you get this formulation:

$$
\begin{align*}
\min && 4y_1 + 12y_2 + 18y_3 & \\
\st  &&  y_1 +  3y_3 & \geq 3 \\
     && 2y_2 +  2y_3 & \geq 5 \\
     && y_1,y_2,y_3 & \geq 0
\end{align*}
$$

{#eq:prototypeLpDual}

You quickly throw together a Colab notebook to solve this problem. You know that Wyndor can make \$36,000 per week with their resources, so the difference between that and the optimal solution solution to this LP is pure profit for you. With visions of riches dancing through your head, you run the notebook and find the optimal objective value is ...

{colabGist:19SykiilWTXG6QHnaXAD_cstFJK7V3m-0,f5076b20215d0fb98009ba74b83bb930}

... that same \$36,000? What an odd coincidence.

### Defining the dual LP

Actually, this is no coincidence at all. It's simply a consequence of LP duality. For every LP, there is a second, associated LP that relates to it in a special way. We call the second LP the **dual** LP, and the original the **primal**. As it turns out, the problem +@eq:prototypeLpDual we just formulated is the dual problem of our original sample LP +@eq:prototypeLp.

Let's look a little closer at the relationship between +@eq:prototypeLp and +@eq:prototypeLpDual. To make things more obvious, let's write them out next to each other in matrix form. We'll also rearrange the order of the data and variable matrices in the dual problem:

<div class='mathSmall'>
$$
\begin{align*}
\max && \begin{bmatrix}3 & 5\end{bmatrix}\begin{bmatrix}x_1 \\ x_2\end{bmatrix} &
& \quad
\min && \begin{bmatrix}y_1 & y_2 & y_3\end{bmatrix}\begin{bmatrix}4 \\ 12 \\ 18\end{bmatrix} &
\\
\text{s.t.} && \begin{bmatrix}1 & 0 \\ 0 & 2 \\ 3 & 2\end{bmatrix}\begin{bmatrix}x_1 \\ x_2\end{bmatrix} & \leq \begin{bmatrix}4 \\ 12 \\ 18\end{bmatrix}
& \quad
\text{s.t.} && \begin{bmatrix}y_1 & y_2 & y_3\end{bmatrix}\begin{bmatrix}1 & 0 \\ 0 & 2 \\ 3 & 2\end{bmatrix} & \geq \begin{bmatrix}3 & 5\end{bmatrix}
\\
&& x_1,x_2 & \geq 0
& \quad
&& y_1,y_2,y_3 & \geq 0
\end{align*}
$$
</div>

Side-by-side like this, it's easy to see the connection. The constraint matrix didn't change at all, though we're pre-multiplying the variables in the dual as opposed to post-multiplying in the primal. Further, the constraint right-hand side values from the primal became the objective coefficients in the dual, and vice-versa. It's kinda like the whole problem fell on its side[^dualOnSide].

[^dualOnSide]:
    This "fell on its side" thing is easier to see if you post-multiply the dual variables instead:<div class='mathSmall'>$$
    \begin{align*}
    \min && \begin{bmatrix}4 & 12 & 18\end{bmatrix}\begin{bmatrix}y_1 \\ y_2 \\ y_3\end{bmatrix} & \\
    \text{s.t.} && \begin{bmatrix}1 & 0 & 3 \\ 0 & 2 & 2\end{bmatrix}\begin{bmatrix}y_1 \\ y_2 \\ y_3\end{bmatrix} & \geq \begin{bmatrix}3 \\ 5\end{bmatrix} \\
    && y_1,y_2,y_3 & \geq 0
    \end{align*}

    $$
    </div>
    $$

In general, the dual for the standard form LP is defined as follows:

$$
\begin{align*}
&\textbf{primal:} &&&&&&\quad\textbf{dual:}&&&\\
&\max && \c\x &
&&&\quad
\min && \y\b &
\\
&\text{s.t.} && \A\x\leq\b &
&&&\quad
\text{s.t.} && \y\A\geq\c &
\\
&&& \x\geq0 &
&&&\quad
&& \y\geq0 &
\end{align*}
$$

{#eq:standardLpDual}

But what if your problem is in a different form? Can we still talk about its dual in the same way? As you might have guessed, there is indeed a dual problem for your LP no matter how it is stated. The following gives another primal/dual pair (notice the lack of a non-negativity requirement for the dual variables):

$$
\begin{align*}
&\textbf{primal:} &&&&&&\quad\textbf{dual:}&&&\\
&\max && \c\x &
&&&\quad
\min && \y\b &
\\
&\text{s.t.} && \A\x=\b &
&&&\quad
\text{s.t.} && \y\A\geq\c &
\\
&&& \x\geq0 &
&&&\quad
&&&
\end{align*}
$$
{#eq:augmentedLpDual}

<div class='theorem' id='thm:dualEqualityForm'>
The systems in +@eq:augmentedLpDual give a valid primal/dual pair.
</div>
<div class='proof' for='thm:dualEqualityForm' placement='appendix'>
The concept for this proof is to transform the primal problem from +@eq:augmentedLpDual into inequality form so that we can use the definition of +@eq:standardLpDual to get the corresponding dual problem, then see what shakes out. To that end, let's use our trick from +@sec:lpConstraintTransform to convert to inequality constraints by replacing each $=$ constraint by one $\leq$ and one $\geq$ constraint:

$$
\begin{align*}
&\max && \c\x &
&&&\quad
\max && \c\x &
\\
&\text{s.t.} && \A\x=\b &
&& = \qquad&\quad
\text{s.t.} && \begin{bmatrix}\A\\-\A\end{bmatrix}\x\leq \begin{bmatrix}\b\\-\b\end{bmatrix} &
\\
&&& \x\geq0 &
&&&\quad
&& \x\geq0&
\end{align*}
$$

Now we can use +@eq:standardLpDual to find the dual. For reasons that will become clear later, we'll replace the usual $\y$ variable vector with two separate vectors $\mathbf{w}$ and $\mathbf{z}$, corresponding to the positive and negative constraint matrices.

$$
\begin{align*}
&\min && \begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\b\\-\b\end{bmatrix} &
\\
&\text{s.t.} && \begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\A\\-\A\end{bmatrix}\geq \c &
\\
&&& \mathbf{w},\mathbf{z}\geq0 &
\end{align*}
$$

Now, watch what happens when we multiply out the objective: $\begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\b\\-\b\end{bmatrix} = \mathbf{w}\b - \mathbf{z}\b$, and because of the distributive property of matrix multiplication, we have $\mathbf{w}\b - \mathbf{z}\b = (\mathbf{w}-\mathbf{z})\b$. Similar can be done with the constraints, giving:

$$
\begin{align*}
&\min && \begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\b\\-\b\end{bmatrix} &
&&&\quad
\min && (\mathbf{w}-\mathbf{z})\b &
\\
&\text{s.t.} && \begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\A\\-\A\end{bmatrix}\geq \c &
&& = \qquad&\quad
\text{s.t.} && (\mathbf{w}-\mathbf{z})\A\geq \c &
\\
&&& \mathbf{w},\mathbf{z}\geq0 &
&&&\quad
&& \mathbf{w},\mathbf{z}\geq0 &
\end{align*}
$$

Perhaps this looks familiar. This is exactly the trick we highlighted in +@sec:lpVariableBoundTransform for transforming between non-negative variables and unrestricted variables. We can consider $\mathbf{w}$ and $\mathbf{z}$ as the respective "positive" and "negative" parts of some other variable $\y$. Because $\mathbf{w}$ and $\mathbf{z}$ always appear together in the formulation as $\mathbf{w}-\mathbf{z}$, we can replace $\mathbf{w}-\mathbf{z}$ by the unrestricted $\y$ and get an equivalent formulation. So the dual turns into

$$
\begin{align*}
&\min && (\mathbf{w}-\mathbf{z})\b &
&&&\quad
\min && \y\b &
\\
&\text{s.t.} && (\mathbf{w}-\mathbf{z})\A\geq\c &
&& = \qquad&\quad
\text{s.t.} && \y\A\geq \c &
\\
&&& \mathbf{w},\mathbf{z}\geq0 &
&&&\quad
&& &
\end{align*}
$$

which is precisely the dual form from +@eq:augmentedLpDual.
</div>

### Properties of the dual LP

A nice fact about duality is that the primal-dual relationship is symmetric, i.e.

<div class='theorem' id='thm:dualOfDual'>

The dual of the dual problem is equivalent to the primal problem.

</div>
<div class='proof' for='thm:dualOfDual' placement='appendix'>

The steps required for his proof are encapsulated in the following diagram:

<div class='mathSmall'>
$$
\begin{align*}
&\min && \y\b &
&&&
\max && -\y\b &
\\
&\text{s.t.} && \y\A\leq\c &
&&\Rightarrow\qquad&
\text{s.t.} && -\y\A\geq-\c &
\\
&&& \y\geq0 &
&&(\times -1)\quad&
&& \y\geq0 &
\\
\\
&&&&&&&&&\Downarrow\text{(dual)}&\\
\\
&\max && \c\x &
&&&
\min && -\c\x &
\\
&\text{s.t.} && \A\x\geq\b &
&&\Leftarrow\qquad&
\text{s.t.} && -\A\x\leq-\b &
\\
&&& \x\geq0 &
&&(\times -1)\quad&
&& \x\geq0 &
\end{align*}
$$
</div>

The top-left problem is the dual of the standard form LP. We don't know how to take its dual correctly, so we should put it in the form of +@eq:standardFormLpMatrix since we know what that dual looks like (+@eq:standardLpDual). Using our tricks from +@sec:lpForms, we multiply the objective by -1 to convert from minimization to maximization, and we multiply both sides of the inequalities by $-\identity$ to change from $\geq$ constraints to $\leq$ constraints, obtaining the top-right problem.

We move from the top-right to the bottom-right simply by taking the dual from +@eq:standardLpDual. So we switch the objective function coefficients with the constraint right-hand side, change from maximization to minimization, and multiply the variables on the other side of the constraint matrix.

The move from bottom-right to bottom-left is the same as the move from top-left to top-right, i.e. multiplying the objective by -1 and the constraints by $-\identity$. What we end up with is precisely the original standard-form problem +@eq:standardFormLpMatrix.

</div>

The solutions to the primal and dual problems hold a special relationship too, in that the objective value from one always bounds the possible objective values for the other:

<div class='theorem' id='thm:weakDuality' display-name='weak duality'>

If $\x$ is a feasible solution for the primal problem and $\y$ is a feasible solution for the dual problem, then

$$
\c\x\leq\y\b.
$$

</div>

<div class='proof' for='thm:weakDuality'>
The proof for this is just some simple linear algebra. $\x$ being feasible for the primal problem means $\A\x\leq\b$. Pre-multiplying both sides by $\y$ will give us:
$$
\A\x\leq\b
\Leftrightarrow
\y\A\x\leq\y\b.
$$
Note the above wouldn't necessarily hold if some values of $\y$ were negative, but since $\y$ is feasible for the dual we must have $\y\geq0$, by definition of the dual problem.

Similarly, with $\y$ being feasible to the dual, we have $\y\A\geq\c$. Post-multiplying both sides by $\x$ (which similarly must be non-negative) gives:
$$
\y\A\geq\c
\Leftrightarrow
\y\A\x\geq\c\x.
$$

Combining the two resultant inequalities gives us what we need:
$$
\c\x\leq\y\A\x\leq\y\b.
$$
</div>

An immediate corollary[^whatIsACorollary] of <span class='thmRef' for='thm:weakDuality'></span> is the following:

[^whatIsACorollary]: A _corollary_ is like a theorem, and we could just as easily have called this a theorem as well. But generally we use the word corollary when the result follows almost directly from a result presented previously.

<div class='theorem' id='thm:dualSameValueThenOptimal' thm-type='corollary'>
If $\x$ is a solution to the primal problem and $\y$ is a solution to the dual problem such that $\c\x=\y\b$, then $\x$ and $\y$ are optimal solutions to the primal and dual problems, respectively.
</div>
<div class='proof' for='thm:dualSameValueThenOptimal'>
Since $\y$ is feasible for the dual problem, <span class='thmRef' for='thm:weakDuality'></span> tells us that no primal solution can have a value higher than $\y\b$. Then since $\c\x=\y\b$, $\x$ attains this highest possible value, thus it is optimal. A similar argument gives that $\y$ is optimal for the dual.
</div>

Among other things, <span class='thmRef' for='thm:weakDuality'></span> tells us that the problem +@eq:prototypeLpDual we formulated in +@sec:corporateTakeover had no hopes of attaining an objective value higher than the optimal for +@eq:prototypeLp. So 36 was the highest value we could have hoped for. And it turns out we were actually able to attain that value in the dual problem. Was this just luck? No, as it turns out, thanks to the following theorem.

<div class='theorem' id='thm:strongDuality' display-name='strong duality'>

If $\x^*$ is an optimal solution for the primal problem and $\y^*$ is an optimal solution for the dual problem, then

$$
\c\x^*=\y^*\b.
$$

</div>
<div class='proof' for='thm:strongDuality'>
For this proof we'll make use of the alternate primal/dual formulation of +@eq:augmentedLpDual and our knowledge of the simplex method. By assumption, the primal problem has an optimal solution $x^*$. Thus in the final simplex iteration the reduced costs are all non-negative. That is, for the optimal basis we have $\c_B\B\inv\A - \c\geq0$ (you may want to check +@eq:simplexMatrixGeneralized to refresh your memory on what the system of equations looks like for a given simplex basis).

Let's take the vector $\y$ defined as $\y=\c_B\B\inv$. Subbing that into the above inequality, we have
$$
\y\A - \c\geq0 \Leftrightarrow \y\A \geq\c
$$
which implies that $\y$ is a feasible solution for the dual. Furthermore, noting that $\x_B^*=\B\inv\b$ (by +@eq:basicVariableValues), we have
$$
\begin{align*}
\y\b &= \c_B\B\inv\b && \quad(\text{definition of }\y) \\
     &= \c_B\x^*_B && \quad(\text{above note}) \\
     &= \c\x^* && \quad(\x_N = \zeros) \\
\end{align*}
$$

So not only is $\y$ feasible for the dual, its objective value in the dual is equivalent to the objective value for $\x^*$ in the primal. So by <span class='thmRef' for='thm:dualSameValueThenOptimal'></span> $\y^*$ is an optimal solution for the dual, and $\x^*,\y^*$ satisfy the condition of the theorem.
</div>

### Simplex and the dual problem

Hold on a second - do you see what we did in that last proof? We proved the theorem, sure, but there's more. This proof was constructive, meaning that we didn't just prove that the primal and dual optimal values are equal, we showed how to find $\y^*$ from $\x^*$. Not only that, but we showed how to derive $\y^*$ _using the simplex method_! Simplex gives its own proof of optimality! All that time setting up the simplex method in +@sec:simplex we only gestured at why it works. But now we have the proof of correctness sitting right in front of us!

<div class='theorem' id='thm:simplexWorks' display-name='strong duality'>

Given a linear program with a bounded objective, the simplex method will terminate at an optimal solution. Moreover, an optimal solution to the dual problem may be retrieved from the optimal basis via $\c_B\B\inv$.

</div>
<div class='proof' for='thm:simplexWorks'>
We'll first note that technically we need to bypass the cycling issue from degenerate solutions discussed in +@sec:lpOtherConsiderations. But assuming that is taken care of, the simplex method terminates at some solution $\x^*$. Taking the associated basis and following the steps of the proof to <span class='thmRef' for='thm:strongDuality'></span>, we obtain a solution $\y^*=\c_B\B\inv$ such that $\y^*\b = \c\x^*$. Thus by <span class='thmRef' for='thm:dualSameValueThenOptimal'></span> $x^*$ and $y^*$ are both optimal for their respective problems.
</div>

Also implied by the proof of <span class='thmRef' for='thm:strongDuality'></span>: Taking $\y=\c_B\B\inv$ for the any basis gives us a solution $\y$ to the dual problem such that $\y^*\b = \c_B\x_B^*$. However, due to <span class='thmRef' for='thm:strongDuality'></span>, we know that no _feasible_ solution to $\y$ can have any value lower than the optimal $\c\x^*$. So the $\y$ generated is feasible if and only if the basis generating it is optimal for the primal problem.

We now know that the simplex method will generate optimal solutions for _both_ the primal problem _and_ the dual problem. This gives us an opportunity: what if for some reason we believe simplex will run faster on the dual problem than it would on the primal problem. As an example, the number of constraints in a problem is often related to the number of simplex iterations required to solve it. Since the constraints in the primal correspond directly to variables in the dual (and vice-versa) if you have a problem with many more constraints than variables, it stands to reason that simplex may solve the dual problem faster than the primal. Since simplex gives solutions to both the primal and dual problems (and the dual of the dual is the primal), running simplex on the dual may get us an optimal solution faster.

Another notion worth mentioning is the __dual simplex__ method. We will not discuss it in any detail here,[^textbookDualSimplex] but it is an algorithm applied to the primal problem whose steps look as if it were regular simplex being applied to the dual problem. It can be useful to have both methods (primal and dual simplex) available when solving an LP, and most solvers do exactly this.

[^textbookDualSimplex]: Interested readers can check @classText, section 8.1.

### Primal/dual feasibility/boundedness relationships

To wrap up the duality section, let's discuss how the feasibility and boundedness of the primal and dual problems relate to one another. The possibilities are summarized in the following result:

<div class='theorem' id='thm:primalDualRelations' display-name='strong duality'>

The following relationships always hold between the primal LP and its associated dual:

1. If the primal problem is feasible with a bounded objective, the so is the dual.
2. If the primal problem is feasible but with an unbounded objective, then the dual is infeasible.
3. If the primal problem is infeasible, then the dual has either no feasible solutions or an unbounded objective function.

</div>
<div class='proof' for='thm:primalDualRelations'>
Case 1 follows directly from <span class='thmRef' for='thm:simplexWorks'></span>. Case 2 is a corollary of weak duality (<span class='thmRef' for='thm:weakDuality'></span>), since the existence of a dual solution would immediately bound the primal objective.

Case 3 can be proven by contradiction using <span class='thmRef' for='thm:simplexWorks'></span> (and <span class='thmRef' for='thm:dualOfDual'></span>): Suppose that the dual is neither infeasible nor unbounded. Then it must be feasible with a bounded objective, which by <span class='thmRef' for='thm:simplexWorks'></span> means that applying simplex to this problem will yield an optimal, and therefore feasible, solution to the primal as well, a contradiction.
</div>
