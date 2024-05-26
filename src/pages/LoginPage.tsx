import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await loginWithRedirect();
    navigate('/Viewer');
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <img
            src="logo_2.png"
            alt="VFR3D Logo"
            className="h-24 mx-auto transition-all duration-1000 animate-bounce"
          />
          <h2 className="mt-4 text-3xl font-bold">Welcome to VFR3D</h2>
        </div>

        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <p className="mb-6 text-lg font-medium text-center text-primary-content">
              Log in to start planning your flights!
            </p>

            <div className="flex justify-center">
              {isLoading ? (
                <div className="btn btn-square btn-ghost loading"></div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="btn btn-primary btn-wide hover:scale-105 hover:shadow-xl"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
