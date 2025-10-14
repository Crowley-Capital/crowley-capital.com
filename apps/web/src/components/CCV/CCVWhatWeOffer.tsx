
import React from 'react';
import { CheckCircle, BarChart3, Users, TrendingUp } from 'lucide-react';

const OfferCard = ({ icon, title, description }) => (
  <div className="cc-card flex gap-6 p-8 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 group">
    <div className="flex-shrink-0">
      <div className="w-14 h-14 bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
        {icon}
      </div>
    </div>
    <div className="cc-card__body space-y-3">
      <h3 className="text-xl font-medium text-black">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
    </div>
  </div>
);

const CCVWhatWeOffer = () => {
  return (
    <section className="py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-8 tracking-tight leading-tight">
              What We Offer
            </h2>
          </div>
        </div>
        
        <div className="cc-card-grid grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <OfferCard
              icon={<BarChart3 className="h-7 w-7 text-green-600" />}
              title="Real-Time Signal Reports"
              description="Human-curated intelligence built from Austin's most active startup nodes—cutting through noise to deliver actionable insights."
            />
          </div>
          
          <div>
            <OfferCard
              icon={<Users className="h-7 w-7 text-green-600" />}
              title="Tailored Ecosystem Digests"
              description="Founder, VC, and Economic digests designed for clarity, not clutter—each tailored to your specific role in the ecosystem."
            />
          </div>
          
          <div>
            <OfferCard
              icon={<TrendingUp className="h-7 w-7 text-green-600" />}
              title="Performance Tracking Systems"
              description="A comprehensive system to track what worked, what mattered, and what's coming next in your journey."
            />
          </div>
          
          <div>
            <OfferCard
              icon={<CheckCircle className="h-7 w-7 text-green-600" />}
              title="Strategic Advisory Support"
              description="Direct access to experienced operators who understand the unique challenges of building in Austin's tech ecosystem."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVWhatWeOffer;
