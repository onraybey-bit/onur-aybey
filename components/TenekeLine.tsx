
import React, { useState } from 'react';
import { ProductionResult } from '../types';

interface Props {
  onCalculate: (res: ProductionResult) => void;
}

const TenekeLine: React.FC<Props> = ({ onCalculate }) => {
  const [seleCount, setSeleCount] = useState<string>('');
  const [isDoubleMachine, setIsDoubleMachine] = useState<boolean>(true);

  const calculate = () => {
    const seles = parseFloat(seleCount);
    if (isNaN(seles) || seles <= 0) return;

    const SELE_WEIGHT = 28; // kg
    const UNIT_WEIGHT = 0.8; // kg (800g)
    const SHRINK_SIZE = 6;
    const BOX_CAPACITY = 108; // 108 koli? (User said "108 koli olacak şekilde paketleniyor", assuming per pallet/batch)
    // Actually, usually in production: 1 box = 6 units (shrink). 
    // User says "6 lı şekilde shrink yapılıp 108 koli olacak şekilde paketleniyor" 
    // This could mean 108 boxes per pallet, but for simple calculation let's find total boxes.
    
    const totalWeight = seles * SELE_WEIGHT;
    const totalUnits = Math.floor(totalWeight / UNIT_WEIGHT);
    const totalShrinks = Math.floor(totalUnits / SHRINK_SIZE);
    
    // In tin line, typically 1 box = 1 shrink (6 items) or more. 
    // Given the prompt "108 koli olacak şekilde paketleniyor", I'll assume 1 box = 1 shrink for count.
    const totalBoxes = totalShrinks;

    const hourlyRate = isDoubleMachine ? 190 : 95; // Average of 90-100
    const timeHours = seles / hourlyRate;

    onCalculate({
      totalSeles: seles,
      totalWeightKg: totalWeight,
      totalPackages: totalUnits,
      totalBoxes: totalBoxes,
      estimatedHours: timeHours
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <i className="fa-solid fa-calculator text-emerald-600"></i>
        800g Teneke Hattı Hesaplama
      </h2>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Toplam Sele Miktarı</label>
          <input 
            type="number"
            value={seleCount}
            onChange={(e) => setSeleCount(e.target.value)}
            placeholder="Örn: 500"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Makina Modu</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setIsDoubleMachine(true)}
              className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${isDoubleMachine ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
            >
              Çift Makina (190 S/s)
            </button>
            <button 
              onClick={() => setIsDoubleMachine(false)}
              className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${!isDoubleMachine ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
            >
              Tek Makina (95 S/s)
            </button>
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-200 transition-all transform active:scale-[0.98]"
        >
          Hesapla
        </button>
      </div>
    </div>
  );
};

export default TenekeLine;
