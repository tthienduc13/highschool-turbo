"use client";

// import { Footer } from "../footer";
import AOS from "aos";

import { useEffect } from "react";

import { Footer } from "../footer";
import { Header } from "../header";

interface RootMainLayoutProps {
  readonly children: React.ReactNode;
}

export const MainLayout = ({ children }: RootMainLayoutProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <div className="flex min-h-screen w-screen flex-col overflow-x-hidden">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};
