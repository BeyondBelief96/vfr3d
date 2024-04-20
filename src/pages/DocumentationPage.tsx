// DocumentationPage.tsx
import React from 'react';
import Features from '../features/Documentation/Features';
import GettingStarted from '../features/Documentation/GettingStarted';
import Introduction from '../features/Documentation/Introduction';
import Navigation from '../features/Documentation/Navigation';

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1 md:sticky md:top-8 md:self-start">
            <Navigation />
          </div>
          <main className="md:col-span-3">
            <Introduction />
            <GettingStarted />
            <Features />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
