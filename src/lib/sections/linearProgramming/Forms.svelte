<script>
    import BodyText from "$lib/BodyText.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
</script>

<Heading level="2" refId="lpForms">LP forms</Heading>

<BodyText>
    We're <em>almost</em> ready to talk about algorithms for solving LPs, but first
    we should make a note on some different forms LPs can take. Crucially, it will
    turn out that all the forms we talk about here are, in a sense, equivalent. Thus
    no matter the specifics of how an LP is presented, we know we'll be able to solve
    it using the general methods.
</BodyText>

<Heading level="3" refId="lpStandardForm">Standard form</Heading>

<BodyText>
    Our formulation of the sample LP in <EquationRef refId="prototypeLp" /> is in
    what is known as <em>standard form</em>. Generally, a linear program with <Math
        >n</Math
    > variables and <Math>m</Math> constraints is in standard form if it is written
    as:
</BodyText>

<MathDisp refId="standardFormLp">{String.raw`
\begin{align*}
\max && c_1x_1 + c_2x_2 + \cdots + c_nx_n && && \\
\st  && a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n && \leq && b_1 \\
     && a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n && \leq && b_2 \\
     &&                                            && \vdots && \\
     && a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n && \leq && b_m \\
     && x_1, x_2, \cdots , x_n && \geq && 0
\end{align*}
`}</MathDisp>

<BodyText>
    Where all the <Math>a</Math>, <Math>b</Math>, and <Math>c</Math> values (known
    as the <em>problem data</em>) are real numbers. Our sample problem, and many
    other practical LP problems, are naturally formulated like this. But it
    might at first glance feel a bit limiting. What if you'd rather minimize
    instead of maximizing? Or let your variables take negative values? We'll see
    in the following sections that such considerations are indeed possible, and
    we can consider them in the same framework as standard form problems.
</BodyText>

<Heading level="3" refId="lpFormMin">Minimization problems</Heading>

<BodyText>
    What if your optimization problem is a minimization problem and not a
    maximization problem? For example, instead of maximizing profit, you'd like
    to minimize cost? No worries, it is actually quite straightforward to
    convert from minimization to maximization - just turn everything negative!
    The minimum cost is the same as the maximum "negative cost" <Math>{String.raw`(-1\cdot\text{cost})`}</Math>. So
</BodyText>

<MathDisp>{String.raw`
\min\ c_1x_1 + c_2x_2 + \cdots + c_nx_n
`}</MathDisp>

<BodyText>
    is the same as
</BodyText>

<MathDisp>{String.raw`
    \max -c_1x_1 -c_2x_2 - \cdots -c_nx_n.
`}</MathDisp>

<BodyText>
    Since the problem data can be any real number (so, in particular, negative numbers are fine) this still follows the form of <EquationRef refId=standardFormLp/>.
</BodyText>

<Heading level=3 refId=lpConstraintTransform>Different constraint forms</Heading>

<BodyText>
    What if you wanted "greater than or equal" constraints instead of "less than or equal" constraints? This is again another case of a sign switch since if you take any inequality you can:
    <ul>
        <li>multiply both sides by -1, and</li>
        <li>switch the direction of the inequality</li>
    </ul>
    to end up with a logically equivalent inequality<Footnote>A quick example: <Math>x \leq 10</Math> means the exact same thing as <Math>-x \geq -10</Math>.</Footnote>. Thus any inequality of the form:
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \geq b_i
`}</MathDisp>
<BodyText>
    can be written as
</BodyText>

<MathDisp>{String.raw`
-a_{i1}x_1 - a_{i2}x_2 - \cdots - a_{in}x_n \leq -b_i
`}</MathDisp>

<BodyText>
    which brings us back into line with the standard form inequalities in <EquationRef refId=standardFormLp/>.
</BodyText>

<BodyText>
    What about equality constraints? That is, constraints of the form
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n = b_i.
`}</MathDisp>

