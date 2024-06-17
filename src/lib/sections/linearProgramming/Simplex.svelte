<script>
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import InteractiveLp from "$lib/InteractiveLp.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import TheoremRef from "$lib/TheoremRef.svelte";
</script>

<Heading level=2 refId=simplex>The simplex method</Heading>

<BodyText>
     We're just about ready to talk about LP solving algorithms, and we're of course starting with the <em>simplex method</em> (also sometimes called the <em>simplex algorithm</em>). Arguably the most important breakthrough in the history of OR was the development of the simplex method by George Dantzig
     <Footnote>
          I'm not mentioning a lot of people by name in these notes, but I couldn't skip Dantzig. Mostly I wanted to bring up this famous story: A student comes late to class one day, sees two problems written on the board, and assumes they are the day's assigned homework. The problems are more difficult than usual, but he solves them. When he turns them in, the professor is elated - these weren't homework problems at all, but rather famous unsolved problems in the field! You can find several versions of this story out there, citing several different people as the supposed student. Turns out <a href='https://www.snopes.com/fact-check/the-unsolvable-math-problem/#6oJOtz9WKFQUHhbw.99'>this actually happened, and the student was Dantzig</a>.
     </Footnote> during the late 1940s
     <Footnote>There's a neat story, quoting from @tspPursuit, in <a href='https://punkrockor.com/2014/04/29/happiness-is-assuming-the-world-is-linear/'>this blog post</a> (yes, OR blogs are a thing). It's specifically about Dantzig first introducing the simplex method during a talk in 1948, and more generally about understanding your assumptions 😀.
     </Footnote>. It was perhaps the first practical algorithm developed for linear programming, and it continues to be the workhorse in linear and integer programming solvers today<Footnote>Interestingly, several other linear programming algorithms have been devised whose theoretical properties seem to suggest they would be more efficient. But in practice that hasn't been the case. Simplex continues to be the best algorithm in practice for the widest array of problems.</Footnote>.
</BodyText>

<Heading level=3 refId=simplexCornerPointSols>Corner-point solutions</Heading>

<BodyText>
     Before we get to the algorithm itself, let's take a moment to dwell on some geometric insights the method relies on. We'll return to our sample problem <EquationRef refId=prototypeLp/> and once again we'll graph it below.
</BodyText>

