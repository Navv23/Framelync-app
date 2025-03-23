import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Utility function to replace the removed 'cn'
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Using your updated slides data
const slides = [
  {
    id: 1,
    type: "video",
    content: (
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800 cursor-pointer">
        <video
          id="video-1"
          className="w-full h-full object-cover rounded-xl"
          src="/framelync_intro.mp4"
          preload="metadata"
          poster="/path/to/thumbnail1.jpg"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
  {
    id: 2,
    type: "video",
    content: (
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800 cursor-pointer">
        <video
          id="video-2"
          className="w-full h-full object-cover rounded-xl"
          src="/dhatri_fin_services__explainer.mp4"
          preload="metadata"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
  {
    id: 3,
    type: "video",
    content: (
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800 cursor-pointer">
        <video
          id="video-3"
          className="w-full h-full object-cover rounded-xl"
          src="/logo-animation-ryich-delicacies.mp4"
          preload="metadata"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
  {
    id: 4,
    type: "video",
    content: (
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800 cursor-pointer">
        <video
          id="video-4"
          className="w-full h-full object-cover rounded-xl"
          src="/logo_animation_wired_learning.mp4"
          preload="metadata"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
  {
    id: 5,
    type: "video",
    content: (
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800 cursor-pointer">
        <video
          id="video-5"
          className="w-full h-full object-cover rounded-xl"
          src="/social_platform.mp4"
          preload="metadata"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
];


const TransparentCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const animationTimeoutRef = useRef(null);
  const slideRefs = useRef([]);
  const containerRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(true); // Add auto-play state
  const autoPlayRef = useRef(autoPlay); // Ref for auto-play state
  const [isHovered, setIsHovered] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null); // Track the currently playing video
  const [carouselHeight, setCarouselHeight] = useState(getCarouselHeight());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);


  // Update autoPlayRef whenever autoPlay changes
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setCarouselHeight(getCarouselHeight()); // Recalculate and set carousel height
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadImages = () => {
      let loaded = 0;
      const totalImages = slides.length;

      const onImageLoad = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalImages) {
          setImagesLoaded(true);
        }
      };

      slides.forEach((slide) => {
        const imgElement = slide.content.props.children;
        if (imgElement && imgElement.type === 'video') {
          const videoElement = document.getElementById(`video-${slide.id}`);
          if (videoElement) {
            videoElement.addEventListener('loadeddata', onImageLoad);
            // Check if the video is already loaded
            if (videoElement.readyState >= 2) { // HAVE_CURRENT_DATA
              onImageLoad();
            }
          }
        } else {
          onImageLoad(); // Consider non-image content as loaded
        }
      });
    };

    loadImages();
  }, [slides]);


  const handleNext = useCallback(
    (manual = false) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    },
    [isAnimating, slides.length]
  );

  const handlePrev = useCallback(
    (manual = false) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    },
    [isAnimating, slides.length]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev(true);
      } else if (e.key === "ArrowRight") {
        handleNext(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);


  const getResponsiveX = (position) => {
    const baseFactor = 0.85;
    let factor = baseFactor;
    let additionalOffset = 0;
    let mobileOffsetMultiplier = 1;

    if (windowWidth < 640) {
      factor = 1.3;
      mobileOffsetMultiplier = 1.4; // Increased offset for very small screens
    }
    else if (windowWidth < 768) {
      factor = 1.2;
      mobileOffsetMultiplier = 1.3; // Increased offset for small tablets
    } else if (windowWidth < 1024) {
      factor = 1.0;
    } else if (windowWidth >= 1200) {
      additionalOffset = 250;
    }

    const calculatedOffset = 98 * factor;
    const calculatedFarOffset = 200 * factor;


    switch (position) {
      case "center":
        return 0;
      case "left":
        return `-${calculatedOffset + additionalOffset}px`;
      case "right":
        return `${calculatedOffset + additionalOffset}px`;
      case "farLeft":
        return `-${calculatedFarOffset + (additionalOffset * 2)}px`;
      case "farRight":
        return `${calculatedFarOffset + (additionalOffset * 2)}px`;
      default:
        return 0;
    }
  };

  const getSlideMaxWidth = () => {
    if (windowWidth < 640) return "calc(100% - 16px)";
    if (windowWidth < 768) return "calc(100% - 24px)";
    if (windowWidth < 1024) return "70%";
    if (windowWidth < 1280) return "55%";
    return "45%";
  };

  const getSlidePosition = (index) => {
    if (index === currentIndex) {
      return "center";
    } else if (
      (currentIndex === 0 && index === slides.length - 1) ||
      index === currentIndex - 1
    ) {
      return "left";
    } else if (
      (currentIndex === slides.length - 1 && index === 0) ||
      index === currentIndex + 1
    ) {
      return "right";
    } else {
      const distanceRight = (index - currentIndex + slides.length) % slides.length;
      const distanceLeft = (currentIndex - index + slides.length) % slides.length;

      if (distanceLeft === 2) return "farLeft";
      if (distanceRight === 2) return "farRight";

      return "hidden";
    }
  };

  const variants = {
    center: {
      x: 0,
      y: 0,
      scale:  1,
      zIndex: 5,
      opacity: 1,
      filter: "brightness(1) blur(0px)",
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 20,
        mass: 0.7,
        restDelta: 0.001,
        restSpeed: 0.001,
        duration: 0.6,
      },
    },
    left: {
      x: getResponsiveX("left"),
      y:  10,
      scale: 0.75,
      zIndex: 3,
      opacity:  0.55,
      filter: "brightness(0.5) blur(0.8px)",
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 20,
        mass: 0.8,
        restDelta: 0.001,
        restSpeed: 0.001,
        duration: 0.6,
      },
    },
    right: {
      x: getResponsiveX("right"),
      y:  10,
      scale:  0.75,
      zIndex: 3,
      opacity:  0.55,
      filter: "brightness(0.5) blur(0.8px)",
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 20,
        mass: 0.8,
        restDelta: 0.001,
        restSpeed: 0.001,
        duration: 0.6,
      },
    },
    farLeft: {
      x: getResponsiveX("farLeft"),
      y:  15,
      scale: 0.4,
      zIndex: 1,
      opacity: 0,
      filter: "brightness(0.3) blur(1.2px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.9,
        restDelta: 0.001,
        restSpeed: 0.001,
        duration: 0.6,
      },
    },
    farRight: {
      x: getResponsiveX("farRight"),
      y:  15,
      scale: 0.4,
      zIndex: 1,
      opacity: 0,
      filter: "brightness(0.3) blur(1.2px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.9,
        restDelta: 0.001,
        restSpeed: 0.001,
        duration: 0.6,
      },
    },
    hidden: (direction) => ({
      x: direction >= 0 ? "200%" : "-200%",
      y:  20,
      scale: 0.3,
      zIndex: 0,
      opacity: 0,
      filter: "brightness(0.2) blur(2.4px)",
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 26,
        mass: 1,
        duration: 0.6,
      },
    }),
    exit: (direction) => ({
      x: direction > 0 ? "-200%" : "200%",
      y:  20,
      scale: 0.3,
      zIndex: 0,
      opacity: 0,
      filter: "brightness(0.2) blur(2.4px)",
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 26,
        mass: 1,
        duration: 0.6,
      },
    }),
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold =  15;
    const velocityThreshold = 0.2;
    const swipeWeight =
      Math.abs(offset.x) + Math.abs(velocity.x) * ( windowWidth < 768 ? 70: 60);

    if (
      offset.x < -swipeThreshold ||
      (velocity.x < -velocityThreshold && offset.x < 0)
    ) {
      const intensity = Math.min(1.1, swipeWeight / ( windowWidth < 768 ? 120: 130));
      handleNext(true);
    } else if (
      offset.x > swipeThreshold ||
      (velocity.x > velocityThreshold && offset.x > 0)
    ) {
      const intensity = Math.min(1.1, swipeWeight / ( windowWidth < 768 ? 120: 130));
      handlePrev(true);
    }
  };

  function getCarouselHeight() {
    if (windowWidth < 640) {
      return "200px";
    } else if (windowWidth < 768) {
      return "240px";
    } else if (windowWidth < 1024) {
      return "280px";
    } else if (windowWidth < 1280) {
      return "320px";
    } else {
      return "360px";
    }
  }

  const arrowContainerStyle = () => {
    const baseStyle = {
      display: 'flex',
      gap:  '0.5rem',
      zIndex: 10,
      marginTop: '0.5rem',
      justifyContent: 'center',
    };

    if (windowWidth >= 1024) {
      return {
        ...baseStyle,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '2rem',
        marginTop: 0
      };
    }
    return baseStyle;
  };

  const handleVideoClick = (index) => {
    const videoElement = document.getElementById(`video-${index + 1}`);
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setPlayingVideo(index);
      } else {
        videoElement.pause();
        setPlayingVideo(null);
      }
    }
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto py-4 md:py-6 lg:py-8 px-2 bg-transparent will-change-transform md:overflow-visible overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Demo videos carousel"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative flex justify-center items-center w-full",
          windowWidth < 1024 ? "overflow-x-visible" : "overflow-hidden md:overflow-visible", // Conditional overflow
        )}
        style={{
          perspective:  "1000px",
          height: carouselHeight,
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {slides.map((slide, index) => {
            const position = getSlidePosition(index);
            return position !== "hidden" ? (
              <motion.div
                key={slide.id}
                ref={(el) => (slideRefs.current[index] = el)}
                custom={direction}
                variants={variants}
                initial="hidden"
                animate={position}
                exit="exit"
                drag={!isAnimating ? "x" : false}
                dragConstraints={containerRef.current ? {
                  left: -containerRef.current.offsetWidth / 2,
                  right: containerRef.current.offsetWidth / 2,
                } : { left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                className="absolute rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  width: getSlideMaxWidth(),
                  aspectRatio: "16/9",
                  willChange: "transform, opacity, filter",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (slide.type === 'video') {
                    handleVideoClick(index)
                  }
                }}
                whileHover={position === "center" ? {
                  scale: 1.02,
                  y: -3,
                  boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.15)",
                  transition: {
                    type: "spring",
                    stiffness: 220,
                    damping: 10,
                    mass: 0.6,
                    duration: 0.25,
                  },
                } : position === "left" || position === "right" ? {
                  scale: 0.7,
                  opacity: 0.55,
                  filter: "brightness(0.55) blur(0.2px)",
                  transition: {
                    type: "spring",
                    stiffness: 220,
                    damping: 15,
                    duration: 0.2,
                  },
                } : {}}
                whileTap={position === "center" ? {
                  scale: 0.99,
                  transition: {
                    type: "spring",
                    stiffness: 350,
                    damping: 10,
                    duration: 0.1,
                  },
                } : {}}
              >
                {slide.content}

              </motion.div>
            ) : null;
          })}
        </AnimatePresence>
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
            <div className="text-gray-600 text-lg">Loading...</div>
          </div>
        )}
      </div>
      <div style={arrowContainerStyle()}>
        <motion.button
          onClick={() => handlePrev(true)}
          className={cn(
            "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center",
            "text-gray-600 hover:text-blue-500 transition-colors cursor-pointer",
            isAnimating && "text-gray-400 cursor-not-allowed"
          )}
          aria-label="Previous slide"
          disabled={isAnimating || !imagesLoaded}
          whileHover={{ scale: !isAnimating && imagesLoaded ? 1.1 : 1 }}
          whileTap={{ scale: !isAnimating && imagesLoaded ? 0.9 : 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <ChevronLeft size={28} className="text-blue-500" />
        </motion.button>
        <motion.button
          onClick={() => handleNext(true)}
          className={cn(
            "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center",
            "text-gray-600 hover:text-blue-500 transition-colors cursor-pointer",
            isAnimating && "text-gray-400 cursor-not-allowed"
          )}
          aria-label="Next slide"
          disabled={isAnimating || !imagesLoaded}
          whileHover={{ scale: !isAnimating && imagesLoaded ? 1.1 : 1 }}
          whileTap={{ scale: !isAnimating && imagesLoaded ? 0.9 : 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <ChevronRight size={28} className="text-blue-500" />
        </motion.button>
      </div>
    </div>
  );
};

export default TransparentCarousel;

