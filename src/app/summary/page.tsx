"use client";

import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SummaryPage() {
  const [selectedDate, setSelectedDate] = useState<string>("today");

  // Mock data dari halaman sebelumnya (dalam implementasi nyata, ini akan datang dari state management atau props)
  const orderData = {
    foodName: "Nasi Goreng",
    restaurantName: "Warung Makan Bahari",
    price: 25000,
    quantity: 1,
    ongkosTitip: 1000,
  };

  const totalPrice = orderData.price * orderData.quantity + orderData.ongkosTitip;

  const deliveryDates = [
    { value: "today", label: "Hari ini" },
    { value: "tomorrow", label: "Besok" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col">
      {/* Header */}
      <div className="flex items-center p-4 pb-6 justify-between">
        <Link href="/result">
          <Button
            variant="ghost"
            size="icon"
            className="text-white p-0 hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Ringkasan Pesanan
        </h1>
      </div>

      <div className="flex-1 px-6 space-y-6">
        {/* Order Summary Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-white text-lg font-bold mb-4">Detail Pesanan</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">{orderData.foodName}</p>
                <p className="text-white/70 text-sm">{orderData.restaurantName}</p>
              </div>
              <p className="text-white font-bold">{formatPrice(orderData.price)}</p>
            </div>
            
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Quantity</span>
                <span className="text-white">{orderData.quantity}x</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-white/70">Subtotal</span>
                <span className="text-white">{formatPrice(orderData.price * orderData.quantity)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-white/70">Ongkos Titip</span>
                <span className="text-white">{formatPrice(orderData.ongkosTitip)}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-white font-bold text-lg">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Time Selection */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Kapan Dipesan?
          </h2>
          
          {/* Date Selection */}
          <div className="mb-4">
            <p className="text-white/70 text-sm mb-2">Tanggal</p>
            <div className="grid grid-cols-2 gap-2">
              {deliveryDates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    selectedDate === date.value
                      ? "bg-white text-black shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {date.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <p>Pesenan bakal dibeli jam 11.00 ya</p>
        </div>

        {/* Delivery Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-white text-lg font-bold mb-2 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Info Pengiriman
          </h2>
          <p className="text-white/70 text-sm">
            Pesenan bakal ditaruh di pantry kantor gedung F.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 pt-4 space-y-3">
        <Button size="lg" variant="outline" className="w-full rounded-full" asChild>
          <Link href="/result">
            Kembali
          </Link>
        </Button>
        <Button size="lg" className="w-full rounded-full">
          Konfirmasi Pesanan
        </Button>
      </div>
    </div>
  );
}
