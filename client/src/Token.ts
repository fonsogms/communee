let s: string = "";

export let refreshToken = (newToken: string): void => {
  s = newToken;
};

export let getToken = (): string => {
  return s;
};
