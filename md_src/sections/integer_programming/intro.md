# Integer programming

<div class='lectureVideoEmbed' video-id='82e9cb1ddf1b4cbbaa625d040d42b0891d' video-date='2023-09-18'>Integer programming definitions, intro to modeling IPs. I forgot to turn on my lapel mic at the beginning of class (about the first 7 minutes), though the room mic was on and seemed to pick up most everything ok.</div>

In this section we will introduce integer programming (IP), which is an of extension of linear programming that includes restrictions that some (or all) of the decision variables must take integer values. While this may initially seem like a small tweak, the addition of these integrality[^integralAndInteger] constraints is actually quite powerful, and will allow us to model all types of interesting problems that linear programming could not handle. The added expressiveness comes with a tradeoff, though, as integer programs generally take much more effort to solve than their linear counterparts.

[^integralAndInteger]: In this context, we use the word _integral_ to mean "of or denoted by an integer" (which, as of the time of writing, is the second definition provided by Google when searching the word). I agree it's somewhat confusing since the word has a separate common meaning when used in casual conversation, and even a separate meaning in mathematics that you're familiar with from calculus.

For this course, we will discuss some preliminaries before moving on to IP modeling techniques. We'll spend more time on modeling here than in the LP section, in order to explore the flexibility integer programs provide and discuss some of the tricks that can be used to set up problems of all types. We'll finish our practical discussion with a section on solving IPs with Python. On the theoretical side, we'll touch a bit on the theory that helps explain what makes solving IPs so difficult. We'll then get into solution techniques, including branch-and-bound and cutting plane procedures.

## Definitions

We'll consider a few forms of integer programs in this course. A __(pure) integer (linear) program__[^linearPartOfName] (__IP__)[^linearNotInInitialism] is a linear program where _all_ the decision variables are required to be integer, i.e. it is a problem of the form[^setOfIntegers]:

$$
\begin{align*}
\max && \c\x \\
\st  && \A\x&\leq\b \\
     && \x&\in\I^n_+
\end{align*}
$$

[^linearPartOfName]: Of course, you could also talk about non-linear optimization problems with integer variable restrictions. Still, the terminology _integer programming_ is usually restricted to integer extensions to LPs.

[^linearNotInInitialism]: Some sources will include an "L" (for "linear") in the initialism as well. So if you see things like ILP, MILP, or BILP in other texts, know that these are likely the same as what we're calling IP, MIP, and BIP.

[^setOfIntegers]: New notation alert: as mentioned in +@sec:symbols, the symbol $\I$ stands for the set of integer numbers. The $+$ in the subscript means that we are considering non-negative integers (though this is just a convention, as we saw with linear programs in +@sec:lpForms we can bypass non-negativity with certain formulation tricks). The $n$ in the superscript is just from the dimension of the vector $\x$, in this case meaning that a valid selection for $\x$ must consist of $n$ such integers.

In contrast, a __mixed integer (linear) program__ (__MIP__) is a linear program where some, but not necessarily all, of the decision variables are required to be integer, i.e.

$$
\begin{align*}
\max && \c\x + \mathbf{h}\y\\
\st  && \A\x + \mathbf{G}\y&\leq\b \\
     && \x&\in\I^n_+ \\
     && \y&\geq\zeros
\end{align*}
$$

A MIP is more flexible that a pure IP, but much of the theory we cover will be easier to talk about for IPs. When we present results for IPs, know that they can likely be extended to MIPs as well, but with some minor modifications.

A __binary integer (linear) program__ (__BIP__) is a subclass of IPs where the variables are restricted not just to integers, but to either one of the values $0$ or $1$. Thus we can define a BIP as having the form:

$$
\begin{align*}
\max && \c\x \\
\st  && \A\x&\leq\b \\
     && \x&\in\{0,1\}^n
\end{align*}
$$

A BIP is sometimes also called a __0-1 integer (linear) program__.

As you can see, every IP by definition has an associated LP underlying it, obtained from the IP by removing the integrality constraints. This underlying LP is very important in the study of integer programs, and is known as the IP's __LP relaxation__ or __linear relaxation__[^generalRelaxation].

[^generalRelaxation]: The notion of a _relaxation_ shows up in other places in optimization theory as well. In general, a relaxation $R$ of some minimization problem $P$ is another optimization problem such that the set of feasible solutions to $P$ is a subset of the feasible solutions to $R$. Further, for any solution $x$ to $P$, the objective value at $x$ in $R$ is less than or equal to the objective value at $x$ in $P$ (in the case of the LP relaxation to an IP, the objective values are equal). Relaxations are usually easier to solve than the original problem and can be useful as approximations or in bounding $P$'s possible objective values.

## Rounding is not enough {#sec:ipRoundingNotEnough}

Right about now, you may be wondering how important IP's integer restriction really is. Can't we just solve the related LP, round the solution to the nearest integer, then be done with it?

Theoretically, the answer is a resounding no. Practically, the answer may change depending on your requirements. But let's try to illustrate why the rounding method could be problematic. Consider the following integer program:

$$
\begin{align*}
\max && 12x_1 + 10x_2 & \\
\st  && -7x_1 + 5x_2 & \leq 5 \\
     &&  9x_1 +  7x_2 & \leq 54 \\
     && x_1,x_2 & \in\I_+
\end{align*}
$$

We've shown this 2-dimensional IP in a plot below. Shaded in gray is the feasible region to the problem's LP relaxation. The plotted points are all the feasible solutions to the IP, i.e. the points inside the LP relaxation's feasible region which are also integer. In this case, you can verify graphically that the optimal solution to the LP relaxation is $(x_1, x_2)=(2.5, 4.5)$ with an objective value of 75.

<svg width=350 height=350 class="lpDraw" base="roundingIp" altArgs='{"chooseObjVals": true}'> Sorry, your browser does not support inline SVG.</svg>

Say we'd like to find our integer solution by simply rounding the optimal LP relaxation solution. The first difficulty would be determining which way (up vs. down) to round the numbers. But another, more fundamental difficulty is that there is no guarantee that _any_ rounded solution will be feasible. Indeed, that is the case we find ourselves in here, as each of the rounded solutions $(2, 4), (2, 5), (3, 4)$, and $(3, 5)$ are infeasible[^areTheIntegersReallyInfeasible].

[^areTheIntegersReallyInfeasible]: I should point out that, in a practical application, there is often some wiggle room in the (sometimes shoddily estimated) problem data such that you could fudge a little and make one of these rounded solutions work. This may or may not be an option depending on your scenario.

Ok, so say instead you just want to find the feasible integer solution that is closest to the LP relaxation solution. Putting aside the question of how to do that, there is no guarantee that even that solution will be the optimal integer solution. Indeed, in this example the closest feasible integer solutions are $(2, 3)$ and $(3, 3)$, of which $(3, 3)$ has the best objective value at 66. But in fact the best integer solution is $(6,0)$ with an objective value of 72, a 9% increase!

Even worse still, we'll often formulate BIPs such that the interpretation of the 0-1 variable is whether or not to take some action. For some types of problems, it's not at all uncommon for the LP relaxation solution to a BIP to be every variable taking the value $0.5$! Such a solution would leave you no clue as to which direction you should round the solutions. In these cases, considering only the LP relaxation gives you no hint whatsoever about how to proceed.
