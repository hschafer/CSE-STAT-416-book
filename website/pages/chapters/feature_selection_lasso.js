import { BM, IM } from "../../components/latex";

import Chapter from "../../components/chapter";
import Link from "next/link";
import MarginNote from "../../components/marginnote";
import TYU from "../../components/test_your_understanding";
import bookContents from "../../data/table_of_contents";

export default function FeatureSelectionLASSO() {
  return (
    <Chapter fileName="feature_selection_lasso">
      <section>
        <p>
          In the last chapter, we introduced the concept of overfitting in
          linear regression and the effect that has on the learned coefficients{" "}
          <IM math={`\\hat{w}`} /> being very large. We introduced the idea of
          regularization to the quality metric to prevent overfitting. In this
          chapter, we introduce the concept of <b>feature selection</b>, its
          benefits, and various strategies for doing it.
        </p>

        <h3>Recap</h3>
        <p>
          When introducing the motivation for regularizing linear regression
          models, we discussed how overfitting tends to make coefficients of the
          learned model large. To emphasize, it's not necessarily the case that
          high degree polynomials will have large coefficients. This tends to
          happen when the function "wiggles" like when it is overfit to a small
          dataset; using the same degree polynomial on a much larger dataset is
          less likely to overfit, which means its coefficients will be more
          reasonable magnitudes.
        </p>
        <figure className="fullwidth">
          <img
            src="/animations/feature_selection_lasso/overfit_poly.png"
            alt="Overfit Polynomial"
          />
          <img
            src="/animations/feature_selection_lasso/not_overfit_poly.png"
            alt="Overfit Polynomial"
          />
          <div>
            Both images show degree 14 polynomials. The first is overfit on a
            small dataset (<IM math={`|w_j| \\gg 0`} />) while the second is not
            since there is enough training data.
          </div>
        </figure>
        <p>
          We introduced the idea of regularization, which adds a penalty for
          signs of overfitting to the quality metric. In the case of linear
          regression, one such regularizer is the L2 penalty
          <MarginNote>
            Recall, we don't want to penalize the intercept. We use the notation{" "}
            <IM math={`w_{1:D}`} /> to refer to all coefficients from{" "}
            <IM math={`w_1`} /> to <IM math={`w_D`} /> (therefore, excluding{" "}
            <IM math={`w_0`} />
            ).
          </MarginNote>{" "}
          <IM math={`||w_{1:D}||_2^2 = \\sum_{j=1}^D w_j^2`} />. This
          regularizer results in Ridge regression, where we find the
          coefficients that minimize the following quality metric.
        </p>
        <BM math={`\\hat{w} = \\min_w RSS(w) + \\lambda ||w_{1:D}||_2^2`} />
        <p>
          Recall that <IM math={`\\lambda`} /> is a tuning parameter to control
          how much we care about this penalty. Another common term for a tuning
          parameter is a <b>hyperparameter</b>. This terminology comes from the
          fact that it is a value you set as the ML engineer which effects the
          resulting parameters (e.g., coefficients) learned by the model.
        </p>
        <p>
          If you make <IM math={`\\lambda`} /> too small (e.g., near 0), the
          model is barely penalized for overfitting so regularization will have
          very little impact on the final solution. If you make{" "}
          <IM math={`\\lambda`} /> too large (e.g., near <IM math={`\\infty`} />
          ), then the model is overly penalized and won't be able to learn any
          non-zero coefficients. Last time, we mentioned that you can use the
          same process outlined in{" "}
          {bookContents.linkTo("assessing_performance")} to find the optimal{" "}
          <IM math={`\\lambda`} />. We want to go into a little more detail
          about the process below.
        </p>

        <h3>
          Details of selecting <IM math={`\\lambda`} />
        </h3>

        <TYU>
          <TYU.HeaderMC
            options={[
              <>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the{" "}
                <em>training set</em>.
              </>,
              <>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the <em>test set</em>.
              </>,
              <>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the{" "}
                <em>validation set</em>.
              </>,
              <>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>training set</em>.
              </>,
              <>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>test set</em>.
              </>,
              <>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>validation set</em>.
              </>,
            ]}
            correct="2"
            name="selecting-lambda"
          >
            How would you go about selecting <IM math={`\\lambda`} /> using our
            model selection procedure? You would choose the{" "}
            <IM math={`\\lambda`} /> with the...
          </TYU.HeaderMC>
          <TYU.Explanation>
            <p>
              Remember that when selecting which model we want to use, we have
              to use the validation set and not the training or test set. Recall
              that if we use the training set to decide, we will favor models
              that are overfit since they can have the potential to just
              memorize the answers for the training set rather than
              generalizing. Using the test set to select the model ruins the
              point of the test set as a stand-in for future data, so we need to
              use the validation set. This eliminates all options except:
            </p>
            <ul>
              <li>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the{" "}
                <em>validation set</em>.
              </li>
              <li>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>validation set</em>.
              </li>
            </ul>

            <p>
              It's a bit subtle which one of these are correct. Recall that with
              regularization, we are changing our quality metric so that our
              learned predictor is the following.
            </p>

            <BM
              math={`\\hat{w}_{ridge} = \\min_w RSS(w) + \\lambda||w_{1:D}||_2^2`}
            />

            <p>
              However, our task here is to compare two predictors learned from
              say <IM math={`\\lambda = 0.01`} /> and{" "}
              <IM math={`\\lambda = 10`} /> to identify which ones we think will
              perform the best in the future. Our estimate for this value is{" "}
              <IM math={`RSS_{validation}(\\hat{w})`} />, so if we want to pick
              the one that we think will do best in the future, we should choose
              the one with the smallest RSS on the validation set.
            </p>

            <p>
              An alternative way of thinking about this: for different settings
              of <IM math={`\\lambda`} /> (e.g., <IM math={`\\lambda = 0.01`} />{" "}
              and <IM math={`\\lambda = 10`} />
              ), the values of{" "}
              <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} /> are
              incomparable. Because there is a <IM math={`\\lambda`} /> inside
              the expression, the "unit" of the values might be different with
              differing values of <IM math={`\\lambda`} />. Since comparing
              these numbers mean different things, we can't gain an insight into
              which predictor is "better" by comparing them. However,{" "}
              <IM math={`RSS_{validation}(\\hat{w})`} /> is always the same unit
              regardless of which <IM math={`\\lambda`} /> you use, so you can
              compare different predictors with this value.
            </p>

            <p>
              This highlights what we said last time that this process for
              choosing <IM math={`\\lambda`} /> is exactly the same as we
              outlined in {bookContents.linkTo("assessing_performance")}. In
              that chapter, we said you always choose the model that has the
              lowest validation error, which is the same here!
            </p>

            <p>
              To be a bit more concrete, our hyperparameter tuning algorithm for
              Ridge regression is as follows. Pay particular attention to how
              this is similar to the process described earlier. What are the key
              parts that are different due to the specifics of Ridge?
            </p>

            {/* Please God have a better way of formatting this */}
            <pre>
              <code>
                for each <IM math={`\\lambda`} /> in the{" "}
                <IM math={`\\lambda`} />s you want to try:
                <br />
                {"    "}Train a model using your ML algorithm (e.g., Gradient
                Descent)
                <br />
                {"      "}
                <IM
                  math={`\\hat{w}_{ridge(\\lambda)} = \\argmin RSS_{train}(w) + \\lambda ||w_{1:D}||_2^2`}
                />
                <br />
                {"    "}Compute validation error
                <br />
                {"      "}
                <IM
                  math={`validation\\_error = RSS_{val}(\\hat{w}_{ridge(\\lambda)})`}
                />
                <br />
                {"    "}Track <IM math={`\\lambda`} /> with smallest{" "}
                <IM math={`validation\\_error`} />
                <br />
                Return <IM math={`\\lambda^*`} /> and estimate of future error{" "}
                <IM math={`RSS_{test}(\\hat{w}_{ridge(\\lambda^*)})`} />
              </code>
            </pre>
          </TYU.Explanation>
        </TYU>
      </section>

      <section>
        <h2>Feature selection</h2>

        <h3>Sparsity Examples</h3>
      </section>

      <section>
        <h2>Algorithm 1: All Subsets</h2>

        <h3>Selecting best subset</h3>

        <h3>Algorithmic Efficiency</h3>

        <h3>Approximating with greedy algorithm</h3>
      </section>

      <section>
        <h2>Algorithm 2: Ridge Regression</h2>

        <h3>Problems with Ridge for feature selection</h3>
      </section>

      <section>
        <h2>Algorithm 3: LASSO Regression</h2>

        <h3>Coefficient Paths</h3>

        <h3>Why sparse solutions?</h3>

        <h3>
          Selecting <IM math={`\\lambda`} />
        </h3>

        <h3>Practical Considerations</h3>

        <h3>Interpreting results</h3>
      </section>

      <section>
        <h2>Recap</h2>
      </section>
    </Chapter>
  );
}
