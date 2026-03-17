import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// Import komponen halaman yang sudah dipisah
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['about', 'skills', 'projects', 'dashboard'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme.bg} ${theme.text} selection:bg-[#FE7F2D]/30`}>
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${
        isScrolled ? `${theme.navBg} border-[#077A7D]/30 py-3 shadow-lg shadow-[#06202B]/10` : 'bg-transparent border-transparent py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${theme.accentBg} flex items-center justify-center text-[#F5EEDD] text-sm font-bold shadow-md shadow-[#FE7F2D]/20`}>
              DS
            </div>
            <span>DataScientist.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 p-1 rounded-full border border-[#077A7D]/20" style={{ backgroundColor: isDarkMode ? 'rgba(33, 94, 97, 0.3)' : 'rgba(122, 226, 207, 0.2)' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeSection === item.id 
                    ? `${theme.accentBg} text-[#F5EEDD] shadow-md shadow-[#FE7F2D]/30` 
                    : `${theme.textMuted} hover:${theme.text}`
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full border transition-colors ${theme.card} hover:${theme.text}`}
          >
            {isDarkMode ? <Sun size={20} className="text-[#FE7F2D]" /> : <Moon size={20} className="text-[#077A7D]" />}
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6">
        <AboutMe theme={theme} isDarkMode={isDarkMode} />
        <Skills theme={theme} isDarkMode={isDarkMode} />
        <Projects theme={theme} isDarkMode={isDarkMode} />
        <Dashboard theme={theme} isDarkMode={isDarkMode} />
      </main>

      {/* FOOTER */}
      <footer className={`py-8 text-center text-sm border-t ${isDarkMode ? 'border-[#077A7D]/20 text-[#7AE2CF]' : 'border-[#7AE2CF]/30 text-[#077A7D]'}`}>
        <p>© 2026 John Doe - Applied Data Science Student.</p>
      </footer>
    </div>
  );
}