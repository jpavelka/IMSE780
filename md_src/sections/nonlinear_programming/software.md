## Software for nonlinear programs

<div class='lectureVideoEmbed' video-id='32ab466704b74cc08ce70d7355ebd7de1d' video-date='2023-11-01'>Software for nonlinear programming</div>

In this section we'll explore some options for solving nonlinear programs with Python. We'll highlight different libraries in each of the following notebooks, using the example problems from class as ways to explore each library's capabilities. I should stress that the state of software for nonlinear programs is a little less robust than the comparable worlds of linear and integer programming, and you may find that solution techniques do not scale as well. I should also stress that I don't know these solvers as well as I know linear and integer programming software, so you can take my recommendations as a starting point but don't assume that these options will always be your best choice.

We'll start with a notebook focused on our old friend, `gurobipy`.

{colabGist:1Mhw-tFd1LoMJrQOyfKhqMVk9VbdO3N0K,24e356a02d828b955899aff42615507e}

Next up is is [`cvxpy`](https://www.cvxpy.org/index.html), which is an open-source convex optimization solver.

{colabGist:1SBSnAWbp-hLevrgC3cXl6i1NT7AmwM0A,5a336251ddc52b76c8af338a071976f9}

Lastly, we'll show samples using the (commercial) modeling language [AMPL](https://ampl.com/) to build models, then solve them with the open-source solver [IPOPT](https://coin-or.github.io/Ipopt/).

{colabGist:1Ryt_O_3ICfuMSUuGxiFGZfRc1TdSCihN,31c2b6a2f8209be8e9eee6ec9913434a}

Another (commercial) solver worth mentioning is [BARON](https://minlp.com/baron-solver). I would have included some examples for it too, but I couldn't find a good way to run it on Colab.
