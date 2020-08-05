import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Layout from "./layout";
import TYU from "./test_your_understanding";
import bookContents from "../data/table_of_contents";

export default function Chapter({ children, fileName }) {
  const chapter = bookContents.getChapterInfo(fileName);
  const [expanded, setExpanded] = useState(false);

  function explore(children) {
    React.Children.forEach(children, function (node) {
      if (node.type == TYU) {
        node.expand(expanded);
      } else if (node.props?.children) {
        explore(node.props.children);
      }
    });
  }

  function expandAll(evt) {
    console.log("Click", evt);
    //React.Children.forEach(children, (x) => console.log(x));
    setExpanded(!expanded);
    explore(children);
  }

  return (
    <Layout
      prevPage={chapter.prevChapter?.url}
      nextPage={chapter.nextChapter?.url}
    >
      <article>
        <h1>
          Chapter {chapter.chapterNumber}: {chapter.title}
        </h1>
        <Button variant="info" onClick={expandAll}>
          {expanded ? "Close" : "Open"} all 'Test Your Understanding' cards
        </Button>
        {children}
      </article>
    </Layout>
  );
}
