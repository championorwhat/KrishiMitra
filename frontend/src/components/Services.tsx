import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  isDark: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, isDark }) => {
  const cardClasses = isDark 
    ? "bg-black border-2 border-black rounded-2xl p-8 hover:shadow-lg transition-shadow"
    : "bg-white border-2 border-black rounded-2xl p-8 hover:shadow-lg transition-shadow";
  
  const titleClasses = isDark 
    ? "text-xl font-bold text-green-500 mb-4"
    : "text-xl font-bold text-green-600 mb-4";
  
  const descriptionClasses = isDark 
    ? "text-gray-300 mb-6"
    : "text-gray-600 mb-6";
  
  const linkClasses = isDark 
    ? "text-white font-medium flex items-center gap-2 hover:text-green-400 transition-colors"
    : "text-black font-medium flex items-center gap-2 hover:text-green-600 transition-colors";

  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>{title}</h3>
      <p className={descriptionClasses}>{description}</p>
      <a href="#" className={linkClasses}>
        Learn More
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
};

const Services: React.FC = () => {
  const servicesData = [
    {
      title: "Smart Crop Advisory",
      description: "(Real-time, location-specific guidance)",
      isDark: false
    },
    {
      title: "Soil & Fertilizer Insights",
      description: "(Soil health and nutrient management)",
      isDark: true
    },
    {
      title: "Weather Alerts & Predictions",
      description: "(Stay ahead with climate insights)",
      isDark: false
    },
    {
      title: "Pest & Disease Detection",
      description: "(AI-powered image-based diagnosis)",
      isDark: true
    },
    {
      title: "Market Price Updates",
      description: "(Track crop prices in real time)",
      isDark: false
    },
    {
      title: "Voice Assistance",
      description: "(Support for every farmer, every language)",
      isDark: true
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-16">
          Our Services
        </h2>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              isDark={service.isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
