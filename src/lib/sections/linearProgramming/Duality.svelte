<script>
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import TheoremRef from "$lib/TheoremRef.svelte";
</script>


<Heading level=2 refId=lpDuality>Duality</Heading>
<BodyText>
    In this section we'll discuss the important concept of LP duality. This neat bit of theory will allow us to prove the correctness of the simplex method, and open up avenues to potentially solve LPs faster in practice. We'll also see its fingerprints when discussing post-optimality analysis in <SectionRef refId=lpPostOpt/>. But before we get there, let's start with some light fiction.
</BodyText>

<Heading level=3 refId=corporateTakeover>The corporate takeover</Heading>
<BodyText>
    Suppose you really want to get into the glass manufacturing business. You figure that Wyndor Glass Co. (the company from <SectionRef refId=exampleLp/>, where we derived our sample LP <EquationRef refId=prototypeLp/>) might be willing to sell you time in their facilities. But you don't just want <em>some</em> time, you have big plans and could really use <em>all</em> their facility time for the next week. You decide to propose to buy their facility time at a cost of <Math>y_i</Math> per hour in facility <Math>i\in\{1, 2, 3\}</Math>. How do you know what price to propose?
</BodyText>
<BodyText>
    You know a little bit about linear programming now, so you decide to solve an LP to guide your decision. Naturally, you want to pay the least amount possible for their facility time. Since the facilities are open for 4, 12, and 18 hours per week respectively, your objective is to minimize <Math>4y_1 + 12y_2 + 18y_3</Math>.
</BodyText>
<BodyText>
    But how do you know if Wyndor will accept your offer? At a minimum, you know that they won't accept anything less than $3,000 for an hour at Plant 1 plus three hours at Plant 3. Why? You've done your homework. With that time Wyndor can produce a full batch of Product 1 at a profit of that same $3,000 figure. Similarly, you'll need to at least $5,000 for two hours each at Plant 2 and Plant 3, to account for their profit on batches of Product 2. And they certainly won't be <em>paying</em> you to take their valuable facility time, so for each Plant <Math>i</Math> you must have <Math>y_i\geq 0</Math>.
</BodyText>
<BodyText>
    Brining it all together, you get this formulation:
</BodyText>

<MathDisp refId=prototypeLpDual>
     \begin{align*}
     \min && 4y_1 + 12y_2 + 18y_3 & \\
     \st  &&  y_1 +  3y_3 & \geq 3 \\
          && 2y_2 +  2y_3 & \geq 5 \\
          && y_1,y_2,y_3 & \geq 0
     \end{align*}
</MathDisp>

<BodyText>
    You quickly throw together a Colab notebook to solve this problem. You know that Wyndor can make $36,000 per week with their resources, so the difference between that and the optimal solution solution to this LP is pure profit for you. With visions of riches dancing through your head, you run the notebook and find the optimal objective value is ...
</BodyText>

<ColabGist
     colabId='19SykiilWTXG6QHnaXAD_cstFJK7V3m-0'
     gistId='f5076b20215d0fb98009ba74b83bb930'
     refId=corpTakeLp
     desc='Corporate takeover LP'
/>

<BodyText>
     ... that same $36,000? What an odd coincidence.
</BodyText>

<Heading level=3 refId=dualLpDef>Defining the dual LP</Heading>

<BodyText>
    Actually, this is no coincidence at all. It's simply a consequence of LP duality. For every LP, there is a second, associated LP that relates to it in a special way. We call the second LP the <em>dual</em> LP, and the original the <em>primal</em>. As it turns out, the problem <EquationRef refId=prototypeLpDual/> we just formulated is the dual problem of our original sample LP <EquationRef refId=prototypeLp/>.
</BodyText>
<BodyText>
    Let's look a little closer at the relationship between <EquationRef refId=prototypeLp/> and <EquationRef refId=prototypeLpDual/>. To make things more obvious, let's write them out next to each other in matrix form. We'll also rearrange the order of the data and variable matrices in the dual problem:
</BodyText>

<MathDisp fontSize=0.9>
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
</MathDisp>

