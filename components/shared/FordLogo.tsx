interface Props {
  width?: number;
  className?: string;
}

// Logo oficial Ford hospedado no Wikimedia Commons.
// viewBox original: 0 0 264.58 95.23 → razão ≈ 0.36
const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg";

export default function FordLogo({ width = 250, className = "" }: Props) {
  const height = Math.round(width * (95.227339 / 264.58333));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_URL}
      alt="Ford"
      width={width}
      height={height}
      className={className}
      style={{
        filter: "drop-shadow(0 0 24px rgba(0, 104, 214, 0.45))",
      }}
    />
  );
}
