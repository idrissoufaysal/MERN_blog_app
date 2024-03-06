const User=require('../models/user.js')
const express=require('express')
const router=express.Router()
const authenticateUser=require('../utils/jwtAuth.js');
const upload = require('../utils/uploadFile.js');
 const bcrypt=require('bcrypt')

//Afficher tous les utilisateurs
router.get('/',async(req,res)=>{
    const allUSer=await User.findAll();
    return res.status(200).json(allUSer);
});

//Afficher un utilisateur Specifique
router.get('/:userId',async(req,res)=>{
    const userId=req.params.userId
 try {
    const user=await User.findByPk(userId)
    res.status(201).json(user)
 } catch (e) {
    console.log(e);
 }
})

//Ajouter des utilisateur

//Modifier les users
router.put('/:id',authenticateUser,upload.single('image'),async(req,res)=>{
   const userId=req.params.id
   const { email, username, password,telephone } = req.body;
   const hashPass = bcrypt.hashSync(password, 10);
   try {
      const existingUser=await User.findByPk(userId)
      if (! existingUser) {
         return res.status(404).json("Utilisateur introuvable")
      } 
     const updateUser=await existingUser.update({
      username:username,
      email:email,
      telephone:telephone,
      password:hashPass,
      img:req.file.path
      
     })
     res.status(200).json('utilisateur a ete mise jour avec succes')
     console.log(updateUser);
   } catch (e) {
      console.log(e); 
   }
}) 

  

//Supprimer un utilisateur 
router.delete('/:id',async(req,res)=>{
   try {
     const userId=req.params.id
     const deleteUser=await User.destroy({where:{id:userId}})
     res.status(200).json('utilisateur a ete supprimer avec succes')
     console.log(deleteUser);
   } catch (e) {
      console.log(e); 
   }
}) 

module.exports=router


