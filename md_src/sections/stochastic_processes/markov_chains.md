## Markov chains

With those preliminaries out of the way, we're ready to talk about Markov chains, our first stochastic process. This is a particularly important class of stochastic process, one of the best known and most important, which even had a hand in Google taking over the world[^pageRankMarkov]. In this class both of the future topics of queueing theory and Markov decision processes will build upon what we learn here. Note that the content of this section comes largely from a web supplement to @classText and can be found [here](https://highered.mheducation.com/sites/dl/free/1259872998/1126268/Hillier_IOR_11e_Ch028_WebChapter.pdf).

[^pageRankMarkov]: Google's [PageRank](https://en.wikipedia.org/wiki/PageRank) algorithm, among the first algorithms they used for ranking pages in search results, is based on Markov chain theory.

First up: it's probably high time to actually define what we mean by a "stochastic process". As we said earlier, the word _stochastic_ essentially means random. A stochastic process is a model for processes that evolve over time in a probabilistic manner. More formally, a **stochastic process** is an indexed collection of random variables $\{X_t\}$, where the index $t$ runs through some set $T$. Very often $T$ is the set of non-negative integers, so that the collection of random variables we are interested is $\{X_0,X_1,...\}$ and $X_t$ represents the state of some system after $t$ time steps. For example, we might be tracking the inventory of a particular product at some store, with $X_0$ being the inventory level at the beginning of the first week, $X_1$ the inventory level at the beginning of the second week, and so on. When $T$ is a discrete set, we call the process a **discrete-time stochastic process**. This type of process will be our focus in this class.

Let's talk now about the sample space for the $X_t$ random variables. For the purposes of this class, the sample space will be some finite, discrete set, often notated as $\{0, 1, \dots, M\}$ for some $M\in\I+$. We call $\{0, 1, \dots, M\}$ the **states** of the system. So if for time $t$ we have $X_t=i$, then we say that the system is in state $i$ at time $t$. The stochastic process $\{X_0,X_1,\dots\}$ then tells us how the state of the system changes over time.

Analyzing stochastic processes can get fairly complicated without some simplifying assumptions. In the case of Markov chains, the key assumption is the so-called Markovian property. A discrete-time stochastic process $\{X_0,X_1,\dots\}$ is said to have the **Markovian property** if

$$
\begin{align*}
&\prob{X_{t+1}=j|X_0=k_0,X_1=k_1,\dots,X_t=i} \\
=&\prob{X_{t+1}=j|X_t=i}
\end{align*}
$$

That is, if I'd like to know what will happen in the future of the process, it suffices to only know the state of the process _right now_. The rest of history is completely irrelevant to the future of the process. Mathematically we can say that $X_{t+1}$ is independent of $X_0, X_1, \dots, X_{t-1}$[^notIndependentXt].

[^notIndependentXt]: But, crucially, $X_{t+1}$ is generally _not_ independent of $X_t$.

This property is all we need to finally define a Markov chain. A stochastic process $\{X_0,X_1,\dots\}$ is a **Markov chain** if it has the Markovian property.

The conditional probability from above, $\prob{X_{t+1}=j|X_t=i}$, is known as a **transition probability**, since it gives the probability of the system transitioning from state $i$ in one time step to state $j$ in the next. For notational convenience, we will usually denote this as $p_{ij}$, so that

$$
p_{ij}=\prob{X_{t+1}=j|X_t=i}
$$

Implicit in this notation is that $p_{ij}$ does not depend on the time step $t$, so that the transition probabilities are **stationary**. This will be an assumption we'll hold throughout the class.

### First examples

Let's see how it all comes together with a few examples.

<h4>Weather example</h4>

Quoting from @classText

