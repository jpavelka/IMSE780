<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

    import gradientTable from "$lib/images/gradient-example-table.png";
    import gradientFigure from "$lib/images/gradient-example-image.png";
</script>

<Heading level=2 refId=multiVarUnconstrained>Multi-variable unconstrained optimization</Heading>
<BodyText>
    Let's now add a bit to the complexity of the problems we're solving. Instead of our objective <Math>f</Math> being a function of a single variable <Math>x</Math>, we'll instead let it be a multi-variable function. We'll write an evaluation of <Math>f</Math> as <Math>f(\x)</Math> with <Math>\x\in\R^n</Math>. Otherwise, we're still dealing with unconstrained maximization of a concave function.
</BodyText>

<Heading level=3 refId=gradients>Gradients</Heading>
<BodyText>
    An important concept in multi-variable optimization is the gradient. For a given multi-variable function <Math>f</Math>, the <em>gradient</em> of <Math>f</Math>, denoted <Math>\nabla f</Math>, is the vector of partial derivatives of <Math>f</Math> with respect to the individual variables. So for example, if we have <Math>f(x_1,x_2)=2x_1^2+3x_2^2+4x_1x_2+3x_1</Math>, then we'd have:
</BodyText>

<MathDisp>\nabla f(x_1,x_2) = \begin{bmatrix}f'_{x_1}(x_1,x_2)\\f'_{x_2}(x_1,x_2)\end{bmatrix}= \begin{bmatrix}4x_1+4x_2+3\\4x_1+6x_2\end{bmatrix}
</MathDisp>
<BodyText>
    Many of the important properties of the derivative in single-variable calculus carry through to the gradient. For example, one can show the above function is a convex function. So to minimize it, we only need to find where <Math>\nabla f(x_1,x_2)=\zeros</Math>, i.e. we solve simultaneously for
</BodyText>

<MathDisp>\begin{align*}
4x_1 + 4x_2 +3 &= 0 \\
4x_1 + 6x_2 &= 0
\end{align*}
</MathDisp>
<BodyText>
    to find that <Math>\x=(\frac{-9}{4}, \frac{3}{2})</Math> minimizes <Math>f</Math>.
</BodyText>
<BodyText>
    As a follow-up to the notebook in the last section, the following notebook shows you how to deal with gradients in <code>sympy</code>.
</BodyText>

<ColabGist
    colabId=1kDibRJTufI2-gLd86I8tmEFt3nt3sk5g
    gistId=c1dabe8fec7f737628ab56a34f1225fa
    refId=sympyGradients
    desc='Dealing with gradients in sympy'
/>

<Heading level=3 refId=gradientSearch>Gradient search</Heading>

<BodyText>
    Unfortunately, just like in the single variable case, many times we will not be able to use analytical methods to find the optimum of our function. Thus we'll need to explore multi-variable search procedures, of which the most common is the <em>gradient search procedure</em>  The key thing to remember is that the gradient of <Math>f</Math> at some point <Math>\x'</Math> tells us the direction (with respect to <Math>\x'</Math>) in which the function is increasing fastest. In the single variable case, if <Math>f'(x')>0</Math> then the slope of <Math>f</Math> near <Math>x'</Math> is increasing, thus moving to the right will lead us to points with higher objective values. Similarly, if <Math>f'(x')<0</Math> then moving to the left will lead us to points with higher objective values.
</BodyText>
<BodyText>
    So it is with the gradient as well. Remember that <Math>\nabla f(\x')</Math> is a vector, i.e. a direction in which one could travel. Not only that, but for at least some neighborhood around <Math>\x'</Math> we know that a move from <Math>\x'</Math> to a point in the direction of the gradient will increase the objective value. So this is precisely what we will do in the gradient search procedure. Given a trial solution <Math>\x'</Math>, we will calculate the gradient <Math>\nabla f(\x')</Math> and choose a distance <Math>t</Math> (called the <em>step size</em>) to travel in the direction of the gradient to our next trial solution. That is, we will update our trial solution to
</BodyText>

<MathDisp>
    \x' + t\nabla f(\x').
</MathDisp>
<BodyText>
    So those are the basics of the gradient search method. Before we get too much further into details, maybe we should pause a second to try to build a bit of intuition? I'd like to display some graphs to try to help you visualize the gradient search process, but we really need 3d plots for that, and that's not my strength. So I went out and found this short Youtube video instead. Note that the video uses the term <em>gradient descent</em> for this procedure and they are solving a minimization problem. Don't worry though, it's basically the same algorithm and the intuitions are the same.
</BodyText>

<iframe class="basicCenter" width="560" height="315" src="https://www.youtube.com/embed/qg4PchTECck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<BodyText>
    In the video, he talks about a few different ways to decide the step size <Math>t</Math> (<Math>\eta</Math> in the video). As he said, there are many different flavors of gradient descent, and the selection of <Math>t</Math> is a big differentiator. And the choice of <Math>t</Math> can have a big effect on how many iterations are required before converging.
</BodyText>
<BodyText>
    How will we choose <Math>t</Math> in this class? We'll be following the lead of<CitationRef refId=classText/>: choose the best one!
</BodyText>
<BodyText>
    Ok, I suppose I should explain a little more. Remember that the next trial solution will take the form <Math>\x' + t\nabla f(\x')</Math>, and at that point the objective value is clearly <Math>f(\x' + t\nabla f(\x'))</Math>. Suppose we had two choices for <Math>t</Math>, call them <Math>t'</Math> and <Math>t''</Math>, and further suppose that <Math>f(\x' + t'\nabla f(\x'))<f(\x' + t''\nabla f(\x'))</Math>. Since we're maximizing, it would make intuitive sense that we'd prefer <Math>t''</Math> to <Math>t'</Math>. But could we do better?
