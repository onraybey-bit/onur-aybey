
import React, { useState } from 'react';
import { ProductionResult, VakumMachine } from '../types';

interface Props {
  onCalculate: (res: ProductionResult) => void;
}

const VakumLine: React.FC<Props> = ({ onCalculate }) => {
  const [seleCount, setSeleCount] = useState<string>('');
  const [machine, setMachine] = useState<VakumMachine>(VakumMachine.VAKUM_7_500G);
  const [boxConfig, setBoxConfig] = useState<number>(24);
  const [fireRate, setFireRate] = useState<number>(3.5); // Varsayılan %3-4 arası

  const calculate = () => {
    const seles = parseFloat(seleCount);
    if (isNaN(seles) || seles <= 0) return;

    const SELE_WEIGHT = 28; // kg
    
    // Makina Konfigürasyonları
    const configMap: Record<VakumMachine, { unitWeight: number, rate: number }> = {
      [VakumMachine.VAKUM_7_500G]: { unitWeight: 0.5, rate: 45 },
      [VakumMachine.VAKUM_3_500G]: { unitWeight: 0.5, rate: 35 },
      [VakumMachine.VAKUM_5_800G]: { unitWeight: 0.8, rate: 35 },
    };

    const config = configMap[machine];
    const grossWeight = seles * SELE_WEIGHT;
    const fireAmount = grossWeight * (fireRate / 100);
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

  // 800g Vakum (Vakum 5) kontrolü
  const is800gVakum = machine === VakumMachine.VAKUM_5_800G;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <i className="fa-solid fa-wind text-emerald-600"></i>
        Vakum Hattı Hesaplama
      </h2>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Toplam Sele Miktarı</label>
          <input 
            type="number"
            value={seleCount}
            onChange={(e) => setSeleCount(e.target.value)}
            placeholder="Örn: 200"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Makina Seçimi</label>
          <select 
            value={machine}
            onChange={(e) => {
                const val = e.target.value as VakumMachine;
                setMachine(val);
                // Vakum 5 (800g) seçilirse otomatik 12'li koliye ayarla
                if (val === VakumMachine.VAKUM_5_800G) setBoxConfig(12);
            }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-all"
          >
            <option value={VakumMachine.VAKUM_7_500G}>Vakum 7 (500g) - 45 S/s</option>
            <option value={VakumMachine.VAKUM_3_500G}>Vakum 3 (500g) - 35 S/s</option>
            <option value={VakumMachine.VAKUM_5_800G}>Vakum 5 (800g) - 35 S/s</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Koli İçi Adet</label>
            <select 
              value={boxConfig}
              disabled={is800gVakum}
              onChange={(e) => setBoxConfig(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white disabled:bg-slate-50 transition-all"
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
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tahmini Fire (%)</label>
            <input 
              type="number"
              step="0.1"
              value={fireRate}
              onChange={(e) => setFireRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
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

export default VakumLine;