<InteractiveLp
    inequalities={[
        [1, 0, "l", 4, {'textPlacement': [2.3, 9]}],
        [0, 2, "l", 12, {'textPlacement': [6, 7]}],
        [3, 2, "l", 18, {'textPlacement': [5, 2.5]}],
    ]}
    objective={[3, 5, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={10.99}
    showVertices={true}
    refId=wyndorLpVertices
><span slot=caption>Wyndor LP <EquationRef refId=prototypeLp/> with CPF solutions plotted</span></InteractiveLp>

<BodyText>
     This time we've also plotted the solutions in the corners of the feasible region, because they are important to the simplex algorithm. We call these solutions <em>corner-point feasible (CPF) solutions</em><Footnote>There are corner-point infeasible solutions as well, which sit at intersections outside the feasible region</Footnote> or <em>vertices</em><Footnote>I'm used to calling them vertices, but the textbook tends to call them corner-point solutions, which I like as a more helpful, descriptive term. I'll try to stick to corner-point solution for the notes, but I expect to slip up a few times, especially during lectures.</Footnote>, which are feasible solutions that come at the intersection of two constraint boundaries (in the general case, for LPs in standard form <EquationRef refId=standardFormLp/> with <Math>n</Math> decision variables, the CPF solutions come at the intersection of <Math>n</Math> constraints boundaries).
</BodyText>

<BodyText>
     The simplex algorithm makes use of the following key fact of linear programs:
</BodyText>

<Theorem refId=cornerPointOpt proofPlacement=appendix>
     <BodyText>
          If a linear program has an optimal solution (i.e. not unbounded or infeasible), then it has an optimal solution that is a corner-point feasible solution.
     </BodyText>
     <span slot=proof>
          <BodyText>
               We won't actually give a full proof of this theorem, instead we'll only consider the case of a standard form LP <EquationRef refId=standardFormLpMatrix/> with only two decision variables. Those of you that are familiar with <a href="https://en.wikipedia.org/wiki/Mathematical_induction">proofs by induction</a> may be able to see how to generalize this to any number of variables.
          </BodyText>

          <BodyText>
               In two dimensions we can visualize this, so let's continue to use the Wyndor LP of <EquationRef refId=prototypeLp/> as our example. Any feasible solution to a two-dimensional LP must fall under exactly one of these categories:
               <ol>
                    <li>An interior solution (not on any constraint boundaries).</li>
                    <li>On a single constraint boundary.</li>
                    <li>A corner-point feasible (CPF) solution (i.e. at the intersection of two constraint boundaries).</li>
               </ol>
          </BodyText>

          <BodyText>
               What we can show is that for any solution of type 1 or 2, we can find a CPF solution with equal or greater objective value, and we will illustrate this in the plot below. To that end, suppose we have some solutions <Math>\mat{z}</Math> on the interior of the feasible region, and <Math>\mat{y}</Math> that lies on a single constraint boundary.
          </BodyText>
          
          <!-- TODO: custom svg -->
          <BodyText>(Need to add visualization...)</BodyText>
          <!-- <svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"extraPoints": [[2, 1], [3, 4.5]], "extraLines": [[2, 1, 3, 1.5, {"style": "stroke-width:2pt;stroke:black", "marker-end": "url(#blackArrowMarker)"}], [3, 4.5, 2.5, 5.25, {"style": "stroke-width:2pt;stroke:black", "marker-end": "url(#blackArrowMarker)"}]], "extraMathText": [["y", 3.25, 5, {"coordToPix": true}], ["z", 1.75, 1.75, {"coordToPix": true}], ["v", 2, 5.75, {"coordToPix": true}], ["u", 3.25, 1.75, {"coordToPix": true}]]}'> Sorry, your browser does not support inline SVG.</svg> -->

          <BodyText>
               If <Math>\mat{v}\mat{c}\geq0</Math>, then moving from <Math>\mat{y}</Math> along the constraint boundary in the direction of <Math>\mat{v}</Math> improves the objective value. So we can continue in that direction until we meet another constraint, yielding a CPF solution with greater-or-equal objective value than <Math>y</Math>. If, on the other hand, <Math>\mat{v}\mat{c}<0</Math>, then we can move in the direction of <Math>-\mat{v}</Math> to a CPF solution with greater objective value than <Math>\mat{y}</Math>. So either way, there is some CPF solution with objective value at least as good as <Math>\mat{y}</Math>.
          </BodyText>

          <BodyText>
               The proof for the interior point <Math>\mat{z}</Math> is very similar. Select some direction <Math>\mat{u}</Math>, and then travel from <Math>\mat{z}</Math> along directions <Math>\mat{u}</Math> or <Math>\mat{u}</Math> until you hit a constraint boundary. One of these points will yield an objective value at least as good as <Math>\mat{z}</Math>, and it will be on either:
               <ul>
                    <li>The intersection of two constraints, in which case we've found the CPF solution with at least as good a value as <Math>\mat{z}</Math>.</li>
                    <li>A single constraint, in which case we can repeat the procedure shown above for <Math>\mat{y}</Math> to find the CPF solution.</li>
               </ul>
          </BodyText>
          
          <BodyText>
               In either case, we've found our required CPF solution, thus the proof is complete.
          </BodyText>
     </span>
</Theorem>

<BodyText>
     Thanks to this theorem<Footnote>For those that are not aware, a <em>theorem</em> is a mathematical statement that has been proven to be true, based on some set of standard axioms. Anything I cite as a theorem in these notes, you can be confident it holds true, even if we don't work through a rigorous proof.</Footnote> we know that we only need to check CPF solutions when solving an LP! We make use of this fact during the simplex method, which only checks CPF solutions. We won't check <em>every</em><Footnote>At least not generally - for common variants of the simplex method, there exist examples where every CPF solution is visited during execution (<CitationRef refId=kleeMinty/> is the first, most famous example). But this isn't usually an issue in practice.</Footnote> CPF solution, though. The key to simplex is that we jump from one CPF solution to the next while taking care that each move improves the objective value.     
</BodyText>

<BodyText>
     In fact, the set of solutions we can move to in any iteration is limited to only the solutions that are adjacent to the current solution. In a standard-form LP with <Math>n</Math> decision variables, two CPF solutions are <em>adjacent</em> if they share <Math>n-1</Math> constraint boundaries. Recall that CPF solutions lie at the intersection of <Math>n</Math> constraint boundaries, so we can also say that two adjacent CPF solutions share all but one boundary in common.
</BodyText>

<BodyText>
     We have all the definitions now to describe simplex in a nutshell: The simplex method solves a linear programming problem by successively moving from one CPF solution to another, adjacent CPF solution, making sure each such move improves the objective function, until no such improvement exists<Footnote>This is really the key takeaway from our whole discussion in this section, and if this is the only thing you remember about the simplex method 10 years from now I'll still be satisfied. This is the key insight, you can always re-learn the details later.</Footnote>.
</BodyText>

<Heading level=3 refId=simplexVisualized>Simplex visualized</Heading>

<BodyText>
     Now that we have the basic idea, let's go ahead and walk through the steps of the simplex algorithm. We won't go fully general on our first time through, though. Let's again consider our sample problem of <EquationRef refId=prototypeLp/>, which we've plotted again below. This time, though, the plot contains some controls that let us step through the simplex method one iteration at a time. I should stress that the simplex method does not work <em>exactly</em> like what we'll talk through below, but all the intuitions are the same and the exercise is, I think, a useful one.
</BodyText>

<!-- todo: other svg visualization -->
<!-- <svg width=350 height=350 class="lpDraw" base="prototypeLp" altArgs='{"simplexStart": [0, 0]}'> Sorry, your browser does not support inline SVG.</svg> -->

<BodyText>
     The first step is to find an initial CPF solution. In our case (and lots of practical instances too) the solution <Math>(0, 0)</Math> is a feasible solution, and a corner point as well. It's not a particularly desirable solution in the context of our problem since it brings us no profit, but we don't care about desirability yet.
</BodyText>

<BodyText>
    After initialization, we begin the algorithm's main loop. First we have to determine if there are any adjacent CPF solutions with improving objective value. Recall that an adjacent solution will share <Math>n-1</Math> constraint boundaries with the current solution. Since we're in two dimensions, the adjacent solutions share one constraint boundary with the current solution. To find the adjacent solutions, we travel out from <Math>(0,0)</Math> along the two boundary lines it sits on, which in this case are the two axes. Thus the two directions we can move in are <Math>(1,0)</Math> and <Math>(0,1)</Math>.
</BodyText>

<BodyText>
     How do we know if a solution in any particular direction is improving the objective value? Let's consider the direction <Math>(1,0)</Math>. Since we're moving from <Math>(0,0)</Math> to some point in the direction of <Math>(1,0)</Math>, the resulting solution will look like <Math>(0,0) + \alpha(1,0)</Math> for some number <Math>\alpha</Math>. The objective value of any point <Math>\x</Math> is <Math>\c\x</Math> where <Math>\c</Math> is the vector of objective coefficients (which is <Math>(3,5)</Math> in our sample problem). So the objective value of <Math>(0,0) + \alpha(1,0)</Math> is
     <MathDisp>
          ([0\ 0] + \alpha[1\ 0])\begin{bmatrix}3\\5\end{bmatrix}
     </MathDisp>
     and since matrix multiplication distributes through addition, this is the same as
     <MathDisp>
          [0\ 0]\begin{bmatrix}3\\5\end{bmatrix} + \alpha[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}.
     </MathDisp>
     That first term, <Math>[0\ 0]\begin{bmatrix}3\\5\end{bmatrix}</Math>, is just the objective value associated with the current solution <Math>(0,0)</Math>. So the second term <Math>\alpha[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}</Math>, is the <em>improvement</em> associated with the move.
 </BodyText>

 <BodyText>
     We have two directions in which we can move, <Math>(1,0)</Math> and <Math>(0,1)</Math>. To keep things standardized we'll want to re-scale our directions to be unit vectors (i.e. vectors with length one), but in this case they're already unit vectors. The improvements associated with unit moves in these directions are <Math>[1\ 0]\begin{bmatrix}3\\5\end{bmatrix}=3</Math> and <Math>[0\ 1]\begin{bmatrix}3\\5\end{bmatrix}=5</Math>. These are both positive numbers, and since we're trying to maximize the objective value, that means that solutions in either direction are improvements.
 </BodyText>

 <BodyText>
     All that information is summarized in the table below the plot. The two directions are listed, as well as the per-unit change in objective function (under the heading <Math>\Delta</Math> Obj / Unit<Footnote>The greek capital letter <Math>\Delta</Math> is commonly used to denote an amount of change, and in these context is often read as "change in."</Footnote>). Since both directions improve the objective, you have the option to choose either one using the checkboxes in the final column.
 </BodyText>

 <BodyText>
     Let's go ahead and choose the <Math>(0,1)</Math> direction, since it gives the highest per-unit objective change<Footnote>Note that having the highest per-unit change doesn't necessarily make it the "best" choice in any particular way. It may be that choosing a different (but still improving) direction will mean that we finish the algorithm faster. But in general we can't tell beforehand, so we often just choose the direction with the highest change as convenient rule-of-thumb.</Footnote>. Press the forward button on the plot, and you'll see it finds the adjacent solution in that direction, <Math>(0,6)</Math>, and the directions to its adjacent solutions. But only one of the directions is improving, so we choose to move in that direction <Math>(1,0)</Math> to the adjacent CPF solution <Math>(2,6)</Math>. At this point none of the adjacent directions are improvements, so the current point is optimal and the algorithm is finished.
 </BodyText>

 <BodyText>
     One thing to note before we move on: All the information we gather during an iteration is in some sense "local" to the current CPF solution. We compute only the <em>directions</em> to the neighboring solutions, not the actual solutions themselves. Only once we decide on a direction do we find the actual CPF solution. This is because finding the solutions is much more expensive computationally speaking, and we'd like to defer that step and only compute solutions when necessary. This isn't such a big deal on a small, two-dimensional example like this, but in larger scale instances this saves a good amount of time.
 </BodyText>

 <Heading level=3 refId=augBasicSol>Augmented form and basic solutions</Heading>
 
<BodyText>
     We'll return again to our sample problem from <EquationRef refId=prototypeLp/>. The first thing we'll need to do is change the form of the problem. While we modeled the sample problem in standard form <EquationRef refId=standardFormLpMatrix/>, the simplex method requires constraints in equality form (along with the non-negative variables and maximizing the objective). We call this the <em>augmented form</em> linear program, which we write as
 </BodyText>
 
 <MathDisp refId=augmentedFormLpMatrix>
     \begin{align*}
     \max && \c\x \\
     \st  && \A\x&=\b \\
          && \x&\geq\zeros
     \end{align*}
 </MathDisp>

<BodyText>
    To transform our sample problem into augmented form, we'll steal a trick from <SectionRef refId=lpConstraintTransform/>. We'll turn the inequality constraints into equations by adding a slack variable to each constraint, yielding the following formulation:
    <MathDisp>
     \begin{align*}
     \max && 3x_1 + 5x_2 & \\
     \st  && x_1 + x_3 & = \ \ 4  \\
          && 2x_2 + x_4 & = 12 \\
          && 3x_1 + 2x_2 + x_5 & = 18 \\
          && x_1,x_2,x_3,x_4,x_5 & \geq \ \ 0
     \end{align*}
    </MathDisp>
    We call <Math>x_3</Math> the <em>slack variable</em> for the first constraint because its value in a feasible solution tells you how far away the solution's values for <Math>x_1</Math> and <Math>x_2</Math> were from the constraint boundary in <EquationRef refId=prototypeLp/>.
</BodyText>
 

<BodyText>
     Simplex involves lots of matrix manipulations, so let's rewrite this in matrix form. Following usual convention, we'll also add an extra variable <Math>Z</Math> which is equal to the problem's objective value. So in this case, we have
     <MathDisp>
         Z = 3x_1 + 5x_2.
     </MathDisp>
     Additionally, we'll go rogue a bit and neglect writing the non-negativity constraints. They're still there, but the simplex algorithm will take care of them implicitly. So in matrix form, our problem looks like:
 </BodyText>
 
 <MathDisp>
     \begin{bmatrix}
     1 & -3 & -5 & 0 & 0 & 0 \\
     0 & 1  &  0 & 1 & 0 & 0 \\
     0 & 0  &  2 & 0 & 1 & 0 \\
     0 & 3  &  2 & 0 & 0 & 1 \\
     \end{bmatrix}
     \begin{bmatrix}
     Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
     \end{bmatrix}
     =
     \begin{bmatrix}
     0 \\ 4 \\ 12 \\ 18
     \end{bmatrix}
 </MathDisp>

<BodyText>
     Recall in <SectionRef refId=simplexVisualized/> we made use of <TheoremRef refId=cornerPointOpt/> to solve the LP, jumping from CPF solution to CPF solution while increasing the objective value at every step. We'll do similar algebraically now, but instead of a CPF solution (which made sense in the standard-form world of <EquationRef refId=standardFormLpMatrix/>) we'll make use of <em>basic feasible (BF) solutions</em>, the augmented-form analogue. Indeed, the only real difference between corner-point and basic solutions is whether or not the slack variables are included.
</BodyText>

<BodyText>
     That said, basic solutions have their own important properties. Studying the system of equations in the above matrix, we see that we have 5 variables but only 3 (linearly independent) constraints. As you may recall from linear algebra class, this means we have 2 <em>degrees of freedom</em>, and thus two of the variables may be set arbitrarily while solving the system. In the simplex method, these two variables will take the value 0. The variables set to 0 are called the <em>non-basic variables</em>. We can then solve the system of equations to retrieve values for the other 3 variables, which are called the <em>basic variables</em>, and collectively the <em>basis</em>. Together, the values of the basic and non-basic variables make up a <em>basic solution</em>.
</BodyText>

<BodyText>
     The key properties of basic solutions are the following (quoting from <CitationRef refId=classText/>):
     <ul>
          <li>Each variable is designated as either a nonbasic variable or a basic variable.</li>
          <li>The number of basic variables equals the number of functional constraints (now equations). Therefore, the number of nonbasic variables equals the total number of variables minus the number of functional constraints.</li>
          <li>The nonbasic variables are set equal to zero.</li>
          <li>The values of the basic variables are obtained as the simultaneous solution of the system of equations (functional constraints in augmented form).</li>
          <li>If the basic variables satisfy the non-negativity constraints, the basic solution is a BF solution.</li>
     </ul>
</BodyText>

<BodyText>
     Two BF solutions are said to be <em>adjacent</em> if <em>all but one</em> of their non-basic variables are the same. Note that this means also that all but one of their basic variables are the same. Also note that we don't mean that these basic variables take on the same <em>values</em>, just that the identity of the variables are the same. So e.g. one basic solution with basic variables <Math>x_1, x_2</Math> and <Math>x_3</Math> is adjacent to another solution with basic variables <Math>x_1, x_2, x_4</Math>, no matter the values taken by those variables in the respective solutions.
</BodyText>

<Heading level=3 refId=simplexExample>Solving the sample LP with simplex</Heading>

<BodyText>
    To recap with our new terminology, the goal of the simplex method is to take an LP in augmented form, and iteratively move from one BF solution to another, adjacent BF solution while improving the objective value at every step. We've already converted our sample problem to augmented form, summarized by the following matrix:
</BodyText>

<MathDisp refId=simplexExampleMatrix1>
     \begin{bmatrix}
     1 & -3 & -5 & 0 & 0 & 0 \\
     0 & 1  &  0 & 1 & 0 & 0 \\
     0 & 0  &  2 & 0 & 1 & 0 \\
     0 & 3  &  2 & 0 & 0 & 1 \\
     \end{bmatrix}
     \begin{bmatrix}
     Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
     \end{bmatrix}
     =
     \begin{bmatrix}
     0 \\ 4 \\ 12 \\ 18
     \end{bmatrix}
</MathDisp>

<Heading level=4 refId=sampleInitialBFS>Find an initial BF Solution</Heading>

<BodyText>
    We'd like to start iterating between adjacent BF solutions, but to do that we need a BF solution to start with. We'll go into more details on how to find initial BF solutions later in <SectionRef refId=lpOtherConsiderations/>, but for now let's notice that using the slack variables as the initial basis will make this system very easy to solve. Why? Since <Math>x_1</Math> and <Math>x_2</Math> are non-basic, we set their values to 0. Thus the system <EquationRef refId=simplexExampleMatrix1/> reduces to:

    <MathDisp>
     \begin{bmatrix}
     1 & -3 & -5 & 0 & 0 & 0 \\
     0 & 1  &  0 & 1 & 0 & 0 \\
     0 & 0  &  2 & 0 & 1 & 0 \\
     0 & 3  &  2 & 0 & 0 & 1 \\
     \end{bmatrix}
     \begin{bmatrix}
     Z \\ 0 \\ 0 \\ x_3 \\ x_4 \\ x_5
     \end{bmatrix}
     =
     \begin{bmatrix}
     0 \\ 4 \\ 12 \\ 18
     \end{bmatrix}
    </MathDisp>
    
    or, equivalently:
    
    <MathDisp>
     \begin{bmatrix}
     1 & 0 & 0 & 0 \\
     0 & 1 & 0 & 0 \\
     0 & 0 & 1 & 0 \\
     0 & 0 & 0 & 1 \\
     \end{bmatrix}
     \begin{bmatrix}
     Z \\ x_3 \\ x_4 \\ x_5
     \end{bmatrix}
     =
     \begin{bmatrix}
     0 \\ 4 \\ 12 \\ 18
     \end{bmatrix}
    </MathDisp>
    
    So the initial BF solution is <Math>(x_1, x_2, x_3, x_4, x_5)</Math> = <Math>(0, 0, 4, 12, 18)</Math>, yielding objective value <Math>Z=0</Math>.
</BodyText>

<Heading level=4 refId=sampleOptTest>Optimality test</Heading>

<BodyText>
    To decide whether an improving adjacent solution exists, we'll take a look at the top row of our matrix <EquationRef refId=simplexExampleMatrix1/>, which we set up to track the objective value <Math>Z</Math>. When multiplied by the variable vector, that top row currently reads as <Math>Z - 3x_1 - 5x_2 = 0</Math>, simply a rearranging of the usual objective <Math>Z = 3x_1 + 5x_2</Math>. Thus a negative value in the top row indicates that including that variable in the basis will improve the objective value. Since we have negative values in the top row, we conclude that the current solution is not optimal.
</BodyText>

<Heading level=4 refId=sampleIncomingVar>Determine the incoming variable</Heading>
<BodyText>
    Since both <Math>x_1</Math> and <Math>x_2</Math> have negative values in the objective row, we now have two choices of incoming basic variables that will improve the objective value. As we did in <SectionRef refId=simplexVisualized/>, we will choose the variable that gives the highest such improvement per unit change in the variable, which in this case is <Math>x_2</Math> (which has a coefficient of -5 in the top row, vs. -3 for <Math>x_1</Math>).
</BodyText>

<Heading level=4 refId=sampleOutgoingVar>Determine the outgoing variable</Heading>
<BodyText>
    We've decided that we want <Math>x_2</Math> to enter the basis, i.e. we'd like its value to increase from 0 in the current solution to some positive value in the next solution. What effect does increasing <Math>x_2</Math> have on the constraints? All of the equations are currently satisfied, so changing the value of <Math>x_2</Math> means that we must change the values of other variables to compensate. Luckily, the way the matrix is set up, each constraint has only one basic variable with a non-zero coefficient. For example, the third row of <EquationRef refId=simplexExampleMatrix1/>, when multiplied out, reads:
</BodyText>

<MathDisp>
    2x_2 + x_4 = 12.
</MathDisp>

<BodyText>
    Importantly, <Math>x_4</Math> is the only non-basic variable in this constraint, and this is the <em>only</em> constraint that <Math>x_4</Math> shows up in (due to the identity matrix structure in the basic variables). So each unit increase in <Math>x_2</Math> will require a 2-unit <em>decrease</em> in <Math>x_4</Math> to balance the constraint. Since each variable (and so in particular, <Math>x_4</Math>) must stay non-negative, we can only increase <Math>x_2</Math> from 0 to 6 and still remain feasible.
</BodyText>

<BodyText>
    So we carry out this procedure with each constraint in <EquationRef refId=simplexExampleMatrix1/> (rows 2-4). <Math>x_2</Math> has a coefficient of 0 in the second row, so this constraint will not be violated no matter how much we change <Math>x_2</Math>. Row four gives the equation <Math>x_1 + 2x_2 + x_5 = 18</Math>, so again a unit increase in <Math>x_2</Math> requires a 2-unit decrease in <Math>x_5</Math>. Since the right-hand side is 18, we can only increase <Math>x_2</Math> to 9 before <Math>x_5</Math> will go negative.
</BodyText>

<BodyText>
    Let's summarize what we've done now: for each constraint, we've compared the contribution of <Math>x_2</Math> to the contribution of the corresponding basic variable. We saw above that when the coefficient on <Math>x_2</Math> is zero for a given constraint, then changing the value of <Math>x_2</Math> will not affect that constraint at all. We didn't have an example of this, but if the coefficient on <Math>x_2</Math> were negative then increasing <Math>x_2</Math> is counteracted by an <em>increase</em> in the current basic variable. Variables must be non-negative, but there is no <em>upper</em> bound, so we are free to increase a variable as much as we want. Thus the only constraints that restrict <Math>x_2</Math> are the ones where the coefficient on <Math>x_2</Math> is strictly positive.
</BodyText>

<BodyText>
    So the rows where the <Math>x_2</Math> coefficient is positive are where we need to worry about the current basic variable going negative, and where we need to calculate how much <Math>x_2</Math> can increase before that happens. You may or may not have noticed, but because of the identity matrix structure in the basis, all we need to do for this calculation is divide the right-hand side (rhs) value by the coefficient on <Math>x_2</Math> in each constraint! Thus our concern is the following ratios:
</BodyText>

<MathDisp>
    x_2\text{ column: }\begin{bmatrix}0 \\ 2 \\ 2\end{bmatrix}\
    \text{ rhs: }\begin{bmatrix}4 \\ 12 \\ 18\end{bmatrix}\
    \text{ ratio: }\begin{bmatrix}- \\ 12/2 \\ 18/2\end{bmatrix} = \begin{bmatrix}- \\ 6 \\ 9\end{bmatrix}
</MathDisp>

<BodyText>
    Then the variable leaving the basis should be the one in the constraint that gives the smallest such ratio (we call this process the <em>minimum ratio test</em>). Why? As we discussed above, the ratio in each column is the bound on how much we can increase the entering variable before the basic variable decreases to 0. So we must take the minimum such increase in order to keep the entire system feasible. In our case, the minimum ratio comes in the second constraint. The basic variable included in that constraint is <Math>x_4</Math>, so we must choose <Math>x_4</Math> to leave the basis<Footnote>It is also possible to have a tie in the minimum ratio test. This is another special case that we'll cover later.</Footnote>.
</BodyText>

<Heading level=4 refId=sampleSolveNewSystem>Solve the new system</Heading>

<BodyText>
    Now that we've identified the variables entering and exiting the basis, what remains is to find the values of the variables at the new solution. Since <Math>x_1</Math> and <Math>x_4</Math> are non-basic, their values will be 0. To find the other values, we'll essentially do <a href='https://en.wikipedia.org/wiki/Gaussian_elimination'>Gaussian elimination</a> on the matrix system <EquationRef refId=simplexExampleMatrix1/> to yield an identity matrix structure over the columns corresponding to our basis.
</BodyText>

<BodyText>
    Our basis variable swap came from the model's second constraint, which corresponds to row 3 in the matrix. This will be the "identity" row for the entering variable <Math>x_2</Math>, so we'll multiply that row by <Math>1/2</Math> to get a new matrix:
</BodyText>

<MathDisp>
    \begin{bmatrix}
    1 & -3 & -5 & 0 & 0   & 0 \\
    0 & 1  &  0 & 1 & 0   & 0 \\
    0 & 0  &  1 & 0 & 1/2 & 0 \\
    0 & 3  &  2 & 0 & 0   & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
    Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
    \end{bmatrix}
    =
    \begin{bmatrix}
    0 \\ 4 \\ 6 \\ 18
    \end{bmatrix}
</MathDisp>

<BodyText>
    To complete the identity matrix structure, we must change all other coefficients in the <Math>x_2</Math> column to equal zero. So we'll do the following:
    <ul>
        <li>Multiply the third row by 5 and add it to the first row.</li>
        <li>Multiply the third row by -2 and add it to the fourth row.</li>
    </ul>
</BodyText>

<BodyText>
    Our new matrix will have the identity structure we're after:
</BodyText>

<MathDisp refId=simplexExampleMatrix2>
    \begin{bmatrix}
    1 & -3 & 0 & 0 & 5/2 & 0 \\
    0 & 1  & 0 & 1 & 0   & 0 \\
    0 & 0  & 1 & 0 & 1/2 & 0 \\
    0 & 3  & 0 & 0 & -1  & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
    Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
    \end{bmatrix}
    =
    \begin{bmatrix}
    30 \\ 4 \\ 6 \\ 6
    \end{bmatrix}
</MathDisp>

<BodyText>
    Lastly, as before, we can simply read the values of the objective and the basic variables from the rhs of the system: <Math>Z=30, x_3=4, x_2=6, x_5=6</Math>.
</BodyText>

<Heading level=4 refId=keepIterating>Keep iterating</Heading>

<BodyText>
    We've now completed initialization and the first iteration of the method. So we continue iterating, starting from the optimality testing phase. In this case, the non-basic variable <Math>x_1</Math> has a negative coefficient in the top row of <EquationRef refId=simplexExampleMatrix2/>, so we do not have on optimal solution.
</BodyText>

<BodyText>
    The other non-basic variable, <Math>x_4</Math>, has a positive coefficient in the top row. So <Math>x_1</Math> is our only candidate for entering the basis. Now let's set up our ratio test:

    <MathDisp>
        x_1\text{ column: }\begin{bmatrix}1 \\ 0 \\ 3\end{bmatrix}\
        \text{ rhs: }\begin{bmatrix}4 \\ 6 \\ 6\end{bmatrix}\
        \text{ ratio: }\begin{bmatrix}4/1 \\ - \\ 6/3\end{bmatrix} = \begin{bmatrix}4 \\ - \\ 2\end{bmatrix}
    </MathDisp>
    
    Then at most we can increase <Math>x_1</Math> to 2, as going any further will make <Math>x_5</Math> (the basic variable in the last constraint) negative. So we'll replace <Math>x_5</Math> with <Math>x_1</Math> as the basic variable in the last constraint. Using elimination to build our identity structure yields the following matrix:
</BodyText>

<MathDisp refId=simplexExampleFinalMatrix>
    \begin{bmatrix}
    1 & 0 & 0 & 0 &  3/2 &    1 \\
    0 & 0 & 0 & 1 &  1/3 & -1/3 \\
    0 & 0 & 1 & 0 &  1/2 &    0 \\
    0 & 1 & 0 & 0 & -1/3 &  1/3 \\
    \end{bmatrix}
    \begin{bmatrix}
    Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
    \end{bmatrix}
    =
    \begin{bmatrix}
    36 \\ 2 \\ 6 \\ 2
    \end{bmatrix}
</MathDisp>

<BodyText>
    Thus our new solution is <Math>x_1=2, x_2=6, x_3=2, x_4=0</Math>, and <Math>x_5=0</Math><Footnote>Now might be a good time to check out the simplex visualization in <SectionRef refId=simplexVisualized/> and see if you understand the interpretation of the slack variable values in the solutions we've found.</Footnote>. Since the top row has all positive coefficients, increasing these variables would only serve to decrease the objective. So we've passed the optimality test, and can terminate with the optimal solution!
</BodyText>

<Heading level=3 refId=simplexMatrix>Simplex in matrix notation</Heading>

<BodyText>
    Now that we have the mechanics down, let's tidy up our presentation of the simplex method by writing out the steps in matrix notation. Recall that for simplex we need equality constraints and non-negative variables, so our problem is formulated as in <EquationRef refId=augmentedFormLpMatrix/>. Additionally, we will assume that the <Math>m\times n</Math> matrix <Math>A</Math> is has rank <Math>m</Math> and is <em>non-singular</em>, so in particular <Math>n\geq m</Math> and there are no <em>redundant</em> constraints (which would be any constraint that is a linear combination of some of the others). The rank assumption can be done without loss of generality, because any redundant system can be reduced to non-redundant by removing constraints<Footnote>Note also that if you came to the equality-constrained problem (<Math>\A\x=\b</Math>) via a transformation from the inequality form (<Math>\A\x\leq\b</Math>) by adding slack variables, the slack variables themselves guarantee full row rank.</Footnote>.
</BodyText>

<BodyText>
    At each step of the simplex method, the matrix calculations required rely on the sub-matrix of <Math>\A</Math> corresponding to the basic variables. Let's recall <EquationRef refId=simplexExampleMatrix1/>, the initial set of equations defining our sample LP when we solved it in <SectionRef refId=simplexExample/>. In this case, our matrix <Math>\A</Math> is given by
</BodyText>

<MathDisp>
    \A = \begin{bmatrix}
    1  &  0 & 1 & 0 & 0 \\
    0  &  2 & 0 & 1 & 0 \\
    3  &  2 & 0 & 0 & 1 \\
    \end{bmatrix}
</MathDisp>

<BodyText>
    The sub-matrix we're after at any given iteration, which we'll call <Math>\B</Math> is the subset of columns corresponding to our basic variables. Our initial basis in <SectionRef refId=simplexExample/> was <Math>\{x_3, x_4, x_5\}</Math>, and so the matrix of interest in the first iteration was
</BodyText>

<MathDisp>
    \B = \begin{bmatrix}
    1 & 0 & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1 \\
    \end{bmatrix}
</MathDisp>

<BodyText>
    The vector of variables <Math>\x</Math> can similarly be segmented into the parts corresponding to basic variables, which we'll call <Math>\x_B</Math>, and non-basic variables <Math>\x_N</Math>. So for our example problem at the first iteration we had:
</BodyText>

<MathDisp>
    \x=\begin{bmatrix}x_1\\x_2\\x_3\\x_4\\x_5\end{bmatrix}\quad\x_B=\begin{bmatrix}x_3\\x_4\\x_5\end{bmatrix}\quad\x_N=\begin{bmatrix}x_1\\x_2\end{bmatrix}
</MathDisp>

<BodyText>
    To solve the system of equations at any iteration, we applied elementary row operations to create an identity matrix in the columns corresponding to our basis. But since <Math>\B</Math> is non-singular, it has an inverse <Math>\B\inv</Math> such that <Math>\B\inv\B=\identity</Math>, where <Math>\identity</Math> is an identity matrix. So really, all of our row operations amounted to pre-multiplying the system of equations by <Math>\B\inv</Math>.
</BodyText>

<BodyText>
    Given this, watch what happens when we pre-multiply both sides of our constraints by <Math>\B\inv</Math>:
</BodyText>

<MathDisp refId=basicVariableValues fontSize=0.8>
    \begin{align*}
    \A\x = \b
    & \Leftrightarrow \B\inv\A\x = \B\inv\b && \quad(\text{pre-mult by }\B\inv) \\
    & \Leftrightarrow \B\inv\A\begin{bmatrix}\x_B\\\x_N\end{bmatrix} = \B\inv\b && \quad(\text{partition }x\text{ into basic/non-basic}) \\
    & \Leftrightarrow \B\inv\A\begin{bmatrix}\x_B\\\zeros\end{bmatrix} = \B\inv\b && \quad(\x_N=\zeros\text{ in basic solutions}) \\
    & \Leftrightarrow \B\inv\B\x_B = \B\inv\b && \quad(\x_N=\zeros\text{ takes out other columns of }\A) \\
    & \Leftrightarrow \identity\x_B = \B\inv\b && \quad(\text{definition of inverse}) \\
    & \Leftrightarrow \x_B = \B\inv\b && \quad(\text{definition of identity})
    \end{align*}
</MathDisp>

<BodyText>
    So getting the variable values at a basic solution is as simple as taking <Math>\x_N=\zeros</Math> and <Math>\x_B=\B\inv\b</Math>. If we similarly partition the objective vector <Math>\c</Math> into <Math>\c_B</Math> (corresponding to the basic variables) and <Math>\c_N</Math> (non-basic variables) then the objective value at that solution is:
</BodyText>

<MathDisp>\begin{align*}
    \c\x & = \c_B\x_B + \c_N\x_N && \\
    & = \c_B\x_B && \quad(\x_N=\zeros) \\
    & = \c_B\B\inv\b && \quad(\text{sub above value for }\x_B) \\
    \end{align*}
</MathDisp>

<BodyText>
    So we know how to find the solution for any given basis, but what about determining entering and exiting variables? In <SectionRef refId=simplexExample/> we used the information from the objective (top) row of our problem matrix, so let's re-introduce that here. We can summarize all of our problem information in the following matrix formulation:
</BodyText>

<MathDisp refId=simplexMatrixAllInfo>
    \begin{bmatrix}
    1 & -\c \\
    \zeros & \A
    \end{bmatrix}
    \begin{bmatrix}
    Z \\ \x
    \end{bmatrix}
    =
    \begin{bmatrix}
    0 \\ \b
    \end{bmatrix}
</MathDisp>

<BodyText>
    where once again <Math>Z</Math> is a "variable" representing the objective value. Note that this matches exactly with <EquationRef refId=simplexExampleMatrix1/> from <SectionRef refId=simplexExample/>.
</BodyText>

<Heading level=4 refId=magicMatrix>The magic matrix</Heading>

<BodyText>
    We know from linear algebra that any sequence of elementary matrix operations can be performed simultaneously via matrix multiplication. All we did during the iterations <SectionRef refId=simplexExample/> was apply elementary row operations to the original matrix, so if we can find the correct matrix, recovering all the relevant information is as simple as multiplying by that matrix. With that in mind, let me present to you the following matrix<Footnote>Sorry to just present this to you as if it's a mystical gift from the gods. We could have totally derived it ourselves, but I didn't think it was worth the class time.</Footnote>.
</BodyText>

<MathDisp refId=magicMatrix>
    \begin{bmatrix}1 & \c_B\B\inv \\ \zeros & \B\inv\end{bmatrix}
</MathDisp>

<BodyText>
    Watch what happens when we pre-multiply this on the right-hand side of <EquationRef refId=simplexMatrixAllInfo/>:
</BodyText>

<MathDisp>
    \begin{bmatrix}1 & \c_B\B\inv \\ \zeros & \B\inv\end{bmatrix}
    \begin{bmatrix}
    0 \\ \b
    \end{bmatrix}
    =
    \begin{bmatrix}
    \c_B\B\inv\b \\ \B\inv\b
    \end{bmatrix}
</MathDisp>

<BodyText>
    The top of the result is the objective value <Math>Z</Math> at the current basis solution, and the bottom give the values of <Math>\x_B</Math>. So it looks like <EquationRef refId=magicMatrix/> is precisely the matrix we need to encapsulate all the operations we did during a simplex iteration. Of course, any multiplication we apply on one side of an equation must also be applied to the other side to keep the system valid. So let's apply pre-multiply <EquationRef refId=magicMatrix/> on the left-hand side of <EquationRef refId=simplexMatrixAllInfo/> as well:
</BodyText>

<MathDisp>
    \begin{bmatrix}1 & \c_B\B\inv \\ \zeros & \B\inv\end{bmatrix}
    \begin{bmatrix}
    1 & -\c \\
    \zeros & \A
    \end{bmatrix}
    = \begin{bmatrix}1 & \c_B\B\inv\A - \c \\ \zeros & \B\inv\A\end{bmatrix}
</MathDisp>

<BodyText>
    So for any given basis, the information we require for the simplex method is all present in the following system:
</BodyText>

<MathDisp refId=simplexMatrixGeneralized>
    \begin{bmatrix}1 & \c_B\B\inv\A - \c \\ \zeros & \B\inv\A\end{bmatrix}
    \begin{bmatrix}Z \\ \x\end{bmatrix}
    =
    \begin{bmatrix}
    \c_B\B\inv\b \\ \B\inv\b
    \end{bmatrix}
</MathDisp>

<BodyText>
    The top row coefficients <Math>\c_B\B\inv\A - \c</Math> are often called the <em>reduced costs</em> of the variables at the current solution.
</BodyText>

<BodyText>
    Maybe this looks a little messy when seeing it the first time, but don't let that scare you! Look at all the constituent elements of this system. <Math>\A, \b</Math>, and <Math>\c</Math> are all just vectors/matrices from the problem definition. The only thing you need to do from iteration to iteration is choose the basis, invert <Math>\B</Math> (which is just a sub-matrix of <Math>\A</Math>), then multiply!
</BodyText>

<BodyText>
    To finish off this section, let's use Python to verify that the system we recover from <EquationRef refId=simplexMatrixGeneralized/> matches with what we got during the iterations in <SectionRef refId=simplexExample/>.
</BodyText>

<ColabGist
    colabId=1OrINYKwrk7OGhP1PAypxZ2nYpVbS-V4m
    gistId=e5817bc5b1eb52dce2737969e0ee0c83
    refId=simplexMatrix
    desc="Simplex matrix system confirmation"
/>

<Heading level=3 refId=simplexAlg>Presenting (finally) the simplex algorithm (mostly)</Heading>

<BodyText>
    While we still have some edge cases and gotchas to discuss, we have what we need to now succinctly specify the core of the simplex algorithm. Remember, we assume any LP being solved by the simplex method has been converted (by means of the techniques in <SectionRef refId=lpForms/>) to the equality-constrained form of <EquationRef refId=augmentedFormLpMatrix/>.
    <ul>
        <li>
            <em>Initialize</em>: Determine an initial BF solution (we'll discuss general methods for this in <SectionRef refId=lpOtherConsiderations/>).
        </li>
        <li>
            <em>Iterate</em>:<ul>
                <li><em>Test for optimality</em>: Examine the values of <Math>\c_B\B\inv\A - \c</Math> (i.e. the reduced costs, from the top row of <EquationRef refId=simplexMatrixGeneralized/>) corresponding to the non-basic variables. If all coefficients are non-negative, terminate with the optimal solution. Otherwise, continue with the iteration.</li>
                <li><em>Determine the entering basic variable</em>: Select some variable whose coefficient in <Math>\c_B\B\inv\A - \c</Math> is negative.</li>
                <li><em>Determine the exiting basic variable</em>: Suppose the entering variable from the last step corresponds to the <Math>j</Math>th column of the original constraint matrix <Math>A</Math>. Perform the <em>minimum ratio test</em> from <SectionRef refId=simplexExample/>, dividing the entries of the vector <Math>\B\inv\b</Math> (the right-hand side of the constraints portion of <EquationRef refId=simplexMatrixGeneralized/>) by the entries in the <Math>j</Math>th column of <Math>\B\inv\A</Math>. For the exiting variable, select the basic variable corresponding to the row with the smallest positive ratio.</li>
            </ul>
        </li>
    </ul>
</BodyText>

<BodyText>
    And that's it!
</BodyText>

<Heading level=3 refId=lpOtherConsiderations>Other considerations</Heading>

<BodyText>
    Let's now discuss some implementation details that add slight complications to the simplex algorithm, and would need to be taken care of in any LP solving software.
</BodyText>

<Heading level=4 refId=determineIBFS>Determining the initial BF solution</Heading>

<BodyText>
    In our sample problem, determining an initial BF solution was simple because of the slack variables we added to convert the problem to equality form. But this won't always be possible. By way of example, suppose in our sample LP <EquationRef refId=prototypeLp /> the problem requires plant 3 to operate at full capacity. Then the third constraint becomes an equality constraint, <Math>3x_1 + 2x_2 = 18</Math>. Once slack variables are added to the other constraints, we have the following formulation:
</BodyText>

<MathDisp>
    \begin{align*}
    \max && 3x_1 + 5x_2 & \\
    \st && x_1 + x_3 & = \ \ 4 \\
    && 2x_2 + x_4 & = 12 \\
    && 3x_1 + 2x_2 & = 18 \\
    && x_1,x_2,x_3,x_4 & \geq \ \ 0
    \end{align*}
</MathDisp>

<BodyText>
    There is no longer a nice identity matrix structure on which to base our initial BF solution. In this case, a good trick is to add an extra, so-called <em>artificial variable</em> to the formulation. Additionally, we will add this variable to the objective function with a <em>huge</em> negative coefficient denoted by <Math>M</Math>, a trick known as the <em>Big M method</em>. For the above problem, the artificial variable formulation will look like:
</BodyText>

<MathDisp>
    \begin{align*}
    \max && 3x_1 + 5x_2 - M\hat x_5& \\
    \st && x_1 + x_3 & = \ \ 4 \\
    && 2x_2 + x_4 & = 12 \\
    && 3x_1 + 2x_2 + \hat x_5 & = 18 \\
    && x_1,x_2,x_3,x_4,\hat x_5 & \geq \ \ 0
    \end{align*}
</MathDisp>

<BodyText>
    Note that we require the artificial variable to be non-negative to conform with <EquationRef refId=augmentedFormLpMatrix/>, the form required for simplex. It is further worth noting that the right-hand side of the constraint needs to be non-negative to keep <Math>\hat x_5\geq0</Math> in the initial solution. This is no big deal though, since if the right-hand side were negative we could simply multiply both sides of the constraint by <Math>-1</Math> and use the resultant constraint in the formulation instead.
</BodyText>

<BodyText>
    What good will this do us? We can initialize simplex now with <Math>x_3, x_4</Math>, and <Math>\hat x_5</Math> as our original basis. Further, due to the massive penalty to the objective for including <Math>\hat x_5</Math> in a solution, the artificial variable will eventually leave the basis if possible. So we keep running simplex until either:
    <ul>
        <li><Math>\hat x_5</Math> drops out of the basis, at which point we can remove it from the problem completely and continue iterating simplex as usual.</li>
        <li>We find an optimal solution to the artificial problem that includes <Math>\hat x_5>0</Math>, in which case the original problem was infeasible.</li>
    </ul>
</BodyText>

<BodyText>
    Note that in this example we added only one artificial variable, but it is possible that an artificial variable needs to be added for every constraint. Either way the method is the same: make sure the right-hand sides are non-negative, add the artificial variables, and keep iterating through simplex until the artificial variables are gone.
</BodyText>

<Heading level=4 refId=chooseEnteringVar>Choosing the entering basic variable</Heading>

<BodyText>
    We may choose the entering basic variable to be any non-basic variable with a negative coefficient for <Math>\c_B\B\inv\A - \c</Math>. If there are multiple qualifying non-basic variables, a common rule-of-thumb is to select the variable whose coefficient has the largest absolute value. This is not guaranteed to be a _better_ choice than any of the others. But the thinking is, might as well try the variable that gives you the most bang for your buck as far as objective value change.
</BodyText>

<BodyText>
    But what if there is a tie for the largest absolute value among negative coefficients? You can just pick arbitrarily. As we mentioned, simplex doesn't really care that the largest absolute value is selected anyway. So no special tie-breaking rule is required here.
</BodyText>

<Heading level=4 refId=exitingVarTie>Tie for the exiting basic variable</Heading>

<BodyText>
    We determine the exiting variable based on _minimum ratio test_. But what if the minimum ratio is shared between multiple basic variables? Unlike in the case of the entering basic variable, there actually <em>is</em> something to worry about in this case.
</BodyText>

<BodyText>
    Let's recall what the minimum ratio test was calculating. In each row, we were determining how much we could increase the value of the entering variable before the corresponding basic variable becomes zero. A tie in the minimum ratio test would mean that multiple of the current basic variables would take on a value of 0 when the entering variable joins the basis. Thus in the next basic solution, at least one basic variable will have a value of 0. Such a BF solution is called a <em>degenerate</em> solution, and the 0-valued basic variables are called degenerate variables.
</BodyText>

<BodyText>
    Degeneracy can cause issues for the simplex method. In particular, if a degenerate basic variable is the exiting variable in a subsequent simplex iteration, then the entering variable cannot increase in value from zero without making the degenerate variable take a negative value. So even with the basis change, the solution stayed the same from one iteration to the next. Even worse, this could continue in a cycle such that simplex never stops iterating!
</BodyText>

<BodyText>
    Luckily these looping conditions are exceedingly rare in practical problems. Furthermore, there are rules for selecting the exiting basic variable that are guaranteed to avoid this infinite looping scenario (see e.g. <CitationRef refId=simplexPivotNoLoops/>), though we won't cover them in this course.
</BodyText>

<Heading level=4 refId=noEnteringVar>No exiting basic variable</Heading>

<BodyText>
    Recall that during the minimum ratio test for determining the exiting basic variable, we only consider ratios in the rows where the coefficient on the entering variable is strictly positive. This is because a 0 or negative coefficient would imply that the entering variable could be increased arbitrarily without violating either the corresponding constraint or non-negativity for the corresponding basic variable. If <em>every</em> such coefficient were <Math>\leq 0</Math>, this would imply that the entire system remains feasible no matter how much the entering variable is increased.
</BodyText>

<BodyText>
    Recall that we selected an entering variable whose inclusion would improve the objective value. But if the entering variable can be increased indefinitely, then also the objective can be increased indefinitely, so our problem is unbounded. So if at any point the simplex method comes to an iteration where the entering variable's coefficients are all <Math>\leq0</Math>, we terminate and declare the problem unbounded.
</BodyText>

<Heading level=3 refId=revisedSimplex>The revised simplex method</Heading>

<BodyText>
    We'll end this section on the simplex method with a note on the so-called <em>revised simplex method</em>. Recall that every iteration of the simplex method requires us to find <Math>\B\inv</Math>, the inverse of the columns of <Math>\A</Math> corresponding to the basis variables. In practice, doing this inversion can be computationally expensive. But it is possible to cut down on the computation time by applying a nice trick to derive <Math>\B\inv</Math> for the current iteration from the inverted matrix from the previous iteration. We won't bother with the details here, but you can read about it in <CitationRef refId=classText/>, section 5.4.
</BodyText>
