import { Widgets, Categories } from './db-connectors';

export default {
    findAllCategories: () => findAllCategories(),
    getAllProductID: () => getAllProductID(),
    getAllProduct: () => getAllProduct(),
    getProduct: (prop) => getProduct(prop),
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

const getProduct = async ({ id }) => await Widgets.findById(id).then(product => product);