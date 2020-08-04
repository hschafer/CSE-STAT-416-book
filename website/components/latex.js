import { BlockMath, InlineMath } from "react-katex";

import styles from "./latex.module.css";

function errorCheck(math, children) {
  if (math === undefined && children === undefined) {
    throw new Error("No math provided to IM or BM");
  }
}

function IM({ math, children }) {
  errorCheck(math, children);
  return (
    <span className={styles.inlineMathWrapper}>
      {children ? (
        <InlineMath className="foo">{children}</InlineMath>
      ) : (
        <InlineMath className="bar" math={math} />
      )}
    </span>
  );
}

function BM({ math, children }) {
  errorCheck(math, children);
  return (
    <div className={styles.displayMathWrapper}>
      {children ? <BlockMath>{children}</BlockMath> : <BlockMath math={math} />}
    </div>
  );
}

export { IM, BM };
