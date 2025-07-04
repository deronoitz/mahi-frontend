"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { OnboardingForm } from '@/components/onboarding-form'
import { useUserStore } from '@/store/userStore'

export function UserProfile() {
  const { userData, clearUserData } = useUserStore()
  const [showEditForm, setShowEditForm] = useState(false)

  if (!userData) {
    return null
  }

  const handleReset = () => {
    if (confirm('Apakah kamu yakin ingin menghapus semua data? Kamu akan diminta mengisi form lagi.')) {
      clearUserData()
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-black/20 backdrop-blur-sm">
      <h3 className="font-semibold text-white mb-3">Profil Kamu</h3>
      <div className="space-y-2 text-sm text-gray-300">
        <p><strong>Nama:</strong> {userData.name}</p>
        <p><strong>Vegan:</strong> {userData.isVegan ? 'Ya' : 'Tidak'}</p>
        <p><strong>MBTI:</strong> {userData.mbti}</p>
        {userData.allergies && <p><strong>Alergi:</strong> {userData.allergies}</p>}
      </div>
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowEditForm(true)}
        >
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      <OnboardingForm 
        isOpen={showEditForm} 
        onClose={() => setShowEditForm(false)} 
      />
    </div>
  )
}
