// Page.jsx
import React from "react";
import InterviewComponent from "../Question";
import { Route } from "react-router-dom";

const Pages = ({ data }) => {
  return (
    <>
      {data.map((Question, ind) => (
        <Route
          key={ind}
          path={`/Interview/Question/${ind + 1}`}
          element={<InterviewComponent Question={Question} index={ind} />}
        />
      ))}
    </>
  );
};

export default Pages;
