<script lang="ts">
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

    import queueSystemDiagram from "$lib/images/queue-system-diagram.png";
    import birthDeathDiagram from "$lib/images/birth-death-diagram.png";
</script>

<Heading level=2 refId=queueingTheory>Queueing theory</Heading>

<BodyText>
    The next area of stochastic processes we will study is <em>queueing theory</em>  which you could call the study of waiting in lines. The models we see here could be seen as a special class of (continuous-time) Markov chains, but the theory is well-developed outside of that formalism, so we won't be referring back to our Markov chain chapter here.
</BodyText>
<BodyText>
    Perhaps studying people standing in lines sounds like it would not be of much use - but actually, this is pretty practical! It is of course applicable to customer services of all types, and several Edelman prizes have been won by queueing applications (see for example [here](https://pubsonline.informs.org/doi/10.1287/inte.6.1pt2.4) and [here](https://pubsonline.informs.org/doi/10.1287/inte.24.1.6)).<CitationRef refId=classText/> highlights several other examples in section 17.3
</BodyText>

<Heading level=3 refId=queueExample>Initial example</Heading>
<BodyText>
    Let's now describe our prototype queueing problem, as stated by<CitationRef refId=classText/>:
</BodyText>

<BlockQuote>
    <BodyText>
        The emergency room of COUNTY HOSPITAL provides quick medical care for emergency cases brought to the hospital by ambulance or private automobile. At any hour there is always one doctor on duty in the emergency room. However, because of a growing tendency for emergency cases to use these facilities rather than go to a private physician, the hospital has been experiencing a continuing increase in the number of emergency room visits each year. As a result, it has become quite common for patients arriving during peak usage hours (the early evening) to have to wait until it is their turn to be treated by the doctor. Therefore, a proposal has been made that a second doctor should be assigned to the emergency room during these hours, so that two emergency cases can be treated simultaneously. The hospital’s management engineer has been assigned to study this question.
    </BodyText>
    <BodyText>
        The management engineer began by gathering the relevant historical data and then projecting these data into the next year. Recognizing that the emergency room is a queueing system, she applied several alternative queueing theory models to predict the waiting characteristics of the system with one doctor and with two doctors, as you will see in the latter sections of this chapter.
    </BodyText>
</BlockQuote>

<Heading level=3 refId=queueBasics>Queueing basics</Heading>
<BodyText>
    The basic mechanics behind a queueing system are that customers arrive to some system and wait in line for service, with the time between arrivals being determined by some random process. There might be one or several lines to choose from. The customer at the front receives a service, and the service time is also a random variable. The goal for an analysis is to determine any number of possible performance metrics - how long customers stay in the system, what percentage of time they are waiting in line, how long the lines are on average, etc.
</BodyText>
<BodyText>
    Customers to a service are assumed to arrive from the so-called <em>input source</em> or <em>calling population</em>  An important characteristic of the input source is its <em>size</em>  which is essentially the maximum potential number of customers that may require service. The most important distinction is whether the size if <em>finite</em> or <em>infinite</em> (a.k.a. <em>limited</em> or <em>unlimited</em>). An assumed infinite input source may sound unrealistic, but it makes the math much easier and is a good approximation for a very large (but finite) calling population that is exceedingly unlikely to all show up for service all at once.
</BodyText>
<BodyText>
    The process by which customers arrive to the system is called the <em>arrival process</em>  Most often we will assume that the process generating customers is a Poisson process, i.e. the number of customers arriving within a given time period follows a Poisson distribution. It turns out that this is equivalent to saying that the times between consecutive arrivals (also called the <em>interarrival times</em>) follow an exponential distribution. Both of these distributions are well known, and we'll talk more about them in <SectionRef refId=exponentialPoissonDistributions/>.
</BodyText>
<BodyText>
    The <em>queue</em> is where customers wait before receiving service. We may sometimes assume that the queue is <em>finite</em>  so that only a certain number of customers can be in line at the same time. Other times we'll not assume any such cap, so that the size of the queue is <em>infinite</em>  As was the case with the calling population, assuming an infinite queue may not be technically justifiable, but it can simplify the math quite a bit, and not change the answers too much in certain circumstances (where the actual finite maximum will almost certainly never be reached).
</BodyText>
<BodyText>
    We may also sometimes speak about the so-called <em>queue discipline</em>  which refers to the order in which members of the queue are selected for service. A common assumption is a <em>first-in-first-out</em> (or <em>first-come-first-served</em>) discipline, such that the customer that has been in the queue for the longest amount of time is the next customer serviced.
</BodyText>
<BodyText>
    Services in the system occur at one or more <em>service facilities</em>  each of which contains one or more parallel service channels, called <em>servers</em>  In most basic queueing scenarios you will see only one service facility, with a finite number of servers (often only one). If there is more than one service facility, the customer may receive service from a sequence of these.
</BodyText>
<BodyText>
    At a given facility, the customer enters one of the parallel service channels and is completely serviced by that server. The time elapsed from the beginning to the end of service is called the <em>service time</em>  Quite often, service times are also assumed to come from an exponential distribution.
</BodyText>
<BodyText>
    As is evident from the preceding discussion, queueing systems can take on several forms. But the most common (and the one we'll focus on in this course) is described succinctly below by<CitationRef refId=classText/>:
</BodyText>

<BlockQuote>
    <BodyText>
        A single waiting line (which may be empty at times) forms in the front of a single service facility, within which are stationed one or more servers. Each customer generated by an input source is serviced by one of the servers, perhaps after some waiting in the queue (waiting line).
    </BodyText>
</BlockQuote>
<BodyText>
    The following image depicts this scenario:
</BodyText>

<Figure refId="queueSystemDiagram">
    <img src={queueSystemDiagram} alt="Queue system diagram" />
    <span slot=caption>Customers (C) and servers (S) in a queueing system <CitationRef refId=classText/></span>
</Figure>

<BodyText>
    When talking about a queueing system, the <em>state</em> of the system is the <em>total</em> number of customers in the queueing system. This is in contrast to the <em>queue length</em>  which is the number of customers waiting for service to begin. So the state of the system is the queue length <em>plus</em> the number of customers currently being served. In the above image, there are 11 total customers. Four of these customers (standing opposite the servers) are currently receiving service, while the other seven are in the queue. Thus the state of the system is 11, while the queue length is 7.
</BodyText>
<BodyText>
    Finally, it is worth noting that although the language we generally use conjures up images of people standing one behind another while an employee at the front deals with their needs one by one, there not need be any actual people or physical lines involved. The customers need not be people but instead any kind of product or item that might require work. Similarly, the servers may be machines instead of humans. And there may be no actual lines at all, perhaps just a "virtual queue" of callers waiting for the next available call-center representative.
</BodyText>

<Heading level=3 refId=exponentialPoissonDistributions>Exponential and Poisson distributions</Heading>
<BodyText>
    In queueing systems, there are two places where randomness comes into play: in determining the service times and interarrival times. In real life, the distributions governing these processes could take on many forms. But, as we've mentioned, in much of queueing theory we assume these numbers are pulled independently from an exponential distribution. The reason for this is two-fold: The first reason is that the form of the exponential distribution gives it several nice properties that we're about to explore, and these properties make our calculations fairly simple. The second reason is that several real-life processes have been shown to follow distributions closely approximating an exponential distribution<Footnote>[This old paper](https://geodesy.noaa.gov/library/pdfs/C&GS_TB_0017.pdf) discusses how closely the interarrival times for earthquakes match the exponential distribution.</Footnote>.
</BodyText>

<BodyText>
    Suppose a continuous random variable <Math>T</Math> represents the time between two consecutive events of some kind. <Math>T</Math> is said to have an <em>exponential distribution</em> with parameter <Math>\alpha</Math> if its PDF is given by:
</BodyText>

<MathDisp>f_T(t)=\begin{cases}
\alpha e^{-\alpha t} && t\geq0\\
0 && t<0
\end{cases}
</MathDisp>
<BodyText>
    Then the CDF is
</BodyText>

<MathDisp>F_T(t)=\prob{T\leq t}=\begin{cases}
1 - e^{-\alpha t} && t\geq0\\
0 && t<0
\end{cases}
</MathDisp>
<BodyText>
    and <Math>T</Math>'s expectation and variance are:
</BodyText>

<MathDisp>\E{T}=\frac{1}{\alpha} \qquad \Var{T}=\frac{1}{\alpha^2}
</MathDisp>
<BodyText>
    Beyond this, there are several properties of the exponential distribution worth mentioning.
</BodyText>

<Heading level=4 refId=exponMemoryless>Memorylessness</Heading>
<BodyText>
    The most famous property of the exponential distribution is the so-called <em>memorylessness property</em>  Mathematically, this means that for any positive quantities <Math>t,s>0</Math>, we have
</BodyText>

<MathDisp>\prob{T>t+s|T>t}=\prob{T>s}
</MathDisp>
<BodyText>
    In words, this is saying that the probability of waiting for <Math>s</Math> more seconds after having already waited for <Math>t</Math> seconds, is the same as the probability would have been to wait <Math>s</Math> seconds at the start. There's no mystery mathematically why this occurs, since (using the definition of conditional probability <EquationRef refId=conditionalProbability/>) we have<Footnote>You'll notice that I'm being a little sloppy with notation here. Instead of writing <Math>\prob{\{T>t+s\}\cap\{T>t\}}</Math>, I'm going to use the more succinct <Math>\prob{T>t+s,\ T>t}</Math>.</Footnote>:
</BodyText>


<MathDisp>\begin{align*}
\prob{T>t+s|T>t}&=\frac{\prob{T>t+s,\ T>t}}{\prob{T>t}}\\
&=\frac{\prob{T>t+s}}{\prob{T>t}}\\
&=\frac{e^{-\alpha(t + s)}}{e^{-\alpha t}}\\
&=\frac{e^{-\alpha t - \alpha s}}{e^{-\alpha t}}\\
&=e^{-\alpha s}\\
&=\prob{T>s}
\end{align*}
</MathDisp>
<BodyText>
    But it does feel a little strange, right? In a lot of situations, there is an impulse to think that if you've been waiting on something for a long time, surely it must be happening soon. But that's not the case here. At the moment one event occurs, the expected time until the next event is going to be <Math>\frac{1}{\alpha}</Math>. This property then tells us that, if we've already waited for <Math>t</Math> seconds (no matter how large <Math>t</Math> is), the expected <em>extra</em> time to wait is still <Math>\frac{1}{\alpha}</Math>!
</BodyText>
<BodyText>
    This really is a profoundly strange property, and I think it goes towards describing the situations in which an exponential distribution is a good vs. a bad approximation. To me, I'm more accepting of this property when it comes to customer interarrival times, since there is not reason for individual customer actions to be related to each other. I feels it's more questionable for service times, since in many scenarios the nature of the service is such that it should take about the same amount of time for each customer. But sometimes the service time is dependent on characteristics of the customer, in which case the property can seem more reasonable.
</BodyText>

<Heading level=4 refId=exponMinimum>The minimum of exponentials is exponential</Heading>
<BodyText>
    Let <Math>T_1,T_2,\dots,T_n</Math> be independent exponential random variables with parameters <Math>\alpha_1,\alpha_2,\dots,\alpha_n</Math>. Let <Math>U</Math> be the random variable equal to the minimum of the <Math>T_j</Math> variables, i.e.
</BodyText>

<MathDisp>U=\min\{T_1,T_2,\dots,T_n\}
</MathDisp>
<BodyText>
    In other words, if <Math>T_1,T_2\dots T_n</Math> are the times until each of <Math>n</Math> separate events occur, then <Math>U</Math> is the time until the <em>first</em> of these <Math>n</Math> events occur. Now, let's notice that
</BodyText>

<div class='mathSmall'>
<MathDisp refId=minExponentials>\begin{align*}
\prob{U>t}&=\prob{T_1>t,\ T_2>t,\ \dots,\ T_n>t}&&\text{(def. of min)} \\
&=\prob{T_1>t}\prob{T_2>t}\dots\prob{T_n>t}&&\text{(independence)} \\
&=e^{-\alpha_1t}e^{-\alpha_2t}\dots e^{-\alpha_3t} &&(1 - \text{CDF)} \\
&=e^{-t\sum_{i=1}^n\alpha_i}
\end{align*}
</MathDisp>

</div>
<BodyText>
    So the distribution of <Math>U</Math> is the distribution of an exponential random variable with parameter <Math>\alpha=\sum_{i=1}^n\alpha_i</Math>. This is particularly useful to us in the case that a queueing systems includes several servers with exponential service times. If all the servers are busy, then the system works mathematically just like a single-server system with an exponential rate <Math>\alpha</Math>.
</BodyText>
<BodyText>
    This property also makes it easy to determine probabilities for which of the <Math>T_j</Math> variables end up being the minimum. We won't give the full derivation, but the end result is
</BodyText>

<MathDisp>\prob{T_j=U}=\frac{\alpha_j}{\sum_{i=1}^n\alpha_i}
</MathDisp>
<BodyText>
    for every <Math>j</Math>.
</BodyText>

<Heading level=4 refId=poissonDist>Poisson distribution</Heading>
<BodyText>
    Suppose the time between consecutive events (like arrivals to a queueing system) has an exponential distribution with parameter <Math>\alpha</Math>. Suppose we'd like to know about the number of events that occur within a certain amount of time. To that end, we'll define the random variable <Math>X(t)</Math> to be the number of events that occur between time <Math>0</Math> (when the timing begins) and time <Math>t</Math>. It turns out that <Math>X(t)</Math> will have a <em>Poisson distribution</em>  with its rate parameter equal to <Math>\alpha t</Math>. So the relevant probabilities are:
</BodyText>

<MathDisp>\prob{X(t)=n}=\frac{(\alpha t)^ne^{-\alpha t}}{n!}
</MathDisp>
<BodyText>
    with expectation
</BodyText>

<MathDisp>\E{X(t)}=\alpha t
</MathDisp>
<BodyText>
    One example of the relationship can be seen by noting that the probability of no arrivals by time <Math>t</Math> is given by:
</BodyText>

<MathDisp>\prob{X(t)=0}=e^{-\alpha t}
</MathDisp>
<BodyText>
    Notice that this is also the probability of an exponential random variable (with rate <Math>\alpha</Math>) being greater than <Math>t</Math>, which of course is just another way of describing the same event.
</BodyText>
<BodyText>
    We can also imagine a (continuous time) stochastic process consisting of the collection of random variables <Math>\{X(t), t\geq0\}</Math>. When <Math>X(t)</Math> has a Poisson distribution, we call the stochastic process a <em>Poisson process</em> 
</BodyText>

<Heading level=3 refId=queueNotation>Notation</Heading>
<BodyText>
    Let's now go rapid-fire through some notation we'll be using.
    <ul>
        <li><Math>N(t)</Math>: The state of (or, number of customers in) the queueing system at time <Math>t>0</Math>.</li>
        <li><Math>P_n(t)</Math>: The probability of exactly <Math>n</Math> customers in the queueing system at time <Math>t</Math>.</li>
        <li><Math>s</Math>: The number of servers (parallel service channels) in the queueing system.</li>
        <li><Math>\lambda_n</Math>: The mean arrival rate (expected number of arrivals per unit time) of new customers when <Math>n</Math> customers are in the system.</li>
        <li><Math>\lambda</Math>: If <Math>\lambda_n</Math> is constant over all <Math>n</Math>, then we'll just denote the mean arrival rate as <Math>\lambda</Math>. In this case, the mean/expected interarrival time is <Math>\frac{1}{\lambda}</Math>.</li>
        <li><Math>\mu_n</Math>: The mean service rate for the overall system when in state <Math>n</Math> (i.e. the expected number of customers completing service per unit time when <Math>n</Math> customers are in the system). This is a combined rate including all busy servers.</li>
        <li><Math>\mu</Math>: When the mean service rate <em>per busy server</em> is constant for all <Math>n</Math>, we'll denote this constant by <Math>\mu</Math>. (In this case, <Math>\mu_n=s\mu</Math> when <Math>n\geq s</Math>, that is, when all s servers are busy.) When <Math>\mu</Math> exists, the mean/expected service time per server is <Math>\frac{1}{\mu}</Math>.</li>
        <li><Math>\rho</Math>: In the above conditions where <Math>\lambda</Math> and <Math>\mu</Math> are defined, <Math>\rho=\frac{\lambda}{s\mu}</Math> is known as the <em>utilization factor</em> of the for the service facility, i.e., the expected fraction of time the individual servers are busy, because <Math>\rho</Math> represents the fraction of the system’s service capacity (<Math>s\mu</Math>) that is being utilized on the average by arriving customers (<Math>\lambda</Math>).</li>
    </ul>
</BodyText>

<Heading level=3 refId=queueSteadyState>Queues in steady state</Heading>

<BodyText>
    There is also certain notation that is used to describe a queueing system in so-called <em>steady-state</em> conditions. Just like we saw with Markov chains in <SectionRef refId=markovSteadyState/>, over time state probabilities for a queueing system approximate a certain steady-state distribution that we'd like to analyze. For systems with infinite queue size, steady-state conditions do not exist in the unusual condition that <Math>\rho>1</Math>, i.e. <Math>\lambda > s\mu</Math> and thus customers arrive to the system faster than they can receive service (and the queue just continues to grow over time). Otherwise, we'll use the following notation to talk about queues in a steady-state condition:
    <ul>
        <li><Math>P_n</Math>: The probability of having exactly <Math>n</Math> customers in the queueing system.</li>
        <li><Math>L</Math>: The expected number of customers in the queueing system. Note that this can be stated as
            <MathDisp>  L=\sum_{n=0}^\infty nP_n
            </MathDisp></li>
        <li><Math>L_q</Math>: The expected queue length (the number of customers in the system, but excluding the customers currently being served). This can be written as:
            <MathDisp>  L_q=\sum_{n=s}^\infty (n-s)P_n
            </MathDisp></li>
        <li><Math>W</Math>: The expected waiting time for a customer in the system (includes service time).</li>
        <li><Math>W_q</Math>: The expected waiting time in the queue only (excludes service time).</li>
    </ul>
</BodyText>

<BodyText>
    There are some very intuitive relationships between these steady-state quantities (which we will present here without proof). This first one is known as <em>Little's law</em>  and applies in systems where <Math>\lambda</Math> is defined (i.e. the arrival rate is constant for the entire process)<Footnote>If the <Math>\lambda_n</Math> are not constant, there is a similar version of Little's law where <Math>\lambda</Math> is replaced by a long-run <em>average</em> arrival rate.</Footnote>:
</BodyText>


<MathDisp>L=\lambda W
</MathDisp>
<BodyText>
    and similarly:
</BodyText>

<MathDisp>L_q=\lambda W_q
</MathDisp>
<BodyText>
    If we further assume that the mean service time is a constant <Math>\frac{1}{\mu}</Math> for all n, then we also have
</BodyText>

<MathDisp>W=W_q + \frac{1}{\mu}
</MathDisp>
<BodyText>
    Notice that if these relationships hold, it is possible to calculate all four of the steady-state quantities <Math>L, L_q, W, W_q</Math> whenever just <em>one</em> of them is known.
</BodyText>

<Heading level=3 refId=birthDeathProcess>The birth-and-death process</Heading>
<BodyText>
    Let's now set up and analyze our first queueing system. The setup here is not in the usual language of queueing theory, but the framework will encompass many different types of queues, and we'll use the results from here to derive results for the queues we do study.
</BodyText>
<BodyText>
    Naturally, this will be a very simple system, albeit with a (in my estimation) rather crude and gruesome name<Footnote>Naturally this name wasn't my doing - it is an entrenched part of probability theory at this point. Perhaps you can call it "the queue of life."</Footnote>. The "birth" part of the name just refers to customers entering the queuing system, and the "death" part to customers receiving service and leaving. As usual, the state of the system at time <Math>t</Math> will be denoted as <Math>N(t)</Math>. There are a few things to know about the <em>birth-and-death process</em>
    <ul>
        <li>Given <Math>N(t)=n</Math>, the time until the next birth (arrival) is determined by an exponential random variable with parameter <Math>\lambda_n</Math>.</li>
        <li>Given <Math>N(t)=n</Math>, the time until the next death (service completion) is determined by an exponential random variable with parameter <Math>\mu_n</Math>.</li>
        <li>The above two random variables are independent of each other.</li>
        <li>The next transition in the state of the process is either <Math>n \rightarrow n + 1</Math> (a single birth) or <Math>n \rightarrow n - 1</Math> (a single death), depending on which random variable is smaller.</li>
    </ul>
</BodyText>

<BodyText>
    The following figure, called the <em>rate diagram</em>  provides a visualization of the process:
</BodyText>

<Figure refId="birthDeathDiagram">
    <img src={birthDeathDiagram} alt="Birth-death diagram" />
    <span slot=caption>Rate diagram for the birth-and-death process <CitationRef refId=classText/></span>
</Figure>
<BodyText>
    You'll notice we haven't specifically made mention of any queues or servers. These are not core concepts for the birth-and-death process, but they will be making an appearance soon.
</BodyText>
<BodyText>
    As with most queueing systems, it can be difficult to derive meaningful analyses for the birth-and-death process in transient state (i.e. not steady-state). So we'll focus on results for steady-state birth-and-death processes below, and in particular we want to find the steady-state probability <Math>P_n</Math> of finding the process in state <Math>n\in\{0,1,\dots\}</Math>.
</BodyText>
<BodyText>
    Consider any state <Math>n\in\{0,1,\dots\}</Math>. Let <Math>E_n(t)</Math> and <Math>L_n(t)</Math> track the following quantities:
    <ul>
        <li><Math>E_n(t)</Math>: The number of times that the process enters state <Math>n</Math> by time <Math>t</Math>.</li>
        <li><Math>L_n(t)</Math>: The number of times that the process leaves state <Math>n</Math> by time <Math>t</Math>.</li>
    </ul>
</BodyText>

<BodyText>
    Since any transition <em>to</em> state <Math>n</Math> is followed immediately by a transition <em>out</em> of state <Math>n</Math> (to either <Math>n+1</Math> or <Math>n-1</Math>), it follows that <Math>E_n(t)</Math> and <Math>L_n(t)</Math> will always either be equal or differ by at most one, i.e.
</BodyText>

<MathDisp>\left|E_n(t)-L_n(t)\right|\leq1
</MathDisp>
<BodyText>
    We'd like to talk about the <em>rates</em> (per unit time) at which the process enters or leaves the state. To that end, let's divide both sides by <Math>t</Math>:
</BodyText>

<MathDisp>\left|\frac{E_n(t)}{t}-\frac{L_n(t)}{t}\right|\leq\frac{1}{t}
</MathDisp>
<BodyText>
    Then take a limit on both sides:
</BodyText>

<MathDisp>\lim_{t\rightarrow\infty}\left|\frac{E_n(t)}{t}-\frac{L_n(t)}{t}\right|=0
</MathDisp>
<BodyText>
    What we have here is then a statement about the <em>average rate</em> at which the process enters or exits a given state. The main result is that these quantities must be equal, i.e. the mean rate of entering a state must equal the mean rate of leaving a state (in the long run).
</BodyText>
<BodyText>
    Let's think about what this means for, say, the state <Math>n=0</Math>. The long-run rate at which the process leaves state 0 must clearly be related to <Math>\lambda_0</Math> (the rate at which births occur while in state 0) since a birth in state 0 is the only way to leave state 0. But <Math>\lambda_0</Math> is the average rate at which state 0 is left <em>if the process is currently in state 0</em>  and since the process if often (usually?) in a different state, <Math>\lambda_0</Math> can't be the overall rate at which state 0 is left.
</BodyText>
<BodyText>
    So to find the quantity we want, we need to know <Math>P_n</Math>, the (steady-state) proportion of time that the process is actually <em>in</em> state 0. During those times, the rate of exiting is <Math>\lambda_0</Math>, but during all other times the rate is 0. So the overall rate of exit state 0 is <Math>\lambda_0P_0 + 0(1-P_0)=\lambda_0P_0</Math>.
</BodyText>
<BodyText>
    Similarly, the overall rate of entering state 0 (which may only occur via a death in state 1) is <Math>\mu_1P_1</Math>. So our above observation (about the overall rates of entering and leaving being equal) would imply the following <em>balance equation</em> for state 0:
</BodyText>

<MathDisp refId=balanceState0>\mu_1P_1=\lambda_0P_0
</MathDisp>

<BodyText>
    For all other states (<Math>n\in\{1,2,\dots\}</Math>) there are <em>two</em> ways to enter or exit a state, to/from states <Math>n-1</Math> and <Math>n+1</Math>. So the balance equations for these states are
</BodyText>

<MathDisp>\lambda_{n-1}P_{n-1}+\mu_{n+1}P_{n+1}=(\lambda_n+\mu_n)P_n
</MathDisp>
<BodyText>
    Let's go ahead and write out the first few balance equations:
</BodyText>

<MathDisp>\begin{align*}
\mu_1P_1&=\lambda_0P_0 \\
\lambda_{0}P_{0}+\mu_{2}P_{2}&=(\lambda_1+\mu_1)P_1 \\
\lambda_{1}P_{1}+\mu_{3}P_{3}&=(\lambda_2+\mu_2)P_2 \\
\lambda_{2}P_{2}+\mu_{4}P_{4}&=(\lambda_3+\mu_3)P_3 \\
&\ \ \vdots
\end{align*}
</MathDisp>
<BodyText>
    How can we solve for the <Math>P_n</Math> values? Let's start with the first equation, with <Math>P_0</Math> and <Math>P_1</Math> terms. We can take this and write <Math>P_1</Math> in terms of <Math>P_0</Math>:
</BodyText>

<MathDisp>P_1 = \frac{\lambda_0}{\mu_1}P_0
</MathDisp>
<BodyText>
    The second equation has terms for <Math>P_0, P_1</Math>, and <Math>P_2</Math>. So we can write <Math>P_2</Math> in terms of <Math>P_1</Math> and <Math>P_0</Math> like this:
</BodyText>

<MathDisp>\begin{align*}
P_{2}&=\frac{(\lambda_1+\mu_1)P_1 - \lambda_0P_0}{\mu_2} \\
&=\frac{\lambda_1P_1+\mu_1P_1-\lambda_0P_0}{\mu_2}
\end{align*}
</MathDisp>
<BodyText>
    Further, by the first balance equation <EquationRef refId=balanceState0/> we know that <Math>\mu_1P_1-\lambda_0P_0=0</Math>. So the above reduces to
</BodyText>

<MathDisp>P_2=\frac{\lambda_1}{\mu_2}P_1
</MathDisp>
<BodyText>
    Lastly, since we know what <Math>P_1</Math> is in terms of <Math>P_0</Math>, we can sub that in here and write:
</BodyText>

<MathDisp>P_2=\frac{\lambda_1\lambda_0}{\mu_2\mu_1}P_0
</MathDisp>
<BodyText>
    This result will generalize. For example, the next balance equation is written in terms of <Math>P_3, P_2</Math> and <Math>P_1</Math>. We could clearly rearrange it to see what <Math>P_3</Math> equals in terms of <Math>P_2</Math> and <Math>P_1</Math>. From there, we can use the above two results to replace <Math>P_1</Math> by <Math>\frac{\lambda_0}{\mu_1}P_0</Math> and <Math>P_2</Math> by <Math>\frac{\lambda_1\lambda_0}{\mu_2\mu_1}P_0</Math>, so that we have <Math>P_3</Math> written entirely in terms of <Math>P_0</Math>. Going through this process would yield.
</BodyText>

<MathDisp>P_3=\frac{\lambda_2\lambda_1\lambda_0}{\mu_3\mu_2\mu_1}P_0
</MathDisp>
<BodyText>
    As it turns out, we can repeat this process no matter which <Math>n</Math> we choose, so we have<Footnote>You've likely seen this before, but just in case you haven't, this <Math>\prod</Math> notation is to products what the <Math>\sum</Math> notation is to sums. So, e.g.
        <MathDisp>
            \prod_{i=0}^n x_n = x_0\cdot x_1\cdot...\cdot x_n
        </MathDisp>
    </Footnote>:
</BodyText>

<MathDisp refId=pnFromP0>P_n=P_0\prod_{k=1}^n\frac{\lambda_{k-1}}{\mu_{k}}
</MathDisp>

<BodyText>
    What good does that do us? Well, since <Math>P</Math> is a probability distribution we must have <Math>\sum_{n=0}^1P_n=1</Math>. So we've reduced the entire set of balance equations to the single (infinite) sum:
</BodyText>

<MathDisp refId=birthDeathSteadyStateProb>P_0\sum_{n=1}^\infty\prod_{k=1}^n\frac{\lambda_{k-1}}{\mu_{k}}=1
</MathDisp>

<BodyText>
    It might not look like it yet, but this is actually quite the improvement! Depending on the assumptions made on the <Math>\mu_n</Math> and <Math>\lambda_n</Math> values, this summation may well have an analytical solution, allowing us to recover the <Math>P_n</Math> probabilities. We will see some examples of this soon.
</BodyText>
<BodyText>
    Once the steady-state probabilities are determined, we will then be able to calculate the other important steady-state quantities from <SectionRef refId=queueSteadyState/>, namely <Math>L,L_q,W</Math>, and <Math>W_q</Math>. As we've already seen, the number of customers in the system and in the queue are calculated as:
</BodyText>

<MathDisp refId=birthDeathL>
    L=\sum_{n=0}^\infty nP_n \qquad L_q=\sum_{n=s}^\infty (n-s) P_n
</MathDisp>

<BodyText>
    Once we have these values, the average waiting times are calculated as
</BodyText>

<MathDisp refId=birthDeathW>
    W=\frac{L}{\bar\lambda} \qquad W_q=\frac{L_q}{\bar\lambda}
</MathDisp>

<BodyText>
    where <Math>\bar\lambda</Math> is the <em>average</em> arrival rate, calculated as
</BodyText>

<MathDisp>\bar\lambda=\sum_{n=0}^\infty \lambda_nP_n
</MathDisp>
<BodyText>
    Once again, even though some of these calculations involve infinite sums, in many situations we will be able to derive the exact values using infinite series results from calculus.
</BodyText>
<BodyText>
    A technical note before we move on: the above result is for the steady-state probabilities of the birth-and-death process. But we should note that not every birth-and-death process is guaranteed to ever reach a steady state. Luckily, we do know some conditions where a steady state is guaranteed to exist. Firstly, if <Math>\lambda_n=0</Math> for some value of <Math>n</Math> higher than the initial state (so that there are only a finite number of possible states) then the steady-state results are valid. Another condition (which we will make use of shortly) is when <Math>\lambda</Math> and <Math>\mu</Math> exist (i.e. the arrival and service rates are constant) and <Math>\rho=\lambda/s\mu<1</Math> (so that arrivals do not come faster than services complete).
</BodyText>

<Heading level=3 refId=mmsQueues><Math>M/M/s</Math> queues</Heading>

<BodyText>
    Finally, we're able to talk about our first general class of queueing models! The <Math>M/M/s</Math> name comes from a queueing theory convention where the models are named according to the scheme <Math>x/y/z</Math>, where <Math>x</Math> is the interarrival time distribution, <Math>y</Math> is the service time distribution, and <Math>z</Math> is the number of servers. The <Math>M</Math> in the name stands for "Markovian", signifying that the distribution has the Markovian, memorylessness property - that is, that the interarrival and service time distributions are exponential. The number of servers in the system is denoted by some integer <Math>s\geq1</Math>.
</BodyText>
<BodyText>
    Since the interarrival and service times are exponential random variables, the <Math>M/M/s</Math> queue is a special case of the birth-and-death process, where the process' arrival rate <Math>\lambda</Math> and service rate per server <Math>\mu</Math> are constants. In particular, the birth rates are all the same, <Math>\lambda_n=\lambda</Math> for all <Math>n</Math>.
</BodyText>
<BodyText>
    The values for <Math>\mu</Math> are not quite as simple, though. If <Math>s=1</Math> then the situation is as above for <Math>\lambda</Math>, that <Math>\mu_n=\mu</Math> for all <Math>n</Math>. But this is not the case for <Math>s>1</Math>, since <Math>\mu_n</Math> is the rate of deaths for the <em>entire systems</em> whereas <Math>\mu</Math> is the service rate <em>at each server</em>  But we actually already know how to handle that, thanks to something we learned in <SectionRef refId=exponentialPoissonDistributions/>. In particular, for the <Math>M/M/s</Math> queue the death rates are
</BodyText>

<MathDisp>\mu_n=\begin{cases}
n\mu && n\leq s \\
s\mu && n>s
\end{cases}
</MathDisp>
<BodyText>
    Why? This is due to what we saw in <EquationRef refId=minExponentials/>, that the minimum of <Math>n</Math> exponential random variables is itself an exponential random variable, with rate <Math>\alpha=\alpha_1+\alpha_2+\dots+\alpha_n</Math>. In this case, a death occurs in the process whenever the first service is completed, so the result fits.
</BodyText>
<BodyText>
    As mentioned earlier, so long as <Math>s\mu>\lambda</Math> the steady-state results we derived in <SectionRef refId=birthDeathProcess/> will hold. As we will show, those earlier infinite sums become tractable in the case of <Math>M/M/s</Math> queues. Let's go ahead and see how the results shake out, starting with <Math>M/M/1</Math> queues then transitioning to <Math>s>1</Math>.
</BodyText>

<Heading level=4 refId=mm1Results>Results for the <Math>M/M/1</Math> queue</Heading>
<BodyText>
    For the single-server case, we have constant rates <Math>\lambda_n=\lambda</Math>, <Math>\mu_n=\mu</Math> for all <Math>n</Math>. To solve for the steady-state probabilities, we go back to the equation for <Math>P_0</Math> derived in <EquationRef refId=birthDeathSteadyStateProb/>. In this case, it simplifies to
</BodyText>

<MathDisp>P_0\sum_{n=0}^\infty\left(\frac{\lambda}{\mu}\right)^n=P_0\sum_{n=0}^\infty\rho^n=1
</MathDisp>
<BodyText>
    We've assumed that <Math>\lambda<s\mu</Math>, so <Math>\rho=\frac{\lambda}{\mu}<1</Math> and hence the above reduces to (due to the standard result on the sum of [geometric series](https://en.wikipedia.org/wiki/Geometric_series)):
</BodyText>

<MathDisp>P_0\left(\frac{1}{1-\rho}\right)=1
</MathDisp>
<BodyText>
    So we have <Math>P_0=1-\rho</Math>, and by <EquationRef refId=pnFromP0/> we also get
</BodyText>

<MathDisp>P_n=(1-\rho)\rho^n
</MathDisp>
<BodyText>
    Using a few other tricks, one can derive from <EquationRef refId=birthDeathL/> that
</BodyText>

<MathDisp>L=\frac{\lambda}{\mu - \lambda}\qquad L_q=\frac{\lambda^2}{\mu(\mu-\lambda)}
</MathDisp>
<BodyText>
    And from there, using <EquationRef refId=birthDeathW/> we have
</BodyText>

<MathDisp>W=\frac{1}{\mu-\lambda}\qquad W_q=\frac{\lambda}{\mu(\mu-\lambda)}
</MathDisp>
<BodyText>
    We can go a little further than this actually. Say we'd like to know the <em>distribution</em> of the wait times, so we can answer questions about the probability of having to wait for a certain amount of time.<CitationRef refId=classText/> talks a little bit about the derivation, but the result is that if the random variable <Math>V</Math> represents the wait time for a customer arriving while the queue is in steady state, then
</BodyText>

<MathDisp>\prob{V\leq t} = 1 - e^{-(\mu - \lambda)t}
</MathDisp>
<BodyText>
    In other words, the steady-state waiting times are <em>also</em> governed by an exponential random variable!
</BodyText>
<BodyText>
    We can also derive similar results for waiting times in the queue. If we let <Math>V_q</Math> represent the time in the queue for a customer arriving in steady state, then we get
</BodyText>

<MathDisp>\prob{V_q\leq t} = 1 - \rho e^{-(\mu - \lambda)t}
</MathDisp>

<Heading level=4 refId=mmsResults>Results for the <Math>M/M/s</Math> queue</Heading>
<BodyText>
    Things become a little messier now when <Math>s>1</Math>, and so the death rates <Math>\mu_n</Math> for the associate birth-death process are no longer constants. After plugging the relevant values into <EquationRef refId=birthDeathSteadyStateProb/>, one can recover
</BodyText>

<MathDisp>P_0=\left[\sum_{n=0}^{s-1}\frac{(\lambda/\mu)^n}{n!}+\frac{(\lambda/\mu)^s}{s!}\frac{1}{1-\lambda/(s\mu)}\right]^{-1}
</MathDisp>
<BodyText>
    Furthermore, one can derive:
</BodyText>

<MathDisp>P_n=\begin{cases}
\frac{(\lambda/ \mu)^n}{n!}P_0 && 0\leq n \leq s \\
\frac{(\lambda/ \mu)^n}{s!s^{n-s}}P_0 && n > s
\end{cases}
</MathDisp>
<BodyText>
    Then the queue lengths and waiting times will become:
</BodyText>

<MathDisp>\begin{align*}
L_q &= \frac{P_0(\lambda/\mu)^s\rho}{s!(1 - \rho)^2} &\qquad W_q&=\frac{L_q}{\lambda} \\
L&=L_q + \frac{\lambda}{\mu} &\qquad W&=W_q + \frac{1}{\mu}
\end{align*}
</MathDisp>
<BodyText>
    With some effort, we can also recover the distributions of the waiting times <Math>V</Math>, <Math>V_q</Math> (in the entire system and in the queue) for customers arriving to the queue in steady state:
</BodyText>

<MathDisp>\begin{align*}
P(V\leq t)&=1-e^{-\mu t}\left(
1 + \frac{P_0(\lambda/\mu)^s}{s!(1-\rho)}\frac{1 - e^{\mu t(s-1-\lambda/\mu)}}{s-1-\lambda/\mu}
\right)\\
P(V_q\leq t)&=1-\left(1-\sum_{n=0}^{s-1}P_n\right)e^{-s\mu(1-\rho)t}
\end{align*}
</MathDisp>

<Heading level=4 refId=mmsExample>Example</Heading>
<BodyText>
    Let's consider again the County Hospital example from <SectionRef refId=queueExample/>. The management engineer has concluded that arrivals to the hospital roughly follow a Poisson process with a rate of <Math>\lambda=2</Math> arrivals per hour. She has also concluded that the time a doctor takes with a patient is modeled well by an exponential random variable with rate <Math>\mu=3</Math>.
</BodyText>
<BodyText>
    Furthermore, even though the patient arrival rate is not constant throughout the day and so the process is unlikely to ever truly reach steady state, she figures that the steady-state results will approximate real events well enough for the purposes of this analysis. Given this, how would you suggest determining whether the second doctor will have enough of an effect on the process to justify the extra cost? Let's jump to the following notebook to do some calculations.
</BodyText>

<ColabGist
    colabId=1kvBWyqp3khegQ5RFUiJfuiWEVd2SqDl8
    gistId=dc612ddb61811544716937a7af357f17
    refId=mmskNotebook
    desc='Calculating important M/M/s quantities'
/>

<Heading level=3 refId=mmskQueues><Math>M/M/s/K</Math> queues</Heading>
<BodyText>
    For our final class of queueing model, we'll explore what happens when the system is limited to having at most <Math>K</Math> customers in it, where <Math>K\in\I_+</Math>. We will be keeping the exponential interarrival and service times, and assuming the system has some number <Math>s\leq K</Math> of servers (so that the queue is limited to at most <Math>K-s</Math> customers). We call this type of queue the <Math>M/M/s/K</Math> queue. A physical interpretation may be that there is only so much waiting room in the facility, or perhaps any customer seeing so many people already in line will decide to leave and seek out an alternative<Footnote>It should be said, there are other queueing models that can handle this so-called "balking" behavior more naturally. We will not cover them in this course.</Footnote>. For this model, we will assume that a customer will leave (and never return) if they arrive when the system is in state <Math>K</Math>.
</BodyText>

<BodyText>
    Does this fit into the birth-and-death process framework? It does! Letting <Math>\lambda</Math> be the rate of arrivals to the system, we would have <Math>\lambda_0=\lambda_1=\dots=\lambda_{K-1}=\lambda</Math>. But since we can never transition out of state <Math>K</Math>, we will let <Math>\lambda_n=0</Math> for <Math>n\geq K</Math>. The <Math>\mu_n</Math> values will be the same as we calculated for the <Math>M/M/s</Math> queue.
</BodyText>
<BodyText>
    Importantly, since the number of possible states is finite, we can determine steady-state quantities for the <Math>M/M/s/K</Math> queue whether <Math>\rho<1</Math> or not<Footnote>There is an important caveat: If <Math>\rho=1</Math> then some of these formulas will not work because of division by 0 errors. I don't think it's important enough to derive the special-case results for that scenario. If you're trying to analyze a real-life system with <Math>\rho=1</Math>, you could try just tweaking <Math>\lambda</Math> or <Math>\mu</Math> a <em>tiny</em> bit to get the numbers to work out.</Footnote>! We will not work through the derivations, but the steady-state probabilities work out to:
</BodyText>

<MathDisp>P_0=\left[\sum_{n=0}^{s}\frac{(\lambda/\mu)^n}{n!}+\frac{(\lambda/\mu)^s}{s!}\sum_{n=s+1}^K\left(\frac{\lambda}{s\mu}\right)^{n-s}\right]^{-1}
</MathDisp>
<BodyText>
    and:
</BodyText>

<MathDisp>P_n=\begin{cases}
\frac{(\lambda/ \mu)^n}{n!}P_0 && 0\leq n \leq s \\
\frac{(\lambda/ \mu)^n}{s!s^{n-s}}P_0 && s+1 \leq n \leq K \\
0 && n > K
\end{cases}
</MathDisp>
<BodyText>
    The expected system size and queue lengths are given by:
</BodyText>

<MathDisp>\begin{align*}
L_q &= \frac{P_0(\lambda/\mu)^s\rho}{s!(1 - \rho)^2}\left(1 - \rho^{K-s} - (K - s)\rho^{K - s}(1-\rho)\right) \\
L&=\sum_{n=0}^{s-1}nP_n + L_q + s\left(1 - \sum_{n=0}^{s-1}P_n\right)
\end{align*}
</MathDisp>
<BodyText>
    The expected wait times can be calculated as in <EquationRef refId=birthDeathW/>, where <Math>\bar\lambda</Math> is the average arrival rate in steady state. In this case, the arrival rate is always <Math>\lambda</Math> except in state <Math>K</Math> when the rate is 0. So we have
</BodyText>

<MathDisp>\bar\lambda=\lambda(1-P_K)
</MathDisp>
<BodyText>
    Thus the average wait time results are:
</BodyText>

<MathDisp>W=\frac{L}{\lambda(1-P_K)} \qquad W_q=\frac{L_q}{\lambda(1-P_K)}
</MathDisp>
<BodyText>
    Unfortunately, there is no good way to obtain a closed-form solution for the wait time distributions, like we did in the <Math>M/M/s</Math> case.
</BodyText>
<BodyText>
    See the following notebook (similar to the one we just saw in the last section) for Python code to calculate all of the above values.
</BodyText>

<ColabGist
    colabId=1pnF67KGoBCENt-6y02YzXzCT3DkYHG3W
    gistId=e62a58947981b011b0d8635640cf1969
    refId=mmskNotebook
    desc='Calculating important M/M/s/k quantities'
/>