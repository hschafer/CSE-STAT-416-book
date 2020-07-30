import Layout from "./layout";
import styles from "./chapter.module.css";
import tableOfContents from "../table_of_contents";

function findChapterInfo(fileName) {
  var flattenedChapters = tableOfContents
    .map((entry) => (entry.caseStudy ? entry.chapters : [entry]))
    .flat(1);
  var chapterIndex = flattenedChapters.findIndex(
    (chapter) => chapter.file === fileName
  );

  if (chapterIndex === undefined) {
    throw new Error("File name not found");
  }
  console.log(flattenedChapters);
  console.log(chapterIndex);

  return {
    chapter: flattenedChapters[chapterIndex],
    prevChapter:
      chapterIndex > 0 ? flattenedChapters[chapterIndex - 1] : undefined,
    nextChapter:
      chapterIndex < flattenedChapters.length - 1
        ? flattenedChapters[chapterIndex + 1]
        : undefined,
  };
}

function toURL(chapter) {
  if (chapter) {
    return `/chapters/${chapter.file}`;
  } else {
    return undefined;
  }
}

export default function Chapter({ children, fileName }) {
  const chapterInfo = findChapterInfo(fileName);
  return (
    <Layout
      prevPage={toURL(chapterInfo.prevChapter)}
      nextPage={toURL(chapterInfo.nextChapter)}
    >
      <article>
        <h1>
          Chapter {chapterInfo.chapter.chapterNumber}:{" "}
          {chapterInfo.chapter.title}
        </h1>
        {children}
      </article>
    </Layout>
  );
}
