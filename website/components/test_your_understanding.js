import React, { useContext, useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TYUContext from "../contexts/test_your_understanding";
import styles from "./test_your_understanding.module.css";

// This is the context to shared for this TYU instance
// Keeping it in this module since it's local to these components
const ExpandContext = React.createContext();

// Defines the header component of the TYU.
// This is the box the user can click on that's always visible.
function TYUHeader({ children }) {
  var expandContext = useContext(ExpandContext);
  return (
    <Card.Header className={styles.header}>
      <span className={styles.question_mark}>&#x3f;</span>
      <Accordion.Toggle
        className={styles.card_button}
        as={Button}
        variant="link"
        eventKey="0"
        onClick={() => expandContext.setExpand(!expandContext.expand)}
      >
        {children}
      </Accordion.Toggle>
    </Card.Header>
  );
}

// This is the body of the TYU card that is sometimes hidden.
function TYUExplanation({ children }) {
  return (
    <Accordion.Collapse eventKey="0">
      <Card.Body>{children}</Card.Body>
    </Accordion.Collapse>
  );
}

// Wrapper for TYU. Children should be a TYU.Header and TYU.Explanation
// Can be expanded by clicking or using the expand all.
function TYU({ children }) {
  const expandAllContext = useContext(TYUContext);
  const [expand, setExpand] = useState(expandAllContext.expandAllTYU);

  // Not really proud of this, but to make sure we can override the expand
  // state, we have to track our previous notion of the context's expandAll
  // to see if this render is a change to that context's state.
  const [prevExpandAll, setPrevExpandAll] = useState(
    expandAllContext.expandAllTYU
  );
  if (expandAllContext.expandAllTYU !== prevExpandAll) {
    setPrevExpandAll(expandAllContext.expandAllTYU);
    setExpand(expandAllContext.expandAllTYU);
  }

  var openKey = expand ? "0" : "";
  var activeKey = openKey ? openKey : undefined;
  return (
    <ExpandContext.Provider value={{ expand, setExpand }}>
      <Accordion
        defaultActiveKey={openKey}
        activeKey={activeKey}
        className={"main-column " + styles.tyuAccordion}
      >
        <Card className={styles.tyuCard}>{children}</Card>
      </Accordion>
    </ExpandContext.Provider>
  );
}

TYU.Header = TYUHeader;
TYU.Explanation = TYUExplanation;

export default TYU;
