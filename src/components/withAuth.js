import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  return () => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
      return <Component />;
    }
  };
};

export default withAuth;