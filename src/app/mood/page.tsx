"use client";

import { motion } from "framer-motion";
import { useMoodForm } from "@/hooks/useMoodForm";
import { MoodPageHeader } from "@/components/mood/mood-page-header";
import { MoodSelector } from "@/components/mood/mood-selector";
import { ChatInput } from "@/components/mood/chat-input";
import { MoodActions } from "@/components/mood/mood-actions";
import { LoadingScreen } from "@/components/mood/loading-screen";

export default function MoodPage() {
  const { 
    formik, 
    isLoading, 
    animationData, 
    toggleMood, 
    toggleTextInput, 
    isValidForSubmission 
  } = useMoodForm();

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      className="min-h-screen px-8 bg-gradient-to-b from-[#3c2f6b] via-[#000000] to-[#000000]"
      style={{ backgroundImage: "linear-gradient(#3c2f6b, #000000 30%)" }}
    >
      <LoadingScreen 
        isVisible={isLoading} 
        animationData={animationData} 
      />

      <MoodPageHeader 
        title="Makan Apa Kita Hari Ini?"
        subtitle="Aku bakal nyariin kamu makanan berdasarkan kondisi kamu, kamu bisa pilih mood kamu atau kalo kamu juga bisa curhat biar aku bisa nyariin makanan yang lebih spesifik."
      />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto"
      >
        <form onSubmit={formik.handleSubmit}>
          {!formik.values.using_text ? (
            <MoodSelector 
              selectedMoods={formik.values.mood}
              onToggleMood={toggleMood}
            />
          ) : (
            <ChatInput 
              chatText={formik.values.text_input}
              onChatTextChange={(value) => formik.setFieldValue('text_input', value)}
              onBack={toggleTextInput}
            />
          )}

          <MoodActions 
            showTextarea={formik.values.using_text}
            isLoading={isLoading}
            isValidForSubmission={isValidForSubmission()}
            onChatClick={toggleTextInput}
            onContinue={() => formik.handleSubmit()}
          />
        </form>
        
        {/* Debug Information - Only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg text-xs text-gray-300">
            <h4 className="font-bold mb-2">Form Values (Debug):</h4>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(formik.values, null, 2)}
            </pre>
          </div>
        )}
      </motion.main>
    </motion.div>
  );
}
