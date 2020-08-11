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
        <p>Recap</p>

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
