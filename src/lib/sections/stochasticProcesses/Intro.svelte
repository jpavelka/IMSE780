<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
</script>

<Heading level=1 refId='stochasticProcesses'>Stochastic processes</Heading>

<BodyText>
    We're going to change gears a bit now to talk about stochastic processes. The word <em>stochastic</em> is just a fancy way to say "random", so we can say colloquially that a stochastic process is just a system that evolves according to the outcome of some random process. The nature of the work we do in this section is different from what we've done so far - we won't always be <em>optimizing</em> anything, but instead only describing and analyzing the evolution of some system. One could say that the nature of the techniques will be more <em>descriptive</em> as opposed to <em>prescriptive</em> 
</BodyText>
<BodyText>
    We will start this section with a review of the basics of probability and random variables. Then we'll be diving into two important classes of stochastic processes, Markov chains and queues. This background will be useful when we move on to Markov decision processes at the end of the course.
</BodyText>

<Heading level=2 refId=probBasics>Probability basics</Heading>
<BodyText>
    We'll now use some time to review the basics of elementary probability. This material should be familiar to you from past probability or statistics courses. The idea is to be able to formalize ideas and set notation so that we have a base for developing the new material later in the section. I assume that you are at least somewhat familiar with the ideas presented here, so think of the following as more of a review/reminder than a thorough treatment.
</BodyText>
<BodyText>
    Much of this content comes from a web supplement to your textbook <CitationRef refId=classText/>, which can be accessed <a href='https://highered.mheducation.com/sites/dl/free/1259872998/1126268/Hillier_IOR_11e_Ch024_WebChapter.pdf'>here</a>.
</BodyText>

<Heading level=3 refId=probSampleSpace>Sample space</Heading>
<BodyText>
    The first thing to know when faced with a random process is the possible outcomes of the process. For example, if you were to roll a standard six-sided die, the possibilities are that you roll either a 1, 2, 3, 4, 5, or 6<Footnote>Note that just knowing what outcomes are possible is different from knowing the <em>probabilities</em> of the outcomes. You can generate the sample space without knowing any related probabilities.</Footnote>. The set of all possible outcomes of some random process is called the <em>sample space</em>  and is usually denoted by <Math>\Omega</Math><Footnote>This is the greek capital letter "omega". We will see its lowercase counterpart <Math>\omega</Math> soon as well.</Footnote>. So for rolling a six-sided die, we might denote the sample space as
</BodyText>

<MathDisp>\Omega=\{1, 2, 3, 4, 5, 6\}
</MathDisp>

<BodyText>
    The sample space in the above case was just a finite, discrete set, but that need not always be the case. Suppose the event of interest is knowing how many times you need to try rolling a die before you roll a <Math>1</Math>. You could get lucky and get it on your first try. Or it might take a little longer, like 5 or 6 tries. But to fully encapsulate the sample space, we need an infinite set. For any <Math>n\in\I</Math>, it is possible (if exceedingly unlikely for large <Math>n</Math>) that you never roll a <Math>1</Math> in your first <Math>n</Math> attempts. So the sample space for this event is
</BodyText>

<MathDisp>\Omega = \{1, 2, ...\}
</MathDisp>
<BodyText>
    Or, suppose it's been announced that your favorite musical artist will release a new song this week, though the exact time has not been specified. You would like to know the number of days until the song is released. In this case we're no longer dealing with integers, since they could theoretically release the song in the next few hours, so the number would be something less than <Math>1</Math>. All we know is that it will be sometime in the next seven days, so the sample space in this case would be
</BodyText>

<MathDisp>\Omega = \{\omega:0\leq\omega\leq7\}
</MathDisp>
<BodyText>
    All of these samples have been numerical, but there is nothing requiring that. If you're going to a (very small) zoo today and would like to know the first animal you see that is not asleep, perhaps your sample space is
</BodyText>

<MathDisp>\begin{align*}
\Omega = \{&\text{Lion}, \text{Gorilla}, \text{Otter}, \text{Turtle}, \text{Giraffe}, \\
&\text{Anteater}, \text{Snake}, \text{Parrot}\}
\end{align*}
</MathDisp>
<BodyText>
    in fact, it's possible that <em>all</em> the animals are sleeping while you visit, so maybe we should include an entry in <Math>\Omega</Math> for that too:
</BodyText>

