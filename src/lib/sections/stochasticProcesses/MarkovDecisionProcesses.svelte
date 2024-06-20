<script lang="ts">
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

    import mdpExampleActions from "$lib/images/mdp-example-actions.png";
</script>

<Heading level=2 refId=markovDecisionProcesses>Markov decision processes</Heading>

<BodyText>
    Up to this point in our exploration of stochastic processes, we've only been <em>describing</em> the evolution of random processes and probabilities around certain outcomes. We've had no agency, letting random dynamics control all of the outcomes. In this chapter, we'll find ourselves trying to make decisions in order to influence a random process to attain desirable outcomes. In particular, we will assume that we're interacting with a system whose dynamics are explained by a Markov chain. However, at any given state, we are allowed to choose between a given set of actions to take. Whatever action we choose will bring us some kind of cost or reward, while also affecting the transition probabilities that determine the next state. Our goal will be to choose a policy (set of actions to take in each state) that will net us the lowest long-term costs (or highest long-term rewards). Such a process is called a <em>Markov decision process</em> (<em>MDP</em>).
</BodyText>

<Heading level=3 refId=mdpExample>Example</Heading>
<BodyText>
    Let's start off with an example scenario through which we can describe the important components of MDPs. As usual, this example comes from <CitationRef refId=classText/>.
</BodyText>

<BlockQuote>
    <BodyText>
        A manufacturer has one key machine at the core of one of its production processes. Because of heavy use, the machine deteriorates rapidly in both quality and output. Therefore, at the end of each week, a thorough inspection is done that results in classifying the condition of the machine into one of four possible states:
        <ul>
            <li>State 0: Good as new</li>
            <li>State 1: Operable - minor deterioration</li>
            <li>State 2: Operable - major deterioration</li>
            <li>State 3: Inoperable - output of unacceptable quality</li>
        </ul>
    </BodyText>
    <BodyText>
        After historical data on these inspection results are gathered, statistical analysis is done on how the state of the machine evolves from week to week. The following matrix shows the relative frequency (probability) of each possible transition from the state in one week (a row of the matrix) to the state in the following week (a column of the matrix).
    </BodyText>
    <MathDisp> 
        \begin{bmatrix}
            0 & \frac{7}{8} & \frac{1}{16} & \frac{1}{16} \\
            0 & \frac{3}{4} & \frac{1}{8} & \frac{1}{8} \\
            0 & 0 & \frac{1}{2} & \frac{1}{2} \\
            0 & 0 & 0 & 1 \\
        \end{bmatrix}
    </MathDisp>
    <BodyText>
        In addition, statistical analysis has found that these transition probabilities are unaffected by also considering what the states were in prior weeks. This “lack-of-memory property” is the Markovian property that characterizes Markov chains. Therefore, letting the random variable <Math>X_t</Math> be the state of the machine at the end of week <Math>t</Math>, the conclusion is that the stochastic process <Math>\{X_t, t =  0, 1, 2, . . .\}</Math> is a discrete-time Markov chain whose (one-step) transition matrix is just the above matrix.
    </BodyText>
</BlockQuote>

<BodyText>
    Right, so we have a Markov chain like what we studied in <SectionRef refId=markovChains/>. But look at that transition matrix. Even if the process starts in state 0, before too many transitions the machine will end up inoperable and stuck in state 3. But this is a very important bit of machinery. Surely the manufacturer would not just sit by idly with a broken machine and the subsequent loss of revenue.
</BodyText>
<BodyText>
    So let's assume that the company will replace the product after it becomes inoperable. The replacement takes 1 week to complete and costs $4,000. Furthermore,the cost of lost production during the 1-week downtime is $2,000, so the total cost incurred whenever the current machine enters state 3 is $6,000.
</BodyText>
<BodyText>
    Let's also assume that there is cost associated with using the degraded machine in states 1 and 2 (say, due to defective items). These costs will be $1,000 in state 1 and $3,000 in state 2. To avoid those costs, the company is able to <em>overhaul</em> the machine once it enters state 2, with the effect of reversing most of the deterioration so that the machine returns to state 1.
