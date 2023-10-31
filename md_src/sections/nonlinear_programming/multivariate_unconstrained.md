## Multi-variable unconstrained optimization

Let's now add a bit to the complexity of the problems we're solving. Instead of our objective $f$ being a function of a single variable $x$, we'll instead let it be a multi-variable function. We'll write an evaluation of $f$ as $f(\x)$ with $\x\in\R^n$. Otherwise, we're still dealing with unconstrained maximization of a concave function.

### Gradients

An important concept in multi-variable optimization is the gradient. For a given multi-variable function $f$, the **gradient** of $f$, denoted $\nabla f$, is the vector of partial derivatives of $f$ with respect to the individual variables. So for example, if we have $f(x_1,x_2)=2x_1^2+3x_2^2+4x_1x_2+3x_1$, then we'd have:

$$
\nabla f(x_1,x_2) = \begin{bmatrix}f'_{x_1}(x_1,x_2)\\f'_{x_2}(x_1,x_2)\end{bmatrix}= \begin{bmatrix}4x_1+4x_2+3\\4x_1+6x_2\end{bmatrix}
$$

Many of the important properties of the derivative in single-variable calculus carry through to the gradient. For example, one can show the above function is a convex function. So to minimize it, we only need to find where $\nabla f(x_1,x_2)=\zeros$, i.e. we solve simultaneously for

$$
\begin{align*}
4x_1 + 4x_2 +3 &= 0 \\
4x_1 + 6x_2 &= 0
\end{align*}
$$

to find that $\x=(\frac{-9}{4}, \frac{3}{2})$ minimizes $f$.

As a follow-up to the notebook in the last section, the following notebook shows you how to deal with gradients in `sympy`.

{colabGist:1kDibRJTufI2-gLd86I8tmEFt3nt3sk5g,c1dabe8fec7f737628ab56a34f1225fa}

### Gradient search {#sec:gradientSearch}

<div class='lectureVideoEmbed' video-id='b30426e0e1434106b7310fd399a90a421d' video-date='2023-10-23'>Gradient search and Lagrangian multipliers</div>

Unfortunately, just like in the single variable case, many times we will not be able to use analytical methods to find the optimum of our function. Thus we'll need to explore multi-variable search procedures, of which the most common is the **gradient search procedure**. The key thing to remember is that the gradient of $f$ at some point $\x'$ tells us the direction (with respect to $\x'$) in which the function is increasing fastest. In the single variable case, if $f'(x')>0$ then the slope of $f$ near $x'$ is increasing, thus moving to the right will lead us to points with higher objective values. Similarly, if $f'(x')<0$ then moving to the left will lead us to points with higher objective values.

So it is with the gradient as well. Remember that $\nabla f(\x')$ is a vector, i.e. a direction in which one could travel. Not only that, but for at least some neighborhood around $\x'$ we know that a move from $\x'$ to a point in the direction of the gradient will increase the objective value. So this is precisely what we will do in the gradient search procedure. Given a trial solution $\x'$, we will calculate the gradient $\nabla f(\x')$ and choose a distance $t$ (called the **step size**) to travel in the direction of the gradient to our next trial solution. That is, we will update our trial solution to

$$
\x' + t\nabla f(\x').
$$

So those are the basics of the gradient search method. Before we get too much further into details, maybe we should pause a second to try to build a bit of intuition? I'd like to display some graphs to try to help you visualize the gradient search process, but we really need 3d plots for that, and that's not my strength. So I went out and found this short Youtube video instead. Note that the video uses the term **gradient descent** for this procedure and they are solving a minimization problem. Don't worry though, it's basically the same algorithm and the intuitions are the same.

<iframe class="basicCenter" width="560" height="315" src="https://www.youtube.com/embed/qg4PchTECck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In the video, he talks about a few different ways to decide the step size $t$ ($\eta$ in the video). As he said, there are many different flavors of gradient descent, and the selection of $t$ is a big differentiator. And the choice of $t$ can have a big effect on how many iterations are required before converging.

How will we choose $t$ in this class? We'll be following the lead of @classText: choose the best one!

Ok, I suppose I should explain a little more. Remember that the next trial solution will take the form $\x' + t\nabla f(\x')$, and at that point the objective value is clearly $f(\x' + t\nabla f(\x'))$. Suppose we had two choices for $t$, call them $t'$ and $t''$, and further suppose that $f(\x' + t'\nabla f(\x'))<f(\x' + t''\nabla f(\x'))$. Since we're maximizing, it would make intuitive sense that we'd prefer $t''$ to $t'$. But could we do better?

Well, notice that since $\x'$ is a known (vector) value, the function $f(\x' + t\nabla f(\x'))$ is a function of just the single variable $t$. And we already saw how to maximize a function of a single variable in +@sec:univariateUnconstrained (or, if $f$ were simple enough, we may be able to find the best $t$ analytically). So we could use e.g. the bisection method or Newton's method to find the value of $t$ that maximizes $f(\x' + t\nabla f(\x'))$, and use that as our step size.

So that is what we'll do[^notMyFavoriteStepSize]. At each iteration, we'll find the value $t^*$ that maximizes $\max_{t>0}f(\x' + t\nabla f(\x'))$, then use that to update our trial solution to $\x' + t^*\nabla f(\x')$.

