<script lang="ts">
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Code from "$lib/Code.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";

    import weatherTransition from "$lib/images/weather-transition-diagram.png";
    import gamblingTransition from "$lib/images/gambling-transition-diagram.png";
</script>

<Heading level=2 refId=markovChains>Markov chains</Heading>

<BodyText>
    With those preliminaries out of the way, we're ready to talk about Markov chains, our first stochastic process. This is a particularly important class of stochastic process, one of the best known and most important, which even had a hand in Google taking over the world<Footnote>Google's <a href='https://en.wikipedia.org/wiki/PageRank'>PageRank</a> algorithm, among the first algorithms they used for ranking pages in search results, is based on Markov chain theory.</Footnote>. In this class both of the future topics of queueing theory and Markov decision processes will build upon what we learn here. Note that the content of this section comes largely from a web supplement to<CitationRef refId=classText/> and can be found <a href='https://highered.mheducation.com/sites/dl/free/1259872998/1126268/Hillier_IOR_11e_Ch028_WebChapter.pdf'>here</a>.
</BodyText>

<BodyText>
    First up: it's probably high time to actually define what we mean by a "stochastic process". As we said earlier, the word <em>stochastic</em> essentially means random. A stochastic process is a model for processes that evolve over time in a probabilistic manner. More formally, a <em>stochastic process</em> is an indexed collection of random variables <Math>\{X_t\}</Math>, where the index <Math>t</Math> runs through some set <Math>T</Math>. Very often <Math>T</Math> is the set of non-negative integers, so that the collection of random variables we are interested is <Math>\{X_0,X_1,...\}</Math> and <Math>X_t</Math> represents the state of some system after <Math>t</Math> time steps. For example, we might be tracking the inventory of a particular product at some store, with <Math>X_0</Math> being the inventory level at the beginning of the first week, <Math>X_1</Math> the inventory level at the beginning of the second week, and so on. When <Math>T</Math> is a discrete set, we call the process a <em>discrete-time stochastic process</em>  This type of process will be our focus in this class.
</BodyText>
<BodyText>
    Let's talk now about the sample space for the <Math>X_t</Math> random variables. For the purposes of this class, the sample space will be some finite, discrete set, often notated as <Math>\{0, 1, \dots, M\}</Math> for some <Math>M\in\I+</Math>. We call <Math>\{0, 1, \dots, M\}</Math> the <em>states</em> of the system. So if for time <Math>t</Math> we have <Math>X_t=i</Math>, then we say that the system is in state <Math>i</Math> at time <Math>t</Math>. The stochastic process <Math>\{X_0,X_1,\dots\}</Math> then tells us how the state of the system changes over time.
</BodyText>
<BodyText>
    Analyzing stochastic processes can get fairly complicated without some simplifying assumptions. In the case of Markov chains, the key assumption is the so-called Markovian property. A discrete-time stochastic process <Math>\{X_0,X_1,\dots\}</Math> is said to have the <em>Markovian property</em> if
</BodyText>

<MathDisp>\begin{align*}
&\prob{X_{t+1}=j|X_0=k_0,X_1=k_1,\dots,X_t=i} \\
=&\prob{X_{t+1}=j|X_t=i}
\end{align*}
</MathDisp>
<BodyText>
    That is, if I'd like to know what will happen in the future of the process, it suffices to only know the state of the process <em>right now</em>  The rest of history is completely irrelevant to the future of the process. Mathematically we can say that <Math>X_{t+1}</Math> is independent of <Math>X_0, X_1, \dots, X_{t-1}</Math><Footnote>But, crucially, <Math>X_{t+1}</Math> is generally <em>not</em> independent of <Math>X_t</Math>.</Footnote>.
</BodyText>

<BodyText>
    This property is all we need to finally define a Markov chain. A stochastic process <Math>\{X_0,X_1,\dots\}</Math> is a <em>Markov chain</em> if it has the Markovian property.
</BodyText>
<BodyText>
    The conditional probability from above, <Math>\prob{X_{t+1}=j|X_t=i}</Math>, is known as a <em>transition probability</em>  since it gives the probability of the system transitioning from state <Math>i</Math> in one time step to state <Math>j</Math> in the next. For notational convenience, we will usually denote this as <Math>p_{ij}</Math>, so that
</BodyText>

<MathDisp>p_{ij}=\prob{X_{t+1}=j|X_t=i}
</MathDisp>
<BodyText>
    Implicit in this notation is that <Math>p_{ij}</Math> does not depend on the time step <Math>t</Math>, so that the transition probabilities are <em>stationary</em>  This will be an assumption we'll hold throughout the class.
</BodyText>

<Heading level=3 refId=markovFirstEx>First examples</Heading>
<BodyText>
    Let's see how it all comes together with a few examples.
</BodyText>

<Heading level=4 refId=markovWeatherEx>Weather example</Heading>
<BodyText>
    Quoting from<CitationRef refId=classText/>
</BodyText>

<BlockQuote>
    <BodyText>
        The weather in the town of Centerville can change rather quickly from day to day. However, the chances of being dry (no rain) tomorrow are somewhat larger if it is dry today than if it rains today. In particular, the probability of being dry tomorrow is 0.8 if it is dry today, but is only 0.6 if it rains today. These probabilities do not change if information about the weather before today is also taken into account.
    </BodyText>
    <BodyText>
        The evolution of the weather from day to day in Centerville is a stochastic process. Starting on some initial day (labeled as day 0), the weather is observed on each day <Math>t</Math>, for <Math>t = 0, 1, 2, . . .</Math> The state of the system on day <Math>t</Math> can be either State 0 (day <Math>t</Math> is dry) or State 1 = (day <Math>t</Math> has rain). Thus, for <Math>t = 0, 1, 2, . . .</Math>, the random variable <Math>X_t</Math> takes on the values
    </BodyText>
    <MathDisp>
        X_t=\begin{cases}
            0 & \text{ if day } t \text{ is dry.} \\
            1 & \text{ if day } t \text{ has rain.}
        \end{cases}
    </MathDisp>
    <BodyText>
        The stochastic process <Math>\{X_t\} = \{X_0, X_1, X_2, . . .\}</Math> provides a mathematical representation of how the status of the weather in Centerville evolves over time.
    </BodyText>
