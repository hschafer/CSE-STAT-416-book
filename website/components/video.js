export default function Video({ children, src, type }) {
  return (
    <video autoPlay controls loop>
      <source src={src} type={`video/${type}`} />
      Your browser does not support the video tag.
    </video>
  );
}
