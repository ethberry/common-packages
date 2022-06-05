export interface IDateBase {
  createdAt: string;
  updatedAt: string;
}

export interface IIdBase {
  id: number;
}

export interface IIdDateBase extends IIdBase, IDateBase {}

export interface IUuidBase {
  uuid: string;
}

export interface IUuidDateBase extends IUuidBase, IDateBase {}
