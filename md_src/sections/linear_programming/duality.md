## Duality

In this section we'll discuss the important LP concept of duality. We have a lot of beautiful theory to get to, but first we'll motivate it will a short story.

### The corporate takeover {#sec:corporateTakeover}

Suppose you really want to get into the glass manufacturing business. You figure that Wyndor Glass Co. (the company from +@sec:exampleLp, where we derived our sample LP +@eq:prototypeLp) might be willing to sell you time in their facilities. But you don't just want _some_ time, you have big plans and could really use _all_ their facility time for the next week. You decide to propose to buy their facility time at a cost of $y_i$ per hour in facility $i\in\{1, 2, 3\}$. How do you know what price to propose?

You know a little bit about linear programming now, so you decide to solve an LP to make your decision. Naturally, you want to pay the least amount possible for their facility time. Since the facilities are open for 4, 12, and 18 hours per week respectively, your objective is to minimize $4y_1 + 12y_2 + 18y_3$.

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

You quickly throw together a Colab notebook to solve this problem. You know that Wyndor can make \$36,000 per week with their resources, so the difference between that and the optimal solution solution to you LP is pure profit for you. With visions of riches dancing through your head, you run the notebook and find the optimal objective value is ...

{colabGist:19SykiilWTXG6QHnaXAD_cstFJK7V3m-0,f5076b20215d0fb98009ba74b83bb930}

... that same \$36,000? What an odd coincidence.

### Defining the dual LP

Actually, this is no coincidence at all. It's simply a consequence of a neat bit of linear programming theory known as duality. For every LP, there is a second, associated LP that relates to it in a special way. We call the second LP the **dual** LP, and the original the **primal**. As it turns out, the problem +@eq:prototypeLpDual we just formulated is the dual problem of our original sample LP +@eq:prototypeLp.

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

Side-by-side like this, it's easy to see the connection. The constraint matrix didn't change at all, though we're pre-multiplying the variables in the dual as opposed to post-multiplying in the primal. Further, the right-hand side coefficients from the primal became the objective coefficients in the dual, and vice-versa. It's kinda like the whole problem fell on its side[^dualOnSide].

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

But what if your problem is in a different form? Can we still talk about its dual in the same way? As you might have guessed, there is indeed a dual problem for your LP no matter how it is stated. The following gives another primal/dual pair:

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

We move from the top-right to the bottom-right simply by taking the dual from +@eq:standardLpDual. So we switch objective function coefficient with constraint right-hand side, and multiply the variables on the other side of the constraint matrix.

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
For this proof we'll make use of the alternate primal/dual formulation of +@eq:augmentedLpDual and our knowledge of the simplex method. By assumption, the primal problem has an optimal solution $x^*$. Thus in the final simplex iteration the reduced costs are all non-negative. That is, for the optimal basis we have $\c_B\B\inv\A - \c\geq0$.

Let's take the vector $\y$ defined as $\y=\c_B\B\inv$. Subbing that into the above inequality, we have
$$
\y\A - \c\geq0 \Leftrightarrow \y\A \geq\c
$$
which implies that $\y$ is a feasible solution for the dual. Furthermore, we have
$$
\y\b = \c_B\B\inv\b=\c_B\x^*_B=\c\x^*.
$$

So not only is $\y$ feasible for the dual, its objective value in the dual is equivalent to the objective value for $\x$ in the primal.
</div>

### Simplex and the dual problem

Hold on a second - do you see what we did when proving that last theorem?

## Sensitivity analysis
