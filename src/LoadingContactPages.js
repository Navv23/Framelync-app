import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoadingPage = ({ message, redirectTo }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate(redirectTo || "/contact-us"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate, redirectTo]);

  return (
    <div className="bg-[#0E1012] text-white min-h-screen flex flex-col items-center justify-center">
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md px-4">
        {/* Smooth Circular Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Background Ring */}
          <motion.div
            className="absolute w-full h-full rounded-full border-4 border-gray-700"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} // Slower Rotation
          />

          {/* Foreground Animated Ring */}
          <motion.div
            className="absolute w-full h-full rounded-full border-4 border-transparent border-t-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} // Matches outer ring
          />

          {/* Percentage Display */}
          <span className="absolute text-xl font-light text-white">
            {progress}%
          </span>
        </div>

        {/* Subtle Animated Text */}
        <motion.h2
          className="mt-6 text-2xl font-light text-center"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} // Slower fade
        >
          {message || "Almost There..."}
        </motion.h2>
      </main>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Please tell us about your project";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched({...touched, [field]: true});
    validateField(field);
  };

  const validateField = (field) => {
    let newErrors = {...errors};
    
    switch(field) {
      case 'name':
        if (!formData.name.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
        break;
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        } else delete newErrors.email;
        break;
      case 'phone':
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
          newErrors.phone = "Please enter a valid phone number";
        } else delete newErrors.phone;
        break;
      case 'message':
        if (!formData.message.trim()) newErrors.message = "Please tell us about your project";
        else delete newErrors.message;
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with a delay
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTouched({});
        setTimeout(() => setSuccess(false), 5000);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Input field style generator for consistent styling
  const getInputStyle = (fieldName) => {
    return `w-full bg-gray-50 px-4 py-3 border-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
      touched[fieldName] && errors[fieldName] 
        ? "border-red-500 focus:ring-red-500/30" 
        : "border-gray-300 focus:ring-[#1a365d]/30 focus:border-[#1a365d]"
    }`;
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      {/* <Header logoVariant="dark" /> */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 pt-36 sm:pt-40">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-900">Get In Touch</h1>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">Ready to create something amazing? We're here to help bring your vision to life.</p>
          
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
            {/* Contact Info Card */}
            <div className="lg:w-2/5">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
                <div className="p-8 sm:p-10">
                  <h3 className="text-xl font-semibold mb-8 text-gray-800">Contact Information</h3>
                  
                  <div className="space-y-8 mb-10">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#1a365d]/10 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1a365d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gray-700 font-medium">Phone</h4>
                        <a href="tel:+919035250159" className="text-gray-500 hover:text-[#1a365d] transition-colors">+91 90352 50159</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#1a365d]/10 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1a365d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gray-700 font-medium">Email</h4>
                        <a href="mailto:letscreate@framelync.com" className="text-gray-500 hover:text-[#1a365d] transition-colors">letscreate@framelync.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#1a365d]/10 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1a365d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gray-700 font-medium">Location</h4>
                        <p className="text-gray-500">Mysore, Karnataka, India</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Media Icons */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Connect With Us</h4>
                    <div className="flex space-x-5">
                      <a href="https://www.instagram.com/framelyncmedia/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1a365d] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      {/* <a href="https://twitter.com/framelync" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1a365d] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a> */}
                      <a href="https://www.youtube.com/@framelyncmedia" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1a365d] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:w-3/5">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="p-8 sm:p-10">
                  <h3 className="text-xl font-semibold mb-8 text-gray-800">Send a Message</h3>
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your name"
                          className={getInputStyle('name')}
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (touched.name) validateField('name');
                          }}
                          onBlur={() => handleBlur('name')}
                        />
                        {touched.name && errors.name && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Your email"
                          className={getInputStyle('email')}
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (touched.email) validateField('email');
                          }}
                          onBlur={() => handleBlur('email')}
                        />
                        {touched.email && errors.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number (Optional)</label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Your phone number"
                          className={getInputStyle('phone')}
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (touched.phone) validateField('phone');
                          }}
                          onBlur={() => handleBlur('phone')}
                        />
                        {touched.phone && errors.phone && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                      <div className="relative">
                        <textarea
                          placeholder="Tell us about your project"
                          className={getInputStyle('message')}
                          rows="4"
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({ ...formData, message: e.target.value });
                            if (touched.message) validateField('message');
                          }}
                          onBlur={() => handleBlur('message')}
                        />
                        {touched.message && errors.message && (
                          <div className="absolute right-3 top-5 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="flex justify-center pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#1a365d] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-full flex items-center justify-center gap-2 transition duration-300 ease-in-out ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#2a466d]"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <span className="text-xl">↗</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message - sleek toast notification with improved animation */}
      {success && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm opacity-90">We'll get back to you shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { LoadingPage, ContactUs };