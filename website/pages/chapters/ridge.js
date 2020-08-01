import { BM, IM } from "../../components/latex";
import { MarginNote, MarginNoteCounter } from "../../components/marginnote";

import Chapter from "../../components/chapter";
import Link from "next/link";
import Video from "../../components/video";
import bookContents from "../../data/table_of_contents";

export default function Ridge() {
  var marginNoteCounter = new MarginNoteCounter();
  var linRegChapter = bookContents.getChapterInfo("linear_regression");
  return (
    <Chapter fileName="ridge">
      <section>
        <p>
          So in the last chapter, we discussed how to assess the performance of
          our predictors using a test set, how to select the best model
          complexity with a validation set or cross validation, and a bit of the
          theory of where errors come from (bias and variance).
        </p>

        <p>
          In this chapter, we will look at how to interpret the coefficients of
          a regression model and learn how we can potentially spot overfitting
          from the coefficients themselves. This will lead us to a discussion of{" "}
          <b>regularization</b>. As a quick preview, regularization is the
          process of adding a mechanism to our quality metric to try to push the
          model away from overfitting.
        </p>

        <h2>Interpreting Coefficients</h2>
        <p>
          Recall that back in{" "}
          <Link href={linRegChapter.getURL()}>
            <a>Chapter {linRegChapter.getChapterNum()}</a>
          </Link>{" "}
        </p>
      </section>
    </Chapter>
  );
}
