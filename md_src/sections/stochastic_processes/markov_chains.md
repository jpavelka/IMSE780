## Markov chains

<div class='lectureVideoEmbed' video-id='14b359b60e3a40eab58a0bdfb1bc85341d' video-date='2023-11-06'>Intro to Markov chains</div>

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

In general, we can write out the following **Chapman-Kolmogorov equation**

$$
p_{ij}^{(n)}=\sum_{k=0}^Mp_{ik}^{(n-1)}p_{kj}
$$

essentially saying that to get from state $i$ to state $j$ in $n$ steps, the associated event consists of any sequence that takes us from $i$ to some state $k$ in $n-1$ steps, then directly from $k$ to $j$ in the final step. Furthermore, the associated probability is as given above. A simple application of mathematical induction tells us that if we let $p_{ij}^{(n)}$ represent the $i,j$ entry of the matrix multiplication $\mathbf{P}^n$ (multiplying $\mathbf{P}$ by itself $n$ times), then $p_{ij}^{(n)}$ equals the probability of being in state $i$ at some time step and ending up in state $j$ after $n$ transitions.

Wanna apply this knowledge to our previous example Markov chains? Check the following notebook.

{colabGist:1AlCE8vVZJAMc1K8v9BtdwR4B0GE0I59L,acaebd42106eb6efc95b8f88fee04531}

### State classification

<div class='lectureVideoEmbed' video-id='63e37289e2b140f483720be323e050b91d' video-date='2023-11-08'>State classification, absorption probabilities</div>

As we continue analyzing Markov chains, many of our results will depend on the nature of the possible states in the chain. In this section we'll examine different classifications for the states of Markov chains.

<h4>Communication</h4>

A state $j$ is said to be **accessible** from state $i$ if $p_{ij}^{(n)}>0$ for some $n\geq0$. In other words, state $j$ being accessible from state $i$ simply means that it's possible for the system to enter state $j$ _eventually_ when it starts from state $i$. Furthermore, two states $i$ and $j$ are said to **communicate** if both states are accessible from each other, i.e. state $j$ is accessible from state $i$ _and_ state $i$ is accessible from state $j$. Said another way, $i\neq j$ communicate if and only if it is possible to start in state $i$, enter state $j$ some time in the future, then eventually make it back to state $i$. Given that definition, the following statements must be true:

1. Any state communicates with itself (by technicality, since $p_{ii}^{(0)}=\prob{X_t=i|X_t=i}=1$).
2. If state $i$ communicates with state $j$, then state $j$ communicates with state $i$.
3. If state $i$ communicates with state $j$ and state $j$ communicates with state $k$, then state $i$
   communicates with state $k$.

For the two examples we've seen so far (weather and inventory), it should be pretty clear that all the states communicate with each other. It's very clear from the transition matrix for the weather example (+@eq:weatherMatrix) that you can go from any state to the other state in just one step. It's slightly less clear for the inventory example (transition matrix +@eq:inventoryMatrix), since you can't e.g. go directly from state 1 to state 2 in a single step. But you _can_ go from state 1 directly to state 0, then from state 0 directly to state 2 (and similar could be said for any pair of states)[^exampleMatrixFromNotebook].

[^exampleMatrixFromNotebook]: We could use the previous notebook to show that $\mathbf{P}^2$ has all positive entries for the inventory example, which is also sufficient to show that all states communicate.

So it looks like we need another example so we can see these (and later) definitions in action.

<h4>Gambling example</h4>

In this example, (once again from @classText) a gambler repeatedly plays a game until he hits some end condition:

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

And the associated transition diagram:

![Transition diagram for gambling Markov chain example [@classText]](images/gambling-transition-diagram.png)

Which states communicate in this example? Clearly no other states communicate with state 0 or state 3. In contrast, States 1 and 2 _do_ communicate, since $p_{12}>0$ and $p_{21}>0$.

<h4>Classes and reducibility</h4>

If all of the pairs of states in a Markov chain communicate with each other, then we say that the chain is **irreducible**. As we saw, this is the case in both the weather and inventory examples, but it is _not_ the case in the gambling example.

In the case that a Markov chain is not irreducible, it can still be useful to know which groups of states _do_ mutually communicate. Indeed, as a consequence of the three properties of communication stated above, the states of a Markov chain may be partitioned into one or more separate **classes** such that those states that communicate with each other are in the same class. Such a class is also often called a **communication class**. In the gambling example there are three distinct classes, $\{0\}$, $\{3\}$, and $\{1,2\}$.

