import { create } from 'zustand'

export interface FoodRecommendation {
  // Define the structure based on your API response
  // You can update this interface when you know the exact response structure
  [key: string]: unknown
}

interface FoodStore {
  recommendation: FoodRecommendation | null
  isLoading: boolean
  error: string | null
  setRecommendation: (data: FoodRecommendation) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearRecommendation: () => void
}

export const useFoodStore = create<FoodStore>((set) => ({
  recommendation: null,
  isLoading: false,
  error: null,
  setRecommendation: (data: FoodRecommendation) => set({ 
    recommendation: data, 
    error: null 
  }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearRecommendation: () => set({ 
    recommendation: null, 
    error: null 
  }),
}))
