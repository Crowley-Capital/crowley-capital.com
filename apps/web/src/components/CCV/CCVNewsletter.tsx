
import React from 'react';
import { Mail, TrendingUp } from 'lucide-react';

const CCVNewsletter = () => {
  return (
    <section id="newsletter" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-lg">
            <Mail className="h-10 w-10 text-white" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-tight leading-tight">
            Private Markets Research
          </h2>
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-slate-700">
              Institutional-grade insights delivered quarterly
            </p>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Market commentary, sector analysis, and capital deployment trends across AI, deep-tech, and infrastructure sectors
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">
              <TrendingUp className="h-5 w-5" />
              Quarterly Reports
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">
              <Mail className="h-5 w-5" />
              Qualified Investors Only
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVNewsletter;
