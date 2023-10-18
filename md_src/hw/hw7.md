<div class='assignmentContainer' id='Homework 7' sub-name='Branch and bound' due='2023-10-16' grading-notes-link='https://colab.research.google.com/drive/1i4uq3Vntn-R6QBtFBlOlztbFi_HHc_n4?usp=sharing'>
<div>

Below we present some integer programming formulations, their partially finished branch and bound trees, and the next sub-problem to be explored from the tree. In each instance, please do the following:

- Write out the full formulation for the next sub-problem (including the constraints added during branching).
- Find an optimal solution for the next sub-problem's LP relaxation (give variable values and objective value).
- Indicate whether or not branching is required for this sub-problem and why.
- If branching is required, identify what constraints will be added to the new sub-problems.
- Determine what sub-problems can be pruned due to the above information you've gathered.

1.  (5pts):

    - Original problem:

      $$
      \begin{align*}
      \max && 5x_1 + 4x_2 + 4x_3 \\
      \st  &&  x_1 + 2x_2 + 2x_3 & \leq 10 \\
           && 5x_1 +  x_2 + 3x_3 & \leq 20 \\
           &&  x_1 +  x_2 +  x_3 & \leq 8 \\
           && x_1, x_2, x_3 & \in \I_+
      \end{align*}
      $$

    - Tree:

      <svg width=450 height=330 class="bbTreeDraw" base="bbTree1"></svg>

    - Next sub-problem: $P^2$

1.  (5pts):

    - Original problem:

      $$
      \begin{align*}
      \max && 3x_1 + 2x_2 + 2x_3 \\
      \st  && 3x_1 + 2x_2 + 3x_3 & \leq 11 \\
           && 2x_1 +  x_2 +  x_3 & \leq 9 \\
           &&  x_1 + 2x_2 + 3x_3 & \leq 8 \\
           && x_1, x_2, x_3 & \in \I_+
      \end{align*}
      $$

    - Tree:

      <svg width=450 height=330 class="bbTreeDraw" base="bbTree2"></svg>

    - Next sub-problem: $P^5$

1.  (5pts):

    - Original problem:

      $$
      \begin{align*}
      \max && 2x_1 + 4x_2 + 3x_3 \\
      \st  && 3x_1 + 4x_2 + 2x_3 & \leq 18 \\
           && 3x_1 + 5x_2 + 4x_3 & \leq 21 \\
           && 2x_1 + 5x_2 + 3x_3 & \leq 18 \\
           && x_1, x_2, x_3 & \in \I_+
      \end{align*}
      $$

    - Tree:

      <svg width=450 height=190 class="bbTreeDraw" base="bbTree3"></svg>

    - Next sub-problem: $P^2$

1.  (5pts):

    - Original problem:

      $$
      \begin{align*}
      \max && 1.5x_1 +  x_2 + 3x_3 \\
      \st  &&   3x_1 + 4x_2 + 5x_3 & \leq 12 \\
           &&   2x_1 +  x_2 + 4x_3 & \leq 10 \\
           &&   2x_1 + 2x_2 + 3x_3 & \leq 8 \\
           &&   x_1, x_2, x_3 & \in \I_+
      \end{align*}
      $$

    - Tree:

      <svg width=750 height=440 class="bbTreeDraw" base="bbTree4"></svg>

    - Next sub-problem: $P^4$

</div>
</div>
