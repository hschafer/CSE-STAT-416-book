import React, { useState } from "react";
import styles from "./test_your_understanding.module.css";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
export default function TYU({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion className="main-column">
      <Card>
        <Card.Header className={styles.header}>
          <span className={styles.question_mark}>&#x3f;</span>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            {header}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