<BodyText>
     Side-by-side like this, it's easy to see the connection. The constraint matrix didn't change at all, though we're pre-multiplying the variables in the dual as opposed to post-multiplying in the primal. Further, the constraint right-hand side values from the primal became the objective coefficients in the dual, and vice-versa. It's kinda like the whole problem fell on its side
     <Footnote>
          This "fell on its side" thing is maybe easier to see if you post-multiply the dual variables instead:
          <MathDisp fontSize=0.8>
               \begin{align*}
               \min && \begin{bmatrix}4 & 12 & 18\end{bmatrix}\begin{bmatrix}y_1 \\ y_2 \\ y_3\end{bmatrix} & \\
               \text{s.t.} && \begin{bmatrix}1 & 0 & 3 \\ 0 & 2 & 2\end{bmatrix}\begin{bmatrix}y_1 \\ y_2 \\ y_3\end{bmatrix} & \geq \begin{bmatrix}3 \\ 5\end{bmatrix} \\
               && y_1,y_2,y_3 & \geq 0
               \end{align*} 
          </MathDisp>
     </Footnote>.
</BodyText>

<BodyText>
     In general, the dual for the standard form LP is defined as follows:
</BodyText>

<MathDisp refId=standardLpDual>
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
</MathDisp>
<BodyText>
    But what if your problem is in a different form? Can we still talk about its dual in the same way? As you might have guessed, there is indeed a dual problem for your LP no matter how it is stated. The following gives another primal/dual pair (notice the lack of a non-negativity requirement for the dual variables):
</BodyText>

<MathDisp refId=augmentedLpDual>
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
</MathDisp>

<Theorem refId=dualEqualityForm hideProof={true}>
     <BodyText>
          The systems in <EquationRef refId=augmentedLpDual/> give a valid primal/dual pair.
     </BodyText>
     <span slot=proof>
          <BodyText>
               The concept for this proof is to transform the primal problem from <EquationRef refId=augmentedLpDual/> into inequality form so that we can use the definition of <EquationRef refId=standardLpDual/> to get the corresponding dual problem, then see what shakes out. To that end, let's use our trick from <SectionRef refId=lpConstraintTransform/> to convert to inequality constraints by replacing each <Math>=</Math> constraint by one <Math>\leq</Math> and one <Math>\geq</Math> constraint:
          </BodyText>
          <MathDisp>
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
          </MathDisp>
          <BodyText>
               Now we can use <EquationRef refId=standardLpDual/> to find the dual. For reasons that will become clear later, we'll replace the usual <Math>\y</Math> variable vector with two separate vectors <Math>\mathbf{w}</Math> and <Math>\mathbf{z}</Math>, corresponding to the positive and negative constraint matrices.
          </BodyText>

          <MathDisp>
               \begin{align*}
               &\min && \begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\b\\-\b\end{bmatrix} &
               \\
               &\text{s.t.} && \begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\A\\-\A\end{bmatrix}\geq \c &
               \\
               &&& \mathbf{w},\mathbf{z}\geq0 &
               \end{align*}
          </MathDisp>
          <BodyText>
               Now, watch what happens when we multiply out the objective: <Math>\begin{bmatrix}\mathbf{w}&\mathbf{z}\end{bmatrix}\begin{bmatrix}\b\\-\b\end{bmatrix} = \mathbf{w}\b - \mathbf{z}\b</Math>, and because of the distributive property of matrix multiplication, we have <Math>\mathbf{w}\b - \mathbf{z}\b = (\mathbf{w}-\mathbf{z})\b</Math>. Similar can be done with the constraints, giving:
          </BodyText>

          <MathDisp>
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
          </MathDisp>

          <BodyText>
               Perhaps this looks familiar. This is exactly the trick we highlighted in <SectionRef refId=lpVariableBoundTransform/> for transforming between non-negative variables and unrestricted variables. We can consider <Math>\mathbf{w}</Math> and <Math>\mathbf{z}</Math> as the respective "positive" and "negative" parts of some other variable <Math>\y</Math>. Because <Math>\mathbf{w}</Math> and <Math>\mathbf{z}</Math> always appear together in the formulation as <Math>\mathbf{w}-\mathbf{z}</Math>, we can replace <Math>\mathbf{w}-\mathbf{z}</Math> by the unrestricted <Math>\y</Math> and get an equivalent formulation. So the dual turns into
          </BodyText>

          <MathDisp>
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
          </MathDisp>

          <BodyText>
               which is precisely the dual form from <EquationRef refId=augmentedLpDual/>.
          </BodyText>
     </span>
