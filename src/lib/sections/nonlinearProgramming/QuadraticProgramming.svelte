<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Figure from "$lib/Figure.svelte"
    import EquationRef from "$lib/EquationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

    import modSimplexEx from "$lib/images/modified-simplex-example.png";
</script>

<Heading level=2 refId=quadraticProgramming>Quadratic programming</Heading>
<BodyText>
    After spending the last few sections getting more and more general, we will now reverse that trend and talk about a very particular type of model called quadratic programming. This type of problem would arise in e.g. the portfolio optimization problem of <SectionRef refId=portfolioOptimization/> in the case that we're minimizing the amount of risk taken on for a given expected return.
</BodyText>
<BodyText>
    Quadratic programs are nearly identical to linear programs except that now we allow for quadratic terms (i.e. <Math>x_i^2</Math> or <Math>x_ix_j</Math>) in the objective function (but not the constraints). Written in matrix form, a <em>quadratic program</em> is an optimization problem of the form:
</BodyText>

<MathDisp refId=quadraticProgram>\begin{align*}
\max && f(\x)=\c\x - \frac{1}{2}\x\T\Q\x & \\
\st  && \A\x & \leq\b \\
     && \x & \geq\zeros
\end{align*}
</MathDisp>

<BodyText>
    (The superscript <Math>\T</Math> denotes the transpose of a matrix/vector.) For this class, we will require that the objective function be concave. By convention, the matrix <Math>\Q</Math> should be symmetric, so that <Math>q_{ij}</Math> (the entry of <Math>\Q</Math> in its <Math>i</Math>th row and <Math>j</Math>th column) is the same as <Math>q_{ji}</Math> (<Math>j</Math>th row and <Math>i</Math>th column).
</BodyText>

<BodyText>
    Let's take a second to unpack that quadratic term <Math>\frac{1}{2}\x\T\Q\x</Math>. Let's suppose that we have two variables in our problem. Then we'd have
</BodyText>

<MathDisp>\begin{align*}
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
</MathDisp>
<BodyText>
    Since <Math>q_{12}=q_{21}</Math>, this could also be written as
</BodyText>

<MathDisp>2q_{12}x_1x_2 + q_{11}x_1^2 + q_{22}x_2^2.
</MathDisp>
<BodyText>
    Then after we multiply by <Math>-\frac{1}{2}</Math> we get:
</BodyText>

<MathDisp>-q_{12}x_1x_2 - \frac{1}{2}q_{11}x_1^2 - \frac{1}{2}q_{22}x_2^2
</MathDisp>
<BodyText>
    So to create the matrix <Math>Q</Math>, on the off-diagonal elements (<Math>i</Math> and <Math>j</Math> with <Math>i\neq j</Math>) <Math>q_{ij}</Math> will be the negative of the coefficient in front of the <Math>x_ix_j</Math> term after multiplying, while on the diagonal we'll have <Math>q_{ii}</Math> as <em>double</em> the negative of the coefficient on the <Math>x_i^2</Math> term.
</BodyText>
<BodyText>
    As an example, let's take the problem
</BodyText>

<MathDisp>\begin{align*}
\max && 15x_1 + 30x_2 + 4x_1x_2 - 2x_1^2 - 4x_2^2 \\
\st  && x_1 + 2x_2 &\leq 30 \\
     && x_1, x_2 &\geq 0
\end{align*}
</MathDisp>
<BodyText>
    To put this in matrix form like <EquationRef refId=quadraticProgram/>, we need:
</BodyText>

<MathDisp>\begin{align*}
&\x=\begin{bmatrix}x_1 \\ x_2\end{bmatrix}, \qquad \c=\begin{bmatrix}15 & 30\end{bmatrix}, \qquad \Q=\begin{bmatrix}4 & -4 \\ -4 & 8\end{bmatrix}, \\
&\A=\begin{bmatrix}1 & 2\end{bmatrix}, \qquad \b=\begin{bmatrix}30\end{bmatrix}
\end{align*}
</MathDisp>
<BodyText>
    In this case, it is true that the objective is concave. A good way to verify concavity comes from linear algebra theory: the objective is concave if and only if <Math>\Q</Math> is <em>positive semi-definite</em> (**PSD**), which means that <Math>\x\T\Q\x\geq\zeros</Math> for <em>any</em> <Math>\x</Math>. For this class, I'd use the following notebook to verify whether or not a matrix is PSD.
</BodyText>

