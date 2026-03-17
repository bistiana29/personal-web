import React from 'react';
import { Terminal } from 'lucide-react';

export default function Skills({ theme, isDarkMode }) {
  return (
    <section id="skills" className="min-h-[100svh] flex flex-col justify-center py-24 border-t border-[#077A7D]/20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Stack</h2>
        <p className={`${theme.textMuted} max-w-2xl mx-auto`}>The tools and technologies I use to extract insights and build predictive models.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { category: 'Languages', items: ['Python', 'SQL', 'R', 'Bash'] },
          { category: 'Machine Learning', items: ['Scikit-Learn', 'TensorFlow', 'XGBoost', 'PyTorch'] },
          { category: 'Data Viz & BI', items: ['Tableau', 'PowerBI', 'Matplotlib', 'Seaborn'] },
          { category: 'Tools & Cloud', items: ['Git', 'Docker', 'AWS (S3/EC2)', 'Jupyter'] }
        ].map((skillGrp, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${theme.card} transition-transform hover:-translate-y-1`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#06202B]' : 'bg-[#F5EEDD]'}`}>
              <Terminal size={20} className={theme.accent} />
            </div>
            <h3 className="text-lg font-bold mb-4">{skillGrp.category}</h3>
            <ul className="space-y-2">
              {skillGrp.items.map((item, j) => (
                <li key={j} className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-[#7AE2CF]' : 'bg-[#077A7D]'}`}></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}