import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, LineChart } from 'lucide-react';

export default function AboutMe({ theme, isDarkMode }) {
  return (
    <section id="about" className="min-h-screen flex items-center pt-20 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-6 border ${
              isDarkMode ? 'bg-[#215E61]/50 text-[#7AE2CF] border-[#7AE2CF]/30' : 'bg-[#7AE2CF]/20 text-[#077A7D] border-[#077A7D]/30'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.accentBg} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.accentBg}`}></span>
              </span>
              Seeking Data Analyst / Data Scientist Roles
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight">
              Hi, I'm <br/>
              <span className={theme.accent}>John Doe</span>
            </h1>
            <h2 className={`text-2xl font-light ${theme.textMuted}`}>
              Applied Data Science Student.
            </h2>
          </div>
          
          <p className={`text-lg leading-relaxed max-w-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Passionate about transforming raw data into actionable business insights. Experienced in statistical modeling, machine learning, and data visualization. Currently in my final year, ready to tackle real-world data challenges.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className={`px-6 py-3 font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#FE7F2D]/20 ${theme.accentBg} text-[#F5EEDD] hover:opacity-90`}>
              Download Resume <ExternalLink size={18} />
            </button>
            <div className="flex gap-2">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <button key={i} className={`p-3 border rounded-lg transition-colors ${theme.card} hover:${theme.accent} hover:border-[#FE7F2D]`}>
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
          {/* Decorative Tech Graphic */}
          <div className="aspect-square relative flex items-center justify-center">
             <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-[#7AE2CF]' : 'bg-[#077A7D]'}`}></div>
             <div className={`w-3/4 h-3/4 rounded-3xl border-2 rotate-3 transform transition-transform hover:rotate-0 duration-500 flex flex-col items-center justify-center overflow-hidden ${isDarkMode ? 'bg-[#06202B] border-[#077A7D]' : 'bg-white border-[#7AE2CF]'}`}>
                <LineChart size={80} strokeWidth={1} className={theme.accent} />
                <div className="mt-8 w-full px-8 space-y-3">
                  <div className={`h-2 rounded-full w-full ${isDarkMode ? 'bg-[#215E61]' : 'bg-[#7AE2CF]/30'}`}>
                    <div className={`h-full rounded-full w-3/4 ${theme.accentBg}`}></div>
                  </div>
                  <div className={`h-2 rounded-full w-full ${isDarkMode ? 'bg-[#215E61]' : 'bg-[#7AE2CF]/30'}`}>
                    <div className="h-full rounded-full w-1/2 bg-[#7AE2CF]"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}