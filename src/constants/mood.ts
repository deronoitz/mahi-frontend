export const MOOD_TAGS = [
  "Malas",
  "Stress",
  "Fokus",
  "Bahagia",
  "Capek",
  "Galau",
  "Kesal",
  "Santai",
  "Sedih",
  "Netral",
  "Makanan Sehat",
  "Lagi Kere",
  "Lagi Tajir"
] as const;

export type MoodTag = typeof MOOD_TAGS[number];

export const MOOD_COLORS: Record<MoodTag, {
  bg: string;
  border: string;
  text: string;
  selected: string;
  selectedText: string;
}> = {
  Malas: {
    bg: "bg-violet-100",
    border: "border-violet-300",
    text: "text-violet-700",
    selected: "border-violet-500 bg-violet-500",
    selectedText: "text-white",
  },
  Stress: {
    bg: "bg-rose-100",
    border: "border-rose-300",
    text: "text-rose-700",
    selected: "border-rose-500 bg-rose-500",
    selectedText: "text-white",
  },
  Fokus: {
    bg: "bg-sky-100",
    border: "border-sky-300",
    text: "text-sky-700",
    selected: "border-sky-500 bg-sky-500",
    selectedText: "text-white",
  },
  Bahagia: {
    bg: "bg-amber-100",
    border: "border-amber-300",
    text: "text-amber-700",
    selected: "border-amber-500 bg-amber-500",
    selectedText: "text-white",
  },
  Capek: {
    bg: "bg-neutral-100",
    border: "border-neutral-300",
    text: "text-neutral-700",
    selected: "border-neutral-500 bg-neutral-500",
    selectedText: "text-white",
  },
  Galau: {
    bg: "bg-purple-100",
    border: "border-purple-300",
    text: "text-purple-700",
    selected: "border-purple-500 bg-purple-500",
    selectedText: "text-white",
  },
  Kesal: {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-700",
    selected: "border-red-500 bg-red-500",
    selectedText: "text-white",
  },
  Santai: {
    bg: "bg-emerald-100",
    border: "border-emerald-300",
    text: "text-emerald-700",
    selected: "border-emerald-500 bg-emerald-500",
    selectedText: "text-white",
  },
  Sedih: {
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-700",
    selected: "border-blue-500 bg-blue-500",
    selectedText: "text-white",
  },
  Netral: {
    bg: "bg-stone-100",
    border: "border-stone-300",
    text: "text-stone-700",
    selected: "border-stone-500 bg-stone-500",
    selectedText: "text-white",
  },
  "Makanan Sehat": {
    bg: "bg-lime-100",
    border: "border-lime-300",
    text: "text-lime-700",
    selected: "border-lime-500 bg-lime-500",
    selectedText: "text-white",
  },
  "Lagi Kere": {
    bg: "bg-orange-100",
    border: "border-orange-300",
    text: "text-orange-700",
    selected: "border-orange-500 bg-orange-500",
    selectedText: "text-white",
  },
  "Lagi Tajir": {
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-700",
    selected: "border-yellow-500 bg-yellow-500",
    selectedText: "text-white",
  }
};
