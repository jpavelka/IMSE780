<script>
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    
    import ip1Data from "$lib/images/ip-example-1-data.png";
    import ip2Data from "$lib/images/ip-example-2-data.png";
    import ip3Data from "$lib/images/ip-example-3-data.png";
    import subtours from "$lib/images/subtours.png";
</script>

<Heading level=2 refId=ipModeling>IP modeling</Heading>
<BodyText>
    Hopefully the preceding section gave you some appreciation for why integrality constraints can be useful. The aim for this section is to give you a broader idea of what situations can be modeled with IPs. Of particular interest is the use of binary variables to encode different types of logic in our models.
</BodyText>

<Heading level=3 refId=modelingGeneralInteger>General integer variables</Heading>
<BodyText>
    The most straightforward application if IPs is modeling an LP where the decision variables can't be fractional. For example, say you're building an optimization model to decide how many washing machines to buy for your fleet of laundromats. There is no way to meaningfully buy, say, half of a washing machine to deploy in your stores. This is a case where integer-valued decisions are required.
</BodyText>
<BodyText>
    As far as writing out the model, it is as simple as adding a <Math>\x\in\I^n</Math> line to your formulation. For example, suppose in the Wyndor Glass sample LP (<EquationRef refId=prototypeLp/>) we can only make whole batches of each product. A new formulation would look like:
</BodyText>

<MathDisp refId=wyndorIp>\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 \\
     && x_1,x_2 & \in \ \I_+
\end{align*}
</MathDisp>

<BodyText>
    We've seen in <SectionRef refId=ipRoundingNotEnough/> that the optimal solution can change quite a bit when moving from real-valued variables to integral ones, motivating the IP solution techniques we'll be exploring later.
</BodyText>

<Heading level=3 refId=binVarTricks>Binary variable tricks</Heading>
<BodyText>
    Finding solutions with general integer values is great. But in my opinion the real power in integer programming comes from using binary variables to encode new kinds of logic that you can't replicate in a linear program. In this section, we will explore some of these binary variable tricks. We'll consider <EquationRef refId=wyndorIp/>, our new integer version of the Wyndor glass problem, as a jumping-off point for our examples.
</BodyText>

<Heading level=4 refId=ipEitherOr>Either/or constraints</Heading>
<BodyText>
    For our first example, let's consider a scenario where exactly one out of two constraints needs to be satisfied, and we get to decide which one to enforce as part of the problem. For example, let's consider a modification to the Wyndor glass IP <EquationRef refId=wyndorIp/> where we have the potential to build a new facility to replace Plant 3. This new facility would be available for only 13 hours per week. However, due to updated technology, producing batches of each product will take less time: Product 1 will require 2 hours at the new Plant 3, while Product 2 will require only 1 hour. In effect, we'd like to replace the old Plant 3 constraint with something like:
</BodyText>

<MathDisp>\begin{align*}
\text{either}&&3x_1 + 2x_2 \leq 18 \\
\text{or}    &&2x_1 + x_2 \leq 13
\end{align*}
</MathDisp>

<BodyText>
    There is no "native" facility for this type of constraint in IP, we're still stuck with only linear functions of our decision variables. But we can implement this "either/or" logic by adding an auxiliary, binary variable <Math>y</Math> to the problem in a certain fashion<Footnote>Another way to approach this particular problem may be to just solve two different IPs, one with the first constraint and one with the second, then compare the resultant solutions. But it's not too hard to imagine a scenario where perhaps a new build is considered for each facility, and with enough facilities you wouldn't want to do a new model for each possible combination of new/old facilities.
</Footnote>. Consider the following IP:
</BodyText>

<MathDisp>\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 + My \\
     && 2x_1 + x_2 & \leq 13 + M(1 - y)\\
     && x_1,x_2 & \in \ \I_+ \\
     && y & \in \ \{0, 1\}
\end{align*}
</MathDisp>

<BodyText>
Here, <Math>M</Math><Footnote>This is the second time we've seen <Math>M</Math> represent some very large number - it's a recurring theme in OR.</Footnote> is some sufficiently large constant (something like 100 would be more than sufficient in this case).
</BodyText>

<BodyText>
    What did we accomplish by adding <Math>y</Math> and <Math>M</Math> in this manner? First, let's notice that the new constraints are still linear functions of the variables. (Remember, <Math>M</Math> is a constant and not a variable.) Now, think what it would mean if <Math>y=1</Math>. In that case, the constraint
    <MathDisp>
        3x_1 + 2x_2 \leq 18 + My
    </MathDisp>
    becomes
</BodyText>

<MathDisp>
    3x_1 + 2x_2 \leq \textit{some very large number}
</MathDisp>

<BodyText>
    so that any reasonable setting of the <Math>\x</Math> variables will satisfy it. Meanwhile, the constraint
    <MathDisp>
        2x_1 + x_2 \leq 13 + M(1 - y)
    </MathDisp>
    becomes just
