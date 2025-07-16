import trendData from "@/services/mockData/trends.json";

class TrendService {
  constructor() {
    this.trends = [...trendData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.trends];
  }

  async getById(id) {
    await this.delay(200);
    const trend = this.trends.find(trend => trend.Id === parseInt(id));
    if (!trend) {
      throw new Error("Trend not found");
    }
    return { ...trend };
  }

  async create(trendData) {
    await this.delay(400);
    const newTrend = {
      ...trendData,
      Id: this.getNextId()
    };
    this.trends.push(newTrend);
    return { ...newTrend };
  }

  async update(id, trendData) {
    await this.delay(300);
    const index = this.trends.findIndex(trend => trend.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Trend not found");
    }
    this.trends[index] = { ...this.trends[index], ...trendData };
    return { ...this.trends[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.trends.findIndex(trend => trend.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Trend not found");
    }
    this.trends.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.trends.map(trend => trend.Id), 0) + 1;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const trendService = new TrendService();