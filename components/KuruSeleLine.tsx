
import React, { useState } from 'react';
import { ProductionResult } from '../types';

interface Props {
  onCalculate: (res: ProductionResult) => void;
}

const KuruSeleLine: React.FC<Props> = ({ onCalculate }) => {
  const [seleCount, setSeleCount] = useState<string>('');
  const [packType, setPackType] = useState<'800g' | '400g'>('800g');

  const calculate = () => {
    const seles = parseFloat(seleCount);
    if (isNaN(seles) || seles <= 0) return;

    const SELE_WEIGHT = 28; // kg
    const DRY_RATIO = 0.87; // 100kg -> 87kg

    const grossWeight = seles * SELE_WEIGHT;
    const netWeightAfterDrying = grossWeight * DRY_RATIO;
    const fireAmount = grossWeight - netWeightAfterDrying;

    let unitWeight, hourlyRate, unitsPerBox, boxesPerPallet;

    if (packType === '800g') {
      unitWeight = 0.8;
      hourlyRate = 80;
      unitsPerBox = 6;
      boxesPerPallet = 84;
    } else {
      unitWeight = 0.4;
      hourlyRate = 64;
      unitsPerBox = 12;
      boxesPerPallet = 90;
    }

    const totalUnits = Math.floor(netWeightAfterDrying / unitWeight);
    const totalBoxes = Math.floor(totalUnits / unitsPerBox);
    const totalPallets = totalBoxes / boxesPerPallet;
    const timeHours = seles / hourlyRate;

    onCalculate({
      totalSeles: seles,
      totalWeightKg: grossWeight,
      totalPackages: totalUnits,
      totalBoxes: totalBoxes,
      totalPallets: totalPallets,
      estimatedHours: timeHours,
      fireAmountKg: fireAmount,
      netWeightKg: netWeightAfterDrying
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fa-solid fa-sun text-orange-500"></i>
          Kuru Sele Hattı
        </h2>
        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          Aktif
        </span>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Toplam Sele Miktarı</label>
          <div className="relative">
            <input 
              type="number"
              value={seleCount}
              onChange={(e) => setSeleCount(e.target.value)}
              placeholder="Örn: 200"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Sele</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Ambalaj Tipi</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setPackType('800g')}
              className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${packType === '800g' ? 'bg-orange-50 border-orange-500 text-orange-800' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
            >
              800g (80 S/s)
            </button>
            <button 
              onClick={() => setPackType('400g')}
              className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${packType === '400g' ? 'bg-orange-50 border-orange-500 text-orange-800' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
            >
              400g (64 S/s)
            </button>
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-200 transition-all transform active:scale-[0.98]"
        >
          Hesapla
        </button>
      </div>
    </div>
  );
};

export default KuruSeleLine;
