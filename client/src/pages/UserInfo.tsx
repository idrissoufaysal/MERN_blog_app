import { Link, useLocation } from "react-router-dom";
import Axios from "../utils/fecth";
import { useEffect, useState } from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import truncateDescription from "../utils/function";

export interface UserInfo {
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
  const location = useLocation();
  // const { currentUser } = useAuth();
  const userId = location.pathname.split("/")[2];
  console.log(userId);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  function removePublicPath(imgPath: string | undefined) {
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
        const data: UserInfo = res.data;
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="profile">
      <div className="profileInfo">
        {userInfo?.img ?<img
          src={`${networkImage}/${removePublicPath(userInfo?.img)}`}
          alt=""
        />:<AccountCircleRoundedIcon sx={{fontSize:'60px'}}/>}
        <h2>{userInfo?.email} </h2>
        <h3>{userInfo?.username} </h3>
      </div>
      <h3>posts ({userInfo?.posts.length})</h3>
      <div className="userPost">
        {userInfo?.posts.map((post: UserPost) => (
          <Link to={`/post/${post.id}`} className="links">
            <div key={post.id} className="post">
              <img
                src={`${networkImage}/${removePublicPath(post.img)}`}
                alt=""
              />
              <h2>{post.title}</h2>
              <p>{truncateDescription(getText(post.desc), 100)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
