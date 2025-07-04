import { motion } from "framer-motion";

interface MoodPageHeaderProps {
  title: string;
  subtitle: string;
}

export function MoodPageHeader({ title, subtitle }: MoodPageHeaderProps) {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold pt-10 text-center">
          {title}
        </h1>
      </motion.header>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="text-sm my-8 relative text-center leading-6 font-semibold"
      >
        <span className="absolute text-[128px] text-white/10 top-5 left-0">
          &ldquo;
        </span>
        {subtitle}
      </motion.p>
    </>
  );
}
