
import React, { useState } from 'react';
import { ProductionResult } from '../types';

interface Props {
  onCalculate: (res: ProductionResult) => void;
}

const YagliLine: React.FC<Props> = ({ onCalculate }) => {
  const [seleCount, setSeleCount] = useState<string>('');
  const [fireOption, setFireOption] = useState<number>(90); // 80-100 kg arası varsayılan 90

  const calculate = () => {
    const seles = parseFloat(seleCount);
    if (isNaN(seles) || seles <= 0) return;

    const SELE_WEIGHT = 28; // kg
    const UNIT_WEIGHT = 10; // kg
    const PALLET_SIZE = 75; // adet teneke per palet
    const HOURLY_CAPACITY_KG = 4000; // 4 ton = 4000 kg

    const grossWeight = seles * SELE_WEIGHT;
    
    // Fire hesabı: Her 4000kg için seçilen fire miktarı (80-100kg)
    const fireRatio = fireOption / 4000; 
    const fireAmount = grossWeight * fireRatio;
    const netWeight = grossWeight - fireAmount;

    const totalUnits = Math.floor(netWeight / UNIT_WEIGHT);
    const totalPallets = totalUnits / PALLET_SIZE;
    const timeHours = grossWeight / HOURLY_CAPACITY_KG;

    onCalculate({
      totalSeles: seles,
      totalWeightKg: grossWeight,
      totalPackages: totalUnits,
      totalBoxes: totalUnits, // Bu hatta ünite = teneke (koli yerine teneke sayılıyor)
      totalPallets: totalPallets,
      estimatedHours: timeHours,
      fireAmountKg: fireAmount,
      netWeightKg: netWeight
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fa-solid fa-oil-can text-emerald-600"></i>
          10 kg Yağlı Hattı
        </h2>
        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          4 Ton / Saat
        </span>
      </div>

      <div className="grid gap-6">
        {/* Giriş Alanı */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">Toplam Sele Miktarı</label>
          <div className="relative">
            <input 
              type="number"
              value={seleCount}
              onChange={(e) => setSeleCount(e.target.value)}
              placeholder="Örn: 1000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Sele</span>
          </div>
        </div>

        {/* Fire Seçeneği - Diğer hatlardaki gibi seçenekli yapı */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">Fire Toleransı (4 Ton Başına)</label>
          <div className="grid grid-cols-3 gap-2">
            {[80, 90, 100].map((val) => (
              <button
                key={val}
                onClick={() => setFireOption(val)}
                className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  fireOption === val 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                }`}
              >
                {val === 80 ? 'Düşük (80kg)' : val === 90 ? 'Normal (90kg)' : 'Yüksek (100kg)'}
              </button>
            ))}
          </div>
        </div>

        {/* Sabit Bilgiler */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Ambalaj</p>
            <p className="text-sm font-semibold text-slate-700">10 kg Teneke</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Palet Düzeni</p>
            <p className="text-sm font-semibold text-slate-700">75 Adet / Palet</p>
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-calculator"></i>
          Hesapla ve Analiz Et
        </button>
      </div>
    </div>
  );
};

export default YagliLine;
