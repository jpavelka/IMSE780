## Markov decision processes

Up to this point in our exploration of stochastic processes, we've only been describing the evolution of random processes and probabilities around certain outcomes. But we've had no agency, letting random dynamics control all of the outcomes. In this chapter, we'll find ourselves trying to make decisions in order to influence a random process to attain desirable outcomes. In particular, we will assume that we're interacting with a system whose dynamics are explained by a Markov chain. However, at any given state, we are allowed to choose between a given set of actions to take. Whatever action we choose will bring us some kind of cost or reward, while also affecting the transition probabilities that determine the next state. Our goal will be to choose a policy (set of actions to take in each state) that will net us the highest long-term rewards. Such a process is called a __Markov decision process__ (__MDP__).

### Example

Let's start off with an example scenario through which we can describe the important components of MDPs. As usual, this example comes from @classText.

> A manufacturer has one key machine at the core of one of its production processes. Because of heavy use, the machine deteriorates rapidly in both quality and output. Therefore, at the end of each week, a thorough inspection is done that results in classifying the condition of the machine into one of four possible states:
>
> - State 0: Good as new
> - State 1: Operable - minor deterioration
> - State 2: Operable - major deterioration
> - State 3: Inoperable - output of unacceptable quality
>
>After historical data on these inspection results are gathered, statistical analysis is done on how the state of the machine evolves from week to week. The following matrix shows the relative frequency (probability) of each possible transition from the state in one week (a row of the matrix) to the state in the following week (a column of the matrix).
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

![Summary of actions and costs for MDP example [@classText]](images/mdp-example-actions.png)

### MDP basics

Before trying to determine the best maintenance policy, let's pause for a moment to learn the relevant notation and definitions for MDPs. The basic process is as follows:

- The __state__ $i$ of a discrete time Markov chain is observed after each transition, where (as in @sec:markovChains) the possible states are $i = 0, 1, . . . , M$.
- After each observation, a __decision__ (or __action__) $k$ is chosen from a set of $\{1,2,...,K\}$. Some of the $K$ decisions may not be relevant for every state.
- If decision $d_i=k$ is made in state $i$, an immediate __cost__ is incurred that has an expected value $C_{ik}$.
- The decision $d_i=k$ in state $i$ determines what the __transition probabilities__ will be for the next transition from state $i$. Denote these transition probabilities by $p_{ij}(k)$, for $j\in\{0,1, . . . , M\
$. For this class, we will assume that the resultant transition matrix describes an irreducible Markov chain.
- A specification of the decisions for each state $(d_0, d_1, . . . , d_M)$ is called a __policy__ for the MDP.
- The objective is to find an optimal policy according to some cost criterion which considers both immediate _and_ future costs.  The objective we focus on here is the (long-run) expected average cost per time step (though we will see an alternative criterion later).

Hopefully you can see how this relates to the example scenario we presented above. Depending on the state of the system, the company can choose a decision/action to take (either do nothing, overhaul, or replace). Each decision has an effect on the subsequent transition (e.g. a decision to overhaul automatically moves the process to state 1 in the next transition). Each state transition induces some combination of costs (replacement, lost production, or defects).

### Evaluating policies

How can we evaluate a policy? As an example, let's say that the company's policy is to stick with a degraded machine in states 1 and 2, but replace the machine any time it becomes inoperable (i.e. a transition to state 3). Thus the policy we are evaluating is $(1, 1, 1, 3)$. And with this policy, the transition matrix becomes

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
\boldsymbol\pi\mathbf{P}=\boldsymbol\pi
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

The policy we examined above is considered a __stationary__ policy, since it doesn't change regardless of the current time step $t$. Furthermore, it is considered __deterministic__ since the decision in each state is set. One could imagine a policy where, say, in state 2 we flip a coin to decide between replacing the machine or doing nothing. We will consider such policies, called __randomized__ policies, later.

But for now, let's discuss how we might find the best possible stationary, deterministic policy for our example problem. Since the number of options is so small, we should be able to just list off all the 

Not a _good_ way to do it, but in this case we can explicitly enumerate the possibilities.

### Randomized policies

### Linear programming




