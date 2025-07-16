import outfitData from "@/services/mockData/outfits.json";

class OutfitService {
  constructor() {
    this.outfits = [...outfitData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.outfits];
  }

  async getById(id) {
    await this.delay(200);
    const outfit = this.outfits.find(outfit => outfit.Id === parseInt(id));
    if (!outfit) {
      throw new Error("Outfit not found");
    }
    return { ...outfit };
  }

  async create(outfitData) {
    await this.delay(400);
    const newOutfit = {
      ...outfitData,
      Id: this.getNextId(),
      date: new Date().toISOString()
    };
    this.outfits.push(newOutfit);
    return { ...newOutfit };
  }

  async update(id, outfitData) {
    await this.delay(300);
    const index = this.outfits.findIndex(outfit => outfit.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Outfit not found");
    }
    this.outfits[index] = { ...this.outfits[index], ...outfitData };
    return { ...this.outfits[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.outfits.findIndex(outfit => outfit.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Outfit not found");
    }
    this.outfits.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.outfits.map(outfit => outfit.Id), 0) + 1;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const outfitService = new OutfitService();