</BodyText>

<MathDisp>
    2x_1 + x_2 \leq 13
</MathDisp>

<BodyText>
    So if we choose <Math>y=1</Math>, then only the constraint <Math>2x_1 + x_2 \leq 13</Math> will matter, i.e. we're using the new facility. Similarly, if we set <Math>y=0</Math>, then the only constraint that matters is <Math>3x_1 + 2x_2 \leq 18</Math>, i.e. we're not using the new facility and making due with the old one. Thus we've successfully recreated the either/or logic using linear constraints and binary variables!
</BodyText>

<Heading level=4 refId=ipOneOfN>Functions taking one of <Math>n</Math> possible values</Heading>
<BodyText>
    Sometimes the right-hand side of your linear constraints might be able to take one of several distinct values. As an example, let's say that Wyndor's Plant 3 may be open for additional hours at some extra cost. It may remain open for 3 extra hours at a cost of \$2,000, or it may remain open for 6 extra hours at a cost of \$4,500. How could <EquationRef refId=wyndorIp/> be modified to take this into account? Take a look at this formulation:
</BodyText>

<MathDisp>\begin{align*}
\max && 3x_1 + 5x_2 - 2y_1 - 4.5y_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 + 3y_1 + 6y_2 \\
     && y_1 + y_2 & \leq \ \ 1 \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2 & \in \ \{0, 1\}
\end{align*}
</MathDisp>

<BodyText>
    By constraining <Math>y_1 + y_2 \leq 1</Math>, we allow only <Math>(y_1, y_2)\in\{(0, 0),(1, 0),(0, 1)\}</Math>. If <Math>(y_1,y_2)=(0,0)</Math> this would reduce back to the original problem. If <Math>(y_1,y_2)=(1,0)</Math> then we'd have the situation where the plant is open for 3 extra hours, and we've reduced our profits by \$2,000 to account for the extra cost. Similarly, if <Math>(y_1,y_2)=(0,1)</Math> then we'll have an extra 6 hours of use in the plant, but at the required cost of \$4,500.
</BodyText>

<Heading level=4 refId=ipSetupCosts>Setup costs</Heading>
<BodyText>
    A common occurrence in OR problems is a setup cost involved in participating in some activity. Suppose in the Wyndor problem that the three facilities did not exist yet, so they need to decide which facilities to build as well as the ultimate product mix. Say that in order to build any of the plants, they'd need to take out a loan that they plan to pay back with their weekly profits for the foreseeable future. If the weekly payback for any given facility is \$6,000, how can we model this with an integer program? Take a look at the following formulation:
</BodyText>

<MathDisp>\begin{align*}
\max && 3x_1 + 5x_2 - 6y_1 - 6y_2 -6y_3& \\
\st  && x_1 & \leq \ \ 4y_1  \\
     && 2x_2 & \leq 12y_2 \\
     && 3x_1 + 2x_2 & \leq 18y_3 \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2,y_3 & \in \{0, 1\}
\end{align*}
</MathDisp>

<BodyText>
    We've added new binary variables, <Math>y_1, y_2</Math>, and <Math>y_3</Math>, which we'd like to interpret as a value of <Math>1</Math> for <Math>y_i</Math> means that facility <Math>i</Math> will be built, and a value of <Math>0</Math> means it won't be built. How does that alter the formulation? We know that building a facility will cost us \$6,000 weekly over the loan term, so we'll subtract \$6,000 from our weekly profits for any facility via the term <Math>-6y_i</Math> in the objective. Furthermore, we can only use the time in each facility if it is built. So the constants on right-hand sides of the original formulation are all now multiplied by the corresponding <Math>y_i</Math> variable. This way, if we decide not to build the facility by setting <Math>y_i=0</Math>, there is no time available at the (non-existent) facility. Otherwise, its time is available as usual.
</BodyText>

<Heading level=4 refId=ipBooleanAlg>Boolean algebra</Heading>

<BodyText>
    Given binary variables <Math>x_1, x_2</Math> we can mimic the basic operations from <a href='https://en.wikipedia.org/wiki/Boolean_algebra'>Boolean algebra</a> (AND, OR, XOR) in integer programs. In each case, we'll do this with an auxiliary binary variable <Math>y</Math>. For each operation, I'll show the associated truth table (telling the values of <Math>y</Math> that should correspond to each possible value of <Math>x_1, x_2</Math>) and the corresponding set of linear constraints. It's a good exercise to go through each row of the table and verify that the constraints do indeed enforce the relation.
</BodyText>

