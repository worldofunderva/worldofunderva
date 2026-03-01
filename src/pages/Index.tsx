import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { BusinessPillars } from '@/components/BusinessPillars';
import { SentinelGate } from '@/components/SentinelGate';
import { TokenomicsSection } from '@/components/TokenomicsSection';
import { ContractSection } from '@/components/ContractSection';
import { RoadmapSection } from '@/components/RoadmapSection';
import { BridgeSection } from '@/components/BridgeSection';
import { TransparencyBar } from '@/components/TransparencyBar';
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
        <ContractSection />
        <RoadmapSection />
        <BridgeSection />
      </main>
      <TransparencyBar />
      <Footer />
    </div>
  );
};

export default Index;
