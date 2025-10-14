
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConsultationCalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendarUrl?: string;
}

const ConsultationCalendarDialog = ({ 
  open, 
  onOpenChange,
  calendarUrl = "https://calendly.com/jakecrowley05/30min"
}: ConsultationCalendarDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule a Consultation</DialogTitle>
        </DialogHeader>
        <div className="h-[600px]">
          <iframe
            src={calendarUrl}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationCalendarDialog;
