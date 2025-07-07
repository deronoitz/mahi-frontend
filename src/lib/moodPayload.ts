// Test payload format for reference
export const samplePayload = {
  "mood": [],
  "weather": "neutral",
  "healthy": "no", 
  "meal_time": "siang",
  "vegan": "no",
  "text_input": "aku baru selesai meeting siang ini, di dalam meeting banyak diskusi yang membingungkan. perasaanku jadi agak campur aduk",
  "using_text": false
};

// Type guards for validation
export const isValidMealTime = (value: string): value is 'pagi' | 'siang' | 'sore' | 'malam' => {
  return ['pagi', 'siang', 'sore', 'malam'].includes(value);
};

export const isValidYesNo = (value: string): value is 'yes' | 'no' => {
  return ['yes', 'no'].includes(value);
};

export const isValidWeather = (value: string): boolean => {
  // Common weather conditions
  const validWeatherConditions = [
    'neutral', 'hot', 'cold', 'rainy', 'sunny', 'cloudy', 'windy'
  ];
  return validWeatherConditions.includes(value);
};
