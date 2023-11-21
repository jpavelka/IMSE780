# Introduction to OR

<div class='lectureVideoEmbed' video-id='36726575b4244fecb73986d444ffae771d' video-date='2023-08-23'>Chapter 2, Edelman prize, a little about Python at the end.</div>

In this section we'll cover the big picture questions: What is Operations Research? Where did it come from? What can I do with it? I hope to impress upon you that OR is a seriously set of tools, and that it has a huge impact on the world today.

## What is Operations Research?

If you're like me, one of the first things you'll do when learning a new subject is look it up on Wikipedia. As of this writing, [their page on Operations Research](https://en.wikipedia.org/wiki/Operations_research) first defines OR as:

> The discipline that deals with the development and application of analytical methods to improve decision-making.

I think this is a good first definition! Continuing on a bit, the article gets a little more specific:

> Employing techniques from other mathematical sciences, such as modeling, statistics, and optimization, operations research arrives at optimal or near-optimal solutions to decision-making problems.

Right. So the practice of OR involves using mathematical techniques to find the best decision possible in a given situation ("optimal" is just fancy way of saying "best"[^moreOptimal]).

[^moreOptimal]: The pedant in me wants to point out that this word "optimal" is horribly misused in conversation fairly regularly, in the form of the misguided phrase "more optimal". As I mentioned, "optimal" really just means "best", and "best" is not on a sliding scale; either you have the best answer or you don't. One choice can't be "more best" than another, just as one solution can't be "more optimal" than another. I think I'm fighting a losing battle on this, but maybe for the sake of this course we can all agree to never put the words "more" and "optimal" next to each other? Thanks.

## Example OR problems

The above definitions were great, but maybe it's feeling a little too abstract at this point. Fair enough. Let's outline a few common problems in the OR space.

### Traveling Salesman Problem {#sec:tsp}

There are many well-known problems in the world of OR, but I reckon the [Traveling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) (TSP) is the best-known and most-loved among them. The setup is simple: Some old-timey door-to-door salesman is heading out on the road to sell his product to the masses. He plans to visit a certain group of cities, and thanks to his trusty atlas he knows the way between any pair of cities. Less clear, however, is the shortest path that will lead you through _all_ of the cities, and this is the aim of the TSP: In which order should you visit the cities such that your total distance traveled is minimized?

As I said, this a famous problem in the OR space[^tspBook]. I think it's due to the simple, relatable exposition, paired with the fact that it is actually quite computationally challenging. And yet despite the challenges, modern methods are able to solve problem instances where the number of cities is in the 10,000s! The image below shows the optimal tour through selected cities in the continental US[^tspFurtherReading].

[^tspBook]: There's a neat book all about the TSP, @tspPursuit, written by a great professor that I took a course from while getting my PhD. It's more popularly focused than technical, so it's a surprisingly smooth read. Highly recommended!

[^tspFurtherReading]: You can tell from the image that this map is pretty old. [The site from which it came](https://www.math.uwaterloo.ca/tsp/usa50/) tells a neat story about how this instance was solved, by hand, way back in 1954! There are some other interesting bits there too, well worth a read in my opinion.

![The shortest tour through 49 US cities [@tspPic]](https://www.math.uwaterloo.ca/tsp/usa50/img/newsweek_medium.jpg)

### Job-shop scheduling

You run a machine shop, and have a certain number of jobs to complete in a day. Each job requires a certain number of tasks to be done by one of your many machines, and the tasks are at least partially ordered, such that you must complete some of the tasks in a certain order. Each machine can only work on one task at a time. You get to decide the work schedule, assigning machines to tasks at certain times in the day. What is the schedule that lets you complete all the jobs in the least amount of time?

An example: You have a woodworking shop, and today you're making 20 table, 30 chairs, 15 doors, and 20 bookcases. Each of these jobs requires some time on your table saw, your mill, and your belt sander. And the order of operations matters, e.g. you have to cut a piece of wood before you sand the edges. When you begin the day, what job will you have each of your machines work on? And as they complete those jobs, which ones should they take up next? How much time can you save with the right schedule of work?

### Portfolio optimization

You have some money to invest, and a list of potential project/assets to invest in. You'd like to invest in a way that gives you a high expected return, but there is risk involved as well. Each project comes with its own risks, and some projects may be highly correlated such that failure in one would suggest a high chance of failure in another. How can you deploy your capital in a way that minimizes downside risk while still likely generating a good profit?

## OR in practice

So we've given a few broad classes of OR problems, but these are still just hypotheticals. You'd probably like some concrete examples, instances where OR has been used in the real world, and what the results were.

### Origins of OR

We'll come to the present day soon, but let's start with a (brief) history lesson. Most sources trace the beginning of OR back to early 1900s and the two World Wars. This _research_ on military _operations_ is where the discipline's name derives. Here's how @classText explains it:

> The roots of OR can be traced back many decades, when early attempts were made to
> use a scientific approach in the management of organizations. However, the beginning of
> the activity called operations research has generally been attributed to the military services
> early in World War II. Because of the war effort, there was an urgent need to allocate scarce
> resources to the various military operations and to the activities within each operation in an
> effective manner. Therefore, the British and then the U.S. military management called
> upon a large number of scientists to apply a scientific approach to dealing with this and
> other strategic and tactical problems. In effect, they were asked to do _research_ on (military)
> _operations_. These teams of scientists were the first OR teams. By developing effective
> methods of using the new tool of radar, these teams were instrumental in winning the Air Battle
> of Britain. Through their research on how to better manage convoy and antisubmarine
> operations, they also played a major role in winning the Battle of the North Atlantic. Similar
> efforts assisted the Island Campaign in the Pacific.

After the war, these techniques were adopted by industry as well. As the sheer scale of organizations began to grow, so did the potential benefit of the optimized systems brought by OR methodologies. As techniques and (especially) computing power improved, the types and scale of problems that were tackled continued to grow. Today almost all major corporations benefit from OR.

### Case studies

Your textbook handily comes full of case studies explaining how companies have used OR to inform their decision-making. Below I've copied part of the summary table. Check out the book to get more background on anything that piques your interest.

![Selected OR case studies [@classText]](images/or-case-studies.png)

It's pretty staggering to look at the figures in the "Annual Savings" column, which taken together sum to the billions. OR is an enormously valuable tool.

### Edelman Prize {#sec:edelmanPrize}

Now, admittedly, some of those case studies are a little stale. But don't fret, OR is still relevant in industry today. A great showcase for the most recent impactful OR work is the annual Edelman Prize, awarded by the [Institute for Operations Research and Management Science (INFORMS)](https://www.informs.org/). The winners of this award were judged to have demonstrated the best application of OR methodologies in industry. You can take a look at the [program for the 2023 edition of the award](https://3449182.fs1.hubspotusercontent-na1.net/hubfs/3449182/2023_Edelman_Gala_Book.pdf) and find cases submitted by names like DHL, Huawei, Lyft, and the winner Walmart.

## Topics we'll cover

OR is a wide-ranging topic, and as such we can't cover everything. Since the class is meant to be an overview, we won't get overly deep into any one topic either[^deepDive]. But we should be able to cover the basics in a handful of important topics, as well as getting you some hand-on experience using these methods to solve problems. I've outlined the planned programming below, but note that we are still early in the semester, so some of this may be subject to change.

[^deepDive]: If you _are_ looking for a deep dive, I'd suggest checking out the other classes in our Masters of Operations Research program.

My main goal for this course is for you to be able to apply the methods we learn. We will accomplish this using various packages written for the Python programming language. While this is not a programming course, I realize some of you may have limited (or no) knowledge of the language, thus I've provided a small unit on the basics. But if you are a true beginner this may not suffice, and you may need to spend time on your own to get comfortable with it.

After that, we will jump into the first big success in Operations Research history, linear programming. We'll learn about the basics of these models, a little history, and a few ways to solve them (with special emphasis on the simplex method). We'll also touch on the theory of duality and sensitivity analysis.

After linear programming comes its cousin, integer programming. As far as solving techniques, we'll focus on branch-and-bound and branch-and-cut. Since integer programming is so powerful, we will spend significant time talking about how to model these problems, and how to set them up and solve them with Python.

Next will be several topics in nonlinear programming where we will talk about convexity, optimality conditions, and selected solution procedures.

We will also include a section on Stochastic Processes, where we will cover topics in Markov chains, queueing theory, and perhaps Markov Decision Processes.

There are a few other topics on my mind (dynamic programming, network models) that I may decide to cover depending on time and class interest.
