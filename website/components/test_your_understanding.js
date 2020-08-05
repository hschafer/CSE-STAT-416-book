import React, { useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./test_your_understanding.module.css";

function TYUHeader({ children }) {
  return (
    <Card.Header className={styles.header}>
      <span className={styles.question_mark}>&#x3f;</span>
      <Accordion.Toggle
        className={styles.card_button}
        as={Button}
        variant="link"
        eventKey="0"
      >
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

class TYU extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  expand(open) {
    this.setState({ expanded: open });
  }

  render() {
    var openKey = this.state.expanded ? "0" : "";
    return (
      <Accordion
        defaultActiveKey={openKey}
        className={"main-column " + styles.tyuAccordion}
      >
        <Card className={styles.tyuCard}>{this.props.children}</Card>
      </Accordion>
    );
  }
}

TYU.Header = TYUHeader;
TYU.Explanation = TYUExplanation;

export default TYU;