</Theorem>

<Heading level=3 refId=dualLpProps>Properties of the dual LP</Heading>

<BodyText>
    A nice fact about duality is that the primal-dual relationship is symmetric, i.e.
</BodyText>

<Theorem refId=dualOfDual hideProof={true}>
     <BodyText>
         The dual of the dual problem is equivalent to the primal problem.
     </BodyText>
     <span slot=proof>
          <BodyText>
               The steps required for his proof are encapsulated in the following diagram:
           </BodyText>
           
           <MathDisp fontSize=0.9>
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
           </MathDisp>
           <BodyText>
               The top-left problem is the dual of the standard form LP. We don't know how to take its dual correctly, so we should put it in the form of <EquationRef refId=standardFormLpMatrix/> since we know what that dual looks like (<EquationRef refId=standardLpDual/>). Using our tricks from <SectionRef refId=lpForms/>, we multiply the objective by -1 to convert from minimization to maximization, and we multiply both sides of the inequalities by <Math>-\identity</Math> to change from <Math>\geq</Math> constraints to <Math>\leq</Math> constraints, obtaining the top-right problem.
           </BodyText>
           <BodyText>
               We move from the top-right to the bottom-right simply by taking the dual from <EquationRef refId=standardLpDual/>. So we switch the objective function coefficients with the constraint right-hand side, change from maximization to minimization, and multiply the variables on the other side of the constraint matrix.
           </BodyText>
           <BodyText>
               The move from bottom-right to bottom-left is the same as the move from top-left to top-right, i.e. multiplying the objective by -1 and the constraints by <Math>-\identity</Math>. What we end up with is precisely the original standard-form problem <EquationRef refId=standardFormLpMatrix/>.
           </BodyText>
     </span>
</Theorem>

<BodyText>
    The solutions to the primal and dual problems hold a special relationship too, in that the objective value from one always bounds the possible objective values for the other:
</BodyText>

<Theorem refId=weakDuality name='weak duality'>
     <BodyText>
         If <Math>\x</Math> is a feasible solution for the primal problem and <Math>\y</Math> is a feasible solution for the dual problem (as defined in <EquationRef refId=standardLpDual/>), then
     </BodyText>
     <MathDisp>
          \c\x\leq\y\b.
     </MathDisp>
     <span slot=proof>
          <BodyText>
               The proof for this is just some simple linear algebra. <Math>\x</Math> being feasible for the primal problem means <Math>\A\x\leq\b</Math>. Pre-multiplying both sides by <Math>\y</Math> will give us:
          </BodyText>
          <MathDisp>
               \A\x\leq\b
               \Leftrightarrow
               \y\A\x\leq\y\b.
          </MathDisp>
          <BodyText>
               Note the above wouldn't necessarily hold if some values of <Math>\y</Math> were negative, but since <Math>\y</Math> is feasible for the dual we must have <Math>\y\geq0</Math>, by definition of the dual problem.
          </BodyText>
          <BodyText>
               Similarly, with <Math>\y</Math> being feasible to the dual, we have <Math>\y\A\geq\c</Math>. Post-multiplying both sides by <Math>\x</Math> (which similarly must be non-negative) gives:
          </BodyText>
          <MathDisp>
               \y\A\geq\c
               \Leftrightarrow
               \y\A\x\geq\c\x.
          </MathDisp>
          <BodyText>
               Combining the two resultant inequalities gives us what we need:
          </BodyText>
          <MathDisp>
               \c\x\leq\y\A\x\leq\y\b.
          </MathDisp>
     </span>
</Theorem>

<BodyText>
    An immediate corollary<Footnote>A <em>corollary</em> is like a theorem, and we could just as easily have called this a theorem as well. But generally we use the word corollary when the result follows almost directly from a result presented previously.</Footnote> of <TheoremRef refId=weakDuality/> is the following:
</BodyText>

