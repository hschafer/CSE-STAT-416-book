import Layout from "./layout";
import styles from "./chapter.module.css";
import tableOfContents from "../table_of_contents";

function findChapterInfo(fileName) {
  const chapter = tableOfContents
    .map((entry) => (entry.caseStudy ? entry.chapters : [entry]))
    .flat(1)
    .filter((chapter) => chapter.file === fileName);

  if (chapter.length == 0) {
    throw new Error("File name not found");
  } else if (chapter.length > 1) {
    throw new Error("File name not unique");
  }

  return chapter[0];
}

export default function Chapter({ children, fileName }) {
  const chapter = findChapterInfo(fileName);
  return (
    <Layout>
      <article>
        <h1>
          Chapter {chapter.chapterNumber}: {chapter.title}
        </h1>
        {children}
      </article>
    </Layout>
  );
}
