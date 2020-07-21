import React, { useState } from "react";
import styles from "./spoiler.module.css";

export default function Spoiler({ children }) {
  const [spoilerOn, setSpoilerOn] = useState(true);
  return (
    <span
      className={styles.spoiler + " " + (spoilerOn ? styles.on : "")}
      onClick={() => setSpoilerOn(false)}
    >
      {spoilerOn ? "Think before clicking to reveal" : children}
    </span>
  );
}
