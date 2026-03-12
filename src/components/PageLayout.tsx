import React from "react";
import TopBar from "./TopBar";

interface PageLayoutProps {
  titulo: string;
  children: React.ReactNode;
  maxWidth?: "4xl" | "5xl" | "6xl" | "none";
}

const PageLayout = ({ titulo, children, maxWidth = "5xl" }: PageLayoutProps) => {
  const maxWidthClass = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "none": "max-w-none",
  }[maxWidth];

  return (
    <div className="min-h-screen bg-background">
      <TopBar titulo={titulo} />
      <main className={`container mx-auto ${maxWidthClass} px-4 py-8`}>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
