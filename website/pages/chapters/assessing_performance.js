import Chapter from "../../components/chapter";

import Link from "next/link";
import { InlineMath, BlockMath } from "react-katex";

export default function AssessingPerformance() {
  return (
    <>
      <Chapter fileName="assessing_performance">
        <p>
          This is some assessing Performance text{" "}
          <Link href="/chapters/linear_regression">
            <a>Lin reg</a>
          </Link>
          .
        </p>

        <p>
          This paragraph will have some inline LaTeX in it. Some math{" "}
          <InlineMath>3 + 2 \rightarrow 5</InlineMath>
        </p>

        <p>This paragraph has some in block display</p>
        <BlockMath>\min_x f(x)</BlockMath>
      </Chapter>
    </>
  );
}
