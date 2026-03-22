import React from 'react';

// Row 1
import pythonImg from '../assets/python.png';
import pandasImg from '../assets/pandas.png';
import postgresqlImg from '../assets/postgresql.png';
import matplotlibImg from '../assets/matplotlib.png';
import seabornImg from '../assets/seaborn.png';
import plotlyImg from '../assets/plotly.png';
import scikitleanrImg from '../assets/scikit_learn.png';
import tensorflowImg from '../assets/tensorflow.png';

// Row 2
import jupyterImg from '../assets/jupyter.png';
import anacondaImg from '../assets/anaconda.png';
import streamlitImg from '../assets/streamlit.png';
import tableauImg from '../assets/tableau.png';
import powerbiImg from '../assets/power_bi.png';
import lookerstudioImg from '../assets/looker.png';
import grafanaImg from '../assets/grafana.png';
import fastapiImg from '../assets/fastapi.png';
import githubImg from '../assets/github.png';
import dockerImg from '../assets/docker.png';

export default function Skills({ theme, isDarkMode }) {

  // Tambahkan 'desc' di setiap objek
  const row1 = [
    { name: 'Python', initial: 'Py', imgSrc: pythonImg, desc: 'Scripting & Automation' },
    { name: 'Pandas', initial: 'Pd', imgSrc: pandasImg, desc: 'Data Manipulation' },
    { name: 'PostgreSQL', initial: 'Pg', imgSrc: postgresqlImg, desc: 'Relational Database' },
    { name: 'Matplotlib', initial: 'Mp', imgSrc: matplotlibImg, desc: 'Static Visualization' },
    { name: 'Seaborn', initial: 'Sb', imgSrc: seabornImg, desc: 'Statistical Graphics' },
    { name: 'Plotly', initial: 'Plt', imgSrc: plotlyImg, desc: 'Interactive Charts' },
    { name: 'Scikit-Learn', initial: 'Sk', imgSrc: scikitleanrImg, desc: 'Machine Learning Models' },
    { name: 'TensorFlow', initial: 'Tf', imgSrc: tensorflowImg, desc: 'Deep Learning & Neural Nets' },
  ];

  const row2 = [
    { name: 'Jupyter', initial: 'Jp', imgSrc: jupyterImg, desc: 'Interactive Notebooks' },
    { name: 'Anaconda', initial: 'An', imgSrc: anacondaImg, desc: 'Environment Manager' },
    { name: 'Streamlit', initial: 'St', imgSrc: streamlitImg, desc: 'Web Apps for Data' },
    { name: 'Tableau', initial: 'Tb', imgSrc: tableauImg, desc: 'Business Intelligence' },
    { name: 'PowerBI', initial: 'Pb', imgSrc: powerbiImg, desc: 'Data Dashboarding' },
    { name: 'Looker Studio', initial: 'Ls', imgSrc: lookerstudioImg, desc: 'Google Data Reporting' },
    { name: 'Grafana', initial: 'Gr', imgSrc: grafanaImg, desc: 'Real-time Metrics' },
    { name: 'Fast API', initial: 'Fa', imgSrc: fastapiImg, desc: 'Building RESTful APIs' },
    { name: 'Github', initial: 'Gh', imgSrc: githubImg, desc: 'Version Control' },
    { name: 'Docker', initial: 'Dk', imgSrc: dockerImg, desc: 'Containerization' },
  ];

  // Komponen Kotak Skill
  const SkillBox = ({ item }) => {
    return (
      <div className={`relative group flex flex-col items-center justify-center flex-shrink-0 w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
        isDarkMode
          ? 'bg-[#06202B]/80 border-[#077A7D]/40 hover:border-[#FE7F2D] hover:shadow-[#FE7F2D]/10'
          : 'bg-white/80 border-[#7AE2CF] hover:border-[#FE7F2D] hover:shadow-[#FE7F2D]/20'
      }`}>

        {/* LOGO AREA - Diperbesar juga untuk mengimbangi card */}
        <div className="mb-4 h-14 w-14 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-3">
          {item.imgSrc ? (
            <img src={item.imgSrc} alt={item.name} className="object-contain w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          ) : (
            <div className={`w-full h-full rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl transition-colors duration-300 shadow-inner ${
              isDarkMode ? 'bg-[#215E61]/50 text-[#7AE2CF] group-hover:bg-[#FE7F2D] group-hover:text-[#F5EEDD]' : 'bg-[#7AE2CF]/30 text-[#077A7D] group-hover:bg-[#FE7F2D] group-hover:text-[#F5EEDD]'
            }`}>
              {item.initial}
            </div>
          )}
        </div>

        {/* NAMA SKILL */}
        <span className={`text-sm md:text-lg font-bold text-center px-2 transition-all duration-300 group-hover:-translate-y-3 ${
          isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-[#06202B]'
        }`}>
          {item.name}
        </span>

        {/* DESKRIPSI OVERLAY */}
        <div className={`absolute bottom-0 left-0 w-full p-2 md:p-3 text-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-b-3xl ${
          isDarkMode ? 'bg-[#215E61]/90 backdrop-blur-sm border-t border-[#077A7D]/30' : 'bg-[#7AE2CF]/90 backdrop-blur-sm border-t border-white/50'
        }`}>
          <p className={`text-[10px] md:text-sm font-medium leading-tight px-1 pb-1 ${
             isDarkMode ? 'text-[#F5EEDD]' : 'text-[#06202B]'
          }`}>
            {item.desc}
          </p>
        </div>

      </div>
    );
  };

  return (
    <section id="skills" className="min-h-[100svh] flex flex-col justify-full pt-18 md:pt-18 pb-10 w-full overflow-hidden">

      {/* JUDUL */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Stack</h2>
        <p className={`${theme.textMuted} max-w-2xl mx-auto px-4`}>
          The tools and technologies I use to extract insights and build predictive models.
        </p>
      </div>

      {/* Kontainer Marquee */}
      <div className="flex flex-col gap-8 md:gap-14 w-full mask-fade-edges pt-4 pb-10">

        {/* Row 1 - Ditambah inline style untuk memperlambat (default biasanya 20s-30s) */}
        <div 
          className="flex w-max animate-scroll-right gap-6 md:gap-10 pl-6 md:pl-10"
          style={{ animationDuration: '65s' }}
        >
          {[...row1, ...row1].map((item, i) => (
            <SkillBox key={`r1-${i}`} item={item} />
          ))}
        </div>

        {/* Row 2 - Dibuat sedikit berbeda durasinya (70s) agar tidak terlalu simetris/monoton */}
        <div 
          className="flex w-max animate-scroll-left gap-6 md:gap-10 pl-6 md:pl-10"
          style={{ animationDuration: '70s' }}
        >
          {[...row2, ...row2].map((item, i) => (
            <SkillBox key={`r2-${i}`} item={item} />
          ))}
        </div>

      </div>

    </section>
  );
}