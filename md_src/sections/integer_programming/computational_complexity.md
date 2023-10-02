## Intro to complexity {#sec:complexityIntro}

I've mentioned already that IPs are much harder to solve than LPs, and in playing with some of the last notebooks you may have seen how solve times can increase with relatively small increases in the size of the random instances we solve. It turns out there is some deep theory that goes toward explaining why we have such difficulties. This theory is known as **computational complexity theory**, which is concerned with how much effort is required to solve problems of different types. We won't be able to do much more than scratch the surface of it here, but I thought it was important enough to explain a bit of the basics[^changedMyMindAboutComplexity].

[^changedMyMindAboutComplexity]: Actually, I think I alluded to complexity earlier in class and told you we wouldn't cover it. But I just couldn't help myself, so here we are.

### Combinatorial explosion

Let's consider again that notebook we just saw in +@sec:solvingIpsWithPython. Scroll down to the end where we solve some randomly-generated TSP instances. Let's solve some more instances, starting with 5 cities. When you run the cell, you'll see the logs provided by the Gurobi solver. One of the first lines should read "Optimize a model with 20 rows, 20 columns, and 60 nonzeros." What does this mean? Well, there is a matrix underlying every IP or LP we solve, and these stats tell you about the size of this matrix. Just like when we set up problems to solve simplex, the rows correspond to the model constraints, and the columns correspond to the variables. The number of non-zeros refers to the numerical values inside the matrix, corresponding to each time a variable has a non-zero coefficient in some constraint.

What we're interested in is how the problem size grows as we increase the number of cities. Changing to 6 cities, we see "47 rows, 30 columns and 210 nonzeros". For 7 cities it is "70 rows, 42 columns and 756 nonzeros". The following table shows the story for different numbers of cities:

<table>
<tr><th>Cities</th><th>Rows</th><th>Columns</th><th>Nonzeros</th></tr>
<tr><td>5</td><td>20</td><td>20</td><td>60</td></tr>
<tr><td>6</td><td>47</td><td>30</td><td>210</td></tr>
<tr><td>7</td><td>70</td><td>42</td><td>756</td></tr>
<tr><td>8</td><td>170</td><td>56</td><td>1344</td></tr>
<tr><td>9</td><td>264</td><td>72</td><td>2232</td></tr>
<tr><td>10</td><td>647</td><td>90</td><td>8550</td></tr>
<tr><td>11</td><td>1034</td><td>110</td><td>28380</td></tr>
</table>

Immediately we see that the number of variables grow pretty quickly, but it's nothing compared to the numbers of constraints and nonzeros. And there is a good reason I stopped the table at 11 cities: choosing 12 cities or more takes us beyond the size limit of the Gurobi trial license. But by altering the code (not actually adding constraints, just counting how often we would have done so) we can continue counting the number of variables and constraints that would be added for larger problem (I'm ignoring nonzeros now). I went ahead and did that for a few more numbers of cities, and I'll show these extended results in the following plot:

<div class="plotlyLineChart" plot-data='[
    {
        "x": [5,6,7,8,9,10,11,12,13,14,15],
        "y": [20,47,70,170,264,647,1034,2521,4108,9921,16398],
        "type": "scatter",
        "name": "Rows"
    }, {
        "x": [5,6,7,8,9,10,11,12,13,14,15],
        "y": [20,30,42,56,72,90,110,132,156,182,210],
        "type": "scatter",
        "name": "Columns"
    }
]' plot-layout='{"xaxis": {"title": "Cities"}}'></div>

The plot for the number of columns just looks like a straight line, but it's really not. You can toggle lines on or off in the plot by clicking on the corresponding legend text, go ahead and do that to see the columns line by itself. It has an upward curve as well. In fact, we can easily characterize the number of columns in the model in terms of the number of cities. The variables are simply pairs of cities, so if there are $n$ cities then there are $n(n-1)\approx n^2$ city pairs[^cityPairOrderMatters]. But the number of rows in the model is largely determined by the number of subtour elimination constraints, and we have one of those for every _subset_ of the $n$ cities[^reallyHalfOfTheSubset]. For a set with $n$ elements, there are $2^n$ possible subsets[^countingSubsets].

