## Notes and further reading

<div class='lectureVideoEmbed' video-id='754dad0e4ec244709ca99fc8dc1b956b1d' video-date='2023-10-13'>IP wrap, exam review.</div>

While I've taken many of this section's modeling examples from chapter 12 in @classText, for the theory and algorithms I prefer the presentation in @wolsey2020. Much of the content here is due to that book's chapters 3, 6, 7, and 8.

In fact, there's even more from @wolsey2020 that I would have liked to cover if I had the time:

- More classes of cutting planes (that are used by solvers) are covered in later sections of chapter 8.
- There is some interesting theory behind when an integer program is easy to solve (as is the case with network flows) covered in chapter 3. The concepts to look for are total unimodularity and matroids.
- Column generation (chapter 11) is an nifty technique for tackling certain integer programs with large numbers of variables.
- Chapter 13 covers several different kinds of heuristics that a MIP solver might use to find good integer solutions or improve existing ones, which can help to fathom branch and bound nodes and keep the tree from growing too large.
- Sections 7.5 and 7.6 cover several aspects of the types of branch and cut algorithms that are used in the best integer programming solvers.

I could always say more about complexity theory. Since we didn't get too technical in our presentation here, I thought I could point out [a recent article](https://www.quantamagazine.org/complexity-theorys-50-year-journey-to-the-limits-of-knowledge-20230817/) I read talking about the history of complexity research and current trends. It also is non-technical and written for a general audience, so I think it is actually pretty approachable. Anyone interested by what we covered in class should certainly check it out.

Lastly, I'll note that the K-State IMSE department offers [IMSE 884](https://catalog.k-state.edu/content.php?catoid=58&navoid=11444), a full semester course devoted to integer programming and combinatorial optimization. Additionally, [IMSE 882](https://catalog.k-state.edu/content.php?catoid=58&navoid=11444) covers network flows and graph theory and has some intersection with the topics we covered here as well.
