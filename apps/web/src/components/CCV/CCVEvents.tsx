import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import happyHourImage from '@/assets/osa-happy-hour.jpg';
import roundtableImage from '@/assets/osa-roundtable.jpg';
import demoNightImage from '@/assets/osa-demo-night.jpg';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  rsvpLink: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'OSA Happy Hour',
    date: 'Oct 25 2024',
    description: 'Founders & Equity networking at The Austin Club.',
    image: happyHourImage,
    rsvpLink: '#'
  },
  {
    id: '2',
    title: 'OSA Roundtable',
    date: 'Nov 28 2024',
    description: 'Small‑group mastermind on GTM and AI automation.',
    image: roundtableImage,
    rsvpLink: '#'
  },
  {
    id: '3',
    title: 'OSA Demo Night',
    date: 'Dec 15 2024',
    description: 'Austin founders pitch tools to investors.',
    image: demoNightImage,
    rsvpLink: '#'
  }
];

const CCVEvents = () => {
  const [events] = useState<Event[]>(sampleEvents);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRequestInvite = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Using placeholder webhook URL - would need actual Zapier webhook
      const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your-webhook-url/';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          event: selectedEvent,
          timestamp: new Date().toISOString(),
          type: 'event_invite_request'
        }),
      });

      toast({
        title: "Request Sent",
        description: "Your invite request has been submitted. We'll be in touch soon!",
      });

      setFormData({ name: '', email: '', company: '', message: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-8 tracking-tight leading-tight">
            Upcoming Events <span className="text-blue-600">Open Source Austin</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join Austin's most connected founders for networking, learning, and growth opportunities.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {events.map((event) => (
                <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg flex flex-col">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="aspect-video bg-gradient-to-br from-blue-50 to-slate-100 rounded-t-lg overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 space-y-4 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-blue-600">
                          <Calendar className="h-5 w-5" />
                          <span className="font-semibold">{event.date}</span>
                        </div>
                        
                        <h3 className="text-2xl font-semibold text-black">
                          {event.title}
                        </h3>
                        
                        <p className="text-slate-600 text-lg leading-relaxed flex-grow">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-slate-500">
                          <MapPin className="h-4 w-4" />
                          <span>Austin, TX</span>
                        </div>
                        
                        <Button
                          onClick={() => handleRequestInvite(event.title)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-auto"
                        >
                          Request Invite
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex -left-12 border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            <CarouselNext className="hidden lg:flex -right-12 border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          </Carousel>
        </div>

        {/* Inline Form */}
        {showForm && (
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-3xl p-8 border border-slate-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-black mb-2">
                  Request Invite to {selectedEvent}
                </h3>
                <p className="text-slate-600">
                  Fill out the form below and we'll send you an invite.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                
                <Input
                  type="text"
                  placeholder="Company / Title"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                />
                
                <Textarea
                  placeholder="Tell us about your startup or what you're working on..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                />
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {isLoading ? 'Sending...' : 'Send Request'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="px-6 rounded-xl border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CCVEvents;