<BodyText>
    <ul>
        <li>AND: <Math>y=1</Math> if and only if <Math>x_1=x_2=1</Math>:
            <div style='display:flex;justify-content:space-around;overflow-x:auto'>
            <div>
            <table><tbody>
            <tr style='border-bottom:1px solid black'><th><Math>x_1</Math></th><th><Math>x_2</Math></th><th style='border-left:1px solid black'><Math>y</Math></th></tr>
            <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
            <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
            <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
            <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
            </tbody></table>
            </div>
            <div>
            <MathDisp ignoreOverflow={true}>     \begin{align*}
            y&\leq x_1 \\
            y&\leq x_2 \\
            y&\geq x_1 + x_2 - 1 \\
            x_1, x_2, y & \in \{0,1\}
            \end{align*}
            </MathDisp>     </div>
            </div></li>
        <li>OR: <Math>y=1</Math> if and only if <em>at least</em> one of <Math>x_1</Math> or <Math>x_2</Math> equals <Math>1</Math>:
            <div style='display:flex;justify-content:space-around'>
            <div>
            <table><tbody>
            <tr style='border-bottom:1px solid black;overflow-x:auto'><th><Math>x_1</Math></th><th><Math>x_2</Math></th><th style='border-left:1px solid black'><Math>y</Math></th></tr>
            <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
            <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
            <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
            <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
            </tbody></table>
            </div>
            <div>
            <MathDisp ignoreOverflow={true}>     \begin{align*}
            y&\leq x_1 + x_2 \\
            y&\geq x_1 \\
            y&\geq x_2 \\
            x_1, x_2, y & \in \{0,1\}
            \end{align*}
            </MathDisp>     </div>
            </div></li>
        <li>XOR: <Math>y=1</Math> if and only if <em>exactly</em> one of <Math>x_1</Math> or <Math>x_2</Math> equals <Math>1</Math>:
            <div style='display:flex;justify-content:space-around;overflow-x:auto'>
            <div>
            <table><tbody>
            <tr style='border-bottom:1px solid black'><th><Math>x_1</Math></th><th><Math>x_2</Math></th><th style='border-left:1px solid black'><Math>y</Math></th></tr>
            <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
            <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
            <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
            <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
            </tbody></table>
            </div>
            <div>
            <MathDisp ignoreOverflow={true}>     \begin{align*}
            y&\leq x_1 + x_2 \\
            y&\geq x_1 - x_2 \\
            y&\geq x_2 - x_1 \\
            y&\leq 2 - x_1 - x_2 \\
            x_1, x_2, y & \in \{0,1\}
            \end{align*}
            </MathDisp>     </div>
            </div></li>
    </ul>
</BodyText>

<BodyText>
(It occurred to me while presenting this that maybe it would be helpful to provide some <em>incorrect</em> formulations for these concepts, in order to illustrate what might go wrong while modeling. You can find this in the appendix, <SectionRef refId=badIpModels/>)
</BodyText>
<BodyText>
    Note that these constraint sets wouldn't normally constitute an IP on their own, but instead they would be just a subset of the constraints you'd find inside a larger, more complex problem. Let's consider the following addition to the Wyndor IP: The company realizes that they cannot use the full 18 hours available at Plant 3 if they produce <em>both</em> Product 1 and Product 2 during a given week, since they'll require some down time in order to set up the line for a change in product. They anticipate this setup to take 2 hours away from their production time.
</BodyText>
<BodyText>
    We'll alter <EquationRef refId=wyndorIp/> by including three additional, binary variables <Math>y_1, y_2</Math>, and <Math>z</Math>. We'll set up the <Math>y_i</Math> variables so that <Math>y_i=1</Math> if we plan to produce any of Product <Math>i</Math> (i.e. <Math>x_i>0</Math>), and we'll let <Math>z=1</Math> if and only if <Math>y_1=y_2=1</Math>. The formulation follows:
</BodyText>

<MathDisp>\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && y_1 & \leq x_1 \\
     && My_1 & \geq x_1 \\
     && y_2 & \leq x_2 \\
     && My_2 & \geq x_2 \\
     && z&\leq y_1 \\
     && z&\leq y_2 \\
     && z&\geq y_1 + y_2 - 1\\
     && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 - 2z \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2,z & \in \ \{0, 1\}
\end{align*}
</MathDisp>

<BodyText>
    The constraints
    <MathDisp>\begin{align*}
    y_i & \leq x_i \\
    My_i & \geq x_i \\
    \end{align*}
    </MathDisp>
    (with sufficiently large <Math>M</Math>) serve to ensure that <Math>y_i=1</Math> if and only if <Math>x_i>0</Math> (which, since we have <Math>x_i\in\I</Math>, also means <Math>x_i\geq1</Math>)<Footnote>Verify this by seeing what the constraints reduce to when <Math>x_i=0</Math> versus when <Math>x_i>0</Math>.</Footnote>. The next constraints involving <Math>y_1, y_2</Math>, and <Math>z</Math> are exactly the AND logical constraints from above, ensuring that <Math>z=1</Math> if and only if both <Math>y_1</Math> and <Math>y_2</Math> are 1 (and hence <Math>x_1,x_2>0</Math>). The final modification comes in the Plant 3 resource constraint
    <MathDisp>
        3x_1 + 2x_2 \leq 18 - 2z
    </MathDisp>
    which serves to reduce the available production time when both products are being produced.
