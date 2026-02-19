"use client";

import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function Layout({ children, siteSettings, allServices }) {
  return (
    <>
      <Header siteSettings={siteSettings} allServices={allServices} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
