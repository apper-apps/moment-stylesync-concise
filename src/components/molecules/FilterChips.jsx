import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";

const FilterChips = ({ 
  filters, 
  activeFilter, 
  onFilterChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="outline-none"
        >
          <Badge
            variant={activeFilter === filter.value ? "primary" : "default"}
            className={`cursor-pointer transition-all duration-200 ${
              activeFilter === filter.value 
                ? "bg-gradient-to-r from-accent to-accent/90 text-white shadow-lg" 
                : "hover:bg-accent/10 hover:text-accent"
            }`}
          >
            {filter.label}
          </Badge>
        </motion.button>
      ))}
    </div>
  );
};

export default FilterChips;