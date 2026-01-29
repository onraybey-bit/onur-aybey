
import React, { useState, useMemo } from 'react';
import { LineType, VakumMachine } from '../types';

const ReverseCalculator: React.FC = () => {
  const [targetBoxes, setTargetBoxes] = useState<string>('');
  const [line, setLine] = useState<LineType>(LineType.TENEKE_800G);
  const [machine, setMachine] = useState<VakumMachine>(VakumMachine.VAKUM_7_500G);
  const [boxConfig, setBoxConfig] = useState<number>(24);
  const [kuruPack, setKuruPack] = useState<'800g' | '400g'>('800g');

  const results = useMemo(() => {
    const boxes = parseFloat(targetBoxes);
    if (isNaN(boxes) || boxes <= 0) return null;

    const SELE_WEIGHT = 28;
    let unitWeight = 0;
    let unitsPerBox = 0;
    let fireMultiplier = 1.035;

    if (line === LineType.TENEKE_800G) {
      unitWeight = 0.8;
      unitsPerBox = 6;
      fireMultiplier = 1.01;
    } else if (line === LineType.VAKUM) {
      unitsPerBox = boxConfig;
      unitWeight = machine === VakumMachine.VAKUM_5_800G ? 0.8 : 0.5;
      // Net'ten Brüt'e dönüş için: Brüt = Net / (1 - 0.04) => 1 / 0.96 = 1.0416...
      fireMultiplier = 1 / 0.96;
    } else if (line === LineType.YAGLI_10KG) {
      unitWeight = 10;
      unitsPerBox = 1;
      // %4 fire için: 1 / 0.96
      fireMultiplier = 1 / 0.96;
    } else if (line === LineType.KURU_SELE) {
      if (kuruPack === '800g') {
        unitWeight = 0.8;
        unitsPerBox = 6;
      } else {
        unitWeight = 0.4;
        unitsPerBox = 12;
      }
      fireMultiplier = 1 / 0.87;
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
  }, [targetBoxes, line, machine, boxConfig, kuruPack]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden mt-12 transition-all hover:shadow-emerald-900/5">
      <div className="bg-slate-900 p-8 text-white flex items-center gap-4">
         <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-calculator text-2xl"></i>
         </div>
         <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Hedef Koli Hesaplama</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-80">Planlama Aracı</p>
         </div>
      </div>
      
      <div className="grid lg:grid-cols-5 gap-0">
        <div className="lg:col-span-3 p-10 space-y-8 bg-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Hedef Koli Sayısı</label>
              <div className="relative">
                <input 
                  type="number"
                  value={targetBoxes}
                  onChange={(e) => setTargetBoxes(e.target.value)}
                  placeholder="Koli adedi giriniz..."
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-xl font-bold placeholder:font-normal placeholder:text-slate-300 shadow-sm"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-black">KOLİ</div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Hat Seçimi</label>
              <select 
                value={line}
                onChange={(e) => setLine(e.target.value as LineType)}
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-lg font-bold appearance-none cursor-pointer shadow-sm"
              >
                <option value={LineType.TENEKE_800G}>800g Teneke</option>
                <option value={LineType.VAKUM}>Vakum Hattı</option>
                <option value={LineType.YAGLI_10KG}>10 kg Yağlı</option>
                <option value={LineType.KURU_SELE}>Kuru Sele</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {line === LineType.VAKUM && (
              <>
                <div className="space-y-3 animate-in slide-in-from-left duration-300">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Makina Tipi</label>
                  <select 
                    value={machine}
                    onChange={(e) => setMachine(e.target.value as VakumMachine)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold focus:border-blue-400 outline-none transition-all shadow-sm"
                  >
                    <option value={VakumMachine.VAKUM_7_500G}>Vakum 7 (500g)</option>
                    <option value={VakumMachine.VAKUM_3_500G}>Vakum 3 (500g)</option>
                    <option value={VakumMachine.VAKUM_5_800G}>Vakum 5 (800g)</option>
                  </select>
                </div>
                <div className="space-y-3 animate-in slide-in-from-left duration-400">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Koli İçi Adet</label>
                  <select 
                    value={boxConfig}
                    onChange={(e) => setBoxConfig(Number(e.target.value))}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold focus:border-blue-400 outline-none transition-all shadow-sm"
                  >
                    <option value={24}>24'lü Koli</option>
                    <option value={12}>12'li Koli</option>
                  </select>
                </div>
              </>
            )}

            {line === LineType.KURU_SELE && (
              <div className="md:col-span-2 space-y-3 animate-in slide-in-from-left duration-300">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Ambalaj Ve Paketleme</label>
                <select 
                  value={kuruPack}
                  onChange={(e) => setKuruPack(e.target.value as '800g' | '400g')}
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold focus:border-blue-400 outline-none transition-all shadow-sm"
                >
                  <option value="800g">800g Ambalaj (6'lı Koli)</option>
                  <option value="400g">400g Ambalaj (12'li Koli)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-blue-600 p-10 flex flex-col justify-center relative overflow-hidden group">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
             <i className="fa-solid fa-boxes-packing text-9xl text-white"></i>
          </div>

          {results ? (
            <div className="space-y-10 text-white relative z-10 animate-in zoom-in-95 duration-500">
               <div className="text-center">
                  <p className="text-blue-100 text-xs font-black uppercase tracking-[0.3em] mb-4">GEREKLİ SELE MİKTARI</p>
                  <div className="inline-block bg-white/20 backdrop-blur-md px-10 py-8 rounded-[2rem] border border-white/30 shadow-2xl">
                    <p className="text-7xl font-black">{results.seles}</p>
                    <p className="text-xl font-bold opacity-80 mt-1">SELE</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/20">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-blue-200 uppercase font-black tracking-widest mb-1">TOPLAM PAKET</p>
                    <p className="text-xl font-black">{results.units.toLocaleString()}</p>
                    <p className="text-[10px] opacity-60">Adet</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-blue-200 uppercase font-black tracking-widest mb-1">BRÜT AĞIRLIK</p>
                    <p className="text-xl font-black">{results.weight.toFixed(1)}</p>
                    <p className="text-[10px] opacity-60">Kilogram</p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="text-center text-blue-200 relative z-10 space-y-4 py-12">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 animate-pulse">
                <i className="fa-solid fa-keyboard text-3xl"></i>
              </div>
              <p className="text-lg font-bold">Veri Bekleniyor...</p>
              <p className="text-xs opacity-60 font-medium px-8">Hesaplama yapmak için lütfen soldaki panele koli adedi giriniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReverseCalculator;
