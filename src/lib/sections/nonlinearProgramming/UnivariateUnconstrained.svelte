<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Theorem from "$lib/Theorem.svelte";

    import bisectionTable from "$lib/images/bisection-example-table.png";
    import newtonTable from "$lib/images/newton-example-table.png";
</script>

<Heading level=2 refId=univariateUnconstrained>Single-variable unconstrained optimization</Heading>
<BodyText>
    Let's now jump into our first class of nonlinear optimization problems. Naturally, we'll start with a simple case, and one you already know something about from your calculus class: optimizing a function <Math>f(x)</Math> with a single variable and no constraints.
</BodyText>

<Heading level=3 refId=calcReview>Calculus review</Heading>
<BodyText>
    Recall that for this course we're assuming <Math>f</Math> to be differentiable everywhere. That being the case, a necessary condition for some <Math>x'</Math> to be optimal for <Math>f</Math> is that the derivative is equal to 0 at <Math>x'</Math>, i.e.:
</BodyText>

<MathDisp>
    f'(x') = 0.
</MathDisp>
<BodyText>
    These points <Math>x'</Math> with <Math>f'(x')=0</Math> are called the <em>critical points</em> of <Math>f</Math>. You probably remember this condition from calculus, but do you remember why it's necessary? Let's take a moment to recall the definition of a derivative:
</BodyText>

<MathDisp>
    f'(x) = \lim_{h\rightarrow0}\frac{f(x + h) - f(x)}{h}.
</MathDisp>
<BodyText>
    Suppose now that we'd like minimize some function <Math>f</Math>, and we know at some point <Math>x'</Math> that <Math>f'(x')<0</Math>. Then by the above definition, there must be some <Math>h>0</Math> such that
</BodyText>

<MathDisp>\begin{align*}
\frac{f(x' + h) - f(x')}{h} < 0 &\Leftrightarrow f(x' + h) - f(x') < 0 \\
&\Leftrightarrow f(x' + h) < f(x')
\end{align*}
</MathDisp>
<BodyText>
    and thus <Math>x'</Math> cannot minimize <Math>f</Math>. Similar arguments hold for each combination of minimization/maximization and <Math>f'(x')>0</Math> or <Math>f'(x')<0</Math>.
</BodyText>
<BodyText>
    So <Math>f'(x')=0</Math> is a necessary condition for <Math>x'</Math> to be optimal, but as you'll recall it is not sufficient. A common example is the function <Math>f(x)=x^3</Math> (plotted below), where we have <Math>f'(0)=0</Math> but <Math>x'=0</Math> is not any kind of maximum or minimum for the function. For any <Math>h>0</Math>, no matter how small, you'll have <Math>f(h) > f(0)</Math> and <Math>f(-h) < f(0)</Math>.
</BodyText>

<!-- todo: plotly -->
<!-- <div style='width:350px;height:350px' class='plotlyFunctionPlot basicCenter' expression='x^3' xRange='[-1.5, 1.5]' extraPoints='[[0, 0]]'></div> -->
<BodyText>
    However, if <Math>f</Math> has a second derivative there is more we can say. Suppose again we'd like to minimize <Math>f</Math> and we have some point <Math>x'</Math> such that <Math>f'(x')=0</Math> and also <Math>f''(x')>0</Math>. By definition of the derivative, we have:
</BodyText>

<MathDisp>f''(x')=\lim_{h\rightarrow0}\frac{f'(x' + h) - f'(x')}{h}
</MathDisp>
<BodyText>
    Since <Math>f'(x') = 0</Math>, we simply have
</BodyText>

<MathDisp>f''(x')=\lim_{h\rightarrow0}\frac{f'(x' + h)}{h}
</MathDisp>
<BodyText>
    Since we've said that <Math>f''(x') > 0</Math>, we must have
</BodyText>

<MathDisp>\frac{f'(x' + h)}{h} > 0
</MathDisp>
<BodyText>
    for sufficiently small <Math>h</Math><Footnote>This is the usual trick when working with limits. When some condition is true in the limit, it just means that there is <em>some</em> area (perhaps incredibly small) around the point of interest where the condition is always true.</Footnote>. When <Math>h</Math> is sufficiently small and positive, we multiply each side by <Math>h</Math> to see that
</BodyText>

<MathDisp>
    f'(x' + h) > 0
</MathDisp>
<BodyText>
    i.e. <Math>f</Math> is increasing in some small neighborhood to the right of <Math>x'</Math>. Similarly, if <Math>h</Math> is sufficiently small and negative, multiplying by <Math>h</Math> flips the sign and we get
</BodyText>

<MathDisp>
    f'(x' + h) < 0
</MathDisp>
<BodyText>
    i.e. <Math>f</Math> is decreasing in the small neighborhood to the left of <Math>x'</Math>. Putting it all together (and staying within a sufficiently small neighborhood of <Math>x'</Math>), as we approach <Math>x'</Math> from the left <Math>f</Math> continues to decrease. Then we hit <Math>x'</Math>, and as we continue on to the right <Math>f</Math> will start increasing. Thus <Math>x'</Math> must be the minimum of <Math>f</Math> within that neighborhood.
