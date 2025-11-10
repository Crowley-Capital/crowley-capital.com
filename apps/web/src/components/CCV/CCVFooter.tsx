
import React from 'react';
import { Link } from 'react-router-dom';
import CCVLogo from './CCVLogo';
import { Linkedin, Instagram, Facebook, FileText, Mail, Calendar } from 'lucide-react';

const CCVFooter = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <footer className="py-24 px-6 lg:px-8 bg-gradient-to-b from-black to-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Teaser */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl p-12 mb-20 border border-slate-600">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-light">Join 500+ founders getting PMF insights 2x/month</h3>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Future Cash-Flow Newsletter: Strategic insights that turn confusion into unstoppable momentum.
            </p>
            <button
              onClick={() => scrollToSection('newsletter')}
              className="inline-flex items-center gap-3 bg-white text-black hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              Subscribe Now
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <CCVLogo size="md" variant="dark" />
              <div>
                <h4 className="text-2xl font-semibold">Crowley Capital</h4>
                <p className="text-slate-400">Strategy • Product • Capital</p>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Helping startup founders cut through the noise with strategic clarity, tactical execution, and capital guidance in Austin's tech ecosystem.
            </p>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => scrollToSection('newsletter')}
                className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
                aria-label="View newsletter section"
              >
                <FileText className="h-6 w-6" />
              </button>
              
              <div className="flex items-center gap-6">
                <a 
                  href="https://www.linkedin.com/company/crowleycapital/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow Crowley Capital on LinkedIn"
                  className="text-[#AAAAAA] hover:text-[#0077B5] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/crowleycapitalventures/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow Crowley Capital on Instagram"
                  className="text-[#AAAAAA] hover:text-[#E4405F] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61563906492918" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow Crowley Capital on Facebook"
                  className="text-[#AAAAAA] hover:text-[#1877F2] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline"
                >
                  About Jake
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('offerings')}
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline"
                >
                  Services & Offerings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline"
                >
                  Book Strategy Session
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('newsletter')}
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline"
                >
                  Newsletter
                </button>
              </li>
              <li>
                <Link 
                  to="/articles"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:jakecrowley05@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline flex items-center gap-3"
                >
                  <Mail className="h-5 w-5" />
                  jakecrowley05@gmail.com
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:underline flex items-center gap-3"
                >
                  <Calendar className="h-5 w-5" />
                  Schedule a Call
                </button>
              </li>
              <li className="text-slate-400 text-lg">
                📍 Based in Austin, TX
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-lg">
              © {currentYear} Crowley Capital Ventures – Clarity for Founders. Traction for Products.
            </p>
            <div className="flex items-center gap-8">
              <a href="/admin" className="text-slate-400 hover:text-white transition-colors">Admin</a>
              <a href="/legal/linkedin-api-terms" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="/press-kit" className="text-slate-400 hover:text-white transition-colors">Press Kit</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CCVFooter;
