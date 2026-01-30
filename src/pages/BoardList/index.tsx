import { Link, Navigate } from "react-router-dom";
import { RiDashboardLine, RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import CreateBoardModal from "../../components/CreateBoardModal";
import Header from "../../components/Header";
import "./BoardList.css";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";
import { useState } from "react";

export default function BoardList() {
  const currentUser = useAtomValue(currentUserAtom);

  const boards = [
    { id: "1", name: "Design Sprint", updatedAt: new Date().toISOString() },
    { id: "2", name: "Kanban Board", updatedAt: new Date().toISOString() },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!currentUser) return <Navigate to="/signin" />;

  return (
    <div className="board-list-page">
      <Header />

      <main className="board-list-main">
        <div className="action-bar">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <RiAddLine className="add-icon" />
            新しいボードを作成
          </button>
        </div>

        {boards.length === 0 ? (
          <div className="empty-state">
            <RiDashboardLine size={48} className="empty-icon" />
            <p className="empty-text">ボードがまだありません。</p>
            <p className="empty-subtext">
              「新しいボードを作成」ボタンから作成してください。
            </p>
          </div>
        ) : (
          <div className="board-grid">
            {boards.map((board) => (
              <Link key={board.id} className="board-card" to="">
                <button className="board-delete-button" title="ボードを削除">
                  <RiDeleteBinLine />
                </button>
                <div className="board-thumbnail">
                  <RiDashboardLine size={48} />
                </div>
                <div className="board-info">
                  <h3 className="board-title">{board.name}</h3>
                  <p className="board-meta">
                    更新:
                    {new Date(board.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen}
        onSubmit={async () => {}}
      />
    </div>
  );
}
