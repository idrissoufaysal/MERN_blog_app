// import man1 from "../assets/images/man4.jpg";
// import img1 from "../assets/images/architecture-3121009_640.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Post } from "./Home";
import { useEffect, useState } from "react";
import Axios from "../utils/fecth";
import { useAuth } from "../context/userHook";
import SnackbarAlert from "../utils/Snackbar";

function Single() {
  const [post, setPost] = useState<Post>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const postId = location.pathname.split("/")[2];
  console.log(location);
  console.log(postId);
 

  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public\\", "");
  }
  const networkImage: string = "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/post/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const res = await Axios.delete(`/post/${postId}`, {
      headers: {
        Authorization: "Bearer " + currentUser?.token,
      },
    });
    console.log(res.data);
    setMessage(res.data)
    setOpen(true)
    
    setTimeout(() => {
      navigate("/");
    }, 2000);

  };

  return (
    <div className="single">
      {open && <SnackbarAlert message={message} severity="success"/>}
      <div className="img">
        <img src={`${networkImage}/${removePublicPath(post?.img)}`} alt="" />
        <div className="user">
          <div className="userInfo">
            <img
              className="userImage"
              src={`${networkImage}/${removePublicPath(post?.user.img)}`}
              alt=""
            />
            <span>{post?.user.username} </span>
          </div>
         {currentUser?.user.email==post?.user.email && <div className="button">
            <Link to="/add?edit">
              <div className="edit">
                <EditIcon color="primary" />
              </div>
            </Link>
            <div className="delete" onClick={handleDelete}>
              <DeleteIcon color="error" />
            </div>
          </div>}
        </div>
      </div>
      <div className="content">
        <h2>{post?.title}</h2>
        <p>
          {post?.desc}
          post ipsum dolor sit amet consectetur, adipisicing elit. Aut neque
          facere nostrum asperiores, esse, praesentium ducimus perferen Tempora
          aut porro ab, laudantium dolore labore minima quis tenetur consectetur
          debitis quasi, delectus asperiores. Eaque ipsa eius voluptatum dolor
          necessitatibus. Culpa sit voluptatem, ipsa autem deleniti ratione m
        </p>
      </div>
    </div>
  );
}

export default Single;
