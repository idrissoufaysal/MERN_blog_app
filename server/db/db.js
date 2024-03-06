const {Sequelize}=require('sequelize')

const sequelize=  new Sequelize('blogApp','root','',{dialect : 'mysql', host:'localhost'})

module.exports=sequelize 