import api from "../../lib/api";
import { BoardObject, type BoardObjectType } from "./board-object.entitiy";

export interface CreateParams {
  type: BoardObjectType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  color?: string;
}

export const boardObjectRepository = {
  async create(boardId: string, data: CreateParams): Promise<BoardObject> {
    const result = await api.post(`/board-object/${boardId}`, data);
    return new BoardObject(result.data);
  },
};