<MathDisp>\begin{align*}
\Omega = \{&\text{Lion}, \text{Gorilla}, \text{Otter}, \text{Turtle}, \text{Giraffe}, \\
&\text{Anteater}, \text{Snake}, \text{Parrot}, \text{none}\}
\end{align*}
</MathDisp>

<Heading level=3 refId=probEvents>Events</Heading>
<BodyText>
    Given some random experiment, an <em>event</em> is any (sub)set of possible outcomes to the experiment. We will write these as subsets of the sample space. Considering the zoo example from above, the event that the first awake animal we see is a reptile (denote it <Math>E_{\text{reptile}}</Math>) is
</BodyText>

<MathDisp>E_{\text{reptile}} = \{\text{Turtle}, \text{Snake}\}
</MathDisp>
<BodyText>
    Similarly, maybe your favorite animals are the turtle and giraffe. We could create a new event for event that you see one of your favorites first:
</BodyText>

<MathDisp>E_{\text{favorite}} = \{\text{Turtle}, \text{Giraffe}\}
</MathDisp>
<BodyText>
    We are often interested in combinations of individual events as well. We will describe these using the union (<Math>\cup</Math>) and intersection(<Math>\cap</Math>) operators. The <em>union</em> of two events <Math>E_1,E_2</Math> is the event consisting of all elements in either <Math>E_1</Math> or <Math>E_2</Math>. So the union of the two events we defined above would be
</BodyText>

<MathDisp>E_{\text{reptile}} \cup E_{\text{favorite}} = \{\text{Turtle}, \text{Snake}, \text{Giraffe}\}
</MathDisp>
<BodyText>
    representing the event that you see <em>either</em> a reptile <em>or</em> one of your favorites first. The intersection of these events is
</BodyText>

<MathDisp>E_{\text{reptile}} \cap E_{\text{favorite}} = \{\text{Turtle}\}
</MathDisp>
<BodyText>
    which is the event that the first animal you see is both a reptile <em>and</em> one of your favorites.
</BodyText>
<BodyText>
    Events <Math>E_1, E_2</Math> are said to be <em>mutually exclusive</em> or <em>disjoint</em> if their intersection contains no elements, i.e. if
</BodyText>

<MathDisp>E_1\cap E_2=\emptyset
</MathDisp>
<BodyText>
    If we create a new event <Math>E_{\text{bird}}=\{\text{Parrot}\}</Math> for when the first animal you see is a bird, then <Math>E_{\text{favorite}}</Math> and <Math>E_{\text{bird}}</Math> are disjoint events.
</BodyText>

<Heading level=3 refId=probRandomVariables>Random variables</Heading>
<BodyText>
    Many times, our ultimate interest lays not in the result of an experiment per se, but instead on some other quantities that nonetheless depend on the results. Suppose you own a store and are interested to know how long it takes (in minutes) for the first customer to arrive after opening the store. If this is tracked for five days, the sample space would look something like
</BodyText>

<MathDisp>\{(x_1,x_2,x_3,x_4,x_5):x_i\in\R_+\}
</MathDisp>
<BodyText>
    But probably you're not interested in the exact numbers themselves, but instead some statistics related to the outcome. For example, let <Math>\bar X</Math> represent the mean of those five numbers. If that mean is relatively large, maybe you'll decide to open your store later. <Math>\bar X</Math> would be an example of a <em>random variable</em>  which is just some numerically-valued function defined over the sample space.
</BodyText>
<BodyText>
    Following notation standards, we will generally represent random variables via capital letters, e.g. <Math>X</Math>, <Math>Y</Math>, or <Math>Z</Math>. In fact, since it technically is a function, a more precise way to denote the realization of a random variable is <Math>X(\omega)</Math>, where <Math>\omega\in\Omega</Math> is some element of the sample space. So, using <Math>\bar X</Math> from above as an example, we could write
</BodyText>

<MathDisp>\bar X(\omega) = \bar X(x_1, x_2, x_3, x_4, x_5) = \frac{x_1 + x_2 + x_3 + x_4 + x_5}{5}.
</MathDisp>
<BodyText>
    Generally though (both here and in most texts on introductory probability) we will suppress the functional notation and use only the capital letter, i.e. we'll ignore the more precise <Math>\bar X(\omega)</Math> and just write the simpler <Math>\bar X</Math>, leaving the dependence on <Math>\omega</Math> as implicit.
