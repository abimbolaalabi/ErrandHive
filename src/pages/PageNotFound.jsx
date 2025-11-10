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
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          margin: "0",
          letterSpacing: "5px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          marginTop: "0.5rem",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          color: "#aaa",
          marginTop: "1rem",
        }}
      >
        Sorry, the page you’re looking for doesn’t exist.
      </p>
    </div>
  );
};

export default PageNotFound;
