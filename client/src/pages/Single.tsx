import man1 from "../assets/images/man4.jpg";
import img1 from "../assets/images/architecture-3121009_640.jpg";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Post } from "./Home";

interface props{
  props:Post
}

function Single({props}:props) {
  
const handleDelete=()=>{
}

  return (
    <div className="single">
      <div className="img">
        <img src={props.img} alt="" />
        <div className="user">
          <div className="userInfo">
            <img className="userImage" src={props.user.img} alt="" />
            <span>{props.user.username} </span>
          </div>
          <div className="button">
            <Link to="/add?edit">
              
              <div className="edit">
                <EditIcon color="primary" />
              </div>
            </Link>
              <div className="delete" onClick={handleDelete}>
                <DeleteIcon color="error" />
              </div>
            
          </div>
        </div>
      </div>
      <div className="content">
        <h2>{props.title}</h2>
        <p>
          {props.desc}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut neque
          facere nostrum asperiores, esse, praesentium ducimus perferen
          Tempora aut porro ab, laudantium dolore labore minima quis tenetur
          consectetur debitis quasi, delectus asperiores. Eaque ipsa eius
          voluptatum dolor necessitatibus. Culpa sit voluptatem, ipsa autem
          deleniti ratione m
          
        </p>
      </div>
    </div>
  );
}

export default Single;
