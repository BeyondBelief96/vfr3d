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
              <h3 className="card-title">3D Charts Visualization!</h3>
              <p>Visualize VFR Sectionals, TAC Charts, and IFR charts in a new way!</p>
            </div>
          </div>
          <div className="shadow-xl card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Google OSM & Bing Maps Integration!</h3>
              <p>Blend your sectional charts to overlay with our many different map options.</p>
            </div>
          </div>
          <div className="shadow-xl card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Airspace like it was meant to be!</h3>
              <p>
                Thanks to <a href="https://3dairspace.org.uk/">https://3dairspace.org.uk/</a> we are
                able to display airspace like it was meant to be seen!
              </p>
            </div>
          </div>
          {/* Add more feature cards */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
