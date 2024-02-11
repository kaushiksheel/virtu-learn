import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
