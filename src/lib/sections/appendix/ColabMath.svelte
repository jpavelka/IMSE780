<script>
    import BodyText from "$lib/BodyText.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Heading from "$lib/Heading.svelte";

</script>
<Heading level=2 refId=mathInColab>Writing mathematics in a Colab notebook</Heading>

<BodyText>
    Besides writing Python code, another useful feature of a Colab notebook is the ability to use "text" cells to write Markdown. <a href='https://en.wikipedia.org/wiki/Markdown'>Markdown</a> provides a convenient way to render formatted text, and in fact the notes you are reading now were written using it. The flavor of Markdown implemented in Colab allows for the addition of <a href='https://en.wikipedia.org/wiki/LaTeX'>LaTeX</a> syntax for rendering mathematical symbols. Colab is far from the only place where you can use Markdown, but as usual it is simple to set up and use right out of the box.
</BodyText>

<BodyText>
    In the following notebook, I've included examples of how to render mathematical symbols inside Colab. This is far from a comprehensive guide, sticking to items I think might be useful for the class. I came across a more extensive guide you may want to check out <a href='https://ashki23.github.io/markdown-latex.html'>here</a>.
</BodyText>

<ColabGist
    colabId='1_y5DymXCykelZWHwP0ld-oIHVFTUDcod'
    gistId='eea93b3fac7b6040bcb074e95b4e5076'
    refId=mathInColab
    desc='An explanation of adding math symbols to a Colab notebook.'
/>