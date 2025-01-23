'use client';

import React, { useState } from 'react';
import { videoGalleryDefaults } from '@/configs/videoGalleryDefaults';
import Image from 'next/image';

interface VideoGalleryProps {
  type: keyof typeof videoGalleryDefaults;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ type = 'landing' }) => {
  const { channels } = videoGalleryDefaults[type];
  const [activeVideos, setActiveVideos] = useState<string[]>([]);

  const handleVideoClick = (videoId: string) => {
    setActiveVideos((prev) => [...prev, videoId]);
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-primary to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center font-serif">
          Featured Channels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl aspect-[9/16]"
            >
              {activeVideos.includes(channel.videoId) ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${channel.videoId}?autoplay=1&controls=1&rel=0`}
                  title={channel.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={`https://img.youtube.com/vi/${channel.videoId}/maxresdefault.jpg`}
                      alt={channel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleVideoClick(channel.videoId)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300"
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 text-white">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                </>
              )}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold mb-2">{channel.name}</h3>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {channel.description}
                </p>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Visit Channel
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;