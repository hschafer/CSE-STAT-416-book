import styles from "./comments.module.css";

export default function MatthewComment({ children }) {
  return (
    <>
      <label htmlFor="matthewcomment" className="margin-toggle">
        &#8853;
      </label>
      <input type="checkbox" id="matthewcomment" className="margin-toggle" />
      <span className={"marginnote " + styles.matthewcomment}>
        Matthew: {children}
      </span>
    </>
  );
}
