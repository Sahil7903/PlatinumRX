import React, { useState } from 'react';
import { 
  Database, 
  FileSpreadsheet, 
  Code2, 
  ChevronRight, 
  Terminal, 
  Table, 
  CheckCircle2,
  ExternalLink,
  Github,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SQL_SOLUTIONS = [
  {
    title: "Hotel: Last Booked Room",
    query: "SELECT user_id, room_no\nFROM (\n    SELECT user_id, room_no, \n           ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY booking_date DESC) as rn\n    FROM bookings\n) t\nWHERE rn = 1;",
    explanation: "Uses ROW_NUMBER() window function to rank bookings by date for each user and selects the top rank."
  },
  {
    title: "Hotel: Nov 2021 Billing",
    query: "SELECT b.booking_id, SUM(bc.item_quantity * i.item_rate) as total_billing_amount\nFROM bookings b\nJOIN booking_commercials bc ON b.booking_id = bc.booking_id\nJOIN items i ON bc.item_id = i.item_id\nWHERE b.booking_date >= '2021-11-01' AND b.booking_date < '2021-12-01'\nGROUP BY b.booking_id;",
    explanation: "Joins bookings with commercials and items to calculate total bill per booking within the specified date range."
  },
  {
    title: "Clinic: Revenue by Channel",
    query: "SELECT sales_channel, SUM(amount) as total_revenue\nFROM clinic_sales\nWHERE strftime('%Y', datetime) = '2021'\nGROUP BY sales_channel;",
    explanation: "Aggregates sales amounts grouped by the sales channel for the year 2021."
  }
];

const PYTHON_SOLUTIONS = [
  {
    title: "Time Converter",
    code: "def convert_minutes(total_minutes):\n    hours = total_minutes // 60\n    minutes = total_minutes % 60\n    return f\"{hours} hrs {minutes} minutes\"",
    example: "130 -> '2 hrs 10 minutes'"
  },
  {
    title: "Remove Duplicates",
    code: "def remove_duplicates(input_string):\n    unique_string = \"\"\n    for char in input_string:\n        if char not in unique_string:\n            unique_string += char\n    return unique_string",
    example: "'hello' -> 'helo'"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'sql' | 'spreadsheet' | 'python'>('sql');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Database size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">PlatinumRx Portfolio</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Data Analyst Assignment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Github size={20} />
            </a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
              Download Full Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <aside className="lg:col-span-3">
            <nav className="space-y-2">
              <NavButton 
                active={activeTab === 'sql'} 
                onClick={() => setActiveTab('sql')}
                icon={<Database size={18} />}
                label="SQL Proficiency"
              />
              <NavButton 
                active={activeTab === 'spreadsheet'} 
                onClick={() => setActiveTab('spreadsheet')}
                icon={<FileSpreadsheet size={18} />}
                label="Spreadsheets"
              />
              <NavButton 
                active={activeTab === 'python'} 
                onClick={() => setActiveTab('python')}
                icon={<Code2 size={18} />}
                label="Python Scripts"
              />
            </nav>

            <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Info size={16} />
                <span className="text-sm font-bold">Project Info</span>
              </div>
              <p className="text-xs text-blue-600/80 leading-relaxed">
                This portfolio demonstrates advanced data manipulation across SQL, Excel, and Python environments.
              </p>
            </div>
          </aside>

          <section className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'sql' && (
                <motion.div 
                  key="sql"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">SQL Solutions</h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">8 Queries</span>
                  </div>
                  
                  {SQL_SOLUTIONS.map((sol, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Table size={16} className="text-blue-500" />
                          {sol.title}
                        </h3>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          Copy Query <ChevronRight size={12} />
                        </button>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                          <pre>{sol.query}</pre>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-bold text-slate-900">Logic:</span> {sol.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'spreadsheet' && (
                <motion.div 
                  key="spreadsheet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900">Spreadsheet Analysis</h2>
                  
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8 shadow-sm">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                          <FileSpreadsheet size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Data Population</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Populating <code className="bg-slate-100 px-1 rounded text-pink-600">ticket_created_at</code> using cross-sheet lookups.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Formula (INDEX-MATCH)</p>
                          <code className="text-sm text-slate-800 break-all">
                            =INDEX('ticket'!B:B, MATCH(A2, 'ticket'!E:E, 0))
                          </code>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                          <Terminal size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Time Comparison</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Identifying tickets created and closed within the same hour/day.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Same Hour Logic</p>
                          <code className="text-sm text-slate-800 break-all">
                            =AND(INT(B2)=INT(C2), HOUR(B2)=HOUR(C2))
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4">Outlet-wise Summary</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                            <tr>
                              <th className="px-4 py-3">Outlet ID</th>
                              <th className="px-4 py-3">Same Day</th>
                              <th className="px-4 py-3">Same Hour</th>
                              <th className="px-4 py-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <TableRow id="wrqy-juv-978" day="45" hour="12" />
                            <TableRow id="8woh-k3u-23b" day="32" hour="8" />
                            <TableRow id="pqlm-nxz-112" day="18" hour="3" />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'python' && (
                <motion.div 
                  key="python"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900">Python Logic</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {PYTHON_SOLUTIONS.map((sol, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-slate-900">{sol.title}</h3>
                          <CheckCircle2 size={18} className="text-green-500" />
                        </div>
                        <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 mb-4 flex-grow">
                          <pre>{sol.code}</pre>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Example Output:</span>
                          <span className="font-bold text-blue-600">{sol.example}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500">© 2026 PlatinumRx Assignment Portfolio. Built with React & Tailwind.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        active 
          ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <span className={active ? 'text-blue-600' : 'text-slate-400'}>{icon}</span>
      {label}
    </button>
  );
}

function TableRow({ id, day, hour }: { id: string, day: string, hour: string }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-4 py-4 font-mono text-xs text-slate-500">{id}</td>
      <td className="px-4 py-4 font-bold text-slate-700">{day}</td>
      <td className="px-4 py-4 font-bold text-slate-700">{hour}</td>
      <td className="px-4 py-4">
        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase tracking-wider">Active</span>
      </td>
    </tr>
  );
}
