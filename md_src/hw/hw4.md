<div class='assignmentContainer' id='Homework 4' sub-name='LP duality and sensitivity' due='2023-09-25' grading-notes-link='https://colab.research.google.com/drive/19ZhmKFLbi6K7O7lCb5zYC2Tb0iIyPJ7G?usp=sharing'>
<div>

1. (4pts) Construct the dual to the following linear program:
    $$
    \begin{align*}
    \max && 3x_1 - 4x_3 \\
    \st  && 4x_1 + 5x_2 + 7x_3 & \leq 15 \\
         && x_1 + 3x_2 - x_3 & \leq 8 \\
         && x_1,x_2,x_3 & \geq 0
    \end{align*}
    $$

1. (4pts) Suppose some vector $\x$ satisfies $\A\x=\b$, $\x\geq 0$, and some vector $\y$ satisfies $\y\A\geq\c$.
    a. What does the weak duality theorem tell you about how the values $\c\x$ and $\y\b$ relate to each other?
    b. Without appealing directly to weak duality, prove that the relationship from part (a) holds. (Meaning, don't just say it is true because of weak duality. Go through the matrix math necessary to show it. It is ok for your proof to follow the same sort of steps we took in class while proving weak duality.)

1. (4pts) In section 4.8.3 of the notes, we calculated the allowable range for $b_2$ in the Wyndor problem, i.e. the range over which the number of hours available at Plant 2 could change without altering the problem's optimal basis. Follow the same process to find the allowable range for $b_3$.

1. (4pts) Suppose that the Wyndor problem were altered in one of the following ways. Will the optimal basis for the original problem still be optimal in the altered problem? Provide your reasoning. (Each scenario is distinct, do not combine them.)
    a. Production capacities at all facilities are increased. There are now 7 hours available per week at Plant 1, 15 at Plant 2, and 20 at Plant 3.
    b. New technological advances have made Product 1 much easier to produce, and thus much more profitable. Each batch can now bring $7,000 in profit.

1. (4pts)* Using Python and whichever modeling library you prefer, formulate the following problem as a linear program and report the optimal solution.

    A cargo plane has three compartments for storing cargo: front, center, and back. These compartments have capacity limits on both weight and space, as summarized below:

    <table>
    <tr><th>Compartment</th><th>Weight Cap (tons)</th><th>Volume Cap($\text{ft}^3$)</th></tr>
    <tr><td>Front</td><td>12</td><td>7,000</td></tr>
    <tr><td>Center</td><td>18</td><td>9,000</td></tr>
    <tr><td>Back</td><td>10</td><td>5,000</td></tr>
    </table>

    Furthermore, the weight of the cargo in the respective compartments must be the same proportion of that compartment’s weight capacity to maintain the balance of the airplane.

    The following four cargoes have been offered for shipment on an upcoming flight as space is available:

    <table>
    <tr><th>Cargo</th><th>Weight (tons)</th><th>Volume ($\text{ft}^3$/ton)</th><th>Profit ($/ton)</th></tr>
    <tr><td>1</td><td>20</td><td>500</td><td>320</td></tr>
    <tr><td>2</td><td>16</td><td>700</td><td>400</td></tr>
    <tr><td>3</td><td>25</td><td>600</td><td>360</td></tr>
    <tr><td>4</td><td>13</td><td>400</td><td>290</td></tr>
    </table>

    Any portion of these cargoes can be accepted. The objective is to determine how much (if any) of each cargo should be accepted and how to distribute each among the compartments to maximize the total profit for the flight.

</div>
</div>