import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransferCard = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigateToDetails = () => {
    
    navigate('/dashboard'); 
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-blue-50 shadow-lg">
        <div className="relative p-8">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
              >
                <Check className="h-16 w-16 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h2 className="mb-2 text-3xl font-bold text-gray-800">Money Transfer</h2>
              <p className="text-2xl font-semibold text-green-600">Successful</p>
            </motion.div>
            <motion.div
              className="group flex cursor-pointer items-center space-x-2 text-blue-600"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              transition={{ delay: 1, duration: 0.3 }}
              role="button"
              tabIndex={0}
              aria-label="View transaction details"
              onClick={handleNavigateToDetails}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigateToDetails()}
            >
              <span className="text-lg font-medium">Transaction details</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransferCard;
