import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/auth';
import LoginScreen from '@/components/LoginScreen';
import MainScreen from '@/components/MainScreen';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MainScreen />;
};

export default Index;
