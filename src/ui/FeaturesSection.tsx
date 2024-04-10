import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto">
        <h2 className="mb-10 text-4xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Add feature cards */}
          <div className="shadow-xl card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">VFR Flight Planning</h3>
              <p>Plan your VFR flights with ease using our intuitive tools.</p>
            </div>
          </div>
          {/* Add more feature cards */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
