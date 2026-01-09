"use client";

import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Amity x ZMT EdTech</h3>
            <p className="text-gray-300 mb-6 text-sm">Ideal for Geeks</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase text-sm tracking-wide">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold mb-5 text-lg">Programs</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors text-sm">FDPs</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Workshops</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Internship Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Placement Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Upcoming Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Past Events</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-5 text-lg">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Clients</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Gallery</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Terms of Use</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-5 text-lg">Connect With Us</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                <a href="tel:+918406888778" className="hover:text-white transition-colors text-sm">
                  +91 84068 88778
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <a href="mailto:info@zmtedtech.com" className="hover:text-white transition-colors text-sm">
                  info@zmtedtech.com
                </a>
              </li>
              <li className="flex items-center space-x-4 mt-6">
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300" aria-label="Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300" aria-label="YouTube">
                  <Youtube className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Footer Section - Skills, Certificates, Industries, Career Resources */}
        <div className="border-t border-gray-700 pt-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Skills Column */}
            <div>
              <h4 className="font-bold mb-5 text-lg">Skills</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/courses?skill=Artificial Intelligence" className="hover:text-white transition-colors text-sm">Artificial Intelligence (AI)</a></li>
                <li><a href="/courses?skill=Cybersecurity" className="hover:text-white transition-colors text-sm">Cybersecurity</a></li>
                <li><a href="/courses?skill=Data Analytics" className="hover:text-white transition-colors text-sm">Data Analytics</a></li>
                <li><a href="/courses?skill=Digital Marketing" className="hover:text-white transition-colors text-sm">Digital Marketing</a></li>
                <li><a href="/courses?skill=English Speaking" className="hover:text-white transition-colors text-sm">English Speaking</a></li>
                <li><a href="/courses?skill=Generative AI" className="hover:text-white transition-colors text-sm">Generative AI (GenAI)</a></li>
                <li><a href="/courses?skill=Microsoft Excel" className="hover:text-white transition-colors text-sm">Microsoft Excel</a></li>
                <li><a href="/courses?skill=Microsoft Power BI" className="hover:text-white transition-colors text-sm">Microsoft Power BI</a></li>
                <li><a href="/courses?skill=Project Management" className="hover:text-white transition-colors text-sm">Project Management</a></li>
                <li><a href="/courses?skill=Python" className="hover:text-white transition-colors text-sm">Python</a></li>
              </ul>
            </div>

            {/* Certificates & Programs Column */}
            <div>
              <h4 className="font-bold mb-5 text-lg">Certificates & Programs</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/courses?certificate=Cybersecurity" className="hover:text-white transition-colors text-sm">Google Cybersecurity Certificate</a></li>
                <li><a href="/courses?certificate=Data Science" className="hover:text-white transition-colors text-sm">Google Data Analytics Certificate</a></li>
                <li><a href="/courses?certificate=Information Technology" className="hover:text-white transition-colors text-sm">Google IT Support Certificate</a></li>
                <li><a href="/courses?certificate=Business" className="hover:text-white transition-colors text-sm">Google Project Management Certificate</a></li>
                <li><a href="/courses?category=Arts and Humanities" className="hover:text-white transition-colors text-sm">Google UX Design Certificate</a></li>
                <li><a href="/courses?certificate=Data Science" className="hover:text-white transition-colors text-sm">IBM Data Analyst Certificate</a></li>
                <li><a href="/courses?certificate=Data Science" className="hover:text-white transition-colors text-sm">IBM Data Science Certificate</a></li>
                <li><a href="/courses?category=Artificial Intelligence" className="hover:text-white transition-colors text-sm">Machine Learning Certificate</a></li>
                <li><a href="/courses?certificate=Business" className="hover:text-white transition-colors text-sm">Microsoft Power BI Data Analyst Certificate</a></li>
                <li><a href="/courses?category=Arts and Humanities" className="hover:text-white transition-colors text-sm">UI / UX Design Certificate</a></li>
              </ul>
            </div>

            {/* Industries & Careers Column */}
            <div>
              <h4 className="font-bold mb-5 text-lg">Industries & Careers</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/courses?category=Business" className="hover:text-white transition-colors text-sm">Business</a></li>
                <li><a href="/courses?category=Computer Science" className="hover:text-white transition-colors text-sm">Computer Science</a></li>
                <li><a href="/courses?category=Data Science" className="hover:text-white transition-colors text-sm">Data Science</a></li>
                <li><a href="/for-colleges" className="hover:text-white transition-colors text-sm">Education & Teaching</a></li>
                <li><a href="/courses?category=Physical Science and Engineering" className="hover:text-white transition-colors text-sm">Engineering</a></li>
                <li><a href="/courses?category=Business" className="hover:text-white transition-colors text-sm">Finance</a></li>
                <li><a href="/courses?category=Healthcare" className="hover:text-white transition-colors text-sm">Healthcare</a></li>
                <li><a href="/courses?category=Business" className="hover:text-white transition-colors text-sm">Human Resources (HR)</a></li>
                <li><a href="/courses?category=Information Technology" className="hover:text-white transition-colors text-sm">Information Technology (IT)</a></li>
                <li><a href="/courses?category=Business" className="hover:text-white transition-colors text-sm">Marketing</a></li>
              </ul>
            </div>

            {/* Career Resources Column */}
            <div>
              <h4 className="font-bold mb-5 text-lg">Career Resources</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/career-aptitude-test" className="hover:text-white transition-colors text-sm">Career Aptitude Test</a></li>
                <li><a href="/interview-tips" className="hover:text-white transition-colors text-sm">Examples of Strengths and Weaknesses for Job Interviews</a></li>
                <li><a href="/high-income-skills" className="hover:text-white transition-colors text-sm">High-Income Skills to Learn</a></li>
                <li><a href="/cryptocurrency-guide" className="hover:text-white transition-colors text-sm">How Does Cryptocurrency Work?</a></li>
                <li><a href="/google-sheets-tutorial" className="hover:text-white transition-colors text-sm">How to Highlight Duplicates in Google Sheets</a></li>
                <li><a href="/learn-ai" className="hover:text-white transition-colors text-sm">How to Learn Artificial Intelligence</a></li>
                <li><a href="/cybersecurity-certifications" className="hover:text-white transition-colors text-sm">Popular Cybersecurity Certifications</a></li>
                <li><a href="/pmp-certification" className="hover:text-white transition-colors text-sm">Preparing for the PMP Certification</a></li>
                <li><a href="/interview-signs" className="hover:text-white transition-colors text-sm">Signs You Will Get the Job After an Interview</a></li>
                <li><a href="/what-is-ai" className="hover:text-white transition-colors text-sm">What Is Artificial Intelligence?</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-300 text-sm">
          <p>All rights reserved © 2025 Amity x ZMT EdTech</p>
        </div>
      </div>
    </footer>
  );
}

