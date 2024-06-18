<script>
    import BodyText from "$lib/BodyText.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import InteractiveLp from "$lib/InteractiveLp.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import ShowIntegerPoints from "$lib/drawing/ShowIntegerPoints.svelte";
</script>

<Heading level=1 refId=integerProgramming>Integer programming</Heading>

<BodyText>
    In this section we will introduce integer programming (IP), which is an of extension of linear programming that includes restrictions that some (or all) of the decision variables must take integer values. While this may initially seem like a small tweak, the addition of these integrality<Footnote>In this context, we use the word <em>integral</em> to mean "of or denoted by an integer" (which, as of the time of writing, is the second definition provided by Google when searching the word). I agree it's somewhat confusing since the word has a separate common meaning when used in casual conversation, and even a separate meaning in mathematics that you're familiar with from calculus.</Footnote> constraints is actually quite powerful, and will allow us to model all types of interesting problems that linear programming could not handle. The added expressiveness comes with a tradeoff, though, as integer programs generally take much more effort to solve than their linear counterparts.
</BodyText>

<BodyText>
    For this course, we will discuss some preliminaries before moving on to IP modeling techniques. We'll spend more time on modeling here than in the LP section, in order to explore the flexibility integer programs provide and discuss some of the tricks that can be used to set up problems of all types. We'll finish our practical discussion with a section on solving IPs with Python. On the theoretical side, we'll touch a bit on the theory that helps explain what makes solving IPs so difficult. We'll then get into solution techniques, including branch-and-bound and cutting plane procedures.
</BodyText>

<Heading level=2 refId=ipDefs>Definitions</Heading>
<BodyText>
    We'll consider a few forms of integer programs in this course. A <em>(pure) integer (linear) program</em><Footnote>Of course, you could also talk about non-linear optimization problems with integer variable restrictions. Still, the terminology <em>integer programming</em> is usually restricted to integer extensions to LPs.</Footnote> (<em>IP</em>)<Footnote>Some sources will include an "L" (for "linear") in the initialism as well. So if you see things like ILP, MILP, or BILP in other texts, know that these are likely the same as what we're calling IP, MIP, and BIP.</Footnote> is a linear program where <em>all</em> the decision variables are required to be integer, i.e. it is a problem of the form<Footnote>New notation alert: as mentioned in <SectionRef refId=symbols/>, the symbol <Math>\I</Math> stands for the set of integer numbers. The <Math>+</Math> in the subscript means that we are considering non-negative integers (though this is just a convention, as we saw with linear programs in <SectionRef refId=lpForms/> we can bypass non-negativity with certain formulation tricks). The <Math>n</Math> in the superscript is just from the dimension of the vector <Math>\x</Math>, in this case meaning that a valid selection for <Math>\x</Math> must consist of <Math>n</Math> such integers.</Footnote>:
</BodyText>

<MathDisp>
    \begin{align*}
    \max && \c\x \\
    \st  && \A\x&\leq\b \\
        && \x&\in\I^n_+
    \end{align*}
</MathDisp>

<BodyText>
    In contrast, a <em>mixed integer (linear) program</em> (<em>MIP</em>) is a linear program where some, but not necessarily all, of the decision variables are required to be integer, i.e.
</BodyText>

<MathDisp>
    \begin{align*}
    \max && \c\x + \mathbf{h}\y\\
    \st  && \A\x + \mathbf{G}\y&\leq\b \\
        && \x&\in\I^n_+ \\
        && \y&\geq\zeros
    \end{align*}
</MathDisp>

<BodyText>
A MIP is more flexible that a pure IP, but much of the theory we cover will be easier to talk about for IPs. When we present results for IPs, know that they can likely be extended to MIPs as well, but with some minor modifications.
</BodyText>

<BodyText>
    A <em>binary integer (linear) program</em> (<em>BIP</em>) is a subclass of IPs where the variables are restricted not just to integers, but to either one of the values <Math>0</Math> or <Math>1</Math>. Thus we can define a BIP as having the form:
</BodyText>

<MathDisp>
    \begin{align*}
    \max && \c\x \\
    \st  && \A\x&\leq\b \\
        && \x&\in\{0,1\}^n
    \end{align*}
</MathDisp>

<BodyText>
    A BIP is sometimes also called a <em>0-1 integer (linear) program</em> 
</BodyText>

