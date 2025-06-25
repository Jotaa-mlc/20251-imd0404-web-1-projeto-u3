class Product {
    constructor(id, name, description, price, category, creatorId, image, quantity, condition ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.creatorId = creatorId;
        this.image = image;
        this.quantity = quantity;
        this.condition = condition;
    }

    static categorizeProducts(products) {
      const categorized = {};
      products.forEach(product => {
        const category = product.category || 'outros';
        if (!categorized[category]) {
          categorized[category] = [];
        }
        categorized[category].push(product);
      });
      return categorized;
    }

    static fromRTDB(key, data) {
        return new Product(
            key,
            data.name,
            data.description,
            data.price,
            data.category,
            data.creatorId,
            data.image,
            data.quantity,
            data.condition
        );
    }
}

export default Product;