## Queueing theory

The next area of stochastic processes we will study is **queueing theory**, which you could call the study of waiting in lines. The models we see here could be seen as a special class of (continuous-time) Markov chains, but the theory is well-developed outside of that formalism, so we won't be referring back to our Markov chain chapter here.

Perhaps studying people standing in lines sounds like it would not be of much use - but actually, this is pretty practical! It is of course applicable to customer services of all types, and several Edelman prizes have been won by queueing applications (see for example [here](https://pubsonline.informs.org/doi/10.1287/inte.6.1pt2.4) and [here](https://pubsonline.informs.org/doi/10.1287/inte.24.1.6)). @classText highlights several other examples in section 17.3

### Initial example

Let's now describe our prototype queueing problem, as described by @classText:

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
- $\mu_n$: The mean service rate for the overall system (i.e. the expected number of customers completing service per unit time when $n$ customers are in system). This is a combined rate including all busy servers.
- $\mu$: When the mean service rate _per busy server_ is constant for all $n$, we'll denote this constant by $\mu$. (In this case, $\mu_n=s\mu$ when $n\geq s$, that is, when all s servers are busy.) When $\mu$ exists, the mean/expected service time per server is $\frac{1}{\mu}$.
- $\rho$: In the above conditions where $\lambda$ and $\mu$ are defined, $\rho=\frac{\lambda}{s\mu}$ is known as the **utilization factor** of the for the service facility, i.e., the expected fraction of time the individual servers are busy, because $\rho$ represents the fraction of the system’s service capacity ($s\mu$) that is being utilized on the average by arriving customers ($\lambda$).

### Queues in steady state

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

<!-- ### The birth-and-death process -->

<!-- ### $M/M/s\ $ queues -->
