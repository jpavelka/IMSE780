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