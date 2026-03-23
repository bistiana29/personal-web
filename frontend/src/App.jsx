import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

// Import komponen halaman
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';

// Mapping URL ke ID HTML
const routeToIdMap = {
  '/aboutme': 'about',
  '/tech-stack': 'skills',
  '/projects': 'projects',
  '/dashboard': 'dashboard',
  '/': 'about' // Default
};

// Mapping ID HTML ke URL
const idToRouteMap = {
  'about': '/aboutme',
  'skills': '/tech-stack',
  'projects': '/projects',
  'dashboard': '/dashboard'
};

// ==========================================
// 1. KOMPONEN NAVBAR
// ==========================================
const Navigation = ({ theme, isDarkMode, setIsDarkMode, activePath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/aboutme', label: 'About' },
    { path: '/tech-stack', label: 'Tech Stack' },
    { path: '/projects', label: 'Projects' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  // Fungsi untuk klik menu: Ubah URL lalu Scroll ke bawah
  const handleNavClick = (path) => {
    navigate(path); // Ganti URL
    const targetId = routeToIdMap[path];
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // -80 agar tidak tertutup navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${
      isScrolled ? `${theme.navBg} border-[#077A7D]/30 py-3 shadow-lg shadow-[#06202B]/10` : 'bg-transparent border-transparent py-3 md:py-5'
    }`}>
      <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        
        <div className="w-full md:flex-1 flex justify-between items-center">
          <button onClick={() => handleNavClick('/aboutme')} className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${theme.accentBg} flex items-center justify-center text-[#F5EEDD] text-sm font-bold shadow-md shadow-[#FE7F2D]/20`}>BR</div>
            <span>bistianaridho</span>
          </button>
          
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`md:hidden p-2 rounded-full border transition-colors ${theme.card} hover:${theme.text}`}>
            {isDarkMode ? <Sun size={18} className="text-[#FE7F2D]" /> : <Moon size={18} className="text-[#077A7D]" />}
          </button>
        </div>
        
        <div className="w-full md:w-auto flex items-center gap-2 p-1 rounded-full border border-[#077A7D]/20 overflow-x-auto hide-scrollbar" style={{ backgroundColor: isDarkMode ? 'rgba(33, 94, 97, 0.3)' : 'rgba(122, 226, 207, 0.2)' }}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`whitespace-nowrap px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activePath === item.path 
                  ? `${theme.accentBg} text-[#F5EEDD] shadow-md shadow-[#FE7F2D]/30` 
                  : `${theme.textMuted} hover:${theme.text}`
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex md:flex-1 justify-end">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full border transition-colors ${theme.card} hover:${theme.text}`}>
            {isDarkMode ? <Sun size={20} className="text-[#FE7F2D]" /> : <Moon size={20} className="text-[#077A7D]" />}
          </button>
        </div>

      </div>
    </nav>
  );
};

// ==========================================
// 2. KOMPONEN PORTFOLIO (Engine Scroll & Routing)
// ==========================================
const MainPortfolio = ({ theme, isDarkMode, setIsDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname === '/' ? '/aboutme' : location.pathname);

  // Efek 1: Saat user scroll secara manual, deteksi section-nya dan ubah URL di atas
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'dashboard'];
      const scrollPosition = window.scrollY + 250; // Offset deteksi

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          const currentActiveRoute = idToRouteMap[section];
          if (activePath !== currentActiveRoute) {
            setActivePath(currentActiveRoute);
            // navigate dengan replace: true agar URL berubah TANPA merusak tombol "Back" di browser
            navigate(currentActiveRoute, { replace: true });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePath, navigate]);

  // Efek 2: Saat website pertama kali dibuka dengan URL spesifik (misal teman membuka link /projects Anda)
  // Maka website akan otomatis scroll ke bagian projects.
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/aboutme', { replace: true });
    } else {
      const targetId = routeToIdMap[location.pathname];
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []); // Hanya jalan 1x saat website di-refresh

  return (
    <>
      <Navigation theme={theme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activePath={activePath} />
      
      {/* Semua Komponen di-render berurutan agar bisa di-scroll seperti satu halaman utuh */}
      <main className="w-full px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <AboutMe theme={theme} isDarkMode={isDarkMode} />
        <Skills theme={theme} isDarkMode={isDarkMode} />
        <Projects theme={theme} isDarkMode={isDarkMode} />
        <Dashboard theme={theme} isDarkMode={isDarkMode} />
      </main>
    </>
  );
};

// ==========================================
// 3. KOMPONEN UTAMA (APP)
// ==========================================
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Palet Warna
  const theme = {
    bg: isDarkMode ? 'bg-[#06202B]' : 'bg-[#F5EEDD]',
    navBg: isDarkMode ? 'bg-[#06202B]/90' : 'bg-[#F5EEDD]/90',
    text: isDarkMode ? 'text-[#F5EEDD]' : 'text-[#06202B]',
    textMuted: isDarkMode ? 'text-[#7AE2CF]' : 'text-[#077A7D]',
    card: isDarkMode ? 'bg-[#215E61]/30 border-[#077A7D]' : 'bg-white/60 border-[#7AE2CF]',
    accent: 'text-[#FE7F2D]',
    accentBg: 'bg-[#FE7F2D]',
    inputBg: isDarkMode ? 'bg-[#06202B]' : 'bg-white',
    inputBorder: isDarkMode ? 'border-[#077A7D]' : 'border-[#7AE2CF]',
  };

  return (
    <Router>
      <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-500 ${theme.bg} ${theme.text} selection:bg-[#FE7F2D]/30`}>
        
        {/* AMBIENT BACKGROUND GLOW */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-opacity duration-700 ${isDarkMode ? 'bg-[#077A7D] opacity-20' : 'bg-[#7AE2CF] opacity-40'}`}></div>
          <div className={`absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-opacity duration-700 ${isDarkMode ? 'bg-[#FE7F2D] opacity-10' : 'bg-[#FE7F2D] opacity-15'}`}></div>
        </div>

        {/* Panggil komponen MainPortfolio yang berisi engine sinkronisasi Scroll & URL */}
        <MainPortfolio theme={theme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <footer className={`relative z-10 py-8 text-center text-sm border-t ${isDarkMode ? 'border-[#077A7D]/20 text-[#7AE2CF]' : 'border-[#7AE2CF]/30 text-[#077A7D]'}`}>
          <p>© 2026 Bistiana S. Ridho - Applied Data Science Student.</p>
        </footer>
      </div>
    </Router>
  );
}