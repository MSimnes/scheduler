import React from "react";

export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        src="images/status.png"
        className="appointment__status-image"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
