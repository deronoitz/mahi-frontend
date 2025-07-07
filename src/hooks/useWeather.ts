import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '@/types/weather';

interface UseWeatherParams {
  lat: number;
  lon: number;
  apiKey: string;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWeather = ({ lat, lon, apiKey }: UseWeatherParams): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, apiKey]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const refetch = () => {
    fetchWeather();
  };

  return { weather, loading, error, refetch };
};
