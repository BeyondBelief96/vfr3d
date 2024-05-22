import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect();
    navigate('/Viewer');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="shadow-xl card w-96 bg-base-100">
        <div className="card-body">
          <h2 className="justify-center mb-6 text-3xl font-bold card-title">Welcome to VFR3D</h2>
          <div className="flex flex-col items-center space-y-6">
            {/* <img src="/path/to/your/logo.png" alt="VFR3D Logo" className="h-24" /> */}
            <p className="text-center">Login and start planning with VFR3D!</p>
            <button
              onClick={handleLogin}
              className="px-6 py-3 font-bold text-white rounded-full btn btn-primary btn-block"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
