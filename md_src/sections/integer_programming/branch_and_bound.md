## Branch and bound

In this section, we'll cover the common IP solution technique of branch and bound. This is a powerful tool deployed in all IP solvers, but the ideas behind are very simple.

### Divide and Conquer {#sec:divideAndConquer}

Consider the following IP:

$$
\begin{align*}
\max && 10x_1 + 12x_2 & \\
\st  && x_1 + x_2 & \leq \ \ 5  \\
     && 2x_1 + 4x_2 & \leq 15 \\
     && x_1,x_2 & \in \ \ \I_+
\end{align*}
$$

We've plotted this problem below. As we've seen before, the plotted points are the feasible integer solutions, while the gray-shaded area corresponds to the feasible region of the problem's LP relaxation. We'd like to solve this problem, and while we don't know how to solve IPs yet, we _can_ solve the underlying LP relaxation. Furthermore, we know the following must hold[^whatIsAProposition]:

[^whatIsAProposition]: For the uninitiated, A _proposition_ is again like a theorem, and the below statement could have been called a theorem just a well. But we tend to use the work "proposition" instead when the result is a little more obvious.

<div class='theorem' id='thm:integerLpOptimalSolution' thm-type='proposition'>
Suppose $P$ is an integer program, and further suppose that $P$'s LP relaxation has an optimal solution $\x$ that is also integer. Then $\x$ is an optimal solution to $P$ as well.
</div>
The proof for this one is pretty simple, following easily from the fact that any feasible (integer) solutions to $P$ are also feasible for $P$'s LP relaxation.

So let's just use what we know, solve the LP relaxation, and maybe we can get lucky and the LP optimal solution will happen to be integer. Unfortunately, you can verify graphically that the optimal LP solution comes at $(x_1, x_2) = (2.5, 2.5)$ with an objective value of 55.

<svg width=350 height=350 class="lpDraw" base="bbExample1" altArgs='{"chooseObjVals": true}'> Sorry, your browser does not support inline SVG.</svg>

That didn't work to find us an integer solution, so what can we do? We still only know how to solve LPs, so we'd like to keep using that knowledge. Suppose we do the following: Let's create two different IPs by "branching" off our first IP. Let's call the original IP $P$ and the two new IPs $P^1$ and $P^2$. We'll keep the new problems identical to $P$ except with the addition of one new constraint each. Consider these two formulations:

$$
\begin{align*}
P^1: &&&                        &\quad  P^2: \\
\max && 10x_1 + 12x_2 &         &\quad  \max && 10x_1 + 12x_2 & \\
\st  && x_1 + x_2 & \leq \ \ 5  &\quad  \st  && x_1 + x_2 & \leq \ \ 5  \\
     && 2x_1 + 4x_2 & \leq 15   &\quad       && 2x_1 + 4x_2 & \leq 15 \\
     && x_1 & \leq \ \ 2        &\quad       && x_1 & \geq \ \ 3 \\
     && x_1,x_2 & \in \ \ \I_+  &\quad       && x_1,x_2 & \in \ \ \I_+
\end{align*}
$$

What have we done here? Let's look at the image below, where we've plotted the LP relaxations and feasible integer points for both $P^1$ and $P^2$. If you hit the "Toggle Plots" button, you can look back at the original problem $P$ and the optimal solution for that LP relaxation.

<div>
<script>
     bbExampleClickFunc = () => {
          for (plotNum of [1, 2]){
               plotEl = document.getElementById('bbExamplePlot' + plotNum);
               plotEl.style.display = plotEl.style.display === 'none' ? 'block' : 'none';
          }
     }
</script>
<div id='bbExamplePlot1' style="display:block">
<svg width=350 height=350 class="lpDraw" base="bbExample2"> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='bbExamplePlot2' style="display:none">
<svg width=350 height=350 class="lpDraw" base="bbExample1" altArgs='{"extraMathText": [["P", 130, 230]], "extraPoints": [[2.5, 2.5, {"fill": "blue", "r": 5}]], "extraText": [["LP optimal", 160, 190, {"font-size": "0.7rem"}]]}'> Sorry, your browser does not support inline SVG.</svg>
</div>
<button class='basicCenter' onClick='bbExampleClickFunc()' style='padding: 0.5rem'>Toggle Plots</button>
</div>

