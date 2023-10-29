## Markov Chains

[web chapter](https://highered.mheducation.com/sites/dl/free/1259872998/1126268/Hillier_IOR_11e_Ch028_WebChapter.pdf)

With those preliminaries out of the way, we're ready to talk about Markov chains, our first stochastic process. This is a particularly important class as stochastic process, and in this class both of the future topics of queueing theory and Markov decision processes will build upon what we learn here.

But before we get there, maybe it would be a good idea to formally define what we mean by a stochastic process. As we said earlier, the word "stochastic" essentially means random. A stochastic process is a model for processes that evolve over tie in a probabilistic manner. More formally, a __stochastic process__ is an indexed collection of random variables $\{X_T\}$, where the index $t$ runs through some set $T$. Very often $T$ is the set of non-negative integers, so that the collection of random variables we are interested are $\{X_1,X_2,...\}$ and $X_t$ represents the state of some system after $t$ time steps. For example, we might be tracking the inventory of a particular product at some store, with $X_1$ being the inventory level at the beginning of the first week, $X_2$ the inventory level at the beginning of the second week, and so on. When $T$ is a discrete set, we call the process a __discrete-time stochastic process__. This type of process will be our focus in this class.

Analyzing stochastic processes can get fairly complicated without some simplifying assumptions. In the case of Markov chains, the key assumption is the so-called Markovian property. A discrete-time stochastic process $\{X_t\}$ is said to have the __Markovian property__ if

$$
\prob{X_{t+1}=j}
$$