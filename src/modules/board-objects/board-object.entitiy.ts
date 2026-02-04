export type BoardObjectType = "sticky" | "text" | "image";

export class BoardObject {
  id!: string;
  board!: string;
  type!: BoardObjectType;
  x!: number;
  y!: number;
  width?: number;
  height?: number;
  content?: string;
  createdAt!: string;
  updatedAt!: string;
  color?: string;

  constructor(data: BoardObject) {
    Object.assign(this, data);
  }
}
