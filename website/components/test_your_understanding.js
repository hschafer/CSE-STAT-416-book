import React, { useState } from "react";
import styles from "./test_your_understanding.module.css";

export default function TYU({ header, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div class={styles.card} onClick={() => setExpanded(!expanded)}>
      <div class={styles.header}>
        <span class={styles.title}>{header}</span>
        <span class={styles.arrow}>{expanded ? `\u25BD` : `\u25B7`}</span>
      </div>

      <div class={styles.body + " " + (expanded ? styles.expanded : "")}>
        {children}
      </div>
    </div>
  );
}
