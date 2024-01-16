// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./Home";
import Navbar from "./Component/Navbar";
import InterviewComponent from "./Question";
import TestComponent from "./Component/test";
import { AuthContext } from "./Component/AuthContext/AuthContext";


function App() {
  const context = useContext(AuthContext)
  console.log(context.Questions)
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/test" element={<TestComponent />} />
          <Route path="/" element={<Home />} />
          <Route path="/Interview" element={<InterviewComponent  />} />
          {context.Questions?context?.Questions.map((Question, ind) => (
        <Route
          key={ind}
          path={`/Interview/Question/${ind + 1}`}
          element={<InterviewComponent Question={Question} index={ind} />}
        />
      )):null}
        </Routes>
      </Router>
    </>
  );
}

export default App;