</BodyText>

<Heading level=3 refId=ipWordProblems>Example word problems</Heading>

<BodyText>
    Here we present the sample scenarios in section 12.4 of <CitationRef refId=classText/>, and talk about how to model each scenario. Each formulation will require some tricks with binary variables.
</BodyText>

<Heading level=4 refId=ipResourceAllocRestrict>Resource allocation with extra restrictions</Heading>

<BlockQuote>
    <BodyText>
        The Research and Development Division of the GOOD PRODUCTS COMPANY has developed three possible new products. However, to avoid undue diversification of the company’s product line, management has imposed the following restriction:
    </BodyText>
    <BodyText>
        Restriction 1: From the three possible new products, at most two should be chosen to be produced.
    </BodyText>
    <BodyText>
        Each of these products can be produced in either of two plants. For administrative reasons, management has imposed a second restriction in this regard.
    </BodyText>
    <BodyText>
        Restriction 2: Just one of the two plants should be chosen to be the sole producer of the new products.
    </BodyText>
    <BodyText>
        The production cost per unit of each product would be essentially the same in the two plants. However, because of differences in their production facilities, the number of hours of production time needed per unit of each product might differ between the two plants. These data are given in Table 12.2, along with other relevant information, including marketing estimates of the number of units of each product that could be sold per week if it is produced. The objective is to choose the products, the plant, and the production rates of the chosen products so as to maximize total profit.
    </BodyText>
</BlockQuote>

<Figure refId="ipEx1">
    <img src={ip1Data} alt="IP example" />
    <span slot=caption>Data for resource allocation sample IP, from <CitationRef refId=classText/></span>
</Figure>

<BodyText>
    This feels a lot like the Wyndor Glass problem, but there are several extra restrictions put in. First of all, we have a bound on the number of items sold per week, but this is something that we could handle in plain old linear programming. More interesting are Restriction 1 and Restriction 2, which will require us to add some binary variables to the formulation and carefully set up the constraints to enforce the desired logic. To that end, let's examine the following model<Footnote>For some reason, the presentation of this problem in the textbook leaves the <Math>x_i</Math> variables are real-valued instead of integers. I figure integers are more realistic, and since we're in the IP portion of the notes, why not do it that way?</Footnote>:
</BodyText>

<MathDisp>
    \begin{align*}
    \max && 5x_1 + 7x_2 + 3x_3& \\
    \st  && x_1 & \leq 7y_1  \\
         && x_2 & \leq 5y_2 \\
         && x_3 & \leq 9y_3 \\
         && y_1 + y_2 + y_3 & \leq 2 \\
         && 3x_1 + 4x_2 + 2x_3 & \leq 30 + My_4 \\
         && 4x_1 + 6x_2 + 2x_3 & \leq 40 + M(1 - y_4) \\
         && x_1,x_2,x_3 & \in \ \I_+ \\
         && y_1,y_2,y_3,y_4 & \in \{0, 1\}
    \end{align*}
</MathDisp>

<BodyText>
    Without the <Math>y_i</Math> variables, this is essentially just another resource allocation problem like the integer version of the Wyndor problem <EquationRef refId=wyndorIp/>. But now we have variables <Math>y_1, y_2, y_3</Math> to account for the problem's Restriction 1, and <Math>y_4</Math> accounts for Restriction 2.
</BodyText>
<BodyText>
    How does it work? Well, <Math>y_4</Math> is applying the either/or constraint trick we saw earlier in <SectionRef refId=binVarTricks/>. Notice that if <Math>y_4=1</Math> (and <Math>M</Math> is selected large enough) then the constraint on production in Plant 1 has so much slack that any reasonable settings of the <Math>x_i</Math> variables will not violate it. Thus the only constraint in effect is the Plant 2 resource constraint. So the interpretation is that <Math>y_4=1</Math> means that Plant 2 is the plant chosen to satisfy Restriction 2. Similarly, <Math>y_4=0</Math> means that Plant 1 is the one selected plant that handles the production.
</BodyText>
<BodyText>
    How about the other <Math>y_i</Math> variables? Notice that if <Math>y_i=0</Math> for any <Math>i</Math>, then the corresponding constraint on <Math>x_i</Math> becomes <Math>x_i\leq0</Math>, meaning that Product <Math>i</Math> cannot be produced. Otherwise, if <Math>y_i=1</Math>, then <Math>x_i</Math> is only bounded by the weekly sales potential from the table, and thus Product <Math>i</Math> <em>is</em> allowed to be produced. Then adding the constraint <Math>y_1 + y_2 + y_3 \leq 2</Math> codifies the requirement that at most 2 of the products may be produced.
</BodyText>

