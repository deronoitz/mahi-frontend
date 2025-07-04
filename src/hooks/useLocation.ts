import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  suburb: string;
  loading: boolean;
  error: string | null;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    latitude: 0,
    longitude: 0,
    address: '',
    suburb: '',
    loading: true,
    error: null,
  });

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=id,en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();

      const suburb = data.address?.suburb || 
                     data.address?.neighbourhood || 
                     data.address?.hamlet || 
                     data.address?.quarter || 
                     data.address?.residential || 
                     data.address?.city_district ||
                     data.address?.city || 
                     data.address?.town || 
                     data.address?.village || 
                     'Unknown Area';
      
      const address = data.display_name || 'Unknown Location';
      
      return { suburb, address };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: 'Geolocation is not supported by this browser.',
        }));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const locationData = await reverseGeocode(latitude, longitude);
            setLocation({
              latitude,
              longitude,
              address: locationData.address,
              suburb: locationData.suburb,
              loading: false,
              error: null,
            });
          } catch {
            setLocation(prev => ({
              ...prev,
              latitude,
              longitude,
              loading: false,
              error: 'Failed to get location name',
            }));
          }
        },
        (error) => {
          let errorMessage = 'Failed to get location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          setLocation(prev => ({
            ...prev,
            loading: false,
            error: errorMessage,
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000, // Cache for 1 minute
        }
      );
    };

    getCurrentLocation();
  }, []);

  return location;
};
