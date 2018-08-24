const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const resolvers = require('./graphql/resolvers');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const readGraphqlFiles = names => names.map(name => fs.readFileSync(`${__dirname}/graphql/${name}.gql`, { encoding: 'utf-8' }));

loadServer();

async function loadServer() {
    const client = await MongoClient.connect('mongodb://localhost:27017/to-do');

    const typeDefs = readGraphqlFiles(['queries', 'mutations', 'types', 'inputs']).join('\n\n');
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ db: client.db('to-do') })
    });

    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 3000, () => console.info(`Server started on port 3000`));
}
