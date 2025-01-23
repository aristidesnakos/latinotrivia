import "../styles/global.css";
import config from "@/configs/configuration";
import { RootProviders } from './providers/root-providers';
import { Metadata } from "next";
import type { Viewport } from 'next'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: config.appName,
  description: config.appDescription,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  keywords: ['ai quiz maker', 'vocabulary quiz maker', 'online quiz creator', 'ai quiz generator', 'vocabulary test maker'],
  openGraph: {
    title: 'AI Quiz Maker',
    description: 'Generate professional quizzes with AI. Perfect for educational and training purposes.',
    type: 'website',
    url: 'https://createquiz.video/',
    images: [
      {
        url: '/images/ai-quiz-maker.webp',
        width: 1000,
        height: 563,
        alt: 'Picture of a dashboard with a control panel and a mockup of an iphone displaying text saying Easy Millionaire Jeopardy #1.'
      }
    ]
  }
};
 
export const viewport: Viewport = {
  themeColor: 'black',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col min-h-screen">
        <RootProviders>
          {children}
          <Toaster />
        </RootProviders>
      </body>
    </html>
  );
}
