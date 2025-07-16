import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import OutfitGenerator from "@/components/organisms/OutfitGenerator";
import { outfitService } from "@/services/api/outfitService";
import { clothingService } from "@/services/api/clothingService";

const TodaysLookPage = () => {
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateOutfit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all clothing items
      const allItems = await clothingService.getAll();
      
      if (allItems.length === 0) {
        setError("No items in closet");
        return;
      }

      // Generate a random outfit
      const shuffled = [...allItems].sort(() => Math.random() - 0.5);
      const selectedItems = shuffled.slice(0, Math.min(4, shuffled.length));
      
      const newOutfit = {
        Id: Date.now(),
        items: selectedItems,
        weather: "mild",
        occasion: "casual",
        date: new Date().toISOString(),
        rating: 0,
        isFavorite: false
      };
      
      setOutfit(newOutfit);
    } catch (err) {
      setError("Failed to generate outfit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOutfit = async () => {
    if (!outfit) return;
    
    try {
      await outfitService.create(outfit);
      toast.success("Outfit saved successfully!");
    } catch (err) {
      toast.error("Failed to save outfit. Please try again.");
    }
  };

  useEffect(() => {
    generateOutfit();
  }, []);

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
              StyleSync
            </h1>
            <p className="text-gray-600">
              Your daily style companion
            </p>
          </motion.div>
        </div>
      </div>

      <OutfitGenerator
        outfit={outfit}
        loading={loading}
        error={error}
        onRetry={generateOutfit}
        onRefresh={generateOutfit}
        onSave={handleSaveOutfit}
      />
    </div>
  );
};

export default TodaysLookPage;