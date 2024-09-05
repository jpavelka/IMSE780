import { readable, writable, type Writable } from "svelte/store";
import { Cite } from "@citation-js/core";
import { plugins } from '@citation-js/core';
import * as bibtexPlugin from '@citation-js/plugin-bibtex';
import * as cslPlugin from '@citation-js/plugin-csl';
import bibtex from "./bibtex";

const sections: Writable<{
  hierarchy: Array<any>,
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  headingTexts: {[key: string]: string},
  dispSecNums: {[key: string]: string},
  contexts: {[key: string]: string}
}> = writable({
  hierarchy: [],
  numbers: {},
  numRefs: {},
  returnIds: {},
  headingTexts: {},
  dispSecNums: {},
  contexts: {}
});

const figures: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string}
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const equations: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  names: {[key: string]: string}
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {},
  names: {}
})

const notebooks: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const theorems: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  thmTypes: {[key: string]: string}
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {},
  thmTypes: {}
})

const citationsData = await Cite(bibtex);

const citationsObj: { [key: string]: any } = {};
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
const popupShown = writable(false);
const notesMaxWidth = readable(800);
const tocWidth = readable(350);
const minPopupSideWidth = readable(400);
const eqReferenced: Writable<Array<string>> = writable([]);
const printMode = writable(false);
const highlightKeyPoints = writable(false);

export {
  sections, citations, figures, equations, showToc, notebooks,
  theorems, popupShown, notesMaxWidth, tocWidth, eqReferenced,
  minPopupSideWidth, printMode, highlightKeyPoints
}
