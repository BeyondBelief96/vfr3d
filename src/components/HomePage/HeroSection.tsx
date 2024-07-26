import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
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
    <section
      className="min-h-screen py-8 bg-center hero sm:py-16"
      style={{
        backgroundSize: 'cover',
        backgroundImage: 'url("/background_image.jpg")',
      }}
    >
      <div className="px-4 text-center hero-content text-neutral-content sm:px-0">
        <div className="max-w-md shadow-xl card bg-base-100 bg-opacity-90">
          <div className="items-center p-6 opacity-100 card-body sm:p-8">
            <img src="/logo_2.png" alt="VFR3D Logo" className="mb-4" />
            <p className="mb-5 text-base font-semibold sm:text-lg text-neutral-content">
              Fly smarter with VFR3D, the intuitive flight planning tool designed for the weekend
              pilots.
            </p>
            <div className="transition-transform duration-300 opacity-100 card-actions">
              {isLoading ? (
                <div className="btn btn-square btn-ghost loading"></div>
              ) : (
                <button onClick={handleLogin} className="w-24 btn btn-primary hover:scale-105">
                  Log In
                </button>
              )}
              <Link to="/documentation" className="btn btn-primary hover:scale-105">
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
