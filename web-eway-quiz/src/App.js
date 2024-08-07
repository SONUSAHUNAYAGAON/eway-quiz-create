import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddQuiz from "./components/AddQuiz";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AddQuiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
