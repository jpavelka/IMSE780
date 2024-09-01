<script lang="ts">
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import YoutubeEmbed from "$lib/YoutubeEmbed.svelte";
</script>

<Heading level=2 refId=reinforcementLearning>Reinforcement learning</Heading>
<BodyText>
    We've made it to the final section of the notes! Before we wrap up, I wanted to give you a little taste of <em>reinforcement learning</em> (<em>RL</em>), since it is a hot topic these days, and several of the Edelman Prize finalist I pointed you to in <SectionRef refId=edelmanPrize/> included a reinforcement learning component.
</BodyText>
<BodyText>
    This section will be a bit different from the previous ones in that I'm not going to teach it to you! As you know, I'm out of town for the last week of this class, and I didn't feel great about giving you material while I'm less available to help answer questions, then turning around and testing you on it the next week. Consequently, this material will not be on the exam. Then, given that and the fact that I haven't loved the lectures I've pre-recorded so far, I decided I could let you watch some videos that are actually well produced instead.
</BodyText>
<BodyText>
    What you'll find below, then, is a series of YouTube videos giving an overview of material from <CitationRef refId=sutton2018reinforcement/>, which is basically the authoritative text for reinforcement learning (and also freely available in pdf form <a href='http://incompleteideas.net/book/the-book-2nd.html'>here</a>). It starts from Markov decision processes, which is a common theoretical framing for RL. The way he approaches it is slightly different from what we did in <SectionRef refId=markovDecisionProcesses/>, but it should still look familiar to you. We'll also see a different (and more practically useful) solution technique for MDPs than the LP method that we covered. He'll then strip away some of the assumptions of MDPs that will turn the problem into true RL, and show how these problems are approached in practice.
</BodyText>
<BodyText>
    It's worth noting - there is a lot of notation! But the videos do a good job of pausing and reminding you what things mean. It also gets a little more technical that I probably would have in presenting some of the ideas. But don't worry if you get a little confused. Remember, you will have no homework or exam questions on this material. I'm just hoping it's a fun extension to some of the topics we've already learned.
</BodyText>

<Heading level=3 refId=whatIsRL>What is RL?</Heading>
<BodyText>
    The following passage from <CitationRef refId=sutton2018reinforcement/> succinctly describes the general problem of reinforcement learning:
</BodyText>
<BlockQuote>
    <BodyText>
        Reinforcement learning is learning what to do—how to map situations to actions—so as to maximize a numerical reward signal. The learner is not told which actions to take, but instead must discover which actions yield the most reward by trying them. In the most interesting and challenging cases, actions may affect not only the immediate reward but also the next situation and, through that, all subsequent rewards.
    </BodyText>
</BlockQuote>
<BodyText>
    It has turned out to be an immensely powerful tool in teaching computers to complete all sorts of tasks. From playing games to driving cars to teaching robots how to walk, a wide range of tasks can be learned by RL systems, often surpassing the levels of human experts.
</BodyText>

<Heading level=3 refId=RLVid1>Reinforcement learning, by the book (video 1)</Heading>
<BodyText>
    In the first video of our series, we'll get a brief introduction to RL, and a formulation of Markov decision processes. His MDP formulation is slightly different from ours and uses different notation, but I think you'll still be able to recognize it. One big difference, though, is that in the video the objective is not maximizing the long-run expected reward per time step. Instead, he uses a notion of <em>total discounted future reward</em>  which is another common criterion for optimizing MDPs. Additionally, there are notions here that we did not mention in class - sampled episodes, terminal states, etc. They weren't important for what we learned already in class, but they will play a part here.
</BodyText>

<YoutubeEmbed videoId='NFo9v_yKQXA' />

<Heading level=3 refId=RLVid2>Bellman equations, dynamic programming, generalized policy iteration (video 2)</Heading>
<BodyText>
    In this video, we're still just dealing with MDPs. The solution method he talks about, <em>policy iteration</em>  is a more practical way to go about solving MDPs than the linear programming method we presented in <SectionRef refId=mdpLp/>. It also uses the notion of <a href='https://en.wikipedia.org/wiki/Dynamic_programming'><em>dynamic programming</em></a>, which is a technique of recursively breaking a problem down into simpler sub-problems, and using the optimal solutions of the sub-problems to inform the solutions of the larger problems. It is a notion that pops up in optimization algorithms for several types of problems, so I'm glad to give you some exposure to it here.
</BodyText>

<YoutubeEmbed videoId='_j6pvGEchWU' />

<Heading level=3 refId=RLVid3>Monte Carlo and off-policy methods (video 3)</Heading>
<BodyText>
    In this video we're no longer just dealing with MDPs, but learning techniques that can be useful for actual reinforcement learning! The difference is that we no longer assume any knowledge of the state transition probabilities. Therefore the potential rewards from each state must be learned by interactions with the environment. That means lots of simulations, and an appearance of the important <em>exploration vs. exploitation</em> tradeoff central to RL solution methods. In the end, the video applies what we've learned to determine optimal play for the casino game blackjack.
</BodyText>

<YoutubeEmbed videoId='bpUszPiWM7o' />

<Heading level=3 refId=RLVid4>Temporal difference learning (video 4)</Heading>
<BodyText>
    In this video, we'll learn what amount to tweaks to the Monte Carlo method from the last video. These tweaks can help improve performance of the learning process.
</BodyText>

<YoutubeEmbed videoId='AJiG3ykOxmY' />

<Heading level=3 refId=RLVid5>Function approximation (video 5)</Heading>
<BodyText>
    Now we'll move on to cases where the set of states is no longer discrete. Things get a little more abstract from here. But we do see a return of our old friend, gradient descent!
</BodyText>

<YoutubeEmbed videoId='Vky0WVh_FSk' />

<Heading level=3 refId=RLVid6>Policy gradient methods (video 6)</Heading>
<BodyText>
    This final video touches on a neat class of algorithms for reinforcement learning when the state space is huge.
</BodyText>

<YoutubeEmbed videoId='e20EY4tFC_Q' />