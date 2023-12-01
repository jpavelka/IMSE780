## Markov decision processes {#sec:markovDecisionProcesses}

<div class='lectureVideoEmbed' video-id='bf1977aad12240749ad6a736e4065b501d' video-date='2023-11-27'>Intro to MDPs, plus some important upcoming dates.</div>

Up to this point in our exploration of stochastic processes, we've only been _describing_ the evolution of random processes and probabilities around certain outcomes. We've had no agency, letting random dynamics control all of the outcomes. In this chapter, we'll find ourselves trying to make decisions in order to influence a random process to attain desirable outcomes. In particular, we will assume that we're interacting with a system whose dynamics are explained by a Markov chain. However, at any given state, we are allowed to choose between a given set of actions to take. Whatever action we choose will bring us some kind of cost or reward, while also affecting the transition probabilities that determine the next state. Our goal will be to choose a policy (set of actions to take in each state) that will net us the lowest long-term costs (or highest long-term rewards). Such a process is called a **Markov decision process** (**MDP**).

### Example {#sec:mdpExample}

Let's start off with an example scenario through which we can describe the important components of MDPs. As usual, this example comes from @classText.

> A manufacturer has one key machine at the core of one of its production processes. Because of heavy use, the machine deteriorates rapidly in both quality and output. Therefore, at the end of each week, a thorough inspection is done that results in classifying the condition of the machine into one of four possible states:
>
> - State 0: Good as new
> - State 1: Operable - minor deterioration
> - State 2: Operable - major deterioration
> - State 3: Inoperable - output of unacceptable quality
>
> After historical data on these inspection results are gathered, statistical analysis is done on how the state of the machine evolves from week to week. The following matrix shows the relative frequency (probability) of each possible transition from the state in one week (a row of the matrix) to the state in the following week (a column of the matrix).
>
> $$
> \begin{bmatrix}
> 0 & \frac{7}{8} & \frac{1}{16} & \frac{1}{16} \\
> 0 & \frac{3}{4} & \frac{1}{8} & \frac{1}{8} \\
> 0 & 0 & \frac{1}{2} & \frac{1}{2} \\
> 0 & 0 & 0 & 1 \\
> \end{bmatrix}
> $$
>
> In addition, statistical analysis has found that these transition probabilities are unaffected by also considering what the states were in prior weeks. This “lack-of-memory property” is the Markovian property that characterizes Markov chains. Therefore, letting the random variable $X_t$ be the state of the machine at the end of week $t$, the conclusion is that the stochastic process $\{X_t, t =  0, 1, 2, . . .\}$ is a discrete-time Markov chain whose (one-step) transition matrix is just the above matrix.

Right, so we have a Markov chain like what we studied in +@sec:markovChains. But look at that transition matrix. Even if the process starts in state 0, before too many transitions the machine will end up inoperable and stuck in state 3. But this is a very important bit of machinery. Surely the manufacturer would not just sit by idly with a broken machine and the subsequent loss of revenue.

So let's assume that the company will replace the product after it becomes inoperable. The replacement takes 1 week to complete and costs \$4,000. Furthermore,the cost of lost production during the 1-week downtime is \$2,000, so the total cost incurred whenever the current machine enters state 3 is \$6,000.

Let's also assume that there is cost associated with using the degraded machine in states 1 and 2 (say, due to defective items). These costs will be \$1,000 in state 1 and \$3,000 in state 2. To avoid those costs, the company is able to _overhaul_ the machine once it enters state 2, with the effect of reversing most of the deterioration so that the machine returns to state 1.

