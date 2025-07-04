"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";

const moodTags = [
  "Malas",
  "Stress",
  "Fokus",
  "Bahagia",
  "Capek",
  "Galau",
  "Kesal",
  "Santai",
  "Sedih",
  "Netral",
  "Makanan Sehat",
];

// Random colors for each mood
const moodColors = {
  Malas: {
    bg: "bg-violet-100",
    border: "border-violet-300",
    text: "text-violet-700",
    selected: "border-violet-500 bg-violet-500",
    selectedText: "text-white",
  },
  Stress: {
    bg: "bg-rose-100",
    border: "border-rose-300",
    text: "text-rose-700",
    selected: "border-rose-500 bg-rose-500",
    selectedText: "text-white",
  },
  Fokus: {
    bg: "bg-sky-100",
    border: "border-sky-300",
    text: "text-sky-700",
    selected: "border-sky-500 bg-sky-500",
    selectedText: "text-white",
  },
  Bahagia: {
    bg: "bg-amber-100",
    border: "border-amber-300",
    text: "text-amber-700",
    selected: "border-amber-500 bg-amber-500",
    selectedText: "text-white",
  },
  Capek: {
    bg: "bg-neutral-100",
    border: "border-neutral-300",
    text: "text-neutral-700",
    selected: "border-neutral-500 bg-neutral-500",
    selectedText: "text-white",
  },
  Galau: {
    bg: "bg-purple-100",
    border: "border-purple-300",
    text: "text-purple-700",
    selected: "border-purple-500 bg-purple-500",
    selectedText: "text-white",
  },
  Kesal: {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-700",
    selected: "border-red-500 bg-red-500",
    selectedText: "text-white",
  },
  Santai: {
    bg: "bg-emerald-100",
    border: "border-emerald-300",
    text: "text-emerald-700",
    selected: "border-emerald-500 bg-emerald-500",
    selectedText: "text-white",
  },
  Sedih: {
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-700",
    selected: "border-blue-500 bg-blue-500",
    selectedText: "text-white",
  },
  Netral: {
    bg: "bg-stone-100",
    border: "border-stone-300",
    text: "text-stone-700",
    selected: "border-stone-500 bg-stone-500",
    selectedText: "text-white",
  },
  "Makanan Sehat": {
    bg: "bg-lime-100",
    border: "border-lime-300",
    text: "text-lime-700",
    selected: "border-lime-500 bg-lime-500",
    selectedText: "text-white",
  },
};

export default function MoodPage() {
  const router = useRouter();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showTextarea, setShowTextarea] = useState(false);
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load the animation data
    fetch('/loading.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const toggleMood = (mood: string) => {
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

  const handleContinue = () => {
    setIsLoading(true);
    // Mock loading dengan timeout 2 detik
    setTimeout(() => {
      router.push("/result");
    }, 10000);
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.8,
      }}
      className="min-h-screen px-8"
    >
      {/* Loading Screen */}
      {isLoading && (
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
            Sedang mencari makanan untukmu...
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-center"
          >
            Tunggu sebentar ya!
          </motion.p>
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold pt-10 text-center">
          Makan Apa Kita Hari Ini?
        </h1>
      </motion.header>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="text-sm my-8 relative text-center leading-6 font-semibold"
      >
        <span className="absolute text-[128px] text-white/10 top-5 left-0">
          &ldquo;
        </span>
        Aku bakal nyariin kamu makanan berdasarkan kondisi kamu, kamu bisa pilih
        mood kamu atau kalo kamu juga bisa curhat biar aku bisa nyariin makanan
        yang lebih spesifik
      </motion.p>
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto"
      >
        {!showTextarea ? (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="text-center font-bold text-base mb-3"
            >
              Mood kamu sekarang gimana?
            </motion.h3>
            {/* Mood Tags */}
            <div className="flex flex-wrap gap-3 justify-center mb-5">
              {moodTags.map((mood) => {
                const colors = moodColors[mood as keyof typeof moodColors];
                const isSelected = selectedMoods.includes(mood);

                return (
                  <div
                    key={mood}
                    className={`px-4 py-1 cursor-pointer transition-all duration-200 border-2 rounded-full flex items-center gap-2 ${
                      isSelected
                        ? colors.selected
                        : `${colors.bg} ${colors.border} hover:${
                            colors.selected.split(" ")[1]
                          } hover:shadow-sm`
                    }`}
                    onClick={() => toggleMood(mood)}
                  >
                    {isSelected && <Check size={14} className="text-white" />}
                    <span
                      className={`font-semibold text-sm ${
                        isSelected ? colors.selectedText : colors.text
                      }`}
                    >
                      {mood}
                    </span>
                  </div>
                );
              })}
            </div>

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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full !h-12 px-10"
                  onClick={handleChatClick}
                >
                  Mau curhat aja
                </Button>
              </motion.div>
            </motion.div>
          </>
        ) : (
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
                onChange={(e) => setChatText(e.target.value)}
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
                  onClick={() => setShowTextarea(false)}
                >
                  Kembali
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="w-full rounded-full"
              disabled={
                isLoading ||
                (showTextarea
                  ? chatText.trim() === ""
                  : selectedMoods.length === 0)
              }
              onClick={handleContinue}
            >
              {isLoading ? "Mencari makanan..." : "Lanjutkan"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
