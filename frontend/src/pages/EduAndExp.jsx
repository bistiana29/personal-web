import React from 'react';

export default function EduAndExp({ theme, isDarkMode }) {
  
  // 1. DATA PENDIDIKAN (Ganti teks di sini)
  const educationData = [
    {
      institution: "Politeknik Elektronika Negeri Surabaya",
      major: "D4 Applied Data Science",
      details: [
        "Currently a final-year student.",
        "Focus on Statistical Modeling, Machine Learning, and Big Data.",
      ],
      typeBadge: "Pendidikan" // Badge label
    },
    {
      institution: "Your Previous University / Institution",
      major: "Your Previous Degree / Certification",
      details: [
        "Relevant project A regarding data cleaning.",
        "Relevant volunteer work B related to data entry.",
      ],
    },
    {
      institution: "Your High School",
      major: "Your High School Major",
      details: [
        "Organizational activities C.",
        "Volunteer work D.",
      ],
    }
  ];

  // 2. DATA PENGALAMAN (Ganti teks di sini)
  const experienceData = [
    {
      company: "Nama Perusahaan / Organisasi",
      role: "Peran Anda (Misal: Data Analyst Intern)",
      details: [
        "Tugas utama A, misal: Melakukan data cleaning dari PostgreSQL.",
        "Tugas utama B, misal: Visualisasi data menggunakan Tableau.",
      ],
      typeBadge: "Pengalaman" // Badge label
    },
    {
      company: "Nama Perusahaan / Organisasi Sebelumnya",
      role: "Peran Anda Sebelumnya",
      details: [
        "Pencapaian A, misal: Meningkatkan efisiensi reporting.",
        "Pencapaian B, misal: Mengelola basis data organisasi.",
      ],
    }
  ];

  return (
    // Mengikuti style Tech Stack: Full Screen, Vertical Center, Full Flex Width
    <section id="eduandexp" className="min-h-[100svh] flex flex-col justify-center py-24 border-t border-[#077A7D]/20 w-full px-6 md:px-12 lg:px-20 xl:px-32">
      
      {/* Grid 2 Kolom (Mobile Stack, lg: Side-by-Side) gap besar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start w-full">
        
        {/* KOLOM KIRI: EDUCATION (Pertama) */}
        <div>
          {/* Header & Badge (Flex container agar sejajar) */}
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-[#077A7D]/20">
            <h2 className="text-3xl md:text-4xl font-bold">Studi Saya</h2>
            {/* Badge aksen oranye, mengikuti style About */}
            <span className={`px-4 py-1 rounded-full text-xs md:text-sm font-semibold border ${
              isDarkMode ? 'bg-[#215E61]/50 text-[#7AE2CF] border-[#7AE2CF]/30' : 'bg-[#7AE2CF]/20 text-[#077A7D] border-[#077A7D]/30'
            }`}>
              {educationData[0].typeBadge}
            </span>
          </div>

          {/* Timeline List (Container garis vertikal) */}
          <div className="relative border-l-2 ml-2 space-y-12" style={{ borderColor: isDarkMode ? '#077A7D20' : '#7AE2CF20' }}>
            {educationData.map((item, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot Timeline (Putih di tengah garis) */}
                <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-white shadow-lg"></div>
                
                {/* Konten Text */}
                <h3 className="text-xl font-bold mb-1">{item.institution}</h3>
                <p className={`font-semibold mb-3 ${theme.accent}`}>{item.major}</p>
                
                {/* Bullet list untuk detail */}
                <ul className="space-y-1.5 list-disc list-outside ml-4">
                  {item.details.map((detail, d_i) => (
                    <li key={d_i} className={`text-sm md:text-base leading-relaxed ${theme.textMuted}`}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: EXPERIENCE */}
        <div>
          {/* Header & Badge */}
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-[#077A7D]/20">
            <h2 className="text-3xl md:text-4xl font-bold">Jejak Karir</h2>
            <span className={`px-4 py-1 rounded-full text-xs md:text-sm font-semibold border ${
              isDarkMode ? 'bg-[#215E61]/50 text-[#7AE2CF] border-[#7AE2CF]/30' : 'bg-[#7AE2CF]/20 text-[#077A7D] border-[#077A7D]/30'
            }`}>
              {experienceData[0].typeBadge}
            </span>
          </div>

          {/* Timeline List (Container garis vertikal) */}
          <div className="relative border-l-2 ml-2 space-y-12" style={{ borderColor: isDarkMode ? '#077A7D20' : '#7AE2CF20' }}>
            {experienceData.map((item, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot Timeline */}
                <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-white shadow-lg"></div>
                
                {/* Konten Text */}
                <h3 className="text-xl font-bold mb-1">{item.company}</h3>
                <p className={`font-semibold mb-3 ${theme.accent}`}>{item.role}</p>
                
                {/* Bullet list detail */}
                <ul className="space-y-1.5 list-disc list-outside ml-4">
                  {item.details.map((detail, d_i) => (
                    <li key={d_i} className={`text-sm md:text-base leading-relaxed ${theme.textMuted}`}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}