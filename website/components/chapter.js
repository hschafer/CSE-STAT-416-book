import Layout from "./layout";
import tableOfContents from "../table_of_contents";

import styles from "./chapter.module.css";

function findChapterInfo(fileName) {
  const chapter = tableOfContents.filter(
    (chapter) => chapter.file === fileName
  );

  if (chapter.length == 0) {
    throw "File name not found";
  } else if (chapter.length > 1) {
    throw "File name not unique";
  }

  return chapter[0];
}

export default function Chapter({ children, fileName }) {
  const chapter = findChapterInfo(fileName);
  return (
    <Layout>
      <main>
        <article>
          <h1>
            Chapter {chapter.chapterNumber}: {chapter.title}
          </h1>
          {children}
        </article>
      </main>
    </Layout>
  );
}