<Heading level=4 refId=ipViolateProportion>Violating proportionality</Heading>

<BlockQuote>
    <BodyText>
        The SUPERSUDS CORPORATION is developing its marketing plans for next year’s new products. For three of these products, the decision has been made to purchase a total of five TV spots for commercials on national television networks. The problem we will focus on is how to allocate the five spots to these three products, with a maximum of three spots (and a minimum of zero) for each product.
    </BodyText>
    <BodyText>
        The following table shows the estimated impact of allocating zero, one, two, or three spots to each product. This impact is measured in terms of the profit (in units of millions of dollars) from the additional sales that would result from the spots, considering also the cost of producing the commercial and purchasing the spots. The objective is to allocate five spots to the products so as to maximize the total profit.
    </BodyText>
</BlockQuote>

<Figure refId="ipEx2">
    <img src={ip2Data} alt="IP example" />
    <span slot=caption>Data for proportionality violation sample IP, from <CitationRef refId=classText/></span>
</Figure>

<BodyText>
    Your first thought for modeling this may be to have integer variables <Math>x_1, x_2, x_3</Math>, with the value of <Math>x_i</Math> denoting the number of TV spots allocated to product <Math>i</Math>. But this won't work, because the objective violates the so-called <em>proportionality assumption</em> for linear functions, i.e. that each extra unit of a variable affects the value of the function by the same amount. That is not true here, e.g. for product 1 doubling from 1 spot to 2 does not double the profit.
</BodyText>
<BodyText>
    Instead, let's define a separate binary variable for each product and each possible selection of TV spots for the product. So we'll have a binary variables <Math>y_{ij}</Math> such that <Math>y_{ij}=1</Math> if and only if we decide on <Math>j</Math> TV spots for product <Math>i</Math>, and otherwise <Math>y_{ij}=0</Math>. With this setup, our model would look like:
</BodyText>

<MathDisp fontSize=0.9>\begin{align*}
    \max && y_{11} + 3y_{12} + 3y_{13} + 2y_{22} + 3y_{23} - y_{31} + 2y_{32} + 4y_{33}& \\
    \st  && y_{11} + y_{12} + y_{13} & \leq 1 \\
         && y_{21} + y_{22} + y_{23} & \leq 1 \\
         && y_{31} + y_{32} + y_{33} & \leq 1 \\
         && y_{11} + 2y_{12} + 3y_{13} + y_{21} + 2y_{22} + 3y_{23} + y_{31} + 2y_{32} + 3y_{33} & \leq 5 \\
         && y_{ij} & \in \{0,1\} \ \ \forall\ i,j
    \end{align*}
</MathDisp>

<BodyText>
    The objective is straightforward, coming directly from the numbers in the table. As for the constraints, lets start with the first three. We shouldn't have something like, say, both <Math>y_{11}=1</Math> and <Math>y_{12}=1</Math>, since it doesn't make sense to allocate both <Math>1</Math> and <Math>2</Math> spots for the same product. At most one of <Math>y_{i1}, y_{i2}</Math>, or <Math>y_{i3}</Math> can be chosen which is why we've included the
    <MathDisp>
        y_{i1} + y_{i2} + y_{i3} \leq 1
    </MathDisp>
    constraints.
</BodyText>
<BodyText>
    What about the final (functional) constraint? The left-hand side of the constraint sums up the total number of TV spots that are allocated. So the reason that, for example, we see the term <Math>3y_{13}</Math> is that selecting <Math>y_{13}=1</Math> allocates 3 spots to product 1, thus making use of 3 of the available 5 slots. Then the 5 on the right-hand side enforces that at most 5 TV spots are allocated overall.
</BodyText>

<Heading level=4 refId=ipCoverChar>Covering all characteristics</Heading>

<BlockQuote>
    <BodyText>
        SOUTHWESTERN AIRWAYS needs to assign its crews to cover all its upcoming flights. We will focus on the problem of assigning three crews based in San Francisco to the flights listed in the first column of the following table. The other 12 columns show the 12 feasible sequences of flights for a crew. (The numbers in each column indicate the order of the flights.) Exactly three of the sequences need to be chosen (one per crew) in such a way that every flight is covered. (It is permissible to have more than one crew on a flight, where the extra crews would fly as passengers, but union contracts require that the extra crews would still need to be paid for their time as if they were working.) The cost of assigning a crew to a particular sequence of flights is given (in thousands of dollars) in the bottom row of the table. The objective is to minimize the total cost of the three crew assignments that cover all the flights.
    </BodyText>
</BlockQuote>

<Figure refId="ipEx3">
    <img src={ip3Data} alt="IP example" />
    <span slot=caption>Data for characteristic covering sample IP, from <CitationRef refId=classText/></span>
</Figure>

<BodyText>
    We can model this problem in the following way, with the binary variable <Math>x_i=1</Math> if we assign sequence <Math>i</Math> to some crew, and otherwise <Math>x_i=0</Math>:
