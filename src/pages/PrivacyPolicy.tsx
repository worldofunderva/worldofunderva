import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">World of Underva</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: March 9, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              World of Underva ("we," "us," or "our") operates the website at worldofunderva.org and related services 
              (collectively, the "Platform"). This Privacy Policy explains how we handle information when you visit 
              the Platform or interact with our ecosystem, including the $WOU token, Sentinel NFT minting, and 
              related decentralized applications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. We Do Not Collect Personal Data</h2>
            <p>
              World of Underva is designed with privacy in mind. <strong className="text-foreground">We do not collect, 
              store, or process any personal data.</strong> Users interact with the Platform by connecting their 
              cryptocurrency wallets and minting Sentinel NFTs directly on chain. No registration, email, name, 
              or other personal information is required or collected.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Wallet Connections</h2>
            <p>
              When you connect your wallet to the Platform, we do not store your wallet address on our servers. 
              Your wallet connection is handled client side through standard Web3 protocols (such as WalletConnect 
              or browser extensions). We never have access to your private keys or seed phrases.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. On Chain Data</h2>
            <p>
              All transactions, including Sentinel NFT minting and $WOU token transfers, occur directly on public 
              blockchains (Ethereum L1 and Base L2). This on chain data is publicly visible and immutable by design. 
              We do not control or store this data—it exists on the decentralized blockchain network. Your wallet 
              address and transaction history are visible to anyone via blockchain explorers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Analytics</h2>
            <p>
              We may use privacy respecting analytics tools to understand general usage patterns of the Platform 
              (such as page views and traffic sources). These tools do not collect personally identifiable information 
              and do not track individual users. No cookies are used for tracking purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Third Party Services</h2>
            <p className="mb-3">
              The Platform integrates with third party services that have their own privacy practices:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Wallet providers (MetaMask, WalletConnect, Coinbase Wallet)</li>
              <li>Blockchain networks (Ethereum, Base)</li>
              <li>Blockchain explorers (Etherscan, BaseScan)</li>
            </ul>
            <p className="mt-3">
              We encourage you to review the privacy policies of any third party services you use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Communication Channels</h2>
            <p>
              If you choose to contact us through Discord, Telegram, or other community channels, any information 
              you share is governed by those platforms' privacy policies. We do not collect or store data from 
              these interactions outside of the respective platforms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Children's Privacy</h2>
            <p>
              The Platform is not intended for individuals under the age of 18. Since we do not collect personal 
              data, we cannot knowingly identify users' ages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an 
              updated "Last updated" date. Your continued use of the Platform after any changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please reach out through our official channels:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Discord: <a href="https://discord.gg/worldofunderva" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">discord.gg/worldofunderva</a></li>
              <li>Telegram: <a href="https://t.me/worldofunderva" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">t.me/worldofunderva</a></li>
              <li>X: <a href="https://x.com/worldofunderva" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">x.com/worldofunderva</a></li>
            </ul>
          </section>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto max-w-4xl px-6 flex items-center justify-between text-xs text-muted-foreground">
          <p>© 2026 World of Underva. All rights reserved.</p>
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