</BlockQuote>

<BodyText>
    The above gives a general, stochastic process formulation for Centerville weather. But notice the assumptions of the model (state changes do not depend on weather history) mean that this process is actually a Markov chain. So, as is custom with a Markov chain, we will go ahead and construct the <em>(one-step) transition matrix</em> for the problem, denoted as <Math>\mathbf{P}</Math>, whose entries <Math>p_{ij}</Math> follow the definition from above:
</BodyText>

<MathDisp>p_{ij}=\prob{X_{t+1}=j|X_t=i}
</MathDisp>
<BodyText>
    For this problem the transition matrix becomes<Footnote>It is worth noting that the rows of any transition matrix will always sum to 1, since the <Math>i</Math>th row accounts for the probabilities of transitioning from state <Math>i</Math> to any other state <Math>j</Math>. The columns of the matrix do <em>not</em> need to sum to 1.</Footnote>:
</BodyText>

<MathDisp refId=weatherMatrix>\mathbf{P}=\begin{bmatrix}
p_{00} & p_{01} \\
p_{10} & p_{11}
\end{bmatrix}=\begin{bmatrix}
0.8 & 0.2 \\
0.6 & 0.4
\end{bmatrix}
</MathDisp>

<BodyText>
    A nice way to visualize a Markov chain is with a transition diagram, as illustrated below:
</BodyText>

<Figure refId="weatherTransition">
    <img src={weatherTransition} alt="Weather example transition diagram" />
    <span slot=caption>Transition diagram for Centerville weather Markov chain example <CitationRef refId=classText/></span>
</Figure>

<Heading level=4 refId=markovInvEx>Inventory example</Heading>
<BodyText>
    Let's take another example from the textbook. This example makes reference to the <a href='https://en.wikipedia.org/wiki/Poisson_distribution'>Poisson distribution</a>, a particular discrete probability distribution that is used in many applications.
</BodyText>

<BlockQuote>
    <BodyText>
        Dave’s Photography Store has the following inventory problem. The store stocks a particular model camera that can be ordered weekly. Let <Math>D_1, D_2, . . .</Math> represent the demand for this camera (the number of units that would be sold if the inventory is not depleted) during the first week, second week, ... , respectively, so the random variable <Math>D_t</Math> (for <Math>t = 1, 2, . . .</Math>) is the number of cameras that would be sold in week <Math>t</Math> if the inventory is not depleted. (This number includes lost sales when the inventory is depleted.)
    </BodyText>
    <BodyText>
        It is assumed that the <Math>D_t</Math> are independent and identically distributed random variables having a Poisson distribution with a mean of 1. Let <Math>X_0</Math> represent the number of cameras on hand at the outset, <Math>X_1</Math> the number of cameras on hand at the end of week 1, <Math>X_2</Math> the number of cameras on hand at the end of week 2, and so on, so the random variable <Math>X_t</Math> (for <Math>t = 0, 1, 2, . . .</Math>) is the number of cameras on hand at the end of week <Math>t</Math>.
    </BodyText>
    <BodyText>
        Assume that <Math>X_0 = 3</Math>, so that week 1 begins with three cameras on hand. <Math>\{X_t\} = \{X_0, X_1, X_2, . . .\}</Math> is a stochastic process where the random variable <Math>X_t</Math> represents the state of the system at time <Math>t</Math>, namely, the number of cameras on hand at the end of week <Math>t</Math>.
    </BodyText>
    <BodyText>
        As the owner of the store, Dave would like to learn more about how the status of this stochastic process evolves over time while using the current ordering policy described below.
    </BodyText>
    <BodyText>
        At the end of each week <Math>t</Math> (Saturday night), the store places an order that is delivered in time for the next opening of the store on Monday. The store uses the following order policy:
        <MathDisp>
            \begin{align*}
            \text{If }X_t = 0&,\text{ order 3 cameras}.\\
            \text{If }X_t > 0&,\text{ do not order any cameras}.
            \end{align*}
        </MathDisp>
        Thus, the inventory level fluctuates between a minimum of zero cameras and a maximum of three cameras, so the possible states of the system at time <Math>t</Math> (the end of week <Math>t</Math>) are 0, 1, 2, or 3 cameras on hand.
    </BodyText>
    <BodyText>
        Since each random variable <Math>X_t</Math> <Math>(t = 0, 1, 2, . . .)</Math> represents the state of the system at the end of week t, its only possible values are 0, 1, 2, or 3. The random variables <Math>X_t</Math> are dependent and may be evaluated iteratively by the expression
        <MathDisp>
            X_{t+1} = \begin{cases}
            \max\{3 − D_{t+1}, 0\}&\text{ if }X_t = 0\\
            \max\{X_t − D_{t+1}, 0\}&\text{ if }X_t \geq 1
            \end{cases}
        </MathDisp>
        for <Math>t = 0, 1, 2, . . .</Math>
    </BodyText>
</BlockQuote>

<BodyText>
    This stochastic process follows the Markovian property, since we saw above that the state at time <Math>t+1</Math> is a function of <Math>X_t</Math> and a random variable <Math>D_{t+1}</Math> that is evaluated during the week. We know the distribution of the <Math>D_t</Math> random variables, so we should be able to construct the transition matrix for this example.
</BodyText>
<BodyText>
    What does the transition matrix look like? Let's see if we can work out a few examples entries, starting with <Math>p_{00}</Math>. Recall, <Math>p_{00}=\prob{X_{t+1}=0|X_t=0}</Math>. If <Math>X_t=0</Math>, then Dave will order 3 cameras that will be on hand to start week <Math>t+1</Math>. So for us to end up with <Math>X_{t+1}=0</Math> we need the demand <Math>D_{t+1}</Math> to be greater than or equal to 3. Since <Math>D_{t+1}</Math> is a Poisson random variable with a mean of 1, we can get the value we need from knowledge of the Poisson distribution. In this case, the probability we need is
