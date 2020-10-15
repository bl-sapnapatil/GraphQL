const express = require('express');
//express-graphql module allows express to understand GraphQL
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')
//creating instance of express
const app = express();
const mongoose = require('mongoose');


//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
}));

mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
}); 