## Markov decision processes

Up to the point in our exploration of stochastic processes, we've only been describing the evolution of random processes and probabilities around certain outcomes. But we've had no agency, letting random dynamics control all of the outcomes. In this chapter, we'll find ourselves trying to make decisions in order to influence a random process to attain desirable outcomes. In particular, we will assume that we're interacting with a system whose dynamics are explained by a Markov chain. However, at any given state, we are allowed to choose between a given set of actions to take. Whatever action we choose will bring us some kind of cost or reward, while also affecting the transition probabilities that determine the next state. Our goal will be to choose a policy (set of actions to take in each state) that will net us the highest long-term rewards. Such a process is called a __Markov decision process__ (__MDP__).

### Example

Let's start off with an example scenario through which we can describe the important components of MDPs. As usual, this example comes from @classText.

