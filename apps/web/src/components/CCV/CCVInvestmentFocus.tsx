import React from 'react';

const CCVInvestmentFocus = () => {
  return (
    <section id="investment-focus" className="pt-32 pb-16 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-20">
          <h2 className="text-center">
            Investment Focus
          </h2>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="group relative border-b md:border-b-0 md:border-r border-slate-200 py-12 px-6 md:px-8 transition-all duration-300 hover:border-l-4 hover:border-l-slate-600 hover:pl-8 cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number group-hover:text-slate-600">01</span>
                <div className="flex-1">
                  <h3>AI & Deep-Tech</h3>
                  <p>
                    Strategic capital deployment in artificial intelligence, machine learning, and emerging technology companies driving fundamental market transformation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative border-b md:border-b-0 md:border-r border-slate-200 py-12 px-6 md:px-8 transition-all duration-300 hover:border-l-4 hover:border-l-slate-600 hover:pl-8 cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number group-hover:text-slate-600">02</span>
                <div className="flex-1">
                  <h3>Infrastructure & Enterprise</h3>
                  <p>
                    Growth capital for infrastructure and enterprise software companies building scalable, mission-critical platforms across B2B and B2B2C markets.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative py-12 px-6 md:px-8 transition-all duration-300 hover:border-l-4 hover:border-l-slate-600 hover:pl-8 cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number group-hover:text-slate-600">03</span>
                <div className="flex-1">
                  <h3>Pre-Seed to Series B+</h3>
                  <p>
                    Flexible capital structures supporting companies from initial formation through growth stages, with capacity for lead, co-lead, and follow-on investments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVInvestmentFocus;

