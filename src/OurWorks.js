import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, PlayCircle, X } from "lucide-react";

// Mock Button component (Styled with Tailwind)
const Button = ({ variant, size, className, children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors font-inter"; // Added font-inter
  const sizeClasses =
    size === "lg" ? "px-8 py-3 text-lg" : "px-6 py-2.5 text-base"; // Adjusted sizes
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-transparent text-blue-600 hover:bg-blue-500/50";

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  return (
    <button {...props} className={combinedClasses}>
      {children}
    </button>
  );
};

// Mock Card components
const Card = ({ className, children, ...props }) => (
  <div
    {...props}
    className={`rounded-xl border border-gray-200 bg-white shadow-md ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ className, children: headerChildren, ...props }) => (
  <div {...props} className={`flex flex-col space-y-2 p-6 ${className}`}>
    {headerChildren}
  </div>
);
const CardTitle = ({ className, children, ...props }) => (
  <h3
    {...props}
    className={`text-2xl font-semibold leading-tight tracking-tight text-gray-900 font-inter ${className}`} // Increased font size, added leading and font-inter
  >
    {children}
  </h3>
);
const CardContent = ({ className, children, ...props }) => (
  <div {...props} className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);
// Mock cn function (Simplified)
const cn = (...classes) => classes.filter(Boolean).join(" ");

const OurWorks = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hover: {
      scale: 1.04,
      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow, refined
      transition: { duration: 0.2 },
    },
  };

  // Function to get YouTube thumbnail URL
    const getYoutubeThumbnailUrl = (url) => {
        if (!url) return "https://placehold.co/800x450/EEE/31343C?text=Thumbnail&font=Montserrat";
        const videoId = url.split("v=")[1];
        if (videoId) {
            const ampersandPosition = videoId.indexOf("&");
            const finalVideoId =
                ampersandPosition !== -1
                    ? videoId.substring(0, ampersandPosition)
                    : videoId;
           return `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`; // Use original thumbnail URL
        }
        return "https://placehold.co/800x450/EEE/31343C?text=Thumbnail&font=Montserrat"; // Return placeholder if no valid ID
    };

  const [openImage, setOpenImage] = useState(null);

  const handleImageClick = useCallback((imageUrl) => {
    setOpenImage(imageUrl);
  }, []);

  const handleCloseImage = useCallback(() => {
    setOpenImage(null);
  }, []);

  // Section data
  const sections = [
    {
      title: "Explainer Videos",
      description: "Compelling explainers that simplify complex concepts.",
      videos: [
        {
          title: "Dhatri Financial Services | Explainer Video",
          videoUrl: "https://www.youtube.com/watch?v=xA7DG9z2uj4",
          thumbnail: getYoutubeThumbnailUrl(
            "https://www.youtube.com/watch?v=xA7DG9z2uj4"
          ),
        },
        {
          title: "Ryich delicacies | Logo Animation",
          videoUrl: "https://www.youtube.com/watch?v=Y5hqc42F1X4",
          thumbnail: getYoutubeThumbnailUrl(
            "https://www.youtube.com/watch?v=Y5hqc42F1X4"
          ),
        },
        {
          title: "Our Intro | Kinetic Typography",
          videoUrl: "https://www.youtube.com/watch?v=x4El_DkAXPo",
          thumbnail: getYoutubeThumbnailUrl(
            "https://www.youtube.com/watch?v=x4El_DkAXPo"
          ),
        },
      ],
    },
    {
      title: "Product Demos",
      description: "Engaging demos that highlight key features and benefits.",
      videos: [
        {
          title: "Garam Masala Packaging Design",
          videoUrl: "garam-masala-packaging.png",
          thumbnail: "garam-masala-packaging.png",
          closeable: true,
          playButton: false,
        },
      ],
    },
    {
      title: "Social Media Ads",
      description: "Dynamic ads designed to capture attention and drive results.",
      videos: [
        {
          title: "",
          videoUrl: "",
          thumbnail:
            "https://placehold.co/800x450/EEE/31343C?text=Coming+Soon&font=Montserrat",
        },
      ],
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-16
        flex flex-col items-center" // Increased py
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
        className="text-center text-4xl sm:text-5xl md:text-6xl font-bold   // Reduced font size
              text-gray-900 mb-16 w-full   // Increased mb
              pt-12 sm:pt-20 bg-clip-text text-transparent bg-gradient-to-r from-[#123557] to-[#123557] font-inter" // More vibrant title, added font-inter //Reduced pt on mobile
      >
        Our Works
      </motion.h1>

      {/* Sections */}
      <div className="w-full max-w-7xl space-y-32 px-4 sm:px-6 lg:px-8">
        {/* Increased space-y */}
        {sections.map((section, index) => {
          const isProductDemoSection = section.title === "Product Demos";
          const isSocialMediaAdsSection = section.title === "Social Media Ads";
          return (
            <div key={index}>
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className=""
              >
                <h2
                  className={cn(
                    "text-3xl sm:text-4xl font-semibold text-center mb-6 font-inter", // Increased font size, added mb, added font-inter
                    isProductDemoSection || isSocialMediaAdsSection
                      ? ""
                      : "text-black" // Make Explainer Videos title black
                  )}
                >
                  {section.title}
                </h2>
                <p className="text-gray-600 text-center mb-16 text-lg leading-relaxed max-w-3xl mx-auto font-inter">
                  {/* Increased mb, added font-inter */}
                  {section.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {/* Increased gap */}
                  {section.videos.map((video, videoIndex) => {
                    return (
                      <motion.div
                        key={videoIndex}
                        variants={videoVariants}
                        className="rounded-xl overflow-hidden shadow-lg border border-gray-200   // Increased shadow
                            transition-all duration-300 group relative bg-white
                            flex flex-col h-full cursor-pointer"
                        whileHover="hover"
                        onClick={() => {
                          if (video.videoUrl.startsWith("http")) {
                            // Open external link (YouTube)
                            window.open(video.videoUrl, "_blank");
                          } else if (video.closeable) {
                            // Handle image click for Product Demos
                            handleImageClick(video.thumbnail);
                          }
                        }}
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title + " thumbnail"}
                            className="w-full h-auto aspect-video object-cover"
                          />
                          {!video.playButton && (
                            <div
                              className={cn(
                                "absolute inset-0 flex items-center justify-center bg-black/40",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                "rounded-xl",
                                {
                                  "cursor-pointer": video.closeable || video.videoUrl.startsWith("http"),
                                }
                              )}
                            >
                              {video.playButton !== false && (
                                <PlayCircle className="w-16 h-16 text-white/90" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="p-4 sm:p-4 flex-grow flex items-center"></div>
                        <Card className="shadow-none border-0">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-900 font-inter">
                              {/* Added font-inter */}
                              {video.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {video.videoUrl && <></>}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              {index < sections.length - 1 && (
                <div className="w-full flex justify-center py-12">
                  <div className="w-32 h-[2px] bg-gray-300 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Get a Quote Button */}
        <div className="flex justify-center mt-20">
          {/* Increased mt */}
          <Button
            size="lg"
            className={cn(
              "bg-gradient-to-r from-[#123557] to-[#123557] text-white",
              "px-10 py-4 rounded-full shadow-2xl hover:shadow-xl", // Increased px and py, stronger shadow
              "hover:scale-105 transition-all duration-300",
              "flex items-center gap-3 font-medium text-xl font-inter", // Increased font size, added font-inter
              "w-full sm:w-auto",
              "border border-blue-500/10"
            )}
            to="/get-a-quote"
            variant="primary"
          >
            Get a quote <ArrowUpRight className="w-7 h-7" />
            {/* Increased size */}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseImage} // Make sure the container also closes on click
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              src={openImage}
              alt="Full Size"
              className="max-h-full max-w-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent container click when image is clicked.
            />
            <button
              onClick={handleCloseImage}
              className="absolute top-6 right-6 bg-black/50 text-white rounded-full p-2
                hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurWorks;
