<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import TheoremRef from "$lib/TheoremRef.svelte";
</script>

<Heading level=2 refId=branchAndBound>Branch and bound</Heading>
<BodyText>
    In this section, we'll cover the common IP solution technique of branch and bound. This is a powerful tool deployed in all IP solvers, but the ideas behind are very simple.
</BodyText>

<Heading level=3 refId=divideAndConquer>Divide and Conquer</Heading>
<BodyText>
    Consider the following IP:
</BodyText>

<MathDisp>\begin{align*}
\max && 10x_1 + 12x_2 & \\
\st  && x_1 + x_2 & \leq \ \ 5  \\
     && 2x_1 + 4x_2 & \leq 15 \\
     && x_1,x_2 & \in \ \ \I_+
\end{align*}
</MathDisp>

<BodyText>
    We've plotted this problem below. As we've seen before, the plotted points are the feasible integer solutions, while the gray-shaded area corresponds to the feasible region of the problem's LP relaxation. We'd like to solve this problem, and while we don't know how to solve IPs yet, we <em>can</em> solve the underlying LP relaxation. Furthermore, we know the following must hold<Footnote>For the uninitiated, A <em>proposition</em> is again like a theorem, and the below statement could have been called a theorem just a well. But we tend to use the work "proposition" instead when the result is a little more obvious.</Footnote>:
</BodyText>

<Theorem thmType=proposition refId=integerLpOptimalSolution>
    <BodyText>
        Suppose <Math>P</Math> is an integer program, and further suppose that <Math>P</Math>'s LP relaxation has an optimal solution <Math>\x</Math> that is also integer. Then <Math>\x</Math> is an optimal solution to <Math>P</Math> as well.
    </BodyText>
</Theorem>

<BodyText>
    The proof for this one is pretty simple, following easily from the fact that any feasible (integer) solutions to <Math>P</Math> are also feasible for <Math>P</Math>'s LP relaxation.
</BodyText>

<BodyText>
    So let's just use what we know, solve the LP relaxation, and maybe we can get lucky and the LP optimal solution will happen to be integer. Unfortunately, you can verify graphically that the optimal LP solution comes at <Math>(x_1, x_2) = (2.5, 2.5)</Math> with an objective value of 55.
</BodyText>

<!-- todo: b&b svg -->
<!-- <svg width=350 height=350 class="lpDraw" base="bbExample1" altArgs='{"chooseObjVals": true}'> Sorry, your browser does not support inline SVG.</svg> -->

<BodyText>
    That didn't work to find us an integer solution, so what can we do? We still only know how to solve LPs, so we'd like to keep using that knowledge. Suppose we do the following: Let's create two different IPs by "branching" off our first IP. Let's call the original IP <Math>P</Math> and the two new IPs <Math>P^1</Math> and <Math>P^2</Math>. We'll keep the new problems identical to <Math>P</Math> except with the addition of one new constraint each. Consider these two formulations:
</BodyText>

<MathDisp>\begin{align*}
P^1: &&&                        &\quad  P^2: \\
\max && 10x_1 + 12x_2 &         &\quad  \max && 10x_1 + 12x_2 & \\
\st  && x_1 + x_2 & \leq \ \ 5  &\quad  \st  && x_1 + x_2 & \leq \ \ 5  \\
     && 2x_1 + 4x_2 & \leq 15   &\quad       && 2x_1 + 4x_2 & \leq 15 \\
     && x_1 & \leq \ \ 2        &\quad       && x_1 & \geq \ \ 3 \\
     && x_1,x_2 & \in \ \ \I_+  &\quad       && x_1,x_2 & \in \ \ \I_+
\end{align*}
</MathDisp>

<BodyText>
    What have we done here? Let's look at the image below, where we've plotted the LP relaxations and feasible integer points for both <Math>P^1</Math> and <Math>P^2</Math>. If you hit the "Toggle Plots" button, you can look back at the original problem <Math>P</Math> and the optimal solution for that LP relaxation.
