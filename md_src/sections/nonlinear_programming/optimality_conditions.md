# Optimality conditions

During our exploration of unconstrained optimization in the previous sections, we already knew some conditions for recognizing optimal solutions from your calculus classes. For $x$ to be an optimizer for some function $f$, we need $f'(x)=0$ (or $\nabla f(\x)=\zeros$ in the multivariate case). With further assumptions on the character of $f$ (e.g. convexity or concavity) we could go from necessary conditions to sufficient conditions by adding second derivative information.

These same conditions will not necessarily hold in the case of constrained optimization, however. Say we'd like to maximize $f(x)=-x^2$ but add the constraint $x\geq1$. Now the function's only critical point $x=0$ is no longer feasible, and the optimizer $x=1$ does not satisfy $f'(x)=0$.
