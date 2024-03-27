
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import Axios from "../utils/fecth";
import { useEffect, useState } from "react";

interface UserInfo {
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
interface UserPost {
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
        
         <div className="profileImage">
            <img src={`${networkImage}/${removePublicPath(userInfo?.img)}`} alt="" />
            <EditIcon className="editIcon" color="inherit" />
            <h2>{userInfo?.email} </h2>
         </div>

<div className="userPost">
  {userInfo?.posts.map((post:UserPost)=>(
     <div key={post.id}>
        <h2>{post.title}</h2>
      <h2>{post.desc}</h2>
     </div>
  ))}
</div>
    </div>
  )
}
