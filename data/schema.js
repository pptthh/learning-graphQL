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
        getProduct(id: ID): Product
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
    }
`);
