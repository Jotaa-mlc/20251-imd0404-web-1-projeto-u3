class Purchase {
    constructor(id, buyerId, products, payment) {
        this.id = id;
        this.buyerId = buyerId;
        this.products = products;
        this.payment = payment;
        this.date = new Date().toISOString();
        this.total = this.calculateTotal();
    }

    calculateTotal() {
        return this.products.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (price * quantity);
        }, 0);
    }
}

export default Purchase;