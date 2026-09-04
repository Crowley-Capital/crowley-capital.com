
import React from 'react';
import { Mail } from 'lucide-react';

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
              Market commentary, sector analysis and capital deployment across infrastructure, data centers, dual-use technology, defense, space, sports and alternative assets
            </p>
          </div>
          
          <div className="pt-8 max-w-xl mx-auto">
            <iframe
              src="https://jakecrowley05.substack.com/embed"
              width="100%"
              height="150"
              style={{ border: '1px solid #EEE', background: 'white' }}
              frameBorder="0"
              scrolling="no"
              title="Subscribe to Crowley Capital on Substack"
            />
            <a
              href="https://jakecrowley05.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-slate-600 underline underline-offset-4 hover:text-black"
            >
              Read past issues on Substack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVNewsletter;
