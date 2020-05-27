let id: string = "";

export const getCommunityId = (): string => {
  return id;
};

export const refreshCommunityId = (newId: string): void => {
  id = newId;
};
