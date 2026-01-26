import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { BusinessPillars } from '@/components/BusinessPillars';
import { SentinelGate } from '@/components/SentinelGate';
import { TokenomicsSection } from '@/components/TokenomicsSection';
import { ContractPriceSection } from '@/components/ContractPriceSection';
import { BridgeSection } from '@/components/BridgeSection';
import { CommunitySection } from '@/components/CommunitySection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BusinessPillars />
        <SentinelGate />
        <TokenomicsSection />
        <ContractPriceSection />
        <BridgeSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
