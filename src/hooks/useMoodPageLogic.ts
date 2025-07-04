import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useMoodSelection } from "@/hooks/useMoodSelection";
import { useLoadingAnimation } from "@/hooks/useLoadingAnimation";
import { 
  createFoodRecommendationRequest, 
  submitFoodRecommendationRequest 
} from "@/lib/foodRecommendation";

export function useMoodPageLogic() {
  const router = useRouter();
  const { userData } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const moodSelection = useMoodSelection();
  const { animationData } = useLoadingAnimation();

  const handleContinue = async () => {
    setIsLoading(true);
    
    try {
      const requestData = createFoodRecommendationRequest(
        userData,
        moodSelection.selectedMoods,
        moodSelection.chatText
      );
      
      await submitFoodRecommendationRequest(requestData);
      
      // Mock loading delay
      setTimeout(() => {
        router.push("/result");
      }, 10000);
    } catch (error) {
      console.error("Error submitting food recommendation request:", error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    animationData,
    moodSelection,
    handleContinue,
  };
}
