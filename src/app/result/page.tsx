"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ResultPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );
  const router = useRouter();

  const handleCocoknihClick = () => {
    if (selectedRestaurant) {
      toast.success("Terima kasih sudah menggunakan rekomendasi!", {
        description: "Semoga makanannya enak!",
        duration: 2000,
      });

      // Redirect ke home setelah 2 detik
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  // Mock data untuk restoran
  const restaurants = [
    {
      id: 1,
      name: "Warung Makan Bahari",
      price: "Rp 25.000",
      purchaseCount: 47,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCjZrF1RayeGdZpOpouYXmT9zln6UhLyDEmn3Pxs21BwbNViyJvpXb4CMhkmkKqOk_Ko6yCCMkq3Zedjnspl3cuNWzFtqYVkm-IZSBg7Ykc_kNds-kceqxFsQCNu-sAckBV1e1Ji-9PqSQkBQXcQ56ZqwRfKiRYxzOlZx5PvpYe5hNtymMtNc05CJnq7cfC7meUtXZ3jFC4on2kwAXYxckT0B7qEjX2Eapex0dYe6J83uJFOFQRqvKUriHXinULkej9jFedrr__6m6l",
    },
    {
      id: 2,
      name: "Rumah Makan Padang Sederhana",
      price: "Rp 30.000",
      purchaseCount: 123,
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      name: "Warung Nasi Gudeg Yu Djum",
      price: "Rp 20.000",
      purchaseCount: 89,
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop",
    },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between">
      {/* Header */}
      <div>
        {/* Food Recommendation Grid */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 px-8 bg-gradient-to-b from-[#1e6040] to-[#0b281e]"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-bold text-center text-2xl mt-10 mb-4"
          >
            Mending hari ini <br /> kamu makan...
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-3 pb-3"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhCwzDjaPv59wPy_UR9az2U7jseVo4L2h8oy1ycPDjdjhoTn7D2Eqejao2yZYXmj-QJmFI84UNsP65CzgTQsPoNNtpLKA6pFBSxUSZSy13cakej70HC72muQSotSOvUV2jJKCN-CnRfIs-YEvpmpUUvIAx05IZXQcEAIT1qo2DkHLHYFwNJ1N8VHHkuJqLRByewXKZeARTrsk02MQvrAdZlSiVh8ReQ8uBQBEkFFlknVnl172tRvwr-0E3OpFmYIf3n6kIe3apz9Pw")`,
              }}
            ></div>
            <div>
              <p className="text-white text-2xl text-center font-bold leading-normal">
                Nasi Goreng
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Recommendation Reason */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-8 pb-3 pt-5">
            Alasan Rekomendasi
          </h2>
          <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-8">
            Makanan ini direkomendasikan karena Anda menyukai makanan pedas dan
            memiliki riwayat kesehatan yang baik. Nasi goreng adalah makanan khas
            Indonesia yang kaya akan rasa dan nutrisi.
          </p>
        </motion.div>

        {/* Restaurants Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-8 pb-3 pt-5">
            Daftar Restoran
            <p className="text-sm font-medium text-muted-foreground">
              Restoran yang menyediakan Nasi Goreng
            </p>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="px-8 space-y-3 flex flex-col"
        >
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2 + (index * 0.1), 
                ease: "easeOut" 
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRestaurant(restaurant.id)}
              className={`flex items-center gap-4 border-2 rounded-xl px-4 min-h-[72px] py-2 transition-colors cursor-pointer ${
                selectedRestaurant === restaurant.id
                  ? "bg-primary-100/40 border-primary-300 shadow-lg"
                  : "bg-primary-100/20 border-white hover:bg-primary-100/30"
              }`}
            >
              <div className="flex flex-col justify-center flex-1">
                <p className="text-white text-base font-bold leading-normal line-clamp-1">
                  {restaurant.name}
                </p>
                <p className="text-xs">
                  Dibeli {restaurant.purchaseCount} kali
                </p>
                <p className="text-primary-300 text-sm font-bold leading-normal line-clamp-2">
                  {restaurant.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          className="px-8 flex flex-col gap-3 mt-10 mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button size="lg" variant="outline" className="w-full rounded-full">
              Gak cocok nih! Cari lagi
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: selectedRestaurant ? 1.02 : 1 }}
            whileTap={{ scale: selectedRestaurant ? 0.98 : 1 }}
          >
            <Button
              size="lg"
              className="w-full rounded-full"
              disabled={!selectedRestaurant}
              onClick={handleCocoknihClick}
            >
              Cocok nih!
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
