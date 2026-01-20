
import React, { useState } from 'react';
import { LineType, ProductionResult } from './types';
import TenekeLine from './components/TenekeLine';
import VakumLine from './components/VakumLine';
import YagliLine from './components/YagliLine';
import KuruSeleLine from './components/KuruSeleLine';
import ResultDisplay from './components/ResultDisplay';
import ReverseCalculator from './components/ReverseCalculator';
import CountryGuide from './components/CountryGuide';

const App: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [result, setResult] = useState<ProductionResult | null>(null);

  const reset = () => {
    setSelectedLine(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      {/* Header */}
      <header className="bg-emerald-800 text-white shadow-xl p-8 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white p-3 rounded-2xl shadow-inner">
               <i className="fa-solid fa-industry text-emerald-800 text-3xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Üretim Asistanı</h1>
              <p className="text-emerald-100 text-sm font-medium opacity-90 uppercase tracking-widest">Operasyonel Verimlilik</p>
            </div>
          </div>
          {selectedLine && (
            <button 
              onClick={reset}
              className="bg-emerald-700 hover:bg-emerald-600 transition-all px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg active:scale-95"
            >
              <i className="fa-solid fa-rotate-left"></i> HATTI DEĞİŞTİR
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {!selectedLine ? (
          <div className="space-y-12">
            <div className="text-center mb-8">
               <h2 className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Üretim Hattı Seçiniz</h2>
               <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <LineCard 
                title="800g Teneke" 
                description="90-190 S/s Yüksek Kapasite Paketleme"
                icon="fa-box-open"
                onClick={() => setSelectedLine(LineType.TENEKE_800G)}
              />
              <LineCard 
                title="Vakum Hattı" 
                description="500g/800g Vakumlu Ambalaj Çözümleri"
                icon="fa-flask-vial"
                onClick={() => setSelectedLine(LineType.VAKUM)}
              />
              <LineCard 
                title="10 kg Yağlı" 
                description="Endüstriyel 4 Ton / Saat Dolum Hattı"
                icon="fa-oil-can"
                onClick={() => setSelectedLine(LineType.YAGLI_10KG)}
              />
              <LineCard 
                title="Kuru Sele" 
                description="800g/400g Özel Kurutma & Paketleme"
                icon="fa-sun"
                onClick={() => setSelectedLine(LineType.KURU_SELE)}
              />
            </div>
            
            <div className="pt-8">
               <ReverseCalculator />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {selectedLine === LineType.TENEKE_800G && <TenekeLine onCalculate={setResult} />}
            {selectedLine === LineType.VAKUM && <VakumLine onCalculate={setResult} />}
            {selectedLine === LineType.YAGLI_10KG && <YagliLine onCalculate={setResult} />}
            {selectedLine === LineType.KURU_SELE && <KuruSeleLine onCalculate={setResult} />}

            {result && <ResultDisplay result={result} lineType={selectedLine} />}
          </div>
        )}
      </main>

      <CountryGuide />

      <footer className="max-w-6xl mx-auto px-4 mt-20 pb-8 text-center border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Üretim Takip Sistemi
        </p>
      </footer>
    </div>
  );
};

interface LineCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

const LineCard: React.FC<LineCardProps> = ({ title, description, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-emerald-500 hover:shadow-2xl transition-all text-left group flex flex-col items-center text-center md:items-start md:text-left h-full"
  >
    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 group-hover:rotate-6">
      <i className={`fa-solid ${icon} text-3xl text-emerald-700 group-hover:text-white`}></i>
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 text-xs font-medium leading-relaxed">{description}</p>
    <div className="mt-auto pt-6 flex items-center gap-2 text-emerald-600 font-bold text-xs group-hover:translate-x-2 transition-transform">
       SEÇİM YAP <i className="fa-solid fa-arrow-right"></i>
    </div>
  </button>
);

export default App;
