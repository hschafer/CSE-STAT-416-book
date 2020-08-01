import React, { useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./test_your_understanding.module.css";

/* return (
    <div class={styles.card} onClick={() => setExpanded(!expanded)}>
      <div class={styles.header}>
        <span class={styles.title}>{header}</span>
        <span class={styles.arrow}>{expanded ? `\u25BD` : `\u25B7`}</span>
      </div>

      <div class={styles.body + " " + (expanded ? styles.expanded : "")}>
        {children}
      </div>
    </div>
  ); */

function TYUHeader({ children }) {
  return (
    <Card.Header className={styles.header}>
      <span className={styles.question_mark}>&#x3f;</span>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        {children}
      </Accordion.Toggle>
    </Card.Header>
  );
}

function TYUExplanation({ children }) {
  return (
    <Accordion.Collapse eventKey="0">
      <Card.Body>{children}</Card.Body>
    </Accordion.Collapse>
  );
}

function TYU({ children }) {
  return (
    <Accordion className="main-column">
      <Card>{children}</Card>
    </Accordion>
  );
}

TYU.Header = TYUHeader;
TYU.Explanation = TYUExplanation;

export default TYU;
