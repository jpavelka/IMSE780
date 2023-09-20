<style>
    .assignmentContent {
        margin-left: 0.5rem;
        display: none;
    }
    .mathSmall {
        font-size: 0.8rem;
    }
    h1 {
        cursor: pointer;
        margin: 0;
    }
    h2 {
        margin-top: 0; 
    }
    pre.sourceCode {
        padding: 0.5rem;
    }
    .sourceCode {
        background-color: #eee;
    }
    .headerArrow {
        font-size: 1.2rem;
    }
    html {
        overflow-y: scroll;
    }
    td p {
        margin: 0;
    }
    th p {
        margin: 0.2rem;
    }
    img {
        border: 1pt solid black;
        display: block;
        margin: 1rem auto 1rem auto;
    }
    a {
        color: blue;
    }
    a:visited {
        color: purple;
    }
</style>

<script>
    window.onload = () => {
        for (el of document.getElementsByClassName('assignmentContainer')) {
            dt = el.getAttribute('data-due');
            gradingNotesLink = el.getAttribute('data-grading-notes-link') || '';
            el.innerHTML = `
                <h1 id="assignment${el.id}Header" onclick="headerClick('${el.id}')">
                    ${el.id} (due ${parseInt(dt.slice(5, 7))}/${parseInt(dt.slice(8, 10))})
                    <span id="assignment${el.id}HeaderArrow" class="headerArrow">&#9654;</span>
                </h1>
                <div id="assignment${el.id}Content" class="assignmentContent">
                    <h2>${el.getAttribute('data-sub-name')}</h2>
                    <a href="${gradingNotesLink}">${gradingNotesLink === '' ? '' : 'Partial solutions'}</a>
            ` + el.innerHTML + '</div>'
            if (new Date() <= addDays(new Date(dt), 1)) {
                headerClick(el.id);
            }
        }
        loc_split = window.location.href.split('/')
        document.getElementById('toNotes').setAttribute('href', 
            loc_split.slice(0, loc_split.length - 1).join('/') + '/?classmode=false'
        )
    }
    const headerClick = (elId) => {
        el = document.getElementById(`assignment${elId}Content`);
        displaying = el.style.display === 'block'
        el.style.display = displaying ? 'none' : 'block';
        arrowEl = document.getElementById(`assignment${elId}HeaderArrow`);
        arrowEl.innerHTML = displaying ? '&#9654;' : '&#9660;';
    }
    const addDays = (date, days) => {
        date.setDate(date.getDate() + days);
        return date;
    }
</script>

<a id='toNotes'>Course notes</a>

<div class='assignmentContainer' id='Homework 0' sub-name='Introduction and course goals' due='2023-08-28'>
<div>

I'd like to get to know a bit about my students. Please tell me about yourself and your goals for this course. Some information to include (if applicable).

- Your preferred name.
- Where you're from.
- Your current occupation, if not a full-time student.
- Your history at K-State (how long you've been here, what degree you're pursuing, etc.)
- Other colleges/universities attended and degrees obtained.
- Any prior exposure to operations research.
- Do you have any experience coding? In general and/or with Python specifically.
- Why you enrolled in this course.
- What you'd like to get out of this course.
- What you imagine yourself doing once you've completed your degree.
- Any personal information you feel comfortable sharing (hobbies, family, etc.)

</div>
</div>

<div class='assignmentContainer' id='Homework 1' sub-name='Intro to OR and Python' due='2023-09-04'>
<div>

