"use client";

import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function Layout({ children, siteSettings, allServices }) {
  return (
    <>
      <Header siteSettings={siteSettings} allServices={allServices} />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
