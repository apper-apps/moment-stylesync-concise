import { motion } from "framer-motion";

const Loading = ({ type = "grid" }) => {
  const shimmerVariants = {
    animate: {
      x: ["0%", "100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear",
        },
      },
    },
  };

  if (type === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                variants={shimmerVariants}
                animate="animate"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "outfit") {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="h-8 bg-secondary rounded-lg w-3/4 mx-auto relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
          <div className="h-4 bg-secondary rounded w-1/2 mx-auto relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        </div>
        
        <div className="glass-card rounded-3xl p-6 premium-shadow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-secondary rounded-2xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "trends") {
    return (
      <div className="p-4 space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card rounded-3xl p-6 premium-shadow">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-secondary rounded-2xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-secondary rounded w-3/4 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
                <div className="h-4 bg-secondary rounded w-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-secondary rounded-2xl relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      ))}
    </div>
  );
};

export default Loading;