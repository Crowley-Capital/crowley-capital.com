
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, TrendingUp, ExternalLink } from 'lucide-react';

const CCVNewsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', { name, email, interests });
    // Add your newsletter signup logic here
  };

  const handleSubstackRedirect = () => {
    window.open('https://jakecrowley05.substack.com', '_blank');
  };

  const handleViewLatestPost = () => {
    window.open('https://jakecrowley05.substack.com', '_blank');
  };

  return (
    <section id="newsletter" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-black to-slate-800 rounded-2xl shadow-xl">
            <Mail className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-tight leading-tight">
              Future Cash-Flow Newsletter
            </h2>
            <div className="space-y-4">
              <p className="text-2xl text-slate-700 font-light">
                Join 500+ founders getting PMF insights 2x/month
              </p>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Strategic insights, tactical frameworks, and real-world case studies from the Austin tech ecosystem
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">2x faster PMF</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">No spam, ever</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Substack Embed Preview */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Latest from Future Cash-Flow</h3>
            <p className="text-slate-600">See what 500+ founders are reading about PMF and startup strategy</p>
          </div>
          
          <div className="relative bg-slate-50 rounded-xl overflow-hidden">
            <iframe 
              src="https://jakecrowley05.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: 'none', background: 'white' }}
              frameBorder="0" 
              scrolling="no"
              title="Future Cash-Flow Newsletter Preview"
              className="rounded-xl"
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleViewLatestPost}
              variant="outline"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Read Latest Posts
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200 hover:shadow-3xl transition-shadow duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Your Name</label>
                <input
                  type="text"
                  placeholder="Jake Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-lg font-medium hover:border-slate-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  placeholder="jake@startup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-lg font-medium hover:border-slate-300"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">What interests you most?</label>
              <select
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-lg font-medium hover:border-slate-300"
              >
                <option value="">Choose your focus area</option>
                <option value="product-strategy">Product Strategy & PMF</option>
                <option value="fundraising">Fundraising & Capital</option>
                <option value="growth">Growth & Scaling</option>
                <option value="all">Everything (Recommended)</option>
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                type="submit"
                className="bg-black text-white hover:bg-slate-800 px-10 py-4 text-lg rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Join 500+ Founders
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={handleSubstackRedirect}
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-4 text-lg rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Visit Substack
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CCVNewsletter;
