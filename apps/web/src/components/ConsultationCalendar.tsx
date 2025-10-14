
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { useToast } from './ui/use-toast';

interface ConsultationCalendarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const ConsultationCalendar = ({ open, onOpenChange }: ConsultationCalendarProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const { toast } = useToast();

  const handleSchedule = () => {
    if (date && selectedTime) {
      const formattedDate = format(date, 'MMMM do, yyyy');
      const subject = encodeURIComponent(`Consultation Request for ${formattedDate} at ${selectedTime}`);
      const body = encodeURIComponent(
        `Hello Jake,\n\nI would like to schedule a consultation for ${formattedDate} at ${selectedTime}.\n\nBest regards,`
      );
      
      window.location.href = `mailto:jakecrowley05@gmail.com?subject=${subject}&body=${body}`;
      
      toast({
        title: "Consultation Request Sent",
        description: "Check your email client to send the consultation request.",
      });
      
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Consultation</DialogTitle>
          <DialogDescription>
            Select a date and time for our consultation call.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={{ before: new Date() }}
          />
        </div>

        {date && (
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="w-full"
              >
                {time}
              </Button>
            ))}
          </div>
        )}

        <Button
          onClick={handleSchedule}
          disabled={!date || !selectedTime}
          className="w-full mt-4"
        >
          Schedule Consultation
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationCalendar;
