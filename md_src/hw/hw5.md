<div class='assignmentContainer' id='Homework 5' sub-name='IP modeling' due='2023-10-02' grading-notes-link='https://colab.research.google.com/drive/1X_XPnABZe-XTD2BxTEHRCEVNyP7Qf1N5?usp=sharing'>
<div>

1. Model the following problems as integer programs:
    a. (5pts)* Vincent Cardoza is the owner and manager of a machine shop that does custom order work. This Wednesday afternoon, he has received calls from two customers who would like to place rush orders. One is a trailer hitch company which would like some custom-made heavy-duty tow bars. The other is a mini-car-carrier company which needs some customized stabilizer bars. Both customers would like as many as possible by the end of the week (two working days). Since both products would require the use of the same two machines, Vincent needs to decide and inform the customers this afternoon about how many of each product he will agree to make over the next two days.

        Each tow bar requires 3.2 hours on machine 1 and 2 hours on machine 2. Each stabilizer bar requires 2.4 hours on machine 1 and 3 hours on machine 2. Machine 1 will be available for 16 hours over the next two days and machine 2 will be available for 15 hours. The profit for each tow bar produced would be $130 and the profit for each stabilizer bar produced would be $150. Vincent now wants to determine the mix of these production quantities that will maximize the total profit.

    a. (5pts)* The board of directors of General Wheels Co. is considering six large capital investments. Each investment can be made only once. These investments differ in the estimated long-run profit (net present value) that they will generate as well as in the amount of capital required, as shown by the following table (in units of millions of dollars):

        <table>
        <tr><th>Investment</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
        <tr><th class='rowHead'>Estimated profit</th><td>15</td><td>12</td><td>16</td><td>18</td><td>9</td><td>11</td></tr>
        <tr><th class='rowHead'>Capital required</th><td>38</td><td>33</td><td>39</td><td>45</td><td>23</td><td>27</td></tr>
        </table>

        The total amount of capital available for these investments is $100 million. Investment opportunities 1 and 2 are mutually exclusive, and so are 3 and 4. Furthermore, neither 3 nor 4 can be undertaken unless one of the first two opportunities is undertaken. There are no such restrictions on investment opportunities 5 and 6. The objective is to select the combination of capital investments that will maximize the total estimated long-run profit (net present value).

    a. (5pts)* The Fly-Right Airplane Company builds small jet airplanes to sell to corporations for the use of their executives. To meet the needs of these executives, the company’s customers sometimes order a custom design of the airplanes being purchased. When this occurs, a substantial start-up cost is incurred to initiate the production of these airplanes.

        Fly-Right has recently received purchase requests from three customers with short deadlines. However, because the company’s production facilities already are almost completely tied up filling previous orders, it will not be able to accept all three orders. Therefore, a decision now needs to be made on the number of airplanes the company will agree to produce (if any) for each of the three customers.

        The relevant data are given in the next table. The first row gives the start-up cost required to initiate the production of the airplanes for each customer. Once production is under way, the marginal net revenue (which is the purchase price minus the marginal production cost) from each airplane produced is shown in the second row. The third row gives the percentage of the available production capacity that would be used for each airplane produced. The last row indicates the maximum number of airplanes requested by each customer (but less will be accepted).
    
        <table>
        <tr><th>Customer</th><th>1</th><th>2</th><th>3</th></tr>
        <tr><th class='rowHead'>Start-up cost</th><td>$3M</td><td>$2M</td><td>0</td></tr>
        <tr><th class='rowHead'>Marginal net revenue</th><td>$2M</td><td>$3M</td><td>$0.8M</td></tr>
        <tr><th class='rowHead'>Capacity used per plane</th><td>20%</td><td>40%</td><td>20%</td></tr>
        <tr><th class='rowHead'>Maximum order</th><td>3 planes</td><td>2 planes</td><td>5 planes</td></tr>
        </table>

        Fly-Right now wants to determine how many airplanes to produce for each customer (if any) to maximize the company’s total profit (total net revenue minus start-up costs).

1. (5pts) In section 5.3.2 of the notes we showed how to use integer programming to mimic the Boolean logical operators AND, OR, and XOR. Similarly, suppose an IP model includes two binary variables $x_1$ and $x_2$. Give a set of constraints that enforce that a new binary variable $y$ equals 1 if and only if $x_1=x_2$. The associated truth table is below:

    <table><tbody>
     <tr style='border-bottom:1px solid black'><th>$x_1$</th><th>$x_2$</th><th style='border-left:1px solid black'>$y$</th></tr>
     <tr><td>0</td><td>0</td><td style='border-left:1px solid black'>1</td></tr>
     <tr><td>0</td><td>1</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>1</td><td>0</td><td style='border-left:1px solid black'>0</td></tr>
     <tr><td>1</td><td>1</td><td style='border-left:1px solid black'>1</td></tr>
     </tbody style='border:none'></table>

</div>
</div>