</BodyText>

<!-- todo: redo this -->
<!-- <div>
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
</div> -->
<BodyText>
    There are a few important items to note about this decomposition:
    <ul>
        <li>All the integer feasible solutions for <Math>P</Math> are also feasible for either <Math>P^1</Math> or <Math>P^2</Math>.</li>
        <li>Conversely, any integer feasible solution for <Math>P^1</Math> or <Math>P^2</Math> is also feasible for <Math>P</Math>.</li>
        <li>The optimal solution to <Math>P</Math>'s LP relaxation is <em>not</em> feasible for either <Math>P^1</Math> or <Math>P^2</Math>.</li>
    </ul>
</BodyText>

<BodyText>
    The first two items imply that we're still dealing with the same set of integer feasible solutions when we go from <Math>P</Math> to <Math>P^1</Math> and <Math>P^2</Math>. From the third item, we know that we'll come up with a different solution if we solve either <Math>P^1</Math> or <Math>P^2</Math>'s LP relaxation, so we have hope again that we can solve an LP and return an integer feasible solution. This action of splitting the initial problem into two (or more) sub-problems, while also satisfying the above three conditions, is known as <em>branching</em>  Importantly, we have the following result relating to sub-problems of <Math>P</Math> that satisfy conditions 1 and 2:
</BodyText>

<Theorem thmType=proposition refId=subproblemsContainOpt>
    <BodyText>
        Suppose <Math>P</Math>, <Math>P^1</Math>, and <Math>P^2</Math> are integer programs with identical objective functions satisfying conditions 1 and 2 from above. If <Math>\x^1</Math>, <Math>\x^2</Math> are optimal solutions to <Math>P^1</Math> and <Math>P^2</Math> respectively, then at least one of <Math>\x^1</Math> or <Math>\x^2</Math> is optimal for <Math>P</Math>.
    </BodyText>
    <span slot=proof>
        <BodyText>
            Suppose for contradiction that neither <Math>\x^1</Math> nor <Math>\x^2</Math> are optimal for <Math>P</Math>. By condition 2 we know both <Math>\x^1</Math> and <Math>\x^2</Math> are feasible for <Math>P</Math>, so there must exist some <Math>\x</Math> feasible for <Math>P</Math> such that <Math>\c\x > \c\x^1</Math> and <Math>\c\x > \c\x^2</Math>. But by condition 1 <Math>\x</Math> must be feasible for <Math>P^i</Math> for some <Math>i</Math>, and <Math>\c\x > \c\x^i</Math> contradicts the optimality of <Math>\x^i</Math> for <Math>P^i</Math>.
        </BodyText>
    </span>
</Theorem>

<BodyText>
    So by branching, we've reduced the process of solving <Math>P</Math> (which didn't work for us directly) to solving <Math>P^1</Math> and <Math>P^2</Math>.
</BodyText>

<Heading level=3 refId=bnbDeadWeight>Dropping dead weight</Heading>
<BodyText>
    Let's now go ahead and solve the LP relaxations of our two new sub-problems <Math>P^1</Math> and <Math>P^2</Math>. You can quickly verify that the for <Math>P^1</Math> the LP optimal solution is <Math>(2, 2.75)</Math> with and objective value of 53, and for <Math>P^2</Math> the LP optimal solution is <Math>(3, 2)</Math> with an objective value of 54. And hey, would you look at that! The LP optimal solution to <Math>P^2</Math> was integer, so by <TheoremRef refId=integerLpOptimalSolution/> it must <Math>P^2</Math>'s best integer solution as well!
</BodyText>
<BodyText>
    So <Math>P^2</Math> is now solved, but unfortunately <Math>P^2</Math> was only half of our original problem <Math>P</Math>. When we subdivided <Math>P</Math> we had no way of telling whether <Math>P</Math>'s optimal solution lay on the <Math>P^1</Math> side or the <Math>P^2</Math> side. So we need to return our attention to <Math>P^1</Math>. Its optimal solution was not integral, so we'll need to branch again and create two new sub-problems for the already-a-sub-problem problem <Math>P^1</Math>. Right?
