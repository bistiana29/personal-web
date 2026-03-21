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

  // ROW 1 (Bergerak ke Kanan)
  const row1 = [
    { name: 'Python', initial: 'Py', imgSrc: pythonImg },
    { name: 'Pandas', initial: 'Pd', imgSrc: pandasImg },
    { name: 'PostgreSQL', initial: 'Pg', imgSrc: postgresqlImg },
    { name: 'Matplotlib', initial: 'Mp', imgSrc: matplotlibImg },
    { name: 'Seaborn', initial: 'Sb', imgSrc: seabornImg },
    { name: 'Plotly', initial: 'Plt', imgSrc: plotlyImg },
    { name: 'Scikit-Learn', initial: 'Sk', imgSrc: scikitleanrImg },
    { name: 'TensorFlow', initial: 'Tf', imgSrc: tensorflowImg },
  ];

  // ROW 2 (Bergerak ke Kiri)
  const row2 = [
    { name: 'Jupyter', initial: 'Jp', imgSrc: jupyterImg },
    { name: 'Anaconda', initial: 'An', imgSrc: anacondaImg },
    { name: 'Streamlit', initial: 'St', imgSrc: streamlitImg },
    { name: 'Tableau', initial: 'Tb', imgSrc: tableauImg },
    { name: 'PowerBI', initial: 'Pb', imgSrc: powerbiImg },
    { name: 'Looker Studio', initial: 'Ls', imgSrc: lookerstudioImg },
    { name: 'Grafana', initial: 'Gr', imgSrc: grafanaImg },
    { name: 'Fast API', initial: 'Fa', imgSrc: fastapiImg },
    { name: 'Github', initial: 'Gh', imgSrc: githubImg },
    { name: 'Docker', initial: 'Dk', imgSrc: dockerImg },
  ];

  // Komponen Kotak Skill (Diperbesar ukurannya)
  const SkillBox = ({ item }) => {
    return (
      <div className={`group flex flex-col items-center justify-center flex-shrink-0 w-32 h-32 md:w-44 md:h-44 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${isDarkMode
        ? 'bg-[#06202B]/80 border-[#077A7D]/40 hover:border-[#FE7F2D] hover:shadow-[#FE7F2D]/10'
        : 'bg-white/80 border-[#7AE2CF] hover:border-[#FE7F2D] hover:shadow-[#FE7F2D]/20'
        }`}>

        {/* LOGO AREA - Diperbesar */}
        <div className="mb-4 h-12 w-12 md:h-16 md:w-16 flex items-center justify-center">
          {item.imgSrc ? (
            <img src={item.imgSrc} alt={item.name} className="object-contain w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          ) : (
            <div className={`w-full h-full rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl transition-colors duration-300 shadow-inner ${isDarkMode ? 'bg-[#215E61]/50 text-[#7AE2CF] group-hover:bg-[#FE7F2D] group-hover:text-[#F5EEDD]' : 'bg-[#7AE2CF]/30 text-[#077A7D] group-hover:bg-[#FE7F2D] group-hover:text-[#F5EEDD]'
              }`}>
              {item.initial}
            </div>
          )}
        </div>

        {/* NAMA SKILL - Diperbesar sedikit */}
        <span className={`text-sm md:text-base font-bold text-center px-2 transition-colors duration-300 ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-[#06202B]'
          }`}>
          {item.name}
        </span>
      </div>
    );
  };

  return (
    // overflow-hidden sangat penting di sini agar logo yang berjalan tidak membuat layar bisa di-scroll ke samping
    <section id="skills" className="min-h-[100svh] flex flex-col pt-24 md:pt-32 pb-16 border-t border-[#077A7D]/20 w-full overflow-hidden">

      {/* JUDUL - Ditarik ke atas */}
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Stack</h2>
        <p className={`${theme.textMuted} max-w-2xl mx-auto px-4`}>
          The tools and technologies I use to extract insights and build predictive models.
        </p>
      </div>

      {/* Kontainer Marquee dengan Efek Mask (Fade di ujung) */}
      <div className="flex flex-col gap-6 md:gap-10 w-full mask-fade-edges pb-10">

        {/* Row 1: Bergerak ke Kanan (scroll-right) */}
        <div className="flex w-max animate-scroll-right gap-6 md:gap-10 pl-6 md:pl-10">
          {/* Array diduplikasi 2x agar animasinya tidak putus (seamless loop) */}
          {[...row1, ...row1].map((item, i) => (
            <SkillBox key={`r1-${i}`} item={item} />
          ))}
        </div>

        {/* Row 2: Bergerak ke Kiri (scroll-left) */}
        <div className="flex w-max animate-scroll-left gap-6 md:gap-10 pl-6 md:pl-10">
          {[...row2, ...row2].map((item, i) => (
            <SkillBox key={`r2-${i}`} item={item} />
          ))}
        </div>

      </div>

    </section>
  );
}