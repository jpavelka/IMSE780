## IP modeling

Hopefully the preceding section gave you some appreciation for why integrality constraints can be useful. The aim for this section is to give you a broader idea of what situations can be modeled with IPs. Of particular interest is the use of binary variables to encode different types of logic in our models.

### General integer variables

The most straightforward application if IPs is modeling an LP where the decision variables can't be fractional. For example, say you're building an optimization model to decide how many washing machines to buy for your fleet of laundromats. There is no way to meaningfully buy, say, half of a washing machine to deploy in your store. This is a case where integer-valued decisions are required.

As far as writing out the model, it is as simple as adding a $\x\in\I^n$ line to your formulation. For example, in the Wyndor Glass sample LP +@eq:prototypeLp say we can only make whole batches of each product. A new formulation would look like:
$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 \\
     && x_1,x_2 & \in \ \I_+
\end{align*}
$$
{#eq:wyndorIp}

We've seen in +@sec:ipRoundingNotEnough that the optimal solution can change quite a bit when moving from real-valued variables to integral ones, motivating the IP solution techniques we'll be exploring later.

### Some binary variable tricks

Finding solutions with general integer values is great. But in my opinion the real power in integer programming comes from using binary variables to encode new kinds of logic that you can't replicate in a linear program. In this section, we will explore some of these binary variable tricks. We'll consider +@eq:wyndorIp, our new integer version of the Wyndor glass problem, as a prototype for our examples.

<h4>Either/or constraints</h4>

For our first example, let's consider a scenario where exactly one out of two constraints needs to be satisfied, and we get to decide which one to enforce as part of the problem. For example, let's consider a modification to the Wyndor glass IP +@eq:wyndorIp where we have the potential to build a new facility to replace Plant 3. This new facility would be available for only 13 hours per week. However, due to updated technology, producing batches of each product will take less time: Product 1 will require 2 hours at the new Plant 3, while Product 2 will require only 1 hour. In effect, we'd like to replace the old Plant 3 constraint with something like:

$$
\begin{align*}
\text{either}&&3x_1 + 2x_2 \leq 18 \\
\text{or}    &&2x_1 + x_2 \leq 13
\end{align*}
$$

There is no "native" facility for this type of constraint in IP, we're still stuck with only linear functions of our decision variables. But we can implement this "either/or" logic by adding an auxiliary, binary variable $y$ to the problem in a certain fashion[^alternateMethodologies]. Consider the following IP:

[^alternateMethodologies]: Another way to approach this particular problem may be to just solve two different IPs, one with the first constraint and one with the second, then compare the resultant solutions. But it's not too hard to imagine a scenario where perhaps a new build is considered for each facility, and with enough facilities you wouldn't want to do a new model for each possible combination of new/old facilities.

$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 + My \\
     && 2x_1 + x_2 & \leq 13 + M(1 - y)\\
     && x_1,x_2 & \in \ \I_+ \\
     && y & \in \ \{0, 1\}
\end{align*}
$$

Here, $M$[^bigMAgain] is some sufficiently large constant (something like 100 would work in this case).

[^bigMAgain]: This is the second time we've seen $M$ represent some very large number - it's a recurring theme in OR.

What did we accomplish by adding $y$ and $M$ in this manner? First, let's notice that the new constraints are still linear functions of the variables. (Remember, $M$ is a constant and not a variable. If it helps, replace it in your mind with the number 100.) Now, think what it would mean if $y=1$. In that case, the constraint $3x_1 + 2x_2 \leq 18 + My$ becomes $3x_1 + 2x_2 \leq \textit{some very large number}$, so that any reasonable setting of the $\x$ variables will satisfy it. Meanwhile, the constraint $2x_1 + x_2 \leq 13 + M(1 - y)$ becomes just $2x_1 + x_2 \leq 13$.

So if we choose $y=1$, then only the constraint $2x_1 + x_2 \leq 13$ will matter. Similarly, if we set $y=0$, then the only constraint that matters is $3x_1 + 2x_2 \leq 18$. That means we've successfully recreated the either/or logic using linear constraints and binary variables!

<h4>Functions taking one of $n$ possible values</h4>

Sometimes the right-hand side of your linear constraints might be able to take one of several distinct values. As an example, let's say that Wyndor's Plant 3 may be open for additional hours at some extra cost. It may remain open for 3 extra hours at a cost of \$2,000, or it may remain open for 6 extra hours at a cost of \$4,500. How could +@eq:wyndorIp be modified to take this into account? Take a look at this formulation:

$$
\begin{align*}
\max && 3x_1 + 5x_2 - 2y_1 - 4.5y_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 + 3y_1 + 6y_2 \\
     && y_1 + y_2 & \leq \ \ 1 \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2 & \in \ \{0, 1\}
\end{align*}
$$

By constraining $y_1 + y_2 \leq 1$, we allow only $(y_1, y_2)\in\{(0, 0),(1, 0),(0, 1)\}$. If $(y_1,y_2)=(0,0)$ this would reduce back to the original problem. If $(y_1,y_2)=(1,0)$ then we'd have the situation where the plant is open for 3 extra hours, and we've reduced our profits by \$2,000 to account for the extra cost. Similarly, if $(y_1,y_2)=(0,1)$ then we'll have an extra 5 hours of use in the plant, but at the required cost of \$4,500.

<h4>Fixed-charge formulations</h4>

A common occurrence in OR problems is a so-called __fixed-charge problem__, where there is a one-time setup cost involved in participating in some activity. Suppose in the Wyndor problem that the three facilities did not exist yet, so they need to decide which facilities to build as well as the ultimate product mix. Say that in order to build any of the plants, they'd need to take out a loan that they plan to pay back with their weekly profits for the foreseeable future. If the weekly payback for any given facility is \$6,000, how can we model this with an integer program?

$$
\begin{align*}
\max && 3x_1 + 5x_2 - 6y_1 - 6y_2 -6y_3& \\
\st  && x_1 & \leq \ \ 4y_1  \\
     && 2x_2 & \leq 12y_2 \\
     && 3x_1 + 2x_2 & \leq 18y_3 \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2,y_3 & \in \{0, 1\}
\end{align*}
$$

<h4>Multiplying binary variables</h4>


<!-- class text, sec 12.3. either/or (example is 12.4 ex 1), functions with n possible values, fixed charge -->
<!-- multiplying binary variables -->
<!-- make up examples using wyndor as base -->

### Example word problems

<!-- class text, sec 12.4. -->

### Classes of problems

<!-- from wolsey 12.4 -->
<!-- set covering (final example from class text, 12.4 is this, can serve as transition points) -->
<!-- knapsack -->
<!-- tsp -->


