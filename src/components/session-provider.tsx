"use client";

import { useEffect } from "react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Fungsi untuk menginisialisasi sessionId
    const initializeSessionId = () => {
      const SESSION_KEY = "makhi_session_id";
      
      try {
        // Cek apakah sessionId sudah ada di localStorage
        const existingSessionId = localStorage.getItem(SESSION_KEY);
        
        if (!existingSessionId) {
          // Jika belum ada, buat sessionId baru menggunakan crypto.randomUUID()
          const newSessionId = crypto.randomUUID();
          localStorage.setItem(SESSION_KEY, newSessionId);
          console.log("New session created:", newSessionId);
        } else {
          console.log("Existing session found:", existingSessionId);
        }
      } catch (error) {
        console.error("Error managing session ID:", error);
      }
    };

    // Jalankan inisialisasi sessionId
    initializeSessionId();
  }, []);

  return <>{children}</>;
}

// Utility function untuk mengambil sessionId dari manapun di aplikasi
export const getSessionId = (): string | null => {
  if (typeof window === "undefined") return null;
  
  try {
    return localStorage.getItem("mahi_session_id");
  } catch (error) {
    console.error("Error getting session ID:", error);
    return null;
  }
};

// Utility function untuk menghapus sessionId (misalnya saat logout)
export const clearSessionId = (): void => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem("mahi_session_id");
    console.log("Session cleared");
  } catch (error) {
    console.error("Error clearing session ID:", error);
  }
};
