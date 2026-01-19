
import React, { useState, useMemo } from 'react';
import { LineType, VakumMachine } from '../types';

const ReverseCalculator: React.FC = () => {
  const [targetBoxes, setTargetBoxes] = useState<string>('');
  const [line, setLine] = useState<LineType>(LineType.TENEKE_800G);
  const [machine, setMachine] = useState<VakumMachine>(VakumMachine.VAKUM_7_500G);
  const [boxConfig, setBoxConfig] = useState<number>(24);

  const results = useMemo(() => {
    const boxes = parseFloat(targetBoxes);
    if (isNaN(boxes) || boxes <= 0) return null;

    const SELE_WEIGHT = 28;
    let unitWeight = 0;
    let unitsPerBox = 0;
    let fireMultiplier = 1.035; // Ortalama %3.5 fire payı ekliyoruz

    if (line === LineType.TENEKE_800G) {
      unitWeight = 0.8;
      unitsPerBox = 6; // Shrink başına
      fireMultiplier = 1.01; // Tenekede fire daha az
    } else if (line === LineType.VAKUM) {
      unitsPerBox = boxConfig;
      unitWeight = machine === VakumMachine.VAKUM_5_800G ? 0.8 : 0.5;
    } else if (line === LineType.YAGLI_10KG) {
      unitWeight = 10;
      unitsPerBox = 1; // Her teneke bir birim (koli gibi düşünülür)
      fireMultiplier = 1.025; // 4 tonda ~100kg = %2.5
    }

    const totalUnitsNeeded = boxes * unitsPerBox;
    const netWeightNeeded = totalUnitsNeeded * unitWeight;
    const grossWeightNeeded = netWeightNeeded * fireMultiplier;
    const totalSeles = grossWeightNeeded / SELE_WEIGHT;

    return {
      seles: Math.ceil(totalSeles),
      units: totalUnitsNeeded,
      weight: grossWeightNeeded
    };
  }, [targetBoxes, line, machine, boxConfig]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Hedef Koli Sayısı</label>
            <input 
              type="number"
              value={targetBoxes}
              onChange={(e) => setTargetBoxes(e.target.value)}
              placeholder="Örn: 500"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Hat Seçimi</label>
            <select 
              value={line}
              onChange={(e) => setLine(e.target.value as LineType)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
            >
              <option value={LineType.TENEKE_800G}>800g Teneke Hattı</option>
              <option value={LineType.VAKUM}>Vakum Hattı</option>
              <option value={LineType.YAGLI_10KG}>10 kg Yağlı Hattı</option>
            </select>
          </div>

          {line === LineType.VAKUM && (
            <div className="grid grid-cols-2 gap-2 animate-in fade-in duration-300">
              <select 
                value={machine}
                onChange={(e) => setMachine(e.target.value as VakumMachine)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
              >
                <option value={VakumMachine.VAKUM_7_500G}>Vakum 7 (500g)</option>
                <option value={VakumMachine.VAKUM_3_500G}>Vakum 3 (500g)</option>
                <option value={VakumMachine.VAKUM_5_800G}>Vakum 5 (800g)</option>
              </select>
              <select 
                value={boxConfig}
                onChange={(e) => setBoxConfig(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
              >
                <option value={24}>24'lü Koli</option>
                <option value={12}>12'li Koli</option>
              </select>
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-center border border-blue-100 min-h-[180px]">
          {results ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-300">
              <div className="text-center">
                <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-1">Gerekli Toplam Sele</p>
                <p className="text-4xl font-black text-blue-900">{results.seles} <span className="text-lg font-bold">SELE</span></p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                <div className="text-center">
                  <p className="text-[10px] text-blue-700 font-bold uppercase">Ambalaj Adedi</p>
                  <p className="text-lg font-bold text-blue-900">{results.units.toLocaleString()} Adet</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-blue-700 font-bold uppercase">Tahmini Tonaj</p>
                  <p className="text-lg font-bold text-blue-900">~{Math.round(results.weight).toLocaleString()} kg</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-blue-400">
              <i className="fa-solid fa-calculator text-4xl mb-3 opacity-20"></i>
              <p className="text-sm font-medium">Hesaplamak için koli sayısını girin.</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mt-4 italic">
        * Bu hesaplama standart fire payları ve koli konfigürasyonları (800g Teneke için 6'lı shrink, 10kg için tekli ünite) baz alınarak yapılmıştır.
      </p>
    </div>
  );
};

export default ReverseCalculator;
