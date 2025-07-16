import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const BottomNavigation = () => {
  const navItems = [
    { 
      path: "/", 
      icon: "Sparkles", 
      label: "Today's Look",
      exact: true
    },
    { 
      path: "/closet", 
      icon: "Shirt", 
      label: "Closet" 
    },
    { 
      path: "/trends", 
      icon: "TrendingUp", 
      label: "Trends" 
    },
    { 
      path: "/add-item", 
      icon: "Plus", 
      label: "Add Item" 
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-accent bg-accent/10" 
                  : "text-gray-500 hover:text-accent hover:bg-accent/5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ApperIcon 
                    name={item.icon} 
                    size={20} 
                    className={isActive ? "text-accent" : "text-gray-500"}
                  />
                </motion.div>
                <span className={`text-xs font-medium ${isActive ? "text-accent" : "text-gray-500"}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;