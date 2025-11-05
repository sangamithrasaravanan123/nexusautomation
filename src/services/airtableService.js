class AirtableService {
  constructor() {
    // 👈 VITE USES import.meta.env INSTEAD OF process.env
    this.baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    this.apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    this.tableName = 'Stock';
    this.baseUrl = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`;
    
    // Add validation for Vite environment variables
    if (!this.baseId || !this.apiKey) {
      console.error('Airtable configuration missing. Please check your .env file.');
      console.error('Required: VITE_AIRTABLE_BASE_ID and VITE_AIRTABLE_API_KEY');
    }
  }

  async getStockData() {
    try {
      const response = await fetch(`${this.baseUrl}?maxRecords=1000&view=Grid%20view`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return data.records.map(record => ({
        airtableId: record.id,
        id: record.fields.id || '',
        name: record.fields.name || '',
        category: record.fields.category || '',
        brand: record.fields.brand || '',
        quantity: parseInt(record.fields.quantity) || 0,
        minStock: parseInt(record.fields.minStock) || 0,
        price: parseFloat(record.fields.price) || 0,
        location: record.fields.location || '',
        lastUpdated: record.fields.lastUpdated || '',
        description: record.fields.description || '',
        availability: this.calculateAvailability(
          parseInt(record.fields.quantity) || 0,
          parseInt(record.fields.minStock) || 0
        )
      }));
    } catch (error) {
      console.error('Error fetching Airtable data:', error);
      throw error;
    }
  }

  calculateAvailability(quantity, minStock) {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= minStock) return 'Low Stock';
    return 'In Stock';
  }

  async updateStock(productId, newQuantity) {
    try {
      // First, find the record
      const response = await fetch(`${this.baseUrl}?filterByFormula={id}='${productId}'`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.records.length === 0) return false;

      const recordId = data.records[0].id;

      // Update the record
      const updateResponse = await fetch(`${this.baseUrl}/${recordId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            quantity: newQuantity,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        })
      });

      return updateResponse.ok;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }
}

export default new AirtableService();