</BodyText>
<BodyText>
    What we've described here is just the familiar <em>second derivative test</em> from calculus. Namely, if <Math>x'</Math> is a critical point of <Math>f</Math> and <Math>f''(x')>0</Math> then <Math>x'</Math> is a <em>local minimum</em> of <Math>f</Math>. Similarly, if <Math>f''(x')<0</Math> then <Math>x'</Math> is a <em>local maximum</em> of <Math>f</Math>.
</BodyText>
<BodyText>
    Of course, the difficulty is in the word <em>local</em>  Being a local optimum means that you are the optimal solution within some portion of <Math>f</Math>, but not necessarily optimal when looking at the entire domain of <Math>f</Math>. As an example, the function <Math>f(x)=x^3 - x</Math> (plotted below) has a local maximum at <Math>x=\frac{-1}{\sqrt{3}}</Math> and a local minimum at <Math>x=\frac{1}{\sqrt{3}}</Math>. But neither point is a true optimum. Indeed, there is no optimal value for this function at all, as the plot goes off to <Math>\infty</Math> to the right and <Math>-\infty</Math> to the left.
</BodyText>

<!-- todo: plotly -->
<!-- <div style='width:350px;height:350px' class='plotlyFunctionPlot basicCenter' expression='x^3 - x' xRange='[-1.5, 1.5]' extraPoints='[["1 / sqrt(3)", "eval"], ["-1 / sqrt(3)", "eval"]]'></div> -->
<BodyText>
    What we'd usually like to find is a <em>global minimum</em> (or <em>global maximum**) of the function, i.e. the point <Math>x^*</Math> at which <Math>f(x^*) \leq f(x)</Math> (or <Math>f(x^*) \geq f(x)</Math> for a maximum) for <em>any</em> <Math>x</Math> in the domain of <Math>f</Math>. For an arbitrary function <Math>f</Math> it can be difficult to ascertain whether a given local optimum is also globally optimal. But there are certain types of functions for which we can make this determination easily.
</BodyText>

<Heading level=3 refId=convexConcave>Convexity and concavity</Heading>
<BodyText>
    Nonlinear programming can be challenging. Tell an OR practitioner to solve a nonlinear optimization problem and they may get a little nervous. But if you tell them the objective function is convex, they'll breathe a sigh of relief. Convexity makes everything better in OR land.
</BodyText>
<BodyText>
    A function of a single variable <Math>f</Math> is said to be a <em>convex function</em> if, for each pair of values <Math>x',x''</Math> and any <Math>\lambda</Math> with <Math>0<\lambda<1</Math>, we have
</BodyText>

<MathDisp refId=convexDefinition1d>
    f(\lambda x'' + (1-\lambda)x')\leq \lambda f(x'') + (1 - \lambda)f(x')
</MathDisp>

<BodyText>
    If the <Math>\leq</Math> can be replaced by a <Math><</Math>, then the we say that function is a <em>strictly convex function</em> 
</BodyText>
<BodyText>
    That is an admittedly symbol-heavy definition, so let's try to unpack it. On the left-hand side we've taken a combination of <Math>x'</Math> and <Math>x''</Math> then evaluated <Math>f</Math> at that combination. On the right-hand side we evaluated <Math>f</Math> at each point <Math>x'</Math> and <Math>x''</Math> and then taken a combination of those values. So the difference is only in the order in which we apply the function and the combination.
</BodyText>
<BodyText>
    But it's easier to see on a plot, so let's look at some. Below, I've plotted three functions: <Math>f(x)=x^2 - \frac{1}{2}</Math> on the left, <Math>f(x)=x^3 - x</Math> in the middle, and <Math>f(x)=-x^2 + \frac{1}{2}</Math> on the right. For each one let's consider <Math>x'=-1</Math> and <Math>x''=1</Math>. The red dots represent the points <Math>(x', f(x'))</Math> and <Math>(x'', f(x''))</Math>.
</BodyText>

<!-- todo: plotly -->
<!-- <div style='display:flex;justify-content:space-around'>
<div style='width:200px;height:200px' class='plotlyFunctionPlot' expression='x^2 - 0.5' xRange='[-1.5, 1.5]' extraPoints='[[-1, "eval", "red", 8], [1, "eval", "red", 8]]' lineBetweenPoints='true'></div>
<div style='width:200px;height:200px' class='plotlyFunctionPlot' expression='x^3 - x' xRange='[-1.5, 1.5]' extraPoints='[[-1, "eval", "red", 8], [1, "eval", "red", 8]]' lineBetweenPoints='true'></div>
<div style='width:200px;height:200px' class='plotlyFunctionPlot' expression='-x^2 + 0.5' xRange='[-1.5, 1.5]' extraPoints='[[-1, "eval", "red", 8], [1, "eval", "red", 8]]' lineBetweenPoints='true'></div>
</div> -->

<BodyText>
    For any <Math>\lambda</Math>, the right-hand side of <EquationRef refId=convexDefinition1d/> <Math>\lambda f(x'') + (1 - \lambda)f(x')</Math> will equate to some point on the red line segment. Meanwhile, the left-hand <Math>f(\lambda x'' + (1-\lambda)x')</Math> side refers to a value on the function curve in the same vertical line. Hence the <EquationRef refId=convexDefinition1d/> will be satisfied for every lambda exactly when the red line segment is always above the corresponding segment of the curve. Given this, the second and third of our plots clearly do not correspond to convex functions.
</BodyText>
<BodyText>
    What about the first plot? Unfortunately we can't prove convexity with just one line segment. The definition stipulates that <em>any</em> such line segment is always above the curve <em>no matter where you put the end points</em>  But I think you can imagine that this is true for the first plot. Indeed, the first function <Math>f(x)=x^2 + \frac{1}{2}</Math> <em>is</em> convex.
</BodyText>
<BodyText>
    The appeal of working with convex functions is due to the following result:
</BodyText>

<Theorem refId=convexLocalOptIsGlobalOpt hideProof={true}>
    <BodyText>
        Suppose <Math>f</Math> is a convex function and <Math>x^*</Math> is a local minimum for <Math>f</Math>. Then <Math>x^*</Math> is also a global minimum for <Math>f</Math>.
    </BodyText>
    <span slot=proof>
        <BodyText>
            For this proof we'll assume that <Math>f</Math> is a function of a single variable, but you should know that both the definition for convexity and this theorem are still valid when <Math>f</Math> is a multivariate function.
        </BodyText>
        <BodyText>
            Since <Math>x^*</Math> is a local minimum, there exists some number <Math>p\in \R</Math> such that for any <Math>y</Math> with <Math>|x^* - y| < p</Math> (i.e. any point within a distance of <Math>p</Math> from <Math>x^*</Math>) we have <Math>f(y) \geq f(x^*)</Math>. Our proof will go by contradiction, so for contradiction assume that <Math>x^*</Math> is not a global minimum and hence there exists some <Math>x'</Math> that satisfies <Math>f(x') < f(x^*)</Math>.
        </BodyText>
        <BodyText>
            However, by the definition of convexity, for any <Math>0<\lambda<1</Math> we have
        </BodyText>
    
        <MathDisp>\begin{align*}
        f(\lambda x' + (1-\lambda)x^*)&\leq\lambda f(x') + (1-\lambda)f(x^*) \\
        &<\lambda f(x^*) + (1-\lambda)f(x^*) \\
        &=f(x^*)
        \end{align*}
        </MathDisp>
        <BodyText>
            But if we choose <Math>\lambda</Math> small enough then we will have <Math>|x^*-(\lambda x' + (1-\lambda)x^*)|<p</Math>, contradicting that <Math>x^*</Math> was a local minimum.
        </BodyText>
    </span>
</Theorem>

<BodyText>
    Luckily, we do not need to go about drawing graphs and line segments whenever we want to prove convexity, so long as <Math>f</Math> has a second derivative. If this is the case, then <Math>f</Math> is convex if and only if <Math>f''(x)\geq0</Math> for every <Math>x</Math>. Similarly, <Math>f</Math> is strictly convex if and only if <Math>f''(x)>0</Math> for every <Math>x</Math>. In your calculus class, you may have called this a "concave up" function. Geometrically, this is interpreted as a function that is always "curving upward", which meshes well with our "curve below the line segment" definition above.
</BodyText>
<BodyText>
    Furthermore, as you might suspect, there is a similar notion for maximization problem, which we obtain by flipping all the related inequalities. This time, we use the term <em>concave function</em> for any function <Math>f</Math> that satisfies
</BodyText>

<MathDisp>f(\lambda x'' + (1-\lambda)x')\geq \lambda f(x'') + (1 - \lambda)f(x')
</MathDisp>
<BodyText>
    If the above is satisfied when replacing <Math>\geq</Math> with <Math>></Math> then we have a <em>strictly concave function</em>  This time the interpretation is flipped, so that the line segment must lie <em>below</em> the the function plot, as in the third plot in our above figure. Functions with a second derivative are concave if and only if <Math>f''(x)\leq 0</Math> for every <Math>x</Math>, with strictness achieved if <Math>f''(x)<0</Math>. This type of function is also described as being "concave down"<Footnote>Yes, I agree it's confusing that a concave function in our new sense only corresponds to a "concave down" function, while a "concave up" function is convex and not at all concave. Sorry.</Footnote>, and is characterized by its "curving downward" nature.
</BodyText>

<BodyText>
    Regardless if we're working on a minimization problem over a convex function or a maximization problem over a concave function, we know that once we've found a critical point we have what we're looking for (no need to worry about the point only being a local optimum).
</BodyText>

<Heading level=3 refId=analyticVsNumeric>Analytical vs. numerical methods</Heading>
<BodyText>
    At this point, it may seem that we've covered everything we need to know about minimizing/maximizing convex/concave functions of single variables. For example, the previous section tells us that in order to find the maximum of <Math>f(x)=-x^2</Math> it suffices to show
</BodyText>

<MathDisp>f'(x) = 0 \Leftrightarrow -2x = 0 \Leftrightarrow x=0
</MathDisp>
<BodyText>
    This is true, but sometimes we are not so lucky that we can analytically solve for <Math>f'(x)=0</Math> as we did here, and in fact it comes up often in practice that an analytical solution is not practical. This motivates the need for <em>numerical methods</em> for solving such problems. In the next few sections, we'll show examples of <em>search procedures</em> for finding the optimal points for univariate functions. In each case, the approach will be to find a sequence of <em>trial solutions</em>  Each iteration begins at the current trial solution, then via some systematic search leads to a new and improved trial solution. The procedure continues until the trial solutions have converged to an optimal solution, should one exist.
</BodyText>

<Heading level=3 refId=bisectMethod>Bisection method</Heading>

<BodyText>
    Our first search procedure is the bisection method. While no one would suggest you implement this technique to solve problems in practice, it is a relatively intuitive algorithm that is great for learning the tenor of these search techniques in general. For what follows, we will assume that we are trying to maximize some concave function.
</BodyText>
<BodyText>
    Actually, concavity is not strictly required for this method. Technically, using <Math>x^*</Math> to denote the maximum of <Math>f</Math>, the only requirements for the method to work are:
</BodyText>

<MathDisp>\begin{align*}
f'(x^*) & = 0 \\
f'(x) & > 0 & \forall \ x<x^* \\
f'(x) & < 0 & \forall \ x>x^*
\end{align*}
</MathDisp>
<BodyText>
    Of course, concavity is the most natural condition for which these criteria hold.
</BodyText>
<BodyText>
    As with most numerical optimization procedures, we will not be guaranteed to find the true optimal solution. Instead, before we begin we'll need to select our <em>error tolerance</em>  which is how close we'll need to get to an optimal solution before we decide our answer is "good enough" and we terminate the algorithm. We'll denote this term by <Math>\epsilon</Math>.
</BodyText>
<BodyText>
    To begin the algorithm, we'll need to know both an upper bound and a lower bound on <Math>x^*</Math>. One could write out a principled algorithm for finding these bounds, but for the purposes of this class we'll just find these by inspection. We'll denote these upper and lower bounds as <Math>\overline x</Math> and <Math>\underline x</Math>, respectively.
</BodyText>
<BodyText>
    At each iteration, these upper and lower bounds will essentially give the edges of our search space, since we know by concavity that the optimal solution must be between them. The purpose of each iteration is to select our next trial solution <Math>x'</Math> such that we can reduce the size of our search space at the next iteration. One could go about determining this next trial solution in several different ways, but our selection in the bisection method is (fittingly for the name) to select the midpoint between <Math>\underline x</Math> and <Math>\overline x</Math>. So we set <Math>x'=\frac{\underline x + \overline x}{2}</Math>.
</BodyText>
<BodyText>
    At this point, we may have gotten lucky and have <Math>f'(x')=0</Math>. In that case, we would have found the optimal solution (due to concavity of <Math>f</Math>). But otherwise we can use the sign of <Math>f'(x')</Math> to tighten our bounds. In particular, if <Math>f'(x')<0</Math> then we must have <Math>x^*<x'</Math> and so <Math>x'</Math> can be the upper bound in our next iteration. Otherwise, <Math>f'(x')>0</Math> and so <Math>x^*>x'</Math> and <Math>x'</Math> is the lower bound in the next iteration.
