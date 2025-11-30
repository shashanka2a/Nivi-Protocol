"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplashScreen } from "@/components/SplashScreen";
import { OnboardingLogin } from "@/components/OnboardingLogin";
import { CreatorStudio } from "@/components/CreatorStudio";
import { MarketplaceFeed } from "@/components/MarketplaceFeed";
import { LicenseDetail } from "@/components/LicenseDetail";
import { UserDashboard } from "@/components/UserDashboard";
import { TabBar } from "@/components/TabBar";
import { Video } from "@/data/mockVideos";

type Screen =
  | "splash"
  | "onboarding"
  | "marketplace"
  | "studio"
  | "dashboard"
  | "license-detail";

type TabType = "home" | "search" | "create" | "wallet";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setCurrentScreen("onboarding");
  };

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("marketplace");
  };

  // Handle tab navigation
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        setCurrentScreen("marketplace");
        break;
      case "create":
        setCurrentScreen("studio");
        break;
      case "wallet":
        setCurrentScreen("dashboard");
        break;
      case "search":
        // Search functionality would go here
        setCurrentScreen("marketplace");
        break;
    }
  };

  // Handle video click with loading animation
  const handleVideoClick = (video: Video) => {
    setIsLoadingDetail(true);
    setSelectedVideo(video);
    
    // Small delay for smooth transition
    setTimeout(() => {
      setCurrentScreen("license-detail");
      setIsLoadingDetail(false);
    }, 150);
  };

  // Handle back navigation
  const handleBack = () => {
    setCurrentScreen("marketplace");
    setActiveTab("home");
  };

  // Determine if we should show the tab bar
  const showTabBar =
    isLoggedIn &&
    currentScreen !== "onboarding" &&
    currentScreen !== "license-detail";

  return (
    <div className="min-h-screen relative">
      {/* Loading overlay for license detail */}
      <AnimatePresence>
        {isLoadingDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-white/80">Loading license details...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentScreen === "splash" && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {currentScreen === "onboarding" && (
          <OnboardingLogin key="onboarding" onLogin={handleLogin} />
        )}

        {currentScreen === "marketplace" && (
          <MarketplaceFeed
            key="marketplace"
            onCreateClick={() => {
              setCurrentScreen("studio");
              setActiveTab("create");
            }}
            onVideoClick={handleVideoClick}
          />
        )}

        {currentScreen === "studio" && (
          <CreatorStudio key="studio" onBack={handleBack} />
        )}

        {currentScreen === "dashboard" && <UserDashboard key="dashboard" />}

        {currentScreen === "license-detail" && selectedVideo && (
          <LicenseDetail
            key="license-detail"
            video={selectedVideo}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>

      {/* Tab Bar */}
      {showTabBar && (
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

