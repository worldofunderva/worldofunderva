import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TokenomicsSection } from '@/components/TokenomicsSection';
import { BusinessPillars } from '@/components/BusinessPillars';
import { SentinelGate } from '@/components/SentinelGate';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TokenomicsSection />
        <BusinessPillars />
        <SentinelGate />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