<h4>Recurring, transient, and absorbing states</h4>

Let's look again at states 1 and 2 from the gambling example. While it is technically possible to keep bouncing back and forth between these two states for arbitrarily long, eventually (and in all probability[^inAllProbability]) the chain will transition to either state 0 or 3, and never return to 1 or 2 again. Any such state where, upon entering it, it is possible to leave its communication class completely and never return again, is called a **transient state**. More precisely, a state $i$ is transient if there exists a state $j$ such that $j$ is accessible from $i$ but $i$ is not accessible from $j$.

[^inAllProbability]: I'll keep peppering the notes with that term, "in all probability" as a substitute for notions from the more rigorous probability theory that we won't explore here. It comes from a notion that there can be events that are "possible" (exist as a subset of the sample space) but still have 0 probability of occurring (like bouncing back and forth forever between states 1 and 2 forever). So even though they are technically possible, we don't consider them from a probabilistic perspective.

Conversely, a state is called a **recurrent state** if, upon entering this state, the process definitely will (in all probability) return to this state again. This forms a true dichotomy with the concept of transient states, in that every state in a Markov chain must be either transient or recurrent. Every state we've seen in our three examples have been recurrent states, save for states 1 and 2 in the gambling example, which are transient.

Since recurrent states will (in all probability) always be revisited after leaving, then they will be visited infinitely often over the course of the process (if they are visited at all). In contrast, transient states are only ever visited finitely often over all of the time steps.

Not all recurrent states are created equal, however. States 0 and 3 in the gambling example have the property that once they are visited, the process will never leave that state. Such a recurrent state is also called an **absorbing state**. A state $i$ is an absorbing state if and only if $p_{ii}=1$.

It is worth noting that recurrence and transience are both **class properties**, i.e. a property that must be shared between every state in the same class. Thus if $i$ and $j$ are two states in the same communication class, it must be that $i$ and $j$ are either both recurrent or both transient.

<h4>Periodicity</h4>

Sometimes there are restrictions on the time-steps at which a state can be entered. In the gambling example (transition matrix +@eq:gamblingMatrix) you start at time $t=0$ in state 1. From there, it is clearly impossible to enter state 1 at time $t=1$. In fact, the only times you may enter state 1 are at $t=2, t=4, t=6$, or any even-numbered time step. This observation motivates the next definition.

The **period** of a state $i$ is the smallest number $t$ such that

$$
p_{ii}^{(n)}\begin{cases}
= 0    && \text{ if } n \text{ is not a multiple of } t \\
\geq 0 && \text{ if } n \text{ is a multiple of } t
\end{cases}
$$

If the period of some state $i$ is equal to 1, then we say that state $i$ is **aperiodic**.

From this definition, it is clear that both states 1 and 2 in the gambling example are periodic states with periods of 2. Furthermore, we know that they _have to_ have the same period, since we already know they are in the same communication class, and it can be shown that periodicity is a class property (i.e. all states in the same class must share the same period).

In a finite-state Markov chain, states that are both recurrent and aperiodic are called **ergodic** states. Further, if every state in a Markov chain is ergodic, then the chain itself is said to be ergodic. Ergodic Markov chains have special properties that we will soon explore.

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

### Unconditional probabilities {#sec:markovUnconditional}

<div class='lectureVideoEmbed' video-id='9c199a22fe4b46ddb849f99e1c8f276b1d' video-date='2023-11-10'>Long-run properties of Markov chains</div>

Most of the probabilities we have seen so far have been _conditional_ probabilities, dependent on the current state of the process. This is because we don't know at any given time step where the process may be. If we'd like to talk about _unconditional_ probabilities, we'll need to know something more concrete about where the system is at any given time. Usually we'll do this by setting initial conditions for the chain, i.e. specifying (either absolutely or probabilistically) which state the process will start out in[^initialStateInventory].

[^initialStateInventory]: We've actually done this once already, when we said the inventory example would start out in state $X_0=3$.

In order to do this, we can specify a row vector $\boldsymbol\pi$ where each entry $\pi_i$ represents

$$
\pi_i=\prob{X_0=i}
$$

Then if we multiply $\boldsymbol\pi\mathbf{P}$[^columnVectorEasierToSee]:

[^columnVectorEasierToSee]: Note that the multiplication results in a row vector. I'm writing it as a transposed column vector to put each entry on its own line and make things a little more clear.

