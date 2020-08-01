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

class ChapterInfo {
  constructor(chapterInfoData, urlPrefix) {
    this.chapterInfoData = chapterInfoData;
    this.urlPrefix = urlPrefix;
  }

  getTitle() {
    return this.chapterInfoData.title;
  }

  getFile() {
    return this.chapterInfoData.file;
  }

  getChapterNum() {
    return this.chapterInfoData.chapterNumber;
  }

  getURL() {
    return this.urlPrefix + this.chapterInfoData.file;
  }
}

// Class to store global information about the book
// and convenience functions to operate on them.
// Public (read only) Fields:
//   tableOfContents
class BookContents {
  constructor(tableOfContents, urlPrefix = "/chapters/") {
    this.tableOfContents = tableOfContents.map(
      (chapterInfo) => new ChapterInfo(chapterInfo, urlPrefix)
    );
    this.urlPrefix = urlPrefix;
  }

  getChapterInfo(file) {
    console;
    const chapter = this.tableOfContents.filter(
      (chapter) => chapter.getFile() === file
    );

    if (chapter.length == 0) {
      throw `File name not found ${file}`;
    } else if (chapter.length > 1) {
      throw "File name not unique";
    }

    return chapter[0];
  }
}

const bookContents = new BookContents(tableOfContents);
export default bookContents;
