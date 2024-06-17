import React, { useEffect, CSSProperties } from "react";

const override = CSSProperties {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
