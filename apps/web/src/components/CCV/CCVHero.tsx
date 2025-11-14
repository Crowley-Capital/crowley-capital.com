
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import monacoImage from '@/assets/monaco-luxury-estate.jpg';

const CCVHero = () => {
  const handleBookCall = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16">
      {/* Full-width background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={monacoImage} 
          alt="Luxury estate overlooking Monaco with infinity pool and panoramic coastal view" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/30"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-7 space-y-6 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white/90 font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                STRATEGIC INVESTMENT BANKING • PRE-SEED TO GROWTH STAGE
              </div>
              
              <h1 className="font-light tracking-tight text-white leading-[0.95] drop-shadow-2xl" style={{ fontSize: '90px', fontFamily: "'DM Serif Display', serif" }}>
                Global Capital.
                <br />
                <span className="font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Strategic Execution.
                </span>
              </h1>
              
              <p className="text-2xl text-white/85 leading-normal max-w-3xl font-light mt-6">
                Crowley Capital structures and deploys institutional capital across AI, deep-tech, and critical infrastructure. The firm combines capital markets expertise with operational support for pre-seed through Series B+ stage companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button 
                  onClick={handleBookCall}
                  className="bg-white text-black hover:bg-white/90 px-8 py-5 text-base md:text-lg h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/25 group"
                >
                  <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
                  Engage Capital Desk
                </Button>
                <Button 
                  onClick={() => scrollToSection('offerings')}
                  variant="outline" 
                  className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-8 py-5 text-base md:text-lg h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm bg-white/10"
                >
                  Investment Approach
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVHero;
