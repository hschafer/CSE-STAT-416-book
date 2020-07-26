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

function MarginNote({ children, id, counter }) {
  var prefix = "";
  if (counter !== undefined) {
    prefix = "" + counter.getAndUpdate() + ". ";
  }
  return (
    <>
      <label htmlFor={id} className="margin-toggle">
        &#8853;
      </label>
      <input type="checkbox" id={id} className="margin-toggle" />
      <span className="marginnote">
        {prefix}
        {children}
      </span>
    </>
  );
}

export { MarginNote, MarginNoteCounter };
