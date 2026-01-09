"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Gulshan Insa",
    affiliation: "GEC Bikaner",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gulshan",
    text: "My overall experience is very good, during my summer internship at Amity x ZMT EdTech and attending their workshop. The way of teaching was outstanding and engaging.",
  },
  {
    name: "Ayush Abhinav",
    affiliation: "IIT Roorkee",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush",
    text: "My team conducted a series of 15 workshops with Amity x ZMT EdTech at a time during our tech-fest. I am highly thankful to the team for its awesome management team.",
  },
  {
    name: "Shreya Pandoh",
    affiliation: "GCW Parade, Jammu",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shreya",
    text: "I attended Ethical Hacking and Cyber Security workshop. I found Amity x ZMT EdTech probably one of the most effective and efficient venture I have ever encountered.",
  },
  {
    name: "Ronak Lalwani",
    affiliation: "NIT Delhi",
    rating: 4,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ronak",
    text: "Took a Data Analytics, Machine Learning, and AI using Python course. Commended the content, management, and knowledgeable trainer.",
  },
  {
    name: "Pradip Singh Tomar",
    affiliation: "System Engineer at TCS",
    rating: 4,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pradip",
    text: "Praises the instructor's understanding, well-suited materials, and the balance between theory and practice in the course.",
  },
  {
    name: "Adarsh Pal",
    affiliation: "RKGIT Ghaziabad",
    rating: 4,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adarsh",
    text: "Highlights the hands-on sessions and practice problems using Deep Learning skills, calling it an excellent workshop with good content delivery.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.affiliation}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