</BodyText>

<MathDisp fontSize=0.9>
\begin{align*}
\min && 2x_1 + 3x_2 + 4x_3 + 6x_4 + 7x_5 + 5x_6 & \\
     && + 7x_7 + 8x_8 + 9x_9 + 9x_{10} + 8x_{11} + 9x_{12}& \\
\st  && x_1 + x_4 + x_7 + x_{10} & \geq 1 \qquad  \text{(SF to LA)} \\
     && x_2 + x_5 + x_8 + x_{11} & \geq 1 \qquad \text{(SF to Den)} \\
     && x_3 + x_6 + x_9 + x_{12} & \geq 1 \qquad \text{(SF to Sea)} \\
     && x_4 + x_7 + x_9 + x_{10} + x_{12} & \geq 1 \qquad \text{(LA to Chi)} \\
     && x_1 + x_6 + x_{10} + x_{11} & \geq 1 \qquad \text{(LA to SF)} \\
     && x_4 + x_5 + x_9 & \geq 1 \qquad \text{(Chi to Den)} \\
     && x_7 + x_8 + x_{10} + x_{11} + x_{12} & \geq 1 \qquad \text{(Chi to Sea)} \\
     && x_2 + x_4 + x_5 + x_9 & \geq 1 \qquad \text{(Den to SF)} \\
     && x_5 + x_8 + x_{11} & \geq 1 \qquad \text{(Den to Chi)} \\
     && x_3 + x_7 + x_8 + x_{12} & \geq 1 \qquad \text{(Sea to SF)} \\
     && x_6 + x_9 + x_{10} + x_{11} + x_{12} & \geq 1 \qquad \text{(Sea to LA)} \\
     && \sum_{j=1}^{12} x_j & = 3 \qquad \text{(3 crews)} \\
     && x_j & \in \{0,1\} \ \ \ \forall\ j
\end{align*}
</MathDisp>

<BodyText>
    The objective function is straightforward: if we assign one of the sequences to some crew, then we must pay the costs according to the bottom row of the table. Our constraints are that we are required to cover every flight. Take the first constraint for example. This is the constraint that enforces that we must have some crew flying from SF to LA. Which sequences contain that flight? From the first row in the table, we see this leg is included in sequences 1, 4, 7, and 10. So we are required to select at least one of those sequences to make sure there is a crew flying from SF to LA, hence we have the constraint <Math>x_1 + x_4 + x_7 + x_{10} \geq 1</Math>.
</BodyText>
<BodyText>
    In the final formulation, we follow this logic for every flight in the table. Lastly, we are required to make an assignment for three crews, which we encode with the <Math>\sum_{j=1}^{12} x_j = 3</Math> constraint.
</BodyText>

<Heading level=3 refId=ipModelDataSep>Model/data separation</Heading>

<BodyText>
    The above ad-hoc modeling is useful, but in real applications we often have to solve different, but similarly structured models on some regular schedule. We'd prefer not to write a new model from scratch every time we need to solve one. As we discussed in <SectionRef refId=lpModelDataSep/>, the best practice is to write<Footnote>Ideally in computer code.</Footnote> a base, general model which encodes all the logic for the problem, then inject the relevant problem data when an instance needs to be solved.
</BodyText>

<BodyText>
    To that end, in this section we'll present some generalized IP formulations for common OR problems.
</BodyText>

<Heading level=4 refId=ipKnapsack>Knapsack</Heading>
<BodyText>
    We'll start with a simple one, the <a href='https://en.wikipedia.org/wiki/Knapsack_problem'>knapsack problem</a>. The classical framing is something like this: you're going on a camping trip. The weight you can carry in your backpack is limited to <Math>W\in\R</Math>. There are <Math>n</Math> items you can take with you, and for each <Math>j\in\{1,2,\dots,n\}</Math>, item <Math>j</Math> has some weight <Math>w_j</Math> and some value to you <Math>v_j</Math>. The goal is to select which items to take with you, subject to the weight constraint, such that the total value of the items taken is maximized.
</BodyText>
<BodyText>
    We can model this problem with binary variables <Math>x_j</Math>, <Math>j\in\{1,2,\dots,n\}</Math> so that <Math>x_j=1</Math> if we choose to take item <Math>j</Math>, and otherwise <Math>x_j=0</Math>. The formulation looks like:
</BodyText>

<MathDisp>
    \begin{align*}
    \max&& \sum_{j=1}^n v_jx_j& \\
    \st&& \sum_{j=1}^n w_jx_j&\leq W \\
    &&x_j&\in\{0, 1\} \ \ \forall \ j\in\{1,2,\dots,n\}
    \end{align*}
</MathDisp>

