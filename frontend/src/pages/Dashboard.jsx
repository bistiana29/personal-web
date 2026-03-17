import React from 'react';
import { BarChart3, LineChart, Users, Eye, Terminal, MessageSquare, Send } from 'lucide-react';

export default function Dashboard({ theme, isDarkMode }) {
  return (
    <section id="dashboard" className="py-24 border-t border-[#077A7D]/20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio Analytics Dashboard</h2>
        <p className={theme.textMuted}>A live demonstration of my data tracking capabilities. This is real-time (mocked) data of how users interact with this portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* KPI Cards */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Page Views', val: '1,284', icon: Eye, color: 'text-[#FE7F2D]' },
             { label: 'Unique Visitors', val: '842', icon: Users, color: 'text-[#7AE2CF]' },
             { label: 'Avg Session (m)', val: '2.4', icon: BarChart3, color: 'text-[#077A7D]' },
             { label: 'Active Now', val: '5', icon: Terminal, color: 'text-[#FE7F2D]', ping: true },
           ].map((stat, i) => (
             <div key={i} className={`p-5 rounded-2xl border ${theme.card}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${theme.textMuted}`}>{stat.label}</span>
                  <div className="relative">
                    {stat.ping && <span className="animate-ping absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-[#FE7F2D] opacity-75"></span>}
                    <stat.icon size={18} className={stat.color} />
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.val}</div>
             </div>
           ))}
        </div>

        {/* UTM Source Chart */}
        <div className={`lg:col-span-4 p-6 rounded-2xl border flex flex-col ${theme.card}`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={18} className={theme.accent} /> Acquisition (UTM Source)
          </h3>
          <div className="flex-grow flex flex-col justify-center space-y-6">
            {[
              { source: 'LinkedIn', pct: 45, color: 'bg-[#0077b5]' },
              { source: 'GitHub', pct: 30, color: 'bg-[#333]' },
              { source: 'Direct / Unknown', pct: 15, color: 'bg-[#077A7D]' },
              { source: 'Instagram', pct: 10, color: 'bg-[#E1306C]' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span>{item.source}</span>
                  <span>{item.pct}%</span>
                </div>
                <div className={`h-2.5 w-full rounded-full ${isDarkMode ? 'bg-[#06202B]' : 'bg-[#F5EEDD]'}`}>
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sankey Flow Diagram (Simulated via SVG) */}
        <div className={`lg:col-span-8 p-6 rounded-2xl border overflow-x-auto ${theme.card}`}>
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <LineChart size={18} className={theme.accent} /> User Journey Flow (Sankey)
          </h3>
          <div className="min-w-[600px] h-[250px] relative mt-4">
             {/* SVG Sankey Lines */}
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7AE2CF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FE7F2D" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="gradDrop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7AE2CF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path d="M 120 75 C 250 75, 250 50, 380 50" fill="none" stroke="url(#grad1)" strokeWidth="35" />
                <path d="M 120 75 C 250 75, 250 150, 380 150" fill="none" stroke="url(#grad1)" strokeWidth="15" />
                <path d="M 120 75 C 180 75, 200 220, 200 250" fill="none" stroke="url(#gradDrop)" strokeWidth="10" />
                <path d="M 420 50 C 550 50, 550 100, 680 100" fill="none" stroke="url(#grad1)" strokeWidth="25" />
                <path d="M 420 50 C 480 50, 500 220, 500 250" fill="none" stroke="url(#gradDrop)" strokeWidth="10" />
             </svg>

             {/* HTML Nodes overlay */}
             <div className="absolute inset-0 flex justify-between items-start pt-8 pb-10">
                <div className="w-[120px] flex flex-col items-center">
                   <div className={`px-4 py-2 rounded shadow-md z-10 text-sm font-bold border-l-4 border-[#7AE2CF] ${isDarkMode ? 'bg-[#06202B] text-white' : 'bg-white text-[#06202B]'}`}>
                     Landing (100%)
                   </div>
                </div>
                <div className="w-[120px] flex flex-col justify-between h-full">
                   <div className={`px-4 py-2 rounded shadow-md z-10 text-sm font-bold border-l-4 border-[#FE7F2D] ${isDarkMode ? 'bg-[#06202B] text-white' : 'bg-white text-[#06202B]'} -mt-6`}>
                     Projects (60%)
                   </div>
                   <div className={`px-4 py-2 rounded shadow-md z-10 text-sm font-bold border-l-4 border-[#077A7D] ${isDarkMode ? 'bg-[#06202B] text-white' : 'bg-white text-[#06202B]'} mt-10`}>
                     Skills (25%)
                   </div>
                   <div className="text-xs text-red-400 mt-auto opacity-70">Dropoff (15%)</div>
                </div>
                <div className="w-[120px] flex flex-col items-center h-full pt-2">
                   <div className={`px-4 py-2 rounded shadow-md z-10 text-sm font-bold border-l-4 border-[#FE7F2D] ${isDarkMode ? 'bg-[#06202B] text-white' : 'bg-white text-[#06202B]'}`}>
                     Dashboard (45%)
                   </div>
                   <div className="text-xs text-red-400 mt-auto opacity-70">Dropoff (40%)</div>
                </div>
             </div>
          </div>
        </div>

        {/* Guestbook Section */}
        <div className={`lg:col-span-12 mt-6 p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row gap-8 ${theme.card}`}>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <MessageSquare size={20} className={theme.accent} /> Guestbook
            </h3>
            <p className={`text-sm mb-6 ${theme.textMuted}`}>Leave a trace! What do you think about the dashboard?</p>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Write a message..." 
                className={`w-full border rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#FE7F2D] transition-all ${theme.inputBg} ${theme.inputBorder}`}
              />
              <button className={`absolute right-1.5 top-1.5 bottom-1.5 aspect-square rounded-lg flex items-center justify-center transition-colors ${theme.accentBg} text-[#F5EEDD] hover:opacity-80`}>
                <Send size={16} className="ml-1" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-2">
             {[
               { name: 'HR Recruiter', msg: 'Love the data-driven approach to your portfolio.', time: '1h ago' },
               { name: 'Fellow Student', msg: 'How did you build the Sankey chart?', time: '3h ago' },
               { name: 'Anonymous', msg: 'The color palette is very aesthetically pleasing.', time: '1d ago' },
             ].map((c, i) => (
               <div key={i} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-[#06202B]/50 border-[#077A7D]/30' : 'bg-white/50 border-[#7AE2CF]/30'}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-sm">{c.name}</span>
                    <span className={`text-xs ${theme.textMuted}`}>{c.time}</span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{c.msg}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}