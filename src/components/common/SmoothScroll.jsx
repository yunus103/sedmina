"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  // Sanity Studio içinde smooth scroll'u kapatıyoruz
  // Aksi takdirde Sanity arayüzünde kaydırma sorunları ve hydration error yaşanabilir.
  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
