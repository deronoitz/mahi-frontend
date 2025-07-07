import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MoodActionsProps {
  showTextarea: boolean;
  isLoading: boolean;
  isValidForSubmission: boolean;
  onChatClick: () => void;
  onContinue: () => void;
}

export function MoodActions({
  showTextarea,
  isLoading,
  isValidForSubmission,
  onChatClick,
  onContinue,
}: MoodActionsProps) {
  return (
    <>
      {!showTextarea && (
        <>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
            className="text-center font-bold text-base mb-3"
          >
            atau
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full !h-12 px-10"
                onClick={onChatClick}
              >
                Mau curhat aja
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: showTextarea ? 0.8 : 1.8,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="mt-10"
      >
        <div className="rounded-full p-0.5">
          <Button
            size="lg"
            type="submit"
            disabled={isLoading || !isValidForSubmission}
            onClick={onContinue}
            className="rounded-full w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 border-0 shadow-lg relative overflow-hidden"
          >
            <span className="relative z-10 text-white">Lanjutkan!</span>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
