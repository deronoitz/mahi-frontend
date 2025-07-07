import { useWeather } from '@/hooks/useWeather';
import { WeatherCard } from './weather-card';
import { motion } from 'framer-motion';

interface WeatherDisplayProps {
  className?: string;
}

export const WeatherDisplay = ({ className }: WeatherDisplayProps) => {
  const { weather, loading, error } = useWeather({
    lat: -6.3055556169566644,
    lon: 106.83602357337594,
    apiKey: '92ff0cab16248e282d0e3eebb7ea0c07'
  });

  if (loading) {
    return (
      <motion.div 
        className={`flex justify-center items-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-white/80">Memuat data cuaca...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className={`flex justify-center items-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/30 text-white">
          <p className="text-sm">Gagal memuat data cuaca: {error}</p>
        </div>
      </motion.div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className={className}>
      <WeatherCard weather={weather} />
    </div>
  );
};