</BodyText>

<MathDisp>p_{00}=\prob{D_{t+1}\geq3}\approx0.080
</MathDisp>
<BodyText>
    By similar logic, we have <Math>p_{01}=\prob{D_{t+1}=2}</Math>, <Math>p_{02}=\prob{D_{t+1}=1}</Math>, and <Math>p_{03}=\prob{D_{t+1}=0}</Math>.
</BodyText>
<BodyText>
    When <Math>X_t>0</Math> then Dave will not order any cameras. So if we want to find <Math>p_{10}</Math> (corresponding to <Math>X_t=1</Math> and <Math>X_t=0</Math>) then the probability we need to find is <Math>\prob{D_{t+1}\geq 1}</Math>, while <Math>p_{11}=\prob{D_{t+1}=0}</Math> and <Math>p_{12}=p_{13}=0</Math>. Continuing by this logic, we get the transition matrix
</BodyText>

<MathDisp refId=inventoryMatrix>\mathbf{P}=\begin{bmatrix}
0.080 & 0.184 & 0.368 & 0.368 \\
0.632 & 0.368 & 0     & 0     \\
0.264 & 0.368 & 0.368 & 0     \\
0.080 & 0.184 & 0.368 & 0.368
\end{bmatrix}
</MathDisp>

<Heading level=3 refId=nStepTransitionProbs><Math>n</Math>-step transition probabilities</Heading>
<BodyText>
    Now we know that each Markov chain has an associated transition matrix <Math>\mathbf{P}</Math>. Suppose that we have a Markov chain with two states, so that <Math>\mathbf{P}</Math> is a <Math>2\times2</Math> matrix. Watch what happens when we multiply <Math>\mathbf{P}</Math> by itself:
</BodyText>

<MathDisp>\begin{align*}
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
</MathDisp>
<BodyText>
    Let's denote the <Math>i,j</Math> entry of that matrix as <Math>p_{ij}^{(2)}</Math>, and for example let's consider the two terms that make up <Math>p_{00}^{(2)}</Math>. We could write the first term as
</BodyText>

<MathDisp>\begin{align*}
p_{00}p_{00} &= \prob{X_{t+1}=0|X_t=0}\prob{X_{t+1}=0|X_t=0} \\
&= \prob{X_{t+1}=0|X_t=0}\prob{X_{t+2}=0|X_{t+1}=0}
\end{align*}
</MathDisp>

<BodyText>
(the last substitution follows due to time stationarity). Due to independence of the relevant events, that term represents the probability of transitioning from state 0 to state 0 in two successive time steps. Meanwhile, the second term becomes
</BodyText>

<MathDisp>\begin{align*}
p_{01}p_{10} &= \prob{X_{t+1}=1|X_t=0}\prob{X_{t+1}=0|X_t=1} \\
&= \prob{X_{t+1}=1|X_t=0}\prob{X_{t+2}=0|X_{t+1}=1}
\end{align*}
</MathDisp>
<BodyText>
    or the probability of transitioning from state 0 to state 1, then back from 1 to 0 in successive time steps. So together,
</BodyText>

<MathDisp>p_{00}^{(2)} = p_{00}p_{00} + p_{01}p_{10}
</MathDisp>
<BodyText>
    represents the two possible ways to start in state 0 in some time step, then return back to 0 after two transitions. Since these two paths are disjoint events, their joint probability is the sum of the individual probabilities. So <Math>p_{00}^{(2)}</Math> is exactly the probability of starting in state 0 at some time step, and then being in state 0 again two steps later.
</BodyText>
<BodyText>
    In general, we can write out the following <em>Chapman-Kolmogorov equation**
</BodyText>

<MathDisp>p_{ij}^{(n)}=\sum_{k=0}^Mp_{ik}^{(n-1)}p_{kj}
</MathDisp>
<BodyText>
    essentially saying that to get from state <Math>i</Math> to state <Math>j</Math> in <Math>n</Math> steps, the associated event consists of any sequence that takes us from <Math>i</Math> to some state <Math>k</Math> in <Math>n-1</Math> steps, then directly from <Math>k</Math> to <Math>j</Math> in the final step. Furthermore, the associated probability is as given above. A simple application of mathematical induction tells us that if we let <Math>p_{ij}^{(n)}</Math> represent the <Math>i,j</Math> entry of the matrix multiplication <Math>\mathbf{P}^n</Math> (multiplying <Math>\mathbf{P}</Math> by itself <Math>n</Math> times), then <Math>p_{ij}^{(n)}</Math> equals the probability of being in state <Math>i</Math> at some time step and ending up in state <Math>j</Math> after <Math>n</Math> transitions.
</BodyText>
<BodyText>
    Wanna apply this knowledge to our previous example Markov chains? Check the following notebook.
</BodyText>

<!-- todo: desc as slot -->
<ColabGist
    colabId=1AlCE8vVZJAMc1K8v9BtdwR4B0GE0I59L
    gistId=acaebd42106eb6efc95b8f88fee04531
    refId=nStepTransition
    desc='n-step transition probabilities'
/>

<Heading level=3 refId=markovStateClass>State classification</Heading>

<BodyText>
    As we continue analyzing Markov chains, many of our results will depend on the nature of the possible states in the chain. In this section we'll examine different classifications for the states of Markov chains.
</BodyText>

<Heading level=4 refId=markovCommunication>Communication</Heading>
<BodyText>
    A state <Math>j</Math> is said to be <em>accessible</em> from state <Math>i</Math> if <Math>p_{ij}^{(n)}>0</Math> for some <Math>n\geq0</Math>. In other words, state <Math>j</Math> being accessible from state <Math>i</Math> simply means that it's possible for the system to enter state <Math>j</Math> <em>eventually</em> when it starts from state <Math>i</Math>. Furthermore, two states <Math>i</Math> and <Math>j</Math> are said to <em>communicate</em> if both states are accessible from each other, i.e. state <Math>j</Math> is accessible from state <Math>i</Math> <em>and</em> state <Math>i</Math> is accessible from state <Math>j</Math>. Said another way, <Math>i\neq j</Math> communicate if and only if it is possible to start in state <Math>i</Math>, enter state <Math>j</Math> some time in the future, then eventually make it back to state <Math>i</Math>. Given that definition, the following statements must be true:
    <ol>
        <li>Any state communicates with itself (by technicality, since <Math>p_{ii}^{(0)}=\prob{X_t=i|X_t=i}=1</Math>).</li>
        <li>If state <Math>i</Math> communicates with state <Math>j</Math>, then state <Math>j</Math> communicates with state <Math>i</Math>.</li>
        <li>If state <Math>i</Math> communicates with state <Math>j</Math> and state <Math>j</Math> communicates with state <Math>k</Math>, then state <Math>i</Math> communicates with state <Math>k</Math>.</li>
    </ol>
