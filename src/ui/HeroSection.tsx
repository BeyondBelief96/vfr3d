import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section
      className="min-h-screen hero"
      style={{
        backgroundImage: 'url("/heroimage_2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md shadow-xl card bg-base-100">
          <div className="items-center card-body">
            <h1 className="text-5xl font-bold card-title text-neutral-content">
              Visualize, Plan, Fly!
            </h1>
            <p className="mb-5 text-lg font-semibold text-neutral-content">
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
