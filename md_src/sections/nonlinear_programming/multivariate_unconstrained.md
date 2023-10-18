## Multi-variable unconstrained optimization

Let's now add a bit to the complexity of the problems we're solving. Instead of our objective $f$ being a function of a single variable $x$, we'll instead let it be a multi-variable function so that we can write an evaluation of $f$ as $f(\x)$ with $\x\in\R^n$. We'll still dealing with unconstrained maximization of a concave function.

### Gradients

An important concept in multi-variable optimization is the gradient. For a given multi-variable function $f$, then **gradient** of $f$, denoted $\nabla f$, is the vector of partial derivatives of $f$ with respect to the individual variables. So for example, if we have $f(x_1,x_2)=2x_1^2+3x_2^2+4x_1x_2+3x_1$, then we'd have:

$$
\nabla f(x_1,x_2) = \begin{bmatrix}f'_{x_1}(x_1,x_2)\\f'_{x_2}(x_1,x_2)\end{bmatrix}= \begin{bmatrix}4x_1+4x_2+3\\4x_1+6x_2\end{bmatrix}
$$

Many of the important properties of the derivative in single-variable calculus carry through to the gradient. For example, one can show the above function is a convex function. So to minimize it, we only need to find where $\nabla f(x_1,x_2)=\zeros$, i.e. we solve simultaneously for

$$
\begin{align*}
4x_1 + 4x_2 &= -3 \\
4x_1 + 6x_2 &= 0
\end{align*}
$$

to find that $\x=(-9/4, 3/2)$ minimizes $f$.

### Gradient search

Unfortunately, just like in the single variable case, many times we will not be able to use analytical methods to find the optimum of our function. Thus we'll need to explore multi-variable search procedures, of which the most common is the **gradient search procedure**. The key thing to remember is that the gradient of $f$ at some point $\x'$ tells us the direction (with respect to $\x'$) in which the function is increasing. In the single variable case, if $f'(x')>0$ then the slope of $f$ near $x'$ is increasing, thus moving to the right with lead us to points with higher objective values. Similarly, if $f'(x')<0$ then moving to the left will lead us to points with higher objective values.

So it is with the gradient as well. Remember that $\nabla f(\x')$ is a vector, i.e. a direction in which one could travel. Not only that, but for at least some neighborhood around $\x'$ we know that a move from $\x'$ to a point in the direction of the gradient will increase the objective value. So this is precisely what we will do in the gradient search procedure. Given a trial solution $\x'$, we will calculate the gradient $\nabla f(\x')$ and choose a distance $t$ to travel in the direction of the gradient to our next trial solution. That is, we will update our trial solution to

$$
\x' + t\nabla f(\x').
$$

That sounds good, but there's one problem - exactly what value should we choose for $t$? There are several ways somewhat might choose $t$ in practice, but for our purposes we'll just use the best $t$...

...Ok, maybe that's not a great explanation, let's try again. We're going to end up at some point of the form $x' + t\nabla f(x')$, and ideally the value of $f$ evaluated at that point will be as large as possible. So why don't we just go ahead and find $t^*$ such that $f(\x' + t^*\nabla f(\x')) = \max_{t\geq0} f(\x' + t\nabla f(\x'))$? How would we even do that?

The answer is that determining $t^*$ is itself an optimization problem! But luckily it is an easier optimization problem than the one we started out with: $\x'$ is a known vector at this point, so the only variable to maximize over is $t$. And since we're still assuming $f$ is concave, the search for $t^*$ is an maximization problem on a convex function of a single variable. Thus we can find $t^*$ via some method we covered in +@sec:univariateUnconstrained.

go back and also call it gradient descent? add a note about gradient descent name
