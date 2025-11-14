
import React, { useState, useEffect } from 'react';
import { Calendar, Mail, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CCVBooking = () => {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [useDirectLink, setUseDirectLink] = useState(false);

  const calendlyUrl = "https://calendly.com/jakecrowley05/30min";

  // Function to load Calendly widget script
  const loadCalendlyWidget = () => {
    if (window.Calendly) {
      initializeCalendlyWidget();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('Calendly script loaded successfully');
      initializeCalendlyWidget();
    };
    script.onerror = () => {
      console.error('Failed to load Calendly script');
      setEmbedError(true);
    };
    document.head.appendChild(script);
  };

  const initializeCalendlyWidget = () => {
    try {
      if (window.Calendly && document.getElementById('calendly-inline-widget')) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: document.getElementById('calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
        setEmbedLoaded(true);
        console.log('Calendly widget initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing Calendly widget:', error);
      setEmbedError(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!embedLoaded && !embedError) {
        console.log('Calendly embed timeout, trying widget approach');
        loadCalendlyWidget();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [embedLoaded, embedError]);

  const handleRetry = () => {
    setEmbedError(false);
    setEmbedLoaded(false);
    setRetryCount(prev => prev + 1);
    
    if (retryCount >= 2) {
      setUseDirectLink(true);
    } else {
      loadCalendlyWidget();
    }
  };

  const handleIframeLoad = () => {
    console.log('Calendly iframe loaded successfully');
    setEmbedLoaded(true);
  };

  const handleIframeError = () => {
    console.error('Calendly iframe failed to load');
    setEmbedError(true);
  };

  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, '_blank', 'width=800,height=700');
    }
  };

  return (
    <section id="booking" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-black rounded-2xl shadow-xl">
            <Calendar className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-8 tracking-tight leading-tight">
              Engage with Our Capital Desk
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Schedule a confidential consultation to discuss capital requirements, strategic positioning, and partnership opportunities.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Usually responds within 2 hours
            </div>
          </div>
        </div>
        
        {/* Enhanced Calendly Booking Widget */}
        <div className="bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 hover:shadow-3xl transition-shadow duration-500">
          <div className="bg-slate-50 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-semibold text-center mb-4">Schedule Your Strategy Session</h3>
            <p className="text-center text-slate-600 mb-6">
              Choose a time that works best for you. All sessions include follow-up resources and actionable next steps.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={openCalendlyPopup}
                className="bg-black text-white hover:bg-slate-800 px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Open Booking (Popup)
              </Button>
              <Button 
                onClick={() => window.open(calendlyUrl, '_blank')}
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Open in New Tab
              </Button>
            </div>
          </div>
          
          {/* Primary Embed Method - Enhanced Iframe */}
          {!useDirectLink && !embedError && (
            <div className="rounded-2xl overflow-hidden shadow-inner relative">
              {!embedLoaded && (
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center rounded-2xl">
                  <div className="text-center space-y-4">
                    <RefreshCw className="h-8 w-8 text-slate-400 animate-spin mx-auto" />
                    <p className="text-slate-600">Loading booking calendar...</p>
                  </div>
                </div>
              )}
              
              <iframe
                src={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=334155&primary_color=000000`}
                width="100%"
                height="700"
                frameBorder="0"
                scrolling="no"
                className="rounded-2xl"
                title="Schedule a strategy session with Jake Crowley"
                allow="microphone; camera"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ minHeight: '700px' }}
              />
            </div>
          )}

          {/* Secondary Embed Method - Calendly Widget */}
          {!useDirectLink && embedError && (
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <div 
                id="calendly-inline-widget" 
                style={{ minWidth: '320px', height: '700px' }}
                className="rounded-2xl"
              />
            </div>
          )}

          {/* Fallback - Direct Link Options */}
          {(useDirectLink || embedError) && (
            <div className="rounded-2xl p-12 bg-slate-50 text-center space-y-6">
              <div className="space-y-4">
                <Calendar className="h-16 w-16 text-slate-400 mx-auto" />
                <h4 className="text-xl font-semibold text-slate-800">
                  {embedError ? 'Having trouble loading the calendar?' : 'Quick Booking Options'}
                </h4>
                <p className="text-slate-600 max-w-md mx-auto">
                  No worries! You can still easily book your strategy session using these alternative methods.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open(calendlyUrl, '_blank')}
                  className="bg-black text-white hover:bg-slate-800 px-8 py-4 text-lg font-semibold"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Book Directly on Calendly
                </Button>
                
                {embedError && retryCount < 3 && (
                  <Button 
                    onClick={handleRetry}
                    variant="outline"
                    className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Email Fallback */}
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-3 text-slate-600">
              <Mail className="h-5 w-5" />
              <span className="text-lg">Prefer email?</span>
              <a 
                href="mailto:jakecrowley05@gmail.com?subject=Strategy Session Request&body=Hi Jake, I'd like to schedule a 30-minute strategy session. Please let me know your availability." 
                className="text-black font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block"
              >
                jakecrowley05@gmail.com
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              If you're having any issues with booking, please reach out directly and we'll schedule your session manually.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Declare Calendly global for TypeScript
declare global {
  interface Window {
    Calendly: any;
  }
}

export default CCVBooking;
