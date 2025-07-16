import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AddItemForm from "@/components/molecules/AddItemForm";
import { clothingService } from "@/services/api/clothingService";

const AddItemPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (itemData) => {
    try {
      await clothingService.create(itemData);
      navigate("/closet");
    } catch (error) {
      throw new Error("Failed to add item");
    }
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
              Add New Item
            </h1>
            <p className="text-gray-600">
              Expand your digital wardrobe
            </p>
          </motion.div>
        </div>
      </div>

      <div className="p-4">
        <AddItemForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddItemPage;