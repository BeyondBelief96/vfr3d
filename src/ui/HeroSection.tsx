import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section
      className="min-h-screen py-8 hero sm:py-16"
      style={{
        backgroundImage: 'url("/heroimage_2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="px-4 text-center hero-content text-neutral-content sm:px-0">
        <div className="max-w-md shadow-xl card bg-base-100">
          <div className="items-center p-6 card-body sm:p-8">
            <h1 className="text-3xl font-bold sm:text-5xl card-title text-neutral-content">
              Visualize, Plan, Fly!
            </h1>
            <p className="mb-5 text-base font-semibold sm:text-lg text-neutral-content">
              Discover the power of VFR3D - your ultimate solution for flight data visualization.
            </p>
            <div className="justify-center mt-auto card-actions">
              <Link to="/viewer" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
