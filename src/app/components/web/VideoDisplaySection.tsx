"use client";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoDisplaySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/71a833516636291a8842a2e8573e48d087d46ed5.f30.mp4"
        poster="/images/bluerray.webp"
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Experience Ultimate Luxury
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-6 opacity-90">
          Watch our latest collection of exclusive timepieces and premium accessories.
        </p>
        <button
          onClick={togglePlay}
          className="bg-[#a77354] hover:bg-[#8a5c40] text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all shadow-lg">
          {isPlaying ? "Pause Video" : "Play Video"}
        </button>
      </div>

      {/* Floating Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`absolute bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/70 transition-opacity duration-300 ${
          isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}
        aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </button>
    </section>
  );
}
