'use client';

import { useLocation } from '@/hooks/useLocation';
import { MapPin, Loader2 } from 'lucide-react';

export const LocationDisplay = () => {
  const { suburb, loading, error } = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Detecting location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
        <MapPin className="h-4 w-4" />
        <span>Location unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
      <MapPin className="h-4 w-4" />
      <span>{suburb}</span>
    </div>
  );
};
