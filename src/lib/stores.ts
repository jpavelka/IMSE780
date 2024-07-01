import { readable, writable } from "svelte/store";
import { Cite } from "@citation-js/core";
import { plugins } from '@citation-js/core';
import * as bibtexPlugin from '@citation-js/plugin-bibtex';
import * as cslPlugin from '@citation-js/plugin-csl';
import bibtex from "./bibtex.ts";

const sections = writable({
  hierarchy: [],
  numbers: {},
  numRefs: {},
  returnIds: {},
  headingTexts: {},
  dispSecNums: {}
});

const figures = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const equations = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const notebooks = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const theorems = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {},
  thmTypes: {}
})

const citationsData = await Cite(bibtex);

const citationsObj = {};
for (const d of citationsData.data) {
  const c = Cite(d);
  citationsObj[d.id] = {
    refStr: c.format('citation'),
    biblio: c.format('bibliography'),
    referenced: false
  }
}

const citations = writable(citationsObj);
const showToc = writable(false);
const appendixProofs = writable([]);
const popupShown = writable(false);
const notesMaxWidth = readable(800);
const tocWidth = readable(350);
const minPopupSideWidth = readable(400);

export {
  sections, citations, figures, equations, showToc, notebooks,
  theorems, appendixProofs, popupShown, notesMaxWidth, tocWidth,
  minPopupSideWidth
}
