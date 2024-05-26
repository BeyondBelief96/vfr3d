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
    <section className="min-h-screen bg-base-100">
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <img src="logo_2.png" alt="VFR3D Logo" className="h-24 mx-auto" />
            <h2 className="mt-4 text-3xl font-bold">Welcome to VFR3D</h2>
          </div>
          <div className="shadow-xl card bg-base-200">
            <div className="card-body">
              <p className="mb-6 text-lg text-center">Log in to start planning your flights!</p>
              <div className="flex justify-center">
                <button
                  onClick={handleLogin}
                  className="px-8 py-3 text-lg font-bold text-primary-content btn btn-primary btn-wide"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
