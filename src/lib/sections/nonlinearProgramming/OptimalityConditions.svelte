<script lang="ts">
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import TheoremRef from "$lib/TheoremRef.svelte";
</script>

<Heading level=2 refId=optConditions>Optimality conditions</Heading>
<BodyText>
    During our exploration of unconstrained optimization in the previous sections, we already knew some conditions for recognizing optimal solutions from your calculus classes. For example, for <Math>x</Math> to be an optimizer for some function single-variable function <Math>f</Math>, we need <Math>f'(x)=0</Math> (or <Math>\nabla f(\x)=\zeros</Math> in the multivariate case). With further assumptions on the character of <Math>f</Math> (e.g. convexity or concavity) we could go from necessary conditions to sufficient conditions.
</BodyText>
<BodyText>
    These same conditions will not necessarily hold in the case of constrained optimization, however. Say we'd like to maximize <Math>f(x)=-x^2</Math> but add the constraint <Math>x\geq1</Math>. Now the function's only critical point <Math>x=0</Math> is no longer feasible, and the constrained optimizer <Math>x=1</Math> does not satisfy <Math>f'(x)=0</Math>.
</BodyText>
<BodyText>
    So clearly the conditions for optimal solutions are not the same when constraints are added. Luckily we <em>do</em> know of similar conditions in the constrained case. They are not always practical for helping us <em>find</em> an optimal solution directly, but they can at least provide a sanity check when verifying that a solution found by other means is indeed optimal. Further, we'll discuss how the theory can be used to build optimization algorithms that <em>are</em> useful in practice.
</BodyText>

<Heading level=3 refId=lagrangeMults>Lagrange multipliers</Heading>
<BodyText>
    But before we get to the general optimality conditions, it will be helpful to recall a technique you may have seen in your calculus classes. For now, let's suppose our optimization problem has only equality constraints. That is, let <Math>f</Math> be a function of <Math>n</Math> variables that we'd like to optimize, while also satisfying the <Math>m</Math> constraints:
</BodyText>

<MathDisp>\begin{align*}
g_1(\x) &= b_1 \\
g_2(\x) &= b_2 \\
& \vdots \\
g_m(\x) &= b_m \\
\end{align*}
</MathDisp>
<BodyText>
    One way to deal with this problem is the <em>method of Lagrange multipliers</em>  For this method, you construct the so-called <em>Lagrangian function</em> <Math>h</Math>, which is a function of both <Math>\x\in\R^n</Math> and a new vector of variables <Math>\boldsymbol\lambda\in\R^m</Math> (known as the <em>Lagrange multipliers</em>):
</BodyText>

<MathDisp refId=lagrangainFunction>h(\x,\boldsymbol\lambda) = f(\x) - \sum_{i=1}^m\lambda_i(g_i(x) - b_i)
</MathDisp>

<BodyText>
    Now <Math>h</Math> is just an ordinary function of <Math>n + m</Math> variables. If we wanted to optimize the unconstrained function <Math>h</Math> we could determine its gradient and set it equal to zero. The resulting system of equations (writing the partial derivative first for the <Math>\x</Math> variables then the <Math>\boldsymbol\lambda</Math> variables) is:
</BodyText>

<MathDisp>f'_{x_1}(\x)-\sum_{i=1}^m\lambda_ig'_{x_i}(\x) = 0\\
\vdots \\
f'_{x_n}(\x)-\sum_{i=1}^m\lambda_ig'_{x_n}(\x) = 0\\
b_1-g_1(\x) = 0\\
\vdots \\
b_m-g_m(\x) = 0\\
</MathDisp>
<BodyText>
    The key thing to notice is that when this system is satisfied, by the final <Math>m</Math> equations we have <Math>g_i(\x)=b_i</Math> for all <Math>i</Math>, i.e. every critical point of <Math>h</Math> must satisfy the constraints to the original problem! Furthermore, this implies that <Math>h(\x,\boldsymbol\lambda)=f(\x)</Math> for every critical point of <Math>h</Math>, so if one of these points <Math>(\x^*,\boldsymbol\lambda^*)</Math> is an optimizer for <Math>h</Math> then <Math>\x^*</Math> must be an optimizer for the constrained problem.
</BodyText>

<Heading level=4 refId=langraneMultExample>Example</Heading>
<BodyText>
    Suppose that we'd like to optimize the function <Math>f(x_1, x_2)=x_1^2+2x_2</Math> subject to the constraint <Math>x_1^2+x_2^2=1</Math>. Then the Lagrangian function <Math>h</Math> (<EquationRef refId=lagrangainFunction/>) is given by:
