'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Treatments' },
    { id: 'panchakarma', name: 'Panchakarma' },
    { id: 'nutrition', name: 'Ayurvedic Nutrition' },
    { id: 'herbs', name: 'Herbal Remedies' },
    { id: 'yoga', name: 'Yoga & Meditation' }
  ];

  const treatments = [
    {
      id: 1,
      title: 'Abhyanga',
      category: 'panchakarma',
      description: 'A full-body massage with herbal oils that helps improve circulation and relaxation.',
      imageUrl: '/globe.svg',
      benefits: ['Improves circulation', 'Reduces stress', 'Nourishes the skin']
    },
    {
      id: 2,
      title: 'Shirodhara',
      category: 'panchakarma',
      description: 'A continuous flow of warm oil on the forehead that calms the mind and nervous system.',
      imageUrl: '/file.svg',
      benefits: ['Reduces anxiety', 'Improves sleep', 'Enhances mental clarity']
    },
    {
      id: 3,
      title: 'Seasonal Diet Planning',
      category: 'nutrition',
      description: 'Customized diet plans based on your dosha and the current season for optimal health.',
      imageUrl: '/window.svg',
      benefits: ['Balances doshas', 'Improves digestion', 'Enhances immunity']
    },
    {
      id: 4,
      title: 'Triphala',
      category: 'herbs',
      description: 'A traditional herbal formulation of three fruits that supports digestive health and detoxification.',
      imageUrl: '/globe.svg',
      benefits: ['Supports digestion', 'Cleanses the colon', 'Rich in antioxidants']
    },
    {
      id: 5,
      title: 'Pranayama',
      category: 'yoga',
      description: 'Breathing exercises that enhance vital energy and improve respiratory function.',
      imageUrl: '/window.svg',
      benefits: ['Increases oxygen intake', 'Calms the mind', 'Balances energy']
    },
    {
      id: 6,
      title: 'Nasya',
      category: 'panchakarma',
      description: 'Administration of herbal oils through the nasal passage to clear sinus and improve mental clarity.',
      imageUrl: '/file.svg',
      benefits: ['Clears sinuses', 'Improves mental clarity', 'Enhances sensory perception']
    }
  ];

  const filteredTreatments = activeCategory === 'all' 
    ? treatments 
    : treatments.filter(treatment => treatment.category === activeCategory);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Discover Ayurvedic Treatments</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore traditional Ayurvedic therapies and treatments that promote holistic wellness and balance.</p>
      </div>

      {/* Category Tabs */}
      
      <div className="flex flex-wrap justify-center mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`mx-2 my-1 px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category.id 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map(treatment => (
          <div key={treatment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-green-100 relative">
              <img 
                src={treatment.imageUrl} 
                alt={treatment.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{treatment.title}</h2>
              <p className="text-gray-600 mb-4">{treatment.description}</p>
              
              <h3 className="font-medium text-gray-800 mb-2">Benefits:</h3>
              <ul className="space-y-1 mb-4">
                {treatment.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/discover/${treatment.id}`}
                className="inline-block mt-2 text-green-600 font-medium hover:text-green-700"
              >
                Learn more →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Find Doctor CTA */}
      <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to experience Ayurvedic treatments?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">Connect with our experienced Ayurvedic doctors who can guide you through personalized treatment plans.</p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          Find a Doctor
        </Link>
      </div>
    </div>
  );
}