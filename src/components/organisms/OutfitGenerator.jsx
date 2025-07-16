import { motion } from "framer-motion";
import OutfitCard from "@/components/molecules/OutfitCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const OutfitGenerator = ({ 
  outfit, 
  loading, 
  error, 
  onRetry, 
  onRefresh, 
  onSave 
}) => {
  if (loading) {
    return <Loading type="outfit" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!outfit || !outfit.items || outfit.items.length === 0) {
    return (
      <Empty
        title="No outfit suggestions"
        description="Add some items to your closet to get personalized outfit recommendations"
        actionText="Add Items"
        onAction={() => window.location.href = "/add-item"}
        icon="Sparkles"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4"
    >
      <OutfitCard
        outfit={outfit}
        onRefresh={onRefresh}
        onSave={onSave}
      />
    </motion.div>
  );
};

export default OutfitGenerator;