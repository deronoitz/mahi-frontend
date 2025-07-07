import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useFoodStore } from "@/store/foodStore";
import { useLoadingAnimation } from "@/hooks/useLoadingAnimation";
import { type MoodFormValues, type MoodTag } from "@/types/mood";
import { useWeather } from "./useWeather";
import { useLocation } from "./useLocation";

const getMealTimeFromCurrentTime = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "pagi";
  if (hour >= 11 && hour < 15) return "siang";
  if (hour >= 15 && hour < 18) return "sore";
  return "malam";
};

const validationSchema = Yup.object({
  mood: Yup.array().when("using_text", {
    is: false,
    then: (schema) => schema.min(1, "Pilih minimal satu mood"),
    otherwise: (schema) => schema,
  }),
  text_input: Yup.string().when("using_text", {
    is: true,
    then: (schema) =>
      schema
        .required("Masukkan teks input")
        .min(10, "Teks minimal 10 karakter"),
    otherwise: (schema) => schema,
  }),
  weather: Yup.string().required(),
  healthy: Yup.string().oneOf(["yes", "no"]).required(),
  meal_time: Yup.string()
    .oneOf(["pagi", "siang", "sore", "malam"])
    .required(),
  vegan: Yup.string().oneOf(["yes", "no"]).required(),
  using_text: Yup.boolean().required(),
});

export function useMoodForm() {
  const router = useRouter();
  const { userData } = useUserStore();
  const { setRecommendation, setError } = useFoodStore();
  const [isLoading, setIsLoading] = useState(false);
  const { animationData } = useLoadingAnimation();
  const { latitude, longitude } = useLocation();
  const { weather } = useWeather({
    lat: latitude,
    lon: longitude,
    apiKey: "92ff0cab16248e282d0e3eebb7ea0c07",
  });

  const initialValues: MoodFormValues = {
    mood: [],
    weather: weather?.weather[0].description || "neutral",
    healthy: "no",
    meal_time: getMealTimeFromCurrentTime(),
    vegan: userData?.isVegan ? "yes" : "no",
    text_input: "",
    using_text: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        // Create the payload in the exact required format
        const payload = {
          mood: values.mood.map(m => m.toLowerCase()),
          weather: weather?.weather[0].description || "neutral",
          healthy: values.healthy,
          meal_time: values.meal_time,
          vegan: values.vegan,
          text_input: values.text_input,
          using_text: values.using_text,
        };

        // Make API call to get food recommendation
        const response = await fetch(
          "https://ae-automation.fly.dev/webhook/pilih-makanan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(
            `API call failed: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        console.log("🎉 API Response:", result);

        // Save the result to the food store
        setRecommendation(result);

        // Navigate to result page after successful API call
        router.push("/result");
      } catch (error) {
        console.error("Error submitting mood form:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    },
  });

  const toggleMood = (mood: MoodTag) => {
    const currentMoods = formik.values.mood;
    const newMoods = currentMoods.includes(mood)
      ? currentMoods.filter((m) => m !== mood)
      : [...currentMoods, mood];

    formik.setFieldValue("mood", newMoods);
  };

  const toggleTextInput = () => {
    const newUsingText = !formik.values.using_text;
    formik.setFieldValue("using_text", newUsingText);

    // Clear text input if switching away from text mode
    if (!newUsingText) {
      formik.setFieldValue("text_input", "");
    }
  };

  const isValidForSubmission = (): boolean => {
    if (formik.values.using_text) {
      return formik.values.text_input.trim().length > 0;
    }
    return formik.values.mood.length > 0;
  };

  return {
    formik,
    isLoading,
    animationData,
    toggleMood,
    toggleTextInput,
    isValidForSubmission,
  };
}
