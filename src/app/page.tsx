"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FactsCarousel } from "@/components/facts-carousel";
import { PopularFoods } from "@/components/popular-foods";
import { Button } from "@/components/ui/button";
import { LocationDisplay } from "@/components/location-display";
import { OnboardingForm } from "@/components/onboarding-form";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Lottie from "react-lottie-player";

export default function Home() {
  const { hasCompletedOnboarding } = useUserStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Load Lottie animation data
    fetch('/bg-light.json')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  useEffect(() => {
    // Check if user has completed onboarding when component mounts
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [hasCompletedOnboarding]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Lottie Background */}
      {lottieData && (
        <div className="fixed top-0 right-0 left-0 z-0">
          <Lottie
            animationData={lottieData}
            play
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div 
        className="fixed inset-0 z-10 bg-gradient-to-b from-[#3c2f6b]/80 via-[#000000]/60 to-[#000000]/80"
        style={{ backgroundImage: "linear-gradient(rgba(60, 47, 107, 0.8), rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.8))" }}
      />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen">

      {/* Header */}
      <header className="relative pt-10">
        <h2 className="font-bold text-5xl text-white text-center">
          {new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h2>

        <div className="pt-2 pb-4">
          <LocationDisplay />
        </div>

        <h1 className="text-2xl font-bold text-center">
          Makan Apa Kita Hari Ini?
        </h1>
      </header>
      {/* Main Content */}
      <main className="pb-4">
        {/* Section 1: Facts Carousel */}
        <section className="py-6">
          <FactsCarousel />
        </section>

        {/* Section 2: Popular Foods */}
        <section className="py-1">
          <PopularFoods />
        </section>

        <Link href="/mood">
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, -1, 1, 0],
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              filter: [
                "drop-shadow(0 0 10px rgba(249, 115, 22, 0.4)) drop-shadow(0 0 40px rgba(239, 68, 68, 0.3))",
                "drop-shadow(0 0 30px rgba(249, 115, 22, 0.7)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.5))",
                "drop-shadow(0 0 10px rgba(249, 115, 22, 0.4)) drop-shadow(0 0 40px rgba(239, 68, 68, 0.3))",
              ],
              y: [0, -3, 0],
            }}
            transition={{
              filter: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 400,
                damping: 17,
              },
              rotate: {
                duration: 0.2,
              },
            }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 rounded-full"
          >
            <motion.div
              animate={{
                background: [
                  "linear-gradient(45deg, #f97316, #ef4444)",
                  "linear-gradient(45deg, #ea580c, #dc2626)",
                  "linear-gradient(45deg, #f97316, #ef4444)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full p-0.5"
            >
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 border-0 shadow-lg relative overflow-hidden"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.3)",
                      "0 0 20px rgba(255, 255, 255, 0.6)",
                      "0 0 10px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 text-white"
                >
                  Aku mau makan! 🤤
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </Link>
      </main>

      {/* Onboarding Form */}
      {!hasCompletedOnboarding && (
        <OnboardingForm
          isOpen={showOnboarding}
          onClose={handleCloseOnboarding}
        />
      )}
      </div>
    </div>
  );
}