[^cityPairOrderMatters]: Note that the order matters here, i.e. traveling from New York to DC is not the same as traveling from DC to New York. If order didn't matter, we could divide the number by 2.
[^reallyHalfOfTheSubset]: Actually, the way we modeled it in the notebook, we only used about half of the subsets, since the subtour elimination constraints suffice for both the subset they are built on and the complement set.
[^countingSubsets]: Why? Think about it like this: to create a subset one has to decide, for each element of the set, whether to include it or not. This gives you 2 choices $n$ independent times, or $2^n$ total choices.

So even though the $n^2$ columns grows markedly faster than linear, in the face of the truly exponential growth of $2^n$ constraints the plot might as well be a straight line. The difference between polynomial (e.g. $n^2$) and exponential growth is at the center of the theory we will now explore. Unfortunately, for most integer programs, an exponential growth rate like this is difficult (perhaps impossible) to avoid.

### Complexity "definitions"

We'd now like to formalize the type of discussion we had above, where we tried to tie the _size_ of a problem (e.g., the number of cities in a TSP) to the _number of steps_ required to solve the problem (e.g., the number of constraints we need to generate). But since complexity isn't a main focus of this course, we won't be very formal with our definitions. For the purposes of this class, we'll define the **size** of an instance of a given problem to be the size of a file on your computer that saves all the problem data. Of course, there could be several different ways to save the same problem data, some being more efficient than others. So let's say, again very informally, that the file is "close to" as efficient as possible at saving the data.

For a TSP with $n$ cities, how big of a file will we need? At a minimum, we'll need to save the distances between each pair of cities, and there are $\approx n^2$ of these pairs to consider. Furthermore, the actual distance numbers being saved also make a difference, since it takes less disk space to save a file with the number 1 in it than a file with the number 1,000,000,000,000,000[^relativelyPrimeNumbers]. But it is important to note that the amount of space needed to store a number is not proportional to the number itself, but rather its logarithm, in the same way that it doesn't take twice as many digits to write 300 than it does to write 150 even though the first number is twice the second. They both take three digits to write, because $2 < \log_{10}(150)\approx\log_{10}(300) < 3$[^logBase2ForComputers].

[^relativelyPrimeNumbers]: We can also talk about, say, dividing all the numbers by their greatest common denominator in order to save space, but we won't worry about that here.
[^logBase2ForComputers]: If we're talking about saving files on a computer that uses bits instead of digits, we'd take the logarithm with a base of 2 instead of 10.

Now, say you have an algorithm that solves a given problem type. We're interested in the number of "elementary calculations" (think addition, multiplication, etc.) required to solve any instance of a problem with size $s$. That number of steps, written as a function of $s$, is called the **running time** of the algorithm. We'll say that an algorithm is **polynomial** (or **polynomial-time**) if the number of steps required is $< s^r$ for some $r\in\R$.

Although we're ultimately working with optimization problems, the questions we'll be focusing on here relate to **decision problems**, i.e. questions for which the answer is either yes or no. But the two notions are related, in that given any optimization problem we can form a "decision version" of the problem. For example, the TSP asks you to find a minimum length tour that visits every city. The decision version would be something like "is there a tour that visits every city with length at most $k$" for some number $k$[^linkBetweenDecisionAndOptimization].

[^linkBetweenDecisionAndOptimization]: There is in fact a deeper link between decision and optimization problems. It is a little beyond the scope of this course to formalize, but I'll mention here: If the associated decision problem is solvable in polynomial time, then so is the optimization problem (one can solve the decision problem over and over again, and if you use a so-called bisection search on the objective function to guide which decision problems you solve, you'll only have to do so polynomially many times).

