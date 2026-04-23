"use client";

import { useEffect, useState } from "react";
import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/main/hero";
import About from "@/components/main/about";
import Experience from "@/components/main/experiences";
import Projects from "@/components/main/projects";
import { characters } from "@/components/main/hero/data";
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
} from "@/helpers/motions";
import TalkingCharacter from "@/components/ui/talking-character";
import QAModal from "@/components/ui/qa-modal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState("king");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  // Auto-rotate every 5 seconds
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    document.body.style.overflow = "auto";

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % characters.length;
        setSelectedCharacter(characters[nextIndex].id);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-amber-500 text-xl font-masonic">
            Loading Portfolio...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-y-auto">
      <Hero
        onCharacterChange={setSelectedCharacter}
        autoRotateIndex={currentIndex}
        onAutoRotateIndexChange={setCurrentIndex}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <About />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <Experience />
      </motion.div>

      {/* Projects Section with fade in left animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInLeft}
      >
        <Projects />
      </motion.div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="font-masonic text-4xl md:text-5xl text-amber-400 tracking-wider">
            The Codex
          </h2>
          <p className="font-masonic text-stone-400 mt-2">
            Ask the sage about my journey
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "Who am I?", question: "who am I" },
            { label: "What are my stacks?", question: "what are your stacks" },
            { label: "What can I do?", question: "what can you do" },
            {
              label: "Tell me about my experience",
              question: "tell me about your experience",
            },
            {
              label: "How did you adapt to AI?",
              question: "how did you adapt to AI",
            },
            {
              label: "Will AI replace developers?",
              question: "what do you think about AI replacing developers",
            },
            {
              label: "Traditional or AI programmer?",
              question: "are you a traditional programmer or AI programmer",
            },
          ].map((item) => (
            <button
              key={item.question}
              onClick={() => {
                setSelectedQuestion(item.question);
                setIsModalOpen(true);
              }}
              className="font-masonic cursor-pointer px-6 py-3 border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300 rounded-lg tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Connect Section with fade in right animation */}
      <motion.section
        id="connect"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInRight}
        className="py-20 px-6 max-w-4xl mx-auto text-center"
      >
        <div className="border-t-2 border-amber-500/30 pt-12">
          <h2 className="font-masonic text-3xl text-amber-400 mb-6 tracking-wider">
            Summon the Developer
          </h2>
          <p className="font-masonic text-stone-400 mb-8">
            Ready to embark on a quest? Let's forge something legendary
            together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:miko.recare@example.com"
              className="font-masonic px-6 py-3 border border-amber-500 text-amber-400 hover:bg-amber-500/10 transition-all rounded-lg tracking-wider"
            >
              Send Raven
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-masonic px-6 py-3 border border-amber-500 text-amber-400 hover:bg-amber-500/10 transition-all rounded-lg tracking-wider"
            >
              GitHub Forge
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-masonic px-6 py-3 border border-amber-500 text-amber-400 hover:bg-amber-500/10 transition-all rounded-lg tracking-wider"
            >
              LinkedIn Hall
            </motion.a>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: easeOut }}
            className="font-masonic text-stone-500 text-sm mt-8 tracking-wider"
          >
            © MMXXV Miko Recare - All Rights Reserved
          </motion.p>
        </div>
      </motion.section>
      <QAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion}
      />
    </main>
  );
}
