import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import lunr from "lunr";

var documents = [
  {
    title: "Lunr",
    text: "Like Solr, but much smaller, and not as bright.",
    id: "1",
  },
  {
    title: "React",
    text: "A JavaScript library for building user interfaces.",
    id: "2",
  },
  {
    title: "Lodash",
    text:
      "A modern JavaScript utility library delivering modularity, performance & extras.",
    id: "3",
  },
];

var docsByID = documents.reduce(function (docsByID, doc) {
  docsByID[doc.id] = doc;
  return docsByID;
}, {});

const searchIndex = lunr(function () {
  this.field("title");
  this.field("text");
  this.ref("id");

  documents.forEach(function (doc) {
    this.add(doc);
  }, this);
});

export default function Search() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function inputReceived(event) {
    var q = event.target.value;
    console.log("Typing", q);
    setQuery(q);
  }

  if (show && query.length > 0) {
    // From https://github.com/olivernn/lunr.js/issues/287
    var results = searchIndex.query(function (q) {
      // exact matches should have the highest boost
      q.term(query, { boost: 100 });

      // prefix matches should be boosted slightly
      q.term(query, {
        boost: 10,
        usePipeline: false,
        wildcard: lunr.Query.wildcard.TRAILING,
      });

      // finally, try a fuzzy search, without any boost
      q.term(query, { boost: 1, usePipeline: false, editDistance: 1 });
    });
  } else {
    var results = [];
  }
  console.log("Result", results);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        🔍 Search
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Form inline>
            <FormControl
              name="query"
              onChange={inputReceived}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              autoComplete="off"
            />
          </Form>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {results.map((result) => (
              <li key={result.ref}>{docsByID[result.ref]["title"]}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}
