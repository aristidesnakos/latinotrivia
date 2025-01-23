import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const emojis = [
  '🔄', '⏳', '🔍', '✨', '🎉', '🌈', '🌍', '🚀', '🐉', '🎈',
  '🌟', '🍀', '🌙', '🌸', '🍩', '🎃', '🦄', '🐳', '🏆', '🎵', 
  '🍕', '🌮', '🍉', '🍇', '🍫', '🍭', '🏖️', '🌺', '🌻', '🌊',
  '🐢', '🦋', '🌼', '🎯', '🍀', '🎷', '🚴‍♂️', '🎨', '⚽', '🏄‍♀️'
];

const funFacts = [
  "A teaspoonful of neutron star would weigh 6 billion tons.",
  "Tardigrades can survive in the vacuum of space.",
  "The Great Wall of China is not visible from space with the naked eye.",
  "There are more possible iterations of a game of chess than atoms in the known universe.",
  "A day on Mars is only 40 minutes longer than a day on Earth.",
  "The human brain generates enough electricity to power a small light bulb.",
  "Sharks are older than trees in evolutionary history.",
  "The Eiffel Tower can grow up to 6 inches taller in summer due to thermal expansion.",
  "The longest word in English without a vowel is 'rhythms'.",
  "The total weight of all ants on Earth is greater than the total weight of all humans.",
  "A bolt of lightning is five times hotter than the surface of the sun.",
  "There's enough DNA in the human body to stretch from the sun to Pluto and back 17 times.",
  "The shortest war in history lasted 38 minutes between Britain and Zanzibar.",
  "The loudest sound ever recorded was the eruption of Krakatoa, heard 3,000 miles away.",
  "The fingerprints of koalas are virtually indistinguishable from human fingerprints.",
  "The mantis shrimp can see polarized light and has 16 color receptors (humans have 3).",
  "A single Google search uses the same amount of computing power used to send Apollo 11 to the moon.",
  "The world's oldest known living tree is over 5,000 years old.",
  "There are more possible iterations of a game of Go than atoms in the observable universe.",
  "The human body contains enough carbon to make 900 pencils.",
  "A neutron star can spin at a rate of 600 rotations per second.",
  "The longest recorded flight of a chicken is 13 seconds.",
  "The Earth is smoother than a billiard ball if both were scaled to the same size.",
  "There are more trees on Earth than stars in the Milky Way galaxy.",
  "A hummingbird weighs less than a penny.",
  "The total number of possible combinations of a Rubik's Cube is 43 quintillion.",
  "The Great Barrier Reef is the largest living structure on Earth.",
  "A single solar flare can release the equivalent energy of millions of 100-megaton atomic bombs.",
  "The human brain can store up to 2.5 petabytes of data.",
  "The longest word in the English language has 189,819 letters.",
  "The speed of light in a vacuum is exactly 299,792,458 meters per second.",
  "There are more bacteria in your mouth than there are people on Earth.",
  "The largest known star, UY Scuti, is 1,700 times larger than our sun.",
  "A teaspoon of a neutron star would weigh about 6 billion tons.",
  "The average person will spend six months of their life waiting for red lights to turn green.",
  "The Yellowstone supervolcano has enough power to launch rocks to the moon.",
  "The longest-living cells in the body are neurons in the cerebral cortex, which can live an entire lifetime.",
  "The human eye can distinguish between 10 million different colors.",
  "The world's deepest postbox is in Susami Bay, Japan, 10 meters underwater.",
  "The longest time between two twins being born is 87 days."
];

export function LoadingSpinner() {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
    }, 500);

    const factInterval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
    }, 5000);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(factInterval);
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="text-4xl p-2">{emojis[emojiIndex]}</div>
        <CardDescription className="text-center">
          {funFacts[factIndex]}
        </CardDescription>
      </CardContent>
    </Card>
  );
} 