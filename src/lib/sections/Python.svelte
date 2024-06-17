<script>
    import BodyText from "$lib/BodyText.svelte";
    import ColabGist from "$lib/ColabGist.svelte";
    import Footnote from "$lib/Footnote.svelte";
import Heading from "$lib/Heading.svelte";
</script>

<Heading level=1 refId=python>Python crash course</Heading>

<BodyText>
    A main focus of the course is to show you how to model and solve real-world problems. In order to do that, you'll need some programming abilities. <a href='https://www.python.org/'>Python</a> is a great choice for this since it is widely-used and relatively easy to learn. You may have some experience with Python already, which is great! If you've never used Python before, don't worry. We'll spend a little time on the basics here, and we won't require you to do much out of the ordinary. Beginners will want to get some more practice outside of class.
</BodyText>

<Heading level=2 refId=colab>Google Colab notebooks</Heading>

<BodyText>
    You can code Python in many different environments, but I think the easiest way to get started is with <a href='https://colab.google/'>Google Colab</a>. This is a <a href='https://jupyter.org/'>Jupyter</a>-like<Footnote>It's not exactly like Jupyter, but the same in spirit. Also, don't worry if you don't know about Jupyter or coding notebooks yet.</Footnote> notebook environment that is free to use and requires only a web browser. I'll be using this in class to go through coding examples. Note that you need a Google account in order to fully use Colab<Footnote>This shouldn't be a huge hurdle. If you don't have one already you can always create a burner account for the sake of the class.</Footnote>.
</BodyText>

<BodyText>
    In Colab (and other notebook environments) code is organized into cells where related blocks of code are written. You can execute code one cell at a time to work through the notebook and check outputs as you go. I'll use a Colab notebook in the next section to walk through some basics of Python.
</BodyText>

<Heading level=2 refId=pythonBasics>Some Python basics</Heading>

<BodyText>
    Below, you should see a read-only image of a Colab notebook. The notebook gives some exposition and samples of basic Python principles. Click the "Open in Colab" button to open a copy in your browser.
</BodyText>

<ColabGist colabId='1Pxhkdd8WeC-29uLVDSW2I4v_PliO02Af' gistId='dcd6305c13b79bbdba7c49dc5c76d3c7' refId='pythonBasics' desc='Some Python basics.'/>

<Heading level=2 refId=pythonEnvironments>Other coding environments</Heading>

<BodyText>
    I suggest Colab because it is free and easy to set up, and it should work well for what you'll need during the course. But it is far from the only option for Python, and often not the best option depending on your needs. Here are a few other options to explore on your own:
</BodyText>

<Heading level=3 refId=pythonLocal>Local development</Heading>

<BodyText>
    Unlike Colab, where the computing is done on a cloud-based virtual machine accessed through your web browser, these next few options run completely on your local machine. They'll all require installing Python<Footnote>You can check out <a href='https://www.python.org/downloads/'>Python's downloads page</a> or go with <a href='https://www.anaconda.com/'>Anaconda</a> for an expanded built-in toolset.</Footnote> along with other software, but you won't need an internet connection to use them. This is not an exhaustive list, just tools that I've used and liked.
    <ul>
        <li><a href='https://jupyter.org/'>Jupyter</a>: The first popular notebook environment for Python. It functions much like Colab does, though there are minor differences. Several places offer web-hosted versions of Jupyter too.</li>
        <li><a href='https://www.jetbrains.com/pycharm/'>Pycharm</a>: Pycharm is an <a href='https://en.wikipedia.org/wiki/Integrated_development_environment'>IDE</a> built for Python, and as such comes with support for debugging, refactoring, run configurations, and more. There is a free version and a pro version, but the free version has plenty of functionality and is more than sufficient for the coding in this course.</li>
        <li><a href='https://code.visualstudio.com/'>Visual Studio Code</a>: VS Code is a popular, free IDE that supports many different programming languages. It is highly customizable and there is a broad ecosystem of extensions that can enhance functionality.</li>
    </ul>
</BodyText>

<Heading level=3 refId=pythonCloudHosted>Cloud hosted</Heading>

<BodyText>
    There are several cloud-hosted options available for running Python. We've already mentioned Colab, and there are myriad other places that offer cloud-hosted notebooks at varying price points. Offerings that I'm familiar with<Footnote>I'm listing lots of Google Cloud products because that's the cloud platform I've used most, but the other big providers have similar offerings.</Footnote>:
    <ul>
        <li><a href='https://ide.cloud.google.com'>Google Cloud Shell/IDE</a>: If you have a Google Cloud Platform account, you have access to a cloud-based virtual machine known as the Google Cloud Shell. The shell comes with Python and other common developer tools pre-installed, and you can interact with it using their Cloud IDE, a hosted VS Code-like environment. The shell runs a pretty small machine, but it is free to use and you can use the IDE for up to 50 hours per week.</li>
        <li><a href='https://cloud.google.com/vertex-ai/docs/workbench/introduction'>Vertex AI Notebooks</a>: Managed Jupyter notebooks on Google Cloud Platform. You do have to pay for the service and the associated compute time and storage. There are similar offerings from <a href='https://aws.amazon.com/sagemaker/notebooks/'>Amazon Web Services</a> and <a href='https://learn.microsoft.com/en-us/azure/machine-learning/how-to-run-jupyter-notebooks?view=azureml-api-2'>Microsoft Azure</a></li>
        <li><a href='https://www.gitpod.io/'>Gitpod</a>: Gitpod is a service that offers on-demand cloud development environments that are highly customizable. This one is a little more advanced, and all machine instances need to be backed by some <a href='https://git-scm.com/'>git</a> repository (e.g. on <a href='https://github.com/'>GitHub</a>). So I wouldn't start here, but for the right use-case it is a nice service. Their free plan gets you up to 50 hours per month.</li>
    </ul>
</BodyText>