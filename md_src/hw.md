<style>
    .assignmentContent {
        margin-left: 0.5rem;
        display: none;
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
            el.innerHTML = `
                <h1 id="assignment${el.id}Header" onclick="headerClick('${el.id}')">
                    ${el.id} (due ${parseInt(dt.slice(5, 7))}/${parseInt(dt.slice(8, 10))})
                    <span id="assignment${el.id}HeaderArrow" class="headerArrow">&#9654;</span>
                </h1>
                <div id="assignment${el.id}Content" class="assignmentContent">
                    <h2>${el.getAttribute('data-sub-name')}</h2>
            ` + el.innerHTML + '</div>'
        }
    }
    const headerClick = (elId) => {
        el = document.getElementById(`assignment${elId}Content`);
        displaying = el.style.display === 'block'
        el.style.display = displaying ? 'none' : 'block';
        arrowEl = document.getElementById(`assignment${elId}HeaderArrow`);
        arrowEl.innerHTML = displaying ? '&#9654;' : '&#9660;';
    }
</script>

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

<div class='assignmentContainer' id='Homework 2' sub-name='Intro to linear programming' due='2023-09-11'>
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

<!-- <div class='assignmentContainer' id='Homework 0' sub-name='Introduction and course goals' due='2023-08-28'>
<div>

</div>
</div> -->

<hr>

\* : From Hillier & Lieberman, 2021.

<hr>

<h1 id='pyInstructions'>Instruction for submitting Python assignments:</h1>

For the portions of assignments that require you to submit Python code, I'll accept submissions in one of the following modes:

1. (Preferred) A link to a Colab notebook. Any `pip` installs or other dependency downloads should be included in the notebook. Starting with Homework 2, __I'll only accept these submissions if I have been added as an editor__ of the notebook, which allows me to see the document's revision history (to make sure nobody changes their code after I've graded it in an attempt to gain more points). To do this (steps illustrated below), click on "Share" in the upper-right portion of the screen. Then enter my gmail address (jeffp171@gmail.com) where it says "Add people and groups", and in the drop-down to the right select "Editor".

    <img src='images/py-submit-share.png'></img>
    <img src='images/py-submit-add-email.png'></img>
    <img src='images/py-submit-editor.png'></img>

2. Upload a file through Canvas.
3. Copy the Python code directly into the Canvas submission.

For the final two options, make sure to mention in a comment somewhere if I need to install any libraries or other dependencies to run your code.