</BodyText>
<BodyText>
    Actually, let's think again about all the information we have. <Math>P^2</Math> has an optimal integer solution with an objective value of 54, and by the construction of <Math>P^2</Math> that same integer solution is feasible for <Math>P</Math>. Thus we have a <em>bound</em> on an optimal solution to <Math>P</Math>: it will have a value no lower than that same 54. We also know that the optimal solution to <Math>P^1</Math>'s LP relaxation was only 53, so in particular no integer solutions to <Math>P^1</Math> can have a value better then 53. So whatever solution we'd get by eventually solving <Math>P^1</Math>, we know it won't have a better objective value than the integer solution we've already found for <Math>P</Math> (via <Math>P^2</Math>).
</BodyText>
<BodyText>
    All this to say, there is no need to actually solve <Math>P^1</Math>! The information we've already gained from the LP relaxation tells us that we can just ignore it now (a process that we will call <em>pruning</em> or <em>fathoming</em>), and the optimal solution to <Math>P</Math> is also the optimal solution to <Math>P^2</Math>: <Math>(x_1, x_2) = (3, 2)</Math> with an objective value of 54.
</BodyText>

<Heading level=3 refId=bnbBasics>Algorithm basics</Heading>

<BodyText>
    The preceding sections displayed the essence of the branch and bound algorithm for solving integer programs. You initially solve the underlying LP relaxation. If the optimal solution <Math>\x^*</Math> is not integer, you <em>branch</em> by selecting some variable <Math>x_i</Math> such that <Math>x_i^*\not\in\I</Math>, then creating two new IPs that are identical to the original, except to one problem you add a constraint <Math>x_i\leq\floor{x^*_i}</Math> and to the other you add <Math>x_i\geq\ceil{x^*_i}</Math><Footnote>In case you haven't seen this notation before, <Math>\floor{x}</Math> (said "floor of <Math>x</Math>") is value resulting from rounding <Math>x</Math> <em>down</em> to the closest integer, while <Math>\ceil{x}</Math> ("ceiling of <Math>x</Math>") is the value resulting from rounding <Math>x</Math> <em>up</em> to the closest integer. For example, <Math>\floor{1.3}=1</Math> and <Math>\ceil{1.3}=2</Math>.</Footnote>. These new problems are called the <em>child problems</em> of the original problem, and any subsequent children of the child problems are called <em>descendant problems</em> 
</BodyText>
<BodyText>
    You keep recursively branching and solving sub-problems, making use of the <em>bounding</em> information available from the LP relaxations and any integer solutions you've already found. The optimal value of a problem's LP relaxation is an <em>upper bound</em> on both its own optimal integer solution value and the values of its descendants. Any integer solutions found are a <em>lower bound</em> on the original problem's optimal integer value. This bound information is used continually to decide which (if any) sub-problems cannot lead to an optimal solution for the original problem, and thus may be pruned.
</BodyText>

<Heading level=3 refId=bnbExample>A branch and bound example</Heading>
<BodyText>
    Let's walk through a more involved branch and bound example (from<CitationRef refId=wolsey2020/>). It is a small example, but it will still highlight all the relevant decisions that need to be made, as well as make use of all possible node pruning criteria. Consider the following integer program, which we'll name <Math>P</Math>:
</BodyText>

<MathDisp>\begin{align*}
\max && 4x_1 - x_2 & \\
\st  && 7x_1 - 2x_2 & \leq 14  \\
     && x_2 & \leq 3 \\
     && 2x_1 - 2x_2 & \leq 3 \\
     && x_1,x_2 & \in \ \I_+
\end{align*}
</MathDisp>

