"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FoodItem {
  id: number;
  name: string;
  purchaseCount: number;
  emoji: string;
  gradient: string;
}

interface ApiResponse {
  makanan: string;
  count: number;
}

// Food emoji mapping based on food names
const getFoodEmoji = (index: number): string => {
  const foodEmojis = [
    "🍗",
    "🍖",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🥙",
    "🍳",
    "🥘",
    "🍲",
    "🥗",
    "🍿",
    "🧈",
    "🥓",
    "🥞",
    "🧇",
    "🍜",
    "🍝",
    "🍱",
    "🍘",
    "🍙",
    "🍚",
    "🍛",
    "🍜",
    "🍠",
    "🍢",
    "🍣",
    "🍤",
    "🍥",
    "🥮",
    "🍡",
    "🥟",
    "🥠",
    "🥡",
    "🦪",
    "🍌",
    "🥭",
    "🍊",
    "🍋",
    "🍈",
    "🍉",
    "🍇",
    "🍓",
    "🥝",
    "🍒",
    "🥥",
    "🥑",
  ];

  return foodEmojis[index % foodEmojis.length] || "🍽️";
};

// Gradient mapping for variety
const gradients = [
  "from-yellow-900/30 to-orange-900/30",
  "from-red-900/30 to-pink-900/30",
  "from-blue-900/30 to-cyan-900/30",
  "from-green-900/30 to-emerald-900/30",
  "from-amber-900/30 to-yellow-900/30",
  "from-purple-900/30 to-pink-900/30",
];

export function PopularFoods() {
  const [popularFoods, setPopularFoods] = useState<FoodItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularFoods = async () => {
      try {
        const response = await fetch(
          "https://ae-automation.fly.dev/webhook/list-top-food"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: [{ top5: ApiResponse[] }] = await response.json();

        if (data && data[0] && data[0].top5) {
          const mappedFoods: FoodItem[] = data[0].top5.map((item, index) => ({
            id: index + 1,
            name: item.makanan,
            purchaseCount: item.count,
            emoji: getFoodEmoji(index),
            gradient: gradients[index % gradients.length],
          }));

          setPopularFoods(mappedFoods);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchPopularFoods();
  }, []);


  if (error) {
    return (
      <div className="w-full px-6 mb-15">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-foreground">
            ⭐ Favorit orang-orang
          </h2>
        </div>
        <Card className="border-none rounded-3xl shadow-sm py-4 bg-red-100/20">
          <CardContent className="px-4 text-center">
            <p className="text-red-600">Gagal memuat data: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="w-full px-6 mb-15">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-foreground">
          ⭐ Favorit orang-orang
        </h2>
      </div>
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {popularFoods.map((food, index) => (
          <motion.div
            key={food.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
          >
            <Card
              className={cn(
                "border-none rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] py-4 relative overflow-hidden",
                index === 0
                  ? "bg-gradient-to-t from-[#ED6C45] to-[#FFBE27]"
                  : "bg-primary-100/20"
              )}
            >
              {/* Shining gold animation for first item */}
              {index === 0 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r z-10 from-transparent via-yellow-300 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              )}
              <CardContent className="px-4 relative z-10">
                <div className="flex items-center space-x-4">
                  {/* Food Image */}
                  <motion.div className="relative w-12 h-12 flex-shrink-0">
                    <div
                      className={cn(
                        `w-full h-full bg-gradient-to-br ${food.gradient} rounded-full flex items-center justify-center shadow-sm`,
                        index === 0 && "outline-4 outline-[#FFDF94]"
                      )}
                    >
                      <span className="text-2xl">{food.emoji}</span>
                    </div>
                  </motion.div>

                  <h2 className="text-2xl font-bold">{index + 1}</h2>
                  {/* Food Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base truncate">
                      {food.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-foreground">
                        {food.purchaseCount.toLocaleString("id-ID")} kali dibeli
                      </span>
                    </div>
                  </div>
                  {index === 0 && (
                    <svg
                      width="34"
                      height="33"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0489 0.927051C16.3483 0.00574006 17.6517 0.00574006 17.9511 0.927051L21.2658 11.1287C21.3996 11.5407 21.7836 11.8197 22.2168 11.8197H32.9434C33.9122 11.8197 34.3149 13.0593 33.5312 13.6287L24.8532 19.9336C24.5027 20.1883 24.3561 20.6396 24.4899 21.0517L27.8046 31.2533C28.104 32.1746 27.0495 32.9407 26.2658 32.3713L17.5878 26.0664C17.2373 25.8117 16.7627 25.8117 16.4122 26.0664L7.73419 32.3713C6.95048 32.9407 5.896 32.1746 6.19535 31.2533L9.51006 21.0517C9.64393 20.6396 9.49728 20.1883 9.14679 19.9336L0.468768 13.6287C-0.314945 13.0593 0.0878302 11.8197 1.05655 11.8197H11.7832C12.2164 11.8197 12.6004 11.5407 12.7342 11.1287L16.0489 0.927051Z"
                        fill="#FFD470"
                      />
                    </svg>
                  )}
                </div>
              </CardContent>{" "}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
