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
    getAllProductID: () => getAllProductID(),
    getAllProduct: () => getAllProduct(),
    getProduct: (i) => getProduct(i),
    createProduct: (i) => createProduct(i),
}

const getProduct = ({ id }) =>
    id && productDatabase[id]
        ? new Product(id, productDatabase[id])
        : null;

const getAllProduct = () => Object.values(productDatabase).map(
    (product, index) => new Product(Object.keys(productDatabase)[index], product)
);

const getAllProductID = () => Object.keys(productDatabase);

const createProduct = ({ input }) => {
    let id = Math.random().toString().split('.')[1].substring(12);
    console.log('productDatabase:', productDatabase);
    productDatabase[id] = input;
    return new Product(id, input);
}

// console.log('Initial productDatabase:', productDatabase);//*
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

// /**/// */
console.log('productDatabase after createProduct:', productDatabase);
export default resolvers;
