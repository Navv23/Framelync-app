import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";
import Carousel from "./Components/Carousel";
import Partners from "./Components/Partners";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigateWithLoading = (path) => {
    navigate("/loading", {
      state: {
        message: "Loading...",
        redirectTo: path,
      },
    });
  };

  const partners = [
    { name: "FrameLync", logo: "/path/to/framelync-logo.svg" },
    { name: "Partner 2", logo: "/path/to/partner2-logo.svg" },
    { name: "Partner 3", logo: "/path/to/partner3-logo.svg" },
    { name: "Partner 4", logo: "/path/to/partner4-logo.svg" },
    { name: "Partner 5", logo: "/path/to/partner5-logo.svg" },
    { name: "Partner 6", logo: "/path/to/partner6-logo.svg" },
    { name: "Partner 7", logo: "/path/to/partner7-logo.svg" },
    { name: "Partner 8", logo: "/path/to/partner8-logo.svg" },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const renderTitleWords = (title) => {
    const words = title.split(" ");
    return words.map((word, index) => (
      <motion.span
        key={index}
        variants={wordVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 + index * 0.1 }} // Staggered delay
        className="inline-block" // Important for correct animation
      >
        {word}{" "}
      </motion.span>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full max-w-7xl px-4 sm:px-6 py-16 md:py-24 mt-8 md:mt-12"> {/* Increased marginTop for mobile */}
        <div className="text-center space-y-6">
          <motion.h1
            ref={titleRef}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 tracking-tight whitespace-pre-wrap" // Added whitespace-pre-wrap
          >
            {renderTitleWords(`Creative Intelligence`)}
            <br className="hidden sm:block" />
            {renderTitleWords(`for`)}
            <span className="text-[#123557] relative inline-block">
              {renderTitleWords(`Business.`)}
            </span>
          </motion.h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We help companies transform their digital presence with stunning
            visuals and engaging content.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/our-works"
              className="bg-transparent border border-blue-500 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-500/10 transition-colors duration-300 font-medium text-sm
                        hover:bg-blue-500/20 text-blue-500
                        "
            >
              Our Works
            </Link>
            <button
              onClick={() => navigateWithLoading("/loading")}
              className="bg-[#123557]/90 text-white px-6 py-3 rounded-full hover:bg-[#123557]/80 transition-colors duration-300 shadow-md font-medium text-sm flex items-center"
            >
              Get Started <ArrowUpRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full max-w-7xl px-4 sm:px-6 mt-[-40px] sm:mt-[-60px] md:mt-[-80px] lg:mt-[-100px] mb-20">
        <Carousel />
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white py-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-[#123557] mb-2">8+</p>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-[#123557] mb-2">3+</p>
              <p className="text-gray-600">Partners</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-[#123557] mb-2">9.6</p>
              <p className="text-gray-600">Average Client Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Partners Section */}
      <div className="w-full bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="relative inline-block">
                Our Partners
                <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-blue-400 transform -translate-x-1/2"></span>
              </span>
            </h2>
          </div>
          <Partners />
        </div>
      </div>

      {/* Our Services Section */}
      <div className="w-full bg-white py-24" id="our-services">
        {/* Added ID here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-blue-400 transform -translate-x-1/2"></span>
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer a range of video production services to elevate your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1: Explainer Videos */}
            <div className="bg-gray-100/90 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200  flex flex-col backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-500">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Explainer Videos
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Turn complex ideas into engaging animated explainers that simplify
                your message and connect with your audience. Our custom-made
                videos help boost conversion rates by up to 90%.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={18}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Professional script writing and storyboarding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={18}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Custom character design and animation
                  </span>
                </li>
              </ul>
              <button
                onClick={() => navigateWithLoading("/loading")}
                className="bg-[#123557]/90 text-white px-6 py-3 rounded-full hover:bg-[#123557]/80 transition-all shadow-md font-medium text-sm flex items-center"
              >
                Get a quote <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            {/* Service 2: Product Demos */}
            <div className="bg-gray-100/90 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 flex flex-col backdrop-blur-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Product Demos
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Showcase your product's features and benefits with high-quality
                demo videos that highlight functionality and drive customer
                interest. Perfect for websites, presentations, and trade shows.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={18}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    4K resolution filming with cinematic quality
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={18}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Step-by-step feature demonstrations
                  </span>
                </li>
              </ul>
              <button
                onClick={() => navigateWithLoading("/loading")}
                className="bg-[#123557]/90 text-white px-6 py-3 rounded-full hover:bg-[#123557]/80 transition-all shadow-md font-medium text-sm flex items-center"
              >
                Get a quote <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            {/* Service 3: Social Media Ads */}
            <div className="bg-gray-100/90 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 flex flex-col backdrop-blur-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Social Media Ads
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Create scroll-stopping video ads designed specifically for social
                media platforms. Our videos are optimized for each platform to
                maximize engagement and conversions.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={18}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Platform-specific formats (Instagram, TikTok, Facebook)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={18}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Trend-aware content that drives engagement
                  </span>
                </li>
              </ul>
              <button
                onClick={() => navigateWithLoading("/loading")}
                className="bg-[#123557]/90 text-white px-6 py-3 rounded-full hover:bg-[#123557]/80 transition-all shadow-md font-medium text-sm flex items-center"
              >
                Get a quote <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="relative inline-block">
                Client Testimonials
                <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-blue-400 transform -translate-x-1/2"></span>
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See what our clients say about working with us.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
              <div className="flex items-center gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "That way you guys have executed the work shows your commitment
                and dedication towards the project. I am very happy with the
                output and will definitely recommend you to others."
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Ravi Narayana Rao
                  </p>
                  <p className="text-sm text-gray-500">
                    Director, Dhatri Financial Services
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
              <div className="flex items-center gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "The quality of the work was excellent and the team was very
                responsive to our needs. We are very happy with the final
                product and would definitely recommend them to others."
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Deepthi K</p>
                  <p className="text-sm text-gray-500">
                    Sales Head, Ryich Delicacies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="relative inline-block">
                Frequently Asked Questions
                <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-blue-400 transform -translate-x-1/2"></span>
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ Item 1 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                How long does it take to create a video?
              </h3>
              <p className="text-gray-600">
                Our standard project timeline is 3-4 weeks, depending on the
                complexity and length of the video. For urgent projects, we offer
                expedited services with a 7-10 day turnaround.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                What is the pricing structure?
              </h3>
              <p className="text-gray-600">
                Our pricing is based on the complexity of the project. Get in Touch with us to know about Pricing,
                We offer different pricing for different types of videos, including
                explainer videos, product demos, and social media ads and website development.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Can you handle international projects?
              </h3>
              <p className="text-gray-600">
                Absolutely! We have experience working with clients from around the world.
                We can accommodate different time zones and cultural nuances to ensure a smooth collaboration.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                How many revisions are included?
              </h3>
              <p className="text-gray-600">
                All of the projects will have an agreement and the revision policy is also included in that agreement.
                It's custom for each project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="w-full bg-[#123557] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#1E4A74] to-[#123557] rounded-2xl p-10 md:p-16 shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to transform your digital presence?
            </h2>
            <p className="text-gray-200 max-w-3xl mx-auto mb-8">
              Let's create videos that tell your story, showcase your products,
              and connect with your audience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigateWithLoading("/loading")}
                className="bg-white text-[#123557] px-6 py-3 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-md font-medium text-sm flex items-center"
              >
                Get Started <ArrowUpRight size={18} className="ml-1" />
              </button>
              <button
                onClick={() => navigateWithLoading("/loading")}
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-105 font-medium text-sm"
              >
                Contact Us <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
