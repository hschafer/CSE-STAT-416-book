import Layout from "./layout";
import bookContents from "../data/table_of_contents";
import styles from "./chapter.module.css";

export default function Chapter({ children, fileName }) {
  const chapter = bookContents.getChapterInfo(fileName);
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
