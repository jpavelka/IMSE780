<div class='assignmentContainer' id='Homework 3' sub-name='The simplex method' due='2023-09-18' grading-notes-link='https://colab.research.google.com/drive/1ESgWjaS1rzgfaAbK2jfEvtqfjUSo15zF?usp=sharing'>
<div>
1. (8pts)* Fred Jonasson manages a family-owned farm. To supplement several food products grown on the farm, Fred also raises pigs for market. He now wishes to determine the quantities of the available types of feed (corn, tankage, and alfalfa) that should be given to each pig. Since pigs will eat any mix of these feed types, the objective is to determine which mix will meet certain nutritional requirements at a minimum cost. The number of units of each type of basic nutritional ingredient contained within a kilogram of each feed type is given in the following table, along with the daily nutritional requirements and feed costs:

    <table>
    <tr>
        <th></th><th>kg of Corn</th><th>kg of Tankage</th><th>kg of Alfalfa</th><th>Min Daily Requirement</th>
    </tr>
    <tr>
        <td><b>Carbs</b></td><td>90</td><td>20</td><td>40</td><td>200</td>
    </tr>
    <tr>
        <td><b>Protein</b></td><td>30</td><td>80</td><td>60</td><td>180</td>
    </tr>
    <tr>
        <td><b>Vitamins</b></td><td>10</td><td>20</td><td>60</td><td>150</td>
    </tr>
    <tr>
        <td><b>Cost</b></td><td>$2.10</td><td>$1.80</td><td>$1.50</td><td></td>
    </tr>
    </table>

    a. Model the problem as a linear program.
    b. Rewrite your model as a matrix system set up for running simplex, adding slack and/or artificial variables as necessary. The matrix should be set up such that it is ready for a new iteration of simplex, i.e. it should look something like:
    
    <div class='mathSmall'>
    $$
    \begin{bmatrix}
        1 & -c_1    & -c_2    & \cdots & -c_{n-m}  & 0 & 0 & \cdots & 0 \\
        0 & a_{1,1} & a_{1,2} & \cdots & a_{1,n-m} & 1 & 0 & \cdots & 0 \\
        0 & a_{2,1} & a_{2,2} & \cdots & a_{2,n-m} & 0 & 1 & \cdots & 0 \\
        \vdots & \vdots & \ddots & \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\
        0 & a_{m,1} & a_{m,2} & \cdots & a_{m,n-m} & 0 & 0 & \cdots & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ \vdots \\ x_n
    \end{bmatrix}
    =
    \begin{bmatrix}
        \textit{objective value} \\ b_1 \\ b_2 \\ \vdots \\ b_m
    \end{bmatrix}
    $$
    </div>

1. (12pts) The following matrix systems each display a system of equations ready for an iteration of the simplex method. For each system, tell me:
 - What variables make up the current basis?
 - What is the objective value at the current basic solution?
 - Is the current basis optimal?
 - If the current basis is not optimal, further provide the following:
   - What variable would you next bring into the basis?
   - Given your selection of incoming variable, what variable should exit the basis?
   - Given your selection of incoming and outgoing variables, what are the values for all the variables at the next basic solution?
 
    a.
    $$
    \begin{bmatrix}
        1 &  1 &  1 & -2 & 0 & 0 & 0 \\
        0 &  1 &  2 & -1 & 1 & 0 & 0 \\
        0 & -2 &  4 &  2 & 0 & 1 & 0 \\
        0 &  2 &  3 &  1 & 0 & 0 & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\x_5 \\ x_6
    \end{bmatrix}
    =
    \begin{bmatrix}
        0 \\ 20 \\ 60 \\ 50
    \end{bmatrix}
    $$
    b.
    $$
    \begin{bmatrix}
        1 & -3 & -5 & -6 & 0 & 0 & 0 & 0 \\
        0 &  2 &  1 &  1 & 1 & 0 & 0 & 0 \\
        0 &  1 &  2 &  1 & 0 & 1 & 0 & 0 \\
        0 &  1 &  1 &  2 & 0 & 0 & 1 & 0 \\
        0 &  1 &  1 &  1 & 0 & 0 & 0 & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\x_5 \\ x_6 \\ x_7
    \end{bmatrix}
    =
    \begin{bmatrix}
        0 \\ 4 \\ 4 \\ 4 \\ 3
    \end{bmatrix}
    $$
    c.
    $$
    \begin{bmatrix}
        1 & 0 &   -1 &  0 & 0 & 0 &   2 \\
        0 & 0 &    2 &  1 & 0 & 0 &  -1 \\
        0 & 0 &  7/2 &  0 & 1 & 0 & 3/2 \\
        0 & 0 &    2 &  0 & 0 & 1 &   0 \\
        0 & 1 &  1/2 &  0 & 0 & 0 & 1/2 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\x_5 \\ x_6
    \end{bmatrix}
    =
    \begin{bmatrix}
        8 \\ 2 \\ 9 \\ 5 \\ 2
    \end{bmatrix}
    $$

</div>
</div>