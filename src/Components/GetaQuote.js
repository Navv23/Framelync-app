import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const GetAQuote = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123557] tracking-tight mb-4"
        >
          Ready to Launch Your Project?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-8"
        >
          Let's discuss your vision and turn it into a stunning reality. Get a free, no-obligation quote today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            variant="default"
            size="lg"
            className="bg-[#123557] hover:bg-[#123557]/90 text-white px-8 py-3 rounded-full
                       shadow-lg hover:shadow-xl transition-all duration-300
                       flex items-center gap-2"
          >
            <Rocket className="w-6 h-6" />
            Get a Quote
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GetAQuote;
