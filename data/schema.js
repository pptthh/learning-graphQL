import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Store {
        store: String
    }

    type Product {
        id: ID
        name: String
        date: String
        description: String
        price: Float
        soldout: Boolean
        store: [Store]!
    }

    type Query {
        hello: String
        product: Product
    }
`);

export default schema;
