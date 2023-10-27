# Stochastic processes

We're going to change gears a bit now to talk about stochastic processes. The word **stochastic** is just a fancy way to say "random", so we can say colloquially that a stochastic process is just a system that evolves according to the outcome of some random process. The nature of the work we do in this section is different from what we've done so far - we won't necessarily be _optimizing_ anything, but instead only describing and analyzing the evolution of some system. One could say that the nature of the techniques will be more _descriptive_ as opposed to _prescriptive_.

We will start this section with a review of the basics of probability and random variables. Then we'll be diving into two important classes of stochastic processes, Markov chains and queues. This background will be useful when we move on to Markov decision processes at the end of the course.

## Probability basics

We'll now use some time to review the basics of elementary probability theory. This material should be familiar to you from past probability or statistics courses. The idea is to be able to formalize ideas and set notation so that we have a base for developing the new material later in the section.

### Sample space

The first thing to know when faced with a random process is what are the possible outcomes of the process. For example, if you were to roll a standard six-sided die, the possibilities are that you roll either a 1, 2, 3, 4, 5, or 6[^outcomesNotProbabilitesOfOutcomes]. The set of all possible outcomes of some random event is called the **sample space** of the event, and is usually denoted by $\Omega$[^omegaSymbol]. So for rolling a six-sided die, we might denote the sample space as

$$
\Omega=\{1, 2, 3, 4, 5, 6\}
$$

[^outcomesNotProbabilitesOfOutcomes]: Note that just knowing what outcomes are possible is different from knowing the _probabilities_ of the outcomes. You can generate the sample space without knowing any related probabilities.
[^omegaSymbol]: This is the greek capital letter "omega". We will see its lowercase counterpart $\omega$ soon as well.

The sample space in the above case was just a finite, discrete set, but that need not always be the case. Suppose the event of interest is knowing how many times you need to try rolling a die before you roll a $1$. You could get lucky and get it on your first try. Or it might take a little longer, like 5 or 6 tries. But to fully encapsulate the sample space, we need an infinite set. For any $n\in\I$, it is possible (if exceedingly unlikely for large $n$) that you never roll a $1$ in your first $n$ attempts. So the sample space for this event is

$$
\Omega = \{1, 2, ...\}
$$

Or, suppose it's been announced that your favorite musical artist will release a new song this week, thought the exact time has not been specified. You would like to know the number of days until the song is released. In this case we're no longer dealing with integers, since they could theoretically release the song in the next few hours, so the number would be something less than $1$. All we know is that it will be sometime in the next few days, so the sample space in this case would be

$$
\Omega = \{\omega:0\leq\omega\leq7\} = [0, 7]
$$

All of these samples have been numerical, but there is nothing requiring that. If you're going to a (very small) zoo today and would like to know the first animal you see that is not asleep, perhaps your sample space is

$$
\begin{align*}
\Omega = \{&\text{Lion}, \text{Gorilla}, \text{Otter}, \text{Turtle}, \text{Giraffe}, \\
&\text{Anteater}, \text{Snake}, \text{Parrot}\}
\end{align*}
$$

in fact, it's possible that _all_ the animals are sleeping while you visit, so maybe we should include an entry in $\Omega$ for that too:

$$
\begin{align*}
\Omega = \{&\text{Lion}, \text{Gorilla}, \text{Otter}, \text{Turtle}, \text{Giraffe}, \\
&\text{Anteater}, \text{Snake}, \text{Parrot}, \text{none}\}
\end{align*}
$$

### Events

Given some random experiment, an **event** is any (sub)set of possible outcomes to the experiment. We will write these as subsets of the sample space, so that the event that the first awake animal we see is a reptile (denote it $E\_{\text{reptile}}) is

$$
E_{\text{reptile}} = \{\text{Turtle}, \text{Snake}\}
$$

Similarly, maybe your favorite animals are the turtle and giraffe. We could create a new event for see one of your favorites first:

$$
E_{\text{favorite}} = \{\text{Turtle}, \text{Giraffe}\}
$$

We are often interested in combinations of individual events as well. We will describe these using the union ($\cup$) and intersection($\cap$) operators. The **union** of two events $E_1,E_2$ is the event consisting of all elements in either $E_1$ or $E_2$. So the union of the two events we defined above would be

$$
E_{\text{reptile}} \cup E_{\text{favorite}} = \{\text{Turtle}, \text{Snake}, \text{Giraffe}\}
$$

representing the event that you see _either_ a reptile _or_ one of your favorites first. The intersection of these events is

$$
E_{\text{reptile}} \cap E_{\text{favorite}} = \{\text{Turtle}\}
$$

which is the event that the first animal you see is both a reptile _and_ one of your favorites.

Events $E_1, E_2$ are said to be **mutually exclusive** or **disjoint** if their intersection contains no elements, i.e. if

$$
E_1\cap E_2=\emptyset
$$

If we create a new event $E_{\text{bird}}=\{\text{Parrot}\}$ for when the first animal you see is a bird, then $E_{\text{favorite}}$ and $E_{\text{bird}}$ are disjoint events.

### Random variables

Many times, our ultimate interest lays not in the result of an experiment per se, but instead on some other quantities that nonetheless depend on the results. Suppose you own a store and are interested to know how long it takes for the first customer to arrive after opening the store. If this is tracked for five days, the sample space would look something like

$$
\{(x_1,x_2,x_3,x_4,x_5):x_i\in\R_+\}
$$

But probably you're not interested in the exact numbers themselves, but instead some statistics related to the outcome. For example, let $\bar X$ represent the mean of those five numbers. If that mean is relatively large, maybe you'll decide to open your store later. $\bar X$ would be an example of a **random variable**, which is just some function defined over the sample space.

Following notation standards, we will generally represent random variables via capital letters, e.g. $X$, $Y$, or $Z$. In fact, since it technically is a function, a more precise way to denote the realization of a random variable is $X(\omega)$, where $\omega\in\Omega$ is some element of the sample space. So, using $\bar X$ from above as an example, we could write

$$
\bar X(\omega) = \bar X(x_1, x_2, x_3, x_4, x_5) = \frac{x_1 + x_2 + x_3 + x_4 + x_5}{5}.
$$

Generally though (both here and in most texts on introductory probability) we will suppress the functional notation and use only the capital letter, i.e. we'll ignore the more precise $\bar X(\omega)$ and just write the simpler $\bar X$, leaving the dependence on $\omega$ as implicit.

With the above definition, $\bar X$ is a **continuous random variable**, i.e. a random variable whose values could be any number on some continuum (in this case, $\R+$). In constrast, we will also see examples of **discrete random variables**, whose possible values belong to some (possibly infinite) discrete set (often the set of integers or some subset of it).

A sample discrete random variable may be the number of times the first arrival came within one hour of the store opening. $1\mathbb{1}\boldsymbol{1}$

### Probabilities

conditional probabilities

### Probability distributions

### Expectation and Variance
