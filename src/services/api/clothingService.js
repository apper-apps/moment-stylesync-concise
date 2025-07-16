import clothingData from "@/services/mockData/clothing.json";

class ClothingService {
  constructor() {
    this.items = [...clothingData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.items];
  }

  async getById(id) {
    await this.delay(200);
    const item = this.items.find(item => item.Id === parseInt(id));
    if (!item) {
      throw new Error("Item not found");
    }
    return { ...item };
  }

  async create(itemData) {
    await this.delay(400);
    const newItem = {
      ...itemData,
      Id: this.getNextId(),
      wearCount: 0,
      lastWorn: null
    };
    this.items.push(newItem);
    return { ...newItem };
  }

  async update(id, itemData) {
    await this.delay(300);
    const index = this.items.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Item not found");
    }
    this.items[index] = { ...this.items[index], ...itemData };
    return { ...this.items[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.items.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Item not found");
    }
    this.items.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.items.map(item => item.Id), 0) + 1;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const clothingService = new ClothingService();