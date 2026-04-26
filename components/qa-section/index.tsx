"use client";

import { useState } from "react";
import Icon from "@/components/icons";
import QAModal from "@/components/ui/qa-modal";

export default function QASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const questions = [
    "Who am I?",
    "What are your stacks?",
    "What can you do?",
    "Tell me about your experience",
    "How did you adapt to AI?",
    "What do you think about AI replacing developers?",
    "Are you a traditional programmer or ai programmer?",
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-16 px-8 border-t border-amber-700/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-amber-700/40"></div>
              <Icon name="crown" className="w-4 h-4 text-amber-700/40" />
              <div className="w-12 h-px bg-amber-700/40"></div>
            </div>
            <h2 className="font-masonic text-3xl text-amber-400 tracking-wider">
              THE CODEX OF WISDOM
            </h2>
            <div className="w-20 h-px bg-amber-700/30 mx-auto mt-3"></div>
            <p className="font-masonic text-stone-400 text-sm mt-3">
              Ask the sage about the journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setSelectedQuestion(q.toLowerCase());
                  setIsModalOpen(true);
                }}
                className="text-left px-4 py-3 border-l-4 border-amber-600/50 bg-amber-900/20 hover:bg-amber-900/40 text-amber-400 font-masonic text-sm transition-all hover:translate-x-1"
              >
                ✦ {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <QAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion}
      />
    </>
  );
}