There are a few important items to note about this decomposition:

1.  All the integer feasible solutions for $P$ are also feasible for either $P^1$ or $P^2$.
2.  Conversely, any integer feasible solution for $P^1$ or $P^2$ is also feasible for $P$.
3.  The optimal solution to $P$'s LP relaxation is _not_ feasible for either $P^1$ or $P^2$.

The first two items imply that we're still dealing with the same set of integer feasible solutions when we go from $P$ to $P^1$ and $P^2$. From the third item, we know that we'll come up with a different solution if we solve either $P^1$ or $P^2$'s LP relaxation, so we have hope again that we can solve an LP and return an integer feasible solution. This action of splitting the initial problem into two (or more) sub-problems, while also satisfying the above three conditions, is known as **branching**. Importantly, we have the following result relating to sub-problems of $P$ that satisfy conditions 1 and 2:

<div class='theorem' id='thm:subproblemsContainOpt' thm-type='proposition'>
Suppose $P$, $P^1$, and $P^2$ are integer programs with identical objective functions satisfying conditions 1 and 2 from above. If $\x^1$, $\x^2$ are optimal solutions to $P^1$ and $P^2$ respectively, then at least one of $\x^1$ or $\x^2$ is optimal for $P$.
</div>
<div class='proof' for='thm:subproblemsContainOpt'>
Suppose for contradiction that neither $\x^1$ nor $\x^2$ are optimal for $P$. By condition 2 we know both $\x^1$ and $\x^2$ are feasible for $P$, so there must exist some $\x$ feasible for $P$ such that $\c\x > \c\x^1$ and $\c\x > \c\x^2$. But by condition 1 $\x$ must be feasible for $P^i$ for some $i$, and $\c\x > \c\x^i$ contradicts the optimality of $\x^i$ for $P^i$.
</div>

So by branching, we've reduced the process of solving $P$ (which didn't work for us directly) to solving $P^1$ and $P^2$.

### Dropping dead weight

Let's now go ahead and solve the LP relaxations of our two new sub-problems $P^1$ and $P^2$. You can quickly verify that the for $P^1$ the LP optimal solution is $(2, 2.75)$ with and objective value of 53, and for $P^2$ the LP optimal solution is $(3, 2)$ with an objective value of 54. And hey, would you look at that! The LP optimal solution to $P^2$ was integer, so by <span class='thmRef' for='thm:integerLpOptimalSolution'></span> it must $P^2$'s best integer solution as well!

So $P^2$ is now solved, but unfortunately $P^2$ was only half of our original problem $P$. When we subdivided $P$ we had no way of telling whether $P$'s optimal solution lay on the $P^1$ side or the $P^2$ side. So we need to return our attention to $P^1$. Its optimal solution was not integral, so we'll need to branch again and create two new sub-problems for the already-a-sub-problem problem $P^1$. Right?

Actually, let's think again about all the information we have. $P^2$ has an optimal integer solution with an objective value of 54, and by the construction of $P^2$ that same integer solution is feasible for $P$. Thus we have a **bound** on an optimal solution to $P$: it will have a value no lower than that same 54. We also know that the optimal solution to $P^1$'s LP relaxation was only 53, so in particular no integer solutions to $P^1$ can have a value better then 53. So whatever solution we'd get by eventually solving $P^1$, we know it won't have a better objective value than the integer solution we've already found for $P$ (via $P^2$).

All this to say, there is no need to actually solve $P^1$! The information we've already gained from the LP relaxation tells us that we can just ignore it now (a process that we will call **pruning** or **fathoming**), and the optimal solution to $P$ is also the optimal solution to $P^2$: $(x_1, x_2) = (3, 2)$ with an objective value of 54.

### Algorithm basics

The preceding sections displayed the essence of the branch and bound algorithm for solving integer programs. You initially solve the underlying LP relaxation. If the optimal solution $\x^*$ is not integer, you _branch_ by selecting some variable $x_i$ such that $x_i^*\not\in\I$, then creating two new IPs that are identical to the original, except to one problem you add a constraint $x_i\leq\floor{x^*_i}$ and to the other you add $x_i\geq\ceil{x^*_i}$[^newNotationFloorCeil]. These new problems are called the **child problems** of the original problem, and any subsequent children of the child problems are called **descendant problems**.

