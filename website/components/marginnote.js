export default function MarginNote({ children, id }) {
  return (
    <>
      <label htmlFor={id} className="margin-toggle">
        &#8853;
      </label>
      <input type="checkbox" id={id} className="margin-toggle" />
      <span className="marginnote">{children}</span>
    </>
  );
}
