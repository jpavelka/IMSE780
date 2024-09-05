<script lang="ts">
    import BodyText from "$lib/BodyText.svelte";
    import Heading from "$lib/Heading.svelte";
    import Example from "./Example.svelte";
    import Visualize from "./Visualize.svelte";
    import Software from "./Software.svelte";
    import Forms from "./Forms.svelte";
    import Simplex from "./Simplex.svelte";
    import Duality from "./Duality.svelte";
    import Sensitivity from "./Sensitivity.svelte";
    import Notes from "./Notes.svelte";
</script>

<Heading level="1" refId="lp">
    Linear programming
    <span slot=context>Learning about the most important class of optimization problems, the linear program.</span>
</Heading>

<BodyText>
    In the family of OR techniques, linear programming (LP) is certainly the matriarch. It was among the first methods to be seriously studied and find broad applications. To this day, LPs are relevant and used across industry to inform decision-making and help best make use of scarce resources.
</BodyText>
<BodyText>
    So, what is an LP? Let's step back a bit - linear programming is a special type of mathematical programming problem. The word <em>programming</em>, in the language of the pre-computer-revolution era where these topics were first studied, was more or less a synonym for <em>planning</em>. So mathematical programming just means using math to make a plan.
</BodyText>
<BodyText>
    And the linear part? This refers to the form of the mathematical objects used. All mathematical programs have <em>variables</em> (quantities you get to set in order to get a desirable result), <em>constraints</em> (limitations on how you can set your variables), and an <em>objective</em> (the quantity you want to maximize/minimize). In linear programming, all constraints and objectives must be <em>linear</em> functions of your variables. Meaning, you can multiply the variables by constants and add them together. No higher order terms, like squaring a variable or multiplying two variables together. We'll see an example in the next section.
</BodyText>
<BodyText>
    And the linear part? This refers to the form of the mathematical objects used. All mathematical programs have <em>variables</em> (quantities you get to set in order to get a desirable result), <em>constraints</em> (limitations on how you can set your variables), and an <em>objective</em> (the quantity you want to maximize/minimize). In linear programming, all constraints and objectives must be <em>linear</em> functions of your variables. Meaning, you can multiply the variables by constants and add them together. No higher order terms, like squaring a variable or multiplying two variables together. We'll see an example in the next section.
</BodyText>

<Example />
<Visualize />
<Software />
<Forms />
<Simplex />
<Duality />
<Sensitivity />
<Notes />