> The weather in the town of Centerville can change rather quickly from day to day. However, the chances of being dry (no rain) tomorrow are somewhat larger if it is dry today than if it rains today. In particular, the probability of being dry tomorrow is 0.8 if it is dry today, but is only 0.6 if it rains today. These probabilities do not change if information about the weather before today is also taken into account.
>
> The evolution of the weather from day to day in Centerville is a stochastic process. Starting on some initial day (labeled as day 0), the weather is observed on each day $t$, for $t = 0, 1, 2, . . .$ The state of the system on day $t$ can be either State 0 (day $t$ is dry) or State 1 = (day $t$ has rain). Thus, for $t = 0, 1, 2, . . .$, the random variable $X_t$ takes on the values
>
> $$
> X_t=\begin{cases}
> 0 & \text{ if day } t \text{ is dry.} \\
> 1 & \text{ if day } t \text{ has rain.}
> \end{cases}
> $$
>
> The stochastic process $\{X_t\} = \{X_0, X_1, X_2, . . .\}$ provides a mathematical representation of how the status of the weather in Centerville evolves over time.

The above gives a general, stochastic process formulation for Centerville weather. But notice the assumptions of the model (state changes do not depend on weather history) mean that this process is actually a Markov chain. So, as is custom with a Markov chain, we will go ahead and construct the **(one-step) transition matrix** for the problem, denoted as $\mathbf{P}$, whose entries $p_{ij}$ follow the definition from above:

$$
p_{ij}=\prob{X_{t+1}=j|X_t=i}
$$

For this problem the transition matrix becomes[^stochasticMatrix]:

$$
\mathbf{P}=\begin{bmatrix}
p_{00} & p_{01} \\
p_{10} & p_{11}
\end{bmatrix}=\begin{bmatrix}
0.8 & 0.2 \\
0.6 & 0.4
\end{bmatrix}
$$

