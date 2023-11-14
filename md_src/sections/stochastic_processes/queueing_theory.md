## Queueing theory

<div class='lectureVideoEmbed' video-id='2adef3f4887e4c5397ba4a5b0be0a43d1d' video-date='2023-11-13'>Intro to queues</div>

The next area of stochastic processes we will study is **queueing theory**, which you could call the study of waiting in lines. The models we see here could be seen as a special class of (continuous-time) Markov chains, but the theory is well-developed outside of that formalism, so we won't be referring back to our Markov chain chapter here.

Perhaps studying people standing in lines sounds like it would not be of much use - but actually, this is pretty practical! It is of course applicable to customer services of all types, and several Edelman prizes have been won by queueing applications (see for example [here](https://pubsonline.informs.org/doi/10.1287/inte.6.1pt2.4) and [here](https://pubsonline.informs.org/doi/10.1287/inte.24.1.6)). @classText highlights several other examples in section 17.3

### Initial example {#sec:queueExample}

Let's now describe our prototype queueing problem, as stated by @classText:

> The emergency room of COUNTY HOSPITAL provides quick medical care for emergency cases brought to the hospital by ambulance or private automobile. At any hour there is always one doctor on duty in the emergency room. However, because of a growing tendency for emergency cases to use these facilities rather than go to a private physician, the hospital has been experiencing a continuing increase in the number of emergency room visits each year. As a result, it has become quite common for patients arriving during peak usage hours (the early evening) to have to wait until it is their turn to be treated by the doctor. Therefore, a proposal has been made that a second doctor should be assigned to the emergency room during these hours, so that two emergency cases can be treated simultaneously. The hospital’s management engineer has been assigned to study this question.
>
> The management engineer began by gathering the relevant historical data and then projecting these data into the next year. Recognizing that the emergency room is a queueing system, she applied several alternative queueing theory models to predict the waiting characteristics of the system with one doctor and with two doctors, as you will see in the latter sections of this chapter.

### Queueing basics

The basic mechanics behind a queueing system are that customers arrive to some system and wait in line for service, with the time between arrivals being determined by some random process. There might be one or several lines to choose from. The customer at the front receives a service, and the service time is also a random variable. The goal for an analysis is to determine any number of possible performance metrics - how long customers stay in the system, what percentage of time they are waiting in line, how long the lines are on average, etc.

Customers to a service are assumed to arrive from the so-called **input source** or **calling population**. An important characteristic of the input source is its **size**, which is essentially the maximum potential number of customers that may require service. The most important distinction is whether the size if _finite_ or _infinite_ (a.k.a. _limited_ or _unlimited_). An assumed infinite input source may sound unrealistic, but it makes the math much easier and is a good approximation for a very large (but finite) calling population that is exceedingly unlikely to all show up for service all at once.

The process by which customers arrive to the system is called the **arrival process**. Most often we will assume that the process generating customers is a Poisson process, i.e. the number of customers arriving within a given time period follows a Poisson distribution. It turns out that this is equivalent to saying that the times between consecutive arrivals (also called the **interarrival times**) follow an exponential distribution. Both of these distributions are well known, and we'll talk more about them in +@sec:exponentialPoissonDistributions.

The **queue** is where customers wait before receiving service. We may sometimes assume that the queue is _finite_, so that only a certain number of customers can be in line at the same time. Other times we'll not assume any such cap, so that the size of the queue is _infinite_. As was the case with the calling population, assuming an infinite queue may not be technically justifiable, but it can simplify the math quite a bit, and not change the answers too much in certain circumstances (where the actual finite maximum will almost certainly never be reached).

We may also sometimes speak about the so-called **queue discipline**, which refers to the order in which members of the queue are selected for service. A common assumption is a **first-in-first-out** (or **first-come-first-served**) discipline, such that the customer that has been in the queue for the longest amount of time is the next customer serviced.

Services in the system occur at one or more **service facilities**, each of which contains one or more parallel service channels, called **servers**. In most basic queueing scenarios you will see only one service facility, with a finite number of servers (often only one). If there is more than one service facility, the customer may receive service from a sequence of these.

At a given facility, the customer enters one of the parallel service channels and is completely serviced by that server. The time elapsed from the beginning to the end of service is called the **service time**. Quite often, service times are also assumed to come from an exponential distribution.

As is evident from the preceding discussion, queueing systems can take on several forms. But the most common (and the one we'll focus on in this course) is described succinctly below by @classText:

> A single waiting line (which may be empty at times) forms in the front of a single service facility, within which are stationed one or more servers. Each customer generated by an input source is serviced by one of the servers, perhaps after some waiting in the queue (waiting line).

The following image depicts this scenario:

![Customers (C) and servers (S) in a queueing system [@classText]](images/queue-system-diagram.png)

When talking about a queueing system, the **state** of the system is the _total_ number of customers in the queueing system. This is in contrast to the **queue length**, which is the number of customers waiting for service to begin. So the state of the system is the queue length _plus_ the number of customers currently being served. In the above image, there are 11 total customers. Four of these customers (standing opposite the servers) are currently receiving service, while the other seven are in the queue. Thus the state of the system is 11, while the queue length is 7.

Finally, it is worth noting that although the language we generally use conjures up images of people standing one behind another while an employee at the front deals with their needs one by one, there not need be any actual people or physical lines involved. The customers need not be people but instead any kind of product or item that might require work. Similarly, the servers may be machines instead of humans. And there may be no actual lines at all, perhaps just a "virtual queue" of callers waiting for the next available call-center representative.

### Exponential and Poisson distributions {#sec:exponentialPoissonDistributions}

In queueing systems, there are two places where randomness comes into play: in determining the service times and interarrival times. In real life, the distributions governing these processes could take on many forms. But, as we've mentioned, in much of queueing theory we assume these numbers are pulled independently from an exponential distribution. The reason for this is two-fold: The first reason is that the form of the exponential distribution gives it several nice properties that we're about to explore, and these properties make our calculations fairly simple. The second reason is that several real-life processes have been shown to follow distributions closely approximating an exponential distribution[^exponentialRealLife].

[^exponentialRealLife]: [This old paper](https://geodesy.noaa.gov/library/pdfs/C&GS_TB_0017.pdf) discusses how closely the interarrival times for earthquakes match the exponential distribution.

Suppose a continuous random variable $T$ represents the time between two consecutive events of some kind. $T$ is said to have an **exponential distribution** with parameter $\alpha$ if its PDF is given by:

$$
f_T(t)=\begin{cases}
\alpha e^{-\alpha t} && t\geq0\\
0 && t<0
\end{cases}
$$

Then the CDF is

$$
F_T(t)=\prob{T\leq t}=\begin{cases}
1 - e^{-\alpha t} && t\geq0\\
0 && t<0
\end{cases}
$$

and $T$'s expectation and variance are:

$$
\E{T}=\frac{1}{\alpha} \qquad \Var{T}=\frac{1}{\alpha^2}
$$

Beyond this, there are several properties of the exponential distribution worth mentioning.

<h4>Memorylessness</h4>

The most famous property of the exponential distribution is the so-called **memorylessness property**. Mathematically, this means that for any positive quantities $t,s>0$, we have

$$
\prob{T>t+s|T>t}=\prob{T>s}
$$

In words, this is saying that the probability of waiting for $s$ more seconds after having already waited for $t$ seconds, is the same as the probability would have been to wait $s$ seconds at the start. There's no mystery mathematically why this occurs, since (using the definition of conditional probability +@eq:conditionalProbability) we have[^intersectionsAndCommas]:

[^intersectionsAndCommas]: You'll notice that I'm being a little sloppy with notation here. Instead of writing $\prob{\{T>t+s\}\cap\{T>t\}}$, I'm going to use the more succinct $\prob{T>t+s,\ T>t}$.

$$
\begin{align*}
\prob{T>t+s|T>t}&=\frac{\prob{T>t+s,\ T>t}}{\prob{T>t}}\\
&=\frac{\prob{T>t+s}}{\prob{T>t}}\\
&=\frac{e^{-\alpha(t + s)}}{e^{-\alpha t}}\\
&=\frac{e^{-\alpha t - \alpha s}}{e^{-\alpha t}}\\
&=e^{-\alpha s}\\
&=\prob{T>s}
\end{align*}
$$

But it does feel a little strange, right? In a lot of situations, there is an impulse to think that if you've been waiting on something for a long time, surely it must be happening soon. But that's not the case here. At the moment one event occurs, the expected time until the next event is going to be $\frac{1}{\alpha}$. This property then tells us that, if we've already waited for $t$ seconds (no matter how large $t$ is), the expected _extra_ time to wait is still $\frac{1}{\alpha}$!

This really is a profoundly strange property, and I think it goes towards describing the situations in which an exponential distribution is a good vs. a bad approximation. To me, I'm more accepting of this property when it comes to customer interarrival times, since there is not reason for individual customer actions to be related to each other. I feels it's more questionable for service times, since in many scenarios the nature of the service is such that it should take about the same amount of time for each customer. But sometimes the service time is dependent on characteristics of the customer, in which case the property can seem more reasonable.

<h4>The minimum of exponentials is exponential</h4>

Let $T_1,T_2,\dots,T_n$ be independent exponential random variables with parameters $\alpha_1,\alpha_2,\dots,\alpha_n$. Let $U$ be the random variable equal to the minimum of the $T_j$ variables, i.e.

$$
U=\min\{T_1,T_2,\dots,T_n\}
$$

In other words, if $T_1,T_2\dots T_n$ are the times until each of $n$ separate events occur, then $U$ is the time until the _first_ of these $n$ events occur. Now, let's notice that

<div class='mathSmall'>
$$
\begin{align*}
\prob{U>t}&=\prob{T_1>t,\ T_2>t,\ \dots,\ T_n>t}&&\text{(def. of min)} \\
&=\prob{T_1>t}\prob{T_2>t}\dots\prob{T_n>t}&&\text{(independence)} \\
&=e^{-\alpha_1t}e^{-\alpha_2t}\dots e^{-\alpha_3t} &&(1 - \text{CDF)} \\
&=e^{-t\sum_{i=1}^n\alpha_i}
\end{align*}
$$

{#eq:minExponentials}

</div>

So the distribution of $U$ is the distribution of an exponential random variable with parameter $\alpha=\sum_{i=1}^n\alpha_i$. This is particularly useful to us in the case that a queueing systems includes several servers with exponential service times. If all the servers are busy, then the system works mathematically just like a single-server system with an exponential rate $\alpha$.

This property also makes it easy to determine probabilities for which of the $T_j$ variables end up being the minimum. We won't give the full derivation, but the end result is

$$
\prob{T_j=U}=\frac{\alpha_j}{\sum_{i=1}^n\alpha_i}
$$

for every $j$.

<h4>Poisson distribution</h4>

Suppose the time between consecutive events (like arrivals to a queueing system) has an exponential distribution with parameter $\alpha$. Suppose we'd like to know about the number of events that occur within a certain amount of time. To that end, we'll define the random variable $X(t)$ to be the number of events that occur between time $0$ (when the timing begins) and time $t$. It turns out that $X(t)$ will have a **Poisson distribution**, with its rate parameter equal to $\alpha t$. So the relevant probabilities are:

$$
\prob{X(t)=n}=\frac{(\alpha t)^ne^{-\alpha t}}{n!}
$$

with expectation

$$
\E{X(t)}=\alpha t
$$

One example of the relationship can be seen by noting that the probability of no arrivals by time $t$ is given by:

$$
\prob{X(t)=0}=e^{-\alpha t}
$$

Notice that this is also the probability of an exponential random variable (with rate $\alpha$) being greater than $t$, which of course is just another way of describing the same event.

We can also imagine a (continuous time) stochastic process consisting of the collection of random variables $\{X(t), t\geq0\}$. When $X(t)$ has a Poisson distribution, we call the stochastic process a **Poisson process**.

### Notation

Let's now go rapid-fire through some notation we'll be using.

- $N(t)$: The state of (or, number of customers in) the queueing system at time $t>0$.
- $P_n(t)$: The probability of exactly $n$ customers in the queueing system at time $t$.
- $s$: The number of servers (parallel service channels) in the queueing system.
- $\lambda_n$: The mean arrival rate (expected number of arrivals per unit time) of new customers when $n$ customers are in the system.
- $\lambda$: If $\lambda_n$ is constant over all $n$, then we'll just denote the mean arrival rate as $\lambda$. In this case, the mean/expected interarrival time is $\frac{1}{\lambda}$.
- $\mu_n$: The mean service rate for the overall system when in state $n$ (i.e. the expected number of customers completing service per unit time when $n$ customers are in the system). This is a combined rate including all busy servers.
- $\mu$: When the mean service rate _per busy server_ is constant for all $n$, we'll denote this constant by $\mu$. (In this case, $\mu_n=s\mu$ when $n\geq s$, that is, when all s servers are busy.) When $\mu$ exists, the mean/expected service time per server is $\frac{1}{\mu}$.
- $\rho$: In the above conditions where $\lambda$ and $\mu$ are defined, $\rho=\frac{\lambda}{s\mu}$ is known as the **utilization factor** of the for the service facility, i.e., the expected fraction of time the individual servers are busy, because $\rho$ represents the fraction of the system’s service capacity ($s\mu$) that is being utilized on the average by arriving customers ($\lambda$).

### Queues in steady state {#sec:queueSteadyState}

There is also certain notation that is used to describe a queueing system in so-called **steady-state** conditions. Just like we saw with Markov chains in +@sec:markovSteadyState, over time state probabilities for a queueing system approximate a certain steady-state distribution that we'd like to analyze. Steady-state conditions do not exist in the unusual condition that $\rho>1$, i.e. $\lambda > s\mu$ and thus customers arrive to the system faster than they can receive service (and the queue just continues to grow over time). Otherwise, we'll use the following notation to talk about queues in a steady-state condition:

- $P_n$: The probability of having exactly $n$ customers in the queueing system.
- $L$: The expected number of customers in the queueing system. Note that this can be stated as
  $$
  L=\sum_{n=0}^\infty nP_n
  $$
- $L_q$: The expected queue length (the number of customers in the system, but excluding the customers currently being served). This can be written as:
  $$
  L_q=\sum_{n=s}^\infty (n-s)P_n
  $$
- $W$: The expected waiting time for a customer in the system (includes service time).
- $W_q$: The expected waiting time in the queue only (excludes service time).

There are some very intuitive relationships between these steady-state quantities (which we will present here without proof). This first one is known as **Little's law**, and applies in systems where $\lambda$ is defined (i.e. the arrival rate is constant for the entire process)[^littleArrivalRateNotConstant]:

[^littleArrivalRateNotConstant]: If the $\lambda_n$ are not constant, there is a similar version of Little's law where $\lambda$ is replaced by a long-run _average_ arrival rate.

$$
L=\lambda W
$$

and similarly:

$$
L_q=\lambda W_q
$$

If we further assume that the mean service time is a constant $\frac{1}{\mu}$ for all n, then we also have

$$
W=W_q + \frac{1}{\mu}
$$

Notice that if these relationships hold, it is possible to calculate all four of the steady-state quantities $L, L_q, W, W_q$ whenever just _one_ of them is known.

### The birth-and-death process {#sec:birthDeathProcess}

Let's now set up and analyze our first queueing system. The setup here is not in the usual language of queueing theory, but the framework will encompass many different types of queues, and we'll use the results from here to derive results for the queues we do study.

Naturally, this will be a very simple system, albeit with a (in my estimation) rather crude and gruesome name[^strangeName]. The "birth" part of the name just refers to customers entering the queuing system, and the "death" part to customers receiving service and leaving. As usual, the state of the system at time $t$ will be denoted as $N(t)$. There are a few things to know about the **birth-and-death process**

[^strangeName]: Naturally this name wasn't my doing - it is an entrenched part of probability theory at this point. Perhaps you can call it "the queue of life."

- Given $N(t)=n$, the time until the next birth (arrival) is determined by an exponential random variable with parameter $\lambda_n$.
- Given $N(t)=n$, the time until the next death (service completion) is determined by an exponential random variable with parameter $\mu_n$.
- The above two random variables are independent of each other.
- The next transition in the state of the process is either $n \rightarrow n + 1$ (a single birth) or $n \rightarrow n - 1$ (a single death), depending on which random variable is smaller.

The following figure, called the **rate diagram**, provides a visualization of the process:

![Rate diagram for the birth-and-death process [@classText]](images/birth-death-diagram.png)

You'll notice we haven't specifically made mention of any queues or servers. These are not core concepts for the birth-and-death process, but they will be making an appearance soon.

As with most queueing systems, it can be difficult to derive meaningful analyses for the birth-and-death process in transient state (i.e. not steady-state). So we'll focus on results for steady-state birth-and-death processes below, and in particular we want to find the steady-state probability $P_n$ of finding the process in state $n\in\{0,1,\dots\}$.

Consider any state $n\in\{0,1,\dots\}$. Let $E_n(t)$ and $L_n(t)$ track the following quantities:

- $E_n(t)$: The number of times that the process enters state $n$ by time $t$.
- $L_n(t)$: The number of times that the process leaves state $n$ by time $t$.

Since any transition _to_ state $n$ is followed immediately by a transition _out_ of state $n$ (to either $n+1$ or $n-1$), it follows that $E_n(t)$ and $L_n(t)$ will always either be equal or differ by at most one, i.e.

$$
\left|E_n(t)-L_n(t)\right|\leq1
$$

We'd like to talk about the _rates_ (per unit time) at which the process enters or leaves the state. To that end, let's divide both sides by $t$:

$$
\left|\frac{E_n(t)}{t}-\frac{L_n(t)}{t}\right|\leq\frac{1}{t}
$$

Then take a limit on both sides:

$$
\lim_{t\rightarrow\infty}\left|\frac{E_n(t)}{t}-\frac{L_n(t)}{t}\right|=0
$$

What we have here is then a statement about the _average rate_ at which the process enters or exits a given state. The main result is that these quantities must be equal, i.e. the mean rate of entering a state must equal the mean rate of leaving a state (in the long run).

Let's think about what this means for, say, the state $n=0$. The long-run rate at which the process leaves state 0 must clearly be related to $\lambda_0$ (the rate at which births occur while in state 0) since a birth in state 0 is the only way to leave state 0. But $\lambda_0$ is the average rate at which state 0 is left _if the process is currently in state 0_, and since the process if often (usually?) in a different state, $\lambda_0$ can't be the overall rate at which state 0 is left.

So to find the quantity we want, we need to know $P_n$, the (steady-state) proportion of time that the process is actually _in_ state 0. During those times, the rate of exiting is $\lambda_0$, but during all other times the rate is 0. So the overall rate of exit state 0 is $\lambda_0P_0 + (1-\lambda_0)0=\lambda_0P_0$.

Similarly, the overall rate of entering state 0 (which may only occur via a death in state 1) is $\mu_1P_1$. So our above observation (about the overall rates of entering and leaving being equal) would imply the following **balance equation** for state 0:

$$
\mu_1P_1=\lambda_0P_0
$$

{#eq:balanceState0}

For all other states ($n\in\{1,2,\dots\}$) there are _two_ ways to enter or exit a state, to/from states $n-1$ and $n+1$. So the balance equations for these states are

$$
\lambda_{n-1}P_{n-1}+\mu_{n+1}P_{n+1}=(\lambda_n+\mu_n)P_n
$$

Let's go ahead and write out the first few balance equations:

$$
\begin{align*}
\mu_1P_1&=\lambda_0P_0 \\
\lambda_{0}P_{0}+\mu_{2}P_{2}&=(\lambda_1+\mu_1)P_1 \\
\lambda_{1}P_{1}+\mu_{3}P_{3}&=(\lambda_2+\mu_2)P_2 \\
\lambda_{2}P_{2}+\mu_{4}P_{4}&=(\lambda_3+\mu_3)P_3 \\
&\ \ \vdots
\end{align*}
$$

How can we solve for the $P_n$ values? Let's start with the first equation, with $P_0$ and $P_1$ terms. We can take this and write $P_1$ in terms of $P_0$:

$$
P_1 = \frac{\lambda_0}{\mu_1}P_0
$$

The second equation has terms for $P_0, P_1$, and $P_2$. So we can write $P_2$ in terms of $P_1$ and $P_0$ like this:

$$
\begin{align*}
P_{2}&=\frac{(\lambda_1+\mu_1)P_1 - \lambda_0P_0}{\mu_2} \\
&=\frac{\lambda_1P_1+\mu_1P_1-\lambda_0P_0}{\mu_2}
\end{align*}
$$

Further, by the first balance equation +@eq:balanceState0 we know that $\mu_1P_1-\lambda_0P_0=0$. So the above reduces to

$$
P_2=\frac{\lambda_1}{\mu_2}P_1
$$

Lastly, since we know what $P_1$ is in terms of $P_0$, we can sub that in here and write:

$$
P_2=\frac{\lambda_1\lambda_0}{\mu_2\mu_1}P_0
$$

This result will generalize. For example, the next balance equation is written in terms of $P_3, P_2$ and $P_1$. We could clearly rearrange it to see what $P_3$ equals in terms of $P_2$ and $P_1$. From there, we can use the above two results to replace $P_1$ by $\frac{\lambda_0}{\mu_1}P_0$ and $P_2$ by $\frac{\lambda_1\lambda_0}{\mu_2\mu_1}P_0$, so that we have $P_3$ written entirely in terms of $P_0$. Going through this process would yield.

$$
P_3=\frac{\lambda_2\lambda_1\lambda_0}{\mu_3\mu_2\mu_1}P_0
$$

As it turns out, we can repeat this process no matter which $n$ we choose, so we have[^piProductNotation]:

[^piProductNotation]:
    You've likely seen this before, but just in case you haven't, this $\prod$ notation is to products what the $\sum$ notation is to sums. So, e.g.

    $$
    \prod_{i=0}^n x_n = x_0\cdot x_1\cdot...\cdot x_n
    $$

$$
P_n=P_0\prod_{k=1}^n\frac{\lambda_{k-1}}{\mu_{k}}
$$

{#eq:pnFromP0}

What good does that do us? Well, since $P$ is a probability distribution we must have $\sum_{n=0}^1P_n=1$. So we've reduced the entire set of balance equations to the single (infinite) sum:

$$
P_0\sum_{n=1}^\infty\prod_{k=1}^n\frac{\lambda_{k-1}}{\mu_{k}}=1
$$

{#eq:birthDeathSteadyStateProb}

It might not look like it yet, but this is actually quite the improvement! Depending on the assumptions made on the $\mu_n$ and $\lambda_n$ values, this summation may well have an analytical solution, allowing us to recover the $P_n$ probabilities. We will see some examples of this soon.

Once the steady-state probabilities are determined, we will then be able to calculate the other important steady-state quantities from +@sec:queueSteadyState, namely $L,L_q,W$, and $W_q$. As we've already seen, the number of customers in the system and in the queue are calculated as:

$$
L=\sum_{n=0}^\infty nP_n \qquad L_q=\sum_{n=s}^\infty (n-s) P_n
$$

{#eq:birthDeathL}

Once we have these values, the average waiting times are calculated as

$$
W=\frac{L}{\bar\lambda} \qquad W_q=\frac{L_q}{\bar\lambda}
$$

{#eq:birthDeathW}

where $\bar\lambda$ is the _average_ arrival rate, calculated as

$$
\bar\lambda=\sum_{n=0}^\infty \lambda_nP_n
$$

Once again, even though some of these calculations involve infinite sums, in many situations we will be able to derive the exact values using infinite series results from calculus.

A technical note before we move on: the above result is for the steady-state probabilities of the birth-and-death process. But we should note that not every birth-and-death process is guaranteed to ever reach a steady state. Luckily, we do know some conditions where a steady state is guaranteed to exist. Firstly, if $\lambda_n=0$ for some value of $n$ higher than the initial state (so that there are only a finite number of possible states) then the steady-state results are valid. Another condition (which we will make use of shortly) is when $\lambda$ and $\mu$ exist (i.e. the arrival and service rates are constant) and $\rho=\lambda/s\mu<1$ (so that arrivals do not come faster than services complete).

### $M/M/s\ $ queues

Finally, we're able to talk about our first general class of queueing models! The $M/M/s$ name comes from a queueing theory convention where the models are named according to the scheme $x/y/z$, where $x$ is the interarrival time distribution, $y$ is the service time distribution, and $z$ is the number of servers. The $M$ in the name stands for "Markovian", signifying that the distribution has the Markovian, memorylessness property - that is, that the interarrival and service time distributions are exponential. The number of servers in the system is denoted by some integer $s\geq1$.

Since the interarrival and service times are exponential random variables, the $M/M/s$ queue is a special case of the birth-and-death process, where the process' arrival rate $\lambda$ and service rate per server $\mu$ are constants. In particular, the birth rates are all the same, $\lambda_n=\lambda$ for all $n\in\{1,2,\dots,n\}$.

The values for $\mu$ are not quite as simple, though. If $s=1$ then the situation is as above for $\lambda$, that $\mu_n=\mu$ for all $n$. But this is not the case for $s>1$, since $\mu_n$ is the rate of deaths for the _entire systems_ whereas $\mu$ is the service rate _at each server_. But we actually already know how to handle that, thanks to something we learned in +@sec:exponentialPoissonDistributions. In particular, for the $M/M/s$ queue the death rates are

$$
\mu_n=\begin{cases}
n\mu && n\leq s \\
s\mu && n>s
\end{cases}
$$

Why? This is due to what we saw in +@eq:minExponentials, that the minimum of $n$ exponential random variables is itself an exponential random variable, with rate $\alpha=\alpha_1+\alpha_2+\dots+\alpha_n$. In this case, a death occurs in the process whenever the first service is completed, so the result fits.

As mentioned earlier, so long as $s\mu>\lambda$ the steady-state results we derived in +@sec:birthDeathProcess will hold. As we will show, those earlier infinite sums become tractable in the case of $M/M/s$ queues. Let's go ahead and see how the results shake out, starting with $M/M/1$ queues then transitioning to $s>1$.

<h4>Results for the $M/M/1$ queue</h4>

For the single-server case, we have constant rates $\lambda_n=\lambda$, $\mu_n=\mu$ for all $n$. To solve for the steady-state probabilities, we go back to the equation for $P_0$ derived in +@eq:birthDeathSteadyStateProb. In this case, it simplifies to

$$
P_0\sum_{n=0}^\infty\left(\frac{\lambda}{\mu}\right)^n=P_0\sum_{n=0}^\infty\rho^n=1
$$

We've assumed that $\lambda<s\mu$, so $\rho=\frac{\lambda}{\mu}<1$ and hence the above reduces to (due to the standard result on the sum of [geometric series](https://en.wikipedia.org/wiki/Geometric_series)):

$$
P_0\left(\frac{1}{1-\rho}\right)=1
$$

So we have $P_0=1-\rho$, and by +@eq:pnFromP0 we also get

$$
P_n=(1-\rho)\rho^n
$$

Using a few other tricks, one can derive from +@eq:birthDeathL that

$$
L=\frac{\lambda}{\mu - \lambda}\qquad L_q=\frac{\lambda^2}{\mu(\mu-\lambda)}
$$

And from there, using +@eq:birthDeathW we have

$$
W=\frac{1}{\mu-\lambda}\qquad W_q=\frac{\lambda}{\mu(\mu-\lambda)}
$$

We can go a little further than this actually. Say we'd like to know the _distribution_ of the wait times, so we can answer questions about the probability of having to wait for a certain amount of time. @classText talks a little bit about the derivation, but the result is that if the random variable $V$ represents the wait time for a customer arriving while the queue is in steady state, then

$$
\prob{V\leq t} = 1 - e^{-(\mu - \lambda)t}
$$

In other words, the steady-state waiting times are _also_ governed by an exponential random variable!

We can also derive similar results for waiting times in the queue. If we let $V_q$ represent the time in the queue for a customer arriving in steady state, then we get

$$
\prob{V_q\leq t} = 1 - \rho e^{-(\mu - \lambda)t}
$$

<h4>Results for the $M/M/s$ queue</h4>

Things become a little messier now when $s>1$, and so the death rates $\mu_n$ for the associate birth-death process are no longer constants. After plugging the relevant values into +@eq:birthDeathSteadyStateProb, one can recover

$$
P_0=\left[\sum_{n=0}^{s-1}\frac{(\lambda/\mu)^n}{n!}+\frac{(\lambda/\mu)^s}{s!}\frac{1}{1-\lambda/(s\mu)}\right]^{-1}
$$

Furthermore, one can derive:

$$
P_n=\begin{cases}
\frac{(\lambda/ \mu)^n}{n!}P_0 && 0\leq n \leq s \\
\frac{(\lambda/ \mu)^n}{s!s^{n-s}}P_0 && n > s
\end{cases}
$$

Then the queue lengths and waiting times will become:

$$
\begin{align*}
L_q &= \frac{P_0(\lambda/\mu)^s\rho}{s!(1 - \rho)^2} &\qquad W_q&=\frac{L_q}{\lambda} \\
L&=L_q + \frac{\lambda}{\mu} &\qquad W&=W_q + \frac{1}{\mu}
\end{align*}
$$

With some effort, we can also recover the distributions of the waiting times $V$, $V_q$ (in the entire system and in the queue) for customers arriving to the queue in steady state:

$$
\begin{align*}
P(V\leq t)&=1-e^{-\mu t}\left(
1 + \frac{P_0(\lambda/\mu)^s}{s!(1-\rho)}\frac{1 - e^{\mu t(s-1-\lambda/\mu)}}{s-1-\lambda/\mu}
\right)\\
P(V_q\leq t)&=1-\left(1-\sum_{n=0}^{s-1}P_n\right)e^{-s\mu(1-\rho)t}
\end{align*}
$$

<h4>Example</h4>

Let's consider again the County Hospital example from +@sec:queueExample. The management engineer has concluded that arrivals to the hospital roughly follow a Poisson process with a rate of $\lambda=2$ arrivals per hour. She has also concluded that the time a doctor takes with a patient is modeled well by an exponential random variable with rate $\mu=3$.

Furthermore, even though the patient arrival rate is not constant throughout the day and so the process is unlikely to ever truly reach steady state, she figures that the steady-state results will approximate real events well enough for the purposes of this analysis. Given this, how would you suggest determining whether the second doctor will have enough of an effect on the process to justify the extra cost? Let's jump to the following notebook to do some calculations.

{colabGist:1kvBWyqp3khegQ5RFUiJfuiWEVd2SqDl8,dc612ddb61811544716937a7af357f17}