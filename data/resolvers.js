import { create } from 'domain';

class Product {
    constructor(id, { name, description, price, soldout, stores}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.soldout = soldout;
        this.stores = stores;
    }
}

const productDatabase = {};

const resolvers = {

    getAllProductID: () => {
        console.log('Fetching all product IDs');
        console.log(productDatabase);
        console.log(Object.keys(productDatabase));

        return Object.keys(productDatabase);
    },
    // getAllProduct: () => {
    //     return Object.values(productDatabase).map((product, index) => {
    //         return new Product(Object.keys(productDatabase)[index], product);
    //     });
    // },
    getProduct: ({ id }) => {
        return new Product(id, productDatabase[id]);
    },
    createProduct: ({ input }) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        console.log('productDatabase:', productDatabase);
        productDatabase[id] = input;
        return new Product(id, input);
    }
}

console.log('Initial productDatabase:', productDatabase);
resolvers.createProduct({
    input: {
        name: `Test Product ${Object.keys(productDatabase).length + 1}`,
        description: `This is a test product (${Object.keys(productDatabase).length + 1})`,
        price: (Math.random() * 100).toFixed(2),
        soldout: false,
        stores: [
            { store: "Store A" },
            { store: "Store B" }
        ]
    }
});

console.log('productDatabase after createProduct:', productDatabase);
export default resolvers;