<BodyText>
    Can these be converted into standard form? The answer is yes, but it comes at the cost of an extra constraint in the formulation. Because using the above constraint has the same effect as using these two in combination:
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \leq b_i \\
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \geq b_i
`}</MathDisp>

<BodyText>
    Now, that second inequality does not fit in standard form since it is a "<Math>\geq</Math>" constraint, but we already know how to convert it. So the final standard-form-conforming formulation is:
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \leq b_i \\
    -a_{i1}x_1 - a_{i2}x_2 - \cdots - a_{in}x_n \leq -b_i
`}</MathDisp>

<BodyText>
    Great, so we can go from equality constraints to inequality constraints, but what about the other way? That is possible too, but this time we'll need to add a _variable_ to the formulation. In particular, to convert the inequality
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n \leq b_i
`}</MathDisp>

<BodyText>
    to equality form, we'll add a so-called <em>slack variable</em> <Math>s_i</Math>. We'll enforce <Math>s_i\geq0</Math> and rewrite the constraint as
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n + s_i = b_i.
`}</MathDisp>

<BodyText>
    This works since, for any selection of the <Math>x</Math> values that satisfies the inequality, we can simply select the value of <Math>s_i</Math> as the difference between <Math>b_i</Math> and the <Math>{String.raw`a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n`}</Math>, i.e. the _slack_ in the constraint. Going the other way, any variable selections that satisfy the equality will also satisfy the inequality since, by rearranging the equality, we get
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + a_{i2}x_2 + \cdots + a_{in}x_n = b_i - s_i
`}</MathDisp>

<BodyText>
    and <Math>s_i</Math> is non-negative, so the left-hand side is less than (or equal to) <Math>b_i</Math>.
</BodyText>

<Heading level=3 refId=lpVariableBoundTransform>Variable bounds</Heading>

<BodyText>
    In the standard form problem, we enforce that all of our variables are non-negative. But what if we don't want any explicit bounds on the variables? Is this a different class of problems? As it turns out, we can freely switch back and forth between non-negative variables and these so-called <em>unrestricted</em> or <em>free variables</em>.
</BodyText>

<BodyText>
    How do we do the transformations? The first direction is straightforward; say you have a formulation with non-negative variables and you'd like to remove the variable bounds. Well, we still have the functional constraints, where we are allowed to use inequalities. So we'll "remove" the variable bound constraint <Math>x_j\geq0</Math> by creating a new functional constraint
</BodyText>

<MathDisp>{String.raw`
    a_1x_1 + \cdots + a_jx_j + \cdots + a_nx_n \leq b
`}</MathDisp>

<BodyText>
    where <Math>b=0</Math>, <Math>a_j=-1</Math>, and all other coefficients equal <Math>0</Math> (i.e. <Math>-x_j\leq0\Leftrightarrow x_j\geq 0</Math>).
</BodyText>

<BodyText>
    Now the less obvious transformation. Say we have a formulation where the variable <Math>x_j</Math> is unrestricted. How do we convert to non-negative variables? One way is to define two more variables, call them <Math>w_j</Math> and <Math>z_j</Math>, which will be our new non-negative variables. What we'll do is simply replace <Math>x_j</Math> with <Math>w_j-z_j</Math>, so that the constraints become    
</BodyText>

<MathDisp>{String.raw`
    a_{i1}x_1 + \cdots + a_{ij}w_j - a_{ij}z_j + \cdots + a_{in}x_n \leq b_i
