<script>
    import BodyText from "$lib/BodyText.svelte";
import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";

</script>
<Heading level=2 refId=symbols>Special symbols</Heading>

<BodyText>
    <ul>
        <li><Math>{String.raw`\R`}</Math>: The set of real numbers, i.e. anything on the number line between (though not including!) <Math>{String.raw`-\infty`}</Math> and <Math>{String.raw`\infty`}</Math>.</li>
        <li><Math>{String.raw`\R_+`}</Math>: The set of non-negative real numbers, i.e. anything in <Math>{String.raw`\R`}</Math> that is greater than or equal to 0.</li>
        <li><Math>{String.raw`\I`}</Math>: The set of integer numbers, i.e. whole numbers from the set <Math>{String.raw`\R`}</Math>.</li>
        <li><Math>{String.raw`\I_+`}</Math>: The set of non-negative integer numbers, i.e. anything in <Math>{String.raw`\I`}</Math> that is greater than or equal to 0.</li>
        <li><Math>{String.raw`\{\cdots\}`}</Math>: Set notation. Items inside the curly brackets are the elements of the set, so <Math>{String.raw`\{0,1\}`}</Math> is the 2-element set consisting of just the numbers 0 and 1.</li>
        <li><Math>{String.raw`\in`}</Math>: Set inclusion. When we write <Math>{String.raw`x\in S`}</Math>, we mean that <Math>{String.raw`x`}</Math> is an element of the set <Math>{String.raw`S`}</Math>. For example, we could write <Math>{String.raw`\pi\in\R`}</Math>, meaning the number <Math>{String.raw`\pi`}</Math> is a real number.</li>
        <li><Math>{String.raw`\subseteq`}</Math>: Subset. For two sets <Math>{String.raw`S, S'`}</Math>, we say <Math>{String.raw`S'\subseteq S`}</Math> (said "<Math>{String.raw`S'`}</Math> is a subset of <Math>{String.raw`S`}</Math>") if every element of <Math>{String.raw`S'`}</Math> is also an element of <Math>{String.raw`S`}</Math>.</li>
        <li><Math>{String.raw`|S|`}</Math>: Size of a set. This denotes the number of elements in a set, so e.g. <Math>{String.raw`|\{1,5,7,12\}|=4`}</Math>.</li>
        <li><Math>{String.raw`\emptyset`}</Math>: Empty set. A set with no elements.</li>
        <li><Math>{String.raw`\forall`}</Math>: For all. We use this symbol when we want to specify that something should be done for all elements in some set. So if we're writing out the constraints for some model and we say <Math>{String.raw`x_j\geq 0\ \forall\ j\in\{1, 2, \cdots, n\}`}</Math> we're just saying that each of <Math>{String.raw`x_1, x_2, \cdots, x_n`}</Math> should be non-negative.</li>
        <li><Math>{String.raw`\{x: x\textit{ satisfies some condition}\}`}</Math>: Conditional set. This represents the set of all <Math>{String.raw`x`}</Math> such that <Math>{String.raw`x`}</Math> satisfies the condition to the right of the colon (:). For example, <Math>{String.raw`\{n\in\I:5\leq n\leq 10\}`}</Math> is the set of all integers between 5 and 10, i.e. <Math>{String.raw`\{5,6,7,8,9,10\}`}</Math></li>
        <li><Math>{String.raw`S^m`}</Math>: The set of vectors with <Math>{String.raw`m`}</Math> elements, all of which are from some set <Math>{String.raw`S`}</Math>. For example, <Math>{String.raw`\R^3`}</Math> is the set of 3-element, real number vectors. So we could say
            <MathDisp>{String.raw`
                \begin{bmatrix}1 \\ 2.64 \\ -3\end{bmatrix}\in\R^3.
            `}</MathDisp>- <Math>{String.raw`S^{m\times n}`}</Math>: The set of matrices with <Math>{String.raw`m`}</Math> rows and <Math>{String.raw`n`}</Math> columns, whose elements are from some set <Math>{String.raw`S`}</Math>. For example, <Math>{String.raw`\I^{m\times n}`}</Math> is the set of <Math>{String.raw`m\times n`}</Math> matrices whose entries are all integers. So we could say
            <MathDisp>{String.raw`
            \begin{bmatrix}4 & 3 & 9 & 6\\ 0 & 4 & 8 & 5\\ 7 & 7 & 2 & 1\end{bmatrix} \in \I^{3\times 4}.
            `}</MathDisp>- <Math>{String.raw`\zeros`}</Math>: A matrix (or vector) with all entries equal to 0 (the size of the matrix is usually clear by context).</li>
        <li><Math>{String.raw`\identity`}</Math>: A square matrix with all entries equal to 0, except the diagonal where all entries equal 1 (the size of the matrix is usually clear by context). This looks like:
            <MathDisp>{String.raw`
                \begin{bmatrix}
                1 & 0 & \cdots & 0 \\
                0 & 1 & \cdots & 0 \\
                \vdots & \vdots & \ddots & \vdots \\
                0 & 0 & \cdots & 1 \\
                \end{bmatrix}
            `}</MathDisp>
        </li>
        <li><Math>{String.raw`\Leftrightarrow`}</Math>: If and only if. It indicates the the statement to the left is logically equivalent to the statement on the right, e.g. <Math>{String.raw`a > b \Leftrightarrow -a < -b`}</Math>.</li>
        <li><Math>{String.raw`\floor{x}`}</Math>: The "floor" of the number <Math>{String.raw`x\in\R`}</Math>, i.e. the value resulting from rounding <Math>{String.raw`x`}</Math> down to the nearest integer. So <Math>{String.raw`\floor{1.3}=1`}</Math>.</li>
        <li><Math>{String.raw`\ceil{x}`}</Math>: The "ceiling" of the number <Math>{String.raw`x\in\R`}</Math>, i.e. the value resulting from rounding <Math>{String.raw`x`}</Math> up to the nearest integer. So <Math>{String.raw`\ceil{1.3}=2`}</Math>.</li>
        <li><Math>{String.raw`f'`}</Math>: The derivative of some single-variable function <Math>{String.raw`f`}</Math>.</li>
        <li><Math>{String.raw`f''`}</Math>: The second derivative of some single-variable function <Math>{String.raw`f`}</Math>.</li>
        <li><Math>{String.raw`f'_{x_j}`}</Math>: The partial derivative of some multi-variable function <Math>{String.raw`f`}</Math> with respect to the variable <Math>{String.raw`x_j`}</Math>.</li>
        <li><Math>{String.raw`\nabla f`}</Math>: The gradient of some multivariate function <Math>{String.raw`f`}</Math>, i.e. the vector of partial derivatives. So we have:
            <MathDisp>{String.raw`
            \nabla f(\x) = \begin{bmatrix}
            f'_{x_1}(\x) \\
            f'_{x_2}(\x) \\
            \vdots \\
            f'_{x_n}(\x)
            \end{bmatrix}
            `}</MathDisp>  The symbol <Math>{String.raw`\nabla`}</Math> is called the "nabla" symbol.</li>
        <li><Math>{String.raw`\indicator_{\{\text{condition}\}}`}</Math>: A random variable that equals <Math>{String.raw`1`}</Math> if the condition in the subscript is true, and equals <Math>{String.raw`0`}</Math> if the condition is false.</li>
    </ul>
</BodyText>