</BodyText>
<BodyText>
    Brining it all together, the bisection method works like this:
    <ul>
        <li><em>Initialize</em>: Select error tolerance <Math>\epsilon</Math> and find initial bounds <Math>\underline x</Math>, <Math>\overline x</Math> by inspection. Select the initial trial solution as <Math>x'=\frac{\underline x + \overline x}{2}</Math>.</li>
        <li>
            <em>Iterate</em>:
            <ul>
                <li>Evaluate (the sign of) <Math>f'(x')</Math>:</li>
                <li>If <Math>f'(x')\geq 0</Math>: Set <Math>\underline x=x'</Math>.</li>
                <li>Else: Set <Math>\overline x=x'</Math>.</li>
                <li>Set <Math>x'=\frac{\underline x + \overline x}{2}</Math>.</li>
                <li>If <Math>\overline x - \underline x <= 2\epsilon</Math>: <Math>x'</Math> must be within <Math>\epsilon</Math> of <Math>x^*</Math>, so terminate and return <Math>x'</Math> as optimal within tolerance.</li>
            </ul>
        </li>
    </ul>
</BodyText>

<Heading level=4 refId=bisectExample>Example</Heading>
<BodyText>
    Let's run the bisection method now using the function <Math>f(x) = 12x - 3x^4 - 2x^6</Math>, which we've plotted below. We can verify that <Math>f''(x) = - 36x^2 - 60 x^4</Math>, and so <Math>f''(x)\leq0</Math> for all <Math>x</Math> meaning <Math>f</Math> is concave and hence suitable for the method.
