<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

    import frankWolfeEx from "$lib/images/frank-wolfe-example.png";
</script>

<Heading level=2 refId=convexProgramming>Convex programming</Heading>

<BodyText>
    We'll now get a little more general again and explore a form of nonlinear programming called <em>convex programming</em>  which is an optimization problem of the form
</BodyText>

<MathDisp>\begin{align*}
\max && f(\x) \\
\st  && g_i(\x) & \leq b_i & \forall \ i\in\{1,\dots,m\} \\
     && \x & \in \R^n_+
\end{align*}
</MathDisp>
<BodyText>
    where the objective function <Math>f</Math> is concave and the constraint functions <Math>g_i</Math> are convex. The quadratic programs we studied in the previous section are a special type of convex program.
</BodyText>
<BodyText>
    There are several general methods for solving convex programs. We will cover two of them here.
</BodyText>

<Heading level=3 refId=sumt>SUMT</Heading>
<BodyText>
    The first method we'll explore is a <em>sequential unconstrained minimization technique</em> (**SUMT**). As you might guess, instead of attacking the original problem directly, a SUMT will instead solve a <em>sequence</em> of <em>unconstrained</em> optimization problems related to the original, such that the sequence of solutions converges to a solution to the original problem.
</BodyText>
<BodyText>
    In each iteration of the method, some scalar value <Math>r</Math> is chosen and the following unconstrained optimization problem is solved:
</BodyText>

<MathDisp>\max \quad P(\x, r) = f(\x) - rB(\x)
</MathDisp>
<BodyText>
    The function <Math>B</Math> should be selected to satisfy the following:
    <ol>
        <li><Math>B(\x)</Math> is small when <Math>\x</Math> is far from the boundary of the original problem's feasible region.</li>
        <li><Math>B(\x)</Math> is large when <Math>\x</Math> is close to the boundary of the original problem's feasible region.</li>
        <li><Math>B(\x)\rightarrow\infty</Math> as the distance to the boundary of the feasible region <Math>\rightarrow 0</Math>.</li>
    </ol>
</BodyText>

<BodyText>
    Such a function is known as a <em>barrier function</em>  and a common choice for <Math>B(\x)</Math> is
</BodyText>

<MathDisp>B(\x) = \sum_{i=1}^m\frac{1}{b_i - g_i(\x)} + \sum_{j=1}^n\frac{1}{x_j}
</MathDisp>
<BodyText>
    Each term in this function becomes large when the denominator is small, and each denominator gives the distance from <Math>\x</Math> to the edge of one of the problem's (functional or non-negativity) constraints. Thus by subtracting <Math>rB(\x)</Math> from the original problem's objective value <Math>f(\x)</Math>, an optimization algorithm is dissuaded from crossing (or even touching) the boundary of the original problem's feasible region. It is also worth noting that with this selection of <Math>B</Math>, <Math>P(\x, r)</Math> will also be concave.
</BodyText>
<BodyText>
    But there is a potential problem - if the barrier function keeps us away from the boundary of the feasible region, how can we ever find an optimal solution that happens to lay <em>on</em> the boundary? The answer is right in the name of the method: we do not solve just one of these unconstrained problems but rather a sequence of them. We decrease the value of <Math>r</Math> from iteration to iteration so as to allow solutions closer and closer to the boundary (in practice, we will pick a multiplier <Math>\theta<1</Math> such that at each iteration, <Math>r</Math> is reset to the value <Math>\theta r</Math>). None of the individual problems will solve to a solution on the border, but potentially we can recognize if the sequence of solutions approaches a boundary solution.
</BodyText>
<BodyText>
    How do we know when to stop iterating? Like we've done before, we'd like to continue until we know we're "close to" the optimal solution <Math>\x^*</Math>. Furthermore, one can show that if <Math>\x'</Math> is a maximizer for <Math>P(\x, r)</Math> then
</BodyText>

