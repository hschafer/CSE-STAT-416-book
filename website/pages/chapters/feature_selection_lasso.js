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
