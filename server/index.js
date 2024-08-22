const express=require('express');
const db= require('./db/db.js')
const User=require('./models/user.js')
const Post=require('./models/post.js')
const Favorie=require('./models/Favorie.js')

require('dotenv').config()
const cors=require('cors')
const dotenv=require('dotenv')

//? Appel des controlleurs
const authRouter=require('./routes/authRouter.js')
const postRoutes=require('./routes/postRouter.js')
const userRoutes=require('./routes/userRouter.js')
const favorieRouter=require('./routes/favorieRouter.js')

//! laison des tables
require('./models/index.js')
const app=express() 

//Les Midllwares de configuration
dotenv.config()

  
const port =process.env.PORT ||  4000
     
//*Les middllware  
app.use(cors());      
app.use(express.json()) 
app.use(express.static("public"))
//const io = socketIo(server); 
app.use('/auth',authRouter)
app.use('/post',postRoutes)
app.use('/user',userRoutes)
app.use('/favorie',favorieRouter)
 

  
//! Liaisons a la base de donnee mysql avec l'Orm Sequelize
db.sync(/*{force:true}*/)
.then(console.log('Connexion reussi a la base de donner '))
.catch(err =>console.log(err))
 app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
})

 