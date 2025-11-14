
import React from 'react';
import { Calendar, Zap, Users, ArrowRight, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CCVCapabilities = () => {
  return (
    <section id="capabilities" className="pt-12 pb-24 px-6 lg:px-8 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h2>
            Capabilities
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
            Strategic capital deployment and advisory services for growth-stage companies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Card 1: Capital Raising & Syndication */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg mb-6">
              <Calendar className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="mb-2 font-semibold">Capital Raising & Syndication</h3>
            <p className="mb-6">
              Strategic capital deployment across pre-seed through Series B+ rounds, leveraging extensive networks across venture capital, family offices, and institutional partners.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Primary equity placements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Syndicate formation and management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Strategic investor introductions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Capital structure optimization</span>
              </li>
            </ul>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 w-full justify-center">
                Explore Capital Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          {/* Card 2: Growth Stage Deployment */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg mb-6">
              <Zap className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="mb-1 font-semibold">Growth Stage Deployment</h3>
            <p className="text-sm text-slate-500 mb-4">Series A through Series B+</p>
            <p className="mb-6">
              Direct capital deployment in high-growth companies across AI, deep-tech, and infrastructure sectors with focus on sustainable scaling.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Lead and co-lead investments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Follow-on capital reserves</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Flexible investment structures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Long-term partnership orientation</span>
              </li>
            </ul>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 w-full justify-center">
                Discuss Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          {/* Card 3: Strategic Advisory */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg mb-6">
              <Users className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="mb-1 font-semibold">Strategic Advisory for Founders & Funds</h3>
            <p className="text-sm text-slate-500 mb-4">Capital Markets Guidance</p>
            <p className="mb-6">
              Strategic advisory services for founders navigating fundraising, capital markets positioning, and investor relations across all growth stages.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Fundraising strategy and positioning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Investor relations and communications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Capital markets navigation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Strategic partnership development</span>
              </li>
            </ul>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 w-full justify-center">
                Engage Advisory Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        
        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mt-8">
          {/* Card 4: Co-Investment Syndication */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg mb-6">
              <FileText className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="mb-1 font-semibold">Co-Investment Syndication</h3>
            <p className="text-sm text-slate-500 mb-4">Family Office & Institutional Partners</p>
            <p className="mb-6">
              Collaborative investment structures with vetted family offices, institutional investors, and strategic partners across target sectors.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Curated co-investment opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Collaborative due diligence processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Institutional-grade deal terms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Strategic partner introductions</span>
              </li>
            </ul>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 w-full justify-center">
                Explore Co-Investment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          {/* Card 5: Executive Advisory Sessions */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg mb-6">
              <TrendingUp className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="mb-1 font-semibold">Executive Advisory Sessions</h3>
            <p className="text-sm text-slate-500 mb-4">Strategic Leadership Guidance</p>
            <p className="mb-6">
              Tailored advisory sessions for founders and executive teams focused on capital strategy, organizational scaling, and value creation.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Executive strategic planning sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Capital markets positioning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Growth stage transition guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Board and investor relations advisory</span>
              </li>
            </ul>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 w-full justify-center">
                Schedule Advisory Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          {/* Card 6: Market Intelligence */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-lg mb-6">
              <FileText className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="mb-1 font-semibold">Market Intelligence</h3>
            <p className="text-sm text-slate-500 mb-4">Private Markets Research</p>
            <p className="mb-6">
              Institutional-grade insights on private markets, capital deployment trends, and sector-specific investment opportunities delivered through regular research publications.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Private market trend analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Sector-specific investment insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Capital markets commentary</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">Quarterly outlook reports</span>
              </li>
            </ul>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 w-full justify-center">
                Subscribe to Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        
        {/* Small Card at End */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-700 font-medium text-lg">
              Explore strategic capital partnership opportunities
            </p>
            <a href="https://calendly.com/jakecrowley05/30min" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="bg-black text-white hover:bg-black/90 px-6 py-2 whitespace-nowrap">
                Engage Capital Desk
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVCapabilities;

