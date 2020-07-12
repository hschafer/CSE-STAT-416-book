import { InlineMath, BlockMath } from "react-katex";

import styles from './latex.module.css';

function IM({ math, children }) {
  if (children) {
    return <InlineMath>{children}</InlineMath>;
  } else {
    return <InlineMath math={math} />
  }
}

function BM({ math, children}) {
  return (
    <div className={styles.mathwrapper}>
        { children ? <BlockMath>{children}</BlockMath> : <BlockMath math={math} /> }
    </div>
  );
}

export { IM, BM };
