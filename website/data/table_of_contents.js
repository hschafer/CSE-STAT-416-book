const tableOfContents = [
  {
    chapterNumber: "0",
    title: "Introduction",
    file: "introduction",
  },
  {
    caseStudy: "1",
    title: "Regression: Housing Prices",
    chapters: [
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
        chapterNumber: "4",
        title: "Feature Selection: LASSO",
        file: "feature_selection_lasso",
      },
    ],
  },
  {
    caseStudy: "2",
    title: "Classification: Review Sentiment",
    chapters: [{ chapterNumber: "?", title: "Coming Soon", file: "" }],
  },
  {
    caseStudy: "3",
    title: "Clustering and Similarity: Similar Articles",
    chapters: [{ chapterNumber: "?", title: "Coming Soon", file: "" }],
  },
  {
    caseStudy: "4",
    title: "Recommender Systems: Product Recommendation",
    chapters: [{ chapterNumber: "?", title: "Coming Soon", file: "" }],
  },
  {
    caseStudy: "5",
    title: "Deep Learning: Image Recognition",
    chapters: [{ chapterNumber: "?", title: "Coming Soon", file: "" }],
  },
  {
    chapterNumber: "99",
    title: "Tufte (layout example)",
    file: "tufte",
  },
];

class ChapterInfo {
  constructor(chapterInfoData, urlPrefix) {
    this.chapterNumber = chapterInfoData.chapterNumber;
    this.title = chapterInfoData.title;
    this.file = chapterInfoData.file;
    this.url = urlPrefix + this.file;

    // Will be added later
    this.prevChapter = undefined;
    this.nextChapter = undefined;
  }
}

// Class to store global information about the book
// and convenience functions to operate on them.
// Public (read only) Fields:
//   tableOfContents
class BookContents {
  constructor(tableOfContents, urlPrefix = "/chapters/") {
    this.urlPrefix = urlPrefix;

    this.tableOfContents = tableOfContents.map(function (entry) {
      if (entry.caseStudy) {
        var copy = Object.assign({}, entry);
        copy.chapters = copy.chapters.map(
          (chapterInfo) => new ChapterInfo(chapterInfo, urlPrefix)
        );
        return copy;
      } else {
        return new ChapterInfo(entry, urlPrefix);
      }
    });
    this.chapterList = this.tableOfContents
      .map((entry) => (entry.caseStudy ? entry.chapters : [entry]))
      .flat(1);
    this.chapterList.forEach(function (chapter, index, chapterList) {
      if (index > 0) {
        chapter.prevChapter = chapterList[index - 1];
      }

      if (index < chapterList.length - 1) {
        chapter.nextChapter = chapterList[index + 1];
      }
    });
  }

  getChapterInfo(file) {
    const chapter = this.chapterList.filter((chapter) => chapter.file === file);

    if (chapter.length == 0) {
      throw `File name not found ${file}`;
    } else if (chapter.length > 1) {
      throw "File name not unique";
    }

    return chapter[0];
  }

  tocMap(caseStudyFun, chapterFun) {
    return this.tableOfContents.map((entry) =>
      entry.caseStudy ? caseStudyFun(entry) : chapterFun(entry)
    );
  }
}

const bookContents = new BookContents(tableOfContents);
export default bookContents;
