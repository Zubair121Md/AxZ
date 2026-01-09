"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const placements = [
  { 
    name: "Infosys", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png"
  },
  { 
    name: "Bank of America", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bank_of_America_logo.svg/2560px-Bank_of_America_logo.svg.png"
  },
  { 
    name: "Flipkart", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flipkart_logo.svg/2560px-Flipkart_logo.svg.png"
  },
  { 
    name: "TCS", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png"
  },
  { 
    name: "Wipro", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Wipro_Logo.svg/2560px-Wipro_Logo.svg.png"
  },
  { 
    name: "Accenture", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png"
  },
  { 
    name: "Microsoft", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png"
  },
  { 
    name: "Amazon", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
  },
];

function PlacementItem({ company, index }: { company: typeof placements[0]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(company.imageUrl);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 group hover:scale-105 min-h-[100px]"
    >
      {!imgError ? (
        <img
          src={currentSrc}
          alt={company.name}
          className="h-12 md:h-16 w-auto max-w-[90%] object-contain transition-all duration-300"
          onError={() => {
            setImgError(true);
          }}
          onLoad={() => {
            setImgError(false);
          }}
          style={{ display: 'block', minHeight: '48px' }}
        />
      ) : (
        <span className="text-sm md:text-base font-semibold text-gray-800 text-center px-2">
          {company.name}
        </span>
      )}
    </motion.div>
  );
}

export default function Placements() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Placements
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Our students have been placed in top companies across the globe, achieving success in their careers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {placements.map((company, index) => (
            <PlacementItem key={company.name} company={company} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button className="border-2 border-gray-800 text-gray-800 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm md:text-base">
            See all Placements
          </button>
        </motion.div>
      </div>
    </section>
  );
}
