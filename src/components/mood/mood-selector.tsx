import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { MOOD_TAGS, MOOD_COLORS, type MoodTag } from "@/constants/mood";

interface MoodSelectorProps {
  selectedMoods: MoodTag[];
  onToggleMood: (mood: MoodTag) => void;
}

export function MoodSelector({ selectedMoods, onToggleMood }: MoodSelectorProps) {
  return (
    <>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        className="text-center font-bold text-base mb-3"
      >
        Mood kamu sekarang gimana?
      </motion.h3>
      <div className="flex flex-wrap gap-3 justify-center mb-5">
        {MOOD_TAGS.map((mood) => {
          const colors = MOOD_COLORS[mood];
          const isSelected = selectedMoods.includes(mood);

          return (
            <motion.div
              key={mood}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * MOOD_TAGS.indexOf(mood), duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1 cursor-pointer transition-all duration-200 border-2 rounded-full flex items-center gap-2 ${
                isSelected
                  ? colors.selected
                  : `${colors.bg} ${colors.border} hover:${
                      colors.selected.split(" ")[1]
                    } hover:shadow-sm`
              }`}
              onClick={() => onToggleMood(mood)}
            >
              {isSelected && <Check size={14} className="text-white" />}
              <span
                className={`font-semibold text-sm ${
                  isSelected ? colors.selectedText : colors.text
                }`}
              >
                {mood}
              </span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
