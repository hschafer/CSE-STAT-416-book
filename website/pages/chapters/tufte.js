import Chapter from "../../components/chapter";
import { MarginNote, MarginNoteCounter } from "../../components/marginnote";

export default function Tufte() {
  const codeBlocks = {
    helloWorld: `def hello_world():
    print('Hello world!')`,
  };

  var marginNoteCounter = new MarginNoteCounter();

  return (
    <>
      <Chapter fileName="tufte">
        {/* <p className='subtitle'>Subtitle</p> */}
        <section>
          <p>
            This page will keep a very short reference of some common Tufte
            elements and how to create them.
          </p>

          <h2>Section</h2>
          <p>
            Some text
            <MarginNote counter={marginNoteCounter}>
              This is a margin note. Notice there isn't a number preceding the
              note.
            </MarginNote>
          </p>

          <h3>Subsection</h3>
          <blockquote>
            <p>
              This is a pretty great quote from the man himself. Maybe one of
              the best quotes that are out there.
            </p>
            <footer>-Hunter Schafer, 2020</footer>
          </blockquote>

          <p>
            Some text.
            <MarginNote counter={marginNoteCounter}>
              This is another margin note. Notice there isn't a number preceding
              the note.
            </MarginNote>
            And some more text that goes after a margin.
          </p>
        </section>
        <section>
          <h2>Figures</h2>
          <p>
            This section shows what you can do with figures. It will have an
            inline figure, a margin figure, and a full-width figure.
          </p>
          <figure>
            <MarginNote counter={marginNoteCounter}>
              An inline figure
            </MarginNote>
            <img
              src="https://edwardtufte.github.io/tufte-css/img/exports-imports.png"
              alt="Some text"
            ></img>
          </figure>

          <p>
            This paragraph
            <MarginNote counter={marginNoteCounter}>
              <img
                src="https://edwardtufte.github.io/tufte-css/img/rhino.png"
                alt="Another image"
              ></img>
              Can also have some text below it that can be pretty long
            </MarginNote>
            has a margin note with an image.
          </p>

          <p>
            Below is a full-width figure. Adding some more text for spacing.
            Adding some more text for spacing. Adding some more text for
            spacing. Adding some more text for spacing. Adding some more text
            for spacing. Adding some more text for spacing. Adding some more
            text for spacing. Adding some more text for spacing. Adding some
            more text for spacing. Adding some more text for spacing.
          </p>
          <figure className="fullwidth">
            <img
              src="https://edwardtufte.github.io/tufte-css/img/napoleons-march.png"
              alt="Another image"
            ></img>
          </figure>

          <p>The following example shows how to make an iframe.</p>

          <figure className="iframe-wrapper">
            <iframe
              width="853"
              height="480"
              src="https://www.youtube.com/embed/YslQ2625TR4"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </figure>
        </section>

        <section>
          <h2>Code</h2>

          <p>This shows how to make a code block.</p>
          <pre>
            <code>{codeBlocks["helloWorld"]}</code>
          </pre>
        </section>
      </Chapter>
    </>
  );
}
