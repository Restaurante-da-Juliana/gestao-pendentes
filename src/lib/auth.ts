const AUTH_KEY = "pendencias_auth";
const CREDENTIALS_USER = import.meta.env.VITE_AUTH_USER;
const CREDENTIALS_PASS = import.meta.env.VITE_AUTH_PASS;

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem('user');
  const pass = localStorage.getItem('pass');
  return user === CREDENTIALS_USER && pass === CREDENTIALS_PASS;
};

export const login = (usuario: string, senha: string): boolean => {
  if (usuario === CREDENTIALS_USER && senha === CREDENTIALS_PASS) {
    localStorage.setItem("user", CREDENTIALS_USER);
    localStorage.setItem("pass", CREDENTIALS_PASS);
    return true;
  }

  return false;
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
