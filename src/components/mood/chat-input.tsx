import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  chatText: string;
  onChatTextChange: (text: string) => void;
  onBack: () => void;
}

export function ChatInput({ chatText, onChatTextChange, onBack }: ChatInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="text-center font-bold text-base mb-3"
      >
        Ceritain aja kondisi kamu sekarang
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="mb-5"
      >
        <textarea
          value={chatText}
          onChange={(e) => onChatTextChange(e.target.value)}
          placeholder="Misalnya: Aku lagi stress banget karena deadline kerja, butuh makanan yang bisa bikin mood aku lebih baik..."
          className="w-full p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-[#ED6C45] focus:outline-none transition-colors duration-200"
          rows={6}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        className="flex gap-3"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 rounded-full !h-12"
            onClick={onBack}
          >
            Kembali
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
