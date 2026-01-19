
import React from 'react';
import { ProductionResult, LineType } from '../types';

interface Props {
  result: ProductionResult;
  lineType: LineType;
}

const ResultDisplay: React.FC<Props> = ({ result, lineType }) => {
  const formatNum = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 2 });

  const hasFireInfo = lineType === LineType.VAKUM || lineType === LineType.YAGLI_10KG;

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <i className="fa-solid fa-chart-line text-8xl text-emerald-900"></i>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4 border-slate-100">
          Üretim Analizi Sonuçları
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="fa-weight-hanging" label="Brüt Ağırlık" value={`${formatNum(result.totalWeightKg)} kg`} color="emerald" />
          <StatCard icon="fa-box" label={lineType === LineType.YAGLI_10KG ? "Toplam Teneke" : "Toplam Paket"} value={`${formatNum(result.totalPackages)} Adet`} color="blue" />
          <StatCard icon="fa-boxes-stacked" label={lineType === LineType.YAGLI_10KG ? "Palet Sayısı" : "Koli Sayısı"} value={lineType === LineType.YAGLI_10KG ? `${formatNum(result.totalPallets || 0)} Palet` : `${formatNum(result.totalBoxes)} Koli`} color="indigo" />
          <StatCard icon="fa-clock" label="Tahmini Süre" value={`${formatNum(result.estimatedHours)} Saat`} color="orange" />
        </div>

        {hasFireInfo && (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-amber-500"></i>
              Fire & Net Üretim Detayları
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Toplam Fire</p>
                <p className="text-lg font-bold text-red-600">-{formatNum(result.fireAmountKg || 0)} kg</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Net Ağırlık</p>
                <p className="text-lg font-bold text-emerald-700">{formatNum(result.netWeightKg || 0)} kg</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-emerald-900 text-white p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-emerald-200 text-sm font-medium uppercase tracking-widest">Tahmini Bitiş Süresi</p>
            <p className="text-3xl font-black">{formatNum(result.estimatedHours)} <span className="text-lg font-normal opacity-80">SAAT</span></p>
          </div>
          <div className="text-right">
             <div className="text-emerald-300 text-xs mb-1">Operasyonel Kapasite</div>
             <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-2 w-4 rounded-full ${i <= 4 ? 'bg-emerald-400' : 'bg-emerald-800 border border-emerald-400/30'}`}></div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{label}</p>
      <p className="text-sm md:text-base font-bold text-slate-800">{value}</p>
    </div>
  );
};

export default ResultDisplay;