</BodyText>

<BodyText>
    For the two examples we've seen so far (weather and inventory), it should be pretty clear that all the states communicate with each other. It's very clear from the transition matrix for the weather example (<EquationRef refId=weatherMatrix/>) that you can go from any state to the other state in just one step. It's slightly less clear for the inventory example (transition matrix <EquationRef refId=inventoryMatrix/>), since you can't e.g. go directly from state 1 to state 2 in a single step. But you <em>can</em> go from state 1 directly to state 0, then from state 0 directly to state 2 (and similar could be said for any pair of states)<Footnote>We could use the previous notebook to show that <Math>\mathbf{P}^2</Math> has all positive entries for the inventory example, which is also sufficient to show that all states communicate.</Footnote>.
</BodyText>

<BodyText>
    So it looks like we need another example so we can see these (and later) definitions in action.
</BodyText>

<Heading level=4 refId=markovGamblingEx>Gambling example</Heading>
<BodyText>
    In this example, (once again from<CitationRef refId=classText/>) a gambler repeatedly plays a game until he hits some end condition:
</BodyText>

<BlockQuote>
    <BodyText>
        Suppose that a player has $1 and with each play of the game wins $1 with probability <Math>p > 0</Math> or loses $1 with probability <Math>1 − p > 0</Math>. The game ends when the player either accumulates $3 or goes broke. This game is a Markov chain with the states representing the player’s current holding of money, that is, $0, $1, $2, or $3.
    </BodyText>
</BlockQuote>

<BodyText>
    What should this transition matrix look like? The write-up tells us that the gambler stops playing when he reaches either \$0 or \$3, but we can emulate this behavior by saying that whenever the process reaches state <Math>i\in\{0,3\}</Math> it will continue to stay in state <Math>i</Math> for all subsequent time steps. So we will have <Math>p_{00}=p_{33}=1</Math>. Then for <Math>i\in\{1,2\}</Math> we just need <Math>p_{i,i+1}=p</Math> and <Math>p_{i,i-1}=1-p</Math>, so the transition matrix looks like:
</BodyText>

<MathDisp refId=gamblingMatrix>
    \mathbf{P}=\begin{bmatrix}
        1&0&0&0\\
        1-p&0&p&0\\
        0&1-p&0&p\\
        0&0&0&1\\
    \end{bmatrix}
</MathDisp>

<BodyText>
    And the associated transition diagram:
</BodyText>

<Figure refId="gamblingTransition">
    <img src={gamblingTransition} alt="Gambling example transition diagram" />
    <span slot=caption>Transition diagram for gambling Markov chain example <CitationRef refId=classText/></span>
</Figure>

<BodyText>
    Which states communicate in this example? Clearly no other states communicate with state 0 or state 3. In contrast, States 1 and 2 <em>do</em> communicate, since <Math>p_{12}>0</Math> and <Math>p_{21}>0</Math>.
</BodyText>

<Heading level=4 refId=markovClasses>Classes and reducibility</Heading>
<BodyText>
    If all of the pairs of states in a Markov chain communicate with each other, then we say that the chain is <em>irreducible</em>  As we saw, this is the case in both the weather and inventory examples, but it is <em>not</em> the case in the gambling example.
</BodyText>
<BodyText>
    In the case that a Markov chain is not irreducible, it can still be useful to know which groups of states <em>do</em> mutually communicate. Indeed, as a consequence of the three properties of communication stated above, the states of a Markov chain may be partitioned into one or more separate <em>classes</em> such that those states that communicate with each other are in the same class. Such a class is also often called a <em>communication class</em>  In the gambling example there are three distinct classes, <Math>\{0\}</Math>, <Math>\{3\}</Math>, and <Math>\{1,2\}</Math>.
</BodyText>

<Heading level=4 refId=markovRecurTransientAbsorb>Recurring, transient, and absorbing states</Heading>
<BodyText>
    Let's look again at states 1 and 2 from the gambling example. While it is technically possible to keep bouncing back and forth between these two states for arbitrarily long, eventually (and in all probability<Footnote>I'll keep peppering the notes with that term, "in all probability" as a substitute for notions from the more rigorous probability theory that we won't explore here. It comes from a notion that there can be events that are "possible" (exist as a subset of the sample space) but still have 0 probability of occurring (like bouncing back and forth forever between states 1 and 2 forever). So even though they are technically possible, we don't consider them from a probabilistic perspective.</Footnote>) the chain will transition to either state 0 or 3, and never return to 1 or 2 again. Any such state where, upon entering it, it is possible to leave its communication class completely and never return again, is called a <em>transient state</em>  More precisely, a state <Math>i</Math> is transient if there exists a state <Math>j</Math> such that <Math>j</Math> is accessible from <Math>i</Math> but <Math>i</Math> is not accessible from <Math>j</Math>.
</BodyText>

<BodyText>
    Conversely, a state is called a <em>recurrent state</em> if, upon entering this state, the process definitely will (in all probability) return to this state again. This forms a true dichotomy with the concept of transient states, in that every state in a Markov chain must be either transient or recurrent. Every state we've seen in our three examples have been recurrent states, save for states 1 and 2 in the gambling example, which are transient.
</BodyText>
<BodyText>
    Since recurrent states will (in all probability) always be revisited after leaving, then they will be visited infinitely often over the course of the process (if they are visited at all). In contrast, transient states are only ever visited finitely often over all of the time steps.
