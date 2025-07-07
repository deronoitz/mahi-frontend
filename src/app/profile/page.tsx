"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { OnboardingForm } from "@/components/onboarding-form";
import Lottie from "react-lottie-player";

interface FoodHistory {
  id?: string;
  name?: string;
  makanan?: string;
  timestamp?: string;
  created_at?: string;
  mood?: string;
  [key: string]: unknown; // untuk property lain yang mungkin ada di response API
}

export default function ProfilePage() {
  const { userData } = useUserStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [totalMakanan, setTotalMakanan] = useState<number>(0);
  const [historyMakanan, setHistoryMakanan] = useState<FoodHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lottieData, setLottieData] = useState(null);

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Tanggal tidak tersedia";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // return original if invalid

      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Helper function to get food name from various possible fields
  const getFoodName = (food: FoodHistory) => {
    return food.makanan as string;
  };
  useEffect(() => {
    // Load Lottie animation data
    fetch("/bg-light.json")
      .then((response) => response.json())
      .then((data) => setLottieData(data))
      .catch((error) =>
        console.error("Error loading Lottie animation:", error)
      );
  }, []);

  useEffect(() => {
    const fetchMakananData = async () => {
      try {
        const userId = localStorage.getItem("makhi_session_id");

        if (!userId) {
          console.warn("User ID tidak ditemukan di localStorage");
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `https://ae-automation.fly.dev/webhook/get-list-pencarian?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log untuk debugging

        // Helper function to sort by created_at descending
        const sortByCreatedAt = (items: FoodHistory[]) => {
          return items.sort((a, b) => {
            const dateA = new Date(
              (a.created_at as string) || (a.timestamp as string) || 0
            ).getTime();
            const dateB = new Date(
              (b.created_at as string) || (b.timestamp as string) || 0
            ).getTime();
            return dateB - dateA; // descending order (newest first)
          });
        };

        // Set history data
        if (Array.isArray(data)) {
          const sortedData = sortByCreatedAt([...data]);
          setHistoryMakanan(sortedData);
          setTotalMakanan(sortedData.length);
        } else if (data.data && Array.isArray(data.data)) {
          const sortedData = sortByCreatedAt([...data.data]);
          setHistoryMakanan(sortedData);
          setTotalMakanan(sortedData.length);
        } else if (data.total && typeof data.total === "number") {
          setTotalMakanan(data.total);
          // Jika ada field lain yang berisi array history, update di sini
          if (data.history && Array.isArray(data.history)) {
            const sortedHistory = sortByCreatedAt([...data.history]);
            setHistoryMakanan(sortedHistory);
          }
        } else {
          console.warn("Format response tidak sesuai ekspektasi:", data);
        }
      } catch (error) {
        console.error("Error fetching makanan data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMakananData();
  }, []);

  const handleEditProfile = () => {
    setShowOnboarding(true);
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3c2f6b] via-[#000000] to-[#000000] text-white">
      {/* Lottie Background */}
      {lottieData && (
        <div className="fixed top-0 right-0 left-0 z-0">
          <Lottie
            animationData={lottieData}
            play
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className="fixed inset-0 z-10 bg-gradient-to-b from-[#3c2f6b]/80 via-[#000000]/60 to-[#000000]/80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(60, 47, 107, 0.8), rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.8))",
        }}
      />
      {/* Main Content */}
      <main className="px-4 py-6 space-y-6 z-10 relative">
        {/* Profile Info */}
        <Card className="bg-zinc-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Informasi Pribadi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="size-12 bg-primary-300 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-black">
                    {userData?.name
                      ? userData.name.charAt(0).toUpperCase()
                      : "P"}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {userData?.name || "Pengguna"}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {userData?.mbti || "MBTI belum diatur"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="py-2 px-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="text-xs text-zinc-400 uppercase tracking-wide">
                    Status Diet
                  </div>
                  <div className="text-sm text-white mt-1">
                    {userData?.isVegan ? "🌱 Vegan" : "🍽️ Non-Vegan"}
                  </div>
                </div>

                <div className="py-2 px-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="text-xs text-zinc-400 uppercase tracking-wide">
                    Alergi
                  </div>
                  <div className="text-sm text-white mt-1">
                    {userData?.allergies || "Tidak ada alergi yang tercatat"}
                  </div>
                </div>

                <div className="py-2 px-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="text-xs text-zinc-400 uppercase tracking-wide">
                    Tipe Kepribadian
                  </div>
                  <div className="text-sm text-white mt-1">
                    {userData?.mbti || "Belum diatur"}
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:border-green-500"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-zinc-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Statistik Kamu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">
                  {isLoading ? "..." : totalMakanan}
                </div>
                <div className="text-sm text-zinc-400">Makanan Dicoba</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Foods - Last 7 Days */}
        <Card className="bg-zinc-900/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Histori Makanan Kamu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center text-zinc-400 py-8">
                  Memuat data histori makanan...
                </div>
              ) : historyMakanan.length > 0 ? (
                historyMakanan.slice(0, 10).map((food, index) => (
                  <div
                    key={food.id || index}
                    className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-700/50 hover:border-green-500/30"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {(food.mood as string) || "🍽️"}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-white">
                          {getFoodName(food)}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {formatDate(food.created_at as string)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-zinc-400 py-8">
                  <p>Belum ada histori makanan</p>
                  <p className="text-xs mt-2">
                    Mulai cari makanan untuk melihat histori di sini
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Onboarding Form Modal */}
      <OnboardingForm isOpen={showOnboarding} onClose={handleCloseOnboarding} />
    </div>
  );
}
