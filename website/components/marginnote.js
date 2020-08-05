import React, { useContext, useState } from "react";

import MarginNoteContext from "../contexts/margin_note";

class MarginNoteCounter {
  constructor() {
    this.count = 1;
  }

  getAndUpdate() {
    var oldCount = this.count;
    this.count++;
    return oldCount;
  }
}

function MarginNote({ children }) {
  const marginNoteContext = useContext(MarginNoteContext);
  const counter = marginNoteContext.marginNoteCounter;

  var [count, _] = useState(counter.getAndUpdate());
  var prefix = "" + count;
  var id = "margin-" + prefix;
  return (
    <>
      <label htmlFor={id} className="margin-toggle">
        &#8853;
      </label>
      <sup>{prefix}</sup>
      <input type="checkbox" id={id} className="margin-toggle" />
      <span className="marginnote">
        {prefix ? prefix + ". " : prefix}
        {children}
      </span>
    </>
  );
}

export { MarginNote, MarginNoteCounter };