</BodyText>

<MathDisp>h(x_1,x_2,\lambda_1)=x_1^2+2x_2-\lambda_1(x_1^2+x_2^2-1).
</MathDisp>
<BodyText>
    Setting the partial derivatives equal to zero leaves us with the system:
</BodyText>

<MathDisp>\begin{align*}
2x_1 - 2\lambda_1x_1 & = 0 && \qquad(x_1\text{ partial derivative})\\
2 - 2\lambda_1x_2 & = 0 && \qquad(x_2\text{ partial derivative})\\
-(x_1^2 + x_2^2 - 1) & = 0 && \qquad(\lambda_1\text{ partial derivative})
\end{align*}
</MathDisp>
<BodyText>
    Solving these systems is not always straightforward. But we can manage it here with a little logical reasoning. The first equation can only be satisfied by <Math>\lambda = 1</Math> or <Math>x_1=0</Math>. So let's examine each of the possibilities in turn and see what they might imply for the other equations.
</BodyText>
<BodyText>
    If <Math>\lambda=1</Math>, then the second equation would require <Math>x_2=1</Math>, and subsequently the third equation requires <Math>x_1=0</Math>. If <Math>x_1=0</Math>, then the third equation would require either <Math>x_2=1</Math> or <Math>x_2=-1</Math>, and either of those solutions can be accommodated in the second equation with a properly chosen <Math>\lambda</Math>. So in terms of the original variables <Math>x_1,x_2</Math>, the potential optimal solutions are either <Math>(0, 1)</Math> or <Math>(0, -1)</Math>.
</BodyText>

<Heading level=3 refId=kktConditions>KKT conditions</Heading>

<BodyText>
    The Lagrange multiplier method is a good lead-in to the general optimality conditions for nonlinear programming, known as the <em>Karush-Kuhn-Tucker conditions</em> (or <em>KKT conditions</em> for short)<Footnote>The conditions were first broadly known as the Kuhn-Tucker conditions due to a 1951 paper by two mathematicians named Kuhn and Tucker. Later, someone noticed that Karush had developed the same theory a dozen years earlier in his Masters thesis!</Footnote>. These extend the work in the previous section by including the case of inequality constraints. So for completeness, the (very general) form of the problems we'll be dealing with here is:
</BodyText>

<MathDisp>\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall \ i\in\{1,\dots,m\} \\
     && \x & \in \R^n_+
\end{align*}
</MathDisp>

<BodyText>
    Notice that we're now requiring non-negative variables <Math>\x\in\R^n_+</Math>, in contrast to the definition I gave at the start of the non-linear programming section.
</BodyText>
<BodyText>
    As usual, we will assume that all of our functions <Math>f, g_1, \dots, g_m</Math> are differentiable. Furthermore, for the following result to hold we need the functions to satisfy certain other so-called <em>regularity conditions</em><Footnote>One simple condition is for all the constraints to be linear functions, which will apply quite often in this class.</Footnote>, though we will not be covering these conditions in this class. Suffice it to say, you can assume that the conditions hold for any problem I give you in this class.
</BodyText>

<BodyText>
    With that out of the way, let's present the main result
</BodyText>
<Theorem refId=kktConditions>
    <BodyText>
        Assume <Math>f,g_1,\dots,g_m</Math> are differentiable functions satisfying certain regularity conditions. Then <Math>\x^*\in\R^n</Math> can be an optimal solution for the nonlinear program only if there exists <Math>\mathbf{u}\in\R^m</Math> such that all the following conditions are satisfied:
        <ol>
            <li><Math>\x^*\geq\zeros</Math></li>
            <li><Math>\mathbf{u}\geq\zeros</Math></li>
            <li><Math>g_i(\x^*) - b_i\leq 0 \quad \forall i\in\{1,2,...,m\}</Math></li>
            <li>If <Math>u_i > 0</Math> then
                <MathDisp>
                    g_i(\x^*) - b_i = 0
                </MathDisp>
                for all <Math>i\in\{1,2,...,m\}</Math></li>
            <li><Math>f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*)\leq0 \quad \forall j\in\{1,2,\dots,n\}</Math></li>
            <li>If <Math>x^*_j > 0</Math> then
                <MathDisp>
                    f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*) = 0 \quad
                </MathDisp>
                for all <Math>j\in\{1,2,\dots,n\}</Math></li>
        </ol>
    </BodyText>
