import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="min-h-screen hero"
      style={{
        backgroundImage: 'url("./src/assets/heroimage.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Airspace.io!</h1>
          <p className="mb-5">
            Discover the power of Airspace.io - your ultimate solution for VFR flight planning and
            visualization.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
