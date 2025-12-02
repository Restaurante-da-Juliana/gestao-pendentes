import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { login } from '@/lib/auth';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(usuario, senha);
      
      if (success) {
        onLogin();
      } else {
        setError('Usuário ou senha incorretos');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-elderly-3xl font-bold text-foreground mb-3">
            Pendências
          </h1>
          <p className="text-elderly-lg text-muted-foreground">
            Entre para acessar o sistema
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div>
            <label htmlFor="usuario" className="label-elderly">
              Usuário
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="input-elderly w-full"
              placeholder="Digite seu usuário"
              autoComplete="username"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="senha" className="label-elderly">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input-elderly w-full pr-14"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-4 animate-scale-in">
              <p className="text-destructive text-elderly-base font-medium text-center">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-elderly-xl w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/30 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={28} />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        {/* Help Text */}
        <p className="text-center text-muted-foreground mt-8 text-elderly-base">
          Usuário: <strong>admin</strong> / Senha: <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
