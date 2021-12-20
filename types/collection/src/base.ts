export interface IDateBase {
  createdAt: string;
  updatedAt: string;
}

export interface IIdBase extends IDateBase {
  id: number;
}

export interface IUuidBase extends IDateBase {
  uuid: string;
}