</BodyText>
<BodyText>
    Well, notice that since <Math>\x'</Math> is a known (vector) value, the function <Math>f(\x' + t\nabla f(\x'))</Math> is a function of just the single variable <Math>t</Math>. And we already saw how to maximize a function of a single variable in <SectionRef refId=univariateUnconstrained/> (or, if <Math>f</Math> were simple enough, we may be able to find the best <Math>t</Math> analytically). So we could use e.g. the bisection method or Newton's method to find the value of <Math>t</Math> that maximizes <Math>f(\x' + t\nabla f(\x'))</Math>, and use that as our step size.
</BodyText>
<BodyText>
    So that is what we'll do<Footnote>This is not my favorite choice for step size, and you almost never see it done in practice because it can take a lot of work to find the exact maximizer <Math>t^*</Math> at every iteration. Nonetheless, it's the method shown in the book, so that's what we'll go with too.</Footnote>. At each iteration, we'll find the value <Math>t^*</Math> that maximizes <Math>\max_{t>0}f(\x' + t\nabla f(\x'))</Math>, then use that to update our trial solution to <Math>\x' + t^*\nabla f(\x')</Math>.
</BodyText>

<BodyText>
    The final item to consider is the stopping criteria. For this algorithm we'll decide to stop if we are sufficiently close to having <Math>\nabla f(\x')=\zeros</Math>, which we'll define as having each entry of the vector <Math>\nabla f(\x')</Math> less than some pre-selected error tolerance <Math>\epsilon</Math>. Putting it all together, the algorithm looks like this:
    <ul>
        <li><em>Initialize</em>: Select error tolerance <Math>\epsilon</Math> and initial trial solution <Math>\x'</Math>.</li>
        <li>
            <em>Iterate</em>:
            <ul>
                <li>Compute <Math>\nabla f(\x')</Math>.</li>
                <li>Use a single-variable optimization method to find <Math>t^*</Math>, a maximizer for <Math>\max_{t>0}f(\x' + t\nabla f(\x'))</Math>.</li>
                <li>Update <Math>\x'</Math> to <Math>\x' + t^*\nabla f(\x')</Math>.</li>
                <li>If <Math>\nabla f(\x')<[\epsilon, \epsilon, \dots, \epsilon]</Math>: Terminate and return <Math>\x'</Math> as optimal within tolerance.</li>
            </ul>
        </li>
    </ul>
</BodyText>

<Heading level=4 refId=gradientSearchEx>Example</Heading>
<BodyText>
    For this example, let's have <Math>f(\x)=2x_1x_2 + 2x_2 - x_1^2 - 2x_2^2</Math> be the concave function to maximize, and let's start with trial solution <Math>\x'=(0, 0)</Math>. We'll set <Math>\epsilon=0.01</Math>, though really we'll just run through a few iterations in this example, so we won't really need it. For the given function <Math>f</Math>, the gradient is given by:
</BodyText>

<MathDisp>\nabla f = (-2x_1 + 2x_2, 2x_1 - 4x_2 + 2)
</MathDisp>
<BodyText>
    Now we need to find our step size <Math>t^*</Math> by maximizing <Math>f(\x' + t\nabla f(\x'))</Math>. We have <Math>\x'=(0, 0)</Math> and
</BodyText>

<MathDisp>\nabla f(\x')=(-2(0) + 2(0), 2(0) - 4(0) + 2) = (0, 2)
</MathDisp>
<BodyText>
    so <Math>t\nabla f(\x')=(0, 2t)</Math>, and hence
</BodyText>

<MathDisp>\begin{align*}
f(\x' + t\nabla f(\x'))&=f(0, 2t)\\
&=2(0)(2t) + 2(2t) - (0)^2 - 2(2t)^2\\
&=4t-8t^2
\end{align*}
</MathDisp>
<BodyText>
    We will maximize this analytically by setting the derivative equal to 0, i.e. solving
</BodyText>

<MathDisp>4 - 16t = 0
</MathDisp>
<BodyText>
    which is maximized at <Math>t^*=\frac{1}{4}</Math>. Then we update our trial solution to:
</BodyText>

<MathDisp>\x' + t^*\nabla f(\x') = (0, 0) + \frac{1}{4}(0, 2) = (0, 0.5).
</MathDisp>
<BodyText>
    So we now have now <Math>\x'=(0, \frac{1}{2})</Math>. Our stopping criteria is whether or not each entry of <Math>\nabla f(\x')</Math> is less than <Math>\epsilon</Math>. So we find
