let id: string = "";

export const getUserId = (): string => {
  return id;
};
export const refreshUserId = (newId: string): void => {
  id = newId;
};
