<script>
    import BodyText from "$lib/BodyText.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import InteractiveLp from "$lib/InteractiveLp.svelte";
</script>

<Heading level="2" refId="lpTerms">LP terminology</Heading>

<BodyText>
    With this example in hand, let's get back to some definitions. The <em
        >decision variables</em
    >
    are the quantities we're deciding how to set. In our example these are <Math
        >x_1</Math
    > and <Math>x_2</Math>, the number of batches run per week for the two
    products. The <em>objective</em> is the value we'd like to optimize, which
    in the example is the profit equation <Math>3x_1 + 5x_2</Math>. In this case
    we'd like to maximize the objective, but minimization is possible as well.
    The <em>constraints</em> are the limitations on how we set the decision
    variables, which in this case is everything after the "s.t."<Footnote
        >The "s.t." is an abbreviation for "subject to" and is used in
        formulations leading into the constraints section.
    </Footnote>. Notice that the final constraint, <Math>x_1,x_2\geq0</Math>, is
    really two constraints so this is abusing notation a bit. But these types of
    constraints (called <em>variable bound</em> constraints, or in this case
    <em>non-negativity</em>
    constraints since they restrict variables to <Math>\geq0</Math>) are often
    treated separately in solution techniques, so it is common to see them
    grouped or written slightly differently like this. We call the rest of the
    constraints the <em>functional constraints</em>.
</BodyText>

<BodyText>
    A <em>solution</em> to an LP is any specification of values for the decision
    variables. And I do mean <em>any</em><Footnote>
        So long as we're talking about real numbers, of course. Something like <Math>{String.raw`x_1=\text{blue}`}</Math>, <Math>{String.raw`x_2=\text{elephant}`}</Math> is just nonsense and isn't a solution to our problem.
    </Footnote>, it doesn't matter if the values imply a good objective value or even if
    they satisfy the constraints. They are still called a solution. Hence each
    of:
    <ul>
        <li><Math>x_1=0,\ x_2=0</Math></li>
        <li><Math>x_1=-20,\ x_2=6</Math></li>
        <li><Math>x_1=2,\ x_2=3</Math></li>
    </ul>
</BodyText>

<BodyText>
    are solutions to our sample problem, even though the second one violates
    non-negativity.
</BodyText>

<BodyText>
    A <em>feasible solution</em> is a solution that satisfies all of the problem
    constraints. In contrast, an <em>infeasible solution</em> is one that
    violates <em>at least one</em> constraint. The <em>feasible region</em> is
    the set of all feasible solutions. It is possible for a problem to have no
    feasible solutions, in which case the problem itself is said to be
    <em>infeasible</em>.
</BodyText>

<BodyText>
    When solving an LP, the goal is to find an <em>optimal solution</em>, a
    feasible solution that gives the most favorable value<Footnote
        >The smallest value if we have a minimization problem, or the largest
        value for a maximization problem.</Footnote
    > of the objective function. Notice we said <em>an</em> optimal solution,
    not <em>the</em> optimal solution, as it is entirely possible for a problem
    to have more than one solution attain the optimal value. It is also possible
    to have no optimal solutions at all, as in the case of an infeasible
    problem. Another situation with no optimal solution is an <em>unbounded</em>
    problem, where the objective value can become arbitrarily favorable.
</BodyText>

<Heading level="2" refId="lpVisualized">LP visualized</Heading>

<BodyText>
    Let's get hands-on again to see our new definitions in action. Since our
    sample problem includes only two decision variables, we can visualize what's
    going on in a plot:
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
    choosePoints={true}
    refId=wyndorLp
><span slot=caption>Visualization of the Wyndor linear program, <EquationRef refId=prototypeLp/>.</span></InteractiveLp>

