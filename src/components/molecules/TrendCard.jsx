import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const TrendCard = ({ 
  trend, 
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300">
        <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl overflow-hidden flex-shrink-0">
          <img
            src={trend.imageUrl}
            alt={trend.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display font-semibold text-primary truncate">
              {trend.name}
            </h3>
            <Badge variant="primary" className="text-xs">
              {trend.category}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {trend.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ApperIcon name="TrendingUp" size={12} />
              {trend.relevanceScore}% relevance
            </div>
            <Badge variant="secondary" className="text-xs capitalize">
              {trend.season}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TrendCard;