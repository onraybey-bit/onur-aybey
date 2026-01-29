
import React, { useState } from 'react';

interface CountryData {
  company: string;
  country: string;
  text: string;
  note: string;
}

const countryListData: CountryData[] = [
  { company: "AVRUPA BAYİLERİ", country: "ALMANYA", text: "DEUTSCHLAND GMBH Romaney Str. 5 510... Germany E.D./M.H.B./D.L.C:GÜN/AY/YIL", note: "" },
  { company: "ANGLESEY", country: "İSVİÇRE", text: "Prod Date & Exp Date:Gün/Ay/Yıl", note: "İSPANYOLCA ETİKET" },
  { company: "BINGO", country: "BOSNA", text: "Uvoznik za BiH: Bingo d.o.o., ul.Bosanska poljana bb, 75000 Tuzla, Bosna i Hercegovina Prod.Date: & Exp.Date: GÜN/AY/YIL", note: "BOŞNAKÇA AMBALAJ/ETİKET" },
  { company: "ELITE", country: "UKRAYNA", text: "Imp:Elite AS Phn:226 463 00 Produsert Dato/Bestfor Dato:GÜN/AY/YIL", note: "UKRAYNACA ETİKET" },
  { company: "FİMTAD", country: "İSVEÇ", text: "Prod Date & Exp Date:Gün/Ay/Yıl", note: "İSVEÇÇE ETİKET" },
  { company: "FOODIA", country: "İSVEÇ", text: "Marknadsförs av: Foodia Global AB Tel:031-210642 www.foodiaglobal.com Prod Date:Gün/Ay/Yıl Exp Date:Gün/Ay/Yıl", note: "BESİN ÖĞESİ ETİKETİ" },
  { company: "FTZ FOOD", country: "İNGİLTERE", text: "Imp. By: Ftz Foods Ltd.CM20 2DR U.K. www.ftzfoods.com Best Before:GÜN/AY/YIL", note: "İNGİLİZCE AMBALAJ" },
  { company: "HATTI FOOD", country: "KANADA", text: "Imp.By Hatti Foods Inc. www.hattifoods.ca Prod.Date:&Exp.Date:AY/YIL", note: "BESİN ÖĞESİ ETİKETİ" },
  { company: "JOHN PASCALIS", country: "İNGİLTERE", text: "Imp.By:John&Pascalis Ltd. 665 North Circular Road London NW2 7AX U.K. Best Before:GÜN/AY/YIL", note: "İNGİLİZCE AMBALAJ / EURO PALET" },
  { company: "KAHVECİOĞLU", country: "AVUSTRALYA", text: "Imp:Grand Foods. Address: 82 Barry Rd Campbellfield VIC.3061 P:03 9357 9244 Best Before:GÜN/AY/YIL", note: "pH max 4,6 BESİN ÖĞESİ ETİKETİ" },
  { company: "MEGAFOOD", country: "DANİMARKA", text: "Importeret af Megafood www.megafood.dk Bedst før:GÜN/AY/YIL", note: "DANCA ETİKET" },
  { company: "OLIVEROM", country: "ROMANYA", text: "Prod.Date: & Exp.Date: GÜN/AY/YIL", note: "RUMENCE ETİKET" },
  { company: "OPTIMUM LLC", country: "RUSYA", text: "Prod.Date: & Exp.Date: GÜN/AY/YIL", note: "RUSÇA ETİKET" },
  { company: "UNIFOOD", country: "DANİMARKA", text: "Importeret af unifood.dk Bedst før:GÜN/AY/YIL", note: "DANCA ETİKET" },
  { company: "ZEYTİN DIŞ TİCARET", country: "RUSYA", text: "Prod.Date: & Exp.Date: GÜN/AY/YIL", note: "RUSÇA ETİKET" },
  { company: "QUANTIMPEX", country: "KANADA", text: "Imp.By Quantimpex INC info@quantimpex.ca Prod.Date / Exp.Date:AY/YIL", note: "AVS.İNG.AMB." }
];

const CountryGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = countryListData.filter(item => 
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-emerald-700 text-white rounded-2xl shadow-2xl hover:bg-emerald-800 transition-all flex items-center justify-center z-40 group"
        title="İhracat Bilgi Listesi"
      >
        <i className="fa-solid fa-file-invoice text-2xl group-hover:scale-110 transition-transform"></i>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 uppercase">Özel İhracat Bilgi Listesi</h2>
                  <p className="text-xs text-slate-500">Seçili 16 şirket için etiket ve yazı formatları</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="text"
                  placeholder="Şirket adı ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-slate-50 p-4">
              <div className="grid gap-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="md:w-1/4">
                          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest block mb-1">{item.country}</span>
                          <h3 className="text-base font-black text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors uppercase">
                            {item.company}
                          </h3>
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                            {item.text}
                          </div>
                        </div>

                        <div className="md:w-1/5">
                          {item.note && (
                            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 h-full flex items-start gap-2">
                              <i className="fa-solid fa-tag text-amber-500 mt-0.5 text-xs"></i>
                              <span className="text-[11px] font-bold text-amber-800 leading-tight uppercase">
                                {item.note}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <i className="fa-solid fa-magnifying-glass text-5xl text-slate-200 mb-4 block"></i>
                    <p className="text-slate-400 font-medium">Sonuç bulunamadı.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100 text-[11px] text-slate-400 flex justify-between items-center font-medium">
              <span>Toplam {filteredData.length} şirket listeleniyor</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-shield-halved"></i> Güncel Operasyonel Liste</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryGuide;
