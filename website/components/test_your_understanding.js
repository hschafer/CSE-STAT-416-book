import React, { useContext, useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
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
        className={styles.header_text}
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

// Defines the header component of the TYU which is a multiple choice question.
function TYUHeaderMC({ children, name, options, correct }) {
  var expandContext = useContext(ExpandContext);
  var [selected, setSelected] = useState(undefined);
  correct = Number(correct);
  return (
    <Card.Header>
      <div className={styles.header}>
        <span className={styles.question_mark}>&#x3f;</span>

        <span className={styles.mc_question + " " + styles.header_text}>
          {children}
        </span>
      </div>
      <div className={styles.mc_question_choices}>
        <Form
          onClick={(evt) => {
            if (evt.target.id) {
              setSelected(evt.target.id);
              expandContext.setExpand(true);
            }
          }}
        >
          {options.map((opt, index) => {
            var id = "option" + index;
            return (
              <Form.Check
                key={name + "-" + index}
                type="radio"
                id={id}
                className={selected == id ? styles.feedback_visible : ""}
              >
                <Form.Check.Input
                  type="radio"
                  name={name}
                  isValid={selected === id && index === correct}
                  isInvalid={selected === id && index !== correct}
                />
                <Form.Check.Label>{opt}</Form.Check.Label>
                {index === correct ? (
                  <Form.Control.Feedback type="valid">
                    ✅ Correct! Make sure you read the explanation below to make
                    sure you understand why!
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    ❗Not quite! See explanation below.
                  </Form.Control.Feedback>
                )}
              </Form.Check>
            );
          })}
        </Form>

        {expandContext.expand ? (
          <Accordion.Toggle
            className={styles.close}
            as={Button}
            variant="link"
            eventKey="0"
            onClick={() => expandContext.setExpand(!expandContext.expand)}
          >
            Click to close explanation.
          </Accordion.Toggle>
        ) : (
          ""
        )}
      </div>
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
TYU.HeaderMC = TYUHeaderMC;
TYU.Explanation = TYUExplanation;

export default TYU;
