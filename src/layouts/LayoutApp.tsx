import React, { ReactNode } from "react";
import { Inter } from "next/font/google";

const interFont = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function LayoutApp({ children }: { children: ReactNode }) {
  return (
    <div id="main-app" className={interFont.className}>
      {children}
    </div>
  );
}