1. (3pts) In class, we spoke about the Traveling Salesman Problem, the Job-Shop Scheduling problem, and the Portfolio Allocation problem as sample OR problems. Below I've given links to Wikipedia pages for a few other famous OR problems. Choose one and write a brief (1-2 paragraph) summary of the problem including a description, methodologies used to solve it, and real-world applications.\
    - [Knapsack](https://en.wikipedia.org/wiki/Knapsack_problem)
    - [Bin packing](https://en.wikipedia.org/wiki/Bin_packing_problem)
    - [Vehicle routing](https://en.wikipedia.org/wiki/Vehicle_routing_problem)
    - [Eight queens](https://en.wikipedia.org/wiki/Eight_queens_puzzle)
    - [Facility location](https://en.wikipedia.org/wiki/Facility_location_problem)

2. (3 pts) We spoke a bit in class about the Edelman prize, presented by the group INFORMS for the best application of OR methodologies in industry. Choose one of the finalist projects (look at page 33 [here](https://3449182.fs1.hubspotusercontent-na1.net/hubfs/3449182/2023_Edelman_Gala_Book.pdf)) and write a brief (2-3 paragraph) review. Include what problem they were trying to solve, what OR methodologies they applied, any reported results, and anything else you found interesting about the project.

3. (3 pts) Use Python to write a function that takes a single input, a list of numbers. The function should loop through the list and, on each iteration, print the number if it is the largest number the function has seen from the list so far, or tied for being the largest number. In particular, the first number should always be printed, the second number is only printed if it is greater than or equal to the first number, the third is only printed if it is greater than or equal to both the first and second number, and so on. The list passed to the function could be of any length.\
\
As an example, when passed the list [4,2,7,6,9,10,3,2], the output would look like:\
\
4\
7\
9\
10\
\
Submit your answer to this question in one of two ways:\
    - (Preferred) Give me a link to a Colab notebook where your function is defined. For this to work, you'll need to change the "Share" settings on the notebook (top-right of screen) under "General access". Choose "Anyone with the link" and give "Viewer" access.
    - Paste the function definition in your submission.

4. (1 pt) Multiple choice: How does your instructor feel about the phrase "more optimal"?
    a) It is a terrible misuse of the English language. Optimal means best, and something can't be "more best" than something else. You're either optimal or you're not.
    b) It's fine! Let people speak however they want! Definitions are just, like, opinions anyway.

</div>
</div>

<div class='assignmentContainer' id='Homework 2' sub-name='Intro to linear programming' due='2023-09-13' grading-notes-link='https://colab.research.google.com/drive/1IMatpj2ADUF3m6f2vUhLdmcvE_1e3fR-?usp=sharing'>
<div>

1. (2 pts) Complete this matrix multiplication:
    $$
    \begin{bmatrix}5&0&3\\2&6&4\end{bmatrix}
    \begin{bmatrix}7&1\\-2&4\\1&9\end{bmatrix}
    =\ ?
    $$

1. (4 pts) Below is a linear program written with various types of constraints and variables. Please give an equivalent formulation in our standard form.

    $$
    \begin{align*}
    \text{min} && 4x_1 + 7x_2 - 2x_3 & \\
    \text{s.t.}
        && x_1 + x_2 - 4x_3 & \geq \ \ 0  \\
        && 2x_1 + 2x_2 + x_3 & \leq 15 \\
        && 4x_1 + 2x_2 & = 18 \\
        && x_1,x_2 & \geq \ \ 0 \\
        && x_3 & \ \text{unrestricted}
    \end{align*}
    $$

1. (4 pts) Consider the model/data separation notebook in the notes (section 4.4.4). I was using it to solve some randomly-generated problems of various sizes, when I came across an instance for which an optimal solution was not found. I've made the instance data available online, which you can retrieve with this bit of python code (make sure to install the `requests` library with `pip` beforehand):

    ```python
    import requests
    url = 'https://raw.githubusercontent.com/jpavelka/IMSE780/main/data/hw/not_solved.json'
    bad_instance = requests.get(url).json()
    bad_instance['activity_resource_needs'] = {
        tuple(k.split(',')): v for k, v in bad_instance['activity_resource_needs'].items()
    }
    ```

    Examine the instance data, e.g. by running
    
    ```python
    from pprint import pprint
    pprint(bad_instance)
    ```

    and tell me why it has no optimal solution.

1. (4 pts) Consider the sample LP from our class notes (the Wyndor Glass problem). The company would additionally like to consider the following scenarios (each scenario is distinct from the others, do not combine them).
    a. Due to maintenance in a future week, only half of the usual time will be available at Plant 2. How many batches of each product should they make that week, and what will be their profit?
    b. They believe that by paying overtime, they can expand the number of hours available at each facility. For a cost of $6,000, they can add two hours of availability at each facility every week. Would you advise them to do so? Why?
    c. They are considering adding a new product in the future. This product would require 2 hours of processing time at each facility per batch, and each batch would net a profit of $7,000. Would you advise them to offer this product? Why?

1. (6 pts)* Using Python and whichever modeling library you prefer, formulate the following problem as a linear program and report the optimal solution. See <a href='#pyInstructions'>here</a> for instructions on submitting Python-based assignments.\
\
Larry Edison is the director of the Computer Center for Buckly College. He now needs to schedule the staffing of the center. It is open from 8 A.M. until midnight. Larry has monitored the usage of the center at various times of the day, and determined that the following number of computer consultants are required:
    
    <table>
    <tr>
        <th>Time of Day</th><th>Min. # of Consultants</th>
    </tr>
    <tr>
        <td>8am-12pm</td><td>4</td>
    </tr>
    <tr>
        <td>12pm-4pm</td><td>8</td>
    </tr>
    <tr>
        <td>4pm-8pm</td><td>10</td>
    </tr>
    <tr>
        <td>8pm-12am</td><td>6</td>
    </tr>
    </table>

    Two types of computer consultants can be hired: full-time and part-time. The full-time consultants work for 8 consecutive hours in any of the following shifts: morning (8 A.M.–4 P.M.), afternoon (noon–8 P.M.), and evening (4 P.M.–midnight). Full-time consultants are paid $40 per hour. Part-time consultants can be hired to work any of the four shifts listed in the above table. Part-time consultants are paid
    $30 per hour.\
\
An additional requirement is that during every time period,
there must be at least 2 full-time consultants on duty for every part-time consultant on duty.
Larry would like to determine how many full-time and how
many part-time workers should work each shift to meet the above requirements at the minimum possible cost.

</div>
</div>

<div class='assignmentContainer' id='Homework 3' sub-name='The simplex method' due='2023-09-18' grading-notes-link='https://colab.research.google.com/drive/1ESgWjaS1rzgfaAbK2jfEvtqfjUSo15zF?usp=sharing'>
<div>
1. (8pts)* Fred Jonasson manages a family-owned farm. To supplement several food products grown on the farm, Fred also raises pigs for market. He now wishes to determine the quantities of the available types of feed (corn, tankage, and alfalfa) that should be given to each pig. Since pigs will eat any mix of these feed types, the objective is to determine which mix will meet certain nutritional requirements at a minimum cost. The number of units of each type of basic nutritional ingredient contained within a kilogram of each feed type is given in the following table, along with the daily nutritional requirements and feed costs:

    <table>
    <tr>
        <th></th><th>kg of Corn</th><th>kg of Tankage</th><th>kg of Alfalfa</th><th>Min Daily Requirement</th>
    </tr>
    <tr>
        <td><b>Carbs</b></td><td>90</td><td>20</td><td>40</td><td>200</td>
    </tr>
    <tr>
        <td><b>Protein</b></td><td>30</td><td>80</td><td>60</td><td>180</td>
    </tr>
    <tr>
        <td><b>Vitamins</b></td><td>10</td><td>20</td><td>60</td><td>150</td>
    </tr>
    <tr>
        <td><b>Cost</b></td><td>$2.10</td><td>$1.80</td><td>$1.50</td><td></td>
    </tr>
    </table>

    a. Model the problem as a linear program.
    b. Rewrite your model as a matrix system set up for running simplex, adding slack and/or artificial variables as necessary. The matrix should be set up such that it is ready for a new iteration of simplex, i.e. it should look something like:
    
    <div class='mathSmall'>
    $$
    \begin{bmatrix}
        1 & -c_1    & -c_2    & \cdots & -c_{n-m}  & 0 & 0 & \cdots & 0 \\
        0 & a_{1,1} & a_{1,2} & \cdots & a_{1,n-m} & 1 & 0 & \cdots & 0 \\
        0 & a_{2,1} & a_{2,2} & \cdots & a_{2,n-m} & 0 & 1 & \cdots & 0 \\
        \vdots & \vdots & \ddots & \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\
        0 & a_{m,1} & a_{m,2} & \cdots & a_{m,n-m} & 0 & 0 & \cdots & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ \vdots \\ x_n
    \end{bmatrix}
    =
    \begin{bmatrix}
        \textit{objective value} \\ b_1 \\ b_2 \\ \vdots \\ b_m
    \end{bmatrix}
    $$
    </div>

1. (12pts) The following matrix systems each display a system of equations ready for an iteration of the simplex method. For each system, tell me:
 - What variables make up the current basis?
 - What is the objective value at the current basic solution?
 - Is the current basis optimal?
 - If the current basis is not optimal, further provide the following:
   - What variable would you next bring into the basis?
   - Given your selection of incoming variable, what variable should exit the basis?
   - Given your selection of incoming and outgoing variables, what are the values for all the variables at the next basic solution?
 
    a.
    $$
    \begin{bmatrix}
        1 &  1 &  1 & -2 & 0 & 0 & 0 \\
        0 &  1 &  2 & -1 & 1 & 0 & 0 \\
        0 & -2 &  4 &  2 & 0 & 1 & 0 \\
        0 &  2 &  3 &  1 & 0 & 0 & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\x_5 \\ x_6
    \end{bmatrix}
    =
    \begin{bmatrix}
        0 \\ 20 \\ 60 \\ 50
    \end{bmatrix}
    $$
    b.
    $$
    \begin{bmatrix}
        1 & -3 & -5 & -6 & 0 & 0 & 0 & 0 \\
        0 &  2 &  1 &  1 & 1 & 0 & 0 & 0 \\
        0 &  1 &  2 &  1 & 0 & 1 & 0 & 0 \\
        0 &  1 &  1 &  2 & 0 & 0 & 1 & 0 \\
        0 &  1 &  1 &  1 & 0 & 0 & 0 & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\x_5 \\ x_6 \\ x_7
    \end{bmatrix}
    =
    \begin{bmatrix}
        0 \\ 4 \\ 4 \\ 4 \\ 3
    \end{bmatrix}
    $$
    c.
    $$
    \begin{bmatrix}
        1 & 0 &   -1 &  0 & 0 & 0 &   2 \\
        0 & 0 &    2 &  1 & 0 & 0 &  -1 \\
        0 & 0 &  7/2 &  0 & 1 & 0 & 3/2 \\
        0 & 0 &    2 &  0 & 0 & 1 &   0 \\
        0 & 1 &  1/2 &  0 & 0 & 0 & 1/2 \\
    \end{bmatrix}
    \begin{bmatrix}
        Z \\ x_1 \\ x_2 \\ x_3 \\ x_4 \\x_5 \\ x_6
    \end{bmatrix}
    =
    \begin{bmatrix}
        8 \\ 2 \\ 9 \\ 5 \\ 2
    \end{bmatrix}
    $$

</div>
</div>

<div class='assignmentContainer' id='Homework 4' sub-name='LP duality and sensitivity' due='2023-09-25'>
<div>

1. (4pts) Construct the dual to the following linear program:
    $$
    \begin{align*}
    \max && 3x_1 - 4x_3 \\
    \st  && 4x_1 + 5x_2 + 7x_3 & \leq 15 \\
         && x_1 + 3x_2 - x_3 & \leq 8 \\
         && x_1,x_2,x_3 & \geq 0
    \end{align*}
    $$

1. (4pts) Suppose some vector $\x$ satisfies $\A\x=\b$, $\x\geq 0$, and some vector $\y$ satisfies $\y\A\geq\c$.
    a. What does the weak duality theorem tell you about how the values $\c\x$ and $\y\b$ relate to each other?
    b. Without appealing directly to weak duality, prove that the relationship from part (a) holds. (Meaning, don't just say it is true because of weak duality. Go through the matrix math necessary to show it. It is ok for your proof to follow the same sort of steps we took in class while proving weak duality.)

1. (4pts) In section 4.8.3 of the notes, we calculated the allowable range for $b_2$ in the Wyndor problem, i.e. the range over which the number of hours available at Plant 2 could change without altering the problem's optimal basis. Follow the same process to find the allowable range for $b_3$.

1. (4pts) Suppose that the Wyndor problem were altered in one of the following ways. Will the optimal basis for the original problem still be optimal in the altered problem? Provide your reasoning. (Each scenario is distinct, do not combine them.)
    a. Production capacities at all facilities are increased. There are now 7 hours available per week at Plant 1, 15 at Plant 2, and 20 at Plant 3.
    b. New technological advances have made Product 1 much easier to produce, and thus much more profitable. Each batch can now bring $7,000 in profit.

1. (4pts)* Using Python and whichever modeling library you prefer, formulate the following problem as a linear program and report the optimal solution.

    A cargo plane has three compartments for storing cargo: front, center, and back. These compartments have capacity limits on both weight and space, as summarized below:

    <table>
    <tr><th>Compartment</th><th>Weight Cap (tons)</th><th>Volume Cap($\text{ft}^3$)</th></tr>
    <tr><td>Front</td><td>12</td><td>7,000</td></tr>
    <tr><td>Center</td><td>18</td><td>9,000</td></tr>
    <tr><td>Back</td><td>10</td><td>5,000</td></tr>
    </table>

    Furthermore, the weight of the cargo in the respective compartments must be the same proportion of that compartment’s weight capacity to maintain the balance of the airplane.

    The following four cargoes have been offered for shipment on an upcoming flight as space is available:

    <table>
    <tr><th>Cargo</th><th>Weight (tons)</th><th>Volume ($\text{ft}^3$/ton)</th><th>Profit ($/ton)</th></tr>
    <tr><td>1</td><td>20</td><td>500</td><td>320</td></tr>
    <tr><td>2</td><td>16</td><td>700</td><td>400</td></tr>
    <tr><td>3</td><td>25</td><td>600</td><td>360</td></tr>
    <tr><td>4</td><td>13</td><td>400</td><td>290</td></tr>
    </table>

    Any portion of these cargoes can be accepted. The objective is to determine how much (if any) of each cargo should be accepted and how to distribute each among the compartments to maximize the total profit for the flight.

</div>
</div>

<!-- some future homework: either/or constraints for each Wyndor facility -->
<!-- some future homework: constraints for inverse XOR -->
<!-- model assignment problem with model/data separation in python -->
<!-- wyndor ip with and constraints from notes: determine good values for M1, M2 -->

<!-- <div class='assignmentContainer' id='Homework 0' sub-name='Introduction and course goals' due='2023-08-28'>
<div>

</div>
</div> -->

<hr>

\* : From Hillier & Lieberman, 2021.

<hr>

<h1 id='pyInstructions'>Instructions for submitting Python assignments:</h1>

For the portions of assignments that require you to submit Python code, I'll accept submissions in one of the following modes:

1. (Preferred) A link to a Colab notebook. Any `pip` installs or other dependency downloads should be included in the notebook. Starting with Homework 2, __I'll only accept these submissions if I have been added as an editor__ of the notebook, which allows me to see the document's revision history (to make sure nobody changes their code after I've graded it in an attempt to gain more points). To do this (steps illustrated below), click on "Share" in the upper-right portion of the screen. Then enter my gmail address (jeffp171@gmail.com) where it says "Add people and groups", and in the drop-down to the right select "Editor".

    <img src='images/py-submit-share.png'></img>
    <img src='images/py-submit-add-email.png'></img>
    <img src='images/py-submit-editor.png'></img>

2. Upload a file through Canvas. If you code using Colab and would like to submit your Colab notebook as a file, you can download a copy from the Colab menu by choosing File > Download > Download .ipynb.
3. Copy the Python code directly into the Canvas submission.

If you choose option 3, or choose option 2 with a file besides the Colab notebook, make sure to mention in a comment somewhere if I need to install any libraries or other dependencies to run your code.
