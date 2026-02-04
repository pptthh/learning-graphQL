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

const root = { hello: () => "Hi, I'm Péter's first GraphQL server response!"};

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`Running server on localhost:${PORT}/graphql`));
