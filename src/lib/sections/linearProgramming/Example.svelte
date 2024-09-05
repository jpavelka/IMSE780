<script>    
    import MathDisp from "$lib/MathDisp.svelte";
    import BlockQuote from "$lib/BlockQuote.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import lpExampleData from "$lib/images/lp-example-data.png";
</script>
<Heading level="2" refId="exampleLp">
    An example LP
    <span slot='context'>
        Developing our first example linear program, which we will build on for the duration of the notes. <Math>x_1</Math>
    </span>
</Heading>

<BodyText>
    Before we pile up too many definitions, maybe we should see an example problem where we can get more hands-on. The following comes from <CitationRef refId="classText" />, section 3.1.
</BodyText>

<BlockQuote>
    <BodyText>
        The Wyndor Glass Co. produces high-quality glass products, including windows and glass doors. It has three plants. Aluminum frames and hardware are made in Plant 1, wood frames are made in Plant 2, and Plant 3 produces the glass and assembles the products. Because of declining earnings, top management has decided to revamp the company’s product line. Unprofitable products are being discontinued, releasing production capacity to launch two new products having large sales potential:
        <ul>
            <li>Product 1: An 8-foot glass door with aluminum framing</li>
            <li>Product 2: A 4 x 6 foot double-hung wood-framed window</li>
        </ul>
    </BodyText>
    <BodyText>
        Product 1 requires some of the production capacity in Plants 1 and 3, but none in Plant 2. Product 2 needs only Plants 2 and 3. The marketing division has concluded that the company could sell as much of either product as could be produced by these plants. However, because both products would be competing for the same production capacity in Plant 3, it is not clear which mix of the two products would be most profitable.
    </BodyText>
</BlockQuote>

<BodyText>
    Together with management, the company's OR team defines the problem as follows:
</BodyText>

<BlockQuote>
    <BodyText>
        Determine what the production rates should be for the two products in order to maximize their total profit, subject to the restrictions imposed by the limited production capacities available in the three plants. (Each product will be produced in batches of 20, so the production rate is defined as the number of batches produced per week.) Any combination of production rates that satisfies these restrictions is permitted, including producing none of one product and as much as possible of the other.
    </BodyText>
</BlockQuote>

<BodyText>
    The team's next task is to gather data on production runs and potential profits. The findings are summarized in the table below:
</BodyText>

<Figure refId="wyndorData">
    <img src={lpExampleData} alt="Wyndor data" />
    <span slot=caption>Data for the Wyndor Glass Co. problem.</span>
</Figure>

<Heading refId="firstLpForm" level="3">Formulating our first LP</Heading>

<BodyText>
    How do we go about formulating this problem mathematically? We must first decide on the <em>decision variables</em>, the quantities we get to choose in order to affect profit. In this case, the variables are the quantities of Product 1 and Product 2 that we choose to produce. We will denote these quantities by <Math>x_1</Math> and <Math>x_2</Math> respectively. That is, <Math >x_1</Math> is the number of batches of Product 1 we will produce in a week, and <Math>x_2</Math> is the number of batches of Product 2 we produce in a week.
</BodyText>
<BodyText>
    Next let's talk about the problem's _objective function_, the quantity that we are trying to optimize. Naturally, we'd like to maximize profit. From the table, we know that we get $3,000 in profit per batch of Product 1 and $5,000 per batch of Product 2. Thus the formula
</BodyText>

<MathDisp>3x_1 + 5x_2</MathDisp>

<BodyText>
    tells us (in thousands of dollars) how much profit we expect for a given selection of <Math>x_1</Math> and <Math>x_2</Math>.
</BodyText>

<BodyText>
    Now, we can't select <Math>x_1</Math> and <Math>x_2</Math> to be arbitrarily high. We are restricted by the available production time at each plant. So we will add <em>constraints</em> relating to these availabilities. We know that each batch of Product 1 requires 1 hour of time in Plant 1, while Product 2 does not require any time at Plant 1. So, knowing that 4 hours of production time is available per week, the constraint associated with production at Plant 1 is simply <Math>x_1 \leq 4</Math>. Similarly, at Plant 2, Product 2 is the only one that requires processing, at 2 hours per batch. With 12 hours per week available, the constraint for Plant 2 becomes <Math>2x_2 \leq 12</Math>.<Footnote>You might look at this and think "that just means <Math>x_2 \leq 6</Math>." You would be correct, and it would be completely valid to use that constraint instead.</Footnote>
</BodyText>

<BodyText>
    What about Plant 3? Both products require time at this facility, so they could both contribute to the depletion of its 18 hours per week. Every batch of Product 1 requires 3 hours, while every batch of Product 2 requires 2 hours. So the constraint imposed by Plant 3 is simply <Math>3x_1 + 2x_2 \geq 18</Math>.
</BodyText>

<BodyText>
    Lastly, we know that <Math>x_1</Math> and <Math>x_2</Math> cannot be negative (there is no way to produce a negative number of products), so <Math>x_1 \geq 0</Math> and <Math>x_2 \geq 0</Math> must be part of our formulation as well. Bringing it all together, we can write the problem formulation as:
</BodyText>

<MathDisp refId=prototypeLp name={'Wyndor LP'}>
    {String.raw`
        \begin{align*}
        \max && 3x_1 + 5x_2 & \\
        \st  && x_1 & \leq \ \ 4  \\
            && 2x_2 & \leq 12 \\
            && 3x_1 + 2x_2 & \leq 18 \\
            && x_1,x_2 & \geq \ \ 0
        \end{align*}
    `}
</MathDisp>
