import React from 'react';
import { BarChart3, Database, Users, ExternalLink } from 'lucide-react';

export default function Projects({ theme, isDarkMode }) {
  return (
    <section id="projects" className="py-24 border-t border-[#077A7D]/20">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className={theme.textMuted}>Applying data science to solve real business problems.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Customer Churn Prediction', icon: Users, tag: 'Classification', desc: 'Built a Random Forest model to predict telecom customer churn with 89% accuracy, identifying key risk factors.' },
          { title: 'E-Commerce Sales Dashboard', icon: BarChart3, tag: 'Data Viz', desc: 'Developed an interactive PowerBI dashboard for regional managers to track KPIs, resulting in a 15% improvement in reporting efficiency.' },
          { title: 'Product Recommendation Engine', icon: Database, tag: 'NLP & RecSys', desc: 'Implemented a content-based filtering system using TF-IDF and Cosine Similarity to recommend related articles.' },
        ].map((project, i) => (
          <div key={i} className={`group flex flex-col rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:border-[#FE7F2D]/50 ${theme.card}`}>
            <div className={`h-40 w-full flex items-center justify-center ${isDarkMode ? 'bg-[#06202B]' : 'bg-[#F5EEDD]'}`}>
               <project.icon className={`w-16 h-16 ${isDarkMode ? 'text-[#215E61]' : 'text-[#7AE2CF]'}`} />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${theme.accent}`}>{project.tag}</span>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className={`text-sm flex-grow leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {project.desc}
              </p>
              <button className={`mt-6 font-semibold text-sm self-start flex items-center gap-2 hover:${theme.accent} transition-colors`}>
                Read Case Study <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}