import FadeLoder from "react-spinners/FadeLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  const style: React.CSSProperties = {
    position: "fixed", // Position relative to the viewport
    top: "35%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -35%)", // Adjust for the element's size
    fontSize: "24px", // Make the font size larger
    fontWeight: "bold", // Optionally, make the text bold
  };

  return (
    <>
      <FadeLoder
        color={"#007BFF"}
        loading={loading}
        cssOverride={override}
        height={20}
        radius={8}
        margin={4}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p style={style}>Uploading...</p>
    </>
  );
}

/*
import React from "react";

const Loader: React.FC = () => (
  <div style={{ textAlign: "center", margin: "20px" }}>
    <p>Uploading...</p>
    <div
      className="spinner"
      style={{
        width: "50px",
        height: "50px",
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #007BFF",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader;
*/
