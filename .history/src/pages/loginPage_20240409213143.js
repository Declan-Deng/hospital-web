import React, { useState } from "react";

const Schedule = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleMouseEnter = () => setShowOverlay(true);
  const handleMouseLeave = () => setShowOverlay(false);

  return (
    <>
      <style>
        {`
          td, th {
            padding: 10px;
          }
          table {
            border-spacing: 0;
            text-align: center;
            margin: auto;
            border: 7px outset black;
            width: 1000px;
            margin-bottom: 20px;
            box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.3);
          }
          /* Other styles omitted for brevity */
          .overlay {
            display: ${showOverlay ? "block" : "none"};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(1px);
            z-index: 6;
            pointer-events: none;
            transition: 1s;
          }
        `}
      </style>
      <h2 className="h2">
        <strong>邓景元的课表</strong>
      </h2>
      <div className="overlay"></div>
      <table></table>
    </>
  );
};

export default Schedule;
