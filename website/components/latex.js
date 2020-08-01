import { BlockMath, InlineMath } from "react-katex";

import styles from "./latex.module.css";

function errorCheck(math, children) {
  if (math === undefined && children === undefined) {
    throw new Error("No math provided to IM or BM");
  }
}

function IM({ math, children }) {
  errorCheck(math, children);
  if (children) {
    return <InlineMath>{children}</InlineMath>;
  } else {
    return <InlineMath math={math} />;
  }
}

function BM({ math, children }) {
  errorCheck(math, children);
  return (
    <div className={styles.mathwrapper}>
      {children ? <BlockMath>{children}</BlockMath> : <BlockMath math={math} />}
    </div>
  );
}

export { IM, BM };
