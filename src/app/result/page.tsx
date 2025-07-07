"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useFoodStore } from "@/store/foodStore";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

interface Restaurant {
  restoran: string;
  price: string | number;
  harga?: string | number; // Support both 'price' and 'harga'
  alamat?: string;
  jarak?: string; // Optional, can be used for distance
  rating?: number;
}

interface ApiResponse {
  makanan: string;
  gambar: string;
  reason: string;
  notes: string;
  list_restaurant: Restaurant[];
}

// Function to format price as Rupiah
const formatRupiah = (price: string | number): string => {
  // Convert to number if it's a string
  const numericPrice =
    typeof price === "string" ? parseInt(price.replace(/\D/g, "")) : price;

  // Format as Indonesian Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

export default function ResultPage() {
  const router = useRouter();
  const { recommendation, error } = useFoodStore();
  const { userData } = useUserStore();

  const handleCocoknihClick = async () => {
    try {
      // Ambil user_id dari localStorage
      const sessionId = localStorage.getItem("makhi_session_id");

      if (!sessionId) {
        toast.error("Session tidak ditemukan. Silakan refresh halaman.");
        return;
      }

      // Prepare payload
      const payload = {
        user_id: sessionId,
        makanan: foodName,
        user_data: userData,
      };

      // Kirim data ke API
      const response = await fetch(
        "https://ae-automation.fly.dev/webhook/submit-makanan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Terima kasih sudah menggunakan rekomendasi!", {
        description: "Semoga makanannya enak!",
        duration: 2000,
      });

      // Redirect ke home setelah 2 detik
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting food data:", error);
      toast.error("Gagal mengirim data. Silakan coba lagi.");
    }
  };

  const data = (recommendation?.[0] as ApiResponse) || ({} as ApiResponse);

  const restaurants = Array.isArray(data?.list_restaurant)
    ? data.list_restaurant
    : [];
  const foodName = data.makanan || "";
  const foodImage = data.gambar || "";
  const recommendationReason = data.reason || "";
  const notes = data.notes || "";

  // Redirect to home if no recommendation data
  useEffect(() => {
    if (!recommendation || recommendation.length === 0 || !data.makanan) {
      router.push("/");
    }
  }, [recommendation, data.makanan, router]);

  // Show error state if there's an error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">Oops! Terjadi kesalahan</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <Button onClick={() => router.push("/mood")} variant="outline">
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

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
                backgroundImage: `url("${foodImage}")`,
              }}
            ></div>
            <div>
              <h1 className="text-white text-2xl text-center font-bold leading-normal">
                {foodName}
              </h1>
              <p className="text-center text-xs leading-6">{recommendationReason}</p>
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
          <p className="text-white text-sm font-normal leading-normal pb-3 pt-1 px-8">
            {notes}
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
              Restoran yang menyediakan {foodName}
            </p>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="px-8 space-y-3 flex flex-col"
        >
          {restaurants.map((restaurant: Restaurant, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.2 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 border-2 rounded-xl px-4 min-h-[72px] py-2 transition-colors bg-primary-100/20 border-white hover:bg-primary-100/30"
            >
              <div className="flex flex-col justify-center flex-1">
                <p className="text-white text-base font-bold leading-normal line-clamp-1">
                  {restaurant.restoran}
                </p>
                <p className="text-xs">
                  Jarak {restaurant.jarak || "Lokasi tidak tersedia"}
                </p>
                <p className="text-primary-300 text-sm font-bold leading-normal line-clamp-2">
                  {formatRupiah(restaurant.harga || restaurant.price)}
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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/mood">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full"
              >
                Gak cocok nih! Cari lagi
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              variant="main"
              className="w-full rounded-full text-sm border-0"
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
