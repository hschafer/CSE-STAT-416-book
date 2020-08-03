import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import styles from "./layout.module.css";
import tableOfContents from "../table_of_contents.js";
import { useState } from "react";

function makeChapter(chapter) {
  return (
    <NavDropdown.Item key={chapter.file}>
      <Link href={`/chapters/${chapter.file}`}>
        <span>
          {chapter.chapterNumber}. {chapter.title}
        </span>
      </Link>
    </NavDropdown.Item>
  );
}

function makeCaseStudy(caseStudy) {
  const [open, setOpen] = useState(false);

  function onClick(evt) {
    setOpen(!open);
    evt.preventDefault();
    evt.stopPropagation();
  }

  return (
    <div key={caseStudy.caseStudy}>
      <NavDropdown.Item>
        <button
          onClick={onClick}
          aria-controls={`case-study-${caseStudy.caseStudy}`}
          aria-expanded={open}
          className={styles.unbutton}
        >
          {caseStudy.title}
        </button>
      </NavDropdown.Item>

      <Collapse in={open} className={styles.caseStudyChapter}>
        <div id={`case-study-${caseStudy.caseStudy}`}>
          {caseStudy.chapters.map(makeDropdownElement)}
        </div>
      </Collapse>
    </div>
  );
}

function makeDropdownElement(entry) {
  if (entry.caseStudy) {
    return makeCaseStudy(entry);
  } else {
    return makeChapter(entry);
  }
}

export default function Layout({
  showTOC = "True",
  prevPage,
  nextPage,
  children,
}) {
  return (
    <>
      <Navbar className={styles.nav} variant="dark" expand="xl" sticky="top">
        {/* Same as example nav, but need to use Links instead of hrefs */}
        <Link href="/">
          <a className="navbar-brand">CSE/STAT 416 Book</a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <a className={"nav-link " + styles.navlink} role="button">
                Home
              </a>
            </Link>
            <NavDropdown
              title="Chapters"
              className={styles.navdropdown}
              id="basic-nav-dropdown"
            >
              {tableOfContents.map(makeDropdownElement)}
            </NavDropdown>
            {prevPage ? (
              <Link href={prevPage}>
                <a className={"nav-link " + styles.navlink} role="button">
                  &#8592; Previous Chapter
                </a>
              </Link>
            ) : (
              ""
            )}
            {nextPage ? (
              <Link href={nextPage}>
                <a className={"nav-link " + styles.navlink} role="button">
                  Next Chapter &#8594;
                </a>
              </Link>
            ) : (
              ""
            )}
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="🔍 Search (not active)"
              className="mr-sm-2"
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div id="container">
        <div id="content-container">
          <main id="content">{children}</main>
          <div className="mainColumn">
            {prevPage ? (
              <Link href={prevPage}>
                <a className="tufte-link no-tufte-underline" role="button">
                  &#8592; Previous Chapter
                </a>
              </Link>
            ) : (
              ""
            )}
            {nextPage ? (
              <Link href={nextPage}>
                <a
                  className="tufte-link no-tufte-underline"
                  role="button"
                  style={{ float: "right" }}
                >
                  Next Chapter &#8594;
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>

        <footer>
          <p>
            Have any feedback about the book? Please let us know using{" "}
            <a
              className="tufte-link"
              href="https://forms.gle/AuikAgFFGmvVjQSy9"
            >
              this Google Form
            </a>{" "}
            or by{" "}
            <a
              className="tufte-link"
              href="https://github.com/hschafer/CSE-STAT-416-book/issues"
            >
              submitting an issue to our GitHub repository
            </a>
            !
          </p>
          <p>
            We use a privacy-oriented analytics tool called Simple Analytics to
            track anonymous site-usage data. Click the badge below to learn
            more.
          </p>
          <p>
            <a
              href="https://simpleanalytics.com/cse-stat-416-book.vercel.app?utm_source=cse-stat-416-book.vercel.app&utm_content=badge"
              referrerPolicy="origin"
              target="_blank"
            >
              <img
                src="https://simpleanalyticsbadge.com/cse-stat-416-book.vercel.app"
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
    </>
  );
}
