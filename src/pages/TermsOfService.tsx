import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: March 9, 2025</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the World of Underva website at worldofunderva.org and any related services,
              applications, smart contracts, or decentralized applications (collectively, the "Platform"), you agree
              to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Eligibility</h2>
            <p>
              You must be at least 18 years of age to use the Platform. By using the Platform, you represent and
              warrant that you are of legal age in your jurisdiction and have the legal capacity to enter into
              these Terms. You further represent that you are not located in, or a citizen or resident of, any
              jurisdiction where use of the Platform or digital assets is prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Description of Services</h2>
            <p className="mb-3">
              World of Underva is an institutional-grade Real-World Asset (RWA) tokenization ecosystem operating
              on Ethereum L1 and Base L2. The Platform provides:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The $WOU utility and governance token.</li>
              <li>Sentinel NFT minting and management.</li>
              <li>Governance participation mechanisms.</li>
              <li>Bridge functionality between Ethereum L1 and Base L2.</li>
              <li>Documentation and educational resources about the ecosystem.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Wallet Connection & Responsibility</h2>
            <p>
              To interact with certain features of the Platform, you must connect a compatible cryptocurrency wallet.
              You are solely responsible for maintaining the security of your wallet, private keys, and seed phrases.
              We will never ask for your private keys. Any transactions you authorize through your wallet are
              irreversible and your sole responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Token & NFT Disclaimer</h2>
            <p>
              The $WOU token and Sentinel NFTs are digital assets on public blockchains. They are not securities,
              investments, or financial instruments. Nothing on the Platform constitutes financial, investment, legal,
              or tax advice. The value of digital assets is highly volatile and may fluctuate significantly. You should
              conduct your own research and consult with qualified professionals before making any decisions related
              to digital assets.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Smart Contract Risks</h2>
            <p>
              The Platform relies on smart contracts deployed on Ethereum L1 and Base L2. While we strive to ensure
              the security and reliability of our smart contracts through audits and testing, smart contracts may contain
              bugs, vulnerabilities, or behave unexpectedly. You acknowledge and accept the inherent risks of interacting
              with smart contracts, including but not limited to loss of funds, failed transactions, and network congestion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Prohibited Conduct</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the Platform for any unlawful purpose or in violation of any applicable laws or regulations.</li>
              <li>Attempt to exploit, hack, or interfere with the Platform's smart contracts, infrastructure, or services.</li>
              <li>Engage in market manipulation, wash trading, or fraudulent activities involving $WOU or Sentinel NFTs.</li>
              <li>Use automated bots, scripts, or tools to gain unfair advantages or disrupt the Platform.</li>
              <li>Impersonate any person, entity, or falsely represent your affiliation with World of Underva.</li>
              <li>Circumvent geographic restrictions, sanctions, or access controls.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Intellectual Property</h2>
            <p>
              All content on the Platform, including but not limited to text, graphics, logos, designs, code, and
              documentation, is the property of World of Underva or its licensors and is protected by intellectual
              property laws. You may not reproduce, distribute, modify, or create derivative works without our
              prior written consent, except as expressly permitted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Governance Participation</h2>
            <p>
              Certain features of the Platform may allow token holders to participate in governance decisions.
              Governance votes and proposals are advisory in nature unless otherwise specified. We reserve the right
              to implement or decline governance proposals at our discretion, taking into account legal, technical,
              and operational considerations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, World of Underva and its team members, advisors, and affiliates
              shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including
              but not limited to loss of profits, data, funds, or digital assets, arising out of or related to your
              use of the Platform, smart contracts, or digital assets, regardless of the cause of action or theory of liability.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Disclaimer of Warranties</h2>
            <p>
              The Platform and all associated services are provided "as is" and "as available" without warranties of
              any kind, whether express or implied. We do not guarantee that the Platform will be uninterrupted,
              error-free, secure, or free from viruses or other harmful components. Your use of the Platform is
              at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless World of Underva, its team members, advisors, and affiliates
              from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or
              related to your use of the Platform, violation of these Terms, or infringement of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">13. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an
              updated "Last updated" date. Your continued use of the Platform after any modifications constitutes
              acceptance of the revised Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
              shall continue in full force and effect. The invalid or unenforceable provision shall be modified
              to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard
              to conflict of law principles. Any disputes arising under these Terms shall be resolved through
              good-faith negotiation, and if necessary, binding arbitration in a mutually agreed jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">16. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please reach out through our official channels:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Email: <a href="mailto:legal@worldofunderva.org" className="text-primary hover:underline">legal@worldofunderva.org</a></li>
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

export default TermsOfService;
