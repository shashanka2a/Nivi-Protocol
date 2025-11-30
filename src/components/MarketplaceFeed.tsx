"use client";

import { motion, AnimatePresence } from "motion/react";
import { Plus, Shield, Play, Search, Filter, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry from "react-responsive-masonry";
import { useState } from "react";
import { MOCK_VIDEOS, CATEGORIES, Video } from "../data/mockVideos";

export function MarketplaceFeed({
  onCreateClick,
  onVideoClick,
}: {
  onCreateClick: () => void;
  onVideoClick: (video: Video) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Filter videos based on category and search
  const filteredVideos = MOCK_VIDEOS.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="glass-card border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl uppercase tracking-wider mb-1">MARKETPLACE</h1>
              <p className="text-white/60">
                {filteredVideos.length} verified licenses
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(!showSearch)}
              className="glass-card p-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <input
                  type="text"
                  placeholder="Search videos or creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass-card px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-white/40"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${
                  category === selectedCategory
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "glass-card hover:bg-white/10 text-white/80"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-3 border-t border-white/5 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-white/60">Trending content</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-400" />
            <span className="text-white/60">All verified</span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-6"
        >
          <div className="glass-card p-8 rounded-2xl text-center max-w-md">
            <Filter className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl mb-2">No videos found</h3>
            <p className="text-white/60 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="btn-primary px-6 py-3"
            >
              Clear filters
            </button>
          </div>
        </motion.div>
      )}

      {/* Masonry Grid */}
      {filteredVideos.length > 0 && (
        <div className="px-4 py-6">
          <Masonry columnsCount={2} gutter="12px">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <VideoCard video={video} onClick={() => onVideoClick(video)} />
              </motion.div>
            ))}
          </Masonry>
        </div>
      )}

      {/* Floating Action Button */}
      <motion.button
        onClick={onCreateClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 z-40"
      >
        <Plus className="w-7 h-7" />
      </motion.button>
    </div>
  );
}

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="glass-card-hover overflow-hidden cursor-pointer group"
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-[9/16] overflow-hidden rounded-t-2xl bg-black/20">
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40"
          >
            <Play className="w-6 h-6 fill-white ml-1" />
          </motion.div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-2 left-2 glass-card px-2.5 py-1 rounded-lg backdrop-blur-xl">
          <span className="text-xs text-white/90">{video.category}</span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-2 left-2 glass-card px-3 py-1.5 rounded-lg backdrop-blur-xl border border-white/20">
          <span className="text-sm">
            {video.price}{" "}
            <span className="text-white/60 text-xs">APT/mo</span>
          </span>
        </div>

        {/* Stats */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 glass-card px-2.5 py-1 rounded-lg backdrop-blur-xl">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-xs text-white/90">{video.stats.views}</span>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-3">
        <h3 className="mb-2 line-clamp-2 leading-snug">{video.title}</h3>
        <div className="flex items-center gap-2">
          <ImageWithFallback
            src={video.creator.avatar}
            alt={video.creator.name}
            className="w-7 h-7 rounded-full object-cover ring-2 ring-white/10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/80 truncate">
              {video.creator.name}
            </p>
            <p className="text-xs text-white/50">
              {video.stats.licenses} licenses
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}