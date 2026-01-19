
import React, { useState } from 'react';
import { LineType, ProductionResult } from './types';
import TenekeLine from './components/TenekeLine';
import VakumLine from './components/VakumLine';
import YagliLine from './components/YagliLine';
import ResultDisplay from './components/ResultDisplay';
import ReverseCalculator from './components/ReverseCalculator';

const App: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [result, setResult] = useState<ProductionResult | null>(null);

  const reset = () => {
    setSelectedLine(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-emerald-800 text-white shadow-lg p-6 mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full">
               <i className="fa-solid fa-industry text-emerald-800 text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Marmarabirlik Üretim Asistanı</h1>
              <p className="text-emerald-100 text-sm opacity-90">Gelişmiş Üretim ve Verimlilik Hesaplayıcı</p>
            </div>
          </div>
          {selectedLine && (
            <button 
              onClick={reset}
              className="bg-emerald-700 hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i> Hattı Değiştir
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        {!selectedLine ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <LineCard 
                title="800g Teneke Hattı" 
                description="800g Teneke ambalajlar için saatlik 90-190 sele kapasiteli üretim hattı."
                icon="fa-box-open"
                onClick={() => setSelectedLine(LineType.TENEKE_800G)}
              />
              <LineCard 
                title="Vakum Hattı" 
                description="Vakum 7, 3 ve 5 makinaları ile 500g/800g paketleme operasyonları."
                icon="fa-flask-vial"
                onClick={() => setSelectedLine(LineType.VAKUM)}
              />
              <LineCard 
                title="10 kg Yağlı Hattı" 
                description="10 kg teneke ambalajlar için saatte 4 ton kapasiteli üretim hattı."
                icon="fa-oil-can"
                onClick={() => setSelectedLine(LineType.YAGLI_10KG)}
              />
            </div>
            
            {/* Reverse Calculator Section */}
            <ReverseCalculator />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {selectedLine === LineType.TENEKE_800G && <TenekeLine onCalculate={setResult} />}
            {selectedLine === LineType.VAKUM && <VakumLine onCalculate={setResult} />}
            {selectedLine === LineType.YAGLI_10KG && <YagliLine onCalculate={setResult} />}

            {result && <ResultDisplay result={result} lineType={selectedLine} />}
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="max-w-4xl mx-auto px-4 mt-12 text-center text-slate-400 text-xs">
        © {new Date().getFullYear()} Marmarabirlik Üretim Takip Sistemi - Tüm Hakları Saklıdır.
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
    className="bg-white p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-emerald-500 hover:shadow-xl transition-all text-left group"
  >
    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
      <i className={`fa-solid ${icon} text-2xl text-emerald-700 group-hover:text-white`}></i>
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
  </button>
);

export default App;