</Theorem>

<BodyText>
    There is a lot here, but some of this should look familiar. Items to note:
    <ul>
        <li>Conditions 1 and 3 are simply the conditions for a feasible solution.</li>
        <li>We've seen the left-hand side of condition 5 when studying Lagrange multipliers in the previous section. It's what you get when you take the partial derivative of the Lagrangian function with respect to <Math>x_j</Math> (with <Math>u_i</Math> taking the place of our Lagrange multiplier <Math>\lambda_i</Math>). Previously we set it equal to zero to find candidate solutions, but here we have <Math>\leq0</Math>.</li>
        <li>Condition 2 seems natural when you consider the <Math>u_i</Math> variables in the context of the Lagrangian method, where you use it to multiply the equations. Since the constraints are now inequalities, it makes sense to keep them non-negative to preserve the direction of the inequality.</li>
        <li>Condition 4 looks a little foreign, but we can draw an analogy between <Math>u_i</Math> and the dual variables (<SectionRef refId=lpDuality/>) and shadow prices (<SectionRef refId=shadowPrices/>) of linear programming. There, if some resource was used up completely at the optimal solution (so the associated resource constraint has <Math>\mathbf{a}_i\x^*=b_i</Math>) then the corresponding shadow price for that resource (i.e. the dual variable associate with the constraint) had a positive value, since likely procuring more of it would improve the objective value.</li>
        <li>Condition 6 is... well, I don't have a simple intuition for that one.</li>
    </ul>
</BodyText>

<BodyText>
    I'll note again that these are <em>necessary</em> conditions for an optimal solution, not <em>sufficient</em> ones. So even if some <Math>\x'</Math> satisfies these conditions, it does not necessarily mean that <Math>\x'</Math> is an optimal solution. But there are conditions under which the above KKT conditions do guarantee optimality (maybe you can guess what they are...)
</BodyText>

<Theorem refId=kktConditionsConcaveConvex>
    <BodyText>
        Consider the setup of <TheoremRef refId=kktConditions/> and futher assume that <Math>f</Math> is a concave function and that <Math>g_1,g_2,\dots,g_m</Math> are each convex functions. Then <Math>\x^*</Math> is an optimal solution for the nonlinear program if and only if the KKT conditions of <TheoremRef refId=kktConditions/> hold.
    </BodyText>
</Theorem>

<Heading level=4 refId=kktExample>Example</Heading>
<BodyText>
    Consider the following nonlinear program:
</BodyText>

<MathDisp>\begin{align*}
\max && \ln(x_1 + 1) + x_2 \\
\st  && 2x_1 + x_2 & \leq 3 \\
     && x_1,x_2 & \geq0
\end{align*}
</MathDisp>

<BodyText>
    (here "<Math>\ln</Math>" denotes the natural logarithm). One can verify that the objective <Math>f(x_1,x_2)=\ln(x_1 + 1) + x_2</Math> is concave and the lone constraint <Math>g_1(x_1,x_2)=2x_1 + x_2</Math> is convex, so in this case the KKT conditions are both necessary and sufficient for optimality. Since there is only one constraint, there is only one corresponding multiplier <Math>u_1</Math> to contend with. Let's list out all of the KKT requirements for the given problem:
    <ol>
        <li>Non-negativity of <Math>\x</Math>:
            <MathDisp>   x_1, x_2 \geq 0:
            </MathDisp></li>
        <li>Non-negativity of <Math>\mathbf{u}</Math>:
            <MathDisp>   u_1 \geq 0
            </MathDisp></li>
        <li>All constraints are satisfied. There is only one constraint, so this is just <Math>g_1(x_1,x_2) - b_1 \leq 0</Math>, i.e.
            <MathDisp>   2x_1 + x_2 - 3 \leq 0
            </MathDisp></li>
        <li>If <Math>u_1 > 0</Math> then <Math>g_1(\x) - b_1 = 0</Math>, which we can state equivalently as
            <MathDisp>   u_1(2x_1 + x_2 - 3) = 0
            </MathDisp></li>
        <li><Math>f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*)\leq0</Math> for <Math>j\in\{1,2\}</Math>
            <ol type=a>
                <li>(<Math>j=1</Math>)
                    <MathDisp>   \frac{1}{x_1 + 1} - 2u_1 \leq 0
                    </MathDisp>
                </li>
                <li>(<Math>j=2</Math>)
                    <MathDisp>   1 - u_1 \leq 0
                    </MathDisp>
                </li>
            </ol>
        </li>
        <li>If <Math>x^*_j > 0</Math> then <Math>f'_{x_j}(\x^*) - \sum_{i=1}^mu_ig'_{x_j}(\x^*) = 0</Math> for <Math>j\in\{1,2\}</Math>, which we can state equivalently as:
            <ol type=a>
                <li>
                    (<Math>j=1</Math>)
                    <MathDisp>
                        x_1\left(\frac{1}{x_1 + 1} - 2u_1\right) = 0
                    </MathDisp>
                </li>
                <li>
                    (<Math>j=2</Math>)
                    <MathDisp>
                        x_2(1 - u_1) = 0
                    </MathDisp>
                </li>
            </ol>
        </li>
    </ol>