<ColabGist
    colabId=1Vv5iJYoxwPKDT3QhFBNBgKV_uGnpJ9-s
    gistId=143dea2532ecffbc56b5557d22ce4197
    refId=psdCheck
    desc='Checking if a matrix is PSD'
/>

<Heading level=3 refId=kktForQP>KKT conditions for quadratic programming</Heading>
<BodyText>
    When discussing KKT conditions in <SectionRef refId=optConditions/>, we mentioned how using the conditions directly for your problem will not always be useful, but sometimes examining the conditions for a class problems can lead you to an algorithm for that class. This will be the case for quadratic programming, as we'll soon see.
</BodyText>
<BodyText>
    For a concrete example, let's take the sample quadratic program we just introduced above, and write out the conditions implied by <span class='thmRef' for='thm:kktConditions'></span>. Recall that the objective function for this problem is concave, thus by <span class='thmRef' for='thm:kktConditionsConcaveConvex'></span> these conditions are both necessary and sufficient for optimality:
    <ol>
        <li><Math>\quad x_1,x_2\geq 0</Math></li>
        <li><Math>\quad u_1\geq 0</Math></li>
        <li><Math>\quad x_1 + 2x_2 - 30 \leq 0</Math></li>
        <li><Math>\quad u_1(x_1 + 2x_2 - 30) = 0</Math></li>
        <li>
            <ol type=a>
                <li><Math>\quad 15 + 4x_2 - 4x_1 - u_1 \leq 0</Math></li>
                <li><Math>\quad 30 + 4x_1 - 8x_2 - 2u_1 \leq 0</Math></li>
            </ol>
        </li>
        <li>
            <ol type=a>
                <li><Math>\quad x_1(15 + 4x_2 - 4x_1 - u_1) = 0</Math></li>
                <li><Math>\quad x_2(30 + 4x_1 - 8x_2 - 2u_1) = 0</Math></li>
            </ol>
        </li>
    </ol>
</BodyText>

<BodyText>
    We will now re-express these in a more convenient form (you will see why soon). Let's take the inequalities from conditions 3 and 5 and re-write them as equality constraints with non-negative slack variables:
</BodyText>

<MathDisp>\begin{align*}
x_1 + 2x_2 + v_1 &= 30 \\
-4x_1 + 4x_2 - u_1 + y_1 &= -15 \\
4x_1 - 8x_2 - 2u_1 + y_2 &= -30 \\
\end{align*}
</MathDisp>
<BodyText>
    These new slack variables will let us simplify some of the other conditions. Notice that this first new condition implies
</BodyText>

<MathDisp>-v_1 = x_1 + 2x_2 - 30
</MathDisp>
<BodyText>
    and so we may re-write condition 4 as
</BodyText>

<MathDisp>u_1(-v_1) = 0
</MathDisp>
<BodyText>
    and further, since <Math>v_1=0\Leftrightarrow-v_1=0</Math> we could instead write:
</BodyText>

<MathDisp>u_1v_1 = 0
</MathDisp>
<BodyText>
    Similarly, by rearranging for <Math>y_1</Math> and <Math>y_2</Math> we can replace condition 6 with:
</BodyText>

<MathDisp>\begin{align*}
x_1y_1&=0\\
x_2y_2&=0
\end{align*}
</MathDisp>
<BodyText>
    We call these pairs of variables <Math>(x_1,y_1),(x_2,y_2),(u_1,v_1)</Math> <em>complementary variables</em> since only one of any pair may take a non-zero value. Furthermore, since each of the variables considered is non-negative, the set of conditions
</BodyText>

<MathDisp>\begin{align*}
x_1y_1&=0\\
x_2y_2&=0\\
u_1v_1&=0
\end{align*}
</MathDisp>
<BodyText>
    can be replaced by the single condition, the so-called <em>complementarity constraint**:
</BodyText>

<MathDisp>x_1y_1 + x_2y_2 + u_1v_1 = 0
</MathDisp>
<BodyText>
    Bringing it all together, our revised KKT conditions are:
</BodyText>

<MathDisp refId=quadraticKKTExample>\begin{align*}
x_1 + 2x_2 + v_1 &= 30 \\
-4x_1 + 4x_2 - u_1 + y_1 &= -15 \\
4x_1 - 8x_2 - 2u_1 + y_2 &= -30 \\
x_1y_1 + x_2y_2 + u_1v_1 &= 0 \\
x_1,x_2,y_1,y_2,u_1,v_1 &\geq 0
\end{align*}
</MathDisp>

<BodyText>
    Notice that, with the exception of the complementarity constraint, these conditions are nothing but linear programming constraints!
