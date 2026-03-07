import { useState, useMemo, lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, X, Home, ChevronRight, ChevronLeft, Shield, Search, FileText, Globe, Coins, Vote, Cpu, Image, Scale, HelpCircle, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

// Content components
import { DocExecutiveSummary } from '@/components/docs/DocExecutiveSummary';
import { DocStoryVision } from '@/components/docs/DocStoryVision';
import { DocEcosystemOverview } from '@/components/docs/DocEcosystemOverview';
import { DocThreePillars } from '@/components/docs/DocThreePillars';
import { DocTokenOverview } from '@/components/docs/DocTokenOverview';
import { DocTokenUtility } from '@/components/docs/DocTokenUtility';
import { DocGovernance } from '@/components/docs/DocGovernance';
import { DocTechArchitecture } from '@/components/docs/DocTechArchitecture';
import { DocRoadmap } from '@/components/docs/DocRoadmap';
import { DocOriginSentinel } from '@/components/docs/DocOriginSentinel';
import { DocStandardSentinel } from '@/components/docs/DocStandardSentinel';
import { DocLegalSuccession } from '@/components/docs/DocLegalSuccession';
import { DocFAQ } from '@/components/docs/DocFAQ';
import { DocSupportChannels } from '@/components/docs/DocSupportChannels';

interface DocSection {
  id: string;
  title: string;
  group: string;
}

const groupIcons: Record<string, typeof FileText> = {
  'SUMMARY': FileText,
  'ECOSYSTEM': Globe,
  'TOKENOMICS': Coins,
  'GOVERNANCE': Vote,
  'TECHNICAL': Cpu,
  'NFT COLLECTION': Image,
  'LEGAL': Scale,
  'SUPPORT': HelpCircle,
};

const docSections: DocSection[] = [
  { id: 'executive-summary', title: 'Executive Summary', group: 'SUMMARY' },
  { id: 'story-and-vision', title: 'The Story and Vision', group: 'SUMMARY' },
  { id: 'ecosystem-overview', title: 'Ecosystem Overview', group: 'ECOSYSTEM' },
  { id: 'three-pillars', title: 'The Three Pillars of Truth', group: 'ECOSYSTEM' },
  { id: 'wou-token-overview', title: 'WOU Token Overview', group: 'TOKENOMICS' },
  { id: 'token-utility', title: 'Token Utility', group: 'TOKENOMICS' },
  { id: 'governance', title: 'Governance through World of Underva', group: 'GOVERNANCE' },
  { id: 'technology-architecture', title: 'Technology & Architecture', group: 'TECHNICAL' },
  { id: 'roadmap', title: 'Roadmap', group: 'TECHNICAL' },
  { id: 'origin-sentinel', title: 'Origin Sentinel', group: 'NFT COLLECTION' },
  { id: 'standard-sentinel', title: 'Standard Sentinel', group: 'NFT COLLECTION' },
  { id: 'legal-succession', title: 'Legal & Succession Policy', group: 'LEGAL' },
  { id: 'faq', title: 'FAQ', group: 'SUPPORT' },
  { id: 'support-channels', title: 'Support Channels', group: 'SUPPORT' },
];

const groups = Array.from(new Set(docSections.map(s => s.group)));

function getSectionsByGroup(group: string) {
  return docSections.filter(s => s.group === group);
}

const sectionContentMap: Record<string, React.ComponentType> = {
  'executive-summary': DocExecutiveSummary,
  'story-and-vision': DocStoryVision,
  'ecosystem-overview': DocEcosystemOverview,
  'three-pillars': DocThreePillars,
  'wou-token-overview': DocTokenOverview,
  'token-utility': DocTokenUtility,
  'governance': DocGovernance,
  'technology-architecture': DocTechArchitecture,
  'roadmap': DocRoadmap,
  'origin-sentinel': DocOriginSentinel,
  'standard-sentinel': DocStandardSentinel,
  'legal-succession': DocLegalSuccession,
  'faq': DocFAQ,
  'support-channels': DocSupportChannels,
};

export default function DocsPage() {
  const { section: activeSection } = useParams();
  const currentSection = activeSection || 'executive-summary';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentDoc = docSections.find(s => s.id === currentSection) || docSections[0];
  const currentIndex = docSections.findIndex(s => s.id === currentSection);
  const prevDoc = currentIndex > 0 ? docSections[currentIndex - 1] : null;
  const nextDoc = currentIndex < docSections.length - 1 ? docSections[currentIndex + 1] : null;

  const ContentComponent = sectionContentMap[currentSection] || null;

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    return groups.filter(group =>
      getSectionsByGroup(group).some(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const filterSections = (group: string) => {
    const sections = getSectionsByGroup(group);
    if (!searchQuery.trim()) return sections;
    return sections.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className="space-y-5" aria-label="Documentation navigation">
      {filteredGroups.map((group) => {
        const sections = filterSections(group);
        if (sections.length === 0) return null;
        const GroupIcon = groupIcons[group] || FileText;
        return (
          <div key={group}>
            <h3 className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-2 px-3">
              <GroupIcon className="h-3.5 w-3.5 text-primary/70" />
              {group}
            </h3>
            {isMobile ? (
              <div className="relative ml-[1.1rem] pl-4 border-l border-primary/15">
                <ul className="space-y-0.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        to={`/docs/${section.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-xl transition-colors",
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
            ) : (
              <ul className="space-y-0.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      to={`/docs/${section.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-xl transition-colors",
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
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/90 backdrop-blur-xl">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
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

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-secondary/50 border-primary/10 text-sm rounded-xl"
                aria-label="Search documentation"
              />
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-primary/10 rounded-xl transition-colors hover:bg-secondary/50"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Desktop Sidebar */}
        <AnimatePresence initial={false}>
          {!sidebarCollapsed && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block fixed top-14 left-0 bottom-0 border-r border-primary/10 bg-card/30 overflow-y-auto overflow-x-hidden p-4 docs-scrollbar"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground">Navigation</span>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          )}
        </AnimatePresence>

        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="hidden lg:flex fixed top-[4.5rem] left-4 z-30 items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-primary/10 rounded-xl bg-card/80 backdrop-blur-sm hover:bg-secondary/50 transition-colors"
          >
            <PanelLeft className="h-4 w-4" />
            <span>Menu</span>
          </button>
        )}

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-[55] bg-background/60 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="lg:hidden fixed inset-y-0 left-0 z-[60] w-[80%] max-w-sm bg-background border-r border-primary/10"
              >
                <div className="sticky top-0 z-10 bg-background border-b border-primary/10 px-5 py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold">WOU Docs</span>
                    </div>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-center h-9 w-9 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search docs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-10 bg-secondary/50 border-primary/10 text-sm rounded-xl"
                      aria-label="Search documentation"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-120px)] px-5 py-6 docs-scrollbar">
                  <SidebarContent isMobile={true} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-3.5rem)] transition-all duration-200",
          !sidebarCollapsed ? "lg:ml-64" : "lg:ml-0"
        )}>
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-14">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span className="text-muted-foreground">{currentDoc.group}</span>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span className="text-foreground font-medium">{currentDoc.title}</span>
            </nav>

            {/* Page Title */}
            <div className="mb-10">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-2">
                {currentDoc.group}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                {currentDoc.title}
              </h1>
            </div>

            {/* Dynamic Content */}
            {ContentComponent ? (
              <ContentComponent />
            ) : (
              <div className="rounded-xl border border-primary/10 bg-card/50 p-6 sm:p-8">
                <p className="text-sm text-muted-foreground">Content coming soon.</p>
              </div>
            )}

            {/* Divider before pagination */}
            <div className="border-t border-primary/10 mt-12" />

            {/* Pagination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {prevDoc ? (
                <Link
                  to={`/docs/${prevDoc.id}`}
                  className="group rounded-xl border border-primary/10 bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all p-5 sm:p-6"
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="uppercase tracking-wider font-medium">Previous</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-foreground">{prevDoc.title}</p>
                </Link>
              ) : <div />}
              {nextDoc ? (
                <Link
                  to={`/docs/${nextDoc.id}`}
                  className="group rounded-xl border border-primary/10 bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all p-5 sm:p-6 text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mb-2">
                    <span className="uppercase tracking-wider font-medium">Next</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-foreground">{nextDoc.title}</p>
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
