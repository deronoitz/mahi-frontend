import { useState, useEffect } from "react";

export interface AnimationData {
  // Lottie animation data structure
  [key: string]: unknown;
}

export function useLoadingAnimation() {
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoadingAnimation(true);
        const response = await fetch("/loading.json");
        
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`);
        }
        
        const data = await response.json();
        setAnimationData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading animation:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setAnimationData(null);
      } finally {
        setIsLoadingAnimation(false);
      }
    };

    loadAnimation();
  }, []);

  return {
    animationData,
    isLoadingAnimation,
    error,
  };
}
