import { Widgets } from './dbConnectors';

export default {
    getProduct: async ({ id }) => {
        try {
            const product = await Widgets.findById(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    },
    createProduct: ({ input }) => {
        // let id = require('crypto').randomBytes(10).toString('hex');
        // productDatabase[id] = input;
        // return new Product(id, input);
    }
}

/***
 * no DB
 *//*
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

const SOLDOUT = "SOLDOUT";
const ONSALE = "ONSALE";

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
    const id = input.id || Math.random().toString().split('.')[1].substring(12);
    productDatabase[id] = input;
    return new Product(id, input);
}

resolvers.createProduct({
    input: {
        name: `Test Product ${Object.keys(productDatabase).length + 1}`,
        description: `This is a test product (${Object.keys(productDatabase).length + 1})`,
        price: (Math.random() * 100).toFixed(2),
        soldout: SOLDOUT,
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
        soldout: ONSALE,
        stores: [
            { store: "Store A" },
            { store: "Store B" }
        ]
    }
});

export default resolvers;
/***/