</BodyText>
<BodyText>
    Not all recurrent states are created equal, however. States 0 and 3 in the gambling example have the property that once they are visited, the process will never leave that state. Such a recurrent state is also called an <em>absorbing state</em>  A state <Math>i</Math> is an absorbing state if and only if <Math>p_{ii}=1</Math>.
</BodyText>
<BodyText>
    It is worth noting that recurrence and transience are both <em>class properties</em>  i.e. a property that must be shared between every state in the same class. Thus if <Math>i</Math> and <Math>j</Math> are two states in the same communication class, it must be that <Math>i</Math> and <Math>j</Math> are either both recurrent or both transient.
</BodyText>

<Heading level=4 refId=markovPeriodicity>Periodicity</Heading>
<BodyText>
    Sometimes there are restrictions on the time-steps at which a state can be entered. In the gambling example (transition matrix <EquationRef refId=gamblingMatrix/>) you start at time <Math>t=0</Math> in state 1. From there, it is clearly impossible to enter state 1 at time <Math>t=1</Math>. In fact, the only times you may enter state 1 are at <Math>t=2, t=4, t=6</Math>, or any even-numbered time step. This observation motivates the next definition.
</BodyText>
<BodyText>
    The <em>period</em> of a state <Math>i</Math> is the smallest number <Math>t</Math> such that
</BodyText>

<MathDisp>p_{ii}^{(n)}\begin{cases}
= 0    && \text{ if } n \text{ is not a multiple of } t \\
\geq 0 && \text{ if } n \text{ is a multiple of } t
\end{cases}
</MathDisp>
<BodyText>
    If the period of some state <Math>i</Math> is equal to 1, then we say that state <Math>i</Math> is <em>aperiodic</em> 
</BodyText>
<BodyText>
    From this definition, it is clear that both states 1 and 2 in the gambling example are periodic states with periods of 2. Furthermore, we know that they <em>have to</em> have the same period, since we already know they are in the same communication class, and it can be shown that periodicity is a class property (i.e. all states in the same class must share the same period).
</BodyText>
<BodyText>
    In a finite-state Markov chain, states that are both recurrent and aperiodic are called <em>ergodic</em> states. Further, if every state in a Markov chain is ergodic, then the chain itself is said to be ergodic. Ergodic Markov chains have special properties that we will soon explore.
</BodyText>

<Heading level=3 refId=markovAbsorptionProp>Absorption probabilities</Heading>
<BodyText>
    The gambling example (<EquationRef refId=gamblingMatrix/>) is interesting in that it has multiple absorbing states. If there were only one absorbing state, we would know that, in the long run, the chain would eventually become stuck at that one state. But since in this case we have two different absorbing states (which have very different implications for our gambler) we might be interested in knowing the probability of getting stuck in one state versus the other. Our aim for this section is to show how these probabilities can be calculated.
</BodyText>
<BodyText>
    Of course, the probability of absorption into a particular state can be very dependent on where you started. After all, if you start the gambling example in state 0, you're already absorbed there and cannot possibly make it to the other absorbing state 3!. So our goal for this section will be to find the probability of absorption into state <Math>k</Math> given that the system starts in state <Math>i</Math>, which we'll denote by <Math>f_{ik}</Math>.
</BodyText>
<BodyText>
    How might we be able to find these probabilities? In analogy to the Chapman-Kolmogorov equation in <SectionRef refId=nStepTransitionProbs/>, we can write the following:
</BodyText>

<MathDisp>f_{ik}=\sum_{j=0}^Mp_{ij}f_{jk}
</MathDisp>
<BodyText>
    Where does this come from? This arises from noting that the event of starting in state <Math>i</Math> and eventually being absorbed in state <Math>k</Math>, is exactly the union (over all states <Math>j</Math>) of the events of starting in state <Math>i</Math>, transitioning first to state <Math>j</Math>, then from state <Math>j</Math> eventually being absorbed into state <Math>k</Math>.
</BodyText>
<BodyText>
    Furthermore, there are <Math>M+1</Math> of these equations (one for each possible starting state <Math>i</Math>), so we can build a system of <Math>M+1</Math> linear equations and <Math>M+1</Math> unknowns. Thus by solving this system, we will recover all the relevant probabilities for the chosen absorbing state <Math>k</Math>!
</BodyText>
<BodyText>
    Let's now apply this to the gambling example with absorbing state <Math>k=0</Math>. In that case, we clearly have <Math>f_{00}=1</Math> and <Math>f_{30}=0</Math>, so we only need to write out the other two equations. Doing so gives us the following system:
</BodyText>

<MathDisp>\begin{align*}
f_{10} &= p_{10}f_{00} + p_{11}f_{10} + p_{12}f_{20} + p_{13}f_{30} \\
f_{20} &= p_{20}f_{00} + p_{21}f_{10} + p_{22}f_{20} + p_{23}f_{30}
\end{align*}
</MathDisp>
<BodyText>
    Subbing in the values we already know, we get:
</BodyText>

<MathDisp>\begin{align*}
f_{10} &= (1-p)(1) + (0)f_{10} + (p)f_{20} + (0)(0) = 1-p + pf_{20} \\
f_{20} &= (0)(1) + (1-p)f_{10} + (0)f_{20} + (p)(0) = (1-p)f_{10}
\end{align*}
</MathDisp>
<BodyText>
    Solving this system gives:
</BodyText>

<MathDisp>f_{10}=\frac{1 - p}{p^{2} - p + 1}\qquad
f_{20}=\frac{p^{2} - 2 p + 1}{p^{2} - p + 1}
</MathDisp>
<BodyText>
    We could follow this same procedure to find the <Math>f_{i3}</Math> probabilities. But in this case there are only two absorbing states, so the only possible long-run possibilities are absorption into either state 0 or state 3. So in this case we have <Math>f_{i3} = 1 - f_{i0}</Math> for all <Math>i</Math>.
</BodyText>

<Heading level=3 refId=markovUnconditional>Unconditional probabilities</Heading>

