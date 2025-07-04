import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserData {
  name: string
  isVegan: boolean
  mbti: string
  allergies: string
}

interface UserStore {
  userData: UserData | null
  hasCompletedOnboarding: boolean
  setUserData: (data: UserData) => void
  clearUserData: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      hasCompletedOnboarding: false,
      setUserData: (data: UserData) => set({ 
        userData: data, 
        hasCompletedOnboarding: true 
      }),
      clearUserData: () => set({ 
        userData: null, 
        hasCompletedOnboarding: false 
      }),
    }),
    {
      name: 'user-storage',
    }
  )
)
