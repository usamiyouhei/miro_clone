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
import { boardObjectRepository } from "../../modules/board-objects/board-object.repository";
import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";

export default function Board() {
  const currentUser = useAtomValue(currentUserAtom);
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardEntity | null>(null);
  const [objects, setObjects] = useState<BoardObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchBoard = async () => {
    try {
      const data = await boardRepository.getBoard(boardId!);
      setBoard(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchObjects = async () => {
    try {
      const data = await boardObjectRepository.getAll(boardId!);
      setObjects(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBoard();
    fetchObjects();
  }, []);

  const createObject = async () => {
    const x = 200 + (Math.random() - 0.5) * 50;
    const y = 200 + (Math.random() - 0.5) * 50;

    try {
      const newObject = await boardObjectRepository.create(boardId!, {
        x,
        y,
        type: "sticky",
        content: "New Sticky Note",
      });
      setObjects([...objects, newObject]);
      console.log(newObject);
    } catch (error) {
      console.error(error);
      alert("オブジェクトの作成に失敗しました");
    }
  };

  const updateObject = async (id: string, data: Partial<BoardObject>) => {
    try {
      const updatedObject = await boardObjectRepository.update(id, data);
      setObjects(objects.map((obj) => (obj.id === id ? updatedObject : obj)));
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentUser) return <Navigate to="/signin" />;
  return (
    <div className="board-page">
      <Header title={board?.name ?? ""} />

      <div className="board-page__content">
        <aside className="toolbar">
          <div className="toolbar__group">
            <button
              className="toolbar__button"
              title="Sticky Note"
              onClick={createObject}
            >
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
          <Canvas
            objects={objects}
            onObjectUpdate={updateObject}
            selectedId={selectedId}
            onObjectSelect={setSelectedId}
            onBackgroundClick={() => setSelectedId(null)}
          />
        </main>
      </div>
    </div>
  );
}
