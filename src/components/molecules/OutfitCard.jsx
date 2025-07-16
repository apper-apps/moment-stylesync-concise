import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const OutfitCard = ({ 
  outfit, 
  onRefresh, 
  onSave 
}) => {
  return (
    <Card className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-display font-semibold gradient-text mb-2">
          Today's Perfect Look
        </h2>
        <p className="text-gray-600">
          Curated for {outfit.weather} weather
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {outfit.items.map((item, index) => (
          <motion.div
            key={item.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="aspect-square bg-gradient-to-br from-secondary to-gray-100 rounded-2xl overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-sm font-medium text-primary">{item.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex gap-3 justify-center">
        <Button
          variant="secondary"
          onClick={onRefresh}
          className="flex-1 max-w-xs"
        >
          <ApperIcon name="RefreshCw" size={18} className="mr-2" />
          New Look
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          className="flex-1 max-w-xs"
        >
          <ApperIcon name="Heart" size={18} className="mr-2" />
          Save Outfit
        </Button>
      </div>
    </Card>
  );
};

export default OutfitCard;