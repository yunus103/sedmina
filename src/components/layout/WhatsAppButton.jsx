"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton({ phoneNumber }) {
  if (!phoneNumber) return null;

  // Clean the phone number for the WhatsApp link
  // strip all non-digits
  let cleanNumber = phoneNumber.replace(/\D/g, "");

  // If number starts with 0 and is 11 digits (standard TR format 05xx...),
  // replace leading 0 with 90 for wa.me compatibility
  if (cleanNumber.startsWith("0") && cleanNumber.length === 11) {
    cleanNumber = "90" + cleanNumber.substring(1);
  }

  // Construct the WhatsApp URL
  // wa.me works well on iOS, Android, and Desktop
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="WhatsApp ile iletişime geçin"
      >
        <FaWhatsapp className="w-8 h-8" />

        {/* Subtle animation pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
      </motion.a>
    </div>
  );
}
