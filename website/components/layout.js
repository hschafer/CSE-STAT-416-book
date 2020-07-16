import Link from "next/link";

import tableOfContents from "../table_of_contents.js";

import styles from "./layout.module.css";

export default function Layout({ showTOC = "True", children }) {
  return (
    <>
      <div id="container">
        <nav id="navbar" className={showTOC === "True" ? "" : styles.hidden}>
          <p>
            <Link href="/">
              <a>&#8592; Back Home</a>
            </Link>
          </p>
          <ol>
            {tableOfContents.map((chapter) => (
              <li key={chapter.file} value={chapter.chapterNumber}>
                <Link href={`/chapters/${chapter.file}`}>
                  <a>{chapter.title}</a>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <main id="content">{children}</main>
      </div>
      {/* TODO this isn't the BEST styling, but I don't know how to make flex work. */}
      <footer>
        <p>
          Have any feedback about the book? Please let us know using{" "}
          <a href="https://forms.gle/AuikAgFFGmvVjQSy9">this Google Form</a> or
          by{" "}
          <a href="https://github.com/hschafer/CSE-STAT-416-book/issues">
            submitting an issue to our GitHub repository
          </a>
          !
        </p>
      </footer>
    </>
  );
}
