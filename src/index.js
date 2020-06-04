
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Comment from './resolvers/Comment';
import Post from './resolvers/Post'
import Subscription  from './resolvers//Subscription';
//Scalar Types - String, Boolean, Int, Float, ID

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
    },
    //context data can use inside the whole project as root proprty
    context: {
            db,
            pubsub
    }
})

server.start(() => {
    console.log('The server is Up!');

})