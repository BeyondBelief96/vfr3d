import React from 'react';
import { FaCoffee } from 'react-icons/fa';

const DonationSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral text-primary-content">
      <div className="container mx-auto text-center">
        <h2 className="mb-10 text-4xl font-bold">Support VFR3D.com</h2>
        <p className="mb-8">
          Your donations help us improve our flight planning tools and provide a better user
          experience for everyone. Every contribution counts!
        </p>
        <a
          href="https://www.buymeacoffee.com/bberisford"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 btn btn-primary hover:scale-105"
        >
          <FaCoffee className="mr-2" /> Buy me a Coffee
        </a>
      </div>
    </section>
  );
};

export default DonationSection;
