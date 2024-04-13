import DisclaimerSection from '../ui/Disclaimer';
import DonationSection from '../ui/DonationSection';
import FeaturesSection from '../ui/FeaturesSection';
import HeroSection from '../ui/HeroSection';

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
