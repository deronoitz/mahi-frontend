'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/userStore"
import { OnboardingForm } from "@/components/onboarding-form"

export default function ProfilePage() {
  const { userData } = useUserStore()
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleEditProfile = () => {
    setShowOnboarding(true)
  }

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Profile Info */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Informasi Pribadi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="size-12 bg-primary-300 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-black">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "P"}
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
                  <div className="text-xs text-zinc-400 uppercase tracking-wide">Status Diet</div>
                  <div className="text-sm text-white mt-1">
                    {userData?.isVegan ? "🌱 Vegan" : "🍽️ Non-Vegan"}
                  </div>
                </div>
                
                <div className="py-2 px-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="text-xs text-zinc-400 uppercase tracking-wide">Alergi</div>
                  <div className="text-sm text-white mt-1">
                    {userData?.allergies || "Tidak ada alergi yang tercatat"}
                  </div>
                </div>
                
                <div className="py-2 px-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="text-xs text-zinc-400 uppercase tracking-wide">Tipe Kepribadian</div>
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
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Statistik Kamu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">47</div>
                <div className="text-sm text-zinc-400">Makanan Dicoba</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Foods - Last 7 Days */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Makanan 7 Hari Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Nasi Gudeg", date: "Hari ini", mood: "😊" },
                { name: "Soto Ayam", date: "Kemarin", mood: "😋" },
                { name: "Gado-gado", date: "2 hari lalu", mood: "🤤" },
                { name: "Rendang", date: "3 hari lalu", mood: "😍" },
                { name: "Bakso", date: "4 hari lalu", mood: "😊" },
                { name: "Ayam Geprek", date: "5 hari lalu", mood: "🔥" },
                { name: "Nasi Padang", date: "6 hari lalu", mood: "😋" }
              ].map((food, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-700/50 hover:border-green-500/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{food.mood}</span>
                    <div>
                      <div className="font-bold text-sm text-white">{food.name}</div>
                      <div className="text-xs text-zinc-400">{food.date}</div>
                    </div>
                  </div>
               
                </div>
              ))}
            </div>
        
          </CardContent>
        </Card>

       
      </main>

      {/* Onboarding Form Modal */}
      <OnboardingForm
        isOpen={showOnboarding}
        onClose={handleCloseOnboarding}
      />
    </div>
  )
}
