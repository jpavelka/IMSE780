## IP modeling

Hopefully the preceding section gave you some appreciation for why integrality constraints can be useful. The aim for this section is to give you a broader idea of what situations can be modeled with IPs. Of particular interest is the use of binary variables to encode different types of logic in our models.

### General integer variables

The most straightforward application if IPs is modeling an LP where the decision variables can't be fractional. For example, say you're building an optimization model to decide how many washing machines to buy for your fleet of laundromats. There is no way to meaningfully buy, say, half of a washing machine to deploy in your stores. This is a case where integer-valued decisions are required.

As far as writing out the model, it is as simple as adding a $\x\in\I^n$ line to your formulation. For example, suppose in the Wyndor Glass sample LP (+@eq:prototypeLp) we can only make whole batches of each product. A new formulation would look like:

$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 \\
     && x_1,x_2 & \in \ \I_+
\end{align*}
$$

{#eq:wyndorIp}

We've seen in +@sec:ipRoundingNotEnough that the optimal solution can change quite a bit when moving from real-valued variables to integral ones, motivating the IP solution techniques we'll be exploring later.

### Binary variable tricks {#sec:binVarTricks}

Finding solutions with general integer values is great. But in my opinion the real power in integer programming comes from using binary variables to encode new kinds of logic that you can't replicate in a linear program. In this section, we will explore some of these binary variable tricks. We'll consider +@eq:wyndorIp, our new integer version of the Wyndor glass problem, as a jumping-off point for our examples.

<h4>Either/or constraints</h4>

For our first example, let's consider a scenario where exactly one out of two constraints needs to be satisfied, and we get to decide which one to enforce as part of the problem. For example, let's consider a modification to the Wyndor glass IP +@eq:wyndorIp where we have the potential to build a new facility to replace Plant 3. This new facility would be available for only 13 hours per week. However, due to updated technology, producing batches of each product will take less time: Product 1 will require 2 hours at the new Plant 3, while Product 2 will require only 1 hour. In effect, we'd like to replace the old Plant 3 constraint with something like:

$$
\begin{align*}
\text{either}&&3x_1 + 2x_2 \leq 18 \\
\text{or}    &&2x_1 + x_2 \leq 13
\end{align*}
$$

There is no "native" facility for this type of constraint in IP, we're still stuck with only linear functions of our decision variables. But we can implement this "either/or" logic by adding an auxiliary, binary variable $y$ to the problem in a certain fashion[^alternateMethodologies]. Consider the following IP:

[^alternateMethodologies]: Another way to approach this particular problem may be to just solve two different IPs, one with the first constraint and one with the second, then compare the resultant solutions. But it's not too hard to imagine a scenario where perhaps a new build is considered for each facility, and with enough facilities you wouldn't want to do a new model for each possible combination of new/old facilities.

$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 + My \\
     && 2x_1 + x_2 & \leq 13 + M(1 - y)\\
     && x_1,x_2 & \in \ \I_+ \\
     && y & \in \ \{0, 1\}
\end{align*}
$$

Here, $M$[^bigMAgain] is some sufficiently large constant (something like 100 would be more than sufficient in this case).

[^bigMAgain]: This is the second time we've seen $M$ represent some very large number - it's a recurring theme in OR.

What did we accomplish by adding $y$ and $M$ in this manner? First, let's notice that the new constraints are still linear functions of the variables. (Remember, $M$ is a constant and not a variable.) Now, think what it would mean if $y=1$. In that case, the constraint

$$
3x_1 + 2x_2 \leq 18 + My
$$

becomes

$$
3x_1 + 2x_2 \leq \textit{some very large number}
$$

so that any reasonable setting of the $\x$ variables will satisfy it. Meanwhile, the constraint

$$
2x_1 + x_2 \leq 13 + M(1 - y)
$$

becomes just 

$$
2x_1 + x_2 \leq 13
$$

So if we choose $y=1$, then only the constraint $2x_1 + x_2 \leq 13$ will matter, i.e. we're using the new facility. Similarly, if we set $y=0$, then the only constraint that matters is $3x_1 + 2x_2 \leq 18$, i.e. we're not using the new facility and making due with the old one. Thus we've successfully recreated the either/or logic using linear constraints and binary variables!

<h4>Functions taking one of $n$ possible values</h4>

Sometimes the right-hand side of your linear constraints might be able to take one of several distinct values. As an example, let's say that Wyndor's Plant 3 may be open for additional hours at some extra cost. It may remain open for 3 extra hours at a cost of \$2,000, or it may remain open for 6 extra hours at a cost of \$4,500. How could +@eq:wyndorIp be modified to take this into account? Take a look at this formulation:

$$
\begin{align*}
\max && 3x_1 + 5x_2 - 2y_1 - 4.5y_2 & \\
\st  && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 + 3y_1 + 6y_2 \\
     && y_1 + y_2 & \leq \ \ 1 \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2 & \in \ \{0, 1\}
\end{align*}
$$

By constraining $y_1 + y_2 \leq 1$, we allow only $(y_1, y_2)\in\{(0, 0),(1, 0),(0, 1)\}$. If $(y_1,y_2)=(0,0)$ this would reduce back to the original problem. If $(y_1,y_2)=(1,0)$ then we'd have the situation where the plant is open for 3 extra hours, and we've reduced our profits by \$2,000 to account for the extra cost. Similarly, if $(y_1,y_2)=(0,1)$ then we'll have an extra 6 hours of use in the plant, but at the required cost of \$4,500.

<h4>Fixed-charge formulations</h4>

A common occurrence in OR problems is a so-called **fixed-charge problem**, where there is a one-time setup cost involved in participating in some activity. Suppose in the Wyndor problem that the three facilities did not exist yet, so they need to decide which facilities to build as well as the ultimate product mix. Say that in order to build any of the plants, they'd need to take out a loan that they plan to pay back with their weekly profits for the foreseeable future. If the weekly payback for any given facility is \$6,000, how can we model this with an integer program? Take a look at the following formulation:

$$
\begin{align*}
\max && 3x_1 + 5x_2 - 6y_1 - 6y_2 -6y_3& \\
\st  && x_1 & \leq \ \ 4y_1  \\
     && 2x_2 & \leq 12y_2 \\
     && 3x_1 + 2x_2 & \leq 18y_3 \\
     && x_1,x_2 & \in \ \I_+ \\
     && y_1,y_2,y_3 & \in \{0, 1\}
\end{align*}
$$

We've added new binary variables, $y_1, y_2$, and $y_3$, which we'd like to interpret as a value of $1$ for $y_i$ means that facility $i$ will be built, and a value of $0$ means it won't be built. How does that alter the formulation? We know that building a facility will cost us \$6,000 weekly over the loan term, so we'll subtract \$6,000 from our weekly profits for any facility via the term $-6y_i$ in the objective. Furthermore, we can only use the time in each facility if it is built. So the constants on right-hand sides of the original formulation are all now multiplied by the corresponding $y_i$ variable. This way, if we decide not to build the facility by setting $y_i=0$, there is no time available at the (non-existent) facility. Otherwise, its time is available as usual.

<h4>Boolean algebra</h4>

Given binary variables $x_1, x_2$ we can mimic the basic operations from [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra)
(AND, OR, XOR) in integer programs. In each case, we'll do this with an auxiliary binary variable $y$. For each operation, I'll show the associated truth table (telling the values of $y$ that should correspond to each possible value of $x_1, x_2$) and the corresponding set of linear constraints. It's a good exercise to go through each row of the table and verify that the constraints do indeed enforce the relation.

- AND: $y=1$ if and only if $x_1=x_2=1$:
     <div style='display:flex;justify-content:space-around'>
     <div>
     <table><tbody>
     <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
     <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
     </tbody style='border:none'></table>
     </div>
     <div class='katexSideBySide'>
     $$
     \begin{align*}
     y&\leq x_1 \\
     y&\leq x_2 \\
     y&\geq x_1 + x_2 - 1
     \end{align*}
     $$
     </div>
     </div>
- OR: $y=1$ if and only if _at least_ one of $x_1$ or $x_2$ equals $1$:
     <div style='display:flex;justify-content:space-around'>
     <div>
     <table><tbody>
     <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
     <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
     <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
     <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
     </tbody style='border:none'></table>
     </div>
     <div class='katexSideBySide'>
     $$
     \begin{align*}
     y&\leq x_1 + x_2 \\
     y&\geq x_1 \\
     y&\geq x_2
     \end{align*}
     $$
     </div>
     </div>
- XOR: $y=1$ if and only if _exactly_ one of $x_1$ or $x_2$ equals $1$:
     <div style='display:flex;justify-content:space-around'>
     <div>
     <table><tbody>
     <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
     <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
     <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
     <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
     </tbody style='border:none'></table>
     </div>
     <div class='katexSideBySide'>
     $$
     \begin{align*}
     y&\leq x_1 + x_2 \\
     y&\geq x_1 - x_2 \\
     y&\geq x_2 - x_1 \\
     y&\leq 2 - x_1 - x_2
     \end{align*}
     $$
     </div>
     </div>

Note that these constraint sets wouldn't normally constitute an IP on their own, but instead they would be just a subset of the constraints you'd find inside a larger, more complex problem. Let's consider the following addition to the Wyndor IP: The company realizes that they cannot use the full 18 hours available at Plant 3 if they produce _both_ Product 1 and Product 2 during a given week, since they'll require some down time in order to set up the line for a change in product. They anticipate this setup to take 2 hours away from their production time.

We'll alter +@eq:wyndorIp by including three additional, binary variables $y_1, y_2$, and $z$. We'll set up the $y_i$ variables so that $y_i=1$ if we plan to produce any of Product $i$ (i.e. $x_i>0$), and we'll let $z=1$ if and only if $y_1=y_2=1$. The formulation follows:

$$
\begin{align*}
\max && 3x_1 + 5x_2 & \\
\st  && y_1 & \leq x_1 \\
     && My_1 & \geq x_1 \\
     && y_2 & \leq x_2 \\
     && My_2 & \geq x_2 \\
     && z&\leq y_1 \\
     && z&\leq y_2 \\
     && z&\geq y_1 + y_2 - 1\\
     && x_1 & \leq \ \ 4  \\
     && 2x_2 & \leq 12 \\
     && 3x_1 + 2x_2 & \leq 18 - 2z \\
     && x_1,x_2 & \in \ \I_+
\end{align*}
$$

The constraints

$$
\begin{align*}
y_i & \leq x_i \\
My_i & \geq x_i \\
\end{align*}
$$

(with sufficiently large $M$) serve to ensure that $y_i=1$ if and only if $x_i>0$ (which, since we have $x_i\in\I$, also means $x_i\geq1$)[^truthTableVerification]. The next constraints involving $y_1, y_2$, and $z$ are exactly the AND logical constraints from above, ensuring that $z=1$ if and only if both $y_1$ and $y_2$ are 1 (and hence $x_1,x_2>0$). The final modification comes in the Plant 3 resource constraint

$$
3x_1 + 2x_2 \leq 18 - 2z
$$

which serves to reduce the available production time when both products are being produced.



[^truthTableVerification]: Verify this by seeing what the constraints reduce to when $x_i=0$ versus when $x_i>0$.

### Example word problems {#sec:ipWordProblems}

Here we present the sample scenarios in section 12.4 of @classText, and talk about how to model each scenario. Each formulation will require some tricks with binary variables.

<h4>Resource allocation with extra restrictions</h4>

> The Research and Development Division of the GOOD PRODUCTS COMPANY has developed three possible new products. However, to avoid undue diversification of the company’s product line, management has imposed the following restriction:
>
> Restriction 1: From the three possible new products, at most two should be chosen to be produced.
>
> Each of these products can be produced in either of two plants. For administrative reasons, management has imposed a second restriction in this regard.
>
> Restriction 2: Just one of the two plants should be chosen to be the sole producer of the new products.
>
> The production cost per unit of each product would be essentially the same in the two plants. However, because of differences in their production facilities, the number of hours of production time needed per unit of each product might differ between the two plants. These data are given in Table 12.2, along with other relevant information, including marketing estimates of the number of units of each product that could be sold per week if it is produced. The objective is to choose the products, the plant, and the production rates of the chosen products so as to maximize total profit.

![Data for the Good Products Company problem [@classText]](images/ip-example-1-data.png)

This feels a lot like the Wyndor Glass problem, but there are several extra restrictions put in. First of all, we have a bound on the number of items sold per week, but this is something that we could handle in plain old linear programming. More interesting are Restriction 1 and Restriction 2, which will require us to add some binary variables to the formulation and carefully set up the constraints to enforce the desired logic. To that end, let's examine the following model[^textbookNotIntegerX]:

[^textbookNotIntegerX]: For some reason, the presentation of this problem in the textbook leaves the $x_i$ variables are real-valued instead of integers. I figure integers are more realistic, and since we're in the IP portion of the notes, why not do it that way?

$$
\begin{align*}
\max && 5x_1 + 7x_2 + 3x_3& \\
\st  && x_1 & \leq 7y_1  \\
     && x_2 & \leq 5y_2 \\
     && x_3 & \leq 9y_3 \\
     && y_1 + y_2 + y_3 & \leq 2 \\
     && 3x_1 + 4x_2 + 2x_3 & \leq 30 + My_4 \\
     && 4x_1 + 6x_2 + 2x_3 & \leq 40 + M(1 - y_4) \\
     && x_1,x_2,x_3 & \in \ \I_+ \\
     && y_1,y_2,y_3,y_4 & \in \{0, 1\}
\end{align*}
$$

Without the $y_i$ variables, this is essentially just another resource allocation problem like the integer version of the Wyndor problem +@eq:wyndorIp. But now we have variables $y_1, y_2, y_3$ to account for the problem's Restriction 1, and $y_4$ accounts for Restriction 2.

How does it work? Well, $y_4$ is applying the either/or constraint trick we saw earlier in +@sec:binVarTricks. Notice that if $y_4=1$ (and $M$ is selected large enough) then the constraint on production in Plant 1 has so much slack that any reasonable settings of the $x_i$ variables will not violate it. Thus the only constraint in effect is the Plant 2 resource constraint. So the interpretation is that $y_4=1$ means that Plant 2 is the plant chosen to satisfy Restriction 2. Similarly, $y_4=0$ means that Plant 1 is the one selected plant that handles the production.

How about the other $y_i$ variables? Notice that if $y_i=0$ for any $i$, then the corresponding constraint on $x_i$ becomes $x_i\leq0$, meaning that Product $i$ cannot be produced. Otherwise, if $y_i=1$, then $x_i$ is only bounded by the weekly sales potential from the table, and thus Product $i$ _is_ allowed to be produced. Then adding the constraint $y_1 + y_2 + y_3 \leq 2$ codifies the requirement that at most 2 of the products may be produced.

<h4>Violating proportionality</h4>

> The SUPERSUDS CORPORATION is developing its marketing plans for next year’s new products. For three of these products, the decision has been made to purchase a total of five TV spots for commercials on national television networks. The problem we will focus on is how to allocate the five spots to these three products, with a maximum of three spots (and a minimum of zero) for each product.
>
> The following table shows the estimated impact of allocating zero, one, two, or three spots to each product. This impact is measured in terms of the profit (in units of millions of dollars) from the additional sales that would result from the spots, considering also the cost of producing the commercial and purchasing the spots. The objective is to allocate five spots to the products so as to maximize the total profit.

![Data for Supersuds Corporation problem [@classText]](images/ip-example-2-data.png)

Your first thought for modeling this may be to have integer variables $x_1, x_2, x_3$, with the value of $x_i$ denoting the number of TV spots allocated to product $i$. But this won't work, because the objective violates the so-called _proportionality assumption_ for linear functions, i.e. that each extra unit of a variable affects the value of the function by the same amount. That is not true here, e.g. for product 1 doubling from 1 spot to 2 does not double the profit.

Instead, let's define a separate binary variable for each product and each possible selection of TV spots for the product. So we'll have a binary variables $y_{ij}$ such that $y_{ij}=1$ if and only if we decide on $j$ TV spots for product $i$, and otherwise $y_{ij}=0$. With this setup, our model would look like:

<div class='mathSmall'>
$$
\begin{align*}
\max && y_{11} + 3y_{12} + 3y_{13} + 2y_{22} + 3y_{23} - y_{31} + 2y_{32} + 4y_{33}& \\
\st  && y_{11} + y_{12} + y_{13} & \leq 1 \\
     && y_{21} + y_{22} + y_{23} & \leq 1 \\
     && y_{31} + y_{32} + y_{33} & \leq 1 \\
     && y_{11} + 2y_{12} + 3y_{13} + y_{12} + 2y_{22} + 3y_{23} + y_{31} + 2y_{32} + 3y_{33} & \leq 5 \\
     && y_{ij} & \in \{0,1\} \ \ \forall\ i,j
\end{align*}
$$
</div>

The objective is straightforward, coming directly from the numbers in the table. As for the constraints, lets start with the first three. We shouldn't have something like, say, both $y_{11}=1$ and $y_{12}=1$, since it doesn't make sense to allocate both $1$ and $2$ spots for the same product. At most one of $y_{i1}, y_{i2}$, or $y_{i3}$ can be chosen which is why we've included the 

$$
y_{i1} + y_{i2} + y_{i3} \leq 1
$$

constraints.

What about the final (functional) constraint? The left-hand side of the constraint sums up the total number of TV spots that are allocated. So the reason that, for example, we see the term $3y_{13}$ is that selecting $y_{13}=1$ allocates 3 spots to product 1, thus making use of 3 of the available 5 slots. Then the 5 on the right-hand side enforces that at most 5 TV spots are allocated overall.

<h4>Covering all characteristics</h4>

> SOUTHWESTERN AIRWAYS needs to assign its crews to cover all its upcoming flights. We will focus on the problem of assigning three crews based in San Francisco to the flights listed in the first column of the following table. The other 12 columns show the 12 feasible sequences of flights for a crew. (The numbers in each column indicate the order of the flights.) Exactly three of the sequences need to be chosen (one per crew) in such a way that every flight is covered. (It is permissible to have more than one crew on a flight, where the extra crews would fly as passengers, but union contracts require that the extra crews would still need to be paid for their time as if they were working.) The cost of assigning a crew to a particular sequence of flights is given (in thousands of dollars) in the bottom row of the table. The objective is to minimize the total cost of the three crew assignments that cover all the flights.

![Data for Southwestern Airways problem [@classText]](images/ip-example-3-data.png)

We can model this problem in the following way, with the binary variable $x_i=1$ if we assign sequence $i$ to some crew, and otherwise $x_i=0$:

<div class='mathSmall'>
$$
\begin{align*}
\min && 2x_1 + 3x_2 + 4x_3 + 6x_4 + 7x_5 + 5x_6 & \\
     && + 7x_7 + 8x_8 + 9x_9 + 9x_{10} + 8x_{11} + 9x_{12}& \\
\st  && x_1 + x_4 + x_7 + x_{10} & \geq 1 \qquad  \text{(SF to LA)} \\
     && x_2 + x_5 + x_8 + x_{11} & \geq 1 \qquad \text{(SF to Den)} \\
     && x_3 + x_6 + x_9 + x_{12} & \geq 1 \qquad \text{(SF to Sea)} \\
     && x_4 + x_7 + x_9 + x_{10} + x_{12} & \geq 1 \qquad \text{(LA to Chi)} \\
     && x_1 + x_6 + x_{10} + x_{11} & \geq 1 \qquad \text{(LA to SF)} \\
     && x_4 + x_5 + x_9 & \geq 1 \qquad \text{(Chi to Den)} \\
     && x_7 + x_8 + x_{10} + x_{11} + x_{12} & \geq 1 \qquad \text{(Chi to Sea)} \\
     && x_2 + x_4 + x_5 + x_9 & \geq 1 \qquad \text{(Den to SF)} \\
     && x_5 + x_8 + x_{11} & \geq 1 \qquad \text{(Den to Chi)} \\
     && x_3 + x_7 + x_8 + x_{12} & \geq 1 \qquad \text{(Sea to SF)} \\
     && x_6 + x_9 + x_{10} + x_{11} + x_{12} & \geq 1 \qquad \text{(Sea to LA)} \\
     && \sum_{j=1}^{12} x_j & = 3 \qquad \text{(3 crews)} \\
     && x_j & \in \{0,1\} \ \ \ \forall\ j
\end{align*}
$$
</div>

The objective function is straightforward: if we assign one of the sequences to some crew, then we must pay the costs according to the bottom row of the table. Our constraints are that we are required to cover every flight. Take the first constraint for example. This is the constraint that enforces that we must have some crew flying from SF to LA. Which sequences contain that flight? From the first row in the table, we see this leg is included in sequences 1, 4, 7, and 10. So we are required to select at least one of those sequences to make sure there is a crew flying from SF to LA, hence we have the constraint $x_1 + x_4 + x_7 + x_{10} \geq 1$.

In the final formulation, we follow this logic for every flight in the table. Lastly, we are required to make an assignment for three crews, which we encode with the $\sum_{j=1}^{12} x_j = 3$ constraint.

### Model/data separation

The above ad-hoc modeling is useful, but in real applications we often have to solve different, but similarly structured models on some regular schedule. We'd prefer not to write a new model from scratch every time we need to solve one. As we discussed in +@sec:lpModelDataSep, the best practice is to write[^writeComputerCode] a base, general model which encodes all the logic for the problem, then inject the relevant problem data when an instance needs to be solved.

[^writeComputerCode]: Ideally in computer code.

To that end, in this section we'll present some generalized IP formulations for common OR problems.

<h4>Knapsack</h4>

We'll start with a simple one, the [knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem). The classical framing is something like this: you're going on a camping trip. The weight you can carry in your backpack is limited to $W\in\R$. There are $n$ items you can take with you, and for each $j\in\{1,2,\dots,n\}$, item $j$ has some weight $w_j$ and some value to you $v_j$. The goal is to select which items to take with you, subject to the weight constraint, such that the total value of the items taken is maximized.

We can model this problem with binary variables $x_j$, $j\in\{1,2,\dots,n\}$ so that $x_j=1$ if we choose to take item $j$, and otherwise $x_j=0$. The formulation looks like:

$$
\begin{align*}
\max&& \sum_{j=1}^n v_jx_j& \\
\st&& \sum_{j=1}^n w_jx_j&\leq W \\
&&x_j&\in\{0, 1\} \ \ \forall \ j\in\{1,2,\dots,n\}
\end{align*}
$$

<h4>Set covering</h4>

The [set covering problem](https://en.wikipedia.org/wiki/Set_cover_problem) is another classic OR problem with several applications (the Southwestern Airlines crew scheduling problem in +@sec:ipWordProblems was one example). In abstract terms, the idea is that there is some set of items $S$, and some number of $n$ subsets[^newNotationSubset] $S_j\subseteq S$, $j\in\{1,2,\dots,n\}$. The idea is to choose some collection of the subsets so that every member of $S$ is also present in at least one subset.

[^newNotationSubset]: New notation: when we write $S'\subseteq S$, we mean to say that $S'$ is a subset of $S$. That is, $S$ and $S'$ are both sets, and every element of $S'$ is also an element of $S$.

Ok, that was a mouthful, let's try to explain with an example. Remember the airline crew scheduling problem referenced above? In that case, the base set $S$ was the set of flight segments that the airline needed to fly (SF to LA, Chicago to Denver, etc.). The $S_j$ subsets were the feasible flight sequences, like sequence 6 from the table that consisted of flying from SF to Seattle, then Seattle to LA, and finally LA to SF. Our job was to select the flight sequences such that every flight segment was flown at least once[^notQuiteSetCover].

[^notQuiteSetCover]: Plus an extra constraint on the number of flight segments to choose - this constraint is not included in the classical set covering problem.

Let's give one more example to motivate our formulation. Say a new city is deciding where to place their fire stations. They require that every neighborhood in the city can be reached in under 5 minutes by at least one fire station. There are $n$ potential building sites for the new stations, and $m$ different neighborhoods in the city (so $S=\{1,2,\dots,m\}$). For each potential building site $j\in\{1,2,\dots,n\}$, there is a set $S_j\subseteq S$ of neighborhoods that can be reached from that site in under 5 minutes. There is also a cost $c_j\in\R$ associated with building a station at site $j$. How can the city minimize building costs while still meeting the requirements?

Our formulation will include binary variables $x_j$ with the interpretation that a station will be built at site $j$ if and only if $x_j=1$. The formulation follows[^newNotationConditionalSet]:

[^newNotationConditionalSet]: Note the new notation in the second summation, $\{j:i\in S_j\}$. We call this the "conditional set" notation in +@sec:symbols. It means the set of all $j$ such that the condition $i\in S_j$ is true.

$$
\begin{align*}
\min&& \sum_{j=1}^n c_jx_j& \\
\st&& \sum_{j:i\in S_j} x_j&\geq 1 & \forall i\in\{1,2,\dots,m\}\\
&&x_j&\in\{0, 1\} & \forall \ j\in\{1,2,\dots,n\}
\end{align*}
$$

<h4>Traveling salesman</h4>

We've touched on the traveling salesman problem (TSP) already, way back in +@sec:tsp. This is the famous problem where a salesman has a list of cities to visit and needs to find the shortest possible path that leads him through every city before returning to the starting point.

To formalize things a bit, say the salesman needs to visit a list of $n$ cities, and the distances between any two cities $i,j\in\{1,\dots,n\}, i\neq j$ is known and denoted as $d_{ij}$[^symmetricTSP]. We'll use binary variables $x_{ij}$ for each $i,j\in\{1,\dots,n\}, i\neq j$, with the interpretation that $x_{ij}=1$ if and only if the salesman chooses to travel directly from city $i$ to city $j$ as part of his path. A first attempt at this model might look like this:

[^symmetricTSP]: If $d_{ij}=d_{ji}$ for all $i,j$ then we call it a _symmetric TSP_. But this doesn't need to hold for our formulations to work.

$$
\begin{align*}
\min&& \sum_{i\in\{1,\dots,n\}}\sum_{j\in\{1,\dots,n\}:j\neq i} d_{ij}x_{ij}& \\
\st&& \sum_{j\in\{1,\dots,n\}:j\neq i} x_{ij} &= 1&& \forall \ i\in\{1,\dots,n\}\\
&& \sum_{i\in\{1,\dots,n\}:i\neq j} x_{ij} &= 1&& \forall \ j\in\{1,\dots,n\}\\
&&x_{ij}&\in\{0, 1\} && \forall \ i\neq j
\end{align*}
$$

On first inspection, this _looks like_ it's a correct formulation. There are two groups of constraints above. In the first group you set some $i$, then amongst all $j\neq i$ you ensure that exactly one $x_{ij}$ equals $1$. This has the effect of enforcing that the salesman leaves every town exactly once. The second group of constraints does something similar, enforcing that the salesman arrives in every town exactly once.

So, what's the problem? It might not be evident initially[^ipModelsNotStraightforward], but this formulation does nothing to eliminate so-called _subtours_ in the formulation. That is to say, the feasible solutions to the above model include a solution where the salesman visits, say, the first half of the cities in one tour and the second half of the cities in a second, separate tour, with no links between the two. A solution including subtours is illustrated below.

[^ipModelsNotStraightforward]: I can't tell you how many times I've come up with what I thought was a valid formulation for a problem, only to solve the model and get some invalid result because I overlooked some subtle case my model didn't cover. Modeling a given IP is not always as straightforward as it might initially appear.

![TSP subtours [@wolsey2020]](images/subtours.png)

To recover a valid formulation, we'll need to include constraints that make these subtours impossible. How might we do that? Consider the above image, where we see a subtour among cities 3, 8, and 9. We can keep this from happening by way of a constraint that ensures that the salesman travels at least once between some city in the set $\{3, 8, 9\}$ and another city not in that set, i.e. a city in the complement set $\{1, 2, 4, 5, 6, 7, 10\}$. That is, we can add the constraint:

$$
\sum_{i\in\{3, 8, 9\}}\sum_{j\in\{1, 2, 4, 5, 6, 7, 10\}}x_{ij} \geq 1
$$

Alternatively, we could write the constraint in terms of just the original set $\{3, 8, 9\}$ by restricting the number of edges between set members to less than 3 (the size of the set).

$$
\sum_{i\in\{3, 8, 9\}}\sum_{j\in\{3, 8, 9\}}x_{ij} \leq 2
$$

Of course, this constraint will only eliminate the possibility of that one subtour (and its complement). There are plenty of other subtours possible, one for essentially every subset of $\{1,\dots,n\}$. So a truly valid formulation for the TSP must include one of these __subtour elimination constraints__ for every[^tspAlmostEverySubset] subset $S\subseteq\{1,\dots,n\}$[^tspLotsOfConstraints]. Such a formulation including these constraints[^justSubtourElim] could look like[^newNotationEmptySet]: 

[^tspLotsOfConstraints]: If you're thinking "that could be a lot of constraints", you're right. It can be a problem. We'll be coming back to this observation later.

[^tspAlmostEverySubset]: Technically we don't need _every_ subset, since the same constraint will cover both the selected subset and its complement (e.g. the constraint above will eliminate the possibility of subtours in both sets $\{3, 8, 0\}$ and $\{1, 2, 4, 5, 6, 7, 10\}$). Further, subsets of size 1 are technically covered by the basic "leave every city once" constraints.

[^justSubtourElim]: In fact, you could make due with _only_ the subtour elimination constraints, since the original functional constraints are essentially just subtour elimination constraints for the subtours of size $n-1$.

[^newNotationEmptySet]: New notation: $\emptyset$ represents an empty set, i.e. a set with no elements. Technically, $\emptyset$ is a subset of all other sets, but we don't want to consider it in our formulation so we'll explicitly exclude it.

<div class="mathSmall">
$$
\begin{align*}
\min&& \sum_{i\in\{1,\dots,n\}}\sum_{j\in\{1,\dots,n\}:j\neq i} d_{ij}x_{ij}& \\
\st&& \sum_{j\in\{1,\dots,n\}:j\neq i} x_{ij} &= 1&& \forall \ i\in\{1,\dots,n\}\\
&& \sum_{i\in\{1,\dots,n\}:i\neq j} x_{ij} &= 1&& \forall \ j\in\{1,\dots,n\}\\
&& \sum_{i\in S}\sum_{j\in S:i\neq j}x_{ij} &\leq |S|-1 && \forall \ S\subseteq \{1,\dots,n\}, S\neq\emptyset\\
&&x_{ij}&\in\{0, 1\} && \forall \ i\neq j
\end{align*}
$$
</div>