<BodyText>
    Most of the probabilities we have seen so far have been <em>conditional</em> probabilities, dependent on the current state of the process. This is because we don't know at any given time step where the process may be. If we'd like to talk about <em>unconditional</em> probabilities, we'll need to know something more concrete about where the system is at any given time. Usually we'll do this by setting initial conditions for the chain, i.e. specifying (either absolutely or probabilistically) which state the process will start out in<Footnote>We've actually done this once already, when we said the inventory example would start out in state <Math>X_0=3</Math>.</Footnote>.
</BodyText>

<BodyText>
    In order to do this, we can specify a row vector <Math>\boldsymbol\pi</Math> where each entry <Math>\pi_i</Math> represents
</BodyText>

<MathDisp>\pi_i=\prob{X_0=i}
</MathDisp>
<BodyText>
    Then if we multiply <Math>\boldsymbol\pi\mathbf{P}</Math><Footnote>Note that the multiplication results in a row vector. I'm writing it as a transposed column vector to put each entry on its own line and make things a little more clear.</Footnote>:
</BodyText>


<MathDisp>\boldsymbol\pi\mathbf{P}=\begin{bmatrix}
 \pi_0p_{00} + \pi_1p_{10} + \dots + \pi_Mp_{M0} \\
 \pi_0p_{01} + \pi_1p_{11} + \dots + \pi_Mp_{M1} \\
 \vdots \\
 \pi_0p_{0M} + \pi_1p_{1M} + \dots + \pi_Mp_{MM}
\end{bmatrix}\T
</MathDisp>
<BodyText>
    Each entry <Math>i</Math> of this resultant vector is then given by:
</BodyText>

<MathDisp>\begin{align*}
&\pi_0p_{0i} + \pi_1p_{1i} + \dots + \pi_Mp_{Mi} \\
=&\prob{X_0=0}\prob{X_1=i|X_0=0} + \prob{X_0=1}\prob{X_1=i|X_0=1} + \dots + \prob{X_0=M}\prob{X_1=i|X_0=M} \\
=&\prob{\{X_1=i\}\cap\{X_0=0\}} + \prob{\{X_1=i\}\cap\{X_0=1\}} + \dots + \prob{\{X_1=i\}\cap\{X_0=M\}} \\
=&\prob{X_1=i}
\end{align*}
</MathDisp>

<!-- todo: add law of total probability to review section -->
<BodyText>
    (Where the third line come from the definition of conditional probability <EquationRef refId=conditionalProbability/>, and the final line is due to the <a href='https://en.wikipedia.org/wiki/Law_of_total_probability'>law of total probability</a>.) It's not too hard to show that this logic falls out the same way for <Math>\mathbf{P}^n</Math> for any <Math>n\geq0</Math>. That is, if <Math>\boldsymbol\pi</Math> holds the initial state probabilities, then we have
</BodyText>

<MathDisp>\boldsymbol\pi\mathbf{P}^n=\begin{bmatrix}\prob{X_n=0} & \prob{X_n=1} & \cdots & \prob{X_n=M}\end{bmatrix}
</MathDisp>
<BodyText>
    If you have a case where you want to enforce <Math>X_0=i</Math>, then you can simply set up <Math>\boldsymbol\pi</Math> so that <Math>\pi_i=1</Math> and <Math>\pi_j=0</Math> for all <Math>j\neq i</Math>.
</BodyText>

<Heading level=3 refId=markovSteadyState>Steady-state probabilities</Heading>
<BodyText>
    Let's take a moment and return to the Colab notebook in <SectionRef refId=nStepTransitionProbs/>, where we explored <Math>n</Math>-step transition probabilities. For either of the probability matrices in that section, if you raise them to a high enough power (20 will suffice for either) you might notice something peculiar. Letting <Math>\mathbf{P}</Math> be the transition matrix from the inventory example (<EquationRef refId=inventoryMatrix/>), using the notebook you would find that <Math>\mathbf{P}^{n}</Math> for large <Math>n</Math> is approximately:
</BodyText>

<Code>
    array([[0.28565411, 0.28483488, 0.26318076, 0.16633024],
               [0.28565411, 0.28483488, 0.26318076, 0.16633024],
               [0.28565411, 0.28483488, 0.26318076, 0.16633024],
               [0.28565411, 0.28483488, 0.26318076, 0.16633024]])
</Code>

<BodyText>
    Notice how every row of that matrix is identical to every other row. What does that mean? It would mean that for large enough <Math>n</Math> the probability of ending up in a given state after <Math>n</Math> transitions is the same <em>no matter where you started</em>  This would imply that starting conditions are irrelevant to the long-run behavior of the system.
</BodyText>
<BodyText>
    Let's state this observation a little more mathematically. For each state <Math>j</Math> and large enough <Math>n</Math>, we've noticed that
</BodyText>

<MathDisp>
    p_{0j}^{(n)}\approx p_{1j}^{(n)}\approx\cdots\approx p_{Mj}^{(n)}
</MathDisp>

<BodyText>
    (at least for these two examples). As we continue to choose larger and larger values for <Math>n</Math>, the numbers do not appear to change. This is no proof, of course, but it seems reasonable to surmise that
</BodyText>

<MathDisp>\lim_{n\rightarrow\infty}p_{0j}^{(n)} = \lim_{n\rightarrow\infty}p_{1j}^{(n)} = \cdots = \lim_{n\rightarrow\infty}p_{Mj}^{(n)}
</MathDisp>
<BodyText>
    It turns out that, under fairly common conditions, these properties <em>do</em> hold. In fact, there is often a handy way to solve for these long-run probabilities. The main result (which is beyond the scope of this class to prove) is as follows:
</BodyText>

