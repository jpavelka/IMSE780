## Examples of bad IP modeling {#sec:badIpModels}

When modeling problems as integer programs, and especially when using binary variables to encode some type of logic, it can be very easy to _think_ you've come up with a valid formulation, only to solve the problem and get an answer that you weren't expecting due to some bad constraints. In this section, I'll give some sample "bad" IP models that do not properly enforce the logic they were meant to, and discuss how things went wrong.

### Boolean algebra

Let's consider the Boolean algebra operations we modeled in +@sec:binVarTricks. We'll show wrong ways to model each of AND, OR, and XOR, and explain why they don't work as required. In each model, we want the binary variable $y$ to equal the output of the specified Boolean function applied to binary variables $x_1$ and $x_2$.

 - AND: Here's the truth table and an example __incorrect__ formulation:
    <div style='display:flex;justify-content:space-around'>
    <div>
    <table><tbody>
    <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
    <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
    <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
    <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
    <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
    </tbody style='border:none'></table>
    </div>
    <div class='katexSideBySide'>
    $$
    \begin{align*}
    y&\leq x_1 \\
    y&\leq x_2 \\
    y&\geq \frac{1}{2}(x_1 + x_2) \\
     x_1, x_2, y & \in \{0,1\}
    \end{align*}
    $$
    </div>
    </div>

    It is easy to look at this and say something like: "when $x_1=x_2=1$ then the third constraint makes $y=1$, and otherwise one of $y\leq x_1$ or $y\leq x_2$ will force $y=0$". And while that statement is true, it fails to account for the fact that all constraints are active in an integer program, and we don't get to pick and choose which ones to enforce based on the situation.

    Once we start considering every constraint, we see that if only one of $x_1$ or $x_2$ equal 1 then there is no feasible value for $y$. For example, suppose that we have $x_1=1$ and $x_2=0$. Then the second constraint will say $y\leq0$, while the third constraint will say $y\geq1/2$, and these two clearly can't be satisfied simultaneously. As a result, any model with this as part of the constraints will not be able to return a solution where $x_1+x_2=1$, which is probably not what you wanted.

- OR: Once again, here's the truth table and a __bad__ formulation:
    <div style='display:flex;justify-content:space-around'>
    <div>
    <table><tbody>
    <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
    <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
    <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
    <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
    <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
    </tbody style='border:none'></table>
    </div>
    <div class='katexSideBySide'>
    $$
    \begin{align*}
    y&\geq x_1 \\
    y&\geq x_2 \\
    x_1, x_2, y & \in \{0,1\}
    \end{align*}
    $$
    </div>
    </div>

    This will correctly force $y=1$ in situations where either $x_1$ or $x_2$ (or both) are $1$, but it fails to properly account for the converse, i.e. the top row of the truth table when $x_1=x_2=0$. These constraints will allow either $y=0$ or $y=1$ in that case, instead of enforcing $y=0$ like we want.

- XOR: The truth table and __improper__ formulation:
    <div style='display:flex;justify-content:space-around'>
    <div>
    <table><tbody>
    <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
    <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
    <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
    <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
    <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
    </tbody style='border:none'></table>
    </div>
    <div class='katexSideBySide'>
    $$
    \begin{align*}
    y&\leq x_1 + x_2 \\
    y&\geq x_1 \\
    y&\geq x_2 \\
    y&\leq x_1 - x_2 \\
     x_1, x_2, y & \in \{0,1\}
    \end{align*}
    $$
    </div>
    </div>

    We could once again be tricked by this formulation if we only consider certain constraints for certain scenarios. We could say:
    
    - Constraint 1 forces $y=0$ when $x_1=0,x_2=0$
    - Constraint 2 forces $y=1$ when $x_1=1,x_2=0$
    - Constraint 3 forces $y=1$ when $x_1=0,x_2=1$
    - Constraint 4 forces $y=0$ when $x_1=1,x_2=1$

    and think that we've satisfied all of our requirements. The catch, as with our AND formulation, is that these constraints must be considered _simultaneously_ in _every_ situation. So for example, in the situation $x_1=0,x_2=1$ we would indeed get the third constraint forcing $y=1$. But we'd also have the fourth constraint forcing $y\leq-1$, meaning that the constraints can not all be satisfied in this case. Thus a model with this as part of the constraint set could never return a solution with $x_1=0, x_2=1$, incorrectly cutting off an entire segment of the problem's feasible region.