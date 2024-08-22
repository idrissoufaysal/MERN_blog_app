import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../utils/fecth";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import useFavoriteStore from "../states/favoris";
import { useAuth } from "../context/authContext";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import truncateDescription from "../utils/function";
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
    const existing = favorie.find(
      (favorite) =>
        favorite.postId === pId && favorite.userId === currentUser?.user.id
    );
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
                 {post.user?.img? <img
                    className="img"
                    src={`${networkImage}/${removePublicPath(post.user?.img)}`}
                    alt={post.user?.username}
                  />:<AccountCircleRoundedIcon fontSize="large"/>}
                  <span>{post.user?.username}</span>
                </div>
              </Link>
              <div
                className="favorie"
                style={
                  exitF(post.id)
                    ? {
                        backgroundColor: "#a158b1",
                        border: "1px solid #a158b1",
                      }
                    : { backgroundColor: "" }
                }
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  addOrRemoveFavorite(
                    {
                      postId: post.id,
                      userId: currentUser?.user.id,
                      id: 0,
                      createdAt: "",
                      updatedAt: "",
                      post: post
                    },
                    currentUser?.token
                  );
                }}
              >
                <BookmarkBorderIcon
                  sx={
                    exitF(post.id)
                      ? { backgroundColor: "#a158b1", color: "#ffff" }
                      : { color: "rgb(24, 12, 26,0.7)" }
                  }
                />
              </div>
            </div>
            <Link to={`/post/${post.id}`} className="links">
              <div className="postContent">
                <img
                  src={`${networkImage}/${removePublicPath(post.img)}`}
                  alt={post.title}
                />
                <div className="content">
                  <h2>{post.title}</h2>
                  <p>{truncateDescription(getText(post.desc), 100)}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
