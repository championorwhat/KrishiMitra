"use client";
// For better icons, install lucide-react: npm install lucide-react
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import Sidebar from '@/components/Sidebar';
import ChatHistory from '@/components/ChatHistory';

import SoilFertilizerService from '@/services/SoilFertilizerService';
import WeatherAlertsService from '@/services/WeatherAlertsService';
import PestDiseaseService from '@/services/PestDiseaseService';
import MarketPriceService from '@/services/MarketPriceService';
import VoiceAssistanceService from '@/services/VoiceAssistanceService';

export default function AdvisoryPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState('Soil & Fertilizer Insights');

  useEffect(() => {
    // Redirect to login if no user is found
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Render a loading state or null while checking for user
  if (!currentUser) {
    return null;
  }

  const renderSelected = () => {
    switch (selected) {
      case 'Soil & Fertilizer Insights':
        return <SoilFertilizerService />;
      case 'Weather Alerts & Predictions':
        return <WeatherAlertsService />;
      case 'Pest & Disease Detection':
        return <PestDiseaseService />;
      case 'Market Price Updates':
        return <MarketPriceService />;
      case 'Voice Assistance':
        return <VoiceAssistanceService />;
      case 'Chat History':
        return <ChatHistory />;
      case 'Home':
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Home</h2>
            <p className="text-sm text-gray-600">Welcome to the advisory dashboard.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      {/* Header for User Info and Logout */}
      <header className="absolute top-0 right-0 p-6 w-full">
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {currentUser.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex gap-6 mt-6 px-4">
        <Sidebar
          items={[
            'Home',
            'Soil & Fertilizer Insights',
            'Weather Alerts & Predictions',
            'Pest & Disease Detection',
            'Market Price Updates',
            'Voice Assistance',
            'Chat History',
          ]}
          selected={selected}
          onSelect={setSelected}
        />

        <main className="flex-1 bg-white rounded-lg shadow-sm p-4">{renderSelected()}</main>
      </div>
    </div>
  );
}