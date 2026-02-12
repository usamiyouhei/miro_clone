import { RiStickyNoteFill, RiText, RiImageFill } from "react-icons/ri";
import Header from "../../components/Header";
import Canvas from "../../components/Canvas";
import "./Board.css";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Board as BoardEntity } from "../../modules/boards/board.entity";
import { boardRepository } from "../../modules/boards/board.repository";
import {
  boardObjectRepository,
  type CreateParams,
} from "../../modules/board-objects/board-object.repository";
import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";

export default function Board() {
  const currentUser = useAtomValue(currentUserAtom);
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardEntity | null>(null);
  const [objects, setObjects] = useState<BoardObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

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

  const getCenterPosition = () => {
    const wrapper = canvasRef.current;
    if (!wrapper) return { x: 0, y: 0 };

    const { width, height } = wrapper.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    return {
      x: centerX - offset.x,
      y: centerY - offset.y,
    };
  };

  useEffect(() => {
    fetchBoard();
    fetchObjects();
  }, []);

  const createObject = async (params: Omit<CreateParams, "x" | "y">) => {
    const center = getCenterPosition();

    const x = center.x + (Math.random() - 0.5) * 50;
    const y = center.y + (Math.random() - 0.5) * 50;

    try {
      const newObject = await boardObjectRepository.create(boardId!, {
        x,
        y,
        ...params,
      });
      setObjects([...objects, newObject]);
      console.log(newObject);
    } catch (error) {
      console.error(error);
      alert("オブジェクトの作成に失敗しました");
    }
  };

  const createSticky = async () => {
    await createObject({
      type: "sticky",
      content: "New Sticky Note",
      color: "#FEF3C7",
    });
  };
  const createText = async () => {
    await createObject({
      type: "text",
      content: "Double click to edit",
    });
  };

  const updateObject = async (id: string, data: Partial<BoardObject>) => {
    try {
      const updatedObject = await boardObjectRepository.update(id, data);
      setObjects(objects.map((obj) => (obj.id === id ? updatedObject : obj)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteObject = async (id: string) => {
    try {
      await boardObjectRepository.delete(id);
      setObjects(objects.filter((object) => object.id !== id));
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      alert("オブジェクトの削除に失敗しました");
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      alert("ファイルサイズが大きすぎます");
      return;
    }

    try {
      const result = await boardObjectRepository.uploadImage(file);
      await createObject({
        type: "image",
        width: 300,
        content: result.url,
      });
    } catch (error) {
      console.log(error);
      alert("画像のアップロードに失敗しました");
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
              onClick={createSticky}
            >
              <RiStickyNoteFill className="toolbar__icon" />
            </button>
            <button
              className="toolbar__button"
              title="Text"
              onClick={createText}
            >
              <RiText className="toolbar__icon" />
            </button>
            <button
              className="toolbar__button"
              title="Image"
              onClick={() => imageRef.current?.click()}
            >
              <RiImageFill className="toolbar__icon" />
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              ref={imageRef}
              onChange={uploadImage}
            />
          </div>
        </aside>

        <main className="board-page__canvas-area" ref={canvasRef}>
          <Canvas
            objects={objects}
            onObjectUpdate={updateObject}
            selectedId={selectedId}
            onObjectSelect={setSelectedId}
            onBackgroundClick={() => setSelectedId(null)}
            onObjectDelete={deleteObject}
            offset={offset}
            onOffsetChange={setOffset}
          />
        </main>
      </div>
    </div>
  );
}
