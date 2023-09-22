## Linear algebra review {#sec:linearAlgebra}

Linear algebra is the study of math involving matrices, vectors, and linear transformations. A **matrix** (the basic object of linear algebra) is a rectangular array of numbers. For example,

$$
\mat{A}=\begin{bmatrix} 2 & 4 \\ 7 & 0 \\ 6 & 3 \end{bmatrix}
$$

is a $3\times 2$ matrix. A matrix is said to be **square** if it has the same number of rows and columns.

In these notes, we will usually denote matrices with boldface, uppercase letters.

### Matrix math {#sec:matrixMath}

We say Matrices $\mat{A}$, $\mat{B}$ are **equal** if _all_ of their elements are equal. First off, that means $\mat{A}$ and $\mat{B}$ must have the same number of rows $m$ and columns $n$. Additionally, if we write notate the entries of the matrices like:

$$
\mat{A} = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}
$$

{#eq:matrixDef}

and

$$
\mat{B} = \begin{bmatrix}
b_{11} & b_{12} & \cdots & b_{1n} \\
b_{21} & b_{22} & \cdots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
b_{m1} & b_{m2} & \cdots & b_{mn} \\
\end{bmatrix}.
$$

Then we say $\mat{A}=\mat{B}\ $ if and only if $\ a_{11}=b_{11}$, $a_{12}=b_{12}$, ... and so on.

**Addition** is only defined for two matrices of the same size. For two $m\times n$ matrices $\mat{A}$ and $\mat{B}$, we have

$$
\mat{A} + \mat{B} = \begin{bmatrix}
a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n} \\
a_{21} + a_{21} & a_{22} + a_{22} & \cdots & a_{2n} + a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} + a_{m1} & a_{m2} + a_{m2} & \cdots & a_{mn} + a_{mn} \\
\end{bmatrix}
$$

For matrices, **multiplication** $\A\B$ is only defined when the the second dimension of $\A$ equals the first dimension of $\B$. So, if $\A$ is an $m\times n$ matrix (for some $m, n$), we need $B$ to be an $n\times s$ matrix (for some $s$). In this case, we define their product as the matrix $\mat{C}$ having entries

$$
c_{ij} = \sum_{k=1}^n a_{ik}b_{kj}.
$$

Here is a small example to see it in action:

$$
\begin{align*}
\begin{bmatrix}0&1\\2&3\\4&5\end{bmatrix}
\begin{bmatrix}6&7\\8&9\end{bmatrix}
&=
\begin{bmatrix}
0\cdot6 + 1\cdot8 & 0\cdot7 + 1\cdot9 \\
2\cdot6 + 3\cdot8 & 2\cdot7 + 3\cdot9 \\
4\cdot6 + 5\cdot8 & 4\cdot7 + 5\cdot9 \\
\end{bmatrix}\\
&=
\begin{bmatrix}8&9\\36&41\\64&73\end{bmatrix}
\end{align*}
$$

There is a simpler form of multiplication available between a matrix $\A$ and a scalar (a single number) $s$, where each element of the product is simply the corresponding element of $\A$ multiplied by $s$, i.e.

$$
s\A = \begin{bmatrix}
sa_{11} & sa_{12} & \cdots & sa_{1n} \\
sa_{21} & sa_{22} & \cdots & sa_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
sa_{m1} & sa_{m2} & \cdots & sa_{mn} \\
\end{bmatrix}
$$

### Properties of matrix operations

The above matrix operations satisfy the following properties:

- Associativity of addition:$$(\A + \mat{B}) + \mat{C} = \A + (\mat{B} + \mat{C})$$
- Associativity of multiplication:$$\A(\mat{B}\mat{C}) = (\A\mat{B})\mat{C}$$
- Commutativity of addition:$$\A + \mat{B} = \mat{B} + \A$$
- Distributivity:$$\A(\mat{B} + \mat{C}) = \A\mat{B} + \A\mat{C}$$

You may notice that multiplication does not commute, i.e. $\A\mat{B} \neq \mat{B}\A$. Indeed, in the general case where $\A$ is an $m\times n$ matrix and $\B$ is an $n\times s$ matrix, the product $\B\A$ is not even defined if $m\neq s$. Even if $m=s$ and the product is defined, the result needs not be the same.

### Special matrices

A **vector** is a special type of matrix with either a single column or a single row, e.g.

$$
\x=\begin{bmatrix} 1 \\ 9 \\ 3 \end{bmatrix}
$$

