
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Post } from "./Home";
import { useEffect, useState } from "react";
import Axios from "../utils/fecth";
import { useAuth } from "../context/authContext";
import SnackbarAlert from "../utils/Snackbar";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Single() {
  const [post, setPost] = useState<Post>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location=useLocation();
  const { currentUser } = useAuth();
  const postId = location.pathname.split("/")[2];
  console.log(location);
  console.log(postId);
 

  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public\\", "");
  }

  const handleClose = () => {
    setOpen(true);
  };

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
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
    try {
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
    } catch (error) {
      console.log(error);
      
    }

  };

  return (
    <div className="single">
      {open && <SnackbarAlert message={message} severity="success" onClose={handleClose}/>}
      <div className="img">
        <img src={`${networkImage}/${removePublicPath(post?.img)}`} alt="" />
        <div className="user">
          <div className="userInfo">
          {post?.user.img ? <img
                    className="img"
                    src={`${networkImage}/${removePublicPath(post.user?.img)}`}
                    alt={post.user?.username}
                  />:<AccountCircleRoundedIcon fontSize="large"/>}
            <span>{post?.user.username} </span>
          </div>
         {currentUser?.user.email==post?.user.email && <div className="button">
            <Link to={`/edit/${postId}`}>
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
          {getText(post?.desc)}
         
        </p>
      </div>
    </div>
  );
}

export default Single;