</BodyText>

<!-- todo: plotly -->
<!-- <div style='width:350px;height:350px' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[-0.22, 1.3]'></div> -->
<BodyText>
    We'll let <Math>\epsilon = 0.01</Math>, and by inspection we can find that <Math>0</Math> and <Math>2</Math> are respectively lower and upper bounds on the maximum. So for our first iteration we'll have <Math>\underline x=0</Math>, <Math>\overline x=2</Math>, and <Math>x'=\frac{0 + 2}{2}=1</Math>.
</BodyText>
<BodyText>
    The following table illustrates the how the values of <Math>\underline x, \overline x</Math>, and <Math>x'</Math> change as we iterate through the bisection method.
</BodyText>

<Figure refId="bisectionTable">
    <img src={bisectionTable} alt="Bisection table" />
    <span slot=caption>Applying the bisection method on <Math>f(x)=12x - 3x^4 - 2x^6</Math> <CitationRef refId=classText/></span>
</Figure>
<BodyText>
    As another visual aid, consider the below plots that illustrate how <Math>x'</Math> is updated from iteration to iteration. The bounds at the start of each iteration are shown are light red lines.
</BodyText>

<!-- todo: redo -->
<!-- <div>
<script>
     bisectExClickFunc = (x) => {
          const plotNums = [1, 2, 3, 4, 5, 6, 7];
          for (plotNum of plotNums){
               plotEl = document.getElementById('bisectEx' + plotNum);
               if (plotEl.style.display === 'block') {
                    displayed = plotNum;
               }
          }
          newDisplayed = displayed + parseInt(x);
          newDisplayed = newDisplayed === (plotNums.length + 1) ? 1 : newDisplayed === 0 ? plotNums.length : newDisplayed;
          document.getElementById('bisectEx' + displayed).style.display = 'none';
          document.getElementById('bisectEx' + newDisplayed).style.display = 'block';
          document.getElementById('bisectExPlotLabel').textContent = 'Iteration ' + newDisplayed;
     }
