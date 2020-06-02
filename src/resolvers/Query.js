const Query = {
    comments(parent, args, { db }, info) {
        return db.comments;
    },
    users(parent, args, { db }, info) {
        if (!args.query) {
            console.log("Inside !args.query")
            return db.users;
        }
        return db.users.filter(user => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })

    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter(post => {
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
}

export { Query as default }