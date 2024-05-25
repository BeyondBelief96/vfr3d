import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section
      className="min-h-screen py-8 hero sm:py-16"
      style={{
        backgroundImage: 'url("/hero_image.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="px-4 text-center hero-content text-neutral-content sm:px-0">
        <div className="max-w-md shadow-xl card bg-base-100">
          <div className="items-center p-6 card-body sm:p-8">
            <h1 className="text-3xl font-bold sm:text-5xl card-title text-neutral-content">
              Plan, Fly, Repeat with VFR3D
            </h1>
            <p className="mb-5 text-base font-semibold sm:text-lg text-neutral-content">
              Fly smarter with VFR3D, the intuitive flight planning tool designed for the weekend
              pilots.
            </p>
            <div className="justify-center mt-auto card-actions">
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/documentation" className="btn btn-primary">
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
