import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";

// Mock Button component (Styled with Tailwind)
const Button = ({ variant, size, className, children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors";
  const sizeClasses =
    size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-base";
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
const CardHeader = ({ className, children, ...props }) => (
  <div {...props} className={`flex flex-col space-y-1.5 p-4 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ className, children, ...props }) => (
  <h3
    {...props}
    className={`text-xl font-semibold leading-none tracking-tight text-gray-900 ${className}`}
  >
    {children}
  </h3>
);
const CardContent = ({ className, children, ...props }) => (
  <div {...props} className={`p-4 pt-0 ${className}`}>
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
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Refined shadow
      transition: { duration: 0.2 },
    },
  };

  // Function to get YouTube thumbnail URL
  const getYoutubeThumbnailUrl = (url) => {
    const videoId = url.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      const finalVideoId =
        ampersandPosition !== -1
          ? videoId.substring(0, ampersandPosition)
          : videoId;
      return `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`; // High quality thumbnail
    }
    return "https://placehold.co/800x450/EEE/31343C?text=Thumbnail&font=Montserrat"; // Return placeholder if no valid ID
  };

  // Section data
  const sections = [
    {
      title: "Explainer Videos",
      description: "Compelling explainers that simplify complex concepts.",
      videos: [
        {
          title: "Dhatri Financial Services | Explainer Video",
          videoUrl: "https://www.youtube.com/watch?v=xA7DG9z2uj4", // Replace with actual URL
          thumbnail: getYoutubeThumbnailUrl(
            "https://www.youtube.com/watch?v=xA7DG9z2uj4"
          ), // Use the function here
        },
        {
          title: "Ryich delicacies | Logo Animation",
          videoUrl: "https://www.youtube.com/watch?v=Y5hqc42F1X4", // Replace with actual URL
          thumbnail: getYoutubeThumbnailUrl(
            "https://www.youtube.com/watch?v=Y5hqc42F1X4"
          ), // Use the function here
        },
        {
          title: "Our Intro | Kinetic Typography",
          videoUrl: "https://www.youtube.com/watch?v=x4El_DkAXPo",
          thumbnail: getYoutubeThumbnailUrl("https://www.youtube.com/watch?v=x4El_DkAXPo"),
        },
      ],
    },
    {
      title: "Product Demos",
      description: "Engaging demos that highlight key features and benefits.",
      videos: [
        {
          title: "",
          videoUrl: "",
          thumbnail: "Coming Soon",
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
          thumbnail: "Coming Soon",
        },
      ],
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-12
        flex flex-col items-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
        className="text-center text-4xl sm:text-5xl md:text-6xl font-bold
                  text-gray-900 mb-12 w-full
                  pt-16 bg-clip-text text-transparent bg-gradient-to-r from-[#123557] to-[#123557]" // More vibrant title
      >
        Our Works
      </motion.h1>

      {/* Sections */}
      <div className="w-full max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        {sections.map((section, index) => {
          const isProductDemoSection = section.title === "Product Demos";
          const isSocialMediaAdsSection = section.title === "Social Media Ads";
          return (
            <motion.div
              key={index}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className=""
            >
              <h2
                className={cn(
                  "text-2xl sm:text-3xl font-semibold text-center mb-4", // Reduced marginBottom
                  isProductDemoSection || isSocialMediaAdsSection
                    ? ""
                    : "text-black" // Make Explainer Videos title black
                )}
              >
                {section.title}
              </h2>
              <p className="text-gray-600 text-center mb-12 text-lg leading-relaxed max-w-3xl mx-auto">
                {section.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {section.videos.map((video, videoIndex) => {
                  if (isProductDemoSection || isSocialMediaAdsSection) {
                    return (
                      <motion.div
                        key={videoIndex}
                        variants={videoVariants}
                        className="rounded-xl overflow-hidden shadow-md border border-gray-200
                                    transition-all duration-300 group relative bg-white
                                    flex flex-col h-full"
                        whileHover="hover"
                      >
                        <div className="relative flex items-center justify-center h-[200px]">
                          <span className="text-gray-500 text-lg font-medium">{video.thumbnail}</span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={videoIndex}
                      variants={videoVariants}
                      className="rounded-xl overflow-hidden shadow-md border border-gray-200
                                    transition-all duration-300 group relative bg-white
                                    flex flex-col h-full"
                      whileHover="hover"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title + " thumbnail"}
                          className="w-full h-auto aspect-video object-cover"
                        />
                        <div
                          className={cn(
                            "absolute inset-0 flex items-center justify-center bg-black/40",
                            "opacity-0 group-hover:opacity-100 transition-opacity duration-300", //Slightly longer transition
                            "rounded-xl" //Ensure rounded corners
                          )}
                        >
                          <a
                            href={video.videoUrl}
                            target="_blank"   // Open in a new tab for better UX
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10 rounded-xl flex items-center justify-center"
                            aria-label={`Watch ${video.title}`}
                          >
                            <PlayCircle className="w-14 h-14 text-white/90" />
                          </a>
                        </div>
                      </div>
                      <div className="p-4 sm:p-4 flex-grow flex items-center"></div>
                      <Card className="shadow-none border-0">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-900">
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
          );
        })}

        {/* Get a Quote Button */}
        <div className="flex justify-center mt-16">
          <Button
            size="lg"
            className={cn(
              "bg-gradient-to-r from-[#123557] to-[#123557] text-white",
              "px-8 py-3 rounded-full shadow-lg hover:shadow-xl",
              "hover:scale-105 transition-all duration-300", // Increased scale
              "flex items-center gap-3 font-medium text-lg",
              "w-full sm:w-auto",
              "border border-blue-500/10"
            )}
            to="/get-a-quote"
            variant="primary"
          >
            Get a quote <ArrowUpRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurWorks;
