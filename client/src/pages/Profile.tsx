import EditIcon from "@mui/icons-material/Edit";
import { Link, useLocation } from "react-router-dom";
import Axios from "../utils/fecth";
import { useEffect, useState } from "react";
import { useAuth } from "../context/userHook";
import useFavoriteStore, { FavorieArray } from "../states/favoris";
import PersonIcon from "@mui/icons-material/Person";
import PostCard from "../components/userPost";

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
  const [img, setImg] = useState<File | string>();
  const { addOrRemoveFavorite, favorie, fetchFavorites } = useFavoriteStore();

  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public\\", "");
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

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImg(event.target.files[0]);
      console.log(img);
    }
    //  const file = event.target.files[0].toString();
  };

  return (
    <div className="profile">
      <div className="profileImage">
        <div className="img">
          {!currentUser?.user.img ? (
            <PersonIcon sx={{ color: "#fff" }} />
          ) : (
            <img
              src={`${networkImage}/${removePublicPath(userInfo?.img)}`}
              alt=""
            />
          )}
          {/* <input
            type="file"
            onChange={handleFile}
            onClick={async (e: React.MouseEventHandler<HTMLInputElement>) => {
              e.preventDefault();
              try {
                const res = await Axios.post(`/upload/${userId}`, img, {
                  headers: { Authorization: "Bearer " + currentUser?.token },
                });
                console.log(res.data);
              } catch (error) {
                console.log(error);
              }
            }}
          /> */}

          <EditIcon className="editIcon" sx={{ color: "#fff" }} />
        </div>
        <h2>{userInfo?.email} </h2>
        <h2>{userInfo?.username} </h2>
        <h2>{userInfo?.telephone && userInfo?.telephone} </h2>
      </div>

      <div className="userPost">
        {userInfo?.posts.map((post: UserPost) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <h2>{post.desc}</h2>
          </div>
        ))}
      </div>
      <div className="fav">
        {favorie.map(() => (
            
          <h1>{}</h1>

        ))}
      </div>
    </div>
  );
}
