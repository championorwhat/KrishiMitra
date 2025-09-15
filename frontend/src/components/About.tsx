import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              To the Farmers,<br />
              By the Farmer,<br />
              For the Farmer
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link href="/advisory" className="inline-block bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors">
              Join Us Now
            </Link>
          </div>
          
          {/* Right Images */}
          <div className="relative h-96">
            {/* Farmer Image */}
            <div 
              className="absolute rounded-full overflow-hidden"
              style={{
                width: '85.5px',
                height: '72px',
                top: '259.5px',
                left: '277.5px',
                opacity: 1
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                 src="/sidepic1.png"
                alt="Farmer" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Planting Image */}
            <div 
              className="absolute rounded-full overflow-hidden"
              style={{
                width: '85.5px',
                height: '72px',
                top: '200px',
                left: '150px',
                opacity: 1
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                 src="/sidepic2.png"
                alt="Planting" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
