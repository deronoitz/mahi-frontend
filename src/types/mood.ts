import { type MoodTag } from "@/constants/mood";

export interface UserData {
  // Define based on your user store structure
  [key: string]: unknown;
}

export interface MoodSelectionState {
  selectedMoods: MoodTag[];
  showTextarea: boolean;
  chatText: string;
}

export interface FoodRecommendationRequest {
  userProfile: UserData | unknown;
  selectedMoods: MoodTag[];
  chatText: string;
  timestamp: string;
}

export interface MoodFormValues {
  mood: MoodTag[];
  weather: string;
  healthy: string;
  meal_time: string;
  vegan: string;
  text_input: string;
  using_text: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export type { MoodTag } from "@/constants/mood";