</BodyText>
<BodyText>
    A natural question is, what maintenance policy should the company follow for their machine? There are several options they can choose from depending on the state the system is currently in. The costs and effects of these policies are summarized below (note that we've also added options to replace the machine in states 1 or 2):
</BodyText>

<Figure refId="mdpExampleActions">
    <img src={mdpExampleActions} alt="MDP example actions" />
    <span slot=caption>Summary of decisions and costs for MDP example <CitationRef refId=classText/></span>
</Figure>

<Heading level=3 refId=mdpBasics>MDP basics</Heading>
<BodyText>
    Before trying to determine the best maintenance policy, let's pause for a moment to learn the relevant notation and definitions for MDPs. The basic process is as follows:
    <ul>
        <li>The <em>state</em> <Math>i</Math> of a discrete-time Markov chain is observed after each transition, where (as in <SectionRef refId=markovChains/>) the possible states are <Math>i = 0, 1, . . . , M</Math>.</li>
        <li>After each observation, a <em>decision</em> (or <em>action</em>) <Math>k</Math> is chosen from a set of <Math>K</Math> available options, <Math>\{1,2,...,K\}</Math>. Some of the <Math>K</Math> decisions may not be relevant for every state.</li>
        <li>If decision <Math>d_i=k</Math> is made in state <Math>i</Math>, an immediate <em>cost</em> is incurred that has an expected value <Math>C_{ik}</Math>.</li>
        <li>The decision <Math>d_i=k</Math> in state <Math>i</Math> determines what the <em>transition probabilities</em> will be for the next transition from state <Math>i</Math>. Denote these transition probabilities by <Math>p_{ij}(k)</Math>, for <Math>j\in\{0,1, . . . , M\}</Math>. For this class, we will assume that the resultant transition matrices always describe an irreducible Markov chain.</li>
        <li>A specification of the decisions for each state <Math>(d_0, d_1, . . . , d_M)</Math> is called a <em>policy</em> for the MDP.</li>
        <li>The objective is to find an optimal policy according to some cost criterion which considers both immediate <em>and</em> future costs. The objective we focus on here is the (long-run) expected average cost per time step (though we will see an alternative criterion later).</li>
    </ul>
</BodyText>

<BodyText>
    Hopefully you can see how this relates to the example scenario we presented above. Depending on the state of the system, the company can choose a decision/action to take (either do nothing, overhaul, or replace). Each decision has an effect on the subsequent transition (e.g. a decision to overhaul automatically moves the process to state 1 in the next transition). Each state transition induces some combination of costs (replacement, lost production, or defects).
</BodyText>

<Heading level=3 refId=policyEval>Evaluating policies</Heading>
<BodyText>
    How can we evaluate a policy? As an example, let's say that the company's policy is to stick with a degraded machine in states 1 and 2, but replace the machine any time it becomes inoperable (i.e. a transition to state 3). Thus the policy we are evaluating is <Math>(1, 1, 1, 3)</Math>. With this policy, the transition matrix becomes
</BodyText>

<MathDisp>\begin{bmatrix}
0 & \frac{7}{8} & \frac{1}{16} & \frac{1}{16} \\
0 & \frac{3}{4} & \frac{1}{8} & \frac{1}{8} \\
0 & 0 & \frac{1}{2} & \frac{1}{2} \\
1 & 0 & 0 & 0 \\
\end{bmatrix}
</MathDisp>
<BodyText>
    Notice the change from the transition matrix in the example definition, since we're now immediately replacing the machine whenever the process enters state 3.
</BodyText>
<BodyText>
    How do we evaluate this policy? As stated, our objective is to minimize the long-run expected average cost per time step. And we already learned how to calculate that in <SectionRef refId=markovLongRunAverageCost/>: First we find the steady-state probabilities <Math>\boldsymbol\pi</Math> by solving for
</BodyText>

<MathDisp>\begin{align*}
\boldsymbol\pi\mathbf{P}&=\boldsymbol\pi \\
\sum_{i=0}^M\pi_i&=1
\end{align*}
</MathDisp>

<BodyText>
    (where <Math>\mathbf{P}</Math> is the transition matrix). In this case, that comes to
</BodyText>

<MathDisp>\boldsymbol\pi = \begin{bmatrix}
\frac{2}{13} & \frac{7}{13} & \frac{2}{13} & \frac{2}{13}
\end{bmatrix}
</MathDisp>
<BodyText>
    Then we just need to multiply <Math>\boldsymbol\pi</Math> by the vector of costs for entering each state, which we know from above is (in thousands of dollars).
</BodyText>

<MathDisp>\begin{bmatrix}0 & 1 & 3 & 6\end{bmatrix}
</MathDisp>
<BodyText>
    So the long-run average cost of this policy is
</BodyText>

<MathDisp>0\frac{2}{13} + 1\frac{7}{13} + 3\frac{2}{13} + 6\frac{2}{13} = \frac{25}{13}
</MathDisp>

<Heading level=3 refId=policyEnum>Enumerating policies</Heading>
<BodyText>
    The policy we examined above is considered a <em>stationary</em> policy, since it doesn't change regardless of the current time step <Math>t</Math>. Furthermore, it is considered <em>deterministic</em> since the decision in each state is set. One could imagine a policy where, say, in state 2 we flip a coin to decide between replacing the machine or doing nothing. We will consider such policies, called <em>randomized</em> policies, later.
</BodyText>
<BodyText>
    But for now, let's discuss how we might find the best possible stationary, deterministic policy for our example problem. Since the number of options is so small, we should be able to just list off all the possible policies and evaluate them one-by-one. To be clear, this is not generally a <em>good</em> way to optimize an MDP, as it is only tractable when there are a small number of states and possible actions. That caveat aside, let's jump to the following notebook to see how we might solve the example MDP by enumeration.
</BodyText>

<ColabGist
    colabId=1mDMv9JZAb7L5vOVHFirMlMdhjgv7bfvd
    gistId=0cdb94e0c2f8ae58b8f08994eef5f0e4
    refId=mdpEnumNotebook
    desc='Solving the example MDP with enumeration'
/>

<Heading level=3 refId=randomizedPolicies>Randomized policies</Heading>

<BodyText>
    The last section gave us a simple way to find the best stationary, deterministic policy for an MDP. But it is of limited usefulness, because most practical MDPs will have far too many policies for enumeration to be practical. For our next solution method, we'll need to extend our notion of a policy. In particular, we'll let our decision at any given state be <em>randomized</em>  i.e. the output of some random variable. So instead of making decision <Math>d_i\in\{1,2,...,K\}</Math> for each state <Math>i</Math>, we'll instead define probabilities <Math>D_{ik}</Math> for each state <Math>i\in\{0,1,...,M\}</Math> and <Math>k\in\{1,2,...,K\}</Math> such that
</BodyText>

<MathDisp>D_{ik}=\prob{\text{decision}=k|\text{state}=i}
</MathDisp>
<BodyText>
    Naturally, we can write this as a (not necessarily square) matrix
</BodyText>

<MathDisp>D=\begin{bmatrix}
D_{01} & D_{02} & \cdots & D_{0K} \\
D_{11} & D_{12} & \cdots & D_{1K} \\
\vdots & \vdots & \ddots & \vdots \\
D_{M1} & D_{M2} & \cdots & D_{MK}
\end{bmatrix}
</MathDisp>
<BodyText>
    and since these are probabilities, we'll need the values across each row to sum to 1, i.e.
</BodyText>

<MathDisp>\begin{align*}
\sum_{k=1}^KD_{ik} = 1 && \forall\ i\in\{0, 1, \dots, M\}
\end{align*}
</MathDisp>
<BodyText>
    Of course, the deterministic policies we've already seen can fit into this framework as well. Simply put a value of 0 in every entry of the matrix, except for if <Math>d_i=k</Math> then set <Math>D_{ik}=1</Math>. For example, the deterministic policy <Math>(1, 1, 2, 3)</Math> can be written as
</BodyText>

<MathDisp>D=\begin{bmatrix}
1 & 0 & 0 \\
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
</MathDisp>
<BodyText>
    In contrast, a randomized policy given by
</BodyText>

<MathDisp>D=\begin{bmatrix}
1 & 0 & 0 \\
\frac{1}{2} & 0 & \frac{1}{2} \\
\frac{1}{4} & \frac{1}{4} & \frac{1}{2} \\
0 & 0 & 1
\end{bmatrix}
</MathDisp>
<BodyText>
    will have you (randomly) splitting decisions in state 1 between doing nothing half the time and replacing half the time. Meanwhile, after finding yourself in state 2, you would do nothing a quarter the time, overhaul a quarter of the time, and replace half of the time.
</BodyText>

<Heading level=3 refId=mdpLp>Linear programming</Heading>
<BodyText>
    The introduction of randomized policies opens us up to a new solution method via linear programming. Our decision variables will relate to the <Math>D_{ik}</Math> quantities and are allowed to take on continuous values, making linear programming a possibility.
</BodyText>
<BodyText>
    But the decision variables won't <em>exactly</em> be the <Math>D_{ik}</Math> values, which you'll recall were conditional probabilities
</BodyText>

<MathDisp>D_{ik}=\prob{\text{decision}=k|\text{state}=i}
</MathDisp>
<BodyText>
    Instead, our variables <Math>y_{ik}</Math> will be <em>unconditional</em>  <em>joint</em> probabilities of the form
</BodyText>

<MathDisp>y_{ik}=\prob{\text{decision}=k,\text{state}=i}
</MathDisp>
<BodyText>
    That is, the steady-state proportion of time that the process is in state <Math>i</Math> <em>and</em> decision <Math>k</Math> is made. Of course, these values are linked to the <Math>D_{ik}</Math> values via the definition of conditional probability, since
</BodyText>

<div class="mathSmall">
<MathDisp>\begin{align*}
\prob{\text{decision}=k,\text{state}=i} &= \prob{\text{state}=i}\prob{\text{decision}=k|\text{state}=i} \\
&\Updownarrow \\
y_{ik}&=\pi_iD_{ik}
\end{align*}
</MathDisp>
</div>
<BodyText>
    where <Math>\pi_i</Math> is (as usual) the steady-state probability of being in state <Math>i</Math>. Note also that given a valid setting for the <Math>y_{ik}</Math> variables, we can immediately recover the <Math>D_{ik}</Math> values since
</BodyText>

<MathDisp>\begin{align*}
\pi_i&=\prob{\text{state}=i} \\
&=\sum_{k=1}^K\prob{\text{decision}=k,\text{state}=i} \\
&=\sum_{k=1}^Ky_{ik}
\end{align*}
</MathDisp>
<BodyText>
    So each <Math>D_{ik}</Math> will be calculated as
</BodyText>

<MathDisp>D_{ik} = \frac{y_{ik}}{\pi_i}
</MathDisp>
<BodyText>
    Given <Math>y_{ik}</Math> as our variables, what should the objective value be? We want to minimize the long-run average cost per unit time, which in terms of the variables would be written as:
</BodyText>

<MathDisp>\sum_{i=0}^M\sum_{k=1}^KC_{ik}y_{ik}
</MathDisp>
<BodyText>
    To make sure that the <Math>y_{ik}</Math> values imply a proper probability distribution, we need each <Math>y_{ik}\geq0</Math> and
</BodyText>

<MathDisp>\sum_{i=0}^M\sum_{k=1}^Ky_{ik}=1
</MathDisp>
<BodyText>
    We've yet to use any of the transition probability information though. For this, let's define the value <Math>p_{ij}(k)</Math> as the probability of transitioning from state <Math>i</Math> to state <Math>j</Math> when decision <Math>k</Math> is made, i.e.
</BodyText>

<MathDisp>p_{ij}(k)=\prob{\text{next state}=j|\text{current state}=i,\text{decision}=k}
</MathDisp>
<BodyText>
    In analogy to the regular steady-state condition <Math>\pi_j=\sum_{i=0}^M\pi_ip_{ij}</Math>, we have
</BodyText>

<MathDisp>\sum_{k=1}^Ky_{jk}=\sum_{i=0}^M\sum_{k=1}^Ky_{ik}p_{ij}(k)
</MathDisp>
<BodyText>
    Thus the LP formulation for determining the best randomized policy for an MDP is:
</BodyText>

<MathDisp>\begin{align*}
\min && \sum_{i=0}^M\sum_{k=1}^KC_{ik}y_{ik} \\
\st  && \sum_{i=0}^M\sum_{k=1}^Ky_{ik}&=1 \\
     && \sum_{k=1}^Ky_{jk} - \sum_{i=0}^M\sum_{k=1}^Ky_{ik}p_{ij}(k)&=0 & \forall\ j \in \{0,1,\dots,M\} \\
     && \y&\geq\zeros
\end{align*}
</MathDisp>

<Heading level=4 refId=mdpLpExSolve>Solving the example MDP with linear programming</Heading>
<BodyText>
    Let's go ahead and set up this LP for our example MDP. We need one <Math>y_{ik}</Math> variable for each allowable state/decision pair, meaning that the decision variables in this case are:
</BodyText>

<MathDisp>y_{01},\quad y_{11},\quad y_{13},\quad y_{21},\quad y_{22},\quad y_{23},\quad y_{33}
</MathDisp>
<BodyText>
    The associated costs <Math>C_{ik}</Math> come from the table at the end of <SectionRef refId=mdpExample/>. The <Math>p_{ij}(k)</Math> values come from the problem's initial transition matrix, plus the logic of the other decisions (an overhaul takes you to state 1 with probability 1, and a replacement takes you to state 0 with probability 1). So the formulation becomes:
</BodyText>

<MathDisp>\begin{align*}
\min && y_{11} + 6y_{13} + 3y_{21} + 4y_{22} + 6y_{23} + 6y_{33} \\
\st  && y_{01} + y_{11} + y_{13} + y_{21} + y_{22} + y_{23} + y_{33} &= 1 \\
     && y_{01} - \left( y_{13} + y_{23} + y_{33} \right) &= 0 \\
     && y_{11} + y_{13} - \left( \frac{7}{8}y_{01} + \frac{3}{4}y_{11} + y_{22} \right) &= 0 \\
     && y_{21} + y_{22} + y_{23} - \left(\frac{1}{16}y_{01} + \frac{1}{8}y_{11} + \frac{1}{2}y_{21} \right) &= 0 \\
     && y_{33} - \left( \frac{1}{16}y_{01} + \frac{1}{8}y_{11} + \frac{1}{2}y_{21}\right) &=0 \\
     && y_{01}, y_{11}, y_{13}, y_{21}, y_{22}, y_{23}, y_{33} &\geq 0
\end{align*}
</MathDisp>
<BodyText>
    Let's take this formulation and solve it in the following Colab notebook.
</BodyText>

<ColabGist
    colabId=1KhUxTsZRDs5p0hYWNhI_bHr82xF5o_Dd
    gistId=fb2c8258644bbd271faaeacefa9daa03
    refId=mdpLpSolve
    desc='Solving the example MDP with linear programming'
/>

<Heading level=4 refId=mdpLpExAnalysis>Analyzing the solution</Heading>
<BodyText>
    After solving the problem in the above notebook, we find that the <Math>D_{ik}</Math> values (given in matrix form) are:
</BodyText>

<MathDisp>D=\begin{bmatrix}
1 & 0 & 0 \\
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
</MathDisp>
<BodyText>
    So it seems that the best randomized policy is actually a deterministic policy as well! It turns out that this is not a coincidence. Let's examine the formulation we created. It contains <Math>M+2</Math> constraints, but actually (for the same reason as we saw when calculating steady-state probabilities in <SectionRef refId=markovSteadyState/>) one of these constraints will be redundant. So in effect the model has only <Math>M+1</Math> rows. This means that when the problem is solved via the simplex method, there can be only <Math>M+1</Math> variables with non-zero values. Furthermore, it can be shown<Footnote>We won't work through it, but it will follow from the fact that we assumed the induced probability matrices were all irreducible.</Footnote> that for any <Math>i</Math>, <Math>y_{ik}>0</Math> must hold for some <Math>k</Math>.
</BodyText>
<BodyText>
    The end result is that for each state <Math>i</Math>, exactly one decision <Math>k</Math> will have <Math>y_{ik}>0</Math>. Thus <Math>\pi_i=y_{ik}</Math> for that <Math>k</Math>, meaning that <Math>D_{ik}=y_{ik}/\pi_i=1</Math> for that <Math>k</Math> and 0 for all other decisions. In other words, any policy obtained via the simplex method will be a deterministic one. This means that allowing randomized policies cannot improve the long-run cost per unit time, which is an interesting result.
</BodyText>

<BodyText>
    Before we wrap up the section, it should be noted that this LP method (while better than full enumeration) is not generally the most efficient way to solve large MDPs. We'll see a better method while talking about reinforcement learning.
</BodyText>

<Heading level=3 refId=mdpExampleNotebook>Another example</Heading>

<BodyText>
    In the following notebook, we work through another example MDP (taken from <CitationRef refId=classText/>).
</BodyText>

<ColabGist
    colabId=1KhUxTsZRDs5p0hYWNhI_bHr82xF5o_Dd
    gistId=fb2c8258644bbd271faaeacefa9daa03
    refId=anotherMdpExample
    desc='Working another MDP example'
/>