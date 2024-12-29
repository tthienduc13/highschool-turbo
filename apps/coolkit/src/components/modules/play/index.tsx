import SnowEffect from "@/components/animation/snow/snow-effect";

export default function PlayModule() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #2980b9, #6dd5fa, #f2f2f2)",
        fontFamily: "'Quicksand', sans-serif",
        position: "relative",
      }}
    >
      <SnowEffect />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "white",
          top: "40%",
        }}
      >
        <h1>Snow Effect in Next.js</h1>
      </div>
    </div>
  );
}
