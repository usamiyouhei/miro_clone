import api from "../../lib/api";
import { Board } from "./board.entity";

export const boardRepository = {
  async getAll(): Promise<Board[]> {
    const result = await api.get("/boards");
    return result.data.map((item: Board) => new Board(item));
  },
  async getBoard(id: string): Promise<Board> {
    const result = await api.get(`/boards/${id}`);
    return new Board(result.data);
  },
  async create(name: string): Promise<Board> {
    const result = await api.post("/boards", { name });
    return new Board(result.data);
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/boards/${id}`);
  },
};