</BodyText>
<BodyText>
    More generally, for any quadratic programming problem, its KKT conditions can be modified in this manner and reduce to what amounts to a linear program, plus the single complementarity constraint:
</BodyText>

<MathDisp refId=quadraticKKT>\begin{align*}
\Q\x + \A\T\mathbf{u} - \y &= \c\T \\
\A\x + \mathbf{v} &= \b \\
\x,\y,\mathbf{u},\mathbf{v} &\geq \zeros \\
\x\T\y + \mathbf{u}\T\mathbf{v} &= 0
\end{align*}
</MathDisp>

<BodyText>
    Recall that when the constraints are convex (which they are, since linearity implies convexity) and the original objective <Math>\c\x - \frac{1}{2}\x\T\Q\x</Math> is concave, due to <span class='thmRef' for='thm:kktConditionsConcaveConvex'></span> if there is some <Math>\x,\y,\mathbf{u},\mathbf{v}</Math> that satisfies the KKT conditions then <Math>\x</Math> must be an optimal solution for the quadratic program. So an algorithm that finds a <em>feasible</em> solution to <EquationRef refId=quadraticKKT/> will also determine an <em>optimal</em> solution for the quadratic program.
</BodyText>

<Heading level=3 refId=modifiedSimplex>Modified simplex method</Heading>

<BodyText>
    As it turns out, since <EquationRef refId=quadraticKKT/> is <em>almost</em> a set of linear programming constraints, we will be able to solve any quadratic program (with concave objective<Footnote>Actually, the condition for the following algorithm is a little more complicated than than. The algorithm we show assumes that either <Math>\c=\zeros</Math> or the objective is <em>strictly</em> concave, which would require <Math>\Q</Math> to be positive definite instead of just positive semi-definite.</Footnote>) via a slight modification to our dear old simplex method for linear programming.
</BodyText>

<BodyText>
    But let's step back a bit. We said that we only need a feasible solution to <EquationRef refId=quadraticKKT/> in order to optimize the original quadratic problem. How hard can that be? We just added some slack variables, so can't we just use them as our initial basis and be done?
</BodyText>
<BodyText>
    Actually, in general this will not work. Look back at <EquationRef refId=quadraticKKTExample/>. Those right-hand sides are negative, which means the basis <Math>[y_1, y_2, v_1]</Math> isn't feasible. In fact, the right-hand side to these equations is defined by <Math>-c</Math> (the coefficients for the linear portion of the objective function), which are unlikely to be <Math>\leq0</Math> in a real application. So in most cases, using the slack variables as the a basis will not work.
</BodyText>
<BodyText>
    But that's ok! We know how to deal with a system that doesn't have a convenient initial basis - the artificial variable method we learned back in <SectionRef refId=lpOtherConsiderations/>. So let's add artificial variables <Math>z_j</Math> where necessary. In <SectionRef refId=lpOtherConsiderations/> we gave them some large negative objective coefficient <Math>-M</Math> in order to make sure they would leave the basis if possible. But in this case, our objective function might as well have just been 0, since we're just looking for a feasible solution. So it will suffice to let the <Math>z_j</Math> variables have an objective coefficient of -1, i.e. we will maximize <Math>\sum_j-z_j</Math>.
