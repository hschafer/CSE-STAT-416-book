import Link from "next/link";

import tableOfContents from "../table_of_contents.js";

import styles from "./layout.module.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default function Layout({ showTOC = "True", children }) {
  return (
    <>
      <Navbar expand="lg">
        {/* Same as example nav, but need to use Links instead of hrefs */}
        <Link href="/">
          <a className="navbar-brand">CSE/STAT 416 Book</a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <a className="nav-link" role="button">
                Home
              </a>
            </Link>
            <NavDropdown title="Chapters" id="basic-nav-dropdown">
              {tableOfContents.map((chapter) => (
                <NavDropdown.Item key={chapter.file}>
                  <Link href={`/chapters/${chapter.file}`}>
                    <span>
                      {chapter.chapterNumber}. {chapter.title}
                    </span>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search (not active)"
              className="mr-sm-2"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div id="container">
        <div id="content-container">
          <main id="content">{children}</main>
        </div>
        {/* TODO this isn't the BEST styling, but I don't know how to make flex work. */}
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