</BodyText>

<BodyText>
    Once again, there is not necessarily a good way to simultaneously solve for all the conditions in general. But we can reason our way to a solution in this case. Note:
    <ul>
        <li>From 5b we know <Math>u_1\geq 1</Math>.</li>
        <li>From 1 we know <Math>x_1\geq0</Math>.</li>
        <li>Therefore, the <Math>\frac{1}{x_1+1}</Math> term from 5a must be between 0 and 1, while the <Math>-2u_1</Math> term is at most -2. Thus we have
            <MathDisp>  \frac{1}{x_1 + 1} - 2u_1 < 0
            </MathDisp>
        </li>
        <li>So then by 6a we must have <Math>x_1=0</Math>.</li>
        <li>
            Since we already found <Math>u_1\geq1</Math> from 5b, condition 4 tells us that
            <MathDisp>
                2x_1 + x_2 - 3 = 0
            </MathDisp>
        </li>
        <li>That equation (along with <Math>x_1=0</Math>) implies <Math>x_2=3</Math>.</li>
        <li>Since <Math>x_2\neq0</Math>, condition 6b implies <Math>u_1=1</Math>.</li>
    </ul>
</BodyText>

<BodyText>
    So the only solution that can simultaneously satisfy all the conditions is <Math>x_1=0,x_2=3,u_1=1</Math>. Indeed, if you plug those numbers into all of the conditions, you'll see that they are valid for all of them. Thus by <TheoremRef refId=kktConditionsConcaveConvex/>, <Math>\x^*=(0, 3)</Math> is optimal for the problem.
</BodyText>

<Heading level=3 refId=kktDuality>KKT and duality</Heading>
<BodyText>
    While determining the KKT conditions is not usually directly applicable to solving nonlinear optimization problems, as a theoretical tool they are often used indirectly. One application is a generalized duality theory that exists for nonlinear programming. To wrap up this section, I'll quote a passage from<CitationRef refId=classText/> talking about nonlinear duality:
</BodyText>

<BlockQuote>
    <BodyText>
        [A theory of duality] has been developed for nonlinear programming to parallel the duality theory for linear programming presented in Chap. 6. In particular, for any given constrained maximization problem (call it the primal problem), the KKT conditions can be used to define a closely associated dual problem that is a constrained minimization problem. The variables in the dual problem consist of both the Lagrange multipliers <Math>u_i</Math> <Math>(i = 1, 2, . . . , m)</Math> and the primal variables <Math>x_j</Math> <Math>(j = 1, 2, . . . , n)</Math>.
    </BodyText>
    <BodyText>
        In the special case where the primal problem is a linear programming problem, the <Math>x_j</Math> variables drop out of the dual problem and it becomes the familiar dual problem of linear programming (where the <Math>u_i</Math> variables here correspond to the <Math>y_i</Math> variables in Chap. 6). When the primal problem is a convex programming problem, it is possible to establish relationships between the primal problem and the dual problem that are similar to those for linear programming. For example, the strong duality property of Sec. 6.1, which states that the optimal objective function values of the two problems are equal, also holds here. Furthermore, the values of the <Math>u_i</Math> variables in an optimal solution for the dual problem can again be interpreted as shadow prices (see Secs. 4.7 and 6.2); i.e., they give the rate at which the optimal objective function value for the primal problem could be increased by (slightly) increasing the right-hand side of the corresponding constraint. Because duality theory for nonlinear programming is a relatively advanced topic, the interested reader is referred elsewhere for further information.
    </BodyText>
</BlockQuote>