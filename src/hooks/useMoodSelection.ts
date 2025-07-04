import { useState } from "react";
import { MoodTag } from "@/constants/mood";

export interface MoodState {
  selectedMoods: MoodTag[];
  showTextarea: boolean;
  chatText: string;
}

export function useMoodSelection() {
  const [selectedMoods, setSelectedMoods] = useState<MoodTag[]>([]);
  const [showTextarea, setShowTextarea] = useState(false);
  const [chatText, setChatText] = useState("");

  const toggleMood = (mood: MoodTag) => {
    setSelectedMoods((prev) => {
      if (prev.includes(mood)) {
        return prev.filter((m) => m !== mood);
      } else {
        return [...prev, mood];
      }
    });
  };

  const handleChatClick = () => {
    setShowTextarea(true);
  };

  const handleBackClick = () => {
    setShowTextarea(false);
  };

  const resetMoodSelection = () => {
    setSelectedMoods([]);
    setShowTextarea(false);
    setChatText("");
  };

  const isValidForSubmission = showTextarea 
    ? chatText.trim() !== "" 
    : selectedMoods.length > 0;

  return {
    selectedMoods,
    showTextarea,
    chatText,
    setChatText,
    toggleMood,
    handleChatClick,
    handleBackClick,
    resetMoodSelection,
    isValidForSubmission,
  };
}
