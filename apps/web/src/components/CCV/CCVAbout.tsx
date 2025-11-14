
import React from 'react';

const CCVAbout = () => {
  return (
    <section id="about" className="pt-12 pb-16 px-6 lg:px-8 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h2>
              Our Firm
            </h2>
            <p className="text-xl lg:text-2xl">
              Crowley Capital combines capital markets expertise with a founder-first mindset, providing multi-stage support from initial funding through growth-stage deployment.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 border-2 border-slate-300 mb-6">
              <span className="text-5xl font-bold text-slate-500" style={{ fontFamily: "'DM Serif Display', serif" }}>I</span>
            </div>
            <h3 className="mb-4 font-semibold">Capital Markets Expertise</h3>
            <p>
              Deep experience in strategic capital advisory across venture capital, family offices, private equity, and angel investing networks.
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 border-2 border-slate-300 mb-6">
              <span className="text-5xl font-bold text-slate-500" style={{ fontFamily: "'DM Serif Display', serif" }}>II</span>
            </div>
            <h3 className="mb-4 font-semibold">Founder-First Mindset</h3>
            <p>
              Crowley Capital prioritizes operator success through patient capital structures and strategic guidance tailored to each growth stage.
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 border-2 border-slate-300 mb-6">
              <span className="text-5xl font-bold text-slate-500" style={{ fontFamily: "'DM Serif Display', serif" }}>III</span>
            </div>

            <h3 className="mb-4 font-semibold">Multi-Stage Support</h3>
            <p>
              Comprehensive capital deployment from pre-seed through Series B+, with flexible structures designed to scale alongside portfolio companies.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Based in Austin, Crowley Capital partners with exceptional operators building category-defining businesses across AI, deep-tech, and infrastructure sectors. The firm's approach combines institutional capital with strategic advisory, delivering the guidance and resources necessary for sustainable value creation across all growth stages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVAbout;
