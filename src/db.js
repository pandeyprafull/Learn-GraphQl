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

let posts = [{
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

let comments = [{
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
    post: '10'
}, {
    id: '105',
    text: 'Nevermind! I get it works',
    author: '3',
    post: '10'
}]

const db = {
    users,
    posts,
    comments
}

export  { db as default }