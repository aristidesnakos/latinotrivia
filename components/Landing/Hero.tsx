"use client";

import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { InstantQuiz } from "./InstantQuiz";
import { heroDefaults } from "@/configs/heroDefaults";
import { Limelight } from 'next/font/google';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

type HeroProps = {
  type?: keyof typeof heroDefaults;
}

const limelight = Limelight({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Hero({ type = "quizTeachers" }: HeroProps) {
  const { handleAuthRedirect } = useAuthRedirect();
  
  const content = heroDefaults[type];

  const handleCreate = () => {
    handleAuthRedirect();
  };

  return (
    <section className="w-full mx-auto bg-secondary px-8 py-8 lg:py-20 bg-gradient-to-b from-white to-primary">
      <div className="flex flex-col mx-auto gap-6 text-center">
        <h1 className={`${limelight.className} text-4xl lg:text-6xl tracking-tight`}>
          {content.heading}
        </h1>
        <ul className="text-lg opacity-80 leading-relaxed font-mono">
          {content.bulletPoints.map((point, index) => (
            <li key={index} className="mb-2">{point}</li>
          ))}
        </ul>

        <Button 
          onClick={handleCreate}
          className="p-9 font-semibold rounded-lg mx-auto text-xl md:text-2xl bg-secondary/80 hover:bg-secondary"
        >
          Try it for Free!
        </Button>

      </div>

      {/* <InstantQuiz 
        isOpen={showInstantQuiz} 
        onOpenChange={setShowInstantQuiz}
      /> */}
    </section>
  );
};
