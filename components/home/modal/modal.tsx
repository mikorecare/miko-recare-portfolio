"use client";

import { useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalOptions {
  title: string;
  icon?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  onClose?: () => void;
}

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  options: ModalOptions;
}

const ModalRenderer = ({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) => {
  if (!state.isOpen || !state.content) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-[90vw]",
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-[90vw] ${maxWidthClasses[state.options.maxWidth || "lg"]} 
                       max-h-[85vh] bg-gradient-to-br from-gray-900 to-stone-900 
                       rounded-xl border border-cyan-500/30 shadow-2xl overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-cyan-500/30 bg-black/30">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-lg">
                  {state.options.icon || "✦"}
                </span>
                <h2 className="font-montserrat text-lg md:text-xl font-bold text-cyan-400">
                  {state.options.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center 
                           rounded-lg hover:bg-gray-800 transition-all duration-200"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              {state.content}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-cyan-500/30 bg-black/30 text-center">
              <p className="font-poppins text-[10px] text-gray-500">
                ✦ Click outside to close ✦
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    content: null,
    options: { title: "", icon: "✦", maxWidth: "lg" },
  });

  const showModal = useCallback((content: ReactNode, options: ModalOptions) => {
    setModalState({
      isOpen: true,
      content,
      options,
    });
  }, []);

  const hideModal = useCallback(() => {
    if (modalState.options.onClose) {
      modalState.options.onClose();
    }
    setModalState({
      isOpen: false,
      content: null,
      options: { title: "", icon: "✦", maxWidth: "lg" },
    });
  }, [modalState.options]);

  const ModalComponent = useCallback(() => {
    return <ModalRenderer state={modalState} onClose={hideModal} />;
  }, [modalState, hideModal]);

  return { showModal, hideModal, ModalComponent };
};
