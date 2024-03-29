import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../utils/fecth";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import useFavoriteStore from "../states/favoris";
import { useAuth } from "../context/userHook";
// import { AxiosError } from "axios";

export interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    username: string;
    email: string;
    telephone: string;
    img: string | undefined;
  };
}

export default function Home() {
  const [post, setPost] = useState([]);
  const { currentUser } = useAuth();
  const { addOrRemoveFavorite, favorie } = useFavoriteStore();

  //fonction
  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public\\", "");
  }

  const getText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const exitF = (pId: number) => {
    const existing = favorie.find(favorite => favorite.postId === pId && favorite.userId === currentUser?.user.id);
    console.log(existing);
    
    return existing;
  };

  const fetchData = async () => {
    try {
      const res = await Axios.get(`/post`, { headers: {} });
      setPost(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const networkImage: string = "http://localhost:4000";
  return (
    <div className="posts">
      {post.map((post: Post, index) => (
        <div key={index}>
          <div className="post">
            <div className="postHeader">
              <Link to={`/user/${post.user.id}`} className="links">
                <div className="userInfo">
                  <img
                    className="img"
                    src={`${networkImage}/${removePublicPath(post.user?.img)}`}
                    alt={post.user?.username}
                  />
                  <span>{post.user?.username}</span>
                </div>
              </Link>
              <button
                className="favorie"
                style={{ borderStyle: "none" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  addOrRemoveFavorite(
                    { postId: post.id, userId: currentUser?.user.id },
                    currentUser?.token
                  );
                               
                }}
              >

                <BookmarkBorderIcon
                  sx={
                    exitF(post.id)
                      ? { backgroundColor: "yellow" }
                      : { backgroundColor: "" }
                      
                  }
                  color="info"
                />
                

              </button>
            </div>
            <Link to={`/post/${post.id}`} className="links">
              <div className="postContent">
                <img
                  src={`${networkImage}/${removePublicPath(post.img)}`}
                  alt=""
                />
                <div className="content">
                  <h2>{post.title}</h2>
                  <p>{getText(post.desc)}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
