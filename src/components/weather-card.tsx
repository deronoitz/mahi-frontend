import { WeatherData } from '@/types/weather';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { main, weather: weatherDetails, name } = weather;
  const weatherInfo = weatherDetails[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-white/20 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.img
                src={getWeatherIcon(weatherInfo.icon)}
                alt={weatherInfo.description}
                className="w-16 h-16"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              />
              <div>
                <motion.h3 
                  className="text-2xl font-bold"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {Math.round(main.temp)}°C
                </motion.h3>
                <motion.p 
                  className="text-sm text-white/80 capitalize"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {weatherInfo.description}
                </motion.p>
              </div>
            </div>
            
            <div className="text-right">
              <motion.p 
                className="text-sm text-white/80"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {name}
              </motion.p>
              <motion.p 
                className="text-xs text-white/60"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Terasa seperti {Math.round(main.feels_like)}°C
              </motion.p>
            </div>
          </div>
       
        </CardContent>
      </Card>
    </motion.div>
  );
};
