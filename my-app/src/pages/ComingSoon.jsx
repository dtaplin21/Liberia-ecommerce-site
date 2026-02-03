export default function ComingSoon() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Coming Soon
      </h1>
      <p style={{ maxWidth: 600, opacity: 0.85 }}>
        The Unnamed Farm is preparing something rooted in purpose.
        We’ll be live soon.
      </p>
    </div>
  );
}
