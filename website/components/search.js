import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import lunr from "lunr";

export default function Search({ searchIndex }) {
  var searchIndex = lunr(function () {
    this.field("title");
    this.field("text");
    this.ref("id");

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
    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  function inputReceived(event) {
    var query = event.target.value;
    console.log("Typing", query);

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
    console.log("Result", results);
  }

  return (
    <Form inline>
      <FormControl
        name="query"
        onChange={inputReceived}
        type="text"
        placeholder="Search"
        className="mr-sm-2"
      />
    </Form>
  );
}