</BodyText>
<BodyText>
    With the above definition, <Math>\bar X</Math> is a <em>continuous random variable</em>  i.e. a random variable whose values could be any number on some continuum (in this case, <Math>\R_+</Math>). In contrast, we will also see examples of <em>discrete random variables</em>  whose possible values belong to some (possibly infinite) discrete set (often the set of integers or some subset of it).
</BodyText>
<BodyText>
    A sample discrete random variable may be the number of times the first arrival came within one hour of the store opening. Introducing some new notation, we could write this as:
</BodyText>

<MathDisp>\sum_{i=1}^5\indicator_{\{x_i<60\}}
</MathDisp>
<BodyText>
    where <Math>\indicator_{\{\text{condition}\}}</Math> is itself a random variable that is equal to <Math>1</Math> if the condition in the subscript is true, and otherwise equal to <Math>0</Math>.
</BodyText>

<Heading level=3 refId=probabilityDef>Probability</Heading>
<BodyText>
    Every event <Math>E</Math> has a number <Math>\prob{E}</Math> associated with it, called the <em>probability</em> of <Math>E</Math> occurring. Probabilities have the following properties:
    <ul>
        <li>For any <Math>E</Math>, <Math>0\leq\prob{E}\leq1</Math>.</li>
        <li>If <Math>E_0</Math> is an event that cannot occur in the sample space, then <Math>\prob{E_0}=0</Math>.</li>
        <li><Math>\prob{\Omega}</Math> (the probability of the entire sample space) equals <Math>1</Math>.</li>
        <li>For any two mutually exclusive events <Math>E_1</Math> and <Math>E_2</Math>, it must hold that <Math>\prob{E_1\cup E_2}=\prob{E_1}+\prob{E_2}</Math>.</li>
    </ul>
</BodyText>

<BodyText>
    You probably already have some intuitions about probability, where <Math>\prob{E}</Math> corresponds to the likelihood that an event <Math>E</Math> occurs. From a frequentist perspective, you can interpret <Math>\prob{E}</Math> as the proportion of time the event occurs if the experiment is repeated many times. This intuition suffices for our purposes, and while there are more rigorous formulations for probability, we will not be exploring these in this class<Footnote>For anyone curious about rigorous formulations of probability, the key term to look up is <em>measure theory</em></Footnote>.
</BodyText>

<BodyText>
    Since an event <Math>E</Math> is a subset of the sample space, technically the operand inside the <Math>\prob{\cdot}</Math> function should be a set. So if we want to talk about the probability that some random variable <Math>X</Math> is equal to some value <Math>k</Math>, we should technically write that quantity as
</BodyText>

<MathDisp>
    \prob{\{\omega\in\Omega:X(\omega)=k\}}
</MathDisp>
<BodyText>
    But generally we will not be so precise, and instead write the probability of the event of interest as
</BodyText>

<MathDisp>\prob{X=k}
</MathDisp>

<Heading level=3 refId=probabilityDistributions>Probability distributions</Heading>
<BodyText>
    Associated with every random variable is a <em>cumulative distribution function</em> (<em>CDF</em>). For a random variable <Math>X</Math>, we generally represent this function as <Math>F_X</Math> (though sometimes we may suppress the <Math>X</Math> in the subscript if there is no ambiguity). This function is defined for every real number <Math>b</Math> as
</BodyText>

<MathDisp>F_X(b)=\prob{X\leq b}
</MathDisp>
<BodyText>
    Given that definition, it should be clear that the following are true for any CDF:
    <ul>
        <li><Math>F_X</Math> is a non-decreasing function, i.e. if <Math>b_1\leq b_2</Math> then <Math>F_X(b_1)\leq F_X(b_2)</Math>.</li>
        <li><Math>\lim_{b\rightarrow -\infty}F_X(b)=0</Math>.</li>
        <li><Math>\lim_{b\rightarrow \infty}F_X(b)=1</Math>.</li>
    </ul>
</BodyText>

<BodyText>
    Every random variable, no matter the form, will have an associated CDF. In the case of discrete random variables, there is a second important function called the <em>probability mass function</em> (PMF). We will denote the PMF of some random variable <Math>X</Math> by <Math>p_X</Math>, and it is defined by:
</BodyText>

<MathDisp>p_X(k)=\prob{X=k}
</MathDisp>
<BodyText>
    The CDF and PMF are clearly related by the following:
