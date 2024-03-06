const sequelize=require('sequelize')

const User=require('./user.js')
const Post=require('./post.js')

/* USER & POST */
try {
    User.hasMany(Post)
    Post.belongsTo(User)
} catch (error) {
    console.log(e);
}