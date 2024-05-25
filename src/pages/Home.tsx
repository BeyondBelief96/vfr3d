import DisclaimerSection from '../components/HomePage/Disclaimer';
import DonationSection from '../components/HomePage/DonationSection';
import FeaturesSection from '../components/HomePage/FeaturesSection';
import HeroSection from '../components/HomePage/HeroSection';

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
