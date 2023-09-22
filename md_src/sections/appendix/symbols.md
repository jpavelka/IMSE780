## Special symbols {#sec:symbols}

- $\R$: The set of real numbers, i.e. anything on the number line between (though not including!) $-\infty$ and $\infty$.
- $\R_+$: The set of non-negative real numbers, i.e. anything in $\R$ that is greater than or equal to 0.
- $\I$: The set of integer numbers, i.e. whole numbers from the set $\R$.
- $\I_+$: The set of non-negative integer numbers, i.e. anything in $\I$ that is greater than or equal to 0.
- $\{\cdots\}$: Set notation. Items inside the curly brackets are the elements of the set, so $\{0,1\}$ is the 2-element set consisting of just the numbers 0 and 1.
- $\in$: Set inclusion. When we write $x\in S$, we mean that $x$ is an element of the set $S$. For example, we could write $\pi\in\R$, meaning the number $\pi$ is a real number.
- $\subseteq$: Subset. For two sets $S, S'$, we say $S'\subseteq S$ (said "$S'$ is a subset of $S$") if every element of $S'$ is also an element of $S$.
- $|S|$: Size of a set. This denotes the number of elements in a set, so e.g. $|\{1,5,7,12\}|=4$.
- $\emptyset$: Empty set. A set with no elements.
- $\forall$: For all. We use this symbol when we want to specify that something should be done for all elements in some set. So if we're writing out the constraints for some model and we say $x_j\geq 0\ \forall\ j\in\{1, 2, \cdots, n\}$ we're just saying that each of $x_1, x_2, \cdots, x_n$ should be non-negative.
- $\{x: x\textit{ satisfies some condition}\}$: Conditional set. This represents the set of all $x$ such that $x$ satisfies the condition to the right of the colon (:). For example, $\{n\in\I:5\leq n\leq 10\}$ is the set of all integers between 5 and 10, i.e. $\{5,6,7,8,9,10\}$
- $S^m$: The set of vectors with $m$ elements, all of which are from some set $S$. For example, $\R^3$ is the set of 3-element, real number vectors. So we could say
  $$
      \begin{bmatrix}1 \\ 2.64 \\ -3\end{bmatrix}\in\R^3.
  $$
- $S^{m\times n}$: The set of matrices with $m$ rows and $n$ columns, whose elements are from some set $S$. For example, $\I^{m\times n}$ is the set of $m\times n$ matrices whose entries are all integers. So we could say
  $$
  \begin{bmatrix}4 & 3 & 9 & 6\\ 0 & 4 & 8 & 5\\ 7 & 7 & 2 & 1\end{bmatrix} \in \I^{3\times 4}.
  $$
- $\zeros$: A matrix (or vector) with all entries equal to 0 (the size of the matrix is usually clear by context).
- $\identity$: A square matrix with all entries equal to 0, except the diagonal where all entries equal 1 (the size of the matrix is usually clear by context). This looks like:
  \begin{bmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1 \\
  \end{bmatrix}
- $\Leftrightarrow$: If and only if. It indicates the the statement to the left is logically equivalent to the statement on the right, e.g. $a > b \Leftrightarrow -a < -b$.