
import React from 'react';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'Booking' | 'Admin';
  onTabChange: (tab: 'Booking' | 'Admin') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl">
            <button
              onClick={() => onTabChange('Booking')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'Booking' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Public Booking
            </button>
            <button
              onClick={() => onTabChange('Admin')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'Admin' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Admin Portal
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/+1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-all border border-emerald-200/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Support
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Logo className="justify-center mb-4" />
          <p className="text-slate-400 text-sm">© 2024 Dawa Healthcare. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-6">
            <span className="text-slate-400 hover:text-emerald-600 cursor-pointer text-xs font-bold uppercase tracking-widest transition-colors">Privacy</span>
            <span className="text-slate-400 hover:text-emerald-600 cursor-pointer text-xs font-bold uppercase tracking-widest transition-colors">Terms</span>
            <span className="text-slate-400 hover:text-emerald-600 cursor-pointer text-xs font-bold uppercase tracking-widest transition-colors">Help</span>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 glass border border-white/50 px-4 py-3 rounded-2xl shadow-2xl flex gap-8 z-50">
        <button 
          onClick={() => onTabChange('Booking')}
          className={`flex flex-col items-center ${activeTab === 'Booking' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Book</span>
        </button>
        <button 
          onClick={() => onTabChange('Admin')}
          className={`flex flex-col items-center ${activeTab === 'Admin' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Manage</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
