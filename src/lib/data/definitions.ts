export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export enum Category {
  MEMBER = "MEMBER",
  CONGRATOR = "CONGREGATOR",
  WORKER = "WORKER",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Believer {
  id: string;
  name: string;
  surname: string;
  birth: Date;
  category: Category;
  status: Status; //true ou false
  createdAt: Date;
  updatedAt: Date;
}

export type userOmitPassword = Omit<User, "password">;
