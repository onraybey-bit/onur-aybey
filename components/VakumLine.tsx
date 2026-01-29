
import React, { useState } from 'react';
import { ProductionResult, VakumMachine } from '../types';

interface Props {
  onCalculate: (res: ProductionResult) => void;
}

const VakumLine: React.FC<Props> = ({ onCalculate }) => {
  const [seleCount, setSeleCount] = useState<string>('');
  const [machine, setMachine] = useState<VakumMachine>(VakumMachine.VAKUM_7_500G);
  const [boxConfig, setBoxConfig] = useState<number>(24);

  const calculate = () => {
    const seles = parseFloat(seleCount);
    if (isNaN(seles) || seles <= 0) return;

    const SELE_WEIGHT = 28; // kg
    
    // Makina Konfigürasyonları - Güncel Sele/Saat Verileri
    const configMap: Record<VakumMachine, { unitWeight: number, rate: number }> = {
      [VakumMachine.VAKUM_7_500G]: { unitWeight: 0.5, rate: 31 },
      [VakumMachine.VAKUM_3_500G]: { unitWeight: 0.5, rate: 25 },
      [VakumMachine.VAKUM_5_800G]: { unitWeight: 0.8, rate: 34 },
    };

    const config = configMap[machine];
    const grossWeight = seles * SELE_WEIGHT;
    
    // Otomatik %4 fire hesaplaması (Arka planda çalışmaya devam eder)
    const fireRatio = 0.04; 
    const fireAmount = grossWeight * fireRatio;
    const netWeight = grossWeight - fireAmount;
    
    const totalUnits = Math.floor(netWeight / config.unitWeight);
    const totalBoxes = Math.floor(totalUnits / boxConfig);
    const timeHours = seles / config.rate;

    onCalculate({
      totalSeles: seles,
      totalWeightKg: grossWeight,
      totalPackages: totalUnits,
      totalBoxes: totalBoxes,
      estimatedHours: timeHours,
      fireAmountKg: fireAmount,
      netWeightKg: netWeight
    });
  };

  const is800gVakum = machine === VakumMachine.VAKUM_5_800G;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fa-solid fa-wind text-emerald-600"></i>
          Vakum Hattı Hesaplama
        </h2>
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Sele</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Makina Seçimi</label>
            <select 
              value={machine}
              onChange={(e) => {
                  const val = e.target.value as VakumMachine;
                  setMachine(val);
                  if (val === VakumMachine.VAKUM_5_800G) setBoxConfig(12);
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-all text-sm"
            >
              <option value={VakumMachine.VAKUM_7_500G}>Vakum 7 (500g) - 31 S/s</option>
              <option value={VakumMachine.VAKUM_5_800G}>Vakum 5 (800g) - 34 S/s</option>
              <option value={VakumMachine.VAKUM_3_500G}>Vakum 3 (500g) - 25 S/s</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Koli İçi Adet</label>
            <select 
              value={boxConfig}
              disabled={is800gVakum}
              onChange={(e) => setBoxConfig(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white disabled:bg-slate-50 transition-all text-sm"
            >
              {is800gVakum ? (
                  <option value={12}>12'li Koli</option>
              ) : (
                  <>
                    <option value={24}>24'lü Koli</option>
                    <option value={12}>12'li Koli</option>
                  </>
              )}
            </select>
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-calculator"></i>
          Hesapla
        </button>
      </div>
    </div>
  );
};

export default VakumLine;
