# Appendix {#sec:appendix}

## Special symbols

- $\R$: The set of real numbers, i.e. anything on the number line between (though not including!) $-\infty$ and $\infty$.
- $\R_+$: The set of nonnegative real numbers, i.e. anything in $\R$ that is greater than or equal to 0.
- $\I$: The set of integer numbers, i.e. whole numbers from the set $\R$.
- $\I_+$: The set of nonnegative integer numbers, i.e. anything in $\I$ that is greater than or equal to 0.
- $\{\cdots\}$: Set notation. Items inside the curly brackets are the elements of the set, so $\{0,1\}$ is the 2-element set consisting of just the numbers 0 and 1.
- $\in$: Set inclusion. When we write $x\in S$, we mean that $x$ is an element of the set $S$. For example, we could write $\pi\in\R$, meaning the number $\pi$ is a real number.
- $\forall$: For all. We use this symbol when we want to specify that something should be done for all elements in some set. So if we're writing out the constraints for some model and we say $x_i\geq 0\ \forall\ i\in\{1, 2, \cdots, n\}$ we're just saying that each of $x_1, x_2, \cdots, x_n$ should be nonnegative.
- $S^m$: The set of vectors with $m$ elements, all of which are from some set $S$. For example, $\R^3$ is the set of 3-element, real number vectors. So we could say
$$
    \begin{bmatrix}1 \\ 2.64 \\ -3\end{bmatrix}\in\R^3.
$$
- $S^{m\times n}$: The set of matrices with $m$ rows and $n$ columns, whose elements are from some set $S$. For example, $\I^{m\times n}$ is the set of $m\times n$ matrices whose entries are all integers. So we could say
$$
\begin{bmatrix}4 & 3 & 9 & 6\\ 0 & 4 & 8 & 5\\ 7 & 7 & 2 & 1\end{bmatrix} \in \I^{3\times 4}.
$$

## Linear algebra review

Linear algebra is the study of math involving matrices, vectors, and linear transformations. A __matrix__ (the basic object of linear algebra) is a rectangular array of numbers. For example, 
$$
\mat{A}=\begin{bmatrix} 2 & 4 \\ 7 & 0 \\ 6 & 3 \end{bmatrix}
$$
is a $3\times 2$ matrix. A __vector__ is a special type of matrix with either a single column or a single row, e.g.
$$
\mat{v}=\begin{bmatrix} 1 \\ 9 \\ 3 \end{bmatrix}
$$
is a __column vector__ and $$\mat{v}=\begin{bmatrix} 1 & 9 & 3 \end{bmatrix}$$ is a __row vector__.

In these notes, we will usually denote matrices with boldface, uppercase letters and vectors with boldface, lowercase letters. Additionally, vectors are usually assumed to be column vectors. If we need a vector $\mat{v}$ to be a row vector instead, we will usually explicitly transpose it as $\mat{v}^\T$ (see +@sec:matrixMath).

### Matrix math {#sec:matrixMath}

equality

transpose

addition

multiplication

inverse

$\mat{A}\mat{x} = \mat{b}$