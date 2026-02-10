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
  async getAll(boardId: string): Promise<BoardObject[]> {
    const result = await api.get(`/board-objects/${boardId}`);
    return result.data.map((object: BoardObject) => new BoardObject(object));
  },
  async create(boardId: string, data: CreateParams): Promise<BoardObject> {
    const result = await api.post(`/board-objects/${boardId}`, data);
    return new BoardObject(result.data);
  },
  async update(id: string, data: Partial<BoardObject>): Promise<BoardObject> {
    const result = await api.patch(`/board-objects/${id}`, data);
    return new BoardObject(result.data);
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/board-objects/${id}`);
  },
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);
    const result = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  },
};
