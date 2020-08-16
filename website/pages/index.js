import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import bookContents from "../data/table_of_contents.js";

function chapterToLI(chapter) {
  return (
    <li key={chapter.file} value={chapter.chapterNumber}>
      <Link href={`/chapters/${chapter.file}`}>
        <a>{chapter.title}</a>
      </Link>
    </li>
  );
}

export default function Home() {
  return (
    <Layout showTOC="False">
      <Head>
        <title>CSE/STAT 416 Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">CSE/STAT 416 Book</h1>
        <p className="subtitle">
          Author:{" "}
          <a href="https://homes.cs.washington.edu/~hschafer/">
            Hunter Schafer
          </a>
        </p>

        <section>
          <p>
            This book is designed for the CSE/STAT 416 course at the University
            of Washington. The course is designed to teach machine learning to a
            wide audience. We assume comparatively less mathematical background
            than other ML books to make the content more accessible to more
            students. Our mission is{" "}
            <b>to enable anyone who is interested to learn machine learning</b>{" "}
            which means our job is{" "}
            <b>to make tough concepts intuitive and applicable</b>. Read more in
            the introduction.
          </p>

          <p>
            This books is very much a work in progress. We are always interested
            in hearing your feedback so please let us know what you think with
            one of the feedback avenues below.
          </p>

          <h2>Table of Contents</h2>

          <ol id="table-of-contents">
            {bookContents.tocMap(
              (caseStudy) => (
                <li key={caseStudy.caseStudy} className="case-study">
                  <h3>{caseStudy.title}</h3>
                  <ol>{caseStudy.chapters.map(chapterToLI)}</ol>
                </li>
              ),
              chapterToLI
            )}
          </ol>

          <h2>Acknowledgements</h2>

          <p>
            CSE/STAT 416 was originally developed at UW by{" "}
            <a href="https://homes.cs.washington.edu/~ebfox/">Emily Fox</a>{" "}
            based on the Coursera course created by her and{" "}
            <a href="https://homes.cs.washington.edu/~guestrin/">
              Carlos Guestrin
            </a>
            . Hunter was a major contributor to the adaption of the online class
            to its first offering at UW, and has recently been the caretaker of
            the course as it continues to evolve. While the format, text, and
            animations of the book are Hunter's creations, this book wouldn't
            exist without Emily and Carlos' hard work in building a story for
            teaching ML to a broader audience.
          </p>

          <p>
            All of the code for this book (including the animations) can be
            found on our{" "}
            <a href="https://github.com/hschafer/CSE-STAT-416-book">
              GitHub repository
            </a>
            .
          </p>
        </section>
      </main>
    </Layout>
  );
}
