import { motion } from "framer-motion";
import TrendCard from "@/components/molecules/TrendCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TrendsList = ({ 
  trends = [], 
  loading, 
  error, 
  onRetry 
}) => {
  if (loading) {
    return <Loading type="trends" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (trends.length === 0) {
    return (
      <Empty
        title="No trends available"
        description="Check back later for the latest fashion trends and style inspiration"
        actionText="Refresh"
        onAction={onRetry}
        icon="TrendingUp"
      />
    );
  }

  return (
    <div className="space-y-4 p-4">
      {trends.map((trend, index) => (
        <TrendCard
          key={trend.Id}
          trend={trend}
          index={index}
        />
      ))}
    </div>
  );
};

export default TrendsList;