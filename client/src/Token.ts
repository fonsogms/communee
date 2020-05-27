let token: string = "";

export let refreshToken = (newToken: string): void => {
  token = newToken;
};

export let getToken = (): string => {
  return token;
};