</BodyText>

<MathDisp>\nabla f(\x')=(-2(0) + 2(0.5), 2(0) - 4(0.5) + 2) = (1, 0)
</MathDisp>
<BodyText>
    and notice <Math>1 > \epsilon = 0.01</Math> so we need to continue with another iteration. Then let's continue on the find our next <Math>t^*</Math>. We have
</BodyText>

<MathDisp>\x' + t\nabla f(\x') = (t,0.5)
</MathDisp>
<BodyText>
    so we must also have
</BodyText>

<MathDisp>\begin{align*}
f(\x' + t^*\nabla f(\x')) &= f(t,0.5) \\
&= 2(t)(0.5) + 2(0.5) - t^2 - 2(0.5)^2 \\
&= t - t^2 + 0.5
\end{align*}
</MathDisp>
<BodyText>
    To maximize over <Math>t</Math> we should take the derivative of the above and set to <Math>0</Math>:
</BodyText>

<MathDisp>1 - t2 = 0
</MathDisp>
<BodyText>
    so <Math>t^*=\frac{1}{2}</Math>. Thus our next trial solution will be
</BodyText>

<MathDisp>(0, 0.5) + 0.5(1, 0) = (0.5, 0.5).
</MathDisp>
<BodyText>
    The gradient at this point is <Math>(0, 1)</Math>, and <Math>1>\epsilon</Math> hence we'd need to keep iterating. But I think the last two iterations give you the idea, so we won't explicitly show any more. The following table recaps the information from the two iterations we just completed:
</BodyText>

<Figure refId="gradientSearchExTable">
    <img src={gradientTable} alt="Gradient table" />
    <span slot=caption>Applying gradient search on <Math>f(\x)=2x_1x_2 + 2x_2 - x_1^2 - 2x_2^2</Math> <CitationRef refId=classText/></span>
</Figure>
<BodyText>
    We can find analytically that the actual maximum occurs at <Math>(1, 1)</Math>. The figure below shows what solutions we would obtain if we kept running the algorithm for a few more iterations:
</BodyText>

<Figure refId="gradientSearchExImg">
    <img src={gradientFigure} alt="Trial solutions" />
    <span slot=caption>Trial solutions from gradient search on <Math>f(\x)=2x_1x_2 + 2x_2 - x_1^2 - 2x_2^2</Math> <CitationRef refId=classText/></span>
</Figure>
<BodyText>
    Notice how the steps from iteration to iteration keep zig-zagging from one direction to the orthogonal direction. This actually makes sense for our selection of step sizes. Take the first two iterations as an example. In the first iteration we moved from <Math>(0, 0)</Math> in the direction of <Math>(0, 1)</Math>, stopping at <Math>(0, 0.5)</Math> because moving any further would not improve the objective value. So it makes sense that the gradient was <Math>0</Math> in the <Math>x_2</Math> direction in the next iteration, because moving that way would not help increase the objective.
</BodyText>

<Heading level=3 refId=newtonRevisited>Newton's method revisited</Heading>
<BodyText>
    We won't go over it here, but I'd like to mention that Newton's method generalizes to multi-variable functions as well. Just as in the single-variable case of <SectionRef refId=newton1d/>, the advantage of Newton's method will be that it makes use of curvature information from the second derivative.
</BodyText>
<BodyText>
    The challenge is that, in <Math>n</Math> dimensions, the second derivative information comes in the form of an <Math>n\times n</Math> matrix of partial second derivatives (one matrix entry for each pair of variables), and to do the method right one then needs to invert this matrix. That's a lot of computation, so in practice people use so-called <em>quasi-Newton methods</em> which approximate the second derivative information in different ways.
</BodyText>