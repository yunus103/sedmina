"use client";

import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { motion } from "framer-motion";

export default function Layout({ children, siteSettings, allServices }) {
  return (
    <>
      <Header siteSettings={siteSettings} allServices={allServices} />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
      <WhatsAppButton phoneNumber={siteSettings?.telefon} />
    </>
  );
}
