import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import logo from './assets/logo-theme-icon.svg';

function App() {
  return (
    <main className="min-h-screen font-sans selection:bg-brand-100 selection:text-brand-900 bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Typoly Logo" className="h-[22px] w-auto" />
            <span className="text-sm font-semibold text-slate-900 tracking-tight">Typoly</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[13px] font-medium">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="https://github.com/hengvvang/typoly/wiki" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">Docs</a>
            <a href="https://github.com/hengvvang/typoly" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </nav>

      <div id="hero">
        <Hero />
      </div>
      <div id="features">
        <Features />
      </div>
      <Footer />
    </main>
  );
}

export default App;
