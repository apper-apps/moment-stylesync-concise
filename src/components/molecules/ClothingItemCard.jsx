import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const ClothingItemCard = ({ 
  item, 
  onClick 
}) => {
  const getWearCountColor = (count) => {
    if (count === 0) return "default";
    if (count < 5) return "success";
    if (count < 10) return "warning";
    return "error";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="aspect-square bg-gradient-to-br from-secondary to-gray-100 rounded-2xl overflow-hidden premium-shadow group-hover:premium-shadow-lg transition-all duration-300">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="mt-3 space-y-2">
        <h3 className="font-medium text-primary truncate">{item.name}</h3>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {item.category}
          </Badge>
          <Badge variant={getWearCountColor(item.wearCount)} className="text-xs">
            {item.wearCount}x worn
          </Badge>
        </div>
        
        {item.lastWorn && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <ApperIcon name="Calendar" size={12} />
            {format(new Date(item.lastWorn), "MMM d")}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ClothingItemCard;