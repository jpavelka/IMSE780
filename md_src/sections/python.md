# Python crash course

A main focus of the course is to show you how to model and solve real-world problems. In order to do that, you'll need some programming abilities. [Python](https://www.python.org/) is a great choice for this since it is widely-used and relatively easy to learn. You may have some experience with Python already, which is great! If you've never used Python before, don't worry. We'll spend a little time on the basics here, and we won't require you to do much out of the ordinary. Beginners will want to get some more practice outside of class.

## Google Colab notebooks

You can code Python in many different environments, but I think the easiest way to get started is with [Google Colab](https://colab.google/). This is a [Jupyter](https://jupyter.org/)-like[^jupyter] notebook environment that is free to use and requires only a web browser. I'll be using this in class to go through coding examples. Note that you do need a Google account in order to create and save your own Colab[^googleAccount] notebooks.

[^jupyter]: It's not exactly like Jupyter, but the same in spirit. Also, don't worry if you don't know about Jupyter or coding notebooks yet.
[^googleAccount]: This shouldn't be a huge hurdle. If you don't have one already you can always create a burner account for the sake of the class.

In Colab (and other notebook environments) code is organized into cells where related blocks of code are written. You can execute code one cell at a time to work through the notebook and check outputs as you go. I'll use a Colab notebook in the next section to walk through some basics of Python.

## Some Python basics

Below, you should see a read-only image of a Colab notebook. The notebook gives some exposition and samples of basic Python principles. Click the "Open in Colab" button to open a copy in your browser.

{colabGist:1Pxhkdd8WeC-29uLVDSW2I4v_PliO02Af,dcd6305c13b79bbdba7c49dc5c76d3c7}

## Other coding environments

I suggest Colab because it is free and easy to set up, and it should work well for what you'll need during the course. But it is far from the only option for Python, and often not the best option depending on your needs. Here are a few other options to explore on your own:

### Local development

Unlike Colab, where the computing is done on a cloud-based virtual machine accessed through your web browser, these next few options run completely on your local machine. They'll all require installing Python[^pythonInstall] along with other software, but you won't need an internet connection to use them. This is not an exhaustive list, just tools that I've used and liked.

[^pythonInstall]: You can check out [Python's downloads page](https://www.python.org/downloads/) or go with [Anaconda](https://www.anaconda.com/) for an expanded built-in toolset.

- [Jupyter](https://jupyter.org/): The first popular notebook environment for Python. It functions much like Colab does, though there are minor differences. Several places offer web-hosted versions of Jupyter too.
- [Pycharm](https://www.jetbrains.com/pycharm/): Pycharm is an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) built for Python, and as such comes with support for debugging, refactoring, run configurations, and more. There is a free version and a pro version, but the free version has plenty of functionality and is more than sufficient for the coding in this course.
- [Visual Studio Code](https://code.visualstudio.com/): VS Code is a popular, free IDE that supports many different programming languages. It is highly customizable and there is a broad ecosystem of extensions that can enhance functionality.

### Cloud hosted

There are several cloud-hosted options available for running Python. We've already mentioned Colab, and there are myriad other places that offer cloud-hosted notebooks at varying price points. Offerings that I'm familiar with[^googleCloudHeavy]:

[^googleCloudHeavy]: I'm listing lots of Google Cloud products because that's the cloud platform I've used most, but the other big providers have similar offerings.

- [Google Cloud Shell/IDE](https://ide.cloud.google.com): If you have a Google Cloud Platform account, you have access to a cloud-based virtual machine known as the Google Cloud Shell. The shell comes with Python and other common developer tools pre-installed, and you can interact with it using their Cloud IDE, a hosted VS Code-like environment. The shell runs a pretty small machine, but it is free to use and you can use the IDE for up to 50 hours per week.
- [Vertex AI Notebooks](https://cloud.google.com/vertex-ai/docs/workbench/introduction): Managed Jupyter notebooks on Google Cloud Platform. You do have to pay for the service and the associated compute time and storage. There are similar offerings from [Amazon Web Services](https://aws.amazon.com/sagemaker/notebooks/) and [Microsoft Azure](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-run-jupyter-notebooks?view=azureml-api-2)
- [Gitpod](https://www.gitpod.io/): Gitpod is a service that offers on-demand cloud development environments that are highly customizable. This one is a little more advanced, and all machine instances need to be backed by some [git](https://git-scm.com/) repository (e.g. on [GitHub](https://github.com/)). So I wouldn't start here, but for the right use-case it is a nice service. Their free plan gets you up to 50 hours per month.