<Theorem refId=markovSteadyState proofPlacement=none>
    <BodyText>
        For any irreducible ergodic Markov chain with transition matrix <Math>\mathbf{P}</Math> and any state <Math>j</Math>, the limit
        <MathDisp>
            \lim_{n\rightarrow\infty}p_{ij}^{(n)}
        </MathDisp>
        exists and is independent of <Math>i</Math>. Furthermore, for any <Math>i</Math>
        <MathDisp>
            \lim_{n\rightarrow\infty}p_{ij}^{(n)}=\pi_j
        </MathDisp>
        where <Math>\pi_j</Math> is the <Math>j</Math>th entry of the unique vector <Math>\boldsymbol\pi</Math> satisfying
        <MathDisp>
            \begin{align*}
            \boldsymbol\pi\mathbf{P}&=\boldsymbol\pi\\
            \sum_{j=0}^M\pi_j&=1
            \end{align*}
        </MathDisp>
    </BodyText>
</Theorem>

<BodyText>
    Those conditions at the end of the theorem,
</BodyText>

<MathDisp refId=markovSteadyState>
    \begin{align*}
        \boldsymbol\pi\mathbf{P}&=\boldsymbol\pi\\
        \sum_{j=0}^M\pi_j&=1
    \end{align*}
</MathDisp>

<BodyText>
    are called the <em>steady-state equations</em> of the Markov chain, and the solution <Math>\boldsymbol\pi</Math> is the vector of <em>steady-state probabilities</em>  The <em>steady-state</em> part of those names make sense in the light of what we explored in <SectionRef refId=markovUnconditional/>. There, we let <Math>j</Math>th entry of <Math>\boldsymbol\pi</Math> be the probability <Math>\prob{X_0=j}</Math> of starting the process in some state <Math>j</Math>. Then we saw that the <Math>j</Math>th entry of the product <Math>\boldsymbol\pi\mathbf{P}</Math> gave the probability <Math>\prob{X_1=j}</Math> of being in state <Math>j</Math> in the next time step. If <Math>\boldsymbol\pi</Math> satisfies the steady-state equations, then these probabilities are the same!
</BodyText>
<BodyText>
    Ah, but there seems to be a problem. The steady-state equations include <Math>M+1</Math> unknowns (the entries <Math>\pi_j</Math> of the vector <Math>\boldsymbol\pi</Math>) but <Math>M+2</Math> equations, so it seems like there won't be enough degrees of freedom to find a solution.
</BodyText>
<BodyText>
    But actually, since each row of <Math>\mathbf{P}</Math> sums to one, knowing any <Math>M</Math> columns out of that matrix is sufficient to determine the <Math>M+1</Math>st column. So <Math>\mathbf{P}</Math> cannot have full rank, meaning only <Math>M</Math> of the equations in <Math>\boldsymbol\pi\mathbf{P}</Math> could be linearly independent. In practice, this means that we can take only <Math>M</Math> of those equations and solve them simultaneously with <Math>\sum_{j=0}^M\pi_j=1</Math> to find the steady-state probabilities.
</BodyText>

<Heading level=4 refId=markovSteadyEx>Example</Heading>
<BodyText>
    Let's use what we know to find the steady-state probabilities for the weather example. The system <Math>\boldsymbol\pi\mathbf{P}=\boldsymbol\pi</Math> gives the equations:
</BodyText>

