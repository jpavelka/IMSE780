<script>
    import BodyText from "$lib/BodyText.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
</script>
<Heading level=2 refId=linearAlgebra>Linear algebra review</Heading>

<BodyText>
    Linear algebra is the study of math involving matrices, vectors, and linear transformations. A <em>matrix</em> (the basic object of linear algebra) is a rectangular array of numbers. For example,
</BodyText>

<MathDisp>{String.raw`
    \mat{A}=\begin{bmatrix} 2 & 4 \\ 7 & 0 \\ 6 & 3 \end{bmatrix}
`}</MathDisp>

<BodyText>
    is a <Math>{String.raw`3\times 2`}</Math> matrix. A matrix is said to be <em>square</em> if it has the same number of rows and columns.
</BodyText>

<BodyText>
    In these notes, we will usually denote matrices with boldface, uppercase letters.
</BodyText>

<Heading level=3 refId=matrixMath>Matrix math</Heading>

<BodyText>
    We say Matrices <Math>{String.raw`\mat{A}`}</Math>, <Math>{String.raw`\mat{B}`}</Math> are <em>equal</em> if <em>all</em> of their elements are equal. First off, that means <Math>{String.raw`\mat{A}`}</Math> and <Math>{String.raw`\mat{B}`}</Math> must have the same number of rows <Math>{String.raw`m`}</Math> and columns <Math>{String.raw`n`}</Math>. Additionally, if we write notate the entries of the matrices like:
</BodyText>

<MathDisp refId=matrixDef>{String.raw`
    \mat{A} = \begin{bmatrix}
    a_{11} & a_{12} & \cdots & a_{1n} \\
    a_{21} & a_{22} & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{m1} & a_{m2} & \cdots & a_{mn} \\
    \end{bmatrix}
`}</MathDisp>

<BodyText>
    and
</BodyText>

<MathDisp>{String.raw`
    \mat{B} = \begin{bmatrix}
    b_{11} & b_{12} & \cdots & b_{1n} \\
    b_{21} & b_{22} & \cdots & b_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    b_{m1} & b_{m2} & \cdots & b_{mn} \\
    \end{bmatrix}.
`}</MathDisp>

<BodyText>
    Then we say <Math>{String.raw`\mat{A}=\mat{B}\ `}</Math> if and only if <Math>{String.raw`a_{11}=b_{11}`}</Math>, <Math>{String.raw`a_{12}=b_{12}`}</Math>, ... and so on.
</BodyText>

<BodyText>
    <em>Addition</em> is only defined for two matrices of the same size. For two <Math>{String.raw`m\times n`}</Math> matrices <Math>{String.raw`\mat{A}`}</Math> and <Math>{String.raw`\mat{B}`}</Math>, we have
</BodyText>

<MathDisp>{String.raw`
    \mat{A} + \mat{B} = \begin{bmatrix}
    a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n} \\
    a_{21} + a_{21} & a_{22} + a_{22} & \cdots & a_{2n} + a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{m1} + a_{m1} & a_{m2} + a_{m2} & \cdots & a_{mn} + a_{mn} \\
    \end{bmatrix}
`}</MathDisp>

<BodyText>
    For matrices, <em>multiplication</em> <Math>{String.raw`\A\B`}</Math> is only defined when the the second dimension of <Math>{String.raw`\A`}</Math> equals the first dimension of <Math>{String.raw`\B`}</Math>. So, if <Math>{String.raw`\A`}</Math> is an <Math>{String.raw`m\times n`}</Math> matrix (for some <Math>{String.raw`m, n`}</Math>), we need <Math>{String.raw`B`}</Math> to be an <Math>{String.raw`n\times s`}</Math> matrix (for some <Math>{String.raw`s`}</Math>). In this case, we define their product as the matrix <Math>{String.raw`\mat{C}`}</Math> having entries
</BodyText>

<MathDisp>{String.raw`
c_{ij} = \sum_{k=1}^n a_{ik}b_{kj}.
`}</MathDisp>

<BodyText>
    Here is a small example to see it in action:
</BodyText>

<MathDisp>{String.raw`
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
`}</MathDisp>

<BodyText>
    There is a simpler form of multiplication available between a matrix <Math>{String.raw`\A`}</Math> and a scalar (a single number) <Math>{String.raw`s`}</Math>, where each element of the product is simply the corresponding element of <Math>{String.raw`\A`}</Math> multiplied by <Math>{String.raw`s`}</Math>, i.e.
