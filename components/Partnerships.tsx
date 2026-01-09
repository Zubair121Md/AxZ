"use client";

import { motion } from "framer-motion";

const partnerships = [
  {
    name: "Amity",
    imageUrl: "https://www.amity.edu/images/amity-logo.png",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Amity_University_logo.svg/1200px-Amity_University_logo.svg.png",
    description: "Leading Educational Institution",
  },
  {
    name: "Microsoft",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png",
    description: "Certification Partner",
  },
  {
    name: "AWS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/800px-Amazon_Web_Services_Logo.svg.png",
    description: "Training and Certification",
  },
  {
    name: "IBM",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/800px-IBM_logo.svg.png",
    description: "Technology Partner",
  },
];

export default function Partnerships() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Partnerships
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-gray-600">
            Collaborating with industry leaders to provide world-class education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {partnerships.map((partner, index) => {
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 text-center"
              >
                <div className="mb-4 flex justify-center h-16 items-center bg-gray-50 rounded-lg p-3">
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="h-12 w-auto object-contain max-w-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (partner.fallbackUrl && target.src !== partner.fallbackUrl) {
                          target.src = partner.fallbackUrl;
                        } else {
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-base font-semibold text-primary">${partner.name}</span>`;
                          }
                        }
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-primary-dark text-white p-10 md:p-12 rounded-2xl text-center shadow-2xl"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-400 rounded-full flex items-center justify-center mr-4 md:mr-6 shadow-lg p-2">
              <img
                src={partnerships[0].imageUrl}
                alt="Amity"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (partnerships[0].fallbackUrl && target.src !== partnerships[0].fallbackUrl) {
                    target.src = partnerships[0].fallbackUrl;
                  } else {
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-2xl md:text-3xl font-bold text-white">A</span>`;
                    }
                  }
                }}
              />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl md:text-4xl font-bold text-white">Z</span>
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Amity x ZMT EdTech
          </h3>
          <p className="text-xl md:text-2xl opacity-95 font-semibold mb-3">
            A Joint Initiative
          </p>
          <p className="text-base md:text-lg opacity-90 mt-2 max-w-2xl mx-auto">
            Empowering careers through world-class technical education
          </p>
        </motion.div>
      </div>
    </section>
  );
}