<MathDisp>\begin{align*}
\begin{bmatrix}\pi_0 & \pi_1\end{bmatrix}\begin{bmatrix}0.8 & 0.2 \\ 0.6 & 0.4\end{bmatrix}&=\begin{bmatrix}\pi_0 & \pi_1\end{bmatrix} \\
&\Updownarrow \\
\begin{bmatrix}0.8\pi_0 + 0.6\pi_1 & 0.2\pi_0 + 0.4\pi_1\end{bmatrix}&=\begin{bmatrix}\pi_0 & \pi_1\end{bmatrix}
\end{align*}
</MathDisp>
<BodyText>
    Since one of these is redundant, we can choose one to throw away (we'll just say the first one) and solve simultaneously with the condition <Math>\pi_0 + \pi_1 = 1</Math>. So we need to solve the system:
</BodyText>

<MathDisp>\begin{align*}
\pi_0 + \pi_1 &= 1 \\
0.2\pi_0 + 0.4\pi_1&=\pi_1
\end{align*}
</MathDisp>
<BodyText>
    Which works out to
</BodyText>

<MathDisp>\pi_0=0.75, \quad \pi_1=0.25
</MathDisp>
<BodyText>
    So the steady-state vector is <Math>\boldsymbol\pi=[0.75, 0.25]</Math>.
</BodyText>

<Heading level=4 refId=markovSteadyMatrix>Solving for the steady-state probabilities in matrix form</Heading>
<BodyText>
    The above argument gives you a way to solve for the steady-state probabilities by hand, but a more machine-friendly way is to use the following matrix form (which we won't bother to prove, though you can look for it in<CitationRef refId=resnickAdventures/>):
</BodyText>

<MathDisp>\boldsymbol\pi = \begin{bmatrix}1&1&\cdots&1\end{bmatrix}(\identity - \mathbf{P} + \mathbf{O})\inv
</MathDisp>
<BodyText>
    where <Math>\identity</Math> is an <Math>(M+1)\times (M+1)</Math> identity matrix and <Math>\mathbf{O}</Math> is an <Math>(M+1)\times (M+1)</Math> matrix with every entry equal to 1. You might look at that and be worried about the matrix <Math>(\identity - \mathbf{P} + \mathbf{O})</Math> even having an inverse, but rest assured that if the process is irreducible and ergodic then the inverse will exists. We will see how to apply this in Python shortly.
</BodyText>

<Heading level=3 refId=markovLongRunAverageCost>Average cost per time step</Heading>
<BodyText>
    These preceding results for
</BodyText>

<MathDisp>\lim_{n\rightarrow\infty}p_{ij}^{(n)}
</MathDisp>
<BodyText>
    all required the underlying Markov chain to be ergodic. But suppose the Markov chain instead had aperiodic states. Then the limit above need not exist, since for infinitely many values of <Math>n</Math> we'd have <Math>p_{ij}^{(n)}=0</Math>, but for other <Math>n</Math> the value may be strictly bounded from 0.
</BodyText>
<BodyText>
    But there is a related quantity that always will exist so long as the process is irreducible. Namely, for any state <Math>j</Math> (and independent of starting state <Math>i</Math>) we can show that the following holds:
</BodyText>

<MathDisp>\lim_{n\rightarrow\infty}\frac{1}{n}\sum_{k=1}^np_{ij}^{(k)}=\pi_j
</MathDisp>
<BodyText>
    where <Math>\pi_j</Math> is the <Math>j</Math>th entry of the vector <Math>\boldsymbol\pi</Math> satisfying the steady-state equations <EquationRef refId=markovSteadyState/>. This limit is essentially the long-run average probability of ending up in state <Math>j</Math>, with that average taken over all time steps. It is very easy to see why this might be related to the steady-state probabilities, and luckily it is applicable to a larger range of stochastic processes.
</BodyText>
<BodyText>
    In particular, it is going to help us in the case that we have some cost associated with entering particular states in a Markov chain, and we'd like to know something about the costs that we incur in the long run. In that spirit, let <Math>c</Math> be some function so that when a Markov chain enters state <Math>X_i</Math> for any <Math>i\in\{0,\dots,M\}</Math> we incur some cost <Math>c(X_i)</Math>. In this case, we can use that above result<Footnote>I've sure been presenting a lot of these results without even hinting at proofs, haven't I? It all comes down to not wanting to deal with more rigorous probability theory.</Footnote> to show that the <em>long-run expected average cost per unit time</em> is given by:
</BodyText>


<MathDisp>\lim_{n\rightarrow\infty}\E{\frac{1}{n}\sum_{t=1}^nc(X_t)}=\sum_{j=0}^M\pi_jc(j).
</MathDisp>

<Heading level=4 refId=markovLongRunAvgCostEx>Example</Heading>
<BodyText>
    Let's reconsider the inventory example (transition matrix <EquationRef refId=inventoryMatrix/>). Suppose that Dave now incurs a storage cost for each camera remaining on the shelf at the end of the week. The cost function is structured as follows:
</BodyText>

<MathDisp>c(x) = \begin{cases}
0 &&\text{ if } x = 0 \\
2 &&\text{ if } x = 1 \\
8 &&\text{ if } x = 2 \\
18 &&\text{ if } x = 3
\end{cases}
</MathDisp>
<BodyText>
    Let's head to the following Colab notebook to calculate the long-run expected average storage cost per week.
</BodyText>

<ColabGist
    colabId=1K84wMoNPv3BB38THMYn3BtTdEAZQX_pL
    gistId=d0c5365b0fd5a5b2db8aefc5cf025719
    refId=markovLongRunCost
    desc='Calculating long-run expected average cost'
/>

<Heading level=3 refId=markovWebSearch>Application to web search</Heading>
<BodyText>
    As mentioned at the beginning of this section, Markov chains have played a part in how Google orders pages in its search results<Footnote>What we'll show here is part of one of Google's original algorithms, PageRank. Admittedly they've added a lot since then and I do not know if this particular strategy is still in use.</Footnote>. There is a pretty neat idea behind it, so let's take a look at how it works!
</BodyText>

<BodyText>
    Suppose you have a collection of <Math>M+1</Math> websites that you'd like to rank by "importance". You have access to the content of the sites, but no external information like page views. What might you do?
</BodyText>
<BodyText>
    One thing you can determine from the site content is what pages link to other pages in your collection. You might be tempted then to rank pages by the number of other pages linking to it. But that could be gamed easily - anyone that wants a higher ranking can just create a bunch of new websites with links to their main site. So what you'd like to do is somehow count links from more important websites higher than links from less important websites. But importance is exactly what we're trying to determine in the first place! It all seems just hopelessly self-referential.
</BodyText>
<BodyText>
    But what about this? Pretend that there is some "random" web surfer, who navigates to one of the websites at random and, from then on, chooses a link at random from all of those available on the page. The measure of importance would be what proportion of time the surfer goes to a given site. It would be pretty easy to model this as a Markov chain. As usual, we'll label the states <Math>0,1,\dots,M</Math>, with each one representing a website. Suppose each site <Math>i</Math> had <Math>n_i</Math> links out to other websites. Then the transition matrix (let's call it <Math>\mathbf{P}^{\text{links}}</Math>) would have entries
</BodyText>

<MathDisp>p^{\text{links}}_{ij} = \begin{cases}
\frac{1}{n_i}&&\text{if site } i \text{ links to site }j \\
0&&\text{otherwise}
\end{cases}
</MathDisp>
<BodyText>
    This should be able to neutralize the attack mentioned above, where a website owner creates a bunch of zombie websites whose only purpose is to link back to the main site. If no other sites link to those zombie websites, then they can't affect the traffic to the main site in the long term.
</BodyText>
<BodyText>
    So if we take <Math>\boldsymbol\pi</Math> as the solution to the steady-state equations <EquationRef refId=markovSteadyState/>, then that will give us the importance ratings we need! But there could be a problem, as we have no guarantee that our Markov chain is recurrent. So it may not be possible to solve the steady-state equations. We can mitigate this by creating a new matrix <Math>\mathbf{P}^{\text{uniform}}</Math> with entries
</BodyText>

<MathDisp>p^{\text{uniform}}_{ij} = \frac{1}{M+1}
</MathDisp>
<BodyText>
    Thinking back to the random surfer, this would correspond to the surfer not selecting some link on the current site, but instead just choosing from random across <em>all</em> the sites considered. To make this useful to us, we can combine this matrix with the last one via some weighting to create our final transition matrix <Math>\mathbf{P}</Math>. Maybe something like:
</BodyText>

<MathDisp>\mathbf{P} = 0.9\mathbf{P}^{\text{links}} + 0.1\mathbf{P}^{\text{uniform}}
</MathDisp>
<BodyText>
    This final matrix corresponds to a process where the surfer clicks on a random link 90% of the time, but the other 10% of the time just selects a new page at random. Check out the following notebook to get a feel for how this might work.
</BodyText>

<ColabGist
    colabId=1v51aGphcWAxmlpyqkvA67a_HbPnfcvPa
    gistId=829e60ed481a4ab7fe3d4b1e397ddbd2
    refId=webSearchNotebook
    desc='Markov chains applied to web search'
/>