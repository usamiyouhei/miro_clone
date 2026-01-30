import api from "../../lib/api";
import { Board } from "./board.entity";

export const boardRepository = {
  async create(name: string): Promise<Board> {
    const result = await api.post("/boards", { name });
    return new Board(result.data);
  },
};