<Theorem thmType=corollary refId=dualSameValueThenOptimal>
     <BodyText>
          If <Math>\x</Math> is a solution to the primal problem and <Math>\y</Math> is a solution to the dual problem such that <Math>\c\x=\y\b</Math>, then <Math>\x</Math> and <Math>\y</Math> are optimal solutions to the primal and dual problems, respectively.
     </BodyText>
     <span slot=proof>
          <BodyText>
               Since <Math>\y</Math> is feasible for the dual problem, <TheoremRef refId=weakDuality/> tells us that no primal solution can have a value higher than <Math>\y\b</Math>. Then since <Math>\c\x=\y\b</Math>, <Math>\x</Math> attains this highest possible value, thus it is optimal. A similar argument gives that <Math>\y</Math> is optimal for the dual.
          </BodyText>
     </span>
</Theorem>

<BodyText>
     Among other things, <TheoremRef refId=weakDuality/> tells us that the problem <EquationRef refId=prototypeLpDual/> we formulated in <SectionRef refId=corporateTakeover/> had no hopes of attaining an objective value higher than the optimal for <EquationRef refId=prototypeLp/>. So 36 was the highest value we could have hoped for. And it turns out we were actually able to attain that value in the dual problem. Was this just luck? No, as it turns out, thanks to the following theorem.
 </BodyText>

 <Theorem refId=strongDuality name='strong duality'>
     <BodyText>
          If <Math>\x^*</Math> is an optimal solution for the primal problem and <Math>\y^*</Math> is an optimal solution for the dual problem, then
     </BodyText>     
     <MathDisp>
          \c\x^*=\y^*\b.
     </MathDisp>
     <span slot=proof>
          <BodyText>
               For this proof we'll make use of the alternate primal/dual formulation of <EquationRef refId=augmentedLpDual/> and our knowledge of the simplex method. By assumption, the primal problem has an optimal solution <Math>x^*</Math>. Thus in the final simplex iteration the reduced costs are all non-negative. That is, for the optimal basis we have <Math>\c_B\B\inv\A - \c\geq0</Math> (you may want to check <EquationRef refId=simplexMatrixGeneralized/> to refresh your memory on what the system of equations looks like for a given simplex basis).
          </BodyText>
          <BodyText>
              Let's take the vector <Math>\y</Math> defined as <Math>\y=\c_B\B\inv</Math>. Subbing that into the above inequality, we have
              <MathDisp>
                   \y\A - \c\geq0 \Leftrightarrow \y\A \geq\c
              </MathDisp>
              which implies that <Math>\y</Math> is a feasible solution for the dual. Furthermore, noting that <Math>\x_B^*=\B\inv\b</Math> (by <EquationRef refId=basicVariableValues/>), we have
              <MathDisp>
                    \begin{align*}
                    \y\b &= \c_B\B\inv\b && \quad(\text{definition of }\y) \\
                         &= \c_B\x^*_B && \quad(\text{above note}) \\
                         &= \c\x^* && \quad(\x_N = \zeros) \\
                    \end{align*}
              </MathDisp>
              So not only is <Math>\y</Math> feasible for the dual, its objective value in the dual is equivalent to the objective value for <Math>\x^*</Math> in the primal. So by <span class='thmRef' for='thm:dualSameValueThenOptimal'></span> <Math>\y^*</Math> is an optimal solution for the dual, and <Math>\x^*,\y^*</Math> satisfy the condition of the theorem.
              </BodyText>
     </span>
 </Theorem>


<Heading level=3 refId=simplexAndDual>Simplex and the dual problem</Heading>
<BodyText>
    Hold on a second - do you see what we did in that last proof? We proved the theorem, sure, but there's more. This proof was constructive, meaning that we didn't just prove that the primal and dual optimal values are equal, we showed how to find <Math>\y^*</Math> from <Math>\x^*</Math>. Not only that, but we showed how to derive <Math>\y^*</Math> <em>using the simplex method</em>! Simplex gives its own proof of optimality! All that time setting up the simplex method in <SectionRef refId=simplex/> we only gestured at why it works. But now we have the proof of correctness sitting right in front of us!
</BodyText>

