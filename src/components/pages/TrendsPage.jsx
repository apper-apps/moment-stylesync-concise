import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FilterChips from "@/components/molecules/FilterChips";
import TrendsList from "@/components/organisms/TrendsList";
import { trendService } from "@/services/api/trendService";

const TrendsPage = () => {
  const [trends, setTrends] = useState([]);
  const [filteredTrends, setFilteredTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { value: "all", label: "All Trends" },
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
    { value: "dresses", label: "Dresses" },
    { value: "outerwear", label: "Outerwear" }
  ];

  const loadTrends = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await trendService.getAll();
      // Sort by relevance score
      const sortedTrends = data.sort((a, b) => b.relevanceScore - a.relevanceScore);
      setTrends(sortedTrends);
      setFilteredTrends(sortedTrends);
    } catch (err) {
      setError("Failed to load trends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrends();
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTrends(trends);
    } else {
      setFilteredTrends(trends.filter(trend => trend.category === activeFilter));
    }
  }, [trends, activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-3xl font-display font-bold gradient-text mb-2">
              Fashion Trends
            </h1>
            <p className="text-gray-600">
              Stay ahead of the style curve
            </p>
          </motion.div>
        </div>
        
        <FilterChips
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <TrendsList
        trends={filteredTrends}
        loading={loading}
        error={error}
        onRetry={loadTrends}
      />
    </div>
  );
};

export default TrendsPage;