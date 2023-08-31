<style>
</style>

<script>
    window.onload = () => {
        for (el of document.getElementsByClassName('assignmentContainer')) {
            dt = el.getAttribute('data-due');
            el.innerHTML = `
                <h1>${el.getAttribute('name')} (due ${parseInt(dt.slice(5, 7))}/${parseInt(dt.slice(8, 10))}):</h1>
                <h2>${el.getAttribute('data-sub-name')}</h2>
            ` + el.innerHTML
        }
    }
</script>

<div class='assignmentContainer' name='Homework 0' sub-name='Introduction and course goals' due='2023-08-28'>
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

<div class='assignmentContainer' name='Homework 1' sub-name='Intro to OR and Python' due='2023-09-04'>
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

<div class='assignmentContainer' name='Homework 2' sub-name='Intro to linear programming' due='2023-09-11'>
<div>

1. Do this matrix multiplication
1. Formulate a word problem as an LP
1. Convert this LP to standard form
1. Modify sample lp in various ways and give the result
1. Give data and a script to get it, tell to explore why the LP did not solve

</div>
</div>