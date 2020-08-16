import { MarginNoteContext, MarginNoteCounter } from "../contexts/margin_note";
import React, { useContext, useState } from "react";

export default function MarginNote({ children }) {
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