[^newNotationFloorCeil]: In case you haven't seen this notation before, $\floor{x}$ (said "floor of $x$") is value resulting from rounding $x$ _down_ to the closest integer, while $\ceil{x}$ ("ceiling of $x$") is the value resulting from rounding $x$ _up_ to the closest integer. For example, $\floor{1.3}=1$ and $\ceil{1.3}=2$.

You keep recursively branching and solving sub-problems, making use of the _bounding_ information available from the LP relaxations and any integer solutions you've already found. The optimal value of a problem's LP relaxation is an _upper bound_ on both its own optimal integer solution value and the values of its descendants. Any integer solutions found are a _lower bound_ on the original problem's optimal integer value. This bound information is used continually to decide which (if any) sub-problems cannot lead to an optimal solution for the original problem, and thus may be pruned.

### A branch and bound example {#sec:bnbExample}

Let's walk through a more involved branch and bound example (from @wolsey2020). It is a small example, but it will still highlight all the relevant decisions that need to be made, as well as make use of all possible node pruning criteria. Consider the following integer program, which we'll name $P$:

$$
\begin{align*}
\max && 4x_1 - x_2 & \\
\st  && 7x_1 - 2x_2 & \leq 14  \\
     && x_2 & \leq 3 \\
     && 2x_1 - 2x_2 & \leq 3 \\
     && x_1,x_2 & \in \ \I_+
\end{align*}
$$

Our first step is the solve the LP relaxation. Doing so leads to a non-integer optimal solution $(\frac{20}{7}, 3)$ with objective value $\frac{59}{7}$. Since this solution is not integral, we need to branch. While there are multiple ways one could create the branching sub-problems, for this class we'll be creating them as we did in +@sec:divideAndConquer: Considering the optimal LP relaxation solution $x^*$, choose a variable whose value is fractional then create two sub-problems by adding the constraint $x_i^*\leq\floor{x_i^*}$ to one problem and the constraint $x_i^*\geq\ceil{x_i^*}$ to the other. In this case, the only variable with a fractional value in the LP optimal solution is $x_1$[^bbMultipleFractional]. So our new problems are $P^1$, to which we add $x_1\leq2$, and $P^2$, to which we'll add $x_1\geq3$.

[^bbMultipleFractional]: If multiple variables had fractional values you could just select one of them arbitrarily and the algorithm will still work. We'll talk about other ways to choose between multiple fractional variables in +@sec:choosingBNBNodes.

As we continue to branch and add sub-problems, we'll find it convenient to have a graphic to reference to help us keep our place. The below image displays our **branch-and-bound tree** for the problem so far.

<svg width=450 height=210 class="bbTreeDraw" base="bbTree1"> Sorry, your browser does not support inline SVG.</svg>

In this graph, each node represents a sub-problem. The gray-colored nodes are sub-problems that have not yet been **explored**, meaning that we haven't attempted to solve the sub-problem yet. If we've already branched on a sub-problem, then its node in the tree is colored blue. Branches are represented by edges emanating down from the node, with the text next to the edge describing the inequality added to achieve each child problem.

If a node has already been explored, we display the sub-problem's optimal LP relaxation value next to it. Additionally, next to the root (top) node, we also keep track of the value of the best _integer_ solution found so far in the tree. This currently-best integer solution is known as the **incumbent** solution, and we'll see how its objective value can be used to prune nodes whose LP relaxation value is low. For now we haven't yet found any integer solutions, so we'll use the value $-\infty$.

At this point we've explored one node and created two new, unexplored nodes. We must now choose which unexplored node to examine next. We'll discuss later in +@sec:choosingBNBNodes how this selection might be made in practice, but ultimately the selection does not make a difference in the correctness of the algorithm[^nodeSelectionAffectsSolveTimes]. So let's arbitrarily select $P^1$.

[^nodeSelectionAffectsSolveTimes]: While algorithm correctness is not affected by the selection criteria, the number of nodes explored by the end of the algorithm, and thus ultimately algorithm run time, certainly can be.