</BodyText>
<BodyText>
    There's just one more thing to consider: how to deal with the complementarity constraint. In our modified simplex algorithm, we'll simply alter the selection of our entering variable so that we never choose a variable to enter the basis if its complementary variable is already basic. Since the basic variables are the only ones with a value <Math>>0</Math>, making sure one of each complementary pair is non-basic suffices to satisfy the complementarity constraint.<Footnote>What happens if the only variables eligible to enter the basis are complementary with respect to another basic variable? In that case, it is possible that the problem is infeasible (though I'm not sure that <em>has</em> to be the case... I need to read up on this a bit more.)</Footnote>
</BodyText>


<h4>Example</h4>
<BodyText>
    We now have what we need to run the modified simplex algorithm on our sample problem. Recall that the problem was
</BodyText>

<MathDisp>\begin{align*}
\max && 15x_1 + 30x_2 + 4x_1x_2 - 2x_1^2 - 4x_2^2 \\
\st  && x_1 + 2x_2 &\leq 30 \\
     && x_1, x_2 &\geq 0
\end{align*}
</MathDisp>
<BodyText>
    and by applying the KKT conditions and adding slack variables we reduced the above optimization problem to the problem of finding a feasible solution to:
</BodyText>

<MathDisp>\begin{align*}
x_1 + 2x_2 + v_1 &= 30 \\
-4x_1 + 4x_2 - u_1 + y_1 &= -15 \\
4x_1 - 8x_2 - 2u_1 + y_2 &= -30 \\
x_1y_1 + x_2y_2 + u_1v_1 &= 0 \\
x_1,x_2,y_1,y_2,u_1,v_1 &\geq 0
\end{align*}
</MathDisp>
<BodyText>
    Let's now do what we outlined above - add artificial variables <Math>z_j</Math> as required to the above system and optimize the linear program that maximizes <Math>\sum_j -z_j</Math> subject to all the above constraints except complementarity:
</BodyText>

<MathDisp>\begin{align*}
\max && -z_1 - z_2 \\
\st  && 4x_1 - 4x_2 + u_1 - y_1 + z_1 & = 15 \\
     && -4x_1 + 8x_2 + 2u_1 - y_2 + z_2 & = 30 \\
     && x_1 + 2x_2 + v_1 &= 30 \\
     && x_1, x_2, y_1, y_2, z_1, z_2, u_1, v_1 \geq 0
\end{align*}
</MathDisp>
<BodyText>
    Now let's write out the relevant matrix system:
</BodyText>

<MathDisp>\begin{bmatrix}
1 &  0 &  0 & 0 &  0 &  0 & 0 & 1 & 1 \\
0 &  4 & -4 & 1 & -1 &  0 & 0 & 1 & 0 \\
0 & -4 &  8 & 2 &  0 & -1 & 0 & 0 & 1 \\
0 &  1 &  2 & 0 &  0 &  0 & 1 & 0 & 0
\end{bmatrix}
\begin{bmatrix}Z \\ x_1 \\ x_2 \\ u_1 \\ y_1 \\ y_2 \\ v_1 \\ z_1 \\ z_2\end{bmatrix}
= \begin{bmatrix}0 \\ 15 \\ 30 \\ 30\end{bmatrix}
</MathDisp>
<BodyText>
    We'd like <Math>z_1</Math> and <Math>z_2</Math> to be part of our basis, so we'll need to eliminate the top row coefficients in their respective columns to obtain:
</BodyText>

<MathDisp>\begin{bmatrix}
1 &  0 & -4 & -3 &  1 &  1 & 0 & 0 & 0 \\
0 &  4 & -4 &  1 & -1 &  0 & 0 & 1 & 0 \\
0 & -4 &  8 &  2 &  0 & -1 & 0 & 0 & 1 \\
0 &  1 &  2 &  0 &  0 &  0 & 1 & 0 & 0
\end{bmatrix}
\begin{bmatrix}Z \\ x_1 \\ x_2 \\ u_1 \\ y_1 \\ y_2 \\ v_1 \\ z_1 \\ z_2\end{bmatrix}
= \begin{bmatrix}-45 \\ 15 \\ 30 \\ 30\end{bmatrix}
</MathDisp>
<BodyText>
    Now we're ready for simplex, with our basic variables being <Math>z_1, z_2</Math> and <Math>v_1</Math>. Variables <Math>x_2</Math> and <Math>u_1</Math> have negative objective row coefficients, so ordinarily they would both be eligible for inclusion in the next basis. But in our modified simplex, we will not choose <Math>u_1</Math> since its complementary variable <Math>v_1</Math> is already in the basis. So our entering variable should be <Math>x_2</Math>, and by the usual ratio test we need to have <Math>z_2</Math> exit the basis.
</BodyText>
<BodyText>
    The following table shows how the simplex method would then progress to solve the problem<Footnote>Don't be thrown off that the coefficient at the top of <Math>Z</Math> column in the table is <Math>-1</Math> vs. the one in my system being <Math>1</Math>. The book used a slightly different setup going from minimization to maximization.</Footnote>:
</BodyText>

<Figure refId="modSimplexEx">
    <img src={modSimplexEx} alt="Modified simplex table" />
    <span slot=caption>Applying the modified simplex method to an example quadratic programming problem <CitationRef refId=classText/></span>
</Figure>
<BodyText>
    As we see in the table, in the next iteration both <Math>x_1</Math> and <Math>u_1</Math> have negative coefficients in the objective row, but <Math>v_1</Math> is still in the basis so we are not permitted to select <Math>u_1</Math> by complementarity. But since <Math>v_1</Math> exits at the same time <Math>x_1</Math> enters, in the next iteration <Math>u_1</Math> <em>is</em> eligible to be added to the basis.
</BodyText>