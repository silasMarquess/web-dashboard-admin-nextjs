import { Category, Status } from "../data/definitions";

export const getEnumCategory = (keySring: string) => {
  const category: Category = Category[keySring as keyof typeof Category];
  return category;
};

export const getEnumStatus = (keySring: string) => {
  const category: Status = Status[keySring as keyof typeof Status];
  return category;
};
