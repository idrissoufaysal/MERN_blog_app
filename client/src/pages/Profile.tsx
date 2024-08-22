import EditIcon from "@mui/icons-material/Edit";
import { Link, useLocation } from "react-router-dom";
import Axios from "../utils/fecth";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import useFavoriteStore, {  } from "../states/favoris";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import truncateDescription from "../utils/function";
import Button from '@mui/material/Button'
import { Post } from "./Home";

interface UserInfo {
  id: number;
  username: string;
  email: string;
  telephone: string | null;
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

export default function Profile() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const userId = location.pathname.split("/")[2];
  console.log(userId);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const { favorie, fetchFavorites,addOrRemoveFavorite } = useFavoriteStore();

  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public", "");
  }
  const networkImage: string = "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/user/${currentUser?.user.id}`);
        const data: UserInfo = res.data;
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites(currentUser?.token);
    fetchData(); 
  }, [currentUser?.token, currentUser?.user.id, fetchFavorites]);

  const deleFav=(event: React.MouseEvent<HTMLButtonElement>,pId:number,p:Post)=>{
event.preventDefault()
   addOrRemoveFavorite({
     userId: currentUser?.user.id,
     postId: pId,
     post: p,
     id: 0,
     createdAt: "",
     updatedAt: ""
   },currentUser?.token)

  }

  const getText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="profile">
      <div className="profileImage">
        <div className="img">
          {!currentUser?.user.img ? (
            <AccountCircleRoundedIcon sx={{ fontSize:'150px' }} />
          ) : ( currentUser &&
            <img
              src={`${networkImage}/${removePublicPath(userInfo?.img)}`}
              alt=""
            />
          )}
         
          <EditIcon className="editIcon" sx={{ color: "#fff" }} />
        </div>
        <h2>{userInfo?.email} </h2>
        <h3>{userInfo?.username} </h3>
        <h2>{userInfo?.telephone && userInfo?.telephone} </h2>
      </div>

     <h3>Mes Favories ({favorie.length})</h3>
      <div className="userPost">
  {favorie.map((f)=>(
    <div>


     <div key={f.id} className="post">
    <Link to={`/post/${f.postId}`} className="links">
      <div>

            {f.post && <img src={`${networkImage}/${removePublicPath(f.post.img)}`} style={{objectFit:'cover'}} alt="" />}
        <h2>{f.post?.title}</h2>
      <p>{truncateDescription(getText(f.post?.desc), 100)}</p>
      </div>
    </Link>
    
    <Button variant="outlined" onClick={(event)=> deleFav(event,f.postId,f.post)} color="error">
      Retirer
    </Button>
     </div>
    </div>
  ))}
</div>
    </div>
  );
}