<BodyText>
    Our first step is the solve the LP relaxation. Doing so leads to a non-integer optimal solution <Math>(\frac{20}{7}, 3)</Math> with objective value <Math>\frac{59}{7}</Math>. Since this solution is not integral, we need to branch. While there are multiple ways one could create the branching sub-problems, for this class we'll be creating them as we did in <SectionRef refId=divideAndConquer/>: Considering the optimal LP relaxation solution <Math>x^*</Math>, choose a variable whose value is fractional then create two sub-problems by adding the constraint <Math>x_i^*\leq\floor{x_i^*}</Math> to one problem and the constraint <Math>x_i^*\geq\ceil{x_i^*}</Math> to the other. In this case, the only variable with a fractional value in the LP optimal solution is <Math>x_1</Math><Footnote>If multiple variables had fractional values you could just select one of them arbitrarily and the algorithm will still work. We'll talk about other ways to choose between multiple fractional variables in <SectionRef refId=choosingBNBNodes/>.</Footnote>. So our new problems are <Math>P^1</Math>, to which we add <Math>x_1\leq2</Math>, and <Math>P^2</Math>, to which we'll add <Math>x_1\geq3</Math>.
</BodyText>

<BodyText>
    As we continue to branch and add sub-problems, we'll find it convenient to have a graphic to reference to help us keep our place. The below image displays our <em>branch-and-bound tree</em> for the problem so far.
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=450 height=210 class="bbTreeDraw" base="bbTree1"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    In this graph, each node represents a sub-problem. The gray-colored nodes are sub-problems that have not yet been <em>explored</em>  meaning that we haven't attempted to solve the sub-problem yet. If we've already branched on a sub-problem, then its node in the tree is colored blue. Branches are represented by edges emanating down from the node, with the text next to the edge describing the inequality added to achieve each child problem.
</BodyText>
<BodyText>
    If a node has already been explored, we display the sub-problem's optimal LP relaxation value next to it. Additionally, next to the root (top) node, we also keep track of the value of the best <em>integer</em> solution found so far in the tree. This currently-best integer solution is known as the <em>incumbent</em> solution, and we'll see how its objective value can be used to prune nodes whose LP relaxation value is low. For now we haven't yet found any integer solutions, so we'll use the value <Math>-\infty</Math>.
</BodyText>
<BodyText>
    At this point we've explored one node and created two new, unexplored nodes. We must now choose which unexplored node to examine next. We'll discuss later in <SectionRef refId=choosingBNBNodes/> how this selection might be made in practice, but ultimately the selection does not make a difference in the correctness of the algorithm<Footnote>While algorithm correctness is not affected by the selection criteria, the number of nodes explored by the end of the algorithm, and thus ultimately algorithm run time, certainly can be.</Footnote>. So let's arbitrarily select <Math>P^1</Math>.
</BodyText>

