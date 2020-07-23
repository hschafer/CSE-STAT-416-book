import Link from "next/link";

import tableOfContents from "../table_of_contents.js";

import styles from "./layout.module.css";

export default function Layout({ showTOC = "True", children }) {
  return (
    <div id="container">
      <div id="content-container">
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
        <p>
          We use a privacy-oriented analytics tool called Simple Analytics to
          track anonymous site-usage data. Click the badge below to learn more.
        </p>
        <p>
          <a
            href="https://simpleanalytics.com/cse-stat-416-book-git-master.hschafer.vercel.app?utm_source=cse-stat-416-book-git-master.hschafer.vercel.app&utm_content=badge"
            referrerPolicy="origin"
            target="_blank"
          >
            <img
              src="https://simpleanalyticsbadge.com/cse-stat-416-book-git-master.hschafer.vercel.app"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </a>
        </p>
      </footer>

      <script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      ></script>
      <noscript>
        <img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" />
      </noscript>
    </div>
  );
}
