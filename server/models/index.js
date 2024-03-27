const sequelize=require('sequelize')

const User=require('./user.js')
const Post=require('./post.js')
const Favorie=require('./Favorie.js')

/* USER & POST */
try {
    User.hasMany(Post)
    Post.belongsTo(User)
} catch (error) {
    console.log(e);
}

/* User & Favorie */
try {
    User.hasMany(Favorie)
    Favorie.belongsTo(User)
    console.log('liason de user et Favorie avec succes');

} catch (error) {
    console.log(error);
}

/* Post & Favorie */
try {
    Post.hasMany(Favorie)
    Favorie.belongsTo(Post)
    console.log('liason de post et Favorie avec succes');
} catch (error) {
    console.log(error);
}