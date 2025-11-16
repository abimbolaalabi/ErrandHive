import React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
        padding: "0 20px",              // padding for small screens
      }}
    >
      <h1
        style={{
          fontSize: "clamp(3rem, 20vw, 8rem)",   // small on mobile, huge on desktop
          margin: "0",
          letterSpacing: "5px",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "clamp(1.2rem, 6vw, 2rem)",  // adjusts smoothly
          marginTop: "0.5rem",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "#aaa",
          marginTop: "1rem",
          fontSize: "clamp(0.8rem, 4vw, 1.1rem)", // readable on all screen sizes
          maxWidth: "350px",
        }}
      >
        Sorry, the page you’re looking for doesn’t exist.
      </p>
    </div>
  );
};

export default PageNotFound;
