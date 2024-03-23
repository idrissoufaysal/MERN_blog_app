import img1 from "../assets/images/architecture-3121009_640.jpg";
import img2 from "../assets/images/living-room-2569325_640.jpg";
import userImage from "../assets/images/images (1).jpg";
import man1 from "../assets/images/man4.jpg";
import man2 from "../assets/images/man2.jpg";
import man3 from "../assets/images/man3.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Axios from "../utils/fecth";


export interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id:number,
    username:string,
    email:string,
    telephone:string,
    img:string |undefined
  };
}


export default function Home() {
  // const userPosts = [
  //   {
  //     id:1,
  //     img: img1,
  //     title: "Titre du post 1",
  //     desc: "Description du post 1",
  //     user: {
  //       username: "ali",
  //       img: man1,
  //     },
  //     date: new Date(),
  //   },
  //   {
  //     id:2,
  //     img: img1,
  //     title: "Titre du post 1",
  //     desc: "Description du post 1",
  //     user: {
  //       username: "ali",
  //       img: man2,
  //     },
  //     date: new Date(),
  //   },
  //   {
  //     id:3,
  //     img: img1,
  //     title: "Titre du post 1",
  //     desc: "Description du post 1",
  //     user: {
  //       username: "ali",
  //       img: man3,
  //     },
  //     date: new Date(),
  //   },
  //   {
  //     id:4,
  //     img: img1,
  //     title: "Titre du post 1",
  //     desc: "Description du post 1",
  //     user: {
  //       username: "ali",
  //       img: man1,
  //     },
  //     date: new Date(),
  //   },
  //   {
  //     id:5,
  //     img: img1,
  //     title: "Titre du post 1",
  //     desc: "Description du post 1",
  //     user: {
  //       username: "ali",
  //       img: userImage,
  //     },
  //     date: new Date(),
  //   },
  //   {
  //     id:6,
  //     img: img2,
  //     title: "Titre du post 2",
  //     desc: "Description du post 2",
  //     user: {
  //       username: "maman",
  //       img: userImage,
  //     },
  //     date: new Date(),
  //   },
  //   {
  //     id:6,
  //     img: img2,
  //     title: "Titre du post 2",
  //     desc: "Description du post 2",
  //     user: {
  //       username: "maman",
  //       img: userImage,
  //     },
  //     date: new Date(),
  //   },
  //   // Ajoutez d'autres posts au besoin
  // ];

  const [post,setPost]=useState([])

  //fonction
  function removePublicPath(imgPath: string |undefined) {
    return imgPath?.replace("public\\", "");
  }

  const fetchData =async()=>{
    try {
      const res=await Axios.get(`/post`,{headers:{

      }})
      setPost(res.data)
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
   //fetchData()
  })
const networkImage:string='http://localhost:4000'
  return (
    <div className="posts">
     {post.map((post: Post,index) => (
        <div key={index}>
          <div className="post">
            <Link to='/user/:id' className="links">

            <div className="userInfo">
              <img className="img" src={`${networkImage}/${removePublicPath(post.user?.img)}`} alt={post.user?.username} />
              <span>{post.user?.username}</span>
            </div>
            </Link>
            <Link to={`/post/${post.id}`} className="links">

            <div className="postContent">
              <img src={`${networkImage}/${removePublicPath(post.img)}`} alt="" />
              <div className="content">
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      ))}

      
    </div>
  );
}