`}</MathDisp>

<BodyText>
    for each <Math>i</Math><Footnote>You can think of <Math>y_j</Math> as the "positive part" and <Math>z_j</Math> as the "negative part" of <Math>x_j</Math>. Note that we haven't done anything to enforce that only one of <Math>y_j</Math> and <Math>z_j</Math> are nonzero at a time. So for example if some solution to the original formulation had <Math>x_j=2</Math> then in the new formulation we could have <Math>y_j=2</Math> and <Math>z_j=0</Math>, or we could just as easily have something like <Math>y_j=12, z_j=10</Math> or <Math>y_j=106.7, z_j=104.7</Math>.</Footnote>, and a similar replacement is done in the objective function.
</BodyText>

<Heading level=3 refId=lpFormsRecap>Recap of allowed forms</Heading>

<BodyText>
    As a recap: we defined the standard form LP where the objective is maximized, the functional constraints are <Math>\leq</Math> inequalities, and variables are non-negative. But it turns out there are several equivalent ways to formulate LPs, namely:
    <ul>
        <li>Objectives can be either minimized or maximized.</li>
        <li>Constraints can be in <Math>\leq</Math>, <Math>\geq</Math>, or <Math>=</Math> form.</li>
        <li>Variables may be bounded or not.</li>
    </ul>
    Crucially, any of these forms can be transformed into any of the others, so no matter how we specify a particular LP, any of the results and techniques we discuss here apply!
</BodyText>

<Heading level=3 refId=lpFormDiffNotation>Different notation</Heading>

<BodyText>
    Last up for this section, let's discuss notation. I don't know about you, but I get a little overwhelmed when I look at formulations like <EquationRef refId=standardFormLp/>. There's a lot to look at there, and while I think it's good initially to see things written in full detail with simple notation like this, returns begin diminishing quickly. Especially in a case like this where there's a lot of repetition with minimal changes from line to line.
</BodyText>

<BodyText>
    So, from here on out and where appropriate, I'll start using more concise notation. For example, <EquationRef refId=standardFormLp/> can be written more concisely like so:
</BodyText>

<MathDisp>{String.raw`
    \begin{align*}
    \max && \sum_{j=1}^n c_jx_j    & \\
    \st  && \sum_{j=1}^n a_{ij}x_j & \leq b_i\quad \forall i\in\{1,...,m\} \\
         && x_j                    & \geq 0\quad \forall j\in\{1,...,n\}
    \end{align*}
`}</MathDisp>

<BodyText>
    This looks much cleaner to my eyes, and each line communicates different important information about the formulation. But to benefit from the compactness, one needs to be familiar with the notation used. I assume everyone reading this has seen the summation notation <Math>\sum</Math> before, but some other notation (set inclusion <Math>\in</Math> and "for all" <Math>\forall</Math> in particular) may be new. And sometimes new is intimidating. But fear not! These things get clearer and clearer the more you see them, and I think the benefit is worth it. There is a section in the appendix <SectionRef refId=symbols/> dedicated to special symbols. Beyond that, if you're ever confused about something, you can always ask me!
</BodyText>

<BodyText>
    We'll see more notation like the above as we formulate more specific problems, but for much of the theory sections to come I actually much prefer matrix notation. You should already be familiar with linear algebra (<SectionRef refId=linearAlgebra/> in the appendix gives a brief review), so you should be able to notice how matrix algebra fits nicely with the formulations we've already given. For some <Math>m\times n</Math> matrix <Math>\A</Math> and <Math>n</Math> vector <Math>\x</Math>, if we multiply them we have:
</BodyText>

<MathDisp>{String.raw`
    \begin{align*}
    \A\x&=\begin{bmatrix}
        a_{11} & a_{12} & \cdots & a_{1n} \\
        a_{21} & a_{22} & \cdots & a_{2n} \\
        \vdots & \vdots & \ddots & \vdots \\
        a_{m1} & a_{m2} & \cdots & a_{mn} \\
    \end{bmatrix}\begin{bmatrix}
        x_1 \\ x_2 \\ \vdots \\ x_n
    \end{bmatrix}\\
    &=\begin{bmatrix}
        a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n \\
        a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n \\
        \vdots \\
        a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n \\
    \end{bmatrix}
    \end{align*}
`}</MathDisp>

<BodyText>
    which looks just like the constraint section of the standard form LP <EquationRef refId=standardFormLp/>. Due to the conciseness, my favorite notation for the standard form LP is
</BodyText>

<MathDisp refId=standardFormLpMatrix>{String.raw`
    \begin{align*}
    \max && \c\x \\
    \st  && \A\x&\leq\b \\
         && \x&\geq\zeros
    \end{align*}
`}
</MathDisp>

<BodyText>
    Much nicer on the eyes, right?
</BodyText>

<BodyText>
    Further, you may have noticed that though we've devoted significant time to it already, we haven't formally defined linear programming yet! I was waiting for this moment to do so. A <em>linear program</em> is an optimization problem in the form of <EquationRef refId=standardFormLpMatrix/>
</BodyText>
