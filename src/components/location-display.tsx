"use client";

import { useLocation } from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";
import { MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const getWeatherIcon = (iconCode: string | undefined) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const LocationDisplay = () => {
  const { suburb, loading, error, latitude, longitude } = useLocation();
  const { weather } = useWeather({
    lat: latitude,
    lon: longitude,
    apiKey: "92ff0cab16248e282d0e3eebb7ea0c07",
  });

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
      <motion.img
        src={getWeatherIcon(weather?.weather?.[0]?.icon)}
        alt={weather?.weather?.[0]?.description}
        className="w-8 h-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      />
      <span className="capitalize">{weather?.weather[0].description}</span>
    </div>
  );
};
