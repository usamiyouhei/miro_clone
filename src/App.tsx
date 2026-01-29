import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import BoardList from "./pages/BoardList";
import Board from "./pages/Board";
import { currentUserAtom } from "./modules/auth/current-user.state";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { authRepository } from "./modules/auth/auth.repository";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div />;

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
