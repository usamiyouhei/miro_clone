import Button from '../ui/Button';
import Modal from '../ui/Modal';
import './CreateBoardModal.css';

export default function CreateBoardModal() {
  const isOpen = false;
  const name = 'New Board';
  const submitting = false;

  const footer = (
    <>
      <button className="btn btn-secondary" disabled={submitting}>
        キャンセル
      </button>
      <Button className="btn btn-primary" disabled={submitting || !name.trim()}>
        作成
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="新しいボードを作成"
      footer={footer}
    >
      <div className="create-board-field">
        <label className="create-board-label">ボード名</label>
        <input
          type="text"
          className="input-field"
          placeholder="ボード名を入力"
          defaultValue={name}
          autoFocus
          disabled={submitting}
        />
      </div>
    </Modal>
  );
}