<BodyText>
    Now we must solve the LP relaxation for <Math>P^1</Math><Footnote>Note that the only difference between <Math>P^1</Math>'s LP relaxation and that of the problem <Math>P</Math> we just solved is the addition of a single constraint. So instead of solving <Math>P^1</Math>'s LP relaxation from scratch, a well-written algorithm could use solution information from <Math>P</Math> and use a re-optimization procedure as discussed in <SectionRef refId=lpReopt/>.</Footnote>. Doing so gives us an optimal solution of <Math>(2, \frac{1}{2})</Math> with an optimal value of <Math>\frac{15}{2}</Math>. Since the solution is not integer, and we have no global lower bound to compare against, we must now branch again. Since <Math>x_2</Math> is the only fractional variable, we will branch on it to create new sub-problems <Math>P^3</Math> and <Math>P^4</Math>.
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=450 height=330 class="bbTreeDraw" base="bbTree2"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    Let's continue on. Say we select <Math>P^2</Math> as the next sub-problem to explore. We attempt to solve its LP relaxation but instead find that the problem is infeasible. This implies that the optimal solution to <Math>P</Math> does not lie on this branch, so we no longer need to explore it. In this case, we say that <Math>P^2</Math> was <em>pruned by infeasibility</em>  In our graph, we'll color a node red if we prune it in this way. Hence our branch and bound tree now looks like:
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=450 height=330 class="bbTreeDraw" base="bbTree3"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    Let's make our next node selection. Say we arbitrarily choose <Math>P^4</Math>. The LP relaxation is solved and returns an optimal solution <Math>(2, 1)</Math> with objective value <Math>7</Math>. Since the optimal solution is also an integer solution, we no longer need to explore this portion of the graph, and so we will prune <Math>P^4</Math>. The act of pruning a node after finding an integer solution is called <em>pruning by optimality</em>  but note that the word "optimality" here is local, as in we've found the optimal integer solution for <Math>P^4</Math>. We do not know yet if this integer solution is also optimal for <Math>P</Math>. Furthermore, since this is the first integer solution we've found, it's also the new incumbent solution for the problem.
</BodyText>
<BodyText>
    Let's have the color purple represent a node that is pruned by optimality, and to further distinguish the node as having an integer optimal solution, we'll add an asterisk to the optimal relaxation value. Our latest version of the branch and bound tree looks like this:
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=450 height=330 class="bbTreeDraw" base="bbTree4"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    The only remaining unexplored node is <Math>P^3</Math>. If we solve its LP relaxation, we obtain a solution <Math>(\frac{3}{2}, 0)</Math> with objective value <Math>6</Math>. Since the optimal LP value is 6, the best integer solution for <Math>P^3</Math> is also no higher than 6. But since the incumbent solution has an objective value <Math>7\geq 6</Math>, we have no hope of finding an improved solution for <Math>P</Math> in this portion of the tree. So instead of branching on a fractional variable, we immediately prune <Math>P^3</Math>. Pruning by this logic is termed <em>pruning by bound</em>  In our graph, we'll use the color orange for nodes pruned by bound.
</BodyText>
<BodyText>
    Speaking of the graph, we have pruned every single node now with no remaining nodes to explore. You can see the final tree below, and can use the buttons under the plot to cycle through each iteration we completed.
</BodyText>


<!-- todo: redo -->
<!-- <div>
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
</div> -->
<BodyText>
    With no further portions of the tree to explore, the incumbent solution <Math>(2, 1)</Math> from sub-problem <Math>P^3</Math> must be our optimal solution.
</BodyText>

<Heading level=3 refId=bnbAlgo>The branch and bound algorithm</Heading>
<BodyText>
    Let's now write out a full treatment of the branch and bound algorithm. There are still several details missing from this treatment (e.g. selection of unexplored nodes, as discussed in <SectionRef refId=choosingBNBNodes/>), and there are definitely alterations and improvements that could be made. The purpose of this exercise is merely to lay out the bulk of a fully-functional algorithm.
</BodyText>
<BodyText>
    The notation in what follows mostly mirrors what we've seen in our discussions above. We'll let <Math>P=P^0</Math> denote the original IP to be solved. <Math>x^*</Math> is the current incumbent solution (i.e. the best-known integer solution). The bound and <Math>\underline Z</Math> is the best-known lower bound on the optimal solution value for <Math>P</Math> (i.e. the value of the incumbent solution), while <Math>\overline Z^i</Math> is the optimal value of the LP relaxation of some sub-problem <Math>P^i</Math>. We'll let <Math>L</Math> represent the list of unexplored sub-problems. The act of pruning a sub-problem includes removing it (and any of its descendants) from <Math>L</Math>.
    <ul>
        <li><em>Initialize</em>: Set <Math>\underline Z=-\infty</Math>, <Math>L=[P^0]</Math>, and <Math>x^*</Math> undefined.</li>
        <li>
            <em>Iterate</em>:
            <ul>
                <li>
                    If <Math>L</Math> is not empty:
                    <ul>
                        <li>Select some sub-problem <Math>P^i</Math> in <Math>L</Math>.</li>
                        <li>Solve LP relaxation of <Math>P^i</Math> to obtain optimal solution <Math>x^i</Math>. Set <Math>\overline Z^i</Math> to optimal value (or <Math>-\infty</Math> if infeasible).</li>
                        <li>
                            If <Math>\overline Z^i=-\infty</Math>: Prune <Math>P^i</Math> by infeasibility.
                        </li>
                        <li>
                            Else if <Math>\overline Z^i\leq\underline Z</Math>: Prune <Math>P^i</Math> by bound.
                        </li>
                        <li>
                            Else if <Math>x^i</Math> is integer: Update <Math>\underline Z=\overline Z^i</Math> and <Math>x^*=x^i</Math>. Prune <Math>P^i</Math> by optimality.
                        </li>
                        <li>
                            Else: Branch on a fractional value in <Math>x^i</Math> and add the two new sub-problems to <Math>L</Math>.
                        </li>
                    </ul>
                </li>
                <li>
                    Else:
                    <ul>
                        <li>If <Math>x^*</Math> is undefined: <Math>P</Math> is infeasible.</li>
                        <li>Else: return <Math>x^*</Math> as optimal solution.</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</BodyText>

