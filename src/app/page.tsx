"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
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

  // Handle video click
  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentScreen("license-detail");
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

