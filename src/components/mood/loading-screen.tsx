import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import { AnimationData } from "@/hooks/useLoadingAnimation";

interface LoadingScreenProps {
  isVisible: boolean;
  animationData: AnimationData | null;
  title?: string;
  subtitle?: string;
}

export function LoadingScreen({ 
  isVisible, 
  animationData, 
  title = "Sedang mencari makanan untukmu...",
  subtitle = "Tunggu sebentar ya!"
}: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8"
      >
        {animationData && (
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: 200, height: 200 }}
          />
        )}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-center mb-2 text-white"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-300 text-center"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