Now we must solve the LP relaxation for $P^1$[^dualSimplexForOptimizingSubproblems]. Doing so gives us an optimal solution of $(2, \frac{1}{2})$ with an optimal value of $\frac{15}{2}$. Since the solution is not integer, and we have no global lower bound to compare against, we must now branch again. Since $x_2$ is the only fractional variable, we will branch on it to create new sub-problems $P^3$ and $P^4$.

[^dualSimplexForOptimizingSubproblems]: Note that the only difference between $P^1$'s LP relaxation and that of the problem $P$ we just solved is the addition of a single constraint. So instead of solving $P^1$'s LP relaxation from scratch, a well-written algorithm could use solution information from $P$ and use a re-optimization procedure as discussed in +@sec:lpReopt.

<svg width=450 height=330 class="bbTreeDraw" base="bbTree2"> Sorry, your browser does not support inline SVG.</svg>

Let's continue on. Say we select $P^2$ as the next sub-problem to explore. We attempt to solve its LP relaxation but instead find that the problem is infeasible. This implies that the optimal solution to $P$ does not lie on this branch, so we no longer need to explore it. In this case, we say that $P^2$ was **pruned by infeasibility**. In our graph, we'll color a node red if we prune it in this way. Hence our branch and bound tree now looks like:

<svg width=450 height=330 class="bbTreeDraw" base="bbTree3"> Sorry, your browser does not support inline SVG.</svg>

Let's make our next node selection. Say we arbitrarily choose $P^4$. The LP relaxation is solved and returns an optimal solution $(2, 1)$ with objective value $7$. Since the optimal solution is also an integer solution, we no longer need to explore this portion of the graph, and so we will prune $P^4$. The act of pruning a node after finding an integer solution is called **pruning by optimality**, but note that the word "optimality" here is local, as in we've found the optimal integer solution for $P^4$. We do not know yet if this integer solution is also optimal for $P$. Furthermore, since this is the first integer solution we've found, it's also the new incumbent solution for the problem.

Let's have the color purple represent a node that is pruned by optimality, and to further distinguish the node as having an integer optimal solution, we'll add an asterisk to the optimal relaxation value. Our latest version of the branch and bound tree looks like this:

<svg width=450 height=330 class="bbTreeDraw" base="bbTree4"> Sorry, your browser does not support inline SVG.</svg>

The only remaining unexplored node is $P^3$. If we solve its LP relaxation, we obtain a solution $(\frac{3}{2}, 0)$ with objective value $6$. Since the optimal LP value is 6, the best integer solution for $P^3$ is also no higher than 6. But since the incumbent solution has an objective value $7\geq 6$, we have no hope of finding an improved solution for $P$ in this portion of the tree. So instead of branching on a fractional variable, we immediately prune $P^3$. Pruning by this logic is termed **pruning by bound**. In our graph, we'll use the color orange for nodes pruned by bound.

Speaking of the graph, we have pruned every single node now with no remaining nodes to explore. You can see the final tree below, and can use the buttons under the plot to cycle through each iteration we completed.

<div>
<script>
     bbTreesClickFunc = (x) => {
          for (plotNum of [1, 2, 3, 4, 5]){
               plotEl = document.getElementById('bbTreePlot' + plotNum);
               if (plotEl.style.display === 'block') {
                    displayed = plotNum;
               }
          }
          newDisplayed = displayed + parseInt(x);
          newDisplayed = newDisplayed === 6 ? 1 : newDisplayed === 0 ? 5 : newDisplayed;
          document.getElementById('bbTreePlot' + displayed).style.display = 'none';
          document.getElementById('bbTreePlot' + newDisplayed).style.display = 'block';
          document.getElementById('bbTreePlotLabel').textContent = 'Iteration ' + newDisplayed;
     }