{#eq:weatherMatrix}

[^stochasticMatrix]: It is worth noting that the rows of any transition matrix will always sum to 1, since the $i$th row accounts for the probabilities of transitioning from state $i$ to any other state $j$. The columns of the matrix do _not_ need to sum to 1.

A nice way to visualize a Markov chain is with a transition diagram, as illustrated below:

![Transition diagram for Centerville weather Markov chain example [@classText]](images/weather-transition-diagram.png)

<h4>Inventory example</h4>

Let's take another example from the textbook. This example makes reference to the [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution), a particular discrete probability distribution that is used in many applications.

> Dave’s Photography Store has the following inventory problem. The store stocks a particular model camera that can be ordered weekly. Let $D_1, D_2, . . .$ represent the demand for this camera (the number of units that would be sold if the inventory is not depleted) during the first week, second week, ... , respectively, so the random variable $D_t$ (for $t = 1, 2, . . .$) is the number of cameras that would be sold in week $t$ if the inventory is not depleted. (This number includes lost sales when the inventory is depleted.)
>
> It is assumed that the $D_t$ are independent and identically distributed random variables having a Poisson distribution with a mean of 1. Let $X_0$ represent the number of cameras on hand at the outset, $X_1$ the number of cameras on hand at the end of week 1, $X_2$ the number of cameras on hand at the end of week 2, and so on, so the random variable $X_t$ (for $t = 0, 1, 2, . . .$) is the number of cameras on hand at the end of week $t$.
>
> Assume that $X_0 = 3$, so that week 1 begins with three cameras on hand. $\{X_t\} = \{X_0, X_1, X_2, . . .\}$ is a stochastic process where the random variable $X_t$ represents the state of the system at time $t$, namely, the number of cameras on hand at the end of week $t$.
>
> As the owner of the store, Dave would like to learn more about how the status of this stochastic process evolves over time while using the current ordering policy described below.
>
> At the end of each week $t$ (Saturday night), the store places an order that is delivered in time for the next opening of the store on Monday. The store uses the following order policy:
>
> $$
> \begin{align*}
> \text{If }X_t = 0&,\text{ order 3 cameras}.\\
> \text{If }X_t > 0&,\text{ do not order any cameras}.
> \end{align*}
> $$
>
> Thus, the inventory level fluctuates between a minimum of zero cameras and a maximum of three cameras, so the possible states of the system at time $t$ (the end of week $t$) are 0, 1, 2, or 3 cameras on hand.
>
> Since each random variable $X_t$ $(t = 0, 1, 2, . . .)$ represents the state of the system at the end of week t, its only possible values are 0, 1, 2, or 3. The random variables $X_t$ are dependent and may be evaluated iteratively by the expression
>
> $$
> X_{t+1} = \begin{cases}
> \max\{3 − D_{t+1}, 0\}&\text{ if }X_t = 0\\
> \max\{X_t − D_{t+1}, 0\}&\text{ if }X_t \geq 1
> \end{cases}
> $$
>
> for $t = 0, 1, 2, . . .$

This stochastic process follows the Markovian property, since we saw above that the state at time $t+1$ is a function of $X_t$ and a random variable $D_{t+1}$ that is evaluated during the week. We know the distribution of the $D_t$ random variables, so we should be able to construct the transition matrix for this example.

What does the transition matrix look like? Let's see if we can work out a few examples entries, starting with $p_{00}$. Recall, $p_{00}=\prob{X_{t+1}=0|X_t=0}$. If $X_t=0$, then Dave will order 3 cameras that will be on hand to start week $t+1$. So for us to end up with $X_{t+1}=0$ we need the demand $D_{t+1}$ to be greater than or equal to 3. Since $D_{t+1}$ is a Poisson random variable with a mean of 1, we can get the value we need from knowledge of the Poisson distribution. In this case, the probability we need is

$$
p_{00}=\prob{D_{t+1}\geq3}\approx0.080
$$

By similar logic, we have $p_{01}=\prob{D_{t+1}=2}$, $p_{02}=\prob{D_{t+1}=1}$, and $p_{03}=\prob{D_{t+1}=0}$.

When $X_t>0$ then Dave will not order any cameras. So if we want to find $p_{10}$ (corresponding to $X_t=1$ and $X_t=0$) then the probability we need to find is $\prob{D_{t+1}\geq 1}$, while $p_{11}=\prob{D_{t+1}=0}$ and $p_{12}=p_{13}=0$. Continuing by this logic, we get the transition matrix

$$
\mathbf{P}=\begin{bmatrix}
0.080 & 0.184 & 0.368 & 0.368 \\
0.632 & 0.368 & 0     & 0     \\
0.264 & 0.368 & 0.368 & 0     \\
0.080 & 0.184 & 0.368 & 0.368
\end{bmatrix}
$$

{#eq:inventoryMatrix}

### $n$-step transition probabilities {#sec:nStepTransitionProbs}

Now we know that each Markov chain has an associated transition matrix $\mathbf{P}$. Suppose that we have a Markov chain with two states, so that $\mathbf{P}$ is a $2\times2$ matrix. Watch what happens when we multiply $\mathbf{P}$ by itself:

$$
\begin{align*}
\mathbf{P}^2&=\begin{bmatrix}
p_{00} & p_{01} \\
p_{10} & p_{11} \\
\end{bmatrix}\begin{bmatrix}
p_{00} & p_{01} \\
p_{10} & p_{11} \\
\end{bmatrix} \\
&=\begin{bmatrix}
p_{00}p_{00} + p_{01}p_{10} &
p_{00}p_{01} + p_{01}p_{11} \\
p_{10}p_{00} + p_{11}p_{10} &
p_{10}p_{01} + p_{11}p_{11}
\end{bmatrix}
\end{align*}
$$

Let's denote the $i,j$ entry of that matrix as $p_{ij}^{(2)}$, and for example let's consider the two terms that make up $p_{00}^{(2)}$. We could write the first term as

$$
\begin{align*}
p_{00}p_{00} &= \prob{X_{t+1}=0|X_t=0}\prob{X_{t+1}=0|X_t=0} \\
&= \prob{X_{t+1}=0|X_t=0}\prob{X_{t+2}=0|X_{t+1}=0}
\end{align*}
$$

(the last substitution follows due to time stationarity). Due to independence of the relevant events, that term represents the probability of transitioning from state 0 to state 0 in two successive time steps. Meanwhile, the second term becomes

$$
\begin{align*}
p_{01}p_{10} &= \prob{X_{t+1}=1|X_t=0}\prob{X_{t+1}=0|X_t=1} \\
&= \prob{X_{t+1}=1|X_t=0}\prob{X_{t+2}=0|X_{t+1}=1}
\end{align*}
$$

or the probability of transitioning from state 0 to state 1, then back from 1 to 0 in successive time steps. So together,

$$
p_{00}^{(2)} = p_{00}p_{00} + p_{01}p_{10}
$$

represents the two possible ways to start in state 0 in some time step, then return back to 0 after two transitions. Since these two paths are disjoint events, their joint probability is the sum of the individual probabilities. So $p_{00}^{(2)}$ is exactly the probability of starting in state 0 at some time step, and then being in state 0 again two steps later.

In general, we can write out the following __Chapman-Kolmogorov equation__

$$
p_{ij}^{(n)}=\sum_{k=0}^Mp_{ik}^{(n-1)}p_{kj}
$$

essentially saying that to get from state $i$ to state $j$ in $n$ steps, the associated event consists of any sequence that takes us from $i$ to some state $k$ in $n-1$ steps, then directly from $k$ to $j$ in the final step. Furthermore, the associated probability is as given above. A simple application of mathematical induction tells us that if we let $p_{ij}^{(n)}$ represent the $i,j$ entry of the matrix multiplication $\mathbf{P}^n$ (multiplying $\mathbf{P}$ by itself $n$ times), then $p_{ij}^{(n)}$ equals the probability of being in state $i$ at some time step and ending up in state $j$ after $n$ transitions.

Wanna apply this knowledge to our previous example Markov chains? Check the following notebook.

{colabGist:1AlCE8vVZJAMc1K8v9BtdwR4B0GE0I59L,acaebd42106eb6efc95b8f88fee04531}

### State classification

As we continue analyzing Markov chains, many of our results will depend on the nature of the possible states in the chain. In this section we'll examine different classifications for the states of Markov chains.

<h4>Communication</h4>

A state $j$ is said to be __accessible__ from state $i$ if $p_{ij}^{(n)}>0$ for some $n\geq0$. In other words, state $j$ being accessible from state $i$ simply means that it's possible for the system to enter state $j$ _eventually_ when it starts from state $i$. Furthermore, two states $i$ and $j$ are said to __communicate__ if both states are accessible from each other, i.e. state $j$ is accessible from state $i$ _and_ state $i$ is accessible from state $j$. Said another way, $i\neq j$ communicate if and only if it is possible to start in state $i$, enter state $j$ some time in the future, then eventually make it back to state $i$. Given that definition, the following statements must be true:

1. Any state communicates with itself (by technicality, since $p_{ii}^{(0)}=\prob{X_t=i|X_t=i}=1$).
2. If state $i$ communicates with state $j$, then state $j$ communicates with state $i$.
3. If state $i$ communicates with state $j$ and state $j$ communicates with state $k$, then state $i$
communicates with state $k$.

For the two examples we've seen so far (weather and inventory), it should be pretty clear that all the states communicate with each other. It's very clear from the transition matrix for the weather example (+@eq:weatherMatrix) that you can go from any state to the other state in just one step. It's slightly less clear for the inventory example (transition matrix +@eq:inventoryMatrix), since you can't e.g. go directly from state 1 to state 2 in a single step. But you _can_ go from state 1 directly to state 0, then from state 0 directly to state 2 (and similar could be said for any pair of states)[^exampleMatrixFromNotebook].

[^exampleMatrixFromNotebook]: We could use the previous notebook to show that $\mathbf{P}^2$ has all positive entries for the inventory example, which is also sufficient to show that all states communicate.

So it looks like we need another example so we can see these (and later) definitions in action.

<h4>Gambling example</h4>

In this example, (once again from +@classText) a gambler repeatedly plays a game until he hits some end condition:

> Suppose that a player has \$1 and with each play of the game wins $1 with probability $p > 0$ or loses \$1 with probability $1 − p > 0$. The game ends when the player either accumulates $3 or goes broke. This game is a Markov chain with the states representing the player’s current holding of money, that is, \$0, \$1, \$2, or \$3.

What should this transition matrix look like? The write-up tells us that the gambler stops playing when he reaches either \$0 or \$3, but we can emulate this behavior by saying that whenever the process reaches state $i\in\{0,3\}$ it will continue to stay in state $i$ for all subsequent time steps. So we will have $p_{00}=p_{33}=1$. Then for $i\in\{1,2\}$ we just need $p_{i,i+1}=p$ and $p_{i,i-1}=1-p$, so the transition matrix looks like:

$$
\mathbf{P}=\begin{bmatrix}
1&0&0&0\\
1-p&0&p&0\\
0&1-p&0&p\\
0&0&0&1\\
\end{bmatrix}
$$

{#eq:gamblingMatrix}

which states communicate in this example? Clearly no other states communicate with state 0 or state 3. In contrast, States 1 and 2 _do_ communicate, since $p_{12}>0$ and $p_{21}>0$.

<h4>Classes and reducibility</h4>

If all of the pairs of states in a Markov chain communicate with each other, then we say that the chain is __irreducible__. As we saw, this is the case in both the weather and inventory examples, but it is _not_ the case in the gambling example.

In the case that a Markov chain is not irreducible, it can still be useful to know which groups of states _do_ mutually communicate. Indeed, as a consequence of the three properties of communication stated above, the states of a Markov chain may be partitioned into one or more separate __classes__ such that those states that communicate with each other are in the same class. Such a class is also often called a __communication class__. In the gambling example there are three distinct classes, $\{0\}$, $\{3\}$, and $\{1,2\}$.

<h4>Recurring, transient, and absorbing states</h4>

Let's look again at states 1 and 2 from the gambling example. While it is technically possible to keep bouncing back and forth between these two states for arbitrarily long, eventually (and in all probability[^inAllProbability]) the chain will transition to either state 0 or 3, and never return to 1 or 2 again. Any such state where, upon entering it, it is possible to leave its communication class completely and never return again, is called a __transient state__. More precisely, a state $i$ is transient if there exists a state $j$ such that $j$ is accessible from $i$ but $i$ is not accessible from $j$.

[^inAllProbability]: I'll keep peppering the notes with that term, "in all probability" as a substitute for notions from the more rigorous probability theory that we won't explore here. It comes from a notion that there can be events that are "possible" (exist as a subset of the sample space) but still have 0 probability of occurring (like bouncing back and forth forever between states 1 and 2 forever). So even though they are technically possible, we don't consider them from a probabilistic perspective.

Conversely, a state is called a __recurrent state__ if, upon entering this state, the process definitely will (in all probability) return to this state again. This forms a true dichotomy with the concept of transient states, in that every state in a Markov chain must be either transient or recurrent. Every state we've seen in our three examples have been recurrent states, save for states 1 and 2 in the gambling example, which are transient.

Since recurrent states will (in all probability) always be revisited after leaving, then they will be visited infinitely often over the course of the process (if they are visited at all). In contrast, transient states are only ever visited finitely often over all of the time steps.

Not all recurrent states are created equal, however. States 0 and 3 in the gambling example have the property that once they are visited, the process will never leave that state. Such a recurrent state is also called an __absorbing state__. A state $i$ is an absorbing state if and only if $p_{ii}=1$.

It is worth noting that recurrence and transience are both __class properties__, i.e. a property that must be shared between every state in the same class. Thus if $i$ and $j$ are two states in the same recurrence class, it must be that $i$ and $j$ are either both recurrent or both transient.

<h4>Periodicity</h4>

Sometimes there are restrictions on the time-steps at which a state can be entered. In the gambling example (transition matrix +@eq:gamblingMatrix) you start at time $t=0$ in state 1. From there, it is clearly impossible to enter state 1 at time $t=1$. In fact, the only times you may enter state 1 are at $t=2, t=4, t=6$, or any even-numbered time step. This observation motivates the next definition.

The __period__ of a state $i$ is the smallest number $t$ such that 

$$
p_{ii}^{(n)}\begin{cases}
= 0    && \text{ if } n \text{ is not a multiple of } t \\
\geq 0 && \text{ if } n \text{ is a multiple of } t
\end{cases}
$$

If the period of some state $i$ is equal to 1, then we say that state $i$ is __aperiodic__.

From this definition, it is clear that both states 1 and 2 in the gambling example are periodic states with periods of 2. Furthermore, we know that they _have to_ have the same period, since we already know they are in the same recurrence class, and it can be shown that periodicity is a class property (i.e. all states in the same class must share the same period).

In a finite-state Markov chain, states that are both recurrent and aperiodic are called __ergodic__ states. Further, if every state in a Markov chain is ergodic, then the chain itself is said to be ergodic. Ergodic Markov chains have special properties that we will soon explore.

### Absorption probabilities

The gambling example (+@eq:gamblingMatrix) is interesting in that it has multiple absorbing states. If there were only one absorbing state, we would know that, in the long run, the chain would eventually become stuck at that one state. But since in this case we have two different absorbing states (which have very different implications for our gambler) we might be interested in knowing the probability of getting stuck in one state versus the other. Our aim for this section is to show how these probabilities can be calculated.

Of course, the probability of absorption into a particular state can be very dependent on where you started. After all, if you start the gambling example in state 0, you're already absorbed there and cannot possibly make it to the other absorbing state 3!. So our goal for this section will be to find the probability of absorption into state $k$ given that the system starts in state $i$, which we'll denote by $f_{ik}$.

How might we be able to find these probabilities? In analogy to the Chapman-Kolmogorov equation in +@sec:nStepTransitionProbs, we can write the following:

$$
f_{ik}=\sum_{j=0}^Mp_{ij}f_{jk}
$$

Where does this come from? This arises from noting that the event of starting in state $i$ and eventually being absorbed in state $k$, is exactly the union (over all states $j$) of the events of starting in state $i$, transitioning first to state $j$, then from state $j$ eventually being absorbed into state $k$.

Furthermore, there are $M+1$ of these equations (one for each possible starting state $i$), so we can build a system of $M+1$ linear equations and $M+1$ unknowns. Thus by solving this system, we will recover all the relevant probabilities for the chosen absorbing state $k$!

Let's now apply this to the gambling example with absorbing state $k=0$. In that case, we clearly have $f_{00}=1$ and $f_{30}=0$, so we only need to write out the other two equations. Doing so gives us the following system:

$$
\begin{align*}
f_{10} &= p_{10}f_{00} + p_{11}f_{10} + p_{12}f_{20} + p_{13}f_{30} \\
f_{20} &= p_{20}f_{00} + p_{21}f_{10} + p_{22}f_{20} + p_{23}f_{30}
\end{align*}
$$

Subbing in the values we already know, we get:

$$
\begin{align*}
f_{10} &= (1-p)(1) + (0)f_{10} + (p)f_{20} + (0)(0) = 1-p + pf_{20} \\
f_{20} &= (0)(1) + (1-p)f_{10} + (0)f_{20} + (p)(0) = (1-p)f_{10}
\end{align*}
$$

Solving this system gives:

$$
f_{10}=\frac{1 - p}{p^{2} - p + 1}\qquad
f_{20}=\frac{p^{2} - 2 p + 1}{p^{2} - p + 1}
$$

We could follow this same procedure to find the $f_{i3}$ probabilities. But in this case there are only two absorbing states, so the only possible long-run possibilities are absorption into either state 0 or state 3. So in this case we have $f_{i3} = 1 - f_{i0}$ for all $i$.

<!-- ### Initial state probabilities



### Steady-state probabilities

Let's take a moment and return to the Colab notebook in +@sec:nStepTransitionProbs, where we explored $n$-step transition probabilities. For either of the probability matrices in that section, if you raise them to a high enough power (20 will suffice for either) you might notice something peculiar. Letting $\mathbf{P}$ be the transition matrix from the inventory example (+@eq:inventoryMatrix), from the notebook you would find that $\mathbf{P}^{n}$ for large $n$ is approximately:

```python
array([[0.28565411, 0.28483488, 0.26318076, 0.16633024],
       [0.28565411, 0.28483488, 0.26318076, 0.16633024],
       [0.28565411, 0.28483488, 0.26318076, 0.16633024],
       [0.28565411, 0.28483488, 0.26318076, 0.16633024]])
```

Notice how every row of that matrix is identical to every other row. What does that mean? It would mean that for large enough $n$ the probability of ending up in a given state after $n$ transitions is the same _no matter where you started_. This would imply that starting conditions are irrelevant to the long-run behavior of the system.

We will see shortly that this was no accident. 

### First passage times -->