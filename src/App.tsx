import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Lock, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PeekPhotos } from './components/PeekPhotos';

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

const PRINCIPLES = [
  {
    num: '01',
    title: 'Start with the decision, not the interface.',
    desc: "The hardest part of product design isn't choosing a layout. It's identifying the decision that moves the product forward.",
  },
  {
    num: '02',
    title: 'Build systems, not pages.',
    desc: 'Good products scale because the thinking behind them scales.',
  },
  {
    num: '03',
    title: 'Measure success by outcomes.',
    desc: 'Every decision should improve something measurable, for users, the business, or the team building the product.',
  },
];

const PRACTICES = [
  {
    num: '01.',
    title: '0→1 Product Design',
    project: 'Youtopia',
    link: 'case-study.html?project=youtopia',
    external: false,
    desc: 'From first concept to a shippable, scalable system.',
  },
  {
    num: '02.',
    title: 'AI Product Design',
    project: 'Youtopia',
    link: 'case-study.html?project=youtopia',
    external: false,
    desc: 'Designing where automation leads and where humans stay in control.',
  },
  {
    num: '03.',
    title: 'VR / Emerging Interfaces',
    project: 'REVLR',
    link: 'case-study.html?project=revlr',
    external: false,
    desc: 'Building interaction models where no conventions exist yet.',
  },
  {
    num: '04.',
    title: 'Design Systems',
    project: 'Justickets',
    link: 'case-study.html?project=justickets',
    external: false,
    desc: 'Building components that hold up under real production constraints.',
  },
  {
    num: '05.',
    title: 'Accessibility Research',
    project: 'REVLR',
    link: 'case-study.html?project=revlr',
    external: false,
    desc: 'Designing and testing with accessibility as a starting constraint.',
  },
  {
    num: '06.',
    title: 'Civic Technology',
    project: 'My Block Counts',
    link: 'case-study.html?project=myblockcounts',
    external: false,
    desc: 'Turning dense public data into something a resident can actually use.',
  },
  {
    num: '07.',
    title: 'Course Design',
    project: 'Outcome School',
    link: 'https://www.outcomeschool.org/uiux-design',
    external: true,
    desc: 'Turning practiced design judgment into teachable curriculum.',
  },
];

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [resumeOpen, setResumeOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('case-studies-nav');
      if (nav && !nav.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile hamburger menu when clicking/tapping outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const header = document.getElementById('main-navigation-header');
      if (header && !header.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  // Handle URL hash navigation (e.g. returning from case studies page)
  useEffect(() => {
    const handleHashNav = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'resume') {
        window.open('https://drive.google.com/file/d/13F5AWdAowd_L5jzegAMzhspee3-vKIRM/view', '_blank', 'noopener,noreferrer');
      } else if (hash) {
        setActiveTab(hash);
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashNav();
    window.addEventListener('hashchange', handleHashNav);
    return () => window.removeEventListener('hashchange', handleHashNav);
  }, []);

  // Active section scroll observer for sticky navigation
  useEffect(() => {
    const sections = ['work', 'about', 'contact'];
    let ticking = false;

    const updateActiveTab = () => {
      ticking = false;
      const scrollPos = window.scrollY + 200;
      let current = '';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = id;
          }
        }
      }
      setActiveTab(current);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveTab);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: string, e: React.MouseEvent) => {
    if (tab === 'resume') {
      return;
    }
    e.preventDefault();
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);

    if (tab === 'top' || tab === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(tab);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileNavClick = (tab: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    handleNavClick(tab, e);
  };

  return (
    <div className="min-h-screen w-full relative bg-[#3275b4] text-white selection:bg-[#FFD025] selection:text-black overflow-x-clip">
      {/* Tactile Noise Texture Overlay covering the entire page */}
      <div 
        id="page-noise-layer"
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.14] mix-blend-overlay select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"), url('/noise.png')`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* Navigation Header */}
      <motion.header
        id="main-navigation-header"
        initial={shouldReduceMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
        className="sticky top-0 z-50 w-full bg-[#3275b4]/85 backdrop-blur-md border-b border-white/20 px-5 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-5 transition-colors"
      >
        <nav className="mx-auto max-w-[1300px] w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (window.location.hash) {
                window.history.pushState('', document.title, window.location.pathname + window.location.search);
              }
            }}
            className="flex items-center text-white hover:text-[#FFD025] transition-colors shrink-0"
            aria-label="Home"
          >
            <svg
              viewBox="0 0 1562 1627"
              fill="none"
              stroke="currentColor"
              className="h-7 w-auto shrink-0"
              aria-hidden="true"
            >
              <path
                d="M750.96 943.507L1237.42 1327.32L1032.02 1559.19L77.7012 771.093L732.33 46.8096L1124.09 46.8086L713.221 519.729"
                strokeWidth="134.7"
                strokeMiterlimit="10"
              />
              <path
                d="M732.33 46.8089L1124.09 46.8079C1125.05 46.5059 1180.99 43.4059 1189.94 43.7979C1282.57 47.8479 1445.55 86.7719 1495.31 299.955C1565.49 600.662 1309.7 741.189 1309.7 741.189C1309.7 741.189 1247.5 766.919 1187.72 770.91C1127.94 774.901 77.7012 771.092 77.7012 771.092"
                strokeWidth="104.7"
                strokeMiterlimit="10"
              />
            </svg>
          </a>

          {/* Desktop Navigation Links (Visible on md and up) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-11">
            <a
              href="#work"
              onClick={(e) => handleNavClick('work', e)}
              className={`text-[14px] md:text-[15px] transition-colors whitespace-nowrap ${activeTab === 'work' ? 'text-[#FFD025] font-bold' : 'text-white hover:text-[#FFD025]'}`}
            >
              Work
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick('about', e)}
              className={`text-[14px] md:text-[15px] transition-colors whitespace-nowrap ${activeTab === 'about' ? 'text-[#FFD025] font-bold' : 'text-white hover:text-[#FFD025]'}`}
            >
              About
            </a>

            <a
              href="https://drive.google.com/file/d/13F5AWdAowd_L5jzegAMzhspee3-vKIRM/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] md:text-[15px] text-white hover:text-[#FFD025] transition-colors whitespace-nowrap font-medium"
            >
              Resume
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick('contact', e)}
              className={`text-[14px] md:text-[15px] transition-colors whitespace-nowrap ${activeTab === 'contact' ? 'text-[#FFD025] font-bold' : 'text-white hover:text-[#FFD025]'}`}
            >
              Contact
            </a>

            {/* Case Studies Dropdown */}
            <div className="relative shrink-0" id="case-studies-nav">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-[14px] md:text-[15px] text-white hover:text-[#FFD025] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                <span>Case studies</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="cs-dropdown open animate-in fade-in slide-in-from-top-2 duration-150 whitespace-nowrap right-0">
                  <a href="case-study.html?project=youtopia" className="cs-dropdown-item">
                    <span>01 — Youtopia</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 shrink-0 ml-2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </a>
                  <a href="case-study.html?project=revlr" className="cs-dropdown-item">
                    <span>02 — REVLR</span>
                  </a>
                  <a href="case-study.html?project=justickets" className="cs-dropdown-item">
                    <span>03 — Justickets</span>
                  </a>
                  <a href="case-study.html?project=myblockcounts" className="cs-dropdown-item">
                    <span>04 — My Block Counts</span>
                  </a>
                  <a
                    href="https://kaystudio.framer.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-dropdown-item"
                  >
                    <span>Beyond Product</span>
                    <ArrowUpRight size={13} className="text-[#FFD025] shrink-0 stroke-[2.5]" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button (Visible on mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#FFD025] transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer / Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/20 pb-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            <a
              href="#work"
              onClick={(e) => handleMobileNavClick('work', e)}
              className={`block px-3 py-2.5 rounded-lg text-[15px] transition-colors ${activeTab === 'work' ? 'bg-white/15 text-[#FFD025] font-bold' : 'text-white hover:bg-white/10'}`}
            >
              Work
            </a>
            <a
              href="#about"
              onClick={(e) => handleMobileNavClick('about', e)}
              className={`block px-3 py-2.5 rounded-lg text-[15px] transition-colors ${activeTab === 'about' ? 'bg-white/15 text-[#FFD025] font-bold' : 'text-white hover:bg-white/10'}`}
            >
              About
            </a>
            <a
              href="https://drive.google.com/file/d/13F5AWdAowd_L5jzegAMzhspee3-vKIRM/view"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[15px] text-white hover:bg-white/10 transition-colors font-medium"
            >
              <span>Resume</span>
              <ArrowUpRight size={15} className="text-[#FFD025] shrink-0 stroke-[2.5]" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleMobileNavClick('contact', e)}
              className={`block px-3 py-2.5 rounded-lg text-[15px] transition-colors ${activeTab === 'contact' ? 'bg-white/15 text-[#FFD025] font-bold' : 'text-white hover:bg-white/10'}`}
            >
              Contact
            </a>

            {/* Mobile Case Studies Accordion */}
            <div className="pt-2 border-t border-white/15 mt-2">
              <button
                onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-[15px] text-white hover:text-[#FFD025] font-medium rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Case studies</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileCaseStudiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCaseStudiesOpen && (
                <div className="pl-3 pr-1 py-1 space-y-1">
                  <a
                    href="case-study.html?project=youtopia"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-[14px] text-white/90 hover:text-white hover:bg-white/10"
                  >
                    <span>01 — Youtopia</span>
                    <Lock size={12} className="text-[#FFD025]" />
                  </a>
                  <a
                    href="case-study.html?project=revlr"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-[14px] text-white/90 hover:text-white hover:bg-white/10"
                  >
                    02 — REVLR
                  </a>
                  <a
                    href="case-study.html?project=justickets"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-[14px] text-white/90 hover:text-white hover:bg-white/10"
                  >
                    03 — Justickets
                  </a>
                  <a
                    href="case-study.html?project=myblockcounts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-[14px] text-white/90 hover:text-white hover:bg-white/10"
                  >
                    04 — My Block Counts
                  </a>
                  <a
                    href="https://kaystudio.framer.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-[14px] text-white/90 hover:text-white hover:bg-white/10"
                  >
                    <span>Beyond Product</span>
                    <ArrowUpRight size={14} className="text-[#FFD025] shrink-0 stroke-[2.5]" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.header>

      {/* Backdrop overlay for mobile menu - clicking/tapping outside closes menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-0 bg-black/45 z-40 md:hidden backdrop-blur-[2px] animate-in fade-in duration-150 cursor-pointer"
          aria-hidden="true"
        />
      )}

      {/* MAIN CONTENT CANVAS */}
      <main className="w-full relative z-10 overflow-x-clip">
        {/* HERO SECTION */}
        <section id="top" className="relative min-h-[calc(100vh-84px)] flex flex-col justify-between pt-10 sm:pt-14 md:pt-18 lg:pt-22 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden z-10">
          <div className="relative z-10 mx-auto max-w-[1300px] w-full px-5 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-between">
            {/* Asymmetrical High-Impact Typographic Headline with editorial staggered reveal */}
            <div>
              <h1 className="font-display text-[38px] sm:text-[52px] md:text-[66px] lg:text-[76px] xl:text-[84px] font-bold leading-[1.04] text-white tracking-[-0.035em] max-w-[1180px]">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.08, ease: EASE_EDITORIAL }}
                >
                  Turning <span className="text-[#FFD025]">ambiguous problems</span>
                </motion.span>
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: EASE_EDITORIAL }}
                >
                  into <span className="text-[#FFD025]">products people</span> can
                </motion.span>
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.32, ease: EASE_EDITORIAL }}
                >
                  actually <span className="text-[#FFD025]">use.</span>
                </motion.span>
              </h1>
            </div>

            {/* Right-aligned editorial summary paragraph block matching reference layout */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.46, ease: EASE_EDITORIAL }}
              className="flex justify-end mt-12 sm:mt-16"
            >
              <div className="max-w-[560px] text-left">
                <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.62] text-white font-normal [text-shadow:_0_1px_2px_rgba(0,18,48,0.4)]">
                  I design AI, enterprise, and consumer products from 0→1 to scale, partnering with research, engineering, and product teams to simplify complexity, shape product direction, and build systems that hold up in production.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 1. DESIGN PRINCIPLES (Full-width strip) */}
        <section id="principles" className="relative z-10 border-t border-white/15 py-14 sm:py-18 md:py-22">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
              className="font-display text-[28px] sm:text-[38px] md:text-[48px] font-bold leading-[1.08] text-white mb-10 sm:mb-14 tracking-tight"
            >
              Design Principles
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
              {PRINCIPLES.map((principle, idx) => (
                <motion.div
                  key={principle.num}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: idx * 0.12, ease: EASE_EDITORIAL }}
                  className="flex flex-col justify-start"
                >
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFD025] mb-3 font-bold leading-none">{principle.num}</span>
                  <h3 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-bold text-white leading-[1.2]">
                    {principle.title}
                  </h3>
                  <p className="text-[14.5px] sm:text-[15.5px] leading-[1.68] text-white mt-3 font-normal [text-shadow:_0_1px_2px_rgba(0,18,48,0.35)]">
                    {principle.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. TWO-COLUMN SPLIT: PRACTICES I BRING (LEFT) | SELECTED WORK (RIGHT) */}
        <section id="work" className="relative z-10 border-t border-white/15 py-14 sm:py-20 md:py-24">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* LEFT COLUMN: PRACTICES I BRING */}
              <div id="practices" className="lg:col-span-5 lg:sticky lg:top-[64px] sm:top-[70px] self-start text-white">
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                  className="border-b border-white/20 pb-3 pt-2 mb-3 h-[52px] flex items-center"
                >
                  <h2 className="font-display text-[22px] sm:text-[26px] lg:text-[24px] xl:text-[28px] font-bold leading-none text-white tracking-tight">
                    Practices I bring to a team
                  </h2>
                </motion.div>

                <ul className="divide-y divide-white/15 border-b border-white/15">
                  {PRACTICES.map((practice, idx) => (
                    <motion.li
                      key={practice.num}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.45, delay: idx * 0.05, ease: EASE_EDITORIAL }}
                      className="py-3.5 sm:py-4 xl:py-4.5 group hover:bg-white/10 px-3 rounded-xl -mx-3 transition-colors"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-[11px] sm:text-[11.5px] font-mono text-[#FFD025] font-bold shrink-0 min-w-[22px]">{practice.num}</span>
                          <h3 className="font-display text-[15px] sm:text-[16px] xl:text-[16.5px] font-bold text-white group-hover:translate-x-0.5 transition-transform tracking-tight">
                            {practice.title}
                          </h3>
                        </div>
                        <a
                          href={practice.link}
                          target={practice.external ? "_blank" : undefined}
                          rel={practice.external ? "noopener noreferrer" : undefined}
                          className="text-[11px] sm:text-[11.5px] font-mono text-white/90 hover:text-[#FFD025] font-semibold shrink-0 inline-flex items-center gap-1 transition-colors underline underline-offset-2 whitespace-nowrap group/link"
                        >
                          <span>{practice.project}</span>
                          <ArrowUpRight size={12} className="text-[#FFD025] shrink-0 stroke-[2.5] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" aria-hidden="true" />
                        </a>
                      </div>
                      <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-white/85 pl-8 sm:pl-[31px] mt-1.5 font-normal">
                        {practice.desc}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* RIGHT COLUMN: SELECTED WORK (STACKED CARDS - FITS VIEWPORT) */}
              <div className="lg:col-span-7">
                {/* PROJECT 1: YOUTOPIA (WITH SELECTED WORK HEADING) */}
                <div className="sticky top-[64px] sm:top-[70px] z-10 mb-8 sm:mb-12">
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                    className="border-b border-white/20 pb-3 pt-2 mb-3 h-[52px] flex items-center"
                  >
                    <h2 className="font-display text-[22px] sm:text-[26px] lg:text-[24px] xl:text-[28px] font-bold leading-none text-white tracking-tight">
                      Selected Work
                    </h2>
                  </motion.div>

                  <motion.a
                    href="case-study.html?project=youtopia"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    className="group border border-white/60 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,15,45,0.18),0_20px_50px_rgba(0,25,80,0.28)] hover:shadow-[0_-8px_32px_rgba(0,15,45,0.25),0_28px_60px_rgba(0,25,80,0.38)] hover:border-white transition-all duration-300 block overflow-hidden text-neutral-900"
                  >
                      <div className="bg-neutral-100 overflow-hidden h-[180px] sm:h-[210px] md:h-[230px] border-b border-neutral-200">
                        <img
                          src="/Home/Y_WC.webp"
                          alt="Youtopia Work Preview"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          width={1200}
                          height={633}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                        />
                      </div>
                      <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                        <div className="flex items-center justify-end mb-1.5">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-black font-semibold inline-flex items-center gap-1.5 font-mono group-hover:translate-x-0.5 transition-transform">
                            <span>View Case Study</span>
                            <ArrowRight size={12} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
                          </div>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-1.5">Youtopia</h3>
                        <p className="text-[13.5px] sm:text-[14px] text-neutral-700 leading-relaxed mb-3 font-normal">
                          Designing six interconnected products from consumer onboarding to restaurant operations around a shared AI nutrition platform still being defined.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-3 py-2 border-y border-neutral-200">
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">25%+</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">Task Efficiency</div>
                          </div>
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">Reusable</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">Design Patterns</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">AI</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">0→1</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Product Strategy</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Systems Thinking</span>
                        </div>
                      </div>
                    </motion.a>
                  </div>

                  {/* PROJECT 2: REVLR */}
                  <div className="sticky top-[132px] sm:top-[138px] z-20 mb-8 sm:mb-12">
                    <motion.a
                      href="case-study.html?project=revlr"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                      className="group border border-white/60 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,15,45,0.18),0_20px_50px_rgba(0,25,80,0.28)] hover:shadow-[0_-8px_32px_rgba(0,15,45,0.25),0_28px_60px_rgba(0,25,80,0.38)] hover:border-white transition-all duration-300 block overflow-hidden text-neutral-900"
                    >
                      <div className="bg-neutral-100 overflow-hidden h-[180px] sm:h-[210px] md:h-[230px] border-b border-neutral-200">
                        <img
                          src="/Home/R_WC.webp"
                          alt="REVLR Work Preview"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          width={1584}
                          height={1042}
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                      <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                        <div className="flex items-center justify-end mb-1.5">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-black font-semibold inline-flex items-center gap-1.5 font-mono group-hover:translate-x-0.5 transition-transform">
                            <span>View Case Study</span>
                            <ArrowRight size={12} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
                          </div>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-1.5">REVLR</h3>
                        <p className="text-[13.5px] sm:text-[14px] text-neutral-700 leading-relaxed mb-3 font-normal">
                          Spatial interaction framework for complex system modeling in virtual reality.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-3 py-2 border-y border-neutral-200">
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">+40%</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">User Engagement</div>
                          </div>
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">-30%</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">Cognitive Load</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">HCI</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Accessibility</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Emerging Interfaces</span>
                        </div>
                      </div>
                    </motion.a>
                  </div>

                  {/* PROJECT 3: JUSTICKETS */}
                  <div className="sticky top-[136px] sm:top-[142px] z-30 mb-8 sm:mb-12">
                    <motion.a
                      href="case-study.html?project=justickets"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                      className="group border border-white/60 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,15,45,0.18),0_20px_50px_rgba(0,25,80,0.28)] hover:shadow-[0_-8px_32px_rgba(0,15,45,0.25),0_28px_60px_rgba(0,25,80,0.38)] hover:border-white transition-all duration-300 block overflow-hidden text-neutral-900"
                    >
                      <div className="bg-neutral-100 overflow-hidden h-[180px] sm:h-[210px] md:h-[230px] border-b border-neutral-200">
                        <img
                          src="/Home/JT_WC.webp"
                          alt="Justickets Work Preview"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          width={1376}
                          height={768}
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                      <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                        <div className="flex items-center justify-end mb-1.5">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-black font-semibold inline-flex items-center gap-1.5 font-mono group-hover:translate-x-0.5 transition-transform">
                            <span>View Case Study</span>
                            <ArrowRight size={12} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
                          </div>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-1.5">Justickets</h3>
                        <p className="text-[13.5px] sm:text-[14px] text-neutral-700 leading-relaxed mb-3 font-normal">
                          Scaling a production movie-ticketing product without slowing feature delivery.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-3 py-2 border-y border-neutral-200">
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">1M+</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">Platform Downloads</div>
                          </div>
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">Optimized</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">Purchase Funnel</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Design Systems</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Consumer Products</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Production Collaboration</span>
                        </div>
                      </div>
                    </motion.a>
                  </div>

                  {/* PROJECT 4: MY BLOCK COUNTS */}
                  <div className="sticky top-[140px] sm:top-[146px] z-40 mb-0">
                    <motion.a
                      href="case-study.html?project=myblockcounts"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                      className="group border border-white/60 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,15,45,0.18),0_20px_50px_rgba(0,25,80,0.28)] hover:shadow-[0_-8px_32px_rgba(0,15,45,0.25),0_28px_60px_rgba(0,25,80,0.38)] hover:border-white transition-all duration-300 block overflow-hidden text-neutral-900"
                    >
                      <div className="bg-neutral-100 overflow-hidden h-[180px] sm:h-[210px] md:h-[230px] border-b border-neutral-200">
                        <img
                          src="/Home/MYBC_WC.webp"
                          alt="My Block Work Preview"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          width={1584}
                          height={1042}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                        />
                      </div>
                      <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                        <div className="flex items-center justify-end mb-1.5">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-black font-semibold inline-flex items-center gap-1.5 font-mono group-hover:translate-x-0.5 transition-transform">
                            <span>View Case Study</span>
                            <ArrowRight size={12} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
                          </div>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-1.5">My Block Counts</h3>
                        <p className="text-[13.5px] sm:text-[14px] text-neutral-700 leading-relaxed mb-3 font-normal">
                          Redesigning an abandoned civic app so that filling out a survey felt like activism, not a form.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-3 py-2 border-y border-neutral-200">
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">+30%</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">User Engagement</div>
                          </div>
                          <div>
                            <div className="font-display text-lg sm:text-xl font-bold text-black">Simplified</div>
                            <div className="text-[11px] uppercase tracking-wider mt-0.5 text-neutral-700 font-semibold">Info Structures</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Research Synthesis</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Information Architecture</span>
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 font-medium shadow-2xs">Civic Technology</span>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* 3. HELPING DESIGNERS GROW */}
        <section id="mentorship" className="relative z-10 border-t border-white/15 py-14 sm:py-18 md:py-22">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
              className="w-full"
            >
              <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.2em] text-[#FFD025] block mb-2 font-bold">Mentorship & Teaching</span>
              <h2 className="font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.08] text-white tracking-tight mb-6">
                Helping other designers grow
              </h2>
              <div className="space-y-5 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.72] text-white font-normal w-full [text-shadow:_0_1px_2px_rgba(0,18,48,0.35)]">
                <p className="w-full">
                  Great product design isn't just about making good decisions. It's also about helping other people make them.
                </p>
                <p className="w-full">
                  At Qube Cinema, I mentored design interns through real product work, helping them navigate design decisions, feedback, and cross-functional collaboration. At Outcome School, I designed curriculum that turns product design practice into structured learning for hundreds of aspiring designers.
                </p>
                <p className="w-full">
                  Teaching and mentoring have made me a clearer communicator, a stronger collaborator, and a more thoughtful product designer.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative z-10 border-t border-white/15 pt-16 sm:pt-24 md:pt-36 pb-0 bg-white/5 backdrop-blur-xs overflow-x-clip">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16 w-full pb-4 sm:pb-20 md:pb-28 lg:pb-36">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center w-full">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                className="hidden md:flex md:col-span-5 justify-center"
              >
                <div className="relative rounded-2xl overflow-hidden max-w-[380px] w-full border border-white/30 bg-white/10 backdrop-blur-md shadow-2xl">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src="/Home/about.png"
                      alt="Kay portrait illustration"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE_EDITORIAL }}
                className="w-full md:col-span-7"
              >
                <h2 className="font-display text-[32px] sm:text-[46px] md:text-[58px] font-bold leading-[1.05] text-white mb-6 tracking-tight">
                  Hi, I'm Kay
                </h2>

                {/* Mobile-only portrait - centered */}
                <div className="my-8 md:hidden w-full flex justify-center items-center">
                  <div
                    onClick={() => {
                      const peek = document.getElementById('peek-photos-container');
                      if (peek) {
                        peek.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="relative rounded-2xl overflow-hidden w-[250px] xs:w-[280px] sm:w-[320px] max-w-[80vw] border border-white/30 bg-white/10 backdrop-blur-md shadow-2xl aspect-[4/5] mx-auto cursor-pointer active:scale-95 transition-transform"
                    role="button"
                    tabIndex={0}
                    aria-label="Kay portrait illustration"
                  >
                    <img
                      src="/Home/about.png"
                      alt="Kay portrait illustration"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.72] text-white font-normal break-words">
                  <p>
                    I didn't start in product design. I started in illustration, drawing characters and building visual worlds long before I touched Figma. That instinct never really left, it's why I still care as much about how something feels as how it functions.
                  </p>
                  <p>
                    Somewhere along the way I got pulled toward a harder problem: not how do I make this beautiful, but how do I make this make sense. My background in human centered computing gave me the research and systems thinking, the illustration background kept the human part from getting lost in the process. Together they shape how I work now, on AI systems people don't trust yet, VR interfaces with no rulebook, civic platforms nobody wants to open.
                  </p>
                  <p>
                    Outside of design, I climb, play guitar, and try to spend real time away from a screen, usually with people I like, good food, and better music. I think community and human connection are underrated design problems too, which is part of why I teach.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href="https://drive.google.com/file/d/13F5AWdAowd_L5jzegAMzhspee3-vKIRM/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD025] hover:bg-white text-black text-[12px] font-mono tracking-[0.16em] uppercase transition-all shadow-lg font-bold"
                  >
                    <span>View Resume</span>
                    <ArrowUpRight size={15} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Peek Photos Polaroid strip sitting flush at bottom of About */}
          <PeekPhotos />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="relative z-20 bg-[#3275b4] border-t border-white/15 pt-16 sm:pt-24 md:pt-32">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16 pb-16 sm:pb-24">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
              className="max-w-[720px]"
            >
              <h2 className="font-display text-[28px] sm:text-[44px] md:text-[58px] lg:text-[68px] font-bold leading-[1.05] text-white tracking-tight">
                Building something complex?<br />I'd love to help make it simpler.
              </h2>
              <p className="mt-4 sm:mt-6 text-[15px] sm:text-[17px] md:text-[18px] leading-[1.68] text-white font-normal">
                Whether you're exploring a new product, improving an existing one, or just want to talk about design, feel free to reach out.
              </p>

              <div className="mt-6 sm:mt-8 max-w-full">
                <a
                  href="mailto:itskeerthanaravichandran@gmail.com"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[13.5px] min-[360px]:text-[15px] min-[420px]:text-[17px] sm:text-xl md:text-2xl font-mono text-[#FFD025] hover:text-white underline underline-offset-4 sm:underline-offset-8 transition-colors font-bold tracking-tight max-w-full break-all py-1 group"
                >
                  <span className="break-all">itskeerthanaravichandran@gmail.com</span>
                  <ArrowUpRight size={22} className="shrink-0 inline-block align-middle select-none stroke-[2.5]" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* SOCIAL LINKS GRID STRIP (FOOTER SECTION) */}
          <div className="border-t border-b border-white/20 bg-white/5 backdrop-blur-xs">
            <div className="mx-auto max-w-[1300px] grid grid-cols-4 divide-x divide-white/20 border-x border-white/20">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/summershuttle/?hl=en" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex items-center justify-center py-6 sm:py-10 md:py-12 hover:bg-white hover:text-[#3275b4] text-white transition-all group"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Behance */}
              <a 
                href="https://www.behance.net/keertharavicha1" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Behance"
                title="Behance"
                className="flex items-center justify-center py-6 sm:py-10 md:py-12 hover:bg-white hover:text-[#3275b4] text-white transition-all group"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 5.5v13" />
                  <path d="M4.5 5.5h4a3 3 0 0 1 0 6h-4" />
                  <path d="M4.5 11.5h4.5a3.5 3.5 0 0 1 0 7h-4.5" />
                  <path d="M13.5 7.5h5" />
                  <path d="M12.5 15h6a3 3 0 1 0-6 0c0 2 1.5 3.5 3.5 3.5 1.3 0 2.4-.6 3-1.6" />
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:itskeerthanaravichandran@gmail.com" 
                aria-label="Email"
                title="Email"
                className="flex items-center justify-center py-6 sm:py-10 md:py-12 hover:bg-white hover:text-[#3275b4] text-white transition-all group"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/keerthanaravichandran/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex items-center justify-center py-6 sm:py-10 md:py-12 hover:bg-white hover:text-[#3275b4] text-white transition-all group"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 text-[10.5px] sm:text-[11.5px] font-mono tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white font-medium border-t border-white/15 bg-transparent">
          <span className="break-words">© 2026 Keerthana Ravichandran</span>
        </footer>
      </main>

      {/* RESUME MODAL (Clean light editorial styling) */}
      {resumeOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex justify-center overflow-y-auto p-4 md:p-8 animate-in fade-in duration-200">
          <div className="relative bg-white text-neutral-900 border border-neutral-200 rounded-2xl max-w-[850px] w-full my-auto shadow-2xl overflow-hidden p-6 md:p-10">
            <button
              onClick={() => setResumeOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Close Resume"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="border-b border-neutral-200 pb-6">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-black mt-1">Keerthana Ravichandran</h2>
              <p className="text-xs sm:text-sm font-mono text-neutral-700 font-medium mt-2 break-all sm:break-normal">Senior Product Designer | US / Remote | itskeerthanaravichandran@gmail.com</p>
            </div>

            <div className="py-6 space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-black uppercase tracking-wider mb-4">Experience</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-black pl-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-black">Lead Product Designer — Youtopia</h4>
                      <span className="text-xs font-mono text-neutral-700 font-medium">2023 — Present</span>
                    </div>
                    <p className="text-xs font-mono text-neutral-700 font-medium mt-1">0→1 AI Wellness Platform</p>
                    <p className="text-sm text-neutral-800 mt-2 leading-relaxed">
                      Led product strategy, design systems, and multi-agent interaction paradigms for an AI nutrition product. Reduced task friction by 25% and designed 40+ production UI components.
                    </p>
                  </div>

                  <div className="border-l-2 border-neutral-300 pl-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-black">VR Product Designer — UMBC Imaging Research Center</h4>
                      <span className="text-xs font-mono text-neutral-700 font-medium">2022 — 2023</span>
                    </div>
                    <p className="text-xs font-mono text-neutral-700 font-medium mt-1">REVLR Spatial Accessibility</p>
                    <p className="text-sm text-neutral-800 mt-2 leading-relaxed">
                      Designed accessible gaze reticle controls and dynamic vignetting systems in VR, lowering cognitive load by 30% and increasing spatial task completion rates by 40%.
                    </p>
                  </div>

                  <div className="border-l-2 border-neutral-300 pl-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-black">Senior Product Designer — Justickets</h4>
                      <span className="text-xs font-mono text-neutral-700 font-medium">2020 — 2022</span>
                    </div>
                    <p className="text-xs font-mono text-neutral-700 font-medium mt-1">High-Traffic Consumer Ticketing</p>
                    <p className="text-sm text-neutral-800 mt-2 leading-relaxed">
                      Redesigned mobile seat booking and checkout experience for over 1M users, boosting purchase funnel conversion by 18%.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-black uppercase tracking-wider mb-3">Education & Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                    <div className="font-semibold text-black">M.S. Human-Centered Computing</div>
                    <div className="text-xs font-mono text-neutral-700 font-medium mt-1">University of Maryland, Baltimore County (UMBC)</div>
                  </div>
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                    <div className="font-semibold text-black">Core Capabilities</div>
                    <div className="text-xs font-mono text-neutral-700 font-medium mt-1">AI Systems, Spatial Computing (VR), Design Systems, Civic Tech</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6 flex justify-between items-center">
              <button
                onClick={() => setResumeOpen(false)}
                className="px-5 py-2.5 rounded-full border border-neutral-300 bg-neutral-50 text-xs font-mono uppercase tracking-wider text-neutral-800 font-medium hover:text-black hover:bg-neutral-100 transition-colors"
              >
                Close Resume
              </button>
              <a
                href="mailto:itskeerthanaravichandran@gmail.com"
                className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}