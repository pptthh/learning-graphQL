import { Widgets, Categories } from './db-connectors';

export default {
    findAllCategories: () => findAllCategories(),
    getAllProductID: () => getAllProductID(),
    getAllProduct: () => getAllProduct(),
    getProduct: async ({ id }) => {
        try {
            const product = await Widgets.findById(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    },
    createProduct: async ({ input }) => {
       const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
       });

       newWidget.id = newWidget._id;

       try {
            await newWidget.save();
            return newWidget;
       } catch (error) {
            throw new Error(error);
       }
    },
    updateProduct: async ({ input }) => {
        try {
            const updateWidget = await Widgets.findOneAndUpdate(
                    {_id: input.id},
                    input,
                    { new: true}
                );
            return updateWidget;
        } catch (error) {
            throw new Error(error);
       }
    },
    deleteProduct: async ({ id }) => {
        try {
            await Widgets.deleteOne({ _id: id });
            return 'Successfully deleted widget with id: ' + id;
        } catch (error) {
            throw new Error(error);
       }
    }
};

const getAllProduct = async () => await Widgets.find();

const getAllProductID = async () => await Widgets.find().then(products => products.map(product => product._id));

const findAllCategories = async () => await Categories.findAll();

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