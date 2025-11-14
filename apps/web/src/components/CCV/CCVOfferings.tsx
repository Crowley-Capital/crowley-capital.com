
import React from 'react';

const CCVOfferings = () => {

  return (
    <section id="offerings" className="pt-24 pb-8 px-6 lg:px-8 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h2>
            Investment Approach
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="group relative bg-slate-50 rounded-lg py-12 px-6 md:px-8 transition-all duration-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number-sm group-hover:text-slate-600">01</span>
                <div className="flex-1">
                  <h3>Direct Capital Deployment</h3>
                  <p>
                    Primary equity investments across pre-seed through Series B+ with focus on sustainable growth and operational value creation in target sectors.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-slate-50 rounded-lg py-12 px-6 md:px-8 transition-all duration-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number-sm group-hover:text-slate-600">02</span>
                <div className="flex-1">
                  <h3>Strategic Value Creation</h3>
                  <p>
                    Active partnership with portfolio companies through strategic guidance, operational support, and capital markets advisory to accelerate scaling.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-slate-50 rounded-lg py-12 px-6 md:px-8 transition-all duration-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number-sm group-hover:text-slate-600">03</span>
                <div className="flex-1">
                  <h3>Syndication & Networks</h3>
                  <p>
                    Access to extensive capital networks spanning venture capital, family offices, private equity, and angel groups across North America and Europe.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-slate-50 rounded-lg py-12 px-6 md:px-8 transition-all duration-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer">
              <div className="flex items-start gap-6">
                <span className="section-number-sm group-hover:text-slate-600">04</span>
                <div className="flex-1">
                  <h3>Flexible Structures</h3>
                  <p>
                    Customized investment structures tailored to company stage, capital requirements, and strategic objectives with capacity for follow-on deployment.
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

export default CCVOfferings;
