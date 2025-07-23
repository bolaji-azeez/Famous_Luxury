"use client";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const VideoDisplaySection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full bg-[#232c3b] pt-15 pb-15">
      {/* Video Container */}
      <div className="relative  aspect-video max-w-2xl mx-auto rounded-sm">
        {/* Video Element */}
        <video
          ref={videoRef}
          src="/71a833516636291a8842a2e8573e48d087d46ed5.f30.mp4" // Ensure this file is in your public directory
          className="w-full h-full object-cover rounded-sm"
          onClick={togglePlay}
          poster="/images/bluerray.webp" // Add poster image
        />

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`absolute inset-0 m-auto flex items-center justify-center w-16 h-16 rounded-full bg-black bg-opacity-50 transition-opacity ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white fill-white" />
          ) : (
            <Play className="w-8 h-8 text-white fill-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoDisplaySection;
