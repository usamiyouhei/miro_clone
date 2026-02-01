import { RiStickyNoteFill, RiText, RiImageFill } from "react-icons/ri";
import Header from "../../components/Header";
import Canvas from "../../components/Canvas";
import "./Board.css";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Board as BoardEntity } from "../../modules/boards/board.entity";
import { boardRepository } from "../../modules/boards/board.repository";

export default function Board() {
  const currentUser = useAtomValue(currentUserAtom);
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardEntity | null>(null);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const data = await boardRepository.getBoard(boardId!);
      setBoard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentUser) return <Navigate to="/signin" />;
  return (
    <div className="board-page">
      <Header />

      <div className="board-page__content">
        <aside className="toolbar">
          <div className="toolbar__group">
            <button className="toolbar__button" title="Sticky Note">
              <RiStickyNoteFill className="toolbar__icon" />
            </button>
            <button className="toolbar__button" title="Text">
              <RiText className="toolbar__icon" />
            </button>
            <button className="toolbar__button" title="Image">
              <RiImageFill className="toolbar__icon" />
            </button>
            <input type="file" style={{ display: "none" }} accept="image/*" />
          </div>
        </aside>

        <main className="board-page__canvas-area">
          <Canvas />
        </main>
      </div>
    </div>
  );
}
