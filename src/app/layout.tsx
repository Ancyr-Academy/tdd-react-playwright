import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ProductionBoundary} from "../core/boundary/ProductionBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todos",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr">
      <body className={inter.className}>
        <ProductionBoundary>
          {children}
        </ProductionBoundary>
        </body>
      </html>
  );
}
