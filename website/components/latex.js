import { BlockMath, InlineMath } from "react-katex";

import styles from "./latex.module.css";

// Kind of weird, but you have to double escape the macro here
// since the string literally coming in uses escape sequences.
var MACROS = [["\\\\argmin", "\\text{arg\\ min}\\ "]];
MACROS = MACROS.map(([macro, expansion]) => [
  new RegExp(macro, "g"),
  expansion,
]);

function expandMacros(str) {
  MACROS.forEach(([macro, expansion]) => {
    str = str.replace(macro, expansion);
  });
  return str;
}

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
        <InlineMath>{expandMacros(children)}</InlineMath>
      ) : (
        <InlineMath math={expandMacros(math)} />
      )}
    </span>
  );
}

function BM({ math, children }) {
  errorCheck(math, children);
  return (
    <div className={styles.displayMathWrapper}>
      {children ? (
        <BlockMath>{expandMacros(children)}</BlockMath>
      ) : (
        <BlockMath math={expandMacros(math)} />
      )}
    </div>
  );
}

export { IM, BM };
