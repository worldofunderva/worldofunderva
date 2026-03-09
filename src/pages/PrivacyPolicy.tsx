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
        <p className="text-sm text-muted-foreground mb-12">Last updated: March 9, 2025</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              World of Underva ("we," "us," or "our") operates the website at worldofunderva.org and related services 
              (collectively, the "Platform"). This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you visit the Platform or interact with our ecosystem, including the $WOU token, 
              Sentinel NFT minting, and related decentralized applications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Wallet Information:</strong> Public blockchain addresses you use to interact with our smart contracts. We do not collect private keys.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Browser type, device information, IP address, pages visited, time spent, and referral sources collected via analytics tools.</li>
              <li><strong className="text-foreground">Communication Data:</strong> Information you provide when contacting us through email, Discord, Telegram, or other support channels.</li>
              <li><strong className="text-foreground">On-Chain Data:</strong> Transaction data publicly available on Ethereum L1 and Base L2 blockchains related to $WOU token and Sentinel NFT interactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To operate, maintain, and improve the Platform and our services.</li>
              <li>To process token transactions and smart contract interactions.</li>
              <li>To communicate with you regarding updates, security alerts, and governance proposals.</li>
              <li>To monitor and analyze usage trends and preferences.</li>
              <li>To detect, prevent, and address fraud, security breaches, or technical issues.</li>
              <li>To comply with legal obligations and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Blockchain & Decentralization</h2>
            <p>
              Transactions on public blockchains (Ethereum L1 and Base L2) are inherently transparent and immutable. 
              Once data is recorded on-chain, it cannot be modified or deleted by us or any third party. 
              We have no control over blockchain data and cannot fulfill deletion requests for on-chain information. 
              Please exercise caution when interacting with smart contracts and be aware that your wallet address 
              and transaction history are publicly visible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies & Tracking Technologies</h2>
            <p>
              We may use cookies, web beacons, and similar technologies to collect usage data and enhance your 
              experience. You can control cookie preferences through your browser settings. Disabling cookies 
              may limit certain features of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Third-Party Services</h2>
            <p className="mb-3">
              The Platform may integrate with or link to third-party services, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Wallet providers (MetaMask, WalletConnect, Coinbase Wallet)</li>
              <li>Blockchain explorers (Etherscan, BaseScan)</li>
              <li>Analytics providers</li>
              <li>Decentralized exchanges and DeFi protocols</li>
            </ul>
            <p className="mt-3">
              These third parties have their own privacy policies, and we encourage you to review them. 
              We are not responsible for the privacy practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Data Security</h2>
            <p>
              We implement commercially reasonable security measures to protect your information, including 
              encryption, access controls, and secure infrastructure. However, no method of electronic 
              transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Data Retention</h2>
            <p>
              We retain off-chain personal information only for as long as necessary to fulfill the purposes 
              outlined in this policy, unless a longer retention period is required by law. On-chain data 
              is permanently stored on the blockchain and cannot be deleted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your off-chain personal data.</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Data portability where technically feasible.</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at the address provided below. Note that these rights 
              do not extend to on-chain data, which is immutable by nature.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Children's Privacy</h2>
            <p>
              The Platform is not intended for individuals under the age of 18. We do not knowingly collect 
              personal information from minors. If you believe we have inadvertently collected information 
              from a minor, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of 
              residence. By using the Platform, you consent to such transfers. We will take reasonable 
              steps to ensure your data is treated securely and in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with 
              an updated "Last updated" date. Your continued use of the Platform after any changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">13. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please reach out through our 
              official channels:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Email: <a href="mailto:privacy@worldofunderva.org" className="text-primary hover:underline">privacy@worldofunderva.org</a></li>
              <li>Discord: <a href="https://discord.gg/worldofunderva" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">discord.gg/worldofunderva</a></li>
              <li>Telegram: <a href="https://t.me/worldofunderva" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">t.me/worldofunderva</a></li>
            </ul>
          </section>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto max-w-4xl px-6 flex items-center justify-between text-xs text-muted-foreground">
          <p>© 2025 World of Underva. All rights reserved.</p>
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
