import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'; 
import profileImg from '../assets/photo_profile.png'; 

export default function AboutMe({ theme, isDarkMode }) {
  
  const socialLinks = [
    { Icon: Github, url: "https://github.com/bistiana29" },
    { Icon: Linkedin, url: "https://www.linkedin.com/in/bistiana-syafina-ridho-89693a2a4" },
    { Icon: Mail, url: "mailto:bistianafn29@gmail.com" },
    { Icon: Instagram, url: "https://www.instagram.com/bistianafn" }
  ];

  return (
    <section id="about" className="min-h-[100svh] flex items-center pt-32 pb-16">
      {/* PERBAIKAN 1: Lebar Page & Proporsi
        Mengubah dari pembagian 50:50 menjadi sistem 12-kolom. 
        Teks mengambil 7 bagian (lebih lega), gambar mengambil 5 bagian.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
        
        {/* Kolom Teks */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 tracking-tight leading-tight">
              Hi, I'm <br/>
              <span className={theme.accent}>Bistiana Syafina Ridho</span>
            </h1>
            <h2 className={`text-xl md:text-2xl font-light ${theme.textMuted}`}>
              Applied Data Science Student.
            </h2>
          </div>
          
          <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Passionate about transforming raw data into actionable business insights. Experienced in statistical<br className="hidden lg:block" />
            modeling, machine learning, and data visualization. Currently a final-year student at Politeknik<br className="hidden lg:block" />
            Elektronika Negeri Surabaya (Electronics Engineering Institute of Surabaya) with experience in<br className="hidden lg:block" />
            organizational activities and volunteer work. Ready to tackle real-world data challenges and<br className="hidden lg:block" />
            contribute to data driven decision making.<br className="hidden lg:block" />
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

        {/* PERBAIKAN 2: Tata Letak Foto
          Kolom gambar dengan bingkai yang dirancang khusus untuk foto tanpa background.
        */}
        <div className="lg:col-span-5 relative hidden md:block animate-in fade-in zoom-in duration-1000 mt-10 lg:mt-0">
          {/* Pembatas ukuran maksimal gambar agar tidak "raksasa" di layar besar */}
          <div className="relative w-full max-w-[280px] lg:max-w-[360px] mx-auto">
             
             {/* Cahaya di belakang foto */}
             <div className={`absolute -inset-4 rounded-full blur-3xl opacity-30 ${isDarkMode ? 'bg-[#7AE2CF]' : 'bg-[#077A7D]'}`}></div>
             
             {/* Bingkai Foto - Menggunakan rasio portrait (4/5) */}
             <div className={`relative aspect-[4/5] rounded-[2rem] border overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500 ${
               isDarkMode 
                 ? 'bg-gradient-to-b from-[#215E61]/30 to-[#06202B] border-[#077A7D] shadow-[#077A7D]/20' 
                 : 'bg-gradient-to-b from-white to-[#F5EEDD] border-[#7AE2CF] shadow-[#7AE2CF]/20'
             }`}>
                {/* object-bottom memastikan bagian bawah foto Anda menempel 
                  sempurna ke dasar garis kotak, tidak melayang.
                */}
                <img 
                  src={profileImg} 
                  alt="Bistiana Syafina Ridho" 
                  className="absolute inset-0 w-full h-full object-cover object-bottom pt-6 drop-shadow-2xl"
                />
             </div>
             
             {/* Aksen hiasan (opsional, membuat desain lebih manis) */}
             <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-4 opacity-50 -z-10 ${isDarkMode ? 'border-[#FE7F2D]' : 'border-[#FE7F2D]'}`}></div>
             <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full opacity-20 -z-10 ${isDarkMode ? 'bg-[#7AE2CF]' : 'bg-[#077A7D]'}`}></div>

          </div>
        </div>
        
      </div>
    </section>
  );
}