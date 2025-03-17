export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export enum Category {
  MEMBER = "MEMBER",
  CONGREGATOR = "CONGREGATOR",
  WORKER = "WORKER",
}

export enum CategoryPT {
  MEMBRRO = "MEMBER",
  CONGREGADO = "CONGREGATOR",
  OBREIRO = "WORKER",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Believer {
  id: string;
  name: string;
  surname: string;
  birth: string;
  category: Category;
  status: Status; //true ou false
  createdAt: Date;
  updatedAt: Date;
}

export type userOmtPassword = Omit<User, "password">;
