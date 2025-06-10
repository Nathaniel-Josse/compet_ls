'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Home from './home/home';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        router.push('/login');
        return;
      }
      setIsAuthenticated(true);
      return;
    };

    checkAuth();
  }, []);

  return isAuthenticated ? <Home /> : <div>Chargement...</div>;
  // return (
  //   <div><Home/></div>
  // );
}