</BodyText>

<MathDisp>{String.raw`
    s\A = \begin{bmatrix}
    sa_{11} & sa_{12} & \cdots & sa_{1n} \\
    sa_{21} & sa_{22} & \cdots & sa_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    sa_{m1} & sa_{m2} & \cdots & sa_{mn} \\
    \end{bmatrix}
`}</MathDisp>

<Heading level=3 refId=matrixOpProps>Properties of matrix operations</Heading>

<BodyText>
    The above matrix operations satisfy the following properties:
    <ul>
        <li>
            Associativity of addition:
            <MathDisp>{String.raw`(\A + \mat{B}) + \mat{C} = \A + (\mat{B} + \mat{C})`}</MathDisp>
        </li>
        <li>
            Associativity of multiplication:
            <MathDisp>{String.raw`\A(\mat{B}\mat{C}) = (\A\mat{B})\mat{C}`}</MathDisp>
        </li>
        <li>
            Commutativity of addition:
            <MathDisp>{String.raw`\A + \mat{B} = \mat{B} + \A`}</MathDisp>
        </li>
        <li>
            Distributivity:
            <MathDisp>{String.raw`\A(\mat{B} + \mat{C}) = \A\mat{B} + \A\mat{C}`}</MathDisp>
        </li>
    </ul>
    You may notice that multiplication does not commute, i.e. <Math>{String.raw`\A\mat{B} \neq \mat{B}\A`}</Math>. Indeed, in the general case where <Math>{String.raw`\A`}</Math> is an <Math>{String.raw`m\times n`}</Math> matrix and <Math>{String.raw`\B`}</Math> is an <Math>{String.raw`n\times s`}</Math> matrix, the product <Math>{String.raw`\B\A`}</Math> is not even defined if <Math>{String.raw`m\neq s`}</Math>. Even if <Math>{String.raw`m=s`}</Math> and the product is defined, the result needs not be the same.
</BodyText>

<Heading level=3 refId=linAlgSpecMats>Special matrices</Heading>

<BodyText>
    A <em>vector</em> is a special type of matrix with either a single column or a single row, e.g.
</BodyText>

<MathDisp>{String.raw`
    \x=\begin{bmatrix} 1 \\ 9 \\ 3 \end{bmatrix}
`}</MathDisp>

<BodyText>
    is a <em>column vector</em> and <Math>{String.raw`\x=\begin{bmatrix} 1 & 9 & 3 \end{bmatrix}`}</Math> is a <em>row vector</em>. In these notes, vectors will usually be denoted with with boldface, lowercase letters. A convention in some texts, which we will not follow here, is for vectors to be assumed as column vectors unless explicitly transposed. For these notes, we will let context dictate whether a vector is a row vector or a column vector (it is usually clear).
</BodyText>

<BodyText>
    An <em>identity matrix</em>, denoted by <Math>{String.raw`\identity`}</Math>, is a square vector whose elements are all 0s expect for 1s along the diagonal, i.e.
</BodyText>

<MathDisp>{String.raw`
    \identity = \begin{bmatrix}
    1 & 0 & \cdots & 0 \\
    0 & 1 & \cdots & 0 \\
    \vdots & \vdots & \ddots & \vdots \\
    0 & 0 & \cdots & 1 \\
    \end{bmatrix}
`}</MathDisp>

<BodyText>
    The main property of identity matrices is that multiplying another (properly sized) matrix does not alter it, i.e. we have
</BodyText>

<MathDisp>{String.raw`
    \identity\A = \A,\quad \A\identity= \A.
`}</MathDisp>

<BodyText>
    Note that we usually don't explicitly specify the size of <Math>{String.raw`\identity`}</Math>, since it is usually clear from the context.
</BodyText>

<BodyText>
    The <em>null matrix</em> or <em>zero matrix</em>, denoted by <Math>{String.raw`\zeros`}</Math> is a matrix (or vector) with all entries equal to 0. Again, we will usually not explicitly specify its size since it will be clear from context. The zero matrix satisfies:
</BodyText>

<MathDisp>{String.raw`
    \A + \zeros = \A,\quad \zeros\A = \zeros,\quad \A\zeros = \A.
`}</MathDisp>

<BodyText>
    Note that <Math>{String.raw`\identity`}</Math> and <Math>{String.raw`\zeros`}</Math> play roles in matrix operations similar to the roles of 1 and 0 (respectively) in arithmetic.
