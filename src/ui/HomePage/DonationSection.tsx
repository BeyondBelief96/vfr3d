import React from 'react';

const DonationSection: React.FC = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto text-center">
        <h2 className="mb-10 text-4xl font-bold">Support VFR3D.com</h2>
        <p className="mb-8">
          The services to keep this site running costs money. Your support helps us continue
          developing and improving VFR3D.com.
        </p>
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