Finally, I should note that while it may look like I'm being lazy in approximating e.g. $n(n-1)\approx n^2$ (for the number of variables in our TSP model), it is actually a defacto rule in the theory to "not sweat the small stuff"[^bigONotation]. The important thing is how the function grows as $n$ grows, and for $n(n-1) = n^2 - n$ and $n$ very large, that $-n$ term adds very little. Similarly, in the TSP model we only added a constraint for about half of the possible subsets, so there were more like $2^n/2$ constraints. But we're comfortable approximating that by $2^n$ because what matters is more the _shape_ of the curve than the magnitude.[^constantsMatterInPractice]

[^bigONotation]: Formally, we would use what's known as "[big O notation](https://en.wikipedia.org/wiki/Big_O_notation)", which works like this: For two functions $f$ and $g$, we say that $f(n)\in O(g(n))$ if there are some numbers $c\in\R_+, n'\in\R$ such that $|f(n)|\leq c\cdot g(n)$ for all $n > n'$. Essentially, $g$ dominates $f$ in the limit (subject to some constant factor). From the definition, it is clear that $n(n-1)\in O(n^2)$.
[^constantsMatterInPractice]: This may seem unintuitive at first, and is the main point of conflict between the theory and the real world. Indeed, in any practical application, it would make a great deal of difference if your algorithm required $2n^2$ steps versus $10^{1000}n^2$ steps. If it's any consolation, in practice humongous constants like this do not tend to occur. It's also common for constants to start out higher when an algorithm is first introduced, only to be reduced as more research is put into the problem.

### The classes $\P$ and $\NP$

With these loose definitions in hand, we're now ready to discuss the two most famous complexity classes, and a way to win a million dollars.

The first of these famous classes is $\NP$[^originOfNpName]. For a problem to be in $\NP$, it must be true that given any instance for which the answer is "yes", there is a polynomial-time algorithm verifying the "yes" answer. Importantly, this algorithm is allowed to take a "small" (polynomial in the instance size) "hint" as input as well as the instance. The idea is that if someone found out the answer, they could prove it to you easily.

