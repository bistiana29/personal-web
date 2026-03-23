import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import iahvisionImg from '../assets/iahvision.png';

export default function Projects({ theme, isDarkMode }) {
  
  const myProjects = [
    { 
      title: 'IAH Vision', 
      image: iahvisionImg,
      tag: 'Computer Vision',
      github: 'https://github.com/bistiana29/IAH-VISION', 
      desc: 'Built a Random Forest model to predict telecom customer churn with 89% accuracy, identifying key risk factors.' 
    },
    { 
      title: 'E-Commerce Sales Dashboard', 
      image: iahvisionImg,
      tag: 'Data Viz', 
      desc: 'Developed an interactive PowerBI dashboard for regional managers to track KPIs, resulting in a 15% improvement in reporting efficiency.' 
    },
    { 
      title: 'Product Recommendation Engine', 
      image: iahvisionImg,
      tag: 'NLP & RecSys', 
      desc: 'Implemented a content-based filtering system using TF-IDF and Cosine Similarity to recommend related articles.' 
    },
    { 
      title: 'Extreme Weather Risk Mapping', 
      image: iahvisionImg,
      tag: 'Geospatial Analysis', 
      desc: 'Researched and developed spatio-temporal risk mapping of extreme weather events in Indonesia using multi-source meteorological data.' 
    },
    { 
      title: 'LLM Financial Assistant', 
      image: iahvisionImg,
      tag: 'Generative AI', 
      desc: 'Developing an LLM-based assistant accessible via WhatsApp and web to help entrepreneurs and investors manage assets.' 
    },
    { 
      title: 'Predictive Maintenance Model', 
      image: iahvisionImg,
      tag: 'Time Series', 
      desc: 'Designed an anomaly detection model using XGBoost to predict equipment failures, reducing maintenance downtime by 20%.' 
    }
  ];

  return (
    <section id="projects" className="min-h-[100svh] flex flex-col justify-start pt-10 md:pt-10 pb-10 w-full">

      {/* HEADER */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-center md:text-left w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
          <p className={`text-sm md:text-base ${theme.textMuted}`}>
            Applying data science to solve real business problems.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProjects.map((project, i) => (
          <div 
            key={i} 
            className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
              isDarkMode 
                ? 'bg-[#06202B]/80 border-[#077A7D]/40 hover:border-[#FE7F2D] hover:shadow-[#FE7F2D]/10' 
                : 'bg-white/80 border-[#7AE2CF] hover:border-[#FE7F2D] hover:shadow-[#FE7F2D]/20'
            }`}
          >
            
            {/* IMAGE AREA */}
            <div className={`h-40 w-full overflow-hidden ${
              isDarkMode 
                ? 'bg-[#215E61]/30' 
                : 'bg-[#7AE2CF]/10'
            }`}>
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* CONTENT */}
            <div className="p-4 md:p-5 flex flex-col flex-grow">
              
              <h3 className={`text-lg md:text-xl font-bold mb-2 leading-tight ${theme.accent}`}>
                {project.title}
              </h3>

              <p className={`text-xs md:text-sm flex-grow leading-relaxed line-clamp-3 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {project.desc}
              </p>
              
              <a 
                href={project.github} target="_blank" rel="noopener noreferrer"
                className={`mt-5 font-bold text-xs md:text-sm self-start flex items-center gap-1.5 transition-colors ${
                  isDarkMode 
                    ? 'text-[#7AE2CF] hover:text-[#FE7F2D]' 
                    : 'text-[#077A7D] hover:text-[#FE7F2D]'
                }`}
              >
                View Details on GitHub 
                <ExternalLink size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

            </div>
            
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-8 md:mt-10 flex justify-center w-full">
        <a 
          href="https://github.com/bistiana29" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-lg hover:-translate-y-1 ${
            isDarkMode 
              ? 'bg-[#215E61] text-[#F5EEDD] hover:bg-[#FE7F2D]' 
              : 'bg-[#077A7D] text-[#F5EEDD] hover:bg-[#FE7F2D]'
          }`}
        >
          View More Projects on GitHub <ArrowRight size={16} />
        </a>
      </div>

    </section>
  );
}