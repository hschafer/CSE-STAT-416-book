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

export default tableOfContents;
