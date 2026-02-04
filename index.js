import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
    res.send(
        '<a href="/graphql">GraphQL</a> is amazing!<br/><br/>'+
        'Test Hello World query by clickng <a href="/graphql?query=query%7Bhello%7D">here!</a>'
    );
});

const root = { 
    hello: () => "Hi, I'm Péter's first GraphQL server response!",
    product: () => ({
        "id": Math.random().toString(36).split('.')[1].toUpperCase(),
        "name": "Garden Widget",
        "description": "Beautiful widget to use in the garden",
        "price": (Math.random() * 1000).toFixed(2),
        "soldout": Math.random() < 0.5,
        "date": new Date().toISOString(),
    })
};

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`Running server on localhost:${PORT}/graphql`));
