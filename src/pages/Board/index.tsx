import { RiStickyNoteFill, RiText, RiImageFill } from "react-icons/ri";
import Header from "../../components/Header";
import Canvas from "../../components/Canvas";
import "./Board.css";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";

export default function Board() {
  const currentUser = useAtomValue(currentUserAtom);

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