</BodyText>

<MathDisp>F_X(b)=\sum_{k\leq b}p_X(k)
</MathDisp>
<BodyText>
    In the case of continuous random variables, the other important function is known as the <em>probability density function</em> (<em>PDF</em>). We denote this function by <Math>f_X</Math> and it satisfies the relation
</BodyText>

<MathDisp>F_X(b)=\int_{-\infty}^bf_X(x)\ dx
</MathDisp>
<BodyText>
    The relation between continuous CDFs and PDFs is clearly quite similar to the relation between discrete CDFs and PMFs, except that we swap summation for integration.
</BodyText>
<BodyText>
    From the definition, it should also be evident that for a continuous random variable <Math>X</Math> we have
</BodyText>

<MathDisp>\prob{a\leq X\leq b} = \int_{a}^{b}f_X(x)\ dx
</MathDisp>
<BodyText>
    so that probabilities for <Math>X</Math> are related to areas under the curve of <Math>f_X</Math>. Due to this, it is also evident that for a continuous random variable, we must have
</BodyText>

<MathDisp>\prob{X=b}=\prob{b\leq X\leq b}=\int_{b}^b f_X(x)\ dx=0
</MathDisp>
<BodyText>
    for any value <Math>b</Math>.
</BodyText>

<Heading level=3 refId=expectationVariance>Expectation and Variance</Heading>
<BodyText>
    Knowing the full distribution of a random variable gives you a lot of information, but sometimes it is more convenient to have just a few numbers that can describe a good bit of the behavior of the distribution (to e.g. make comparisons of different distributions more tractable). One such statistic is known as the <em>expected value</em> of a random variable <Math>X</Math>, denoted <Math>\E{X}</Math>, which is defined as
</BodyText>

<MathDisp>\E{X}=\sum_{k: \prob{X=k}>0}k\cdot\prob{X=k}
</MathDisp>
<BodyText>
    for a discrete random variable, or
</BodyText>

<MathDisp>\E{x}=\int_{-\infty}^{\infty}x\cdot f_X(x)\ dx
</MathDisp>
<BodyText>
    for a continuous random variable. This is essentially a weighted average of the possible values that <Math>X</Math> can take, weighted by the relative likelihood that <Math>X</Math> can take that value. A frequentist interpretation of <Math>\E{X}</Math> is that if the same experiment is done over and over again, <Math>\E{X}</Math> will be the average value of <Math>X</Math> over all the trials. A useful property is the <em>linearity of expectation</em>  which states that for any two random variables <Math>X</Math> and <Math>Y</Math>, we have that
</BodyText>

<MathDisp>\E{X + Y}=\E{X} + \E{Y}
</MathDisp>
<BodyText>
    and further, for any <em>constant</em> value <Math>a</Math>, we have
</BodyText>

<MathDisp>\E{aX} = a\E{X}
</MathDisp>
<BodyText>
    So the expected value gives you a sense of the "average value" of a random variable, which can be useful to know. But two random variables can have identical expectations while still behaving very differently. Suppose <Math>X</Math> and <Math>Y</Math> are two discrete random variables, such that
</BodyText>

<MathDisp>\begin{align*}
\prob{X=3}&=0.5\\
\prob{X=-1}&=0.5\\
\prob{Y=1,\!000,\!000}&=0.001\\
\prob{Y=-1,\!000}&=0.999
\end{align*}
</MathDisp>
<BodyText>
    In this case, we have
</BodyText>

<MathDisp>\begin{align*}
\E{X}&=3(0.5) - 1(0.5) = 1\\
\E{Y}&=1,\!000,\!000(0.001)-1,\!000(0.999) =1
\end{align*}
</MathDisp>
<BodyText>
    so their expected values are the same. But it is clear these two random variables behave quite differently. Suppose they represented the potential gains/losses to you should you take some kind of bet. Even though they have the same (positive!) expectation, I would guess that your willingness to take each of these bets would be very different.
</BodyText>
<BodyText>
    But there are other measures of probability distributions that can help us capture the differences here. In particular, the <em>variance</em> of a random variable <Math>X</Math>, denoted <Math>\Var{X}</Math>, is defined as
</BodyText>