</script>
<div id=bisectEx1 style='width:350px;height:350px;display:block' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[1, "eval", "blue", 5], [0.5, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}'></div>
<div id=bisectEx2 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.5, "eval", "blue", 5], [0.75, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["1"]'></div>
<div id=bisectEx3 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.75, "eval", "blue", 5], [0.875, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["1", "0.5"]'></div>
<div id=bisectEx4 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.875, "eval", "blue", 5], [0.8125, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["1", "0.75"]'></div>
<div id=bisectEx5 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.8125, "eval", "blue", 5], [0.84375, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["0.875", "0.75"]'></div>
<div id=bisectEx6 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.84375, "eval", "blue", 5], [0.828125, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["0.875", "0.8125"]'></div>
<div id=bisectEx7 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.828125, "eval", "blue", 5], [0.8359375, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["0.84375", "0.8125"]'></div>
<div id='bisectExPlotLabel' style='text-align: center'>Iteration 1</div>
<div style='display: flex; justify-content: center'>
<button class='forwardBackwardButton' id='bisectExPlotBackButton' onClick='bisectExClickFunc("-1")'></button>
<button class='forwardBackwardButton' id='bisectExPlotForwardButton' onClick='bisectExClickFunc("1")'></button>
</div>
<script>
     document.getElementById('bisectExPlotBackButton').textContent = '<<';
     document.getElementById('bisectExPlotForwardButton').textContent = '>>';
</script>
</div> -->

<Heading level=3 refId=newton1d>Newton's method</Heading>

<BodyText>
    The bisection method is certainly a valid optimization algorithm and its simplicity makes it a good choice for an introduction to search procedures. But its main drawback is that it is relatively slow to converge. Recall that we started the algorithm with 0 and 2 as our lower and upper bounds and a trial solution of 1, so the distance from our trial solution to the true optimal solution was at most 1. Each iteration reduces the gap by a factor <Math>\frac{1}{2}</Math>, so to reduce it below our chosen tolerance of <Math>\epsilon=0.01</Math> we are required to complete <Math>\ceil{\log_2(1) - \log_2(0.01)}=7</Math> iterations of the algorithm.
</BodyText>
<BodyText>
    Without another method to compare to, it is hard to say whether or not this is good. But we will find that our next method, known as <em>Newton's method</em><Footnote>Yes, the method is named for Sir Isaac Newton, pioneer of calculus and gravitation.</Footnote>, will usually converge in fewer iterations. A key to the quicker convergence is that Newton's method will use more information about the function than the bisection method did. Namely, instead of considering just (the sign of) the first derivative of <Math>f</Math>, Newton's method considers both first and second derivative information in determining the next trial solution.
</BodyText>

<BodyText>
    The motivation for how the derivative information is used comes from the Taylor series you learned about in calculus class. Assuming that <Math>f</Math> is infinitely differentiable, the <em>Taylor series</em> of <Math>f</Math> at some number <Math>a\in\R</Math> is given by:
</BodyText>

<MathDisp>
    f(a) + \frac{f'(a)}{1!}(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \dots
</MathDisp>
<BodyText>
    The nice thing about the Taylor series is that it gives us a way to approximate <em>any</em> function by a polynomial, by evaluating at least the first few terms of the series. Indeed, for any <Math>x</Math> that is "close to" <Math>a</Math>, the second-degree Taylor polynomial approximates the value of <Math>f(x)</Math> quite well, i.e. we have
</BodyText>

<MathDisp>{String.raw`
    f(x) \approx f(a) + \frac{f'(a)}{1!}(x - a) + \frac{f''(a)}{2!}(x - a)^2
`}</MathDisp>
<BodyText>
    This is precisely what Newton's method uses to determine its next trial solution. Essentially, we will use the second-degree Taylor polynomial as a quadratic approximation to <Math>f</Math> and quickly solve for <Math>x</Math> that maximizes the approximation.
</BodyText>
<BodyText>
    How do we do this? Recall that <Math>a</Math> is just some real number (in our algorithm, it will be the current trial solution), so that <Math>f(a), f'(a)</Math>, and <Math>f''(a)</Math> are just constants. So the polynomial is really just a quadratic function of <Math>x</Math>, for which can we can easily take a derivative and say
</BodyText>

<MathDisp>f'(x)\approx f'(a) + f''(a)(x - a)
</MathDisp>
<BodyText>
    If we set that right-hand side to 0 and solve for <Math>x</Math>, we end up with:
</BodyText>

<MathDisp>{String.raw`
    x = a - \frac{f'(a)}{f''(a)}.
`}</MathDisp>
<BodyText>
    We won't prove it, but it is true that since we've assumed <Math>f</Math> is concave, it is also true that the second-degree Taylor polynomial is concave. So that critical point <Math>{String.raw`a - \frac{f'(a)}{f''(a)}`}</Math> we just found is a global maximum for the polynomial. Since the polynomial is a good estimate for <Math>f</Math> (at least when near <Math>a</Math>) we might as well take that value as our next trial solution.
</BodyText>
<BodyText>
    This is precisely what we'll do in Newton's method. Let's use the notation <Math>x_i</Math> for the trial solution in the <Math>i</Math>th iteration of the method. Then the trial solutions follow the relation:
</BodyText>

<MathDisp>
    {String.raw`x_{i + 1} = x_i - \frac{f'(x_i)}{f''(x_i)}.`}
</MathDisp>
<BodyText>
    We've determined how to update the trial solution, but how do we know when to stop? Two common stopping criteria are to stop either when two consecutive trial solutions are sufficiently close, i.e. <Math>|x_{i + 1} - x_i|\leq\epsilon</Math> for some small <Math>\epsilon>0</Math>, or for the derivative at the trial solution to be sufficiently close to zero, i.e. <Math>f'(x_i)<\epsilon</Math>. For our presentation below, we'll adopt the first standard.
</BodyText>
<BodyText>
    Lastly, how should we determine the first trial solution? It ultimately does not matter - one could just start at <Math>x=0</Math> or anywhere else you like. If you can plot out the function to find a good initial spot, or otherwise have a good idea where the optimum might be, you can just go with that as well.
</BodyText>
<BodyText>
    Bringing it all together, here are the steps for executing Newton's method:
    <ul>
        <li><em>Initialize</em>: Select error tolerance <Math>\epsilon</Math>. Set <Math>i=1</Math> and choose initial trial solution <Math>x_1</Math>.</li>
        <li>
            <em>Iterate</em>:
            <ul>
                <li>Set <Math>{String.raw`x_{i+1}=x_i - \frac{f'(x_i)}{f''(x_i)}`}</Math>.</li>
                <li>If <Math>|x_{i+1}-x_i|\leq\epsilon</Math>: Terminate and return <Math>x_{i+1}</Math> as optimal within tolerance.</li>
                <li>Else: Set <Math>i=i+1</Math>.</li>
            </ul>
        </li>
    </ul>
</BodyText>

<Heading level=4 refId=newtonExample>Example</Heading>
<BodyText>
    Let's go ahead and run Newton's method on the same example from last section, <Math>f(x)=12x - 3x^4 - 2x^6</Math>. We'll start from the same initial trial solution <Math>x_1=1</Math>, and decrease the error tolerance to <Math>\epsilon=0.00001</Math>. From here, the only information we need to complete the first iteration is <Math>f'(1)</Math> and <Math>f''(1)</Math>. We have
</BodyText>

<MathDisp>f'(x) = 12 - 12x^3 - 12x^5 = 12(1 - x^3 - x^5)
</MathDisp>
<BodyText>
    and
</BodyText>

<MathDisp>f''(x) = -12(3x^2 + 5x^4)
</MathDisp>
<BodyText>
    meaning that the next trial solution should be
</BodyText>

<MathDisp>x_2 = x_1 - \frac{12(1 - x_1^3 - x_1^5)}{-12(3x_1^2 + 5x_1^4)} = 1 - \frac{1}{8} = \frac{7}{8}.
</MathDisp>
<BodyText>
    Since <Math>|x_2-x_1|>\epsilon</Math> we must continue with another iteration. The results of subsequent iterations are given in the following table:
</BodyText>

<Figure refId="newtonTable">
    <img src={newtonTable} alt="Newton table" />
    <span slot=caption>Applying Newton's method on <Math>f(x)=12x - 3x^4 - 2x^6</Math> <CitationRef refId=classText/></span>
</Figure>
<BodyText>
    Since <Math>|x_4-x_3|\leq\epsilon</Math> we terminate after iteration 4 with <Math>0.83762</Math> as our optimal (within tolerance) solution.
</BodyText>
<BodyText>
    Analogous to last section, here's a group of plots illustrating how the trial solution changes from iteration to iteration. There is one change though, this time in light red I've plotted the curve of the second-degree Taylor polynomial constructed from the trial solution. With this in place, you can see how the polynomial closely mirrors the original function near the trial solution, though it can deviate quite a bit when you get outside that nearby neighborhood.
</BodyText>

<!-- todo: redo
<div>
<script>
     newtonExClickFunc = (x) => {
          const plotNums = [1, 2, 3, 4];
          for (plotNum of plotNums){
               plotEl = document.getElementById('newtonEx' + plotNum);
               if (plotEl.style.display === 'block') {
                    displayed = plotNum;
               }
          }
          newDisplayed = displayed + parseInt(x);
          newDisplayed = newDisplayed === (plotNums.length + 1) ? 1 : newDisplayed === 0 ? plotNums.length : newDisplayed;
          document.getElementById('newtonEx' + displayed).style.display = 'none';
          document.getElementById('newtonEx' + newDisplayed).style.display = 'block';
          document.getElementById('newtonExPlotLabel').textContent = 'Iteration ' + newDisplayed;
     }
</script>
<div id=newtonEx1 style='width:350px;height:350px;display:block' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[1, "eval", "blue", 5], [0.875, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["19 - 12x - 48(x - 1)^2"]'></div>
<div id=newtonEx2 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.875, "eval", "blue", 5], [0.84003, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["9.76358795166016 - 2.1939697265625x - 31.36669921875(x - 0.875)^2"]'></div>
<div id=newtonEx3 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.84003, "eval", "blue", 5], [0.83763, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["7.99521555948513 - 0.132649616478645x - 27.6399818649099(x - 0.84003)^2"]'></div>
<div id=newtonEx4 style='width:350px;height:350px;display:none' class='plotlyFunctionPlot basicCenter' expression='12x - 3x^4 - 2x^6' xRange='[0.4, 1.1]' extraPoints='[[0.83763, "eval", "blue", 5], [0.83762, "eval", "blue", 5]]' lineBetweenPoints='true' arrowsOnLines='true' layoutExtra='{"yaxis": {"range": [null, 8]}}' extraExpressions='["7.88441482712907 - 0.000560278242124437x - 27.3975201369267(x - 0.83763)^2"]'></div>
<div id='newtonExPlotLabel' style='text-align: center'>Iteration 1</div>
<div style='display: flex; justify-content: center'>
<button class='forwardBackwardButton' id='newtonExPlotBackButton' onClick='newtonExClickFunc("-1")'></button>
<button class='forwardBackwardButton' id='newtonExPlotForwardButton' onClick='newtonExClickFunc("1")'></button>
</div>
<script>
     document.getElementById('newtonExPlotBackButton').textContent = '<<';
     document.getElementById('newtonExPlotForwardButton').textContent = '>>';
</script>
</div> -->

<BodyText>
    It's only a single sample, but it's still pretty impressive to see the difference in convergence speed between Newton's method and the bisection method. It only took 4 iterations for Newton's method while bisection took 7 iterations, and that's even with the more forgiving error tolerance <Math>\epsilon=0.01</Math> instead of <Math>\epsilon=0.00001</Math>. If we were to run the bisection method with the more stringent error tolerance we would have required <Math>\ceil{\log_2(1) - \log_2(0.00001)}=17</Math> iterations!
</BodyText>

<Heading level=3 refId=pythonSympy>A helpful Python library</Heading>
<BodyText>
    As you're working through these examples and any class assignments, you may find it useful to have some software you can use to check your work. In the following notebook, I'll show you how to use the Python library <code>sympy</code> to evaluate functions and take derivatives.
</BodyText>

<ColabGist
    colabId='15gc-yndmSb7l7mYU6FXF6ZQuy2Hq7H79'
    gistId='0203322233ae66678390be9daed02ea8'
    refId=sympyIntro
    desc='Intro to sympy'
/>