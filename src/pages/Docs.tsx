import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, X, Home, ChevronRight, Shield, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DocSection {
  id: string;
  title: string;
  group: string;
}

const docSections: DocSection[] = [
  // SUMMARY
  { id: 'executive-summary', title: 'Executive Summary', group: 'SUMMARY' },
  { id: 'story-and-vision', title: 'The Story and Vision', group: 'SUMMARY' },
  // ECOSYSTEM
  { id: 'ecosystem-overview', title: 'Ecosystem Overview', group: 'ECOSYSTEM' },
  { id: 'three-pillars', title: 'The Three Pillars of Truth', group: 'ECOSYSTEM' },
  // TOKENOMICS
  { id: 'wou-token-overview', title: 'WOU Token Overview', group: 'TOKENOMICS' },
  { id: 'token-utility', title: 'Token Utility', group: 'TOKENOMICS' },
  // GOVERNANCE
  { id: 'governance', title: 'Governance through World of Underva', group: 'GOVERNANCE' },
  // TECHNICAL
  { id: 'technology-architecture', title: 'Technology & Architecture', group: 'TECHNICAL' },
  { id: 'roadmap', title: 'Roadmap', group: 'TECHNICAL' },
  // NFT COLLECTION
  { id: 'origin-sentinel', title: 'Origin Sentinel', group: 'NFT COLLECTION' },
  { id: 'standard-sentinel', title: 'Standard Sentinel', group: 'NFT COLLECTION' },
  // LEGAL
  { id: 'legal-succession', title: 'Legal & Succession Policy', group: 'LEGAL' },
  // SUPPORT
  { id: 'faq', title: 'FAQ', group: 'SUPPORT' },
  { id: 'support-channels', title: 'Support Channels', group: 'SUPPORT' },
];

// Group sections for sidebar
const groups = Array.from(new Set(docSections.map(s => s.group)));

function getSectionsByGroup(group: string) {
  return docSections.filter(s => s.group === group);
}

export default function DocsPage() {
  const { section: activeSection } = useParams();
  const currentSection = activeSection || 'executive-summary';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentDoc = docSections.find(s => s.id === currentSection) || docSections[0];

  const SidebarContent = () => (
    <nav className="space-y-6">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-2 px-3">
            {group}
          </h3>
          <ul className="space-y-0.5">
            {getSectionsByGroup(group).map((section) => (
              <li key={section.id}>
                <Link
                  to={`/docs/${section.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg transition-colors",
                    currentSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">WOU Docs</span>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 border-r border-border bg-card/30 overflow-y-auto p-4 scrollbar-hide">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-14 z-40"
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative w-64 h-full bg-card border-r border-border overflow-y-auto p-4 scrollbar-hide"
              >
                <SidebarContent />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-3.5rem)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
              <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{currentDoc.title}</span>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-2">
                {currentDoc.group}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                {currentDoc.title}
              </h1>
            </div>

            {/* Placeholder Content */}
            <div className="rounded-xl border border-border bg-card/50 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    The technical team is working on the information of this page.
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-3">
                    Check back soon for the complete documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
