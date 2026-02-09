import { buildSchema } from "graphql";

export default buildSchema(`
    type Product {
        id: ID
        name: String
        description: String
        price: Float
        soldout: Soldout
        inventory: Int
        stores: [Store]!
    }

    enum Soldout {
        SOLDOUT
        ONSALE
    }

    type Store {
        store: String
    }

    type Query {
        getAllProductID: [ID!]!
        getAllProduct: [Product!]!
        getAllProducts: [Product]!
        getProduct(id: ID): Product
        findAllCategories: [Category!]!
    }
    
    type Category {
        category: String
        description: String
    }

    input StoreInput {
        store: String
    }

    input ProductInput {
        id: ID
        name: String
        description: String
        price: Float
        soldout: Soldout
        inventory: Int
        stores: [StoreInput]!
    }

    type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(input: ProductInput): Product
        deleteProduct(id: ID!): String
    }
`);
