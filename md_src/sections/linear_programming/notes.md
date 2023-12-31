## Notes and further reading

The presentation in this section followed very closely to various sections in chapters 3-7 in @classText. Many of the proofs in +@sec:lpDuality were adapted from @bertsimas-LPbook. Some other topics for the interested reader to follow up on:

- We briefly mentioned _dual simplex_ and some of its uses in these notes. @classText section 8.1 covers it in more detail.
- When covering sensitivity analysis (+@sec:sensitivityAnalysis) we only considered changes to a single rhs value. @classText (section 7.2) covers further cases, like analyzing changes in other problem data, or simultaneous changes in multiple rhs values.
- Section 7.4 in @classText briefly discusses _robust optimization_, where the setup includes ranges of potential values of model data, and the goal is to find solutions that will be feasible and close to optimal for the entire set of potential problem data.
- Simplex is not the only algorithm for solving LPs. Sections 4.9 and 8.4 of @classText study so-called _interior point_ algorithms for linear programs. These algorithms have an interesting role in the history of LP. Most notably, many of these methods have been proven to terminate in a number of steps _polynomial_ in the size of the LP considered, a feat that has not been duplicated for the simplex method. But even with this theoretical advantage, the interior point methods are not usually faster than simplex in practice. Even so, most solvers will include an interior point method that will be called upon in certain circumstances.

The K-State IMSE department offers [IMSE 881](https://catalog.k-state.edu/preview_course_nopop.php?catoid=54&coid=375882), a full semester course devoted to linear programming theory.