import { type FoodRecommendationRequest, type UserData, type MoodTag } from "@/types/mood";

export const createFoodRecommendationRequest = (
  userProfile: UserData | unknown,
  selectedMoods: MoodTag[],
  chatText: string
): FoodRecommendationRequest => {
  return {
    userProfile,
    selectedMoods,
    chatText: chatText.trim(),
    timestamp: new Date().toISOString(),
  };
};

export const logFoodRecommendationRequest = (data: FoodRecommendationRequest) => {
  console.log('Food recommendation request data:', data);
};

// Future: Replace with actual API call
export const submitFoodRecommendationRequest = async (
  data: FoodRecommendationRequest
): Promise<void> => {
  // Mock API call - replace with actual implementation
  return new Promise((resolve) => {
    logFoodRecommendationRequest(data);
    // Simulate API delay
    setTimeout(resolve, 1000);
  });
};
