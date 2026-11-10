import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  Star,
  BookOpen,
  Download,
  Share2,
  Bookmark,
  Clock,
  Sparkles,
  Smartphone,
  Maximize2,
  X,
  FileText,
  CheckCircle2,
  Compass,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Code,
  Calculator,
  History as HistoryIcon,
  Atom,
  FlaskConical,
  BookMarked,
  Check
} from 'lucide-react';

// Sample Data derived from design + realistic details
const CATEGORIES_DATA = [
  { id: 'prog', name: 'Programming', icon: Code, count: 42, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'math', name: 'Mathematics', icon: Calculator, count: 28, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'hist', name: 'History', icon: HistoryIcon, count: 19, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'phys', name: 'Physics', icon: Atom, count: 31, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'chem', name: 'Chemistry', icon: FlaskConical, count: 24, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'lit', name: 'Literature', icon: BookMarked, count: 37, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
];

const ALL_BOOKS = [
  {
    id: 'b1',
    title: 'Python Programming',
    subtitle: 'For Beginners & Practice Guide',
    author: 'Victor Moses',
    category: 'Programming',
    rating: 2.8,
    reviews: 142,
    size: '9.9MB',
    pages: 320,
    format: 'PDF / EPUB',
    publishYear: '2024',
    recent: true,
    popular: true,
    coverBg: 'from-blue-700 via-indigo-800 to-slate-900',
    coverPattern: 'python',
    description: 'Master Python fundamentals from scratch. Covers variables, data structures, object-oriented design, and hands-on mini-projects for aspiring developers.',
  },
  {
    id: 'b2',
    title: 'ChatGPT for Beginners',
    subtitle: 'Prompt Engineering Made Easy',
    author: 'Victor Moses',
    category: 'Programming',
    rating: 4.3,
    reviews: 512,
    size: '9.9MB',
    pages: 240,
    format: 'PDF',
    publishYear: '2024',
    recent: false,
    popular: true,
    coverBg: 'from-purple-600 via-indigo-700 to-blue-900',
    coverPattern: 'ai',
    description: 'Unlock the power of conversational AI. Learn structure, context techniques, advanced workflows, and real-world practical use cases.',
  },
  {
    id: 'b3',
    title: 'Full Stack Development',
    subtitle: 'With Spring Boot 3 & React',
    author: 'Victor Moses',
    category: 'Programming',
    rating: 4.3,
    reviews: 890,
    size: '6.8MB',
    pages: 580,
    format: 'PDF / Code Samples',
    publishYear: '2023',
    recent: false,
    popular: true,
    coverBg: 'from-slate-900 via-teal-900 to-emerald-900',
    coverPattern: 'web',
    description: 'Complete roadmap to constructing robust enterprise apps with modern backend REST services and sleek React user interfaces.',
  },
  {
    id: 'b4',
    title: 'React Key Concepts',
    subtitle: 'Consolidate Core Fundamentals',
    author: 'Victor Moses',
    category: 'Programming',
    rating: 4.3,
    reviews: 320,
    size: '6.8MB',
    pages: 290,
    format: 'PDF',
    publishYear: '2024',
    recent: false,
    popular: false,
    coverBg: 'from-neutral-900 via-zinc-800 to-cyan-950',
    coverPattern: 'react',
    description: 'Deep dive into virtual DOM, custom hooks, context state management, render optimizations, and architecture patterns.',
  },
  {
    id: 'b5',
    title: 'React Next.js',
    subtitle: 'Production Ready Web Apps',
    author: 'Victor Moses',
    category: 'Programming',
    rating: 4.3,
    reviews: 405,
    size: '6.8MB',
    pages: 360,
    format: 'PDF / EPUB',
    publishYear: '2024',
    recent: false,
    popular: true,
    coverBg: 'from-black via-zinc-900 to-slate-800',
    coverPattern: 'next',
    description: 'Master App Router, Server Components, SSR caching strategies, dynamic API routes, and deployment best practices.',
  },
  {
    id: 'b6',
    title: 'Chemistry',
    subtitle: 'Made Easy & Visual Concepts',
    author: 'Victor Moses',
    category: 'Chemistry',
    rating: 4.3,
    reviews: 210,
    size: '8.4MB',
    pages: 410,
    format: 'PDF',
    publishYear: '2023',
    recent: true,
    popular: false,
    coverBg: 'from-amber-500 via-orange-600 to-red-700',
    coverPattern: 'atom',
    description: 'Comprehensive guide covering atomic structure, chemical reactions, thermodynamics, organic compounds, and lab protocols.',
  },
  {
    id: 'b7',
    title: 'World History: Modern Era',
    subtitle: 'Revolutions & Global Shift',
    author: 'Victor Moses',
    category: 'History',
    rating: 4.3,
    reviews: 184,
    size: '12.1MB',
    pages: 512,
    format: 'PDF',
    publishYear: '2023',
    recent: true,
    popular: false,
    coverBg: 'from-amber-900 via-yellow-900 to-stone-900',
    coverPattern: 'history',
    description: 'An engaging chronicle of major world powers, global industrial transformations, political revolutions, and post-war history.',
  },
  {
    id: 'b8',
    title: 'Quantum Physics Fundamentals',
    subtitle: 'Particles & Wave Mechanics',
    author: 'Dr. Sarah Lin',
    category: 'Physics',
    rating: 4.7,
    reviews: 670,
    size: '11.5MB',
    pages: 430,
    format: 'PDF',
    publishYear: '2024',
    recent: false,
    popular: true,
    coverBg: 'from-blue-900 via-indigo-950 to-purple-900',
    coverPattern: 'quantum',
    description: 'Demystifying the quantum realm. Standard formulation, wave-particle duality, matrices, and quantum computing foundations.',
  },
];

// Helper visual for SVG Cover simulation
function BookCover({ title, category, coverBg, rating }) {
  return (
    <div className={`w-16 h-20 sm:w-20 sm:h-24 rounded-lg bg-gradient-to-br ${coverBg} flex flex-col justify-between p-2 shadow-md shrink-0 relative overflow-hidden border border-white/20`}>
      <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full blur-xl -mr-4 -mt-4"></div>
      <div className="flex justify-between items-start z-10">
        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-black/40 px-1 py-0.5 rounded backdrop-blur-xs max-w-[80%] truncate">
          {category}
        </span>
      </div>
      <div className="z-10 my-auto">
        <p className="text-[10px] sm:text-[11px] font-extrabold text-white leading-tight line-clamp-2 drop-shadow">
          {title}
        </p>
      </div>
      <div className="flex items-center justify-between z-10 text-[8px] text-zinc-300 pt-1 border-t border-white/10">
        <span>Book</span>
        <span className="flex items-center text-amber-400 font-semibold">
          ★ {rating}
        </span>
      </div>
    </div>
  );
}

// Modal Component for Book Detail View
function BookDetailModal({ book, onClose, onBookmark, isBookmarked }) {
  const [downloaded, setDownloaded] = useState(false);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-emerald-500/20">
        {/* Top bar control */}
        <div className="relative h-44 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center z-10">
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => onBookmark(book.id)}
                className={`w-9 h-9 rounded-full ${isBookmarked ? 'bg-amber-500 text-white' : 'bg-black/20 text-white'} hover:bg-black/40 flex items-center justify-center backdrop-blur-md transition-all`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
              <button className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-md transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-end space-x-4 z-10 translate-y-8">
            <BookCover title={book.title} category={book.category} coverBg={book.coverBg} rating={book.rating} />
            <div className="text-white pb-2">
              <span className="text-xs bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-medium">
                {book.category}
              </span>
              <h2 className="text-xl font-bold leading-tight mt-1 text-white drop-shadow-sm">{book.title}</h2>
              <p className="text-xs text-emerald-100 opacity-90">By {book.author}</p>
            </div>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="pt-10 p-6 overflow-y-auto flex-1 space-y-5">
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center">
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400">Rating</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {book.rating}
              </p>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <p className="text-[10px] uppercase font-semibold text-slate-400">File Size</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{book.size}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400">Pages</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{book.pages}</p>
            </div>
          </div>

          {/* Subtitle & Format */}
          <div>
            <h4 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Overview</h4>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{book.subtitle}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* File details list */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Document Metadata</h4>
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{book.format}</span>
              </div>
              <div className="flex justify-between">
                <span>Published:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{book.publishYear}</span>
              </div>
              <div className="flex justify-between">
                <span>License:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Open Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-3">
          <button 
            onClick={() => setDownloaded(true)}
            disabled={downloaded}
            className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              downloaded 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Downloaded ({book.size})
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Resource
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Screen State Navigation: 'home' | 'programming'
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Programming');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeBookModal, setActiveBookModal] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(['b2', 'b4']);
  const [ratingFilter, setRatingFilter] = useState('all'); // 'all', '4+', '3+'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle bookmarks
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered resources list for Programming Resources view
  const programmingBooks = useMemo(() => {
    return ALL_BOOKS.filter(book => {
      const matchesCategory = book.category === selectedCategory || selectedCategory === 'All';
      const matchesQuery = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesRating = true;
      if (ratingFilter === '4+') matchesRating = book.rating >= 4.0;
      if (ratingFilter === '3+') matchesRating = book.rating >= 3.0;

      return matchesCategory && matchesQuery && matchesRating;
    });
  }, [selectedCategory, searchQuery, ratingFilter]);

  // General search results
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ALL_BOOKS.filter(b => 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const navigateToCategory = (catName) => {
    setSelectedCategory(catName);
    setCurrentScreen('programming');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'} font-sans flex flex-col items-center justify-center p-0 md:p-6 transition-colors duration-200`}>
      
      {/* Top Controls Bar for presentation toggle */}
      <div className="hidden md:flex items-center justify-between w-full max-w-4xl mb-4 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-900 dark:text-white">Digital Library Hub UI</h1>
            <p className="text-xs text-slate-500">Interactive prototype with accurate screen layout & fixes</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isPhoneFrame 
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' 
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {isPhoneFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isPhoneFrame ? 'Mobile Frame' : 'Full Width'}
          </button>
        </div>
      </div>

      {/* Main Container - Framed Mobile Shell or Full Width */}
      <div className={`w-full transition-all duration-300 ${
        isPhoneFrame 
          ? 'max-w-[412px] h-[860px] rounded-[48px] ring-[14px] ring-slate-900 dark:ring-slate-800 shadow-2xl overflow-hidden relative border-4 border-slate-700/30' 
          : 'max-w-md min-h-screen sm:min-h-[800px] sm:rounded-3xl shadow-xl overflow-hidden'
      } bg-white dark:bg-slate-900 flex flex-col`}>

        {/* Simulated iOS Dynamic Island / Status Bar */}
        <div className="w-full bg-white dark:bg-slate-900 pt-3 px-7 flex justify-between items-center text-xs font-semibold z-40 select-none">
          <span className="text-slate-900 dark:text-slate-100">9:41</span>
          
          {/* Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-900/80 border border-blue-400/40"></div>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-200">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
              <div className="h-full w-3 bg-current rounded-xs"></div>
            </div>
          </div>
        </div>

        {/* Global Search Popup Banner if triggered */}
        {showSearchModal && (
          <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 z-50 absolute inset-0 flex flex-col animate-in fade-in duration-150">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Search className="w-5 h-5 text-emerald-400" />
              <input
                type="text"
                placeholder="Search programming, math, history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-sm w-full outline-none text-white placeholder-slate-400"
              />
              <button 
                onClick={() => { setShowSearchModal(false); setSearchQuery(''); }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Search Results</p>
              {globalSearchResults.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  {searchQuery ? 'No matching resources found' : 'Type to search across library items...'}
                </div>
              ) : (
                globalSearchResults.map(book => (
                  <div 
                    key={book.id}
                    onClick={() => {
                      setActiveBookModal(book);
                      setShowSearchModal(false);
                    }}
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors border border-slate-700/50"
                  >
                    <BookCover title={book.title} category={book.category} coverBg={book.coverBg} rating={book.rating} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{book.title}</p>
                      <p className="text-xs text-slate-400">By {book.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded font-medium border border-emerald-800">
                          {book.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{book.size}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SCREEN 1: LIBRARY HOME VIEW */}
        {currentScreen === 'home' && (
          <div className="flex-1 overflow-y-auto pb-16 flex flex-col">
            {/* Header */}
            <div className="px-5 pt-4 pb-2 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-30">
              <div className="flex items-center space-x-1 cursor-pointer">
                <ChevronLeft className="w-5 h-5 text-slate-800 dark:text-slate-100" />
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Library</h1>
              </div>

              <button 
                onClick={() => setShowSearchModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 transition-all active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Categories Section */}
            <div className="px-5 mt-3">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES_DATA.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => navigateToCategory(cat.name)}
                      className="bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all cursor-pointer flex items-center space-x-3 group active:scale-[0.98]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block truncate">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {cat.count} files
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recently Viewed Section */}
            <div className="px-5 mt-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Recently Viewed</h2>
                <button 
                  onClick={() => navigateToCategory('All')}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  See all
                </button>
              </div>

              <div className="space-y-3">
                {ALL_BOOKS.filter(b => b.recent).map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setActiveBookModal(book)}
                    className="bg-white dark:bg-slate-800/90 rounded-2xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center space-x-3 group relative overflow-hidden"
                  >
                    <BookCover title={book.title} category={book.category} coverBg={book.coverBg} rating={book.rating} />

                    <div className="flex-1 min-w-0 py-0.5">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        By {book.author}
                      </p>

                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                          <span>{book.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-slate-400 text-[11px] font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700/60 shrink-0 self-center">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      <span>Recent</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Resources Carousel Preview */}
            <div className="px-5 mt-6 mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Popular Resources</h2>
                </div>
              </div>

              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
                {ALL_BOOKS.filter(b => b.popular).map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setActiveBookModal(book)}
                    className="w-36 shrink-0 bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:border-emerald-300 transition-all"
                  >
                    <div className="h-28 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-2.5 flex flex-col justify-between text-white relative overflow-hidden mb-2">
                      <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded w-fit">
                        {book.category}
                      </span>
                      <p className="text-xs font-extrabold line-clamp-2 leading-tight">{book.title}</p>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{book.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">By {book.author}</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                      <span className="flex items-center text-amber-500 font-bold">★ {book.rating}</span>
                      <span>{book.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: PROGRAMMING RESOURCES (CATEGORY DETAIL VIEW) */}
        {currentScreen === 'programming' && (
          <div className="flex-1 overflow-y-auto pb-16 flex flex-col">
            {/* Header */}
            <div className="px-5 pt-4 pb-3 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-30 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="flex items-center space-x-1 text-slate-800 dark:text-slate-100 hover:text-emerald-600 transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {selectedCategory} Resources
                  </h1>
                </button>

                {/* Filter Trigger Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                      ratingFilter !== 'all' 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30'
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter</span>
                  </button>

                  {/* Rating Dropdown Menu */}
                  {showFilterDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 text-xs">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-700/60">
                        Rating Filter
                      </div>
                      <button
                        onClick={() => { setRatingFilter('all'); setShowFilterDropdown(false); }}
                        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                      >
                        <span>All Ratings</span>
                        {ratingFilter === 'all' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </button>
                      <button
                        onClick={() => { setRatingFilter('4+'); setShowFilterDropdown(false); }}
                        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                      >
                        <span className="flex items-center">★ 4.0 & above</span>
                        {ratingFilter === '4+' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </button>
                      <button
                        onClick={() => { setRatingFilter('3+'); setShowFilterDropdown(false); }}
                        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                      >
                        <span className="flex items-center">★ 3.0 & above</span>
                        {ratingFilter === '3+' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-header status & Category Selector Pills */}
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-xs text-slate-400 font-medium">
                  {programmingBooks.length} resources found
                </span>
                
                {ratingFilter !== 'all' && (
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                    Filter: {ratingFilter} Stars
                  </span>
                )}
              </div>

              {/* Category Quick Tabs */}
              <div className="flex space-x-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                {['Programming', 'Mathematics', 'History', 'Physics', 'Chemistry', 'All'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources List (Matching exact screenshot items & typos fixed) */}
            <div className="px-5 mt-4 space-y-3.5">
              {programmingBooks.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                  <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No resources matched</p>
                  <p className="text-xs text-slate-400 mt-1">Try selecting a different filter or category</p>
                  <button 
                    onClick={() => { setRatingFilter('all'); setSelectedCategory('Programming'); setSearchQuery(''); }}
                    className="mt-3 text-xs text-emerald-600 font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                programmingBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setActiveBookModal(book)}
                    className="bg-white dark:bg-slate-800/90 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-md transition-all cursor-pointer flex items-center space-x-3.5 group relative"
                  >
                    <BookCover title={book.title} category={book.category} coverBg={book.coverBg} rating={book.rating} />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        By {book.author}
                      </p>

                      <div className="flex items-center space-x-1 mt-2">
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                          <span>{book.rating}</span>
                        </div>
                        <span className="text-slate-300 text-xs">•</span>
                        <span className="text-[11px] text-slate-400">{book.reviews} reviews</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 self-start pt-1">
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-400 block">
                        {book.size}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(book.id);
                        }}
                        className="mt-3 text-slate-300 hover:text-amber-500 transition-colors"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(book.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Global Bottom Navigation Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800/80 px-8 py-2.5 flex justify-between items-center z-40">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              currentScreen === 'home' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-bold">Library</span>
          </button>

          <button
            onClick={() => navigateToCategory('Programming')}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              currentScreen === 'programming' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-bold">Resources</span>
          </button>

          <button
            onClick={() => setShowSearchModal(true)}
            className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-bold">Search</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentScreen('programming');
            }}
            className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors relative"
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] font-bold">Saved</span>
            {bookmarkedIds.length > 0 && (
              <span className="absolute -top-1 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Detail Modal Overlay */}
        {activeBookModal && (
          <BookDetailModal
            book={activeBookModal}
            onClose={() => setActiveBookModal(null)}
            onBookmark={toggleBookmark}
            isBookmarked={bookmarkedIds.includes(activeBookModal.id)}
          />
        )}
      </div>
    </div>
  );
}



