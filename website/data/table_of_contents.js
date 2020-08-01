const tableOfContents = [
  {
    chapterNumber: "0",
    title: "Introduction",
    file: "introduction",
  },
  {
    chapterNumber: "1",
    title: "Linear Regression",
    file: "linear_regression",
  },
  {
    chapterNumber: "2",
    title: "Assessing Performance",
    file: "assessing_performance",
  },
  {
    chapterNumber: "3",
    title: "Regularization: Ridge",
    file: "ridge",
  },
  {
    chapterNumber: "99",
    title: "Tufte (layout example)",
    file: "tufte",
  },
];

// Class to store global information about the book
// and convenience functions to operate on them.
// Public (read only) Fields:
//   tableOfContents
class BookContents {
  constructor(tableOfContents, urlPrefix = "/chapters/") {
    this.tableOfContents = tableOfContents;
    this.urlPrefix = urlPrefix;
  }

  getChapterInfo(file) {
    const chapter = this.tableOfContents.filter(
      (chapter) => chapter.file === file
    );

    if (chapter.length == 0) {
      throw "File name not found";
    } else if (chapter.length > 1) {
      throw "File name not unique";
    }

    return chapter[0];
  }

  getURLForFile(file) {
    const chapterInfo = this.getChapterInfo(file);
    return this.urlPrefix + chapterInfo.file;
  }

  getChapNumForFile(file) {
    const chapterInfo = this.getChapterInfo(file);
    return chapterInfo.chapterNumber;
  }
}

const bookContents = new BookContents(tableOfContents);
export default bookContents;