[^originOfNpName]: The name $\NP$ stands for "non-deterministic polynomial time" and is a leftover from the very first formalization of this notion, which came from so-called [non-deterministic Turing machines](https://en.wikipedia.org/wiki/Nondeterministic_Turing_machine). I wish the name were more indicative of the "easily verifiable" notion we present here, but the nomenclature is well entrenched now and we're well past the point of no return.

Taking TSP as an example, if I claim for some instance that there _is_[^noNeedToProveNoAnswer] a tour with length at most $k$, I can just provide you with a conforming tour (ordering of the cities), then you can verify it yourself in polynomial time by checking the length of that tour. So TSP is in the class $\NP$, as are (the decision versions of) LP, IP, and all the optimization problems we'll encounter in this class.

[^noNeedToProveNoAnswer]: Crucially, the ability to prove is one-sided. The definition said we need only be able to verify instances for which the answer is "yes". We need not be able to do anything for "no" instances.

The next important class is $\P$, which is the class of decision problems in $\NP$ for which there exists a polynomial-time algorithm to solve it (i.e. determine whether the answer is "yes" or "no"). This would include simple problems like determining if a list of numbers is in numerical order. It also includes some perhaps surprising problems, like determining whether a given number is prime. In fact, the decision version of our old friend linear programming is also in the class $\P$[^interiorPointPolynomial].

[^interiorPointPolynomial]: This result is due to analysis on various interior-point methods for LP, and interestingly not for the simplex method. As we've hinted at, there are various implementation details you need to hash out to run simplex in practice, and nobody has ever proven that any version of simplex is guaranteed to finish in polynomial time.

By way of the above definition, we know that $\P\subseteq\NP$, i.e. every problem that is polynomial-time solvable is polynomial-time verifiable. A reasonable question, then, is whether there are problems in $\NP$ that are not in $\P$ (i.e. problems that are easy to verify but difficult to solve). Or is that not the case, so that $\P=\NP$? The answer is... well, we actually don't know the answer! People have been working at this since the 1970s when these classes were first formalized, but a proof either way has still remained elusive. There would be interesting consequences to a proof in either direction[^pNpProofImplications]. The interest is so high that in the year 2000 the Clay Mathematics Institute named the $\P$ vs. $\NP$ problem among its 7 [Millennium Prize Problems](https://www.claymath.org/millennium-problems/), a list of important unsolved problems in a wide array of mathematical fields. The institute will award $1 million to anyone who resolves a problem from the list[^turnedDownAMillion].

[^pNpProofImplications]: For instance, if $\P\neq\NP$ then we'd know definitively that scalable algorithms for solving integer programs cannot exist. Meanwhile, if $\P=\NP$, then many of the algorithms we use today for cryptography (to, for example, keep your bank credentials safe while shopping online) are unsafe in principal and potentially vulnerable to attack. People also like to get philosophical when discussing the implications of $\P=\NP$, making provocative claims like "there is no difference between someone whe can appreciate art and an artist" or "anyone who can recognize good music is as talented as Mozart". There's truth in these statements as metaphors, but sometimes I find it hard to tell if these people actually mean them literally. As far as I'm concerned, these sweeping metaphysical claims don't follow from the theory.
[^turnedDownAMillion]: Interestingly, the (so far) [only person to solve one of these problems](https://en.wikipedia.org/wiki/Grigori_Perelman) turned down the money.

### $\NP$-complete and $\NP$-hard problems

<div class='lectureVideoEmbed' video-id='d36704377e374854b910f55e6caf11721d' video-date='2023-10-02'>Wrap up complexity, begin branch and bound</div>

While the main question in the field, $\P\stackrel{?}{=}\NP$, remains unsolved, there are still interesting things to be said about problems inside $\NP$. One of the most important notions is that of $\NP$-completeness. Central to this theory is the notion of a **problem reduction**, which is a way of taking an instance of one problem, applying some "small" (polynomially many) number of tweaks to it, then recovering an instance of a new problem. A problem is said to be **$\NP$-complete** if it is in $\NP$ and additionally there exists a way to reduce any other $\NP$ problem to it[^npCompleteAnyOtherProblem].

[^npCompleteAnyOtherProblem]: This may feel like a high bar to clear, since there are many different $\NP$ problems, so proving that _any_ of them can be reduced to a given problem of interest feels like an impossible amount of work. In practice, researchers identified a problem called [_satisfiability_ (or _SAT_)](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem) which encapsulates exactly this notion of $\NP$-completeness. Then, once you have _some_ $\NP$-complete problem, proving another is $\NP$-complete requires just reducing a known $\NP$-complete problem to your problem of interest.

Because of this property, one can think of the class of $\NP$-complete problems as the set of the "hardest" problems in $\NP$. This is because a polynomial-time algorithm for an $\NP$-complete problem would automatically imply a polynomial-time algorithm for any other $\NP$-complete problem (by first applying the polynomial-time reduction, then running the polynomial-time solution algorithm). It turns out that (the decision version of) IP, as well as TSP, knapsack, set covering, and several other interesting problems we can model with IPs, are all $\NP$-complete.

There is also a related notion called $\NP$-hardness. A problem is considered **$\NP$-hard** if, once again, there exists a polynomial-time reduction from any $\NP$ problem to it. But unlike with $\NP$-completeness, an $\NP$-hard problem does not need to be a member of $\NP$ itself. This allows us to talk about problems of interest that are not decision problems, e.g. optimization problems like integer programming.

### What makes IPs hard

It is this theory that lies at the heart of why IPs are so hard to solve in practice. Since nobody has proven $\P\neq\NP$ we cannot say with _absolute certainty_ that no efficient method for solving IPs exists. But the fact remains that IP is an $\NP$-hard problem, and after decades of research, nobody has been able to reduce theoretical run times down below something exponential in the input size. And this is true not just for IPs, but for _any_ of the [myriad $\NP$-complete](https://en.wikipedia.org/wiki/List_of_NP-complete_problems) and $\NP$-hard problems. Even beyond the "nobody has done it yet" argument, there are other interesting reasons why most would conjecture $\P\neq\NP$ over $\P=\NP$ (see e.g. [this blog post](https://scottaaronson.blog/?p=1720) from a well-known theoretical computer scientist). Given the state of things, what we'll see in this chapter is that the solution methods currently used for IPs can all induce exponentially[^jeffsLanguagePetPeeves] growing run-times.

[^jeffsLanguagePetPeeves]: Like I did with "more optimal" before, I can't help but point out another of my linguistic pet peeves here. You'll often here people talk about something "growing exponentially" in plain English, but it almost never fits the mathematical definition, i.e. the growth rate with respect to some factor $n$ is proportional to $p^n$ for some $p\in\R$. People will say it when the growth rate is only quadratic (grows like $n^2$). I've seen people label literal _linear growth_ as exponential, and I want to tear my hair out. But the most egregious thing is when people say something grows exponentially when they only have two data points, like "total sales this year grew exponentially over last year's total sales." Umm, you only have two data points. You can draw literally any kind of curve between two data points, so I guess you _could_ draw an exponential curve too, but come on. What justifies you calling it exponential over quadratic or linear or _literally anything else_?

But I'd like to point out, it's the run times that matter here, and not the number of possible solutions. Let's take TSP as an example, for which there are indeed exponentially many possible solutions, $2^n$ potential tours for an $n$-city instance. But the number of potential solutions is not the factor that determines complexity. After all, if I gave you a list of $n$ cities and asked you to put it in alphabetical order, you wouldn't lament the $2^n$ potential orderings of the cities and declare it impossible to find the correct one (the best [sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm) run times scale like $n\log n$). And linear programs have _infinitely many_ feasible solutions, but as we've discussed LPs are solvable in polynomial time[^lpExponentiallyManyCornerPoints].

[^lpExponentiallyManyCornerPoints]: You might object that there only finitely many corner-point solutions, and these are the only ones that matter. That's fair, but I'll point out that the number of corner points still grows exponentially, and there are other optimization problems with infinitely many solutions that are still polynomial-time solvable.

### All hope is not lost

Given the above, it seems there's ample reason to be pessimistic about the quest to find sub-exponential algorithms for integer programs. Does that mean that, given some integer program of more than modest size, we should simply bow our heads and wallow in misery, knowing an optimal solution will forever elude us? Of course not!

First off, there is still a possibility for a proof that $\P=\NP$! But even in a world where $\P\neq\NP$, we still have a chance. The theory is all about how run times grow as the size goes to infinity, but there is nothing in the theory that says at what size the problems become intractable. It's entirely possible that the size of the problems you're working on are small enough to solve in reasonable time.

For example, TSPs have been solved where the number of cities is in the 10,000s, and problems with hundreds of cities can often be solved within seconds[^betterTspSolvers]. Further, the knapsack problem is $\NP$-hard, but algorithms exist for it where the run time is exponential only in the size of the largest value coefficient, not the number of items considered. So if you're dealing with knapsack problems where the objective value coefficients are guaranteed to not be too large, solving the problem is suddenly efficient.

[^betterTspSolvers]: That's not to say that the IP formulation we coded for the TSP can solve instances of this size. The best TSP solvers use IP techniques, but they don't use the full model as we formulated. Later in class, I plan to show an example where we solve a TSP with Gurobi but without adding every subtour elimination constraint up front.

Another note is that we're talking about optimization problems where we want to provably find the best answer. But in practice, maybe you don't need the absolute best answer. Perhaps it is possible to run a heuristic that finds a "good enough" answer in a reasonable amount of time. (Although there is a whole section of complexity theory dedicated to approximation algorithms as well, and sometimes finding decent approximations is just as hard as finding actual optimal solutions).

All this to say - IPs are hard in general, and some are just too big to solve in a reasonable amount of time. But the gap between $0$ and "too big" can be substantial, and the number of useful instances within that gap is immense. Furthermore, a good knowledge of the usual solution techniques can help you model your problem in a way that is more likely to be solvable.
