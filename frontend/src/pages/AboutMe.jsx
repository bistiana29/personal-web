import React from 'react';
import { Github, Linkedin, Mail, Instagram, LineChart } from 'lucide-react'; 

export default function AboutMe({ theme, isDarkMode }) {
  
  // Daftar tautan sosial media Anda (Silakan ganti URL-nya sesuai milik Anda)
  const socialLinks = [
    { Icon: Github, url: "https://github.com/bistiana29" },
    { Icon: Linkedin, url: "https://www.linkedin.com/in/bistiana-syafina-ridho-89693a2a4" },
    { Icon: Mail, url: "mailto:bistianafn29.@gmail.com" },
    { Icon: Instagram, url: "https://www.instagram.com/bistianafn" }
  ];

return (
    // Mengubah min-h-screen agar bisa menyesuaikan konten di HP
    <section id="about" className="min-h-[100svh] flex items-center pt-32 pb-16">
      {/* Menggunakan gap-8 di HP, gap-12 di Laptop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            
            {/* PERBAIKAN UKURAN FONT DI SINI */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 tracking-tight leading-tight">
              Hi, I'm <br/>
              <span className={theme.accent}>Bistiana Syafina Ridho</span>
            </h1>
            <h2 className={`text-xl md:text-2xl font-light ${theme.textMuted}`}>
              Applied Data Science Student.
            </h2>
          </div>
          
          <p className={`text-base md:text-lg leading-relaxed max-w-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Passionate about transforming raw data into actionable business insights. Experienced in statistical modeling, machine learning, and data visualization. Currently a final-year student at Politeknik Elektronika Negeri Surabaya (Electronics Engineering Institute of Surabaya) with experience in organizational activities and volunteer work. Ready to tackle real-world data challenges and contribute to data driven decision making.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 md:pt-4">
            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <a 
                    key={i} 
                    href={item.url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`p-2.5 md:p-3 border rounded-lg transition-colors ${theme.card} hover:${theme.accent} hover:border-[#FE7F2D] cursor-pointer`}
                  >
                    <Icon size={18} className="md:w-5 md:h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gambar chart di kanan disembunyikan di HP, muncul mulai ukuran Tablet (md) ke atas */}
        <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000 mt-8 lg:mt-0">
          <div className="aspect-square relative flex items-center justify-center max-w-md mx-auto lg:max-w-none">
             <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-[#7AE2CF]' : 'bg-[#077A7D]'}`}></div>
             <div className={`w-3/4 h-3/4 rounded-3xl border-2 rotate-3 transform transition-transform hover:rotate-0 duration-500 flex flex-col items-center justify-center overflow-hidden ${isDarkMode ? 'bg-[#06202B] border-[#077A7D]' : 'bg-white border-[#7AE2CF]'}`}>
                <LineChart size={60} strokeWidth={1} className={`lg:w-20 lg:h-20 ${theme.accent}`} />
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