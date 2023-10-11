<div class='assignmentContainer' id='Homework 6' sub-name='IP Models and Complexity' due='2023-10-09' grading-notes-link='https://colab.research.google.com/drive/19fV6KEsDaX656jcHkBX7ZI0YeSFJKmVI?usp=sharing'>
<div>
1. (5pts) Consider the Wyndor _integer_ programming problem (eq. 15 from the notes). Suppose the company is considering replacing the current manufacturing plants with newly-built facilities. Newer technologies would mean faster processing times for the various products, but updated regulations would mean the plants must be open for fewer hours per week. The relevant data for each plant is given in the below table:

    <table>
        <tr><th></th><th>Product 1 hrs/batch</th><th>Product 2 hrs/batch</th><th>Available hrs/week</th></tr>
        <tr><th class='rowHead' style='width:5rem'>Plant 1</th><td>0.5</td><td>0</td><td>3</td></tr>
        <tr><th class='rowHead'>Plant 2</th><td>0</td><td>1.2</td><td>8</td></tr>
        <tr><th class='rowHead'>Plant 3</th><td>2</td><td>1</td><td>13</td></tr>
    </table>

    Ignoring the substantial upfront costs, they'd like to know whether or not the new plants would improve their weekly profitability. They are willing to build none, some, or all of the new plants if the data supports it. Using Python and whichever modeling library you prefer, model and solve a single integer program to determine which new plants they should open in order to maximize weekly profit.

1. (5pts)$^\text{\textdagger}$ The assignment problem is a well-known OR problem that works like this: There are $n$ people available to carry out $n$ jobs. Each person is assigned to carry out exactly one job. Some individuals are better suited to particular jobs than others, so there is an estimated cost $c_{ij}$ if person $i$ is assigned to job $j$. The problem is to
find a minimum cost assignment.

    Using whichever modeling library you choose, create a Python function that takes as input the problem data, and prints out the optimal assignment. Problem data must be of the form returned by this Python function:

    ```python
    import random
    def generate_random_assignment(n):
        people = [f'person_{i}' for i in range(n)]
        jobs = [f'job_{i}' for i in range(n)]
        costs = {(p, j): random.randint(1, 10) for p in people for j in jobs}
        return {
            'people': people,
            'jobs': jobs,
            'costs': costs
        }    
    ```

    Then your function signature should look like this:

    ```python
    def solve_assignment(people, jobs, costs):
    ```

    So an instance can be run like this:

    ```python
    instance = generate_random_assignment(5)
    solve_assignment(**instance)
    ```

1. (5pts) Suppose the Fly-Right Airplane Company continues to find themselves in the situation from homework 5, question 1c; They receive custom orders from several companies each week. Further, the number of custom orders they can accommodate varies from week to week. As the resident OR expert, you'd like to be able to solve these problems every week with minimum modeling effort.

    Using whichever modeling library you choose, create a Python function that takes as input the problem data, and prints out how many airplanes to produce for each customer (if any) to maximize the company’s total profit. Problem data must be of the form returned by this Python function:

    ```python
    import random
    def generate_random_fly_right(num_customers):
        customers = [f'order_{i}' for i in range(num_customers)]
        return {
            'customers': customers,
            'start_costs': {c: random.randint(1, 5) for c in customers},
            'net_revenue': {c: random.randint(1, 5) for c in customers},
            'capacity_per_plane': {c: random.randint(1, 5) / 10 for c in customers},
            'max_order': {c: random.randint(1, 5) for c in customers},
            'max_customers_accommodated': random.randint(1, num_customers - 1)
        }   
    ```

    Then your function signature should look like this:

    ```python
    def solve_fly_right(customers, start_costs, net_revenue, capacity_per_plane, max_order, max_customers_accommodated):
    ```

    So an instance can be run like this:

    ```python
    instance = generate_random_fly_right(5)
    solve_fly_right(**instance)
    ```

    [Extra note 10/4: You can ignore that `max_customers_accommodated` value if you wish. When I first read the original problem (in HW 5) I read the "not be able to accept all three orders" line as meaning they could only make planes for up to two of the three customers. So this value was supposed to mean they could only make planes for up to `max_customers_accommodated` in your models. But I noticed in the last homework that nobody else interpreted it that way (and I think for good reason). So I'm ok with you don't have that value anywhere your model.]

1. (3pts) Below I give plain English descriptions of some complexity classes from the course notes. Please identify the class corresponding to each description:
    - The class of decision problems that are easy to solve.
    - The class of decision problems for which a "yes" answer is easy to verify.
    - The class of the hardest decision problems for which it is still easy to verify a "yes" answer.

1. (2pts) The knapsack problem is an optimization problem one might term as: "Given a set of items, each with a value and a weight, and a weight limit for your backpack, what is the maximum total value of items you can fit into your backpack?". Please give a similar description, but this time for the decision version of the knapsack problem.
</div>
</div>
