import DisclaimerSection from '../ui/HomePage/Disclaimer';
import DonationSection from '../ui/HomePage/DonationSection';
import FeaturesSection from '../ui/HomePage/FeaturesSection';
import HeroSection from '../ui/HomePage/HeroSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DonationSection />
      <DisclaimerSection />
    </>
  );
};

export default HomePage;
