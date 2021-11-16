const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require('./comments');

module.exports = {
    //自定义属性
    Post: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length,
    },

    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    }
};