<Heading level=4 refId=ipSetCover>Set covering</Heading>
<BodyText>
    The <a href='https://en.wikipedia.org/wiki/Set_cover_problem'>set covering problem</a> is another classic OR problem with several applications (the Southwestern Airlines crew scheduling problem in <SectionRef refId=ipCoverChar/> was one example). In abstract terms, the idea is that there is some set of items <Math>S</Math>, and some number of <Math>n</Math> subsets<Footnote>New notation: when we write <Math>S'\subseteq S</Math>, we mean to say that <Math>S'</Math> is a subset of <Math>S</Math>. That is, <Math>S</Math> and <Math>S'</Math> are both sets, and every element of <Math>S'</Math> is also an element of <Math>S</Math>.</Footnote> <Math>S_j\subseteq S</Math>, <Math>j\in\{1,2,\dots,n\}</Math>. The idea is to choose some collection of the subsets so that every member of <Math>S</Math> is also present in at least one subset.
</BodyText>

<BodyText>
    Ok, that was a mouthful, let's try to explain with an example. Remember the airline crew scheduling problem referenced above? In that case, the base set <Math>S</Math> was the set of flight segments that the airline needed to fly (SF to LA, Chicago to Denver, etc.). The <Math>S_j</Math> subsets were the feasible flight sequences, like sequence 6 from the table that consisted of flying from SF to Seattle, then Seattle to LA, and finally LA to SF. Our job was to select the flight sequences such that every flight segment was flown at least once<Footnote>Plus an extra constraint on the number of flight segments to choose - this constraint is not included in the classical set covering problem.</Footnote>.
</BodyText>

<BodyText>
    Let's give one more example to motivate our formulation. Say a new city is deciding where to place their fire stations. They require that every neighborhood in the city can be reached in under 5 minutes by at least one fire station. There are <Math>n</Math> potential building sites for the new stations, and <Math>m</Math> different neighborhoods in the city (so <Math>S=\{1,2,\dots,m\}</Math>). For each potential building site <Math>j\in\{1,2,\dots,n\}</Math>, there is a set <Math>S_j\subseteq S</Math> of neighborhoods that can be reached from that site in under 5 minutes. There is also a cost <Math>c_j\in\R</Math> associated with building a station at site <Math>j</Math>. How can the city minimize building costs while still meeting the requirements?
</BodyText>

<BodyText>
    Our formulation will include binary variables <Math>x_j</Math> with the interpretation that a station will be built at site <Math>j</Math> if and only if <Math>x_j=1</Math>. The formulation follows<Footnote>Note the new notation in the second summation, <Math>\{j:i\in S_j\}</Math>. We call this the "conditional set" notation in <SectionRef refId=symbols/>. It means the set of all <Math>j</Math> such that the condition <Math>i\in S_j</Math> is true.</Footnote>:
</BodyText>

<MathDisp>
    \begin{align*}
    \min&& \sum_{j=1}^n c_jx_j& \\
    \st&& \sum_{j:i\in S_j} x_j&\geq 1 & \forall i\in\{1,2,\dots,m\}\\
    &&x_j&\in\{0, 1\} & \forall \ j\in\{1,2,\dots,n\}
    \end{align*}
</MathDisp>

<Heading level=4 refId=ipTSP>Traveling salesman</Heading>
<BodyText>
    We've touched on the traveling salesman problem (TSP) already, way back in <SectionRef refId=tsp/>. This is the famous problem where a salesman has a list of cities to visit and needs to find the shortest possible path that leads him through every city before returning to the starting point.
</BodyText>
<BodyText>
    To formalize things a bit, say the salesman needs to visit a list of <Math>n</Math> cities, and the distances between any two cities <Math>i,j\in\{1,\dots,n\}, i\neq j</Math> is known and denoted as <Math>d_{ij}</Math><Footnote>If <Math>d_{ij}=d_{ji}</Math> for all <Math>i,j</Math> then we call it a <em>symmetric TSP</em>  But this doesn't need to hold for our formulations to work.</Footnote>. We'll use binary variables <Math>x_{ij}</Math> for each <Math>i,j\in\{1,\dots,n\}, i\neq j</Math>, with the interpretation that <Math>x_{ij}=1</Math> if and only if the salesman chooses to travel directly from city <Math>i</Math> to city <Math>j</Math> as part of his path. A first attempt at this model might look like this:
</BodyText>

<MathDisp>
    \begin{align*}
    \min&& \sum_{i\in\{1,\dots,n\}}\sum_{j\in\{1,\dots,n\}:j\neq i} d_{ij}x_{ij}& \\
    \st&& \sum_{j\in\{1,\dots,n\}:j\neq i} x_{ij} &= 1&& \forall \ i\in\{1,\dots,n\}\\
    && \sum_{i\in\{1,\dots,n\}:i\neq j} x_{ij} &= 1&& \forall \ j\in\{1,\dots,n\}\\
    &&x_{ij}&\in\{0, 1\} && \forall \ i\neq j
    \end{align*}
</MathDisp>

<BodyText>
    On first inspection, this <em>looks like</em> it's a correct formulation. There are two groups of constraints above. In the first group you set some <Math>i</Math>, then amongst all <Math>j\neq i</Math> you ensure that exactly one <Math>x_{ij}</Math> equals <Math>1</Math>. This has the effect of enforcing that the salesman leaves every town exactly once. The second group of constraints does something similar, enforcing that the salesman arrives in every town exactly once.
</BodyText>

<BodyText>
    So, what's the problem? It might not be evident initially<Footnote>I can't tell you how many times I've come up with what I thought was a valid formulation for a problem, only to solve the model and get some invalid result because I overlooked some subtle case my model didn't cover. Modeling a given IP is not always as straightforward as it might initially appear.</Footnote>, but this formulation does nothing to eliminate so-called <em>subtours</em> in the formulation. That is to say, the feasible solutions to the above model include a solution where the salesman visits, say, the first half of the cities in one tour and the second half of the cities in a second, separate tour, with no links between the two. A solution including subtours is illustrated below.
</BodyText>

<Figure refId="tspSubtours">
    <img src={subtours} alt="TSP subtours" />
    <span slot=caption>Subtours in a graph</span>
</Figure>

<BodyText>
    To recover a valid formulation, we'll need to include constraints that make these subtours impossible. How might we do that? Consider the above image, where we see a subtour among cities 3, 8, and 9. We can keep this from happening by way of a constraint that ensures that the salesman travels at least once between some city in the set <Math>\{3, 8, 9\}</Math> and another city not in that set, i.e. a city in the complement set <Math>\{1, 2, 4, 5, 6, 7, 10\}</Math>. That is, we can add the constraint:
</BodyText>

<MathDisp>
    \sum_{i\in\{3, 8, 9\}}\sum_{j\in\{1, 2, 4, 5, 6, 7, 10\}}x_{ij} \geq 1
</MathDisp>

<BodyText>
    Alternatively, we could write the constraint in terms of just the original set <Math>\{3, 8, 9\}</Math> by restricting the number of edges between set members to less than 3 (the size of the set).
</BodyText>

<MathDisp>
    \sum_{i\in\{3, 8, 9\}}\sum_{j\in\{3, 8, 9\}}x_{ij} \leq 2
</MathDisp>

<BodyText>

</BodyText>

<BodyText>
    Of course, this constraint will only eliminate the possibility of that one subtour (and its complement). There are plenty of other subtours possible, one for essentially every subset of <Math>\{1,\dots,n\}</Math>. So a truly valid formulation for the TSP must include one of these <em>subtour elimination constraints</em> for every<Footnote>
        Technically we don't need <em>every</em> subset, since the same constraint will cover both the selected subset and its complement (e.g. the constraint above will eliminate the possibility of subtours in both sets <Math>\{3, 8, 0\}</Math> and <Math>\{1, 2, 4, 5, 6, 7, 10\}</Math>). Further, subsets of size 1 are technically covered by the basic "leave every city once" constraints.
    </Footnote> subset <Math>S\subseteq\{1,\dots,n\}</Math><Footnote>
        If you're thinking "that could be a lot of constraints", you're right. It can be a problem. We'll be coming back to this observation later.
    </Footnote>. Such a formulation including these constraints<Footnote>
        In fact, you could make due with <em>only</em> the subtour elimination constraints, since the original functional constraints are essentially just subtour elimination constraints for the subtours of size <Math>n-1</Math>.
    </Footnote> could look like<Footnote>
        Two bits of new notation here. First, <Math>\emptyset</Math> represents an empty set, i.e. a set with no elements. Technically, <Math>\emptyset</Math> is a subset of all other sets, but we don't want to consider it in our formulation so we'll explicitly exclude it. Second, <Math>|S|</Math> denotes the size of a set, i.e. the number of elements in it.
    </Footnote>: 
</BodyText>

<MathDisp fontSize=0.9>
    \begin{align*}
        \min&& \sum_{i\in\{1,\dots,n\}}\sum_{j\in\{1,\dots,n\}:j\neq i} d_{ij}x_{ij}& \\
        \st&& \sum_{j\in\{1,\dots,n\}:j\neq i} x_{ij} &= 1&& \forall \ i\in\{1,\dots,n\}\\
        && \sum_{i\in\{1,\dots,n\}:i\neq j} x_{ij} &= 1&& \forall \ j\in\{1,\dots,n\}\\
        && \sum_{i\in S}\sum_{j\in S:i\neq j}x_{ij} &\leq |S|-1 && \forall \ S\subseteq \{1,\dots,n\}, S\neq\emptyset\\
        &&x_{ij}&\in\{0, 1\} && \forall \ i\neq j
    \end{align*}
</MathDisp>

<style>
    th {
        width: 2rem;
        text-align: center;
        border-bottom: 1pt solid black;
    }
    td {
        text-align: center
    }
    table {
        border-collapse: collapse;
    }
</style>