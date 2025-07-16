import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FilterChips from "@/components/molecules/FilterChips";
import ClosetGrid from "@/components/organisms/ClosetGrid";
import { clothingService } from "@/services/api/clothingService";

const ClosetPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { value: "all", label: "All Items" },
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
    { value: "dresses", label: "Dresses" },
    { value: "outerwear", label: "Outerwear" }
  ];

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clothingService.getAll();
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      setError("Failed to load your closet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === activeFilter));
    }
  }, [items, activeFilter]);

  const handleItemClick = (item) => {
    // In a real app, this would open a modal or navigate to item details
    console.log("Item clicked:", item);
  };

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
              My Closet
            </h1>
            <p className="text-gray-600">
              {items.length} items in your wardrobe
            </p>
          </motion.div>
        </div>
        
        <FilterChips
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <ClosetGrid
        items={filteredItems}
        loading={loading}
        error={error}
        onRetry={loadItems}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default ClosetPage;