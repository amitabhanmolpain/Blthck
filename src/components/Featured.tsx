import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  Eye, 
  Clock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Featured = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [isSlideShowPaused, setIsSlideShowPaused] = useState(false); // ✅ New state to control slideshow

  // YouTube video URLs with mock data for demo
  const youtuberThumbnails = [
    { 
      videoUrl: 'https://www.youtube.com/watch?v=DG102Dh2k9k',
      title: "The Truth About Ghost Jobs - Why Companies Post Fake Positions",
      views: "2.3M views",
      duration: "12:45"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=-FAYkoAeTVU',
      title: "I Applied to 1000 Jobs - Here's What I Discovered",
      views: "1.8M views",
      duration: "15:22"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=W68CbQR93Eg',
      title: "Red Flags in Job Postings You Should Never Ignore",
      views: "945K views",
      duration: "10:33"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=xMoTNXjtPbE&t=78s',
      title: "HR Secrets: Why Your Application Gets Rejected",
      views: "3.1M views",
      duration: "18:07"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=XeZO2cmoYqw',
      title: "Ghost Jobs Explained: The Job Market's Dark Secret",
      views: "756K views",
      duration: "14:29"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=_a_AtUv9sRg',
      title: "How to Spot Fake Job Postings in 2024",
      views: "1.2M views",
      duration: "11:56"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=OlX9ANhj5pE',
      title: "Why Companies Waste Your Time With Fake Jobs",
      views: "2.7M views",
      duration: "16:41"
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=TtdUAf9c6dM',
      title: "Job Hunting in 2024: What's Really Happening",
      views: "4.2M views",
      duration: "20:15"
    },
  ];

  // Mock fetch video data with thumbnails
  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = youtuberThumbnails.map((item, index) => {
        const videoId = item.videoUrl.split('v=')[1]?.split('&')[0] || '';
        return {
          videoUrl: item.videoUrl,
          title: item.title,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          views: item.views,
          duration: item.duration
        };
      });
      
      setVideoData(data);
      setIsLoading(false);
    };

    fetchVideoData();
  }, []);

  // ✅ Modified auto-slide to respect pause state
  useEffect(() => {
    if (isSlideShowPaused) return; // Don't auto-slide when paused

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 2) % youtuberThumbnails.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [youtuberThumbnails.length, isSlideShowPaused]); // ✅ Added isSlideShowPaused dependency

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 2) % youtuberThumbnails.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 2 + youtuberThumbnails.length) % youtuberThumbnails.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index - (index % 2));
  };

  const openVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  // ✅ Enhanced hover handlers to pause/resume slideshow
  const handleVideoMouseEnter = (index) => {
    setHoveredVideo(index);
    setIsSlideShowPaused(true); // ✅ Pause slideshow when hovering any video
  };

  const handleVideoMouseLeave = () => {
    setHoveredVideo(null);
    setIsSlideShowPaused(false); // ✅ Resume slideshow when not hovering
  };

  // ✅ Pause slideshow when hovering over the entire slideshow container
  const handleSlideShowMouseEnter = () => {
    setIsSlideShowPaused(true);
  };

  const handleSlideShowMouseLeave = () => {
    if (hoveredVideo === null) { // Only resume if not hovering a specific video
      setIsSlideShowPaused(false);
    }
  };

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartDetecting = () => {
    if (user) {
      navigate('/analyzer');
    } else {
      const event = new CustomEvent('openAuthModal');
      window.dispatchEvent(event);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center py-10 sm:py-16 md:py-20">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-4 w-1 h-1 bg-red-400/30 rounded-full animate-pulse sm:top-20 sm:left-8 sm:w-2 sm:h-2"></div>
      <div className="absolute top-16 right-6 w-1 h-1 bg-orange-400/30 rounded-full animate-bounce sm:top-24 sm:right-12 sm:w-2 sm:h-2"></div>
      <div className="absolute bottom-16 left-8 w-1 h-1 bg-amber-400/30 rounded-full animate-ping sm:bottom-20 sm:left-16 sm:w-2 sm:h-2"></div>
      <div className="absolute bottom-12 right-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse sm:bottom-24 sm:right-8 sm:w-3 sm:h-3"></div>
      <div className="absolute top-1/2 left-2 w-1 h-1 bg-orange-300/30 rounded-full animate-bounce sm:top-1/2 sm:left-4 sm:w-2 sm:h-2"></div>
      <div className="absolute top-1/3 right-2 w-1 h-1 bg-amber-300/30 rounded-full animate-ping sm:top-1/3 sm:right-4 sm:w-2 sm:h-2"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black/60 to-black/40 border border-red-500/30 rounded-full text-sm sm:text-base text-gray-300 backdrop-blur-xl shadow-2xl shadow-red-500/20 animate-fade-in mb-4 sm:mb-6 hover:border-red-500/50 transition-all duration-500">
            <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3 text-red-400 animate-pulse" />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-semibold">
              Insights from Content Creators
            </span>
            <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 text-red-400" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
            <span className="block text-white mb-2 sm:mb-4 animate-slide-up drop-shadow-2xl">What YouTubers</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 animate-slide-up delay-200 relative drop-shadow-2xl">
              Say About Ghost Jobs
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-orange-400/20 to-amber-400/20 blur-3xl animate-pulse-glow"></div>
            </span>
          </h2>
          
          <div className="space-y-4 sm:space-y-6 animate-slide-up delay-400">
            <p className="text-lg sm:text-xl md:text-2xl text-white font-medium drop-shadow-lg">
              Voices from the Community
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Watch how top YouTubers uncover the truth behind ghost jobs and share tips to avoid them.
            </p>
          </div>
        </div>

        {/* ✅ Enhanced Slideshow Container with Hover Handlers */}
        <div className="relative max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl"
            onMouseEnter={handleSlideShowMouseEnter} // ✅ Pause on container hover
            onMouseLeave={handleSlideShowMouseLeave} // ✅ Resume on container leave
          >
            {isLoading ? (
              <div className="flex h-64 sm:h-80 md:h-96 items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            ) : (
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${(currentSlide / 2) * 100}%)` }}
              >
                {videoData.map((item, index) => (
                  <div key={index} className="w-1/2 flex-shrink-0 px-1 sm:px-2">
                    <div 
                      className="relative cursor-pointer group aspect-video overflow-hidden bg-black/30 rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      onClick={() => openVideo(item.videoUrl)}
                      onMouseEnter={() => handleVideoMouseEnter(index)} // ✅ Enhanced hover handler
                      onMouseLeave={handleVideoMouseLeave} // ✅ Enhanced leave handler
                    >
                      {/* Video Thumbnail or Hover-play iframe */}
                      {hoveredVideo === index ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${item.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={item.title}
                        />
                      ) : (
                        <>
                          <img 
                            src={item.thumbnail} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/640x360/1a1a1a/ffffff?text=Video+Thumbnail';
                            }}
                          />
                          
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          
                          {/* Video Stats */}
                          <div className="absolute top-2 left-2 flex flex-col space-y-1">
                            <span className="px-2 py-1 bg-black/80 text-white text-xs rounded-md backdrop-blur-sm flex items-center border border-white/10">
                              <Eye className="w-3 h-3 mr-1 text-red-400" />
                              <span className="text-white font-medium">{item.views}</span>
                            </span>
                            <span className="px-2 py-1 bg-black/80 text-white text-xs rounded-md backdrop-blur-sm flex items-center border border-white/10">
                              <Clock className="w-3 h-3 mr-1 text-orange-400" />
                              <span className="text-white font-medium">{item.duration}</span>
                            </span>
                          </div>

                          {/* Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                              <Play className="w-4 sm:w-6 h-4 sm:h-6 text-white ml-0.5 sm:ml-1" fill="currentColor" />
                            </div>
                          </div>

                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </>
                      )}
                    </div>
                    
                    {/* Video Title */}
                    <div className="mt-2 sm:mt-4 px-2">
                      <h3 className="text-xs sm:text-sm font-bold text-white bg-black/40 p-2 rounded-lg backdrop-blur-sm border border-white/10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-amber-400 transition-all duration-300 line-clamp-2 leading-relaxed shadow-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/60 hover:border-white/20 transition-all duration-300 z-10"
            >
              <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/60 hover:border-white/20 transition-all duration-300 z-10"
            >
              <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
            </button>

            {/* ✅ Slideshow Status Indicator (Optional - shows when paused) */}
            {isSlideShowPaused && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md backdrop-blur-sm border border-white/10 z-20">
                <span className="text-yellow-400">⏸ Paused</span>
              </div>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3">
            {Array.from({ length: Math.ceil(youtuberThumbnails.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * 2)}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentSlide / 2) === index 
                    ? 'bg-red-400 scale-125' 
                    : 'bg-red-400/30 hover:bg-red-400/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 animate-slide-up delay-1000">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-xs sm:max-w-md md:max-w-lg mx-auto shadow-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Join the Fight Against Ghost Jobs
              </span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6">
              Don't let fake job postings waste your time. Use AI-powered detection to identify real opportunities.
            </p>
            <button 
              onClick={handleStartDetecting}
              className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:bg-black/30 hover:border-white/30 transform hover:scale-105 transition-all duration-300 animate-glow-red"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
              <div className="relative flex items-center">
                <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2 group-hover:animate-pulse" />
                Start Detecting Ghost Jobs
                <ArrowRight className="ml-1 sm:ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.2); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-1000 {
          animation-delay: 1.0s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Featured;