<MathDisp>f(\x')\leq f(\x^*) \leq f(\x') + rB(\x')
</MathDisp>
<BodyText>
    So <Math>rB(\x')</Math> gives us a convenient bound on how far away each trial solution is from optimal. Thus one can select some small error tolerance <Math>\epsilon > 0</Math> and stop once <Math>rB(\x')<\epsilon</Math>.
</BodyText>
<BodyText>
    One final note - the presentation here assumes that all constraints are inequality constraints, so that there is an "interior" to the feasible region. One can alter the selection of <Math>B(\x)</Math> to account for equality constraints, but we will not cover that here. With that out of the way, let's write out the algorithm:
    <ul>
        <li><em>Initialize</em> Identify a feasible initial trial solution <Math>\x^{(0)}</Math> that is not on the boundary of the feasible region. Set <Math>k = 1</Math> and choose appropriate positive values for <Math>r</Math>, <Math>\theta</Math> and <Math>\epsilon</Math>.</li>
        <li><em>Iterate</em>:
            <ul>
                <li>Starting from <Math>\x^{(k-1)}</Math>, use a multi-variable unconstrained optimization procedure (like gradient search from <SectionRef refId=gradientSearch/>) to find a solution <Math>\x^{(k)}</Math> that (approximately) maximizes <Math>P(\x, r)=f(\x) - rB(\x)</Math>.</li>
                <li>If <Math>rB(\x)<\epsilon</Math>: Stop with <Math>\x^{(k)}</Math> as the (approximate) optimal solution.</li>
                <li>Else: Reset <Math>k = k + 1</Math>, <Math>r = \theta r</Math> and continue iterating.</li>
            </ul>
        </li>
    </ul>
</BodyText>

<BodyText>
    It is worth noting that instead of returning the final <Math>\x^{(k)}</Math> as the optimal solution, you may decide to examine the sequence of trial solutions <Math>\x^{(0)}, \x^{(1)}, \dots, \x^{(k)}</Math> and see if it seems to be converging to somewhere. Your textbook<CitationRef refId=classText/> includes an example where the sequence of trial solutions is given by <Math>(1, 1)</Math>, <Math>(0.9, 1.36)</Math>, <Math>(0.987, 1.925)</Math>, <Math>(0.998, 1.993)</Math>. This sequence appears to be converging on <Math>(1, 2)</Math>, which is indeed the optimal value for the problem<Footnote>We will not be stepping through an example here (and the book doesn't really either). The algorithm would use the gradient method as a sub-algorithm, which itself uses a single-variable optimization method as a sub-algorithm, and I felt like a full presentation would just be more confusing than it's worth. But I think the main idea isn't confusing at all, and wanted you all to know about it.</Footnote>.
</BodyText>

<Heading level=3 refId=frankWolfe>Frank-Wolfe algorithm</Heading>
<BodyText>
    In contrast to the sequential unconstrained method SUMT, our next method will instead sequentially solve constrained problems over a sequence of approximations to the real problem's objective function. In particular, the <em>Frank-Wolfe algorithm</em> is an algorithm for <em>linearly</em> constrained convex programs, i.e. problems of the form:
</BodyText>

<MathDisp>\begin{align*}
\max && f(\x) \\
\st  && \A\x&\leq\b \\
     &&   \x&\geq\zeros
\end{align*}
</MathDisp>
<BodyText>
    where <Math>f</Math> is a concave function.
</BodyText>
<BodyText>
    The idea is to approximate this more difficult problem with a problem we already know how to solve. In particular, we'd like to approximate this as a linear program. Like usual, each iteration will begin with some trial solution <Math>\x'</Math>. We'd like to create an objective function that estimates <Math>f</Math> decently in some neighborhood around <Math>\x'</Math>. This is something we've already done before: in Newton's method (<SectionRef refId=newton1d/>) we approximated the objective function at each trial solution via the second-degree Taylor polynomial. We'll do something similar here, except since we're trying to solve an approximate <em>linear</em> program, we'll only be able to use the linear term from the Taylor polynomial. So the quantity to be maximized at each iteration is:
</BodyText>

<MathDisp>\begin{align*}
&f(\x') + \nabla f(\x')(\x - \x') \\
=&f(\x') + \nabla f(\x')\x - \nabla f(\x')\x'
\end{align*}
</MathDisp>
<BodyText>
    Furthermore, since <Math>\x'</Math> is a known value, both the <Math>f(\x')</Math> and <Math>\nabla f(\x')\x'</Math> terms are just constants. Since they will never change, we can leave them out of the approximate objective altogether and maximize only over
</BodyText>

<MathDisp>\nabla f(\x')\x
</MathDisp>
<BodyText>
    So we maximize <Math>\nabla f(\x')\x</Math><Footnote>It's probably worth noting explicitly again that <Math>\nabla f(\x')</Math> is nothing but a constant vector, so this does fit the usual form of a linear programming objective <Math>\c\x</Math>.</Footnote> subject to <Math>\A\x\leq\b,\x\geq\zeros</Math> using linear programming techniques, leading to some solution <Math>\x_{\text{LP}}</Math>. One could decide to use <Math>\x_{\text{LP}}</Math> as the trial solution for the next iteration, but actually we'll add one more step - we'll instead use a single-variable optimization technique to find the point on the line between <Math>\x'</Math> and <Math>\x_{\text{LP}}</Math> that maximizes <Math>f</Math> (analogous to how we determined <Math>t^*</Math> in the iterations for the gradient method of <SectionRef refId=gradientSearch/>). We then continue this process like usual, stopping when the difference between successive trial solutions is small.
</BodyText>

<BodyText>
    We now know everything we need to write out the algorithm:
    <ul>
        <li><em>Initialize</em>: Find an initial trial solution <Math>\x^{(0)}</Math> (since the problem has linear constraints, you could do this by using LP techniques to find an initial basic feasible solution). Set <Math>k=1</Math>.</li>
        <li>
            <em>Iterate</em>:
            <ul>
                <li>
                    Use LP techniques to find an optimal solution <Math>\x_{\text{LP}}^{(k)}</Math> to the approximation linear program:
                    <MathDisp>    \begin{align*}
                    \max && \nabla f(\x^{(k-1)})\x \\
                    \st  && \A\x&\leq\b \\
                        &&   \x&\geq0
                    \end{align*}
                    </MathDisp>
                </li>
                <li>
                    Use a single-variable optimization technique to find the point between <Math>\x^{(k-1)}</Math> and <Math>\x_{\text{LP}}^{(k)}</Math> that maximizes <Math>f</Math>. Let this point be <Math>\x^{(k)}</Math>
                </li>
                <li>
                    If <Math>\x^{(k)}</Math> is sufficiently close to <Math>\x^{(k-1)}</Math>: Stop with <Math>\x^{(k)}</Math> as the (approximate) optimal solution.
                </li>
                <li>
                    Else: Reset <Math>k = k + 1</Math> and continue iterating.
                </li>
            </ul>
        </li>
    </ul>
</BodyText>

<Heading level=4 refId=frankWolfeExample>Example</Heading>
<BodyText>
    Consider the following example problem:
</BodyText>

<MathDisp>\begin{align*}
\max && f(\x) = 5x_1 - x_1^2 + 8x_2 - 2x_2^2 \\
\st  && 3x_1 + 2x_2 &\leq 6 \\
     && x_1, x_2 &\geq 0
\end{align*}
</MathDisp>
<BodyText>
    Let's set up the Frank-Wolfe method and run through one iteration. We'll initialize with trial solution <Math>\x^{(0)}=(0,0)</Math> which is clearly feasible. The gradient of <Math>f</Math> is:
</BodyText>

<MathDisp>\nabla f(x_1, x_2) = (5 - 2x_1, 8 - 4x_2)
</MathDisp>
<BodyText>
    and thus the gradient at the trial solution is given by <Math>\nabla f(0, 0) = (5, 8)</Math>. So the approximation LP is given by:
</BodyText>

<MathDisp>\begin{align*}
\max && 5x_1 + 8x_2 \\
\st  && 3x_1 + 2x_2 &\leq 6 \\
     && x_1, x_2 &\geq 0
\end{align*}
</MathDisp>
<BodyText>
    Using the LP techniques we learned in <SectionRef refId=lp/> we would find the optimal solution for this LP is <Math>\x_{\text{LP}}^{(1)}=(0,3)</Math>. That will not be our next trial solution, though. To find that, we want to find the point on the line segment between <Math>\x^{(0)}</Math> and <Math>\x_{\text{LP}}^{(1)}</Math> that maximizes <Math>f</Math>, i.e. we want to find the value <Math>t</Math> that maximizes
</BodyText>

<MathDisp>f((0, 0) + t((0, 3) - (0, 0))) = f(0, 3t) = 24t - 18t^2
</MathDisp>
<BodyText>
    Taking the derivative with respect to <Math>t</Math> and setting equal to zero, we get <Math>t=\frac{2}{3}</Math>. Thus the next trial solution will be
</BodyText>

<MathDisp>\x^{(1)} = (0, 0) + \frac{2}{3}((0, 3) - (0, 0)) = (0, 2)
</MathDisp>
<BodyText>
    We'll stop here, but the following image shows how the trial solutions would update should you continue iterating.
</BodyText>

<Figure refId="frankWolfeEx">
    <img src={frankWolfeEx} alt="Frank-Wolfe trial solutions" />
    <span slot=caption>Trial solutions from the Frank-Wolfe example problem <CitationRef refId=classText/></span>
</Figure>