<BodyText>
    Here we have a plot with <Math>x_1</Math> on the horizontal axis, <Math
        >x_2</Math
    > on the vertical axis, and a line drawn for each
    <em>constraint boundary</em>
    (the line that forms the boundary of what is permitted by the corresponding constraint)
    for the constraints of <EquationRef refId="prototypeLp" />. Moreover, if you
    hover over a constraint boundary, the side of the line satisfied by the
    inequality is shaded light gray<Footnote
        >I couldn't think of a good way to do this with touch events, so this
        part doesn't work as well on a mobile device. Sorry.</Footnote
    >. The feasible region is the portion of the plot where all the constraints
    are satisfied, and it is plainly visible as the gray-shaded region in the
    bottom-left. Such an intersection of linear inequalities is called a
    <em>polyhedron</em>, and in cases such as this where the polyhedron is
    bounded (i.e. doesn't go off to infinity in some direction) we also call it
    a <em>polytope</em>.
</BodyText>

<BodyText>
    If you click on the plot (or enter values in the text boxes) a solution will
    be drawn. If the point is a feasible solution, it will be colored black and
    the objective value at the solution is show below the plot. Otherwise the
    solution is infeasible, the point will be colored red, and the violated
    inequalities will flash.
</BodyText>

<BodyText>
    How can we visualize the objective? Since the objective is given by <Math
        >3x_1 + 5x_2</Math
    >, any line we draw of the form <Math>3x_1 + 5x_2 = Z</Math> (for some number
    <Math>Z</Math>) will show the solutions that give objective value <Math
        >Z</Math
    >. You can try this with the plot below: put your chosen <Math>Z</Math> value
    in the input box (or click on the plot to get a line going through that point).
    The line will show up on the plot, and the intersection with the feasible region
    (if any exists) will be highlighted. These highlighted solutions each give objective
    value <Math>Z</Math>.
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
    chooseObjVals={true}
    refId=wyndorLpObj
><span slot=caption>
    Plotting objectives values for the Wyndor linear program, <EquationRef refId=prototypeLp/>
</span></InteractiveLp>

<Heading level="3" refId="lpVisualSolve">Solving an LP visually</Heading>

<BodyText>
    We actually have the tools to solve this problem now. For problems in two
    dimensions, it is fairly straightforward to draw a graph and see where the
    best solution is. This is not a good (or usually even feasible) method in
    practice, but for a toy problem it can really help build some intuition.
</BodyText>

<BodyText>
    Let's look back at the above plot. Since we're maximizing, we'd like to
    choose the largest <Math>Z</Math> such that the line intersects the feasible
    region. Let's start with something too big, say <Math>Z=50</Math>. When we
    plot that, we see it is way too high above the feasible region. So we can
    start moving it lower. Maybe go to <Math>Z=40</Math>. It's still completely
    above the feasible region, so that's not it either. Now jump to <Math
        >Z=30</Math
    >. This intersects the plot, but there is a section of the feasible region
    above the line, and hence feasible solutions with a better objective value.
</BodyText>

<BodyText>
    So keep searching. When you come to <Math>Z=36</Math> the situation looks different.
    The line intersects the plot at a single point, <Math>x_1=2, x_2=6</Math>.
    If you move the objective up just a little bit, say to 36.1, you get no
    intersection with the feasible region<Footnote
        >Actually, my little widget here is not perfect. Depending how small of
        a decimal you add, you may get it to tell you there are optimal
        solutions at a slightly higher objective value. This is due to choosing
        a precision that this setup really can't handle. It is worth mentioning
        that even the most sophisticated solvers can have issues with rounding
        errors and numerical stability, but they're generally very good. As long
        as you are careful with your formulations you usually won't run into
        issues.</Footnote
    >. Thus we know we've found the optimal solution<Footnote
        >Truth be told, this isn't a rigorous proof of optimality, at least in
        the strict sense of mathematical proofs. But the solution methods we'll
        study later do give such proofs.</Footnote
    >, and in this case it is unique.
</BodyText>

<Heading level="3" refId="lpVizOtherScenarios"
    >Visualizing other scenarios</Heading
>

<BodyText>
    Let see some examples of the other scenarios we defined above. In each case,
    we'll take our initial model +@eq:prototypeLp and modify it to show the
    desired property.
</BodyText>

<Heading level="4" refId="lpVizInfeasible">An infeasible problem</Heading>

<InteractiveLp
    inequalities={[
        [1, 0, "l", 4, {'textPlacement': [2.3, 8]}],
        [0, 2, "l", 12, {'textPlacement': [6, 5.8]}],
        [3, 2, "l", 18, {'textPlacement': [5, 2.5]}],
        [1, 3, "g", 30, {'textPlacement': [5, 9.2]}]
    ]}
    objective={[3, 5, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={10.99}
    choosePoints={true}
    refId=infeasLp
><span slot=caption>An infeasible linear program</span></InteractiveLp>

<BodyText>
    In this plot, we've added the constraint <Math>x_1 + 3x_2 \geq 30</Math>.
    All the points satisfying this inequality are well above the previous
    feasible region, so no solutions are feasible.
</BodyText>

<Heading level="4" refId="lpVizUnbounded">An unbounded problem</Heading>

<InteractiveLp
    inequalities={[
        [0, 2, "l", 12, {'textPlacement': [6, 7]}]
    ]}
    objective={[3, 5, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={10.99}
    chooseObjVals={true}
    refId=unboundedLp
><span slot=caption>An unbounded problem</span></InteractiveLp>

<BodyText>
    Here we've removed two constraints, with the only one remaining being <Math>{String.raw`2x_2 <= 12`}</Math>. We can see there is no constraint on <Math>x_1</Math> at all now, so we can choose it arbitrarily large and still be in the feasible region<Footnote>
        In most practical applications, infeasiblity is a good indicator that you modeled something incorrectly. Like in this example, it doesn't make sense that we could make arbitrarily many of some product. So if you find a problem you're working on is infeasible, it's a good idea to double-check your formulation.
    </Footnote>.
</BodyText>

<Heading level="4" refId="lpMultipleOptima">Multiple optima</Heading>
 
<InteractiveLp
    inequalities={[
        [1, 0, "l", 4, {'textPlacement': [2.3, 9]}],
        [0, 2, "l", 12, {'textPlacement': [6, 7]}],
        [3, 2, "l", 18, {'textPlacement': [5, 2.5]}],
    ]}
    objective={[6, 4, "max"]}
    x1Min={-0.99}
    x1Max={8.99}
    x2Min={-0.99}
    x2Max={10.99}
    chooseObjVals={true}
    refId=multipleOptima
><span slot=caption>A linear program with multiple optimal solutions</span></InteractiveLp>

<BodyText>
    In this example, we've altered the objective function to <Math
        >6x_1 + 4x_2</Math
    > so that it has the same slope as one of our constraints. We can see by moving
    the objective up and down that the optimal solution comes at <Math
        >Z=36</Math
    >, where the objective line intersects an entire face (bounding line) of the
    feasible region. Since any point on that bounding line attains the optimal
    objective value, they are all optimal solutions.
</BodyText>