<Heading level=3 refId=choosingBNBNodes>Next nodes and branching variables</Heading>
<BodyText>
    While working through our branch and bound examples, there were two places where we had to make decisions on how to proceed:
    <ul>
        <li>When an LP relaxation solution is fractional, which variable do we select to create the next branching sub-problems?</li>
        <li>When we've finished processing a node in the branch and bound tree, which node do we select to process next?</li>
    </ul>
</BodyText>

<BodyText>
    In each case, we made our decision arbitrarily among the available options. In this section we will talk about some strategies used in practice and arguments for using them.
</BodyText>

<Heading level=4 refId=bnbChooseBranchVar>Choosing the branching variable</Heading>
<BodyText>
    When a sub-problem's LP relaxation solution has fractional components, we must choose one of the fractional variables to branch on. One common tactic is to select the variable that is "most fractional", i.e. the variable whose fractional part (i.e. <Math>x_i - \floor{x_i}</Math>) in the LP relaxation solution is closest to <Math>\frac{1}{2}</Math>. The justification for this selection is that values closer to integer values are perhaps more likely to take the value they are closest to in an optimal solution, while values whose integer parts are close to <Math>\frac{1}{2}</Math> could go either way. But this is really just a rule of thumb. The logic behind that justification is not guaranteed to hold true, and selecting variables in this way will not necessarily lead to faster algorithm run times.
</BodyText>
<BodyText>
    UPDATE: Just after presenting this in class, I happened upon the following podcast where the guest is the creator of the solver SCIP and currently heads R&D for Gurobi. According to him, the "most fractional" rule is (maybe worse than?) useless.
</BodyText>

<iframe class="basicCenter" width="560" height="315" src="https://www.youtube.com/embed/8bhIW27vCUQ?si=uVfwGTgca0xboEaT&amp;start=3378" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<BodyText>
    Another technique, which we will not cover in detail here, is called <em>strong branching</em>  The idea is to take each fractional-valued variable and see how much the LP relaxation's objective will change if <Math>x_i</Math> is rounded down versus if <Math>x_i</Math> is rounded up. The idea is that choosing a branching variable that induces larger variations in bounds is more likely to lead to quicker pruning, and thus help to minimize the size of the branch and bound tree. The downside is that this determination requires solving (or at least running several simplex iterations on) a different LP for each fractional variable, which can take significant amounts of time. Most solvers will use some strong branching, but only apply it selectively when they think the extra work up front will be rewarded by significantly smaller search trees later.
</BodyText>

<Heading level=4 refId=bnbChooseNextSubprob>Choosing the next sub-problem</Heading>
<BodyText>
    If you've just finished processing some node in your branch and bound tree, and there are multiple unexplored nodes still in the tree, how do you choose which node to move to next? Two common approaches are the <em>depth-first</em> strategy and the <em>best node</em> strategy.