</BodyText>

<Heading level=3 refId=linAlgRankInv>Rank and inverse</Heading>

<BodyText>
    A set of vectors <Math>\x_1, \x_2, \dots, \x_m</Math> is said to be <em>linearly dependent</em> if there exists <Math>m</Math> numbers <Math>c_1, c_2, \dots, c_m</Math>, some of which are not zeros, such that
</BodyText>

<MathDisp>
    c_1\x_1 + c_2\x_2 + \cdots + c_m\x_m = \zeros.
</MathDisp>

<BodyText>
    Otherwise, the vectors are said to be <em>linearly independent</em>. For example, the vectors
</BodyText>

<MathDisp>
    \x_1 = [1, 1, 1],\quad \x_2 = [0, 1, 1],\quad \x_3 = [2, 5, 5],
</MathDisp>

<BodyText>
    if we take <Math>c_1 = 2</Math>, <Math>c_2 = 3</Math>, and <Math>c_3 = -1</Math> then we have
</BodyText>

<MathDisp>{String.raw`
    \begin{align*}
    2\x{:underscore:}1 + 3\x{:underscore:}2 - x{:underscore:}3 & = [2, 2, 2] + [0, 3, 3] - [2, 5, 5]\\
                        & = [0, 0, 0]
    \end{align*}
`}</MathDisp>

<BodyText>
    so the vectors are linearly dependent.
</BodyText>

<BodyText>
    The <em>rank</em> of a set of vectors is the largest number of linearly independent vectors that can be chosen from the space. So e.g. the rank of <Math>{String.raw`\{\x{:underscore:}1, \x{:underscore:}2, \x{:underscore:}3\}`}</Math> from above is 2.
</BodyText>

<BodyText>
    Matrices also have a notion of rank. The <em>row rank</em> of a matrix is the rank of its set of row vectors, while the <em>column rank</em> of the matrix is the rank of its set of column vectors. An important result in linear algebra is that, for any matrix, the row rank and column rank are the same. Thus we can talk about the <em>rank</em> of a matrix, being equal to either the row rank or the column rank.
</BodyText>

<BodyText>
    Suppose <Math>{String.raw`\A`}</Math> is an <Math>{String.raw`n\times n`}</Math> (square) matrix. We say <Math>{String.raw`\A`}</Math> is <em>non-singular</em> if it has rank <Math>{String.raw`n`}</Math>. Otherwise, if the rank is less than <Math>{String.raw`n`}</Math>, we way it is <em>singular</em>. Importantly, if <Math>{String.raw`\A`}</Math> is non-singular, there is a unique non-singular matrix <Math>{String.raw`\A\inv`}</Math> such that
</BodyText>

<MathDisp>{String.raw`
    \A\A\inv = \identity = \A\inv\A.
`}</MathDisp>

<BodyText>
    We call the matrix <Math>{String.raw`\A\inv`}</Math> the <em>inverse</em> of <Math>{String.raw`\A`}</Math>. Furthermore, singular matrices do not have inverses.
</BodyText>

<Heading level=3 refId=linAlgSysEqn>Systems of equations</Heading>

<BodyText>
    Matrices are great for concisely stating systems of linear equations, linear equations in some set of variables you'd like to hold true simultaneously. For example, the set of equations
</BodyText>

<MathDisp>
    2x_1 + 3x_2 = 7\\
    5x_1 - 4x_2 = 6
</MathDisp>

<BodyText>
    can alternatively be stated as:
</BodyText>

<MathDisp>{String.raw`
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
`}</MathDisp>

<Heading level=3 refId=elementaryRowOperations>Elementary operations</Heading>

<BodyText>
    There are certain elementary operations one can perform on a system of linear equations that don't have an effect on the solution of the system. I'll state these operations in terms of rows, but similar operations exist for columns as well:
    <ul>
        <li>
            Interchange two rows:
            <MathDisp>{String.raw`
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
            `}</MathDisp>
        </li>
        <li>
            Multiply a row by a non-zero number, e.g. multiplying the top row by two:
            <MathDisp>{String.raw`
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
            `}</MathDisp>
        </li>
        <li>
            Add a multiple of one row to another row, e.g. multiplying the first row by 2 and adding it to the second:
            <MathDisp>{String.raw`
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
            `}</MathDisp>
        </li>
    </ul>
</BodyText>
