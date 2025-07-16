import { motion } from "framer-motion";
import ClothingItemCard from "@/components/molecules/ClothingItemCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ClosetGrid = ({ 
  items = [], 
  loading, 
  error, 
  onRetry, 
  onItemClick 
}) => {
  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (items.length === 0) {
    return (
      <Empty
        title="Your closet is empty"
        description="Start building your digital wardrobe by adding your favorite pieces"
        actionText="Add First Item"
        onAction={() => window.location.href = "/add-item"}
        icon="Shirt"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <motion.div
          key={item.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ClothingItemCard
            item={item}
            onClick={() => onItemClick(item)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ClosetGrid;