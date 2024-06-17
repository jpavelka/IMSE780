<script>
    import BodyText from "$lib/BodyText.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
</script>

<Heading level=2 refId=badIpModels>Examples of bad IP modeling</Heading>

<BodyText>
    When modeling problems as integer programs, and especially when using binary variables to encode some type of logic, it can be very easy to <em>think</em> you've come up with a valid formulation, only to solve the problem and get an answer that you weren't expecting due to some bad constraints. In this section, I'll give some sample "bad" IP models that do not properly enforce the logic they were meant to, and discuss how things went wrong.
</BodyText>

<Heading level=3 refId=badIpBoolean>Boolean algebra</Heading>

<BodyText>
    Let's consider the Boolean algebra operations we modeled in <SectionRef refId=binVarTricks/>. We'll show wrong ways to model each of AND, OR, and XOR, and explain why they don't work as required. In each model, we want the binary variable <Math>{String.raw`y`}</Math> to equal the output of the specified Boolean function applied to binary variables <Math>{String.raw`x_1`}</Math> and <Math>{String.raw`x_2`}</Math>.
    <ul>
        <li>
            AND: Here's the truth table and an example <em>incorrect</em> formulation:
            <div style='display:flex;justify-content:space-around;overflow-x:auto'>
                <div>
                    <table><tbody>
                    <tr style='border-bottom:1px solid black'><th><Math>{String.raw`x_1`}</Math></th><th><Math>{String.raw`x_2`}</Math></th><th style='border-left:1px solid black'><Math>{String.raw`y`}</Math></th></tr>
                    <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
                    <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
                    <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
                    <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
                    </tbody></table>
                </div>
                <div style=width:2rem;></div>
                <div>
                    <MathDisp ignoreOverflow={true}>{String.raw`
                        \begin{align*}
                        y&\leq x_1 \\
                        y&\leq x_2 \\
                        y&\geq \frac{1}{2}(x_1 + x_2) \\
                        x_1, x_2, y & \in \{0,1\}
                        \end{align*}
                    `}</MathDisp>
                </div>
            </div>

            <BodyText>
                It is easy to look at this and say something like: "when <Math>{String.raw`x_1=x_2=1`}</Math> then the third constraint makes <Math>{String.raw`y=1`}</Math>, and otherwise one of <Math>{String.raw`y\leq x_1`}</Math> or <Math>{String.raw`y\leq x_2`}</Math> will force <Math>{String.raw`y=0`}</Math>". And while that statement is true, it fails to account for the fact that all constraints are active in an integer program, and we don't get to pick and choose which ones to enforce based on the situation.
            </BodyText>
            
            <BodyText>
                Once we start considering every constraint, we see that if only one of <Math>{String.raw`x_1`}</Math> or <Math>{String.raw`x_2`}</Math> equal 1 then there is no feasible value for <Math>{String.raw`y`}</Math>. For example, suppose that we have <Math>{String.raw`x_1=1`}</Math> and <Math>{String.raw`x_2=0`}</Math>. Then the second constraint will say <Math>{String.raw`y\leq0`}</Math>, while the third constraint will say <Math>{String.raw`y\geq1/2`}</Math>, and these two clearly can't be satisfied simultaneously. As a result, any model with this as part of the constraints will not be able to return a solution where <Math>{String.raw`x_1+x_2=1`}</Math>, which is probably not what you wanted.
            </BodyText>
        </li>
        <li>
            OR: Once again, here's the truth table and a <em>bad</em> formulation:
            <div style='display:flex;justify-content:space-around;overflow-x:auto'>
                <div>
                    <table><tbody>
                    <tr style='border-bottom:1px solid black'><th><Math>{String.raw`x_1`}</Math></th><th><Math>{String.raw`x_2`}</Math></th><th style='border-left:1px solid black'><Math>{String.raw`y`}</Math></th></tr>
                    <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
                    <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
                    <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
                    <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
                    </tbody></table>
                </div>
                <div>
                    <MathDisp ignoreOverflow={true}>{String.raw`
                    \begin{align*}
                    y&\geq x_1 \\
                    y&\geq x_2 \\
                    x_1, x_2, y & \in \{0,1\}
                    \end{align*}
                    `}</MathDisp>
                </div>
            </div>
            <BodyText>
                This will correctly force <Math>{String.raw`y=1`}</Math> in situations where either <Math>{String.raw`x_1`}</Math> or <Math>{String.raw`x_2`}</Math> (or both) are <Math>{String.raw`1`}</Math>, but it fails to properly account for the converse, i.e. the top row of the truth table when <Math>{String.raw`x_1=x_2=0`}</Math>. These constraints will allow either <Math>{String.raw`y=0`}</Math> or <Math>{String.raw`y=1`}</Math> in that case, instead of enforcing <Math>{String.raw`y=0`}</Math> like we want.
            </BodyText>
        </li>
        <li>
            XOR: The truth table and <em>improper</em> formulation:
            <div style='display:flex;justify-content:space-around;overflow-x:auto'>
                <div>
                    <table><tbody>
                    <tr style='border-bottom:1px solid black'><th><Math>{String.raw`x_1`}</Math></th><th><Math>{String.raw`x_2`}</Math></th><th style='border-left:1px solid black'><Math>{String.raw`y`}</Math></th></tr>
                    <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
                    <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
                    <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
                    <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
                    </tbody></table>
                </div>
                <div>
                    <MathDisp ignoreOverflow={true}>{String.raw`
                        \begin{align*}
                        y&\leq x_1 + x_2 \\
                        y&\geq x_1 \\
                        y&\geq x_2 \\
                        y&\leq x_1 - x_2 \\
                        x_1, x_2, y & \in \{0,1\}
                        \end{align*}
                    `}</MathDisp>
                </div>
            </div>
            <BodyText>
                We could once again be tricked by this formulation if we only consider certain constraints for certain scenarios. We could say:
                <ul>
                    <li>Constraint 1 forces <Math>{String.raw`y=0`}</Math> when <Math>{String.raw`x_1=0,x_2=0`}</Math></li>
                    <li>Constraint 2 forces <Math>{String.raw`y=1`}</Math> when <Math>{String.raw`x_1=1,x_2=0`}</Math></li>
                    <li>Constraint 3 forces <Math>{String.raw`y=1`}</Math> when <Math>{String.raw`x_1=0,x_2=1`}</Math></li>
                    <li>Constraint 4 forces <Math>{String.raw`y=0`}</Math> when <Math>{String.raw`x_1=1,x_2=1`}</Math></li>
                </ul>
            </BodyText>
            <BodyText>
                and think that we've satisfied all of our requirements. The catch, as with our AND formulation, is that these constraints must be considered <em>simultaneously</em> in <em>every</em> situation. So for example, in the situation <Math>{String.raw`x_1=0,x_2=1`}</Math> we would indeed get the third constraint forcing <Math>{String.raw`y=1`}</Math>. But we'd also have the fourth constraint forcing <Math>{String.raw`y\leq-1`}</Math>, meaning that the constraints can not all be satisfied in this case. Thus a model with this as part of the constraint set could never return a solution with <Math>{String.raw`x_1=0, x_2=1`}</Math>, incorrectly cutting off an entire segment of the problem's feasible region.
            </BodyText>
        </li>
    </ul>
</BodyText>



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