<BodyText>
    As you can see, every IP by definition has an associated LP underlying it, obtained from the IP by removing the integrality constraints. This underlying LP is very important in the study of integer programs, and is known as the IP's <em>LP relaxation</em> or <em>linear relaxation</em><Footnote>The notion of a <em>relaxation</em> shows up in other places in optimization theory as well. In general, a relaxation <Math>R</Math> of some minimization problem <Math>P</Math> is another optimization problem such that the set of feasible solutions to <Math>P</Math> is a subset of the feasible solutions to <Math>R</Math>. Further, for any solution <Math>x</Math> to <Math>P</Math>, the objective value at <Math>x</Math> in <Math>R</Math> is less than or equal to the objective value at <Math>x</Math> in <Math>P</Math> (in the case of the LP relaxation to an IP, the objective values are equal). Relaxations are usually easier to solve than the original problem and can be useful as approximations or in bounding <Math>P</Math>'s possible objective values.</Footnote>.
</BodyText>

<Heading level=2 refId=ipRoundingNotEnough>Rounding is not enough</Heading>
<BodyText>
    Right about now, you may be wondering how important IP's integer restriction really is. Can't we just solve the related LP, round the solution to the nearest integer, then be done with it?
</BodyText>
<BodyText>
    Theoretically, the answer is a resounding no. Practically, the answer may change depending on your requirements. But let's try to illustrate why the rounding method could be problematic. Consider the following integer program:
</BodyText>

<MathDisp>
    \begin{align*}
    \max && 12x_1 + 10x_2 & \\
    \st  && -7x_1 + 5x_2 & \leq 5 \\
        &&  9x_1 +  7x_2 & \leq 54 \\
        && x_1,x_2 & \in\I_+
    \end{align*}
</MathDisp>

<BodyText>
    We've shown this 2-dimensional IP in a plot below. Shaded in gray is the feasible region to the problem's LP relaxation. The plotted points are all the feasible solutions to the IP, i.e. the points inside the LP relaxation's feasible region which are also integer. In this case, you can verify graphically that the optimal solution to the LP relaxation is <Math>(x_1, x_2)=(2.5, 4.5)</Math> with an objective value of 75.
</BodyText>

<!-- todo: objective lines are not coming out right -->
<InteractiveLp
    inequalities={[
        [-7, 5, "l", 5, {'textPlacement': [3.25, 5.25]}],
        [9, 7, "l", 54, {'textPlacement': [4.4, 2.75]}],
    ]}
    objective={[12, 10, "max"]}
    x1Min={-0.99}
    x1Max={7.99}
    x2Min={-0.99}
    x2Max={5.99}
    chooseObjVals={true}
    showIntegerPoints={true}
    feasibleRegionText={false}
    refId=roundingNotEnough
><span slot=caption>Demonstrating the perils of rounding for IP solutions.</span></InteractiveLp>

<BodyText>
    Say we'd like to find our integer solution by simply rounding the optimal LP relaxation solution. The first difficulty would be determining which way (up vs. down) to round the numbers. But another, more fundamental difficulty is that there is no guarantee that <em>any</em> rounded solution will be feasible. Indeed, that is the case we find ourselves in here, as each of the rounded solutions <Math>(2, 4), (2, 5), (3, 4)</Math>, and <Math>(3, 5)</Math> are infeasible<Footnote>I should point out that, in a practical application, there is often some wiggle room in the (sometimes shoddily estimated) problem data such that you could fudge a little and make one of these rounded solutions work. This may or may not be an option depending on your scenario.</Footnote>.
</BodyText>

<BodyText>
    Ok, so say instead you just want to find the feasible integer solution that is closest to the LP relaxation solution. Putting aside the question of how to do that, there is no guarantee that even that solution will be the optimal integer solution. Indeed, in this example the closest feasible integer solutions are <Math>(2, 3)</Math> and <Math>(3, 3)</Math>, of which <Math>(3, 3)</Math> has the best objective value at 66. But in fact the best integer solution is <Math>(6,0)</Math> with an objective value of 72, a 9% increase!
</BodyText>

<BodyText>
    Even worse still, we'll often formulate BIPs such that the interpretation of the 0-1 variable is whether or not to take some action. For some types of problems, it's not at all uncommon for the LP relaxation solution to a BIP to be every variable taking the value <Math>0.5</Math>! Such a solution would leave you no clue as to which direction you should round the solutions. In these cases, considering only the LP relaxation gives you no hint whatsoever about how to proceed.
</BodyText>