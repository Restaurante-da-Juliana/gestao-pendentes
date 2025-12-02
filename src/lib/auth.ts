const AUTH_KEY = 'pendencias_auth';
const CREDENTIALS_USER = 'admin';
const CREDENTIALS_PASS = 'admin123';

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (usuario: string, senha: string): boolean => {
  // Em produção, usar variáveis de ambiente da Vercel
  // const validUser = process.env.VITE_AUTH_USER || CREDENTIALS_USER;
  // const validPass = process.env.VITE_AUTH_PASS || CREDENTIALS_PASS;
  
  if (usuario === CREDENTIALS_USER && senha === CREDENTIALS_PASS) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  
  return false;
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