$$
\boldsymbol\pi\mathbf{P}=\begin{bmatrix}
 \pi_0p_{00} + \pi_1p_{10} + \dots + \pi_Mp_{M0} \\
 \pi_0p_{01} + \pi_1p_{11} + \dots + \pi_Mp_{M1} \\
 \vdots \\
 \pi_0p_{0M} + \pi_1p_{1M} + \dots + \pi_Mp_{MM}
\end{bmatrix}\T
$$

Each entry $i$ of this resultant vector is then given by:

$$
\begin{align*}
&\pi_0p_{0i} + \pi_1p_{1i} + \dots + \pi_Mp_{Mi} \\
=&\prob{X_0=0}\prob{X_1=i|X_0=0} + \prob{X_0=1}\prob{X_1=i|X_0=1} + \dots + \prob{X_0=M}\prob{X_1=i|X_0=M} \\
=&\prob{\{X_1=i\}\cap\{X_0=0\}} + \prob{\{X_1=i\}\cap\{X_0=1\}} + \dots + \prob{\{X_1=i\}\cap\{X_0=M\}} \\
=&\prob{X_1=i}
\end{align*}
$$

(Where the third line come from the definition of conditional probability +@eq:conditionalProbability, and the final line is due to the [law of total probability](https://en.wikipedia.org/wiki/Law_of_total_probability).) It's not too hard to show that this logic falls out the same way for $\mathbf{P}^n$ for any $n\geq0$. That is, if $\boldsymbol\pi$ holds the initial state probabilities, then we have

$$
\boldsymbol\pi\mathbf{P}^n=\begin{bmatrix}\prob{X_n=0} & \prob{X_n=1} & \cdots & \prob{X_n=M}\end{bmatrix}
$$

If you have a case where you want to enforce $X_0=i$, then you can simply set up $\boldsymbol\pi$ so that $\pi_i=1$ and $\pi_j=0$ for all $j\neq i$.

### Steady-state probabilities {#sec:markovSteadyState}

Let's take a moment and return to the Colab notebook in +@sec:nStepTransitionProbs, where we explored $n$-step transition probabilities. For either of the probability matrices in that section, if you raise them to a high enough power (20 will suffice for either) you might notice something peculiar. Letting $\mathbf{P}$ be the transition matrix from the inventory example (+@eq:inventoryMatrix), using the notebook you would find that $\mathbf{P}^{n}$ for large $n$ is approximately:

```python
array([[0.28565411, 0.28483488, 0.26318076, 0.16633024],
       [0.28565411, 0.28483488, 0.26318076, 0.16633024],
       [0.28565411, 0.28483488, 0.26318076, 0.16633024],
       [0.28565411, 0.28483488, 0.26318076, 0.16633024]])
```

Notice how every row of that matrix is identical to every other row. What does that mean? It would mean that for large enough $n$ the probability of ending up in a given state after $n$ transitions is the same _no matter where you started_. This would imply that starting conditions are irrelevant to the long-run behavior of the system.

Let's state this observation a little more mathematically. For each state $j$ and large enough $n$, we've noticed that

$$
p_{0j}^{(n)}\approx p_{1j}^{(n)}\approx\cdots\approx p_{Mj}^{(n)}
$$

(at least for these two examples). As we continue to choose larger and larger values for $n$, the numbers do not appear to change. This is no proof, of course, but it seems reasonable to surmise that

$$
\lim_{n\rightarrow\infty}p_{0j}^{(n)} = \lim_{n\rightarrow\infty}p_{1j}^{(n)} = \cdots = \lim_{n\rightarrow\infty}p_{Mj}^{(n)}
$$

It turns out that, under fairly common conditions, these properties _do_ hold. In fact, there is often a handy way to solve for these long-run probabilities. The main result (which is beyond the scope of this class to prove) is as follows:

<div class='theorem' id='thm:markovSteadyState'>
For any irreducible ergodic Markov chain with transition matrix $\mathbf{P}$ and any state $j$, the limit
$$
\lim_{n\rightarrow\infty}p_{ij}^{(n)}
$$
exists and is independent of $i$. Furthermore, for any $i$
$$
\lim_{n\rightarrow\infty}p_{ij}^{(n)}=\pi_j
$$
where $\pi_j$ is the $j$th entry of the unique vector $\boldsymbol\pi$ satisfying
$$
\begin{align*}
\boldsymbol\pi\mathbf{P}&=\boldsymbol\pi\\
\sum_{j=0}^M\pi_j&=1
\end{align*}
$$
</div>

Those conditions at the end of the theorem,

$$
\begin{align*}
\boldsymbol\pi\mathbf{P}&=\boldsymbol\pi\\
\sum_{j=0}^M\pi_j&=1
\end{align*}
$$

{#eq:markovSteadyState}

are called the **steady-state equations** of the Markov chain, and the solution $\boldsymbol\pi$ is the vector of **steady-state probabilities**. The _steady-state_ part of those names make sense in the light of what we explored in +@sec:markovUnconditional. There, we let $j$th entry of $\boldsymbol\pi$ be the probability $\prob{X_0=j}$ of starting the process in some state $j$. Then we saw that the $j$th entry of the product $\boldsymbol\pi\mathbf{P}$ gave the probability $\prob{X_1=j}$ of being in state $j$ in the next time step. If $\boldsymbol\pi$ satisfies the steady-state equations, then these probabilities are the same!

Ah, but there seems to be a problem. The steady-state equations include $M+1$ unknowns (the entries $\pi_j$ of the vector $\boldsymbol\pi$) but $M+2$ equations, so it seems like there won't be enough degrees of freedom to find a solution.

But actually, since each row of $\mathbf{P}$ sums to one, knowing any $M$ columns out of that matrix is sufficient to determine the $M+1$st column. So $\mathbf{P}$ cannot have full rank, meaning only $M$ of the equations in $\boldsymbol\pi\mathbf{P}$ could be linearly independent. In practice, this means that we can take only $M$ of those equations and solve them simultaneously with $\sum_{j=0}^M\pi_j=1$ to find the steady-state probabilities.

<h4>Example</h4>

Let's use what we know to find the steady-state probabilities for the weather example. The system $\boldsymbol\pi\mathbf{P}=\boldsymbol\pi$ gives the equations:

$$
\begin{align*}
\begin{bmatrix}\pi_1 & \pi_2\end{bmatrix}\begin{bmatrix}0.8 & 0.2 \\ 0.6 & 0.4\end{bmatrix}&=\begin{bmatrix}\pi_1 & \pi_2\end{bmatrix} \\
&\Updownarrow \\
\begin{bmatrix}0.8\pi_1 + 0.6\pi_2 & 0.2\pi_1 + 0.4\pi_2\end{bmatrix}&=\begin{bmatrix}\pi_1 & \pi_2\end{bmatrix}
\end{align*}
$$

Since one of these is redundant, we can choose one to throw away (we'll just say the first one) and solve simultaneously with the condition $\pi_1 + \pi_2 = 1$. So we need to solve the system:

$$
\begin{align*}
\pi_1 + \pi_2 &= 1 \\
0.2\pi_1 + 0.4\pi_2&=\pi_2
\end{align*}
$$

Which works out to

$$
\pi_1=0.75, \quad \pi_2=0.25
$$

So the steady-state vector is $\boldsymbol\pi=[0.75, 0.25]$.

<h4>Solving for the steady-state probabilities in matrix form</h4>

The above argument gives you a way to solve for the steady-state probabilities by hand, but a more machine-friendly way is to use the following matrix form (which we won't bother to prove, though you can look for it in @resnickAdventures):

$$
\boldsymbol\pi = \begin{bmatrix}1&1&\cdots&1\end{bmatrix}(\identity - \mathbf{P} + \mathbf{O})\inv
$$

where $\identity$ is an $(M+1)\times (M+1)$ identity matrix and $\mathbf{O}$ is an $(M+1)\times (M+1)$ matrix with every entry equal to 1. You might look at that and be worried about the matrix $(\identity - \mathbf{P} + \mathbf{O})$ even having an inverse, but rest assured that if the process is irreducible and ergodic then the inverse will exists. We will see how to apply this in Python shortly.

### Average cost per time step

These preceding results for

$$
\lim_{n\rightarrow\infty}p_{ij}^{(n)}
$$

all required the underlying Markov chain to be ergodic. But suppose the Markov chain instead had aperiodic states. Then the limit above need not exist, since for infinitely many values of $n$ we'd have $p_{ij}^{(n)}=0$, but for other $n$ the value may be strictly bounded from 0.

But there is a related quantity that always will exist so long as the process is irreducible. Namely, for any state $j$ (and independent of starting state $i$) we can show that the following holds:

$$
\lim_{n\rightarrow\infty}\frac{1}{n}\sum_{k=1}^np_{ij}^{(k)}=\pi_j
$$

where $\pi_j$ is the $j$th entry of the vector $\boldsymbol\pi$ satisfying the steady-state equations +@eq:markovSteadyState. This limit is essentially the long-run average probability of ending up in state $j$, with that average taken over all time steps. It is very easy to see why this might be related to the steady-state probabilities, and luckily it is applicable to a larger range of stochastic processes.

In particular, it is going to help us in the case that we have some cost associated with entering particular states in a Markov chain, and we'd like to know something about the costs that we incur in the long run. In that spirit, let $c$ be some function so that when a Markov chain enters state $X_i$ for any $i\in\{0,\dots,M\}$ we incur some cost $c(X_i)$. In this case, we can use that above result[^notProvingLimitTheorems] to show that the **long-run expected average cost per unit time** is given by:

[^notProvingLimitTheorems]: I've sure been presenting a lot of these results without even hinting at proofs, haven't I? It all comes down to not wanting to deal with more rigorous probability theory.

$$
\lim_{n\rightarrow\infty}\E{\frac{1}{n}\sum_{t=1}^nc(X_t)}=\sum_{j=0}^M\pi_jc(j).
$$

<h4>Example</h4>

Let's reconsider the inventory example (transition matrix +@eq:inventoryMatrix). Suppose that Dave now incurs a storage cost for each camera remaining on the shelf at the end of the week. The cost function is structured as follows:

$$
c(x) = \begin{cases}
0 &&\text{ if } x = 0 \\
2 &&\text{ if } x = 1 \\
8 &&\text{ if } x = 2 \\
18 &&\text{ if } x = 3
\end{cases}
$$

Let's head to the following Colab notebook to calculate the long-run expected average storage cost per week.

{colabGist:1K84wMoNPv3BB38THMYn3BtTdEAZQX_pL,d0c5365b0fd5a5b2db8aefc5cf025719}

### Application to web search

As mentioned at the beginning of this section, Markov chains have played a part in how Google orders pages in its search results[^notSureIfStillInUse]. There is a pretty neat idea behind it, so let's take a look at how it works!

[^notSureIfStillInUse]: What we'll show here is part of one of Google's original algorithms, PageRank. Admittedly they've added a lot since then and I do not know if this particular strategy is still in use.

Suppose you have a collection of $M+1$ websites that you'd like to rank by "importance". You have access to the content of the sites, but no external information like page views. What might you do?

One thing you can determine from the site content is what pages link to other pages in your collection. You might be tempted then to rank pages by the number of other pages linking to it. But that could be gamed easily - anyone that wants a higher ranking can just create a bunch of new websites with links to their main site. So what you'd like to do is somehow count links from more important websites higher than links from less important websites. But importance is exactly what we're trying to determine in the first place! It all seems just hopelessly self-referential.

But what about this? Pretend that there is some "random" web surfer, who navigates to one of the websites at random and, from then on, chooses a link at random from all of those available on the page. The measure of importance would be what proportion of time the surfer goes to a given site. It would be pretty easy to model this as a Markov chain. As usual, we'll label the states $0,1,\dots,M$, with each one representing a website. Suppose each site $i$ had $n_i$ links out to other websites. Then the transition matrix (let's call it $\mathbf{P}^{\text{links}}$) would have entries

$$
p^{\text{links}}_{ij} = \begin{cases}
\frac{1}{n_i}&&\text{if site } i \text{ links to site }j \\
0&&\text{otherwise}
\end{cases}
$$

This should be able to neutralize the attack mentioned above, where a website owner creates a bunch of zombie websites whose only purpose is to link back to the main site. If no other sites link to those zombie websites, then they can't affect the traffic to the main site in the long term.

So if we take $\boldsymbol\pi$ as the solution to the steady-state equations +@eq:markovSteadyState, then that will give us the importance ratings we need! But there could be a problem, as we have no guarantee that our Markov chain is recurrent. So it may not be possible to solve the steady-state equations. We can mitigate this by creating a new matrix $\mathbf{P}^{\text{uniform}}$ with entries

$$
p^{\text{uniform}}_{ij} = \frac{1}{M+1}
$$

Thinking back to the random surfer, this would correspond to the surfer not selecting some link on the current site, but instead just choosing from random across _all_ the sites considered. To make this useful to us, we can combine this matrix with the last one via some weighting to create our final transition matrix $\mathbf{P}$. Maybe something like:

$$
\mathbf{P} = 0.9\mathbf{P}^{\text{links}} + 0.1\mathbf{P}^{\text{uniform}}
$$

This final matrix corresponds to a process where the surfer clicks on a random link 90% of the time, but the other 10% of the time just selects a new page at random. Check out the following notebook to get a feel for how this might work.

{colabGist:1v51aGphcWAxmlpyqkvA67a_HbPnfcvPa,829e60ed481a4ab7fe3d4b1e397ddbd2}