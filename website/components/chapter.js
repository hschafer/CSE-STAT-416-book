import { MarginNoteContext, MarginNoteCounter } from "../contexts/margin_note";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Layout from "./layout";
import MarginNote from "./marginnote";
import TYU from "./test_your_understanding";
import TYUContext from "../contexts/test_your_understanding";
import bookContents from "../data/table_of_contents";

export default function Chapter({ children, fileName }) {
  const chapter = bookContents.getChapterInfo(fileName);

  // For expand all TYU cards
  const [expandAllTYU, setExpandAllTYU] = useState(false);

  function expandAll(evt) {
    setExpandAllTYU(!expandAllTYU);
  }

  // For margin note
  const marginNoteCounter = new MarginNoteCounter();

  return (
    <Layout
      prevPage={chapter.prevChapter?.url}
      nextPage={chapter.nextChapter?.url}
    >
      <TYUContext.Provider value={{ expandAllTYU, setExpandAllTYU }}>
        <MarginNoteContext.Provider value={{ marginNoteCounter }}>
          <article>
            <h1>
              Chapter {chapter.chapterNumber}: {chapter.title}
            </h1>
            <Button variant="info" onClick={expandAll}>
              {expandAllTYU ? "Close" : "Open"} all 'Test Your Understanding'
              cards
            </Button>
            {children}
          </article>
        </MarginNoteContext.Provider>
      </TYUContext.Provider>
    </Layout>
  );
}
