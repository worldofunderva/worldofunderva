import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Menu, X, Home, ChevronRight, ChevronLeft, Shield, BookOpen, Search, FileText, Globe, Coins, Vote, Cpu, Image, Scale, HelpCircle, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export default function DocsPage() {
  const { section: activeSection } = useParams();
  const navigate = useNavigate();
  const currentSection = activeSection || 'executive-summary';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentDoc = docSections.find(s => s.id === currentSection) || docSections[0];
  const currentIndex = docSections.findIndex(s => s.id === currentSection);
  const prevDoc = currentIndex > 0 ? docSections[currentIndex - 1] : null;
  const nextDoc = currentIndex < docSections.length - 1 ? docSections[currentIndex + 1] : null;

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

  const SidebarContent = () => (
    <nav className="space-y-5">
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
            <ul className="space-y-0.5">
              {sections.map((section) => (
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
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-3">
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

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-secondary/50 border-border text-sm"
              />
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-full transition-colors hover:bg-secondary/50"
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
              className="hidden lg:block fixed top-14 left-0 bottom-0 border-r border-border bg-card/30 overflow-y-auto overflow-x-hidden p-4 docs-scrollbar"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground">Navigation</span>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar collapsed toggle */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="hidden lg:flex fixed top-18 left-4 z-30 items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg bg-card/80 backdrop-blur-sm hover:bg-secondary/50 transition-colors"
          >
            <PanelLeft className="h-4 w-4" />
            <span>Menu</span>
          </button>
        )}

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
                className="relative w-64 h-full bg-card border-r border-border overflow-y-auto p-4 docs-scrollbar"
              >
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 bg-secondary/50 border-border text-sm"
                  />
                </div>
                <SidebarContent />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-3.5rem)] transition-all duration-200",
          !sidebarCollapsed ? "lg:ml-64" : "lg:ml-0"
        )}>
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-14">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
              <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-muted-foreground">{currentDoc.group}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{currentDoc.title}</span>
            </div>

            {/* Page Title */}
            <div className="mb-10">
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
                    The technical team is working on the information for this page.
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-3">
                    Check back soon for the complete documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              {prevDoc ? (
                <Link
                  to={`/docs/${prevDoc.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Previous</p>
                    <p className="font-medium">{prevDoc.title}</p>
                  </div>
                </Link>
              ) : <div />}
              {nextDoc ? (
                <Link
                  to={`/docs/${nextDoc.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group text-right"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Next</p>
                    <p className="font-medium">{nextDoc.title}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
