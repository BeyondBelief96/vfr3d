import React from 'react';

const DonationSection: React.FC = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto text-center">
        <h2 className="mb-10 text-4xl font-bold">Support Airspace.io</h2>
        <p className="mb-8">Your support helps us continue developing and improving Airspace.io.</p>
        <a
          href="https://www.buymeacoffee.com/bberisford"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Buy me a Coffee
        </a>
      </div>
    </section>
  );
};

export default DonationSection;
