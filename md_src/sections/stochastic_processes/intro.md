# Stochastic processes

<div class='lectureVideoEmbed' video-id='59d55beb92ff4684b2558102888e21561d' video-date='2023-11-03'>Probability review</div>

We're going to change gears a bit now to talk about stochastic processes. The word **stochastic** is just a fancy way to say "random", so we can say colloquially that a stochastic process is just a system that evolves according to the outcome of some random process. The nature of the work we do in this section is different from what we've done so far - we won't always be _optimizing_ anything, but instead only describing and analyzing the evolution of some system. One could say that the nature of the techniques will be more _descriptive_ as opposed to _prescriptive_.

We will start this section with a review of the basics of probability and random variables. Then we'll be diving into two important classes of stochastic processes, Markov chains and queues. This background will be useful when we move on to Markov decision processes at the end of the course.

## Probability basics

We'll now use some time to review the basics of elementary probability. This material should be familiar to you from past probability or statistics courses. The idea is to be able to formalize ideas and set notation so that we have a base for developing the new material later in the section. I assume that you are at least somewhat familiar with the ideas presented here, so think of the following as more of a review/reminder than a thorough treatment.

Much of this content comes from a web supplement to your textbook @classText, which can be accessed [here](https://highered.mheducation.com/sites/dl/free/1259872998/1126268/Hillier_IOR_11e_Ch024_WebChapter.pdf).

### Sample space

The first thing to know when faced with a random process is the possible outcomes of the process. For example, if you were to roll a standard six-sided die, the possibilities are that you roll either a 1, 2, 3, 4, 5, or 6[^outcomesNotProbabilitesOfOutcomes]. The set of all possible outcomes of some random process is called the **sample space**, and is usually denoted by $\Omega$[^omegaSymbol]. So for rolling a six-sided die, we might denote the sample space as

$$
\Omega=\{1, 2, 3, 4, 5, 6\}
$$

[^outcomesNotProbabilitesOfOutcomes]: Note that just knowing what outcomes are possible is different from knowing the _probabilities_ of the outcomes. You can generate the sample space without knowing any related probabilities.
[^omegaSymbol]: This is the greek capital letter "omega". We will see its lowercase counterpart $\omega$ soon as well.

The sample space in the above case was just a finite, discrete set, but that need not always be the case. Suppose the event of interest is knowing how many times you need to try rolling a die before you roll a $1$. You could get lucky and get it on your first try. Or it might take a little longer, like 5 or 6 tries. But to fully encapsulate the sample space, we need an infinite set. For any $n\in\I$, it is possible (if exceedingly unlikely for large $n$) that you never roll a $1$ in your first $n$ attempts. So the sample space for this event is

$$
\Omega = \{1, 2, ...\}
$$

Or, suppose it's been announced that your favorite musical artist will release a new song this week, though the exact time has not been specified. You would like to know the number of days until the song is released. In this case we're no longer dealing with integers, since they could theoretically release the song in the next few hours, so the number would be something less than $1$. All we know is that it will be sometime in the next seven days, so the sample space in this case would be

$$
\Omega = \{\omega:0\leq\omega\leq7\}
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

Given some random experiment, an **event** is any (sub)set of possible outcomes to the experiment. We will write these as subsets of the sample space. Considering the zoo example from above, the event that the first awake animal we see is a reptile (denote it $E_{\text{reptile}}$) is

$$
E_{\text{reptile}} = \{\text{Turtle}, \text{Snake}\}
$$

Similarly, maybe your favorite animals are the turtle and giraffe. We could create a new event for event that you see one of your favorites first:

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

Many times, our ultimate interest lays not in the result of an experiment per se, but instead on some other quantities that nonetheless depend on the results. Suppose you own a store and are interested to know how long it takes (in minutes) for the first customer to arrive after opening the store. If this is tracked for five days, the sample space would look something like

$$
\{(x_1,x_2,x_3,x_4,x_5):x_i\in\R_+\}
$$

But probably you're not interested in the exact numbers themselves, but instead some statistics related to the outcome. For example, let $\bar X$ represent the mean of those five numbers. If that mean is relatively large, maybe you'll decide to open your store later. $\bar X$ would be an example of a **random variable**, which is just some numerically-valued function defined over the sample space.

Following notation standards, we will generally represent random variables via capital letters, e.g. $X$, $Y$, or $Z$. In fact, since it technically is a function, a more precise way to denote the realization of a random variable is $X(\omega)$, where $\omega\in\Omega$ is some element of the sample space. So, using $\bar X$ from above as an example, we could write

$$
\bar X(\omega) = \bar X(x_1, x_2, x_3, x_4, x_5) = \frac{x_1 + x_2 + x_3 + x_4 + x_5}{5}.
$$

Generally though (both here and in most texts on introductory probability) we will suppress the functional notation and use only the capital letter, i.e. we'll ignore the more precise $\bar X(\omega)$ and just write the simpler $\bar X$, leaving the dependence on $\omega$ as implicit.

With the above definition, $\bar X$ is a **continuous random variable**, i.e. a random variable whose values could be any number on some continuum (in this case, $\R_+$). In contrast, we will also see examples of **discrete random variables**, whose possible values belong to some (possibly infinite) discrete set (often the set of integers or some subset of it).

A sample discrete random variable may be the number of times the first arrival came within one hour of the store opening. Introducing some new notation, we could write this as:

$$
\sum_{i=1}^5\indicator_{\{x_i<60\}}
$$

where $\indicator_{\{\text{condition}\}}$ is itself a random variable that is equal to $1$ if the condition in the subscript is true, and otherwise equal to $0$.

### Probability

Every event $E$ has a number $\prob{E}$ associated with it, called the **probability** of $E$ occurring. Probabilities have the following properties:

- For any $E$, $0\leq\prob{E}\leq1$.
- If $E_0$ is an event that cannot occur in the sample space, then $\prob{E_0}=0$.
- $\prob{\Omega}$ (the probability of the entire sample space) equals $1$.
- For any two mutually exclusive events $E_1$ and $E_2$, it must hold that $\prob{E_1\cup E_2}=\prob{E_1}+\prob{E_2}$.

You probably already have some intuitions about probability, where $\prob{E}$ corresponds to the likelihood that an event $E$ occurs. From a frequentist perspective, you can interpret $\prob{E}$ as the proportion of time the event occurs if the experiment is repeated many times. This intuition suffices for our purposes, and while there are more rigorous formulations for probability, we will not be exploring these in this class[^measureTheory].

[^measureTheory]: For anyone curious about rigorous formulations of probability, the key term to look up is _measure theory_.

Since an event $E$ is a subset of the sample space, technically the operand inside the $\prob{\cdot}$ function should be a set. So if we want to talk about the probability that some random variable $X$ is equal to some value $k$, we should technically write that quantity as

$$
\prob{\{\omega\in\Omega:X(\omega)=k\}}
$$

But generally we will not be so precise, and instead write the probability of the event of interest as

$$
\prob{X=k}
$$

### Probability distributions

Associated with every random variable is a **cumulative distribution function** (**CDF**). For a random variable $X$, we generally represent this function as $F_X$ (though sometimes we may suppress the $X$ in the subscript if there is no ambiguity). This function is defined for every real number $b$ as

$$
F_X(b)=\prob{X\leq b}
$$

Given that definition, it should be clear that the following are true for any CDF:

1. $F_X$ is a non-decreasing function, i.e. if $b_1\leq b_2$ then $F_X(b_1)\leq F_X(b_2)$.
2. $\lim_{b\rightarrow -\infty}F_X(b)=0$.
3. $\lim_{b\rightarrow \infty}F_X(b)=1$.

Every random variable, no matter the form, will have an associated CDF. In the case of discrete random variables, there is a second important function called the **probability mass function** (PMF). We will denote the PMF of some random variable $X$ by $p_X$, and it is defined by:

$$
p_X(k)=\prob{X=k}
$$

The CDF and PMF are clearly related by the following:

$$
F_X(b)=\sum_{k\leq b}p_X(k)
$$

In the case of continuous random variables, the other important function is known as the **probability density function** (**PDF**). We denote this function by $f_X$ and it satisfies the relation

$$
F_X(b)=\int_{-\infty}^bf_X(x)\ dx
$$

The relation between continuous CDFs and PDFs is clearly quite similar to the relation between discrete CDFs and PMFs, except that we swap summation for integration.

From the definition, it should also be evident that for a continuous random variable $X$ we have

$$
\prob{a\leq X\leq b} = \int_{a}^{b}f_X(x)\ dx
$$

so that probabilities for $X$ are related to areas under the curve of $f_X$. Due to this, it is also evident that for a continuous random variable, we must have

$$
\prob{X=b}=\prob{b\leq X\leq b}=\int_{b}^b f_X(x)\ dx=0
$$

for any value $b$.

### Expectation and Variance

Knowing the full distribution of a random variable gives you a lot of information, but sometimes it is more convenient to have just a few numbers that can describe a good bit of the behavior of the distribution (to e.g. make comparisons of different distributions more tractable). One such statistic is known as the **expected value** of a random variable $X$, denoted $\E{X}$, which is defined as

$$
\E{X}=\sum_{k: \prob{X=k}>0}k\cdot\prob{X=k}
$$

for a discrete random variable, or

$$
\E{x}=\int_{-\infty}^{\infty}x\cdot f_X(x)\ dx
$$

for a continuous random variable. This is essentially a weighted average of the possible values that $X$ can take, weighted by the relative likelihood that $X$ can take that value. A frequentist interpretation of $\E{X}$ is that if the same experiment is done over and over again, $\E{X}$ will be the average value of $X$ over all the trials. A useful property is the _linearity of expectation_, which states that for any two random variables $X$ and $Y$, we have that

$$
\E{X + Y}=\E{X} + \E{Y}
$$

and further, for any _constant_ value $a$, we have

$$
\E{aX} = a\E{X}
$$

So the expected value gives you a sense of the "average value" of a random variable, which can be useful to know. But two random variables can have identical expectations while still behaving very differently. Suppose $X$ and $Y$ are two discrete random variables, such that

$$
\begin{align*}
\prob{X=3}&=0.5\\
\prob{X=-1}&=0.5\\
\prob{Y=1,\!000,\!000}&=0.001\\
\prob{Y=-1,\!000}&=0.999
\end{align*}
$$

In this case, we have

$$
\begin{align*}
\E{X}&=3(0.5) - 1(0.5) = 1\\
\E{Y}&=1,\!000,\!000(0.001)-1,\!000(0.999) =1
\end{align*}
$$

so their expected values are the same. But it is clear these two random variables behave quite differently. Suppose they represented the potential gains/losses to you should you take some kind of bet. Even though they have the same (positive!) expectation, I would guess that your willingness to take each of these bets would be very different.

But there are other measures of probability distributions that can help us capture the differences here. In particular, the **variance** of a random variable $X$, denoted $\Var{X}$, is defined as

$$
\Var{X}=\E{(X-\E{X})^2}
$$

The variance of a random variable $X$ measures (the square of) how far away from its mean a particular realization of $X$ will tend to be. Thus it is a measure of the "spread" of a probability distribution. Through an application of the linearity of expectation, an equivalent definition of variance is:

$$
\Var{X}=\E{X^2} - (\E{X})^2
$$

In the case of $X$ and $Y$ as we defined above, we can find that

$$
\begin{align*}
\Var{X}&=4\\
\Var{Y}&\approx10^9
\end{align*}
$$

thus the spread of the two distributions is wildly different.

### Conditional probability

Sometimes the outcomes of different random events are related, such that knowing something about the first gives you information about what might happen for the second. For example, say you roll two dice and are interested in the sum of the value of the two rolls. Suppose the first die shows a six, but the second one rolls away and you cannot see how it turned out. Even without knowing both the values, you now have more information about what the sum could be: it is no longer possible for the sum to be less than seven, and a sum of 12 is much more likely now than it was before you saw the outcome of the first roll.

In general, suppose $A$ and $B$ are two events. Perhaps $A$ is some event we're tracking, and $B$ is a separate event that we know has occurred. The value we're interested in is the **conditional probability** of $A$ given that $B$ has occurred, which is denoted as $\prob{A|B}$. This quantity may be completely defined by initial probabilities involving $A$ and $B$. In particular, we have

$$
\prob{A|B}=\frac{\prob{A\cap B}}{\prob{B}}
$$

I think a Venn diagram is a good way to visualize this relation, as shown [here](https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php#chapter_image). Basically, you can think of conditional probability as a normal probability, except that now the sample space has been reduced from the original $\Omega$ to just the conditional event $B$. As such, it is worth noting that one can define entire probability distributions based on conditional probability, i.e. for some random variable $X$ one could define a _conditional_ CDF

$$
F_{X|B}(b)=\prob{X\leq b|B}=\frac{\prob{\{X\leq b\}\cap B}}{\prob{B}}
$$

where the probabilities are given as if $B$ is now the sample space. There are also notions of conditional expectation and conditional variance, which are defined as the usual expectation and variance from the last section, but over the conditional distribution.

Of course, it is possible for two events $A$ and $B$ to be completely unrelated, such that knowing that event $B$ occurs gives you no extra information about the potential occurrence of $A$. Going back to the dice rolling example, it is clear that knowing the value of one die gives you extra information about the sum of the two rolls. But knowing something like, I don't know, yesterday's high temperature in Paris, is not super useful in determining the sum. So we would say that the high temperature in Paris and the outcome of your dice rolls are _independent events_. Mathematically, two events $A$ and $B$ are **independent** if

$$
\prob{A|B}=\prob{A}
$$

If $\prob{B}>0$, then subbing in the definition of conditional probability gives us

$$
\frac{\prob{A\cap B}}{\prob{B}} = \prob{A} \Leftrightarrow \prob{A\cap B}=\prob{A}\prob{B}
$$

Indeed, you could see this as an alternative definition of independence.
