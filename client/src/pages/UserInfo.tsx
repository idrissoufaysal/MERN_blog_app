
import { Link, useLocation } from "react-router-dom";
import Axios from "../utils/fecth";
import { useEffect, useState } from "react";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  telephone: string |null;
  password: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  posts: UserPost[];
}
export interface UserPost {
  id: number;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export default function UserInfo() {
  const location=useLocation();
 // const { currentUser } = useAuth();
  const userId = location.pathname.split("/")[2];
  console.log(userId);
  const [userInfo,setUserInfo]=useState<UserInfo>()

  function removePublicPath(imgPath: string |undefined) {
    return imgPath?.replace("public\\", "");
  }
  const networkImage: string = "http://localhost:4000";

  const getText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/user/${userId}`);
        const data:UserInfo=res.data
        setUserInfo(data)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);


  return (
    <div className="profile">
        
         <div className="profileInfo">
            <img src={`${networkImage}/${removePublicPath(userInfo?.img)}`} alt="" />
            <h2>{userInfo?.email} </h2>
            <h2>{userInfo?.username} </h2>
         </div>
<h3>Tous mes posts</h3>
<div className="userPost">
  {userInfo?.posts.map((post:UserPost)=>(
    <Link to={`/post/${post.id}`} className="links">

     <div key={post.id} className="post">
            <img src={`${networkImage}/${removePublicPath(post.img)}`} alt="" />
        <h2>{post.title}</h2>
      <p>{getText(post.desc)}</p>
     </div>
    </Link>
  ))}
</div>
    </div>
  )
}