[^notMyFavoriteStepSize]: This is not my favorite choice for step size, and you almost never see it done in practice because it can take a lot of work to find the exact maximizer $t^*$ at every iteration. Nonetheless, it's the method shown in the book, so that's what we'll go with too.

The final item to consider is the stopping criteria. For this algorithm we'll decide to stop if we are sufficiently close to having $\nabla f(\x')=\zeros$, which we'll define as having each entry of the vector $\nabla f(\x')$ less than some pre-selected error tolerance $\epsilon$. Putting it all together, the algorithm looks like this:

- _Initialize_: Select error tolerance $\epsilon$ and initial trial solution $\x'$.
- _Iterate_:
  - Compute $\nabla f(\x')$.
  - Use a single-variable optimization method to find $t^*$, a maximizer for $\max_{t>0}f(\x' + t\nabla f(\x'))$.
  - Update $\x'$ to $\x' + t^*\nabla f(\x')$.
  - If $\nabla f(\x')<[\epsilon, \epsilon, \dots, \epsilon]$:
    - Terminate and return $\x'$ as optimal within tolerance.

<h4>Example</h4>

For this example, let's have $f(\x)=2x_1x_2 + 2x_2 - x_1^2 - 2x_2^2$ be the concave function to maximize, and let's start with trial solution $\x'=(0, 0)$. We'll set $\epsilon=0.01$, though really we'll just run through a few iterations in this example, so we won't really need it. For the given function $f$, the gradient is given by:

$$
\nabla f = (-2x_1 + 2x_2, 2x_1 - 4x_2 + 2)
$$

Now we need to find our step size $t^*$ by maximizing $f(\x' + t\nabla f(\x'))$. We have $\x'=(0, 0)$ and

$$
\nabla f(\x')=(-2(0) + 2(0), 2(0) - 4(0) + 2) = (0, 2)
$$

so $t\nabla f(\x')=(0, 2t)$, and hence

$$
\begin{align*}
f(\x' + t\nabla f(\x'))&=f(0, 2t)\\
&=2(0)(2t) + 2(2t) - (0)^2 - 2(2t)^2\\
&=4t-8t^2
\end{align*}
$$

We will maximize this analytically by setting the derivative equal to 0, i.e. solving

$$
4 - 16t = 0
$$

which is maximized at $t^*=\frac{1}{4}$. Then we update our trial solution to:

$$
\x' + t^*\nabla f(\x') = (0, 0) + \frac{1}{4}(0, 2) = (0, 0.5).
$$

So we now have now $\x'=(0, \frac{1}{2})$. Our stopping criteria is whether or not each entry of $\nabla f(\x')$ is less than $\epsilon$. So we find

$$
\nabla f(\x')=(-2(0) + 2(0.5), 2(0) - 4(0.5) + 2) = (1, 0)
$$

and notice $1 > \epsilon = 0.01$ so we need to continue with another iteration. Then let's continue on the find our next $t^*$. We have

$$
\x' + t\nabla f(\x') = (t,0.5)
$$

so we must also have

$$
\begin{align*}
f(\x' + t^*\nabla f(\x')) &= f(t,0.5) \\
&= 2(t)(0.5) + 2(0.5) - t^2 - 2(0.5)^2 \\
&= t - t^2 + 0.5
\end{align*}
$$

To maximize over $t$ we should take the derivative of the above and set to $0$:

$$
1 - t2 = 0
$$

so $t^*=\frac{1}{2}$. Thus our next trial solution will be

$$
(0, 0.5) + 0.5(1, 0) = (0.5, 0.5).
$$

The gradient at this point is $(0, 1)$, and $1>\epsilon$ hence we'd need to keep iterating. But I think the last two iterations give you the idea, so we won't explicitly show any more. The following table recaps the information from the two iterations we just completed:

![Applying gradient search on $f(\x)=2x_1x_2 + 2x_2 - x_1^2 - 2x_2^2$ [@classText]](images/gradient-example-table.png)

We can find analytically that the actual maximum occurs at $(1, 1)$. The figure below shows what solutions we would obtain if we kept running the algorithm for a few more iterations:

![Trial solutions from gradient search on $f(\x)=2x_1x_2 + 2x_2 - x_1^2 - 2x_2^2$ [@classText]](images/gradient-example-image.png)

Notice how the steps from iteration to iteration keep zig-zagging from one direction to the orthogonal direction. This actually makes sense for our selection of step sizes. Take the first two iterations as an example. In the first iteration we moved from $(0, 0)$ in the direction of $(0, 1)$, stopping at $(0, 0.5)$ because moving any further would not improve the objective value. So it makes sense that the gradient was $0$ in the $x_2$ direction in the next iteration, because moving that way would not help increase the objective.

### Newton's method revisited

We won't go over it here, but I'd like to mention that Newton's method generalizes to multi-variable functions as well. Just as in the single-variable case of +@sec:newton1d, the advantage of Newton's method will be that it makes use of curvature information from the second derivative.

The challenge is that, in $n$ dimensions, the second derivative information comes in the form of an $n\times n$ matrix of partial second derivatives (one matrix entry for each pair of variables), and to do the method right one then needs to invert this matrix. That's a lot of computation, so in practice people use so-called **quasi-Newton methods** which approximate the second derivative information in different ways.
