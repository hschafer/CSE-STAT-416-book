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

function MarginNote({ children, counter }) {
  if (counter === undefined) {
    var prefix = "";
    var id = "margin-" + Math.random().toString(36).substring(7);
  } else {
    var count = counter.getAndUpdate();
    var prefix = "" + count;
    var id = "margin-" + prefix;
  }
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
