import Link from "next/link";

import tableOfContents from "../table_of_contents.js";

import styles from "./layout.module.css";

export default function Layout({ showTOC = "True", children }) {
  return (
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
      <style jsx>{`
        #container {
          display: flex;
          align-items: stretch;
        }

        #navbar {
          min-width: 250px;
          max-width: 250px;
          margin-left: -210px;

          font-size: 1.3rem;
          line-height: 1em;
        }

        /* To cancel out Tufte CSS style */
        #navbar ol,
        #navbar p {
          font-size: inherit;
          line-height: inherit;
        }

        #navbar a {
          underline: none;
          background: none;
        }
      `}</style>
    </div>
  );
}