<MathDisp>\Var{X}=\E{(X-\E{X})^2}
</MathDisp>
<BodyText>
    The variance of a random variable <Math>X</Math> measures (the square of) how far away from its mean a particular realization of <Math>X</Math> will tend to be. Thus it is a measure of the "spread" of a probability distribution. Through an application of the linearity of expectation, an equivalent definition of variance is:
</BodyText>

<MathDisp>\Var{X}=\E{X^2} - (\E{X})^2
</MathDisp>
<BodyText>
    In the case of <Math>X</Math> and <Math>Y</Math> as we defined above, we can find that
</BodyText>

<MathDisp>\begin{align*}
\Var{X}&=4\\
\Var{Y}&\approx10^9
\end{align*}
</MathDisp>
<BodyText>
    thus the spread of the two distributions is wildly different.
</BodyText>

<Heading level=3 refId=conditionalProbability>Conditional probability</Heading>
<BodyText>
    Sometimes the outcomes of different random events are related, such that knowing something about the first gives you information about what might happen for the second. For example, say you roll two dice and are interested in the sum of the value of the two rolls. Suppose the first die shows a six, but the second one rolls away and you cannot see how it turned out. Even without knowing both the values, you now have more information about what the sum could be: it is no longer possible for the sum to be less than seven, and a sum of 12 is much more likely now than it was before you saw the outcome of the first roll.
</BodyText>
<BodyText>
    In general, suppose <Math>A</Math> and <Math>B</Math> are two events. Perhaps <Math>A</Math> is some event we're tracking, and <Math>B</Math> is a separate event that we know has occurred. The value we're interested in is the <em>conditional probability</em> of <Math>A</Math> given that <Math>B</Math> has occurred, which is denoted as <Math>\prob{A|B}</Math>. This quantity may be completely defined by initial probabilities involving <Math>A</Math> and <Math>B</Math>. In particular, we have
</BodyText>

<MathDisp refId=conditionalProbability>\prob{A|B}=\frac{\prob{A\cap B}}{\prob{B}}
</MathDisp>

<BodyText>
    I think a Venn diagram is a good way to visualize this relation, as shown <a href='https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php#chapter_image'>here</a>. Basically, you can think of conditional probability as a normal probability, except that now the sample space has been reduced from the original <Math>\Omega</Math> to just the conditional event <Math>B</Math>. As such, it is worth noting that one can define entire probability distributions based on conditional probability, i.e. for some random variable <Math>X</Math> one could define a <em>conditional</em> CDF
</BodyText>

<MathDisp>F_{X|B}(b)=\prob{X\leq b|B}=\frac{\prob{\{X\leq b\}\cap B}}{\prob{B}}
</MathDisp>
<BodyText>
    where the probabilities are given as if <Math>B</Math> is now the sample space. There are also notions of conditional expectation and conditional variance, which are defined as the usual expectation and variance from the last section, but over the conditional distribution.
</BodyText>
<BodyText>
    Of course, it is possible for two events <Math>A</Math> and <Math>B</Math> to be completely unrelated, such that knowing that event <Math>B</Math> occurs gives you no extra information about the potential occurrence of <Math>A</Math>. Going back to the dice rolling example, it is clear that knowing the value of one die gives you extra information about the sum of the two rolls. But knowing something like, I don't know, yesterday's high temperature in Paris, is not super useful in determining the sum. So we would say that the high temperature in Paris and the outcome of your dice rolls are <em>independent events</em>  Mathematically, two events <Math>A</Math> and <Math>B</Math> are <em>independent</em> if
</BodyText>

<MathDisp>\prob{A|B}=\prob{A}
</MathDisp>
<BodyText>
    If <Math>\prob{B}>0</Math>, then subbing in the definition of conditional probability gives us
</BodyText>

<MathDisp>\frac{\prob{A\cap B}}{\prob{B}} = \prob{A} \Leftrightarrow \prob{A\cap B}=\prob{A}\prob{B}
</MathDisp>
<BodyText>
    Indeed, you could see this as an alternative definition of independence.
</BodyText>

<Heading level=3 refId=probPython>Python</Heading>
<BodyText>
    This Python notebook gives some samples related to calculating probabilities with Python.
</BodyText>

<ColabGist
    colabId=1Ssl7Xsb-o1y1S5RFQTI4uMRsr7LKpPer
    gistId=dc232799604bb34fdc9ff891fd9fcbeb
    refId=probPython
    desc='Calculating probabilities with Python'
/>