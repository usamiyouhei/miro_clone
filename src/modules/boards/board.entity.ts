export class Board {
  id!: string;
  name!: string;
  ownerId!: string;
  createdAt!: string;
  updatedAt!: string;

  constructor(data: Board) {
    Object.assign(this, data);
  }
}
