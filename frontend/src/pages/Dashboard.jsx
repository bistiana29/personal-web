import React, { useState, useEffect } from 'react';
import { BarChart3, LineChart, Users, Eye, Terminal, MessageSquare, Send, Loader2 } from 'lucide-react';
import { Chart } from "react-google-charts";
import { useLocation } from 'react-router-dom';

export default function Dashboard({ theme, isDarkMode }) {
  
  const API_BASE_URL = 'http://localhost:8000';
  const location = useLocation();

  const [analytics, setAnalytics] = useState({
    total_views: 0,
    unique_visitors: 0,
    active_now: 0,
    utm_stats: [],
    page_flows: [] 
  });
  const [guestbook, setGuestbook] = useState([]);
  
  // State form
  const [guestName, setGuestName] = useState(''); // State baru untuk nama
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const trackVisit = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get('utm_source') || 'Direct / Unknown';
      const currentPage = location.pathname;
      const previousPage = localStorage.getItem('last_visited_page');

      if (previousPage !== currentPage) {
         await fetch(`${API_BASE_URL}/track`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ 
             utm_source: utm_source,
             current_page: currentPage, 
             previous_page: previousPage 
           })
         });
         localStorage.setItem('last_visited_page', currentPage);
      }
      fetchDashboardData(); 
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  };

  const fetchDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const resAnalytics = await fetch(`${API_BASE_URL}/analytics`);
      if (resAnalytics.ok) {
        const dataAnalytics = await resAnalytics.json();
        setAnalytics(dataAnalytics);
      }

      const resGuestbook = await fetch(`${API_BASE_URL}/guestbook`);
      if (resGuestbook.ok) {
        const dataGuestbook = await resGuestbook.json();
        setGuestbook(dataGuestbook);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    trackVisit(); 
    const intervalId = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(intervalId);
  }, [location.pathname]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Mengirimkan nama, jika kosong fallback ke Anonymous
        body: JSON.stringify({ name: guestName.trim() || "Anonymous", message: newMessage })
      });

      setNewMessage(''); 
      fetchDashboardData(); 
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getUtmColor = (source) => {
    const s = source.toLowerCase();
    if (s.includes('linkedin')) return 'bg-[#0077b5]';
    if (s.includes('github')) return 'bg-[#333]';
    if (s.includes('instagram')) return 'bg-[#E1306C]';
    return 'bg-[#077A7D]'; 
  };

  // === ALGORITMA PENGHAPUS SIKLUS (Anti-Crash Sankey) ===
  const buildAcyclicGraph = (edges) => {
    // Urutkan berdasarkan bobot tertinggi (prioritas)
    const sorted = [...edges].sort((a, b) => b[2] - a[2]);
    const validEdges = [];
    const adj = {};

    const hasCycle = (node, visited, stack) => {
      visited.add(node);
      stack.add(node);
      for (let neighbor of (adj[node] || [])) {
        if (!visited.has(neighbor)) {
          if (hasCycle(neighbor, visited, stack)) return true;
        } else if (stack.has(neighbor)) {
          return true;
        }
      }
      stack.delete(node);
      return false;
    };

    for (let [from, to, weight] of sorted) {
      if (!adj[from]) adj[from] = [];
      adj[from].push(to);

      const visited = new Set();
      const stack = new Set();
      
      // Jika jalur ini bikin cycle (muter balik), jangan dimasukkan ke grafik
      if (hasCycle(from, visited, stack)) {
        adj[from].pop(); 
      } else {
        validEdges.push([from, to, weight]);
      }
    }
    return validEdges;
  };

  const formatPageName = (path) => path === '/' ? '/aboutme' : path;

  // Terapkan algoritma pada data dari DB
  const rawFlows = (analytics.page_flows || []).map(f => [formatPageName(f[0]), formatPageName(f[1]), f[2]]);
  const safeFlows = buildAcyclicGraph(rawFlows);

  const sankeyHeader = ["From", "To", "Weight"];
  const sankeyData = safeFlows.length > 0 
    ? [sankeyHeader, ...safeFlows] 
    : [sankeyHeader, ["Entry", location.pathname || "/dashboard", 1]];

  const sankeyOptions = {
    sankey: {
      node: {
        colors: ['#FE7F2D', '#7AE2CF', '#077A7D', '#215E61'], 
        nodePadding: 30,
        width: 15,
        label: { fontName: 'Inter, sans-serif', fontSize: 14, color: isDarkMode ? '#F5EEDD' : '#06202B', bold: true }
      },
      link: { colorMode: 'gradient', colors: ['#FE7F2D', '#7AE2CF', '#077A7D', '#215E61'] }
    },
    backgroundColor: 'transparent', 
  };

  return (
    <section id="dashboard" className="min-h-[100svh] flex flex-col justify-start pt-10 md:pt-10 pb-10 w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
          Guest Analytics Dashboard
          {isLoadingData && <Loader2 size={24} className={`animate-spin ${theme.accent}`} />}
        </h2>
        <p className={theme.textMuted}>Real-time data fetched directly from my FastAPI backend and PostgreSQL database.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* KPI Cards */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Page Views', val: analytics.total_views, icon: Eye, color: 'text-[#FE7F2D]' },
             { label: 'Unique Visitors', val: analytics.unique_visitors, icon: Users, color: 'text-[#7AE2CF]' },
             { label: 'Active Now (5m)', val: analytics.active_now, icon: Terminal, color: 'text-[#FE7F2D]', ping: analytics.active_now > 0 },
             { label: 'Avg Session (m)', val: '2.4', icon: BarChart3, color: 'text-[#077A7D]' }, 
           ].map((stat, i) => (
             <div key={i} className={`p-5 rounded-2xl border ${theme.card} transition-all hover:border-[#FE7F2D]/50`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${theme.textMuted}`}>{stat.label}</span>
                  <div className="relative">
                    {stat.ping && <span className="animate-ping absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-[#FE7F2D] opacity-75"></span>}
                    <stat.icon size={18} className={stat.color} />
                  </div>
                </div>
                <div className="text-3xl font-bold">
                  {stat.val?.toLocaleString() ?? '0'}
                </div>
             </div>
           ))}
        </div>

        {/* UTM Source Chart */}
        <div className={`lg:col-span-4 p-6 rounded-2xl border flex flex-col ${theme.card}`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={18} className={theme.accent} /> Acquisition (UTM)
          </h3>
          <div className="flex-grow flex flex-col justify-center space-y-6">
            {analytics.utm_stats?.length > 0 ? (
              analytics.utm_stats.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                    <span>{item.source}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className={`h-2.5 w-full rounded-full ${isDarkMode ? 'bg-[#06202B]' : 'bg-[#F5EEDD]'}`}>
                    <div className={`h-full rounded-full ${getUtmColor(item.source)} transition-all duration-1000`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-sm text-center italic ${theme.textMuted}`}>Waiting for traffic data...</p>
            )}
          </div>
        </div>

        {/* Google Sankey Flow Diagram */}
        <div className={`lg:col-span-8 p-6 rounded-2xl border overflow-x-auto ${theme.card}`}>
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <LineChart size={18} className={theme.accent} /> User Journey Flow
          </h3>
          <div className="min-w-[600px] h-[300px] mt-4">
             {isLoadingData && safeFlows.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center italic text-sm text-slate-500">Loading flow data...</div>
             ) : (
                <Chart chartType="Sankey" width="100%" height="100%" data={sankeyData} options={sankeyOptions} />
             )}
          </div>
        </div>

        {/* Guestbook Section */}
        <div className={`lg:col-span-12 mt-6 p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row gap-8 ${theme.card}`}>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <MessageSquare size={20} className={theme.accent} /> Guestbook
            </h3>
            <p className={`text-sm mb-6 ${theme.textMuted}`}>Leave a trace! What do you think about the dashboard?</p>
            
            {/* TAMBAHAN: Kotak Input Nama */}
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                disabled={isSubmitting}
                maxLength={20}
                placeholder="Send as... (Optional)" 
                className={`w-full md:w-1/2 border rounded-xl py-2 pl-4 focus:outline-none focus:ring-1 focus:ring-[#FE7F2D] transition-all disabled:opacity-50 text-sm ${theme.inputBg} ${theme.inputBorder}`}
              />
              <div className="relative flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isSubmitting}
                  placeholder="Write a message..." 
                  className={`w-full border rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#FE7F2D] transition-all disabled:opacity-50 ${theme.inputBg} ${theme.inputBorder}`}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isSubmitting || !newMessage.trim()}
                  className={`absolute right-1.5 top-1.5 bottom-1.5 aspect-square rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 ${theme.accentBg} text-[#F5EEDD] hover:opacity-80`}
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-1" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
             {guestbook?.length > 0 ? (
               guestbook.map((c, i) => (
                 <div key={i} className={`p-3 rounded-lg border transition-all hover:-translate-y-0.5 ${isDarkMode ? 'bg-[#06202B]/50 border-[#077A7D]/30' : 'bg-white/50 border-[#7AE2CF]/30'}`}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-sm">{c.name}</span>
                      <span className={`text-xs font-mono ${theme.textMuted}`}>{formatTimeAgo(c.time)}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{c.message}</p>
                 </div>
               ))
             ) : (
               <div className={`h-full flex items-center justify-center italic text-sm ${theme.textMuted}`}>
                 No messages yet. Be the first to write!
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}