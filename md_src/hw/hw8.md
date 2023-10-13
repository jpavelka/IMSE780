<div class='assignmentContainer' id='Homework 8' sub-name='Cutting planes' due='2023-10-23'>
<div>
1. (6pts) Suppose the constraints for some integer program are given by:
    $$
    \begin{align*}
    4x_1 + 5x_2 &\leq 17 \\
    3x_1 + x_2  &\leq 11 \\
    x_1, x_2 & \in\I_+
    \end{align*}
    $$
    For each of the following inequalities, determine whether or not it is valid for the IP.
    a. $x_2 \leq 3$
    a. $x_1 + 2x_2 \leq 3$
    a. $x_1 + x_2 \leq 5$
1. (4pts) Suppose you use simplex to solve the LP relaxation to some an integer program, and the system at the optimal basis looks like this:
    $$
    \begin{bmatrix}
        1 & 0 & 0 &  9/4 &  5/8 & 0 \\
        0 & 1 & 0 &  3/4 & -1/8 & 0 \\
        0 & 0 & 1 & -1/2 &  1/4 & 0 \\
        0 & 0 & 0 & -3/2 & -1/4 & 1
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5
    \end{bmatrix}
    =
    \begin{bmatrix}
        72/2 \\ 5/2 \\ 3 \\ 2
    \end{bmatrix}
    $$
    If you were using the Gomory fractional cutting plane algorithm to solve this problem, what inequality would you generate?
</div>
</div>
