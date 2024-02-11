import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Nunito } from "next/font/google";
import ToastProvider from "@/components/providers/toaster-provider";

export const metadata: Metadata = {
  title: "VirtuLearn",
  description:
    "VirtuLearn empowers educators to share their expertise through video instruction while providing interactive learning experiences for students. Join us to revolutionize education together.",
  openGraph: {
    title: "VirtuLearn",
    description:
      "VirtuLearn empowers educators to share their expertise through video instruction while providing interactive learning experiences for students. Join us to revolutionize education together.",
    type: "website",
    url: "https://virtulearn.vercel.app/",
  },
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
