
import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';
//Scalar Types - String, Boolean, Int, Float, ID
let users = [{
    id: "1",
    name: "Prafull",
    email: "prafullpandey68@gmail.com",
    age: 21
}, {
    id: "2",
    name: "stephen",
    email: "stephen@gmail.com"
},
{
    id: "3",
    name: "lol",
    email: "lol@gmail.com"
}
]

const posts = [{
    id: "10",
    title: 'GraphQl 101',
    body: 'This is how to use GraphQl....',
    published: true,
    author: '1'
}, {
    id: "11",
    title: 'GraphQl 201',
    body: 'This is an advanced  GraphQl post ....',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
    id: "102",
    text: "This is graphQl tutorial",
    author: '1',
    post: '10'
}, {
    id: '103',
    text: 'Glad you enjoyed it',
    author: '2',
    post: '10'
}, {
    id: '104',
    text: 'This did no Work',
    author: '2',
    post: '12'
}, {
    id: '105',
    text: 'Nevermind! I get it works',
    author: '3',
    post: '12'
}]

//Type definition
const typeDefs = `

type Query {
   users(query: String): [User!]!
   posts(query: String): [Post!]!
   comments: [Comment!]!
    me: User!
    post: Post!
}

type Mutation{
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!) : Post!
}

type User{
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
}

type Comment{
    id: String!
    text: String!
    author: User!
    post: Post!
}
`
//Resolvers
const resolvers = {
    Query: {
        comments(parent, args, ctx, info) {
            return comments;
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })

        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter(post => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());

                return isTitleMatch || isBodyMatch;
            })

        },
        me() {
            return {
                id: 'abc123',
                name: 'Prafull Pandey',
                email: 'Prafullpandey68@gmail.com',
                age: 21
            }
        },
        post() {
            return {
                id: 'abcd1234',
                title: 'About Node js',
                body: 'Node js is a js runtime built on chrome v8 engine ....',
                published: true
            }
        }
    },

    Mutation: {
        createUser(parent, args, ctx, info) {
            console.log(args);
            const emailTaken = users.some(user => user.email === args.email);

            if (emailTaken) {
                throw new Error('Email Taken');
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user);

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author)

            if (!userExists) {
                throw new Error('User not found ...')
            }

            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post);
            return post;
        }
    },
        Post: {
            author(parent, args, ctx, info) {
                return users.find(user => {
                    return user.id === parent.author
                })
            },
            comments(parent, args, ctx, info) {
                return comments.filter(comment => comment.post === parent.id)
            }
        },
        User: {
            posts(parent, args, ctx, info) {
                return posts.filter(post => post.author === parent.id)
            },
            comments(parent, args, ctx, info) {
                return comments.filter(comment => comment.author = parent.id)
            }
        },
        Comment: {
            author(parent, args, ctx, info) {
                return users.find(user => user.id === parent.author)
            },
            post(parent, args, ctx, info) {
                return posts.find(post => post.id === parent.post)
            }
        }
    }
const server = new GraphQLServer({
        typeDefs,
        resolvers
    })

server.start(() => {
        console.log('The server is Up!');

    })