import React from "react";

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

const MarginNoteContext = React.createContext();
export { MarginNoteContext, MarginNoteCounter };