is a **column vector** and $$\x=\begin{bmatrix} 1 & 9 & 3 \end{bmatrix}$$ is a **row vector**. In these notes, vectors will usually be denoted with with boldface, lowercase letters. A convention in some texts, which we will not follow here, is for vectors to be assumed as column vectors unless explicitly transposed. For these notes, we will let context dictate whether a vector is a row vector or a column vector (it is usually clear).

An **identity matrix**, denoted by $\identity$, is a square vector whose elements are all 0s expect for 1s along the diagonal, i.e.

$$
\identity = \begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1 \\
\end{bmatrix}
$$

The main property of identity matrices is that multiplying another (properly sizes) matrix does not alter it, i.e. we have

$$
\identity\A = \A,\quad \A\identity= \A.
$$

Note that we usually don't explicitly specify the size of $\identity$, since it is usually clear from the context.

The **null matrix** or **zero matrix**, denoted by $\zeros$ is a matrix (or vector) with all entries equal to 0. Again, we will usually not explicitly specify its size since it will be clear from context. The zero matrix satisfies:

$$
\A + \zeros = \A,\quad \zeros\A = \zeros,\quad \A\zeros = \A.
$$

Note that $\identity$ and $\zeros$ play roles in matrix operations similar to the roles of 1 and 0 (respectively) in arithmetic.

### Rank and inverse

A set of vectors $\x_1, \x_2, \dots, \x_m$ is said to be **linearly dependent** if there exists $m$ numbers $c_1, c_2, \dots, c_m$, some of which are not zeros, such that

$$
c_1\x_1 + c_2\x_2 + \cdots + c_m\x_m = \zeros.
$$

Otherwise, the vectors are said to be **linearly independent**. For example, the vectors

$$
\x_1 = [1, 1, 1],\quad \x_2 = [0, 1, 1],\quad \x_3 = [2, 5, 5],
$$

if we take $c_1 = 2$, $c_2 = 3$, and $c_3 = -1$ then we have

$$
\begin{align*}
2\x_1 + 3\x_2 - x_3 & = [2, 2, 2] + [0, 3, 3] - [2, 5, 5]\\
                    & = [0, 0, 0]
\end{align*}
$$

so the vectors are linearly dependent.

The **rank** of a set of vectors is the largest number of linearly independent vectors that can be chosen from the space. So e.g. the rank of $\{\x_1, \x_2, \x_3\}$ from above is 2.

Matrices also have a notion of rank. The **row rank** of a matrix is the rank of its set of row vectors, while the **column rank** of the matrix is the rank of its set of column vectors. An important result in linear algebra is that, for any matrix, the row rank and column rank are the same. Thus we can talk about the **rank** of a matrix, being equal to either the row rank or the column rank.

Suppose $\A$ is an $n\times n$ (square) matrix. We say $\A$ is **non-singular** if it has rank $n$. Otherwise, if the rank is less than $n$, we way it is **singular**. Importantly, if $\A$ is non-singular, there is a unique non-singular matrix $\A\inv$ such that

$$
\A\A\inv = \identity = \A\inv\A.
$$

We call the matrix $\A\inv$ the **inverse** of $\A$. Furthermore, singular matrices do not have inverses.

### Systems of equations

Matrices are great for concisely stating systems of linear equations, linear equations in some set of variables you'd like to hold true simultaneously. For example, the set of equations

$$
2x_1 + 3x_2 = 7\\
5x_1 - 4x_2 = 6
$$

can alternatively be stated as:

$$
\begin{bmatrix}
2 & 3 \\
5 & -4
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2
\end{bmatrix}
=
\begin{bmatrix}
7 \\ 6
\end{bmatrix}
$$

### Elementary operations {#sec:elementaryRowOperations}

There are certain elementary operations one can perform on a system of linear equations that don't have an effect on the solution of the system. I'll state these operations in terms of rows, but similar operations exist for columns as well:

- Interchange two rows:
  $$
  \begin{bmatrix}
  2 & 3 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 6
  \end{bmatrix}
  \Leftrightarrow
  \begin{bmatrix}
  5 & -4 \\
  2 & 3
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  6 \\ 7
  \end{bmatrix}
  $$
- Multiply a row by a non-zero number, e.g. multiplying the top row by two:
  $$
  \begin{bmatrix}
  2 & 3 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 6
  \end{bmatrix}
  \Leftrightarrow
  \begin{bmatrix}
  4 & 6 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  14 \\ 6
  \end{bmatrix}
  $$
- Adding a multiple of one row to another row, e.g. multiplying the first row by 2 and adding it to the second:
  $$
  \begin{bmatrix}
  2 & 3 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 6
  \end{bmatrix}
  \Leftrightarrow
  \begin{bmatrix}
  2 & 3 \\
  9 & 2
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 20
  \end{bmatrix}
  $$