A natural question is, what maintenance policy should the company follow for their machine? There are several options they can choose from depending on the state the system is currently in. The costs and effects of these policies are summarized below (note that we've also added options to replace the machine in states 1 or 2):

![Summary of decisions and costs for MDP example [@classText]](images/mdp-example-actions.png)

### MDP basics

Before trying to determine the best maintenance policy, let's pause for a moment to learn the relevant notation and definitions for MDPs. The basic process is as follows:

- The **state** $i$ of a discrete-time Markov chain is observed after each transition, where (as in @sec:markovChains) the possible states are $i = 0, 1, . . . , M$.
- After each observation, a **decision** (or **action**) $k$ is chosen from a set of $K$ available options, $\{1,2,...,K\}$. Some of the $K$ decisions may not be relevant for every state.
- If decision $d_i=k$ is made in state $i$, an immediate **cost** is incurred that has an expected value $C_{ik}$.
- The decision $d_i=k$ in state $i$ determines what the **transition probabilities** will be for the next transition from state $i$. Denote these transition probabilities by $p_{ij}(k)$, for $j\in\{0,1, . . . , M\}$. For this class, we will assume that the resultant transition matrices always describe an irreducible Markov chain.
- A specification of the decisions for each state $(d_0, d_1, . . . , d_M)$ is called a **policy** for the MDP.
- The objective is to find an optimal policy according to some cost criterion which considers both immediate _and_ future costs. The objective we focus on here is the (long-run) expected average cost per time step (though we will see an alternative criterion later).

Hopefully you can see how this relates to the example scenario we presented above. Depending on the state of the system, the company can choose a decision/action to take (either do nothing, overhaul, or replace). Each decision has an effect on the subsequent transition (e.g. a decision to overhaul automatically moves the process to state 1 in the next transition). Each state transition induces some combination of costs (replacement, lost production, or defects).

### Evaluating policies

How can we evaluate a policy? As an example, let's say that the company's policy is to stick with a degraded machine in states 1 and 2, but replace the machine any time it becomes inoperable (i.e. a transition to state 3). Thus the policy we are evaluating is $(1, 1, 1, 3)$. With this policy, the transition matrix becomes

$$
\begin{bmatrix}
0 & \frac{7}{8} & \frac{1}{16} & \frac{1}{16} \\
0 & \frac{3}{4} & \frac{1}{8} & \frac{1}{8} \\
0 & 0 & \frac{1}{2} & \frac{1}{2} \\
1 & 0 & 0 & 0 \\
\end{bmatrix}
$$

Notice the change from the transition matrix in the example definition, since we're now immediately replacing the machine whenever the process enters state 3.

How do we evaluate this policy? As stated, our objective is to minimize the long-run expected average cost per time step. And we already learned how to calculate that in +@sec:markovLongRunAverageCost: First we find the steady-state probabilities $\boldsymbol\pi$ by solving for

$$
\begin{align*}
\boldsymbol\pi\mathbf{P}&=\boldsymbol\pi \\
\sum_{i=0}^M\pi_i&=1
\end{align*}
$$

(where $\mathbf{P}$ is the transition matrix). In this case, that comes to

$$
\boldsymbol\pi = \begin{bmatrix}
\frac{2}{13} & \frac{7}{13} & \frac{2}{13} & \frac{2}{13}
\end{bmatrix}
$$

Then we just need to multiply $\boldsymbol\pi$ by the vector of costs for entering each state, which we know from above is (in thousands of dollars).

$$
\begin{bmatrix}0 & 1 & 3 & 6\end{bmatrix}
$$

So the long-run average cost of this policy is

$$
0\frac{2}{13} + 1\frac{7}{13} + 3\frac{2}{13} + 6\frac{2}{13} = \frac{25}{13}
$$

### Enumerating policies

The policy we examined above is considered a **stationary** policy, since it doesn't change regardless of the current time step $t$. Furthermore, it is considered **deterministic** since the decision in each state is set. One could imagine a policy where, say, in state 2 we flip a coin to decide between replacing the machine or doing nothing. We will consider such policies, called **randomized** policies, later.

But for now, let's discuss how we might find the best possible stationary, deterministic policy for our example problem. Since the number of options is so small, we should be able to just list off all the possible policies and evaluate them one-by-one. To be clear, this is not generally a _good_ way to optimize an MDP, as it is only tractable when there are a small number of states and possible actions. That caveat aside, let's jump to the following notebook to see how we might solve the example MDP by enumeration.

{colabGist:1mDMv9JZAb7L5vOVHFirMlMdhjgv7bfvd,0cdb94e0c2f8ae58b8f08994eef5f0e4}

### Randomized policies

<div class='lectureVideoEmbed' video-id='410db3addbb440b4a4752921e7e90dc91d' video-date='2023-11-29'>Solving MDPs via linear programming</div>

The last section gave us a simple way to find the best stationary, deterministic policy for an MDP. But it is of limited usefulness, because most practical MDPs will have far too many policies for enumeration to be practical. For our next solution method, we'll need to extend our notion of a policy. In particular, we'll let our decision at any given state be **randomized**, i.e. the output of some random variable. So instead of making decision $d_i\in\{1,2,...,K\}$ for each state $i$, we'll instead define probabilities $D_{ik}$ for each state $i\in\{0,1,...,M\}$ and $k\in\{1,2,...,K\}$ such that

$$
D_{ik}=\prob{\text{decision}=k|\text{state}=i}
$$

Naturally, we can write this as a (not necessarily square) matrix

$$
D=\begin{bmatrix}
D_{01} & D_{02} & \cdots & D_{0K} \\
D_{11} & D_{12} & \cdots & D_{1K} \\
\vdots & \vdots & \ddots & \vdots \\
D_{M1} & D_{M2} & \cdots & D_{MK}
\end{bmatrix}
$$

and since these are probabilities, we'll need the values across each row to sum to 1, i.e.

$$
\begin{align*}
\sum_{k=1}^KD_{ik} = 1 && \forall\ i\in\{0, 1, \dots, M\}
\end{align*}
$$

Of course, the deterministic policies we've already seen can fit into this framework as well. Simply put a value of 0 in every entry of the matrix, except for if $d_i=k$ then set $D_{ik}=1$. For example, the deterministic policy $(1, 1, 2, 3)$ can be written as

$$
D=\begin{bmatrix}
1 & 0 & 0 \\
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

In contrast, a randomized policy given by

$$
D=\begin{bmatrix}
1 & 0 & 0 \\
\frac{1}{2} & 0 & \frac{1}{2} \\
\frac{1}{4} & \frac{1}{4} & \frac{1}{2} \\
0 & 0 & 1
\end{bmatrix}
$$

will have you (randomly) splitting decisions in state 1 between doing nothing half the time and replacing half the time. Meanwhile, after finding yourself in state 2, you would do nothing a quarter the time, overhaul a quarter of the time, and replace half of the time.

### Linear programming {#sec:mdpLp}

The introduction of randomized policies opens us up to a new solution method via linear programming. Our decision variables will relate to the $D_{ik}$ quantities and are allowed to take on continuous values, making linear programming a possibility.

But the decision variables won't _exactly_ be the $D_{ik}$ values, which you'll recall were conditional probabilities

$$
D_{ik}=\prob{\text{decision}=k|\text{state}=i}
$$

Instead, our variables $y_{ik}$ will be _unconditional_, _joint_ probabilities of the form

$$
y_{ik}=\prob{\text{decision}=k,\text{state}=i}
$$

That is, the steady-state proportion of time that the process is in state $i$ _and_ decision $k$ is made. Of course, these values are linked to the $D_{ik}$ values via the definition of conditional probability, since

<div class="mathSmall">
$$
\begin{align*}
\prob{\text{decision}=k,\text{state}=i} &= \prob{\text{state}=i}\prob{\text{decision}=k|\text{state}=i} \\
&\Updownarrow \\
y_{ik}&=\pi_iD_{ik}
\end{align*}
$$
</div>

where $\pi_i$ is (as usual) the steady-state probability of being in state $i$. Note also that given a valid setting for the $y_{ik}$ variables, we can immediately recover the $D_{ik}$ values since

$$
\begin{align*}
\pi_i&=\prob{\text{state}=i} \\
&=\sum_{k=1}^K\prob{\text{decision}=k,\text{state}=i} \\
&=\sum_{k=1}^Ky_{ik}
\end{align*}
$$

So each $D_{ik}$ will be calculated as

$$
D_{ik} = \frac{y_{ik}}{\pi_i}
$$

Given $y_{ik}$ as our variables, what should the objective value be? We want to minimize the long-run average cost per unit time, which in terms of the variables would be written as:

$$
\sum_{i=0}^M\sum_{k=1}^KC_{ik}y_{ik}
$$

To make sure that the $y_{ik}$ values imply a proper probability distribution, we need each $y_{ik}\geq0$ and

$$
\sum_{i=0}^M\sum_{k=1}^Ky_{ik}=1
$$

We've yet to use any of the transition probability information though. For this, let's define the value $p_{ij}(k)$ as the probability of transitioning from state $i$ to state $j$ when decision $k$ is made, i.e.

$$
p_{ij}(k)=\prob{\text{next state}=j|\text{current state}=i,\text{decision}=k}
$$

In analogy to the regular steady-state condition $\pi_j=\sum_{i=0}^M\pi_ip_{ij}$, we have

$$
\sum_{k=1}^Ky_{jk}=\sum_{i=0}^M\sum_{k=1}^Ky_{ik}p_{ij}(k)
$$

Thus the LP formulation for determining the best randomized policy for an MDP is:

$$
\begin{align*}
\min && \sum_{i=0}^M\sum_{k=1}^KC_{ik}y_{ik} \\
\st  && \sum_{i=0}^M\sum_{k=1}^Ky_{ik}&=1 \\
     && \sum_{k=1}^Ky_{jk} - \sum_{i=0}^M\sum_{k=1}^Ky_{ik}p_{ij}(k)&=0 & \forall\ j \in \{0,1,\dots,M\} \\
     && \y&\geq\zeros
\end{align*}
$$

<h4>Solving the example MDP with linear programming</h4>

Let's go ahead and set up this LP for our example MDP. We need one $y_{ik}$ variable for each allowable state/decision pair, meaning that the decision variables in this case are:

$$
y_{01},\quad y_{11},\quad y_{13},\quad y_{21},\quad y_{22},\quad y_{23},\quad y_{33}
$$

The associated costs $C_{ik}$ come from the table at the end of +@sec:mdpExample. The $p_{ij}(k)$ values come from the problem's initial transition matrix, plus the logic of the other decisions (an overhaul takes you to state 1 with probability 1, and a replacement takes you to state 0 with probability 1). So the formulation becomes:

$$
\begin{align*}
\min && y_{11} + 6y_{13} + 3y_{21} + 4y_{22} + 6y_{23} + 6y_{33} \\
\st  && y_{01} + y_{11} + y_{13} + y_{21} + y_{22} + y_{23} + y_{33} &= 1 \\
     && y_{01} - \left( y_{13} + y_{23} + y_{33} \right) &= 0 \\
     && y_{11} + y_{13} - \left( \frac{7}{8}y_{01} + \frac{3}{4}y_{11} + y_{22} \right) &= 0 \\
     && y_{21} + y_{22} + y_{23} - \left(\frac{1}{16}y_{01} + \frac{1}{8}y_{11} + \frac{1}{2}y_{21} \right) &= 0 \\
     && y_{33} - \left( \frac{1}{16}y_{01} + \frac{1}{8}y_{11} + \frac{1}{2}y_{21}\right) &=0 \\
     && y_{01}, y_{11}, y_{13}, y_{21}, y_{22}, y_{23}, y_{33} &\geq 0
\end{align*}
$$

Let's take this formulation and solve it in the following Colab notebook.

{colabGist:1KhUxTsZRDs5p0hYWNhI_bHr82xF5o_Dd,fb2c8258644bbd271faaeacefa9daa03}

<h4>Analyzing the solution</h4>

After solving the problem in the above notebook, we find that the $D_{ik}$ values (given in matrix form) are:

$$
D=\begin{bmatrix}
1 & 0 & 0 \\
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

So it seems that the best randomized policy is actually a deterministic policy as well! It turns out that this is not a coincidence. Let's examine the formulation we created. It contains $M+2$ constraints, but actually (for the same reason as we saw when calculating steady-state probabilities in +@sec:markovSteadyState) one of these constraints will be redundant. So in effect the model has only $M+1$ rows. This means that when the problem is solved via the simplex method, there can be only $M+1$ variables with non-zero values. Furthermore, it can be shown[^assumedIrreducible] that for any $i$, $y_{ik}>0$ must hold for some $k$.

The end result is that for each state $i$, exactly one decision $k$ will have $y_{ik}>0$. Thus $\pi_i=y_{ik}$ for that $k$, meaning that $D_{ik}=y_{ik}/\pi_i=1$ for that $k$ and 0 for all other decisions. In other words, any policy obtained via the simplex method will be a deterministic one. This means that allowing randomized policies cannot improve the long-run cost per unit time, which is an interesting result.

[^assumedIrreducible]: We won't work through it, but it will follow from the fact that we assumed the induced probability matrices were all irreducible.

Before we wrap up the section, it should be noted that this LP method (while better than full enumeration) is not generally the most efficient way to solve large MDPs. We'll see a better method while talking about reinforcement learning.

### Another example

<div class='lectureVideoEmbed' video-id='05cfd15aecef419284d881a6c19282e81d' video-date='2023-12-01'>One more MDP example</div>

In the following notebook, we work through another example MDP (taken from @classText).

{colabGist:13kjqGVOOJcPfWOgQHDiqQMGNElBxnM2t,dafbdbce4fa3b3421c15e0816d92c968}