</BodyText>
<BodyText>
    In a depth-first strategy, you continually work on children of the last completed node until an integer solution is found. The hope is that this strategy has the best chance to quickly lead you to an integer feasible solution, and thus you'll be able to start pruning other nodes with this bound. It may also potentially make the sub-problems easier to solve, since moving from one node to another involves only adding a single constraint at each point. You would have just computed the previous optimal basis at the last node, so re-optimization may be faster. A tree developed while executing a depth-first strategy might look like this:
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=650 height=380 class="bbTreeDraw" base="depthFirstTree"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    In a best node strategy, you select the unexplored node with the highest upper bound, i.e. the a node whose parent had the highest LP relaxation value. Taking the following tree as an example, we would select one of <Math>P^5</Math> or <Math>P^6</Math> before <Math>P^3</Math> or <Math>P^4</Math> because the LP relaxation value for <Math>P^2</Math> is higher than the LP relaxation value for <Math>P^3</Math>.
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=450 height=330 class="bbTreeDraw" base="bestNodeTree"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    The intuition here is to stay in the area of the tree with the best chance of having good integer feasible solutions. For the above tree (and using the bound information we have from the parent LP relaxations) <Math>P^3</Math> and <Math>P^4</Math>'s optimal integer solution can have a value of at most 19, whereas <Math>P^5</Math> and <Math>P^6</Math> have a <em>chance</em> for a value up to 20. This is far from a guarantee of where the best solution will be, but it's nonetheless a defensible choice given the information available. Furthermore, attacking the highest-bounded problems lets you reduce the upper bounds quicker, potentially helping to prove the optimality of an incumbent solution.
</BodyText>
<BodyText>
    In practice, a mix of these two strategies is often used. Depth-first is a popular choice at the beginning of a solve in order to identify a feasible solution quickly. After that, a mix of the two notions can be deployed, in an attempt to balance out the need for better feasible solutions versus reduced upper bounds.
</BodyText>

<Heading level=3 refId=bnbCorrectness>Correctness and complexity</Heading>
<BodyText>
    So now you have your first IP solving algorithm, but is it guaranteed to work? The answer is yes, and the key to proving so doesn't lie in any interesting theory like we saw for the simplex method.
</BodyText>
<BodyText>
    To start, let's consider only binary integer programs. In a BIP, all variables must take a value of 0 or 1, so our branches will always set some <Math>x_i=0</Math> or <Math>x_i=1</Math>. In a worst case, the tree for a BIP with three variables might look like this:
</BodyText>

<!-- todo: new svg -->
<!-- <svg width=650 height=330 class="bbTreeDraw" base="fullTree3d"> Sorry, your browser does not support inline SVG.</svg> -->
<BodyText>
    The tree cannot grow beyond this, because in the bottom row every variable has been fixed to some value or another<Footnote>For example, at <Math>P^{12}</Math> we see by following the edges that we've fixed the three variables to <Math>x_1=1, x_2=0, x_3=1</Math>.</Footnote>! For an IP with general integer variables (i.e. not just binary), we can argue something similar so long as the feasible region of the IP is bounded. A slightly more subtle argument is needed if the feasible region is not bounded, but we won't bother with that here.
</BodyText>

<BodyText>
    But even if the algorithm is valid, another important question is how many nodes we might need to explore before finishing. And we've already outlined an answer to that above: That worst-case tree for the 3-variable case had 15 nodes in it, and depending on the objective function and branching/node selection procedures it's entirely possible that we'd need to visit each and every one of them before finding the optimal solution. In general, a BIP with <Math>n</Math> variables will in the worst case generate a tree with <Math>2^n</Math> nodes in the final row (<Math>n</Math> variables, each with 2 choices of the value taken), and <Math>2^{n + 1} - 1</Math> nodes in total. A general IP can have even more.
</BodyText>
<BodyText>
    So the number of nodes visited during branch and bound may be exponential in the number of variables in the problem. This is unfortunate, but we should have expected it after what we learned in <SectionRef refId=complexityIntro/>. Integer programming is an <Math>\NP</Math>-hard problem, so we don't know any polynomial-time algorithms for it.
</BodyText>