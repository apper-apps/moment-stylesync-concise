import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";

const AddItemForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    style: "",
    season: "",
    occasions: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
    { value: "dresses", label: "Dresses" },
    { value: "outerwear", label: "Outerwear" }
  ];

  const seasons = [
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "fall", label: "Fall" },
    { value: "winter", label: "Winter" },
    { value: "all", label: "All Seasons" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !imageFile) {
      toast.error("Please fill in all required fields and add an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const newItem = {
        ...formData,
        imageUrl: imagePreview,
        style: formData.style.split(",").map(s => s.trim()).filter(s => s),
        occasions: formData.occasions.split(",").map(o => o.trim()).filter(o => o),
        season: formData.season.split(",").map(s => s.trim()).filter(s => s),
        wearCount: 0,
        lastWorn: null
      };

      await onSubmit(newItem);
      
      // Reset form
      setFormData({
        name: "",
        category: "",
        color: "",
        style: "",
        season: "",
        occasions: ""
      });
      setImageFile(null);
      setImagePreview(null);
      
      toast.success("Item added successfully!");
    } catch (error) {
      toast.error("Failed to add item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold gradient-text mb-2">
            Add New Item
          </h2>
          <p className="text-gray-600">
            Expand your digital wardrobe
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-secondary to-gray-100 rounded-2xl overflow-hidden mb-4 relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ApperIcon name="ImagePlus" size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/20 text-accent rounded-xl cursor-pointer hover:from-accent/20 hover:to-accent/30 transition-all duration-200"
            >
              <ApperIcon name="Upload" size={16} />
              Choose Image
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Item Name *"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Blue Denim Jacket"
            />
            
            <Select
              label="Category *"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Color"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              placeholder="e.g., Navy Blue"
            />
            
            <Select
              label="Season"
              value={formData.season}
              onChange={(e) => handleInputChange("season", e.target.value)}
            >
              <option value="">Select season</option>
              {seasons.map(season => (
                <option key={season.value} value={season.value}>
                  {season.label}
                </option>
              ))}
            </Select>
          </div>

          <Input
            label="Style Tags"
            value={formData.style}
            onChange={(e) => handleInputChange("style", e.target.value)}
            placeholder="e.g., casual, formal, trendy (comma-separated)"
          />

          <Input
            label="Occasions"
            value={formData.occasions}
            onChange={(e) => handleInputChange("occasions", e.target.value)}
            placeholder="e.g., work, weekend, date night (comma-separated)"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" size={18} className="mr-2 animate-spin" />
              Adding Item...
            </>
          ) : (
            <>
              <ApperIcon name="Plus" size={18} className="mr-2" />
              Add to Closet
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default AddItemForm;