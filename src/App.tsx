import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import BoardList from "./pages/BoardList";
import Board from "./pages/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<BoardList />} />
        <Route path="/boards/:boardId" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