</script>
<div id='bbTreePlot5' style="display:block">
<svg width=450 height=330 class="bbTreeDraw" base="bbTree5"> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='bbTreePlot1' style="display:none">
<svg width=450 height=330 class="bbTreeDraw" base="bbTree1"> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='bbTreePlot2' style="display:none">
<svg width=450 height=330 class="bbTreeDraw" base="bbTree2"> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='bbTreePlot3' style="display:none">
<svg width=450 height=330 class="bbTreeDraw" base="bbTree3"> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='bbTreePlot4' style="display:none">
<svg width=450 height=330 class="bbTreeDraw" base="bbTree4"> Sorry, your browser does not support inline SVG.</svg>
</div>
<div id='bbTreePlotLabel' style='text-align: center'>Iteration 5</div>
<div style='display: flex; justify-content: center'>
<button class='forwardBackwardButton' id='bbTreePlotBackButton' onClick='bbTreesClickFunc("-1")'></button>
<button class='forwardBackwardButton' id='bbTreePlotForwardButton' onClick='bbTreesClickFunc("1")'></button>
</div>
<script>
     document.getElementById('bbTreePlotBackButton').textContent = '<<';
     document.getElementById('bbTreePlotForwardButton').textContent = '>>';
</script>
</div>

With no further portions of the tree to explore, the incumbent solution $(2, 1)$ from sub-problem $P^3$ must be our optimal solution.

### The branch and bound algorithm

Let's now write out a full treatment of the branch and bound algorithm. There are still several details missing from this treatment (e.g. selection of unexplored nodes, as discussed in +@sec:choosingBNBNodes), and there are definitely alterations and improvements that could be made. The purpose of this exercise is merely to lay out the bulk of a fully-functional algorithm.

The notation in what follows mostly mirrors what we've seen in our discussions above. We'll let $P=P^0$ denote the original IP to be solved. $x^*$ is the current incumbent solution (i.e. the best-known integer solution). The bound and $\underline Z$ is the best-known lower bound on the optimal solution value for $P$ (i.e. the value of the incumbent solution), while $\overline Z^i$ is the optimal value of the LP relaxation of some sub-problem $P^i$. We'll let $L$ represent the list of unexplored sub-problems. The act of pruning a sub-problem includes removing it (and any of its descendants) from $L$.

- _Initialize_: Set $\underline Z=-\infty$, $L=[P^0]$, and $x^*$ undefined.
- _Iterate_:
  - If $L$ is not empty:
    - Select some sub-problem $P^i$ in $L$.
    - Solve LP relaxation of $P^i$ to obtain optimal solution $x^i$. Set $\overline Z^i$ to optimal value (or $-\infty$ if infeasible).
    - If $\overline Z^i=-\infty$:
      - Prune $P^i$ by infeasibility.
    - Else if $\overline Z^i\leq\underline Z$:
      - Prune $P^i$ by bound.
    - Else if $x^i$ is integer:
      - Update $\underline Z=\overline Z^i$ and $x^*=x^i$. Prune $P^i$ by optimality.
    - Else:
      - Branch on a fractional value in $x^i$ and add the two new sub-problems to $L$.
  - Else:
    - If $x^*$ is undefined, $P$ is infeasible.
    - Else, return $x^*$ as optimal solution.

### Next nodes and branching variables {#sec:choosingBNBNodes}

While working through our branch and bound examples, there were two places where we had to make decisions on how to proceed:

- When an LP relaxation solution is fractional, which variable do we select to create the next branching sub-problems?
- When we've finished processing a node in the branch and bound tree, which node do we select to process next?

In each case, we made our decision arbitrarily among the available options. In this section we will talk about some strategies used in practice and arguments for using them.

<h4>Choosing the branching variable</h4>

When a sub-problem's LP relaxation solution has fractional components, we must choose one of the fractional variables to branch on. One common tactic is to select the variable that is "most fractional", i.e. the variable whose fractional part (i.e. $x_i - \floor{x_i}$) in the LP relaxation solution is closest to $\frac{1}{2}$. The justification for this selection is that values closer to integer values are perhaps more likely to take the value they are closest to in an optimal solution, while values whose integer parts are close to $\frac{1}{2}$ could go either way. But this is really just a rule of thumb. The logic behind that justification is not guaranteed to hold true, and selecting variables in this way will not necessarily lead to faster algorithm run times.