<Theorem refId=simplexWorks>
     <BodyText>
         Given a linear program with a bounded objective, the simplex method will terminate at an optimal solution. Moreover, an optimal solution to the dual problem may be retrieved from the optimal basis via <Math>\c_B\B\inv</Math>.
     </BodyText>
     <span slot=proof>
          <BodyText>
               We'll first note that technically we need to bypass the cycling issue from degenerate solutions discussed in <SectionRef refId=lpOtherConsiderations/>. But assuming that is taken care of, the simplex method terminates at some solution <Math>\x^*</Math>. Taking the associated basis and following the steps of the proof to <TheoremRef refId=strongDuality/>, we obtain a solution <Math>\y^*=\c_B\B\inv</Math> such that <Math>\y^*\b = \c\x^*</Math>. Thus by <TheoremRef refId=dualSameValueThenOptimal/> <Math>x^*</Math> and <Math>y^*</Math> are both optimal for their respective problems.
          </BodyText>
     </span>
</Theorem>

<BodyText>
    Also implied by the proof of <TheoremRef refId=strongDuality/>: Taking <Math>\y=\c_B\B\inv</Math> for the any basis gives us a solution <Math>\y</Math> to the dual problem such that <Math>\y^*\b = \c_B\x_B^*</Math>. However, due to <span class='thmRef' for='thm:strongDuality'></span>, we know that no <em>feasible</em> solution to <Math>\y</Math> can have any value lower than the optimal <Math>\c\x^*</Math>. So the <Math>\y</Math> generated is feasible if and only if the basis generating it is optimal for the primal problem.
</BodyText>
<BodyText>
    We now know that the simplex method will generate optimal solutions for <em>both</em> the primal problem <em>and</em> the dual problem. This gives us an opportunity: what if for some reason we believe simplex will run faster on the dual problem than it would on the primal problem. As an example, the number of constraints in a problem is often related to the number of simplex iterations required to solve it. Since the constraints in the primal correspond directly to variables in the dual (and vice-versa) if you have a problem with many more constraints than variables, it stands to reason that simplex may solve the dual problem faster than the primal. Since simplex gives solutions to both the primal and dual problems (and the dual of the dual is the primal), running simplex on the dual may get us an optimal solution faster.
</BodyText>
<BodyText>
    Another notion worth mentioning is the <em>dual simplex</em> method. We will not discuss it in any detail here,<Footnote>Interested readers can check <CitationRef refId=classText/>, section 8.1.</Footnote> but it is an algorithm applied to the primal problem whose steps look as if it were regular simplex being applied to the dual problem. It can be useful to have both methods (primal and dual simplex) available when solving an LP, and most solvers do exactly this.
</BodyText>

<Heading level=3 refId=primalDualFeasBound>Primal/dual feasibility/boundedness relationships</Heading>
<BodyText>
    To wrap up the duality section, let's discuss how the feasibility and boundedness of the primal and dual problems relate to one another. The possibilities are summarized in the following result:
</BodyText>

<Theorem refId=primalDualRelations>
     <BodyText>
          The following relationships always hold between the primal LP and its associated dual:
          <ol>
               <li>If the primal problem is feasible with a bounded objective, then so is the dual.</li>
               <li>If the primal problem is feasible but with an unbounded objective, then the dual is infeasible.</li>
               <li>If the primal problem is infeasible, then the dual has either no feasible solutions or an unbounded objective function.</li>
          </ol>
     </BodyText>
     <span slot=proof>
          <BodyText>
               Case 1 follows directly from <TheoremRef refId=simplexWorks/>. Case 2 is a corollary of weak duality (<TheoremRef refId=weakDuality/>), since the existence of a dual solution would immediately bound the primal objective.
          </BodyText>
          <BodyText>
               Case 3 can be proven by contradiction using <TheoremRef refId=simplexWorks/> (and <TheoremRef refId=dualOfDual/>): Suppose that the dual is neither infeasible nor unbounded. Then it must be feasible with a bounded objective, which by <TheoremRef refId=simplexWorks/> means that applying simplex to this problem will yield an optimal, and therefore feasible, solution to the primal as well, a contradiction.
          </BodyText>
     </span>
</Theorem>