Another technique, which we will not cover in detail here, is called **strong branching**. The idea is to take each fractional-valued variable and see how much the LP relaxation's objective will change if $x_i$ is rounded down versus if $x_i$ is rounded up. The idea is that choosing a branching variable that induces larger variations in bounds is more likely to lead to quicker pruning, and thus help to minimize the size of the branch and bound tree. The downside is that this determination requires solving (or at least running several simplex iterations on) a different LP for each fractional variable, which can take significant amounts of time. Most solvers will use some strong branching, but only apply it selectively when they think the extra work up front will be rewarded by significantly smaller search trees later.

<h4>Choosing the next sub-problem</h4>

If you've just finished processing some node in your branch and bound tree, and there are multiple unexplored nodes still in the tree, how do you choose which node to move to next? Two common approaches are the **depth-first** strategy and the **best node** strategy.

In a depth-first strategy, you continually work on children of the last completed node until an integer solution is found. The hope is that this strategy has the best chance to quickly lead you to an integer feasible solution, and thus you'll be able to start pruning other nodes with this bound. It may also potentially make the sub-problems easier to solve, since moving from one node to another involves only adding a single constraint at each point. You would have just computed the previous optimal basis at the last node, so re-optimization may be faster. A tree developed while executing a depth-first strategy might look like this:

<svg width=650 height=380 class="bbTreeDraw" base="depthFirstTree"> Sorry, your browser does not support inline SVG.</svg>

In a best node strategy, you select the unexplored node with the highest upper bound, i.e. the a node whose parent had the highest LP relaxation value. Taking the following tree as an example, we would select one of $P^5$ or $P^6$ before $P^3$ or $P^4$ because the LP relaxation value for $P^2$ is higher than the LP relaxation value for $P^3$.

<svg width=450 height=330 class="bbTreeDraw" base="bestNodeTree"> Sorry, your browser does not support inline SVG.</svg>

The intuition here is to stay in the area of the tree with the best chance of having good integer feasible solutions. For the above tree (and using the bound information we have from the parent LP relaxations) $P^3$ and $P^4$'s optimal integer solution can have a value of at most 19, whereas $P^5$ and $P^6$ have a _chance_ for a value up to 20. This is far from a guarantee of where the best solution will be, but it's nonetheless a defensible choice given the information available. Furthermore, attacking the highest-bounded problems lets you reduce the upper bounds quicker, potentially helping to prove the optimality of an incumbent solution.

In practice, a mix of these two strategies is often used. Depth-first is a popular choice at the beginning of a solve in order to identify a feasible solution quickly. After that, a mix of the two notions can be deployed, in an attempt to balance out the need for better feasible solutions versus reduced upper bounds.

### Correctness and complexity

So now you have your first IP solving algorithm, but is it guaranteed to work? The answer is yes, and the key to proving so doesn't lie in any interesting theory like we saw for the simplex method.

To start, let's consider only binary integer programs. In a BIP, all variables must take a value of 0 or 1, so our branches will always set some $x_i=0$ or $x_i=1$. In a worst case, the tree for a BIP with three variables might look like this:

<svg width=650 height=330 class="bbTreeDraw" base="fullTree3d"> Sorry, your browser does not support inline SVG.</svg>

The tree cannot grow beyond this, because in the bottom row every variable has been fixed to some value or another[^valuesFixedExample]! For an IP with general integer variables (i.e. not just binary), we can argue something similar so long as the feasible region of the IP is bounded. A slightly more subtle argument is needed if the feasible region is not bounded, but we won't bother with that here.

[^valuesFixedExample]: For example, at $P^{12}$ we see by following the edges that we've fixed the three variables to $x_1=1, x_2=0, x_3=1$.

But even if the algorithm is valid, another important question is how many nodes we might need to explore before finishing. And we've already outlined an answer to that above: That worst-case tree for the 3-variable case had 15 nodes in it, and depending on the objective function and branching/node selection procedures it's entirely possible that we'd need to visit each and every one of them before finding the optimal solution. In general, a BIP with $n$ variables will in the worst case generate a tree with $2^n$ nodes in the final row ($n$ variables, each with 2 choices of the value taken), and $2^{n + 1} - 1$ nodes in total. A general IP can have even more.

So the number of nodes visited during branch and bound may be exponential in the number of variables in the problem. This is unfortunate, but we should have expected it after what we learned in +@sec:complexityIntro. Integer programming is an $\NP$-hard problem, so we don't know any polynomial-time algorithms for it.
