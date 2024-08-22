import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Axios from "../utils/fecth";
import { useAuth } from "../context/authContext";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarAlert from "../utils/Snackbar";



export default function Update() {
  // const [value, setValue] = useState({
  //   title: "",
  //   desc: "",
  // });

  const navigate = useNavigate();
  const location=useLocation();
  const { currentUser } = useAuth();
  const postId = location.pathname.split("/")[2];
  //const [post, setPost] = useState<Post>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);

  const [img, setImg] = useState<File | string>("");

  // const handleChange = async (event: {
  //   target: { value: string; name: string };
  // }) => {
  //   setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  // };

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setImg(event.target.files[0]);
      console.log(img);
    }
    //  const file = event.target.files[0].toString();
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("desc", desc);
  formData.append("image", img);

  const handleSubmite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await Axios.put(`/post/${postId}`, formData, {
        headers: {
          Authorization: "Bearer " + currentUser?.token,
        },
      });
      console.log(res);
      setOpen(true)
      console.log(res.data);
      
      setTimeout(() => {
      
        navigate("/post/"+postId);
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/post/${postId}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setImg(res.data.img);
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);


  return (
    <div className="add">
      {open && <SnackbarAlert message="Post mise a jour avec succes" severity="success" onClose={()=>{setOpen(false)}}/>}
      <div className="content">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
           value={desc}
            onChange={(value: string) => {
              setDesc(value);
            }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="file">
          <label htmlFor="file">Telecharger une image</label>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            sx={{
                border: "2px solid #a158b1",
                color: "#a158b1",
            }}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            //
          >
            <input type="file" name="file" className="uploadFile"  id="file" onChange={handleFile} />
            
          </Button>
        </div>
        <div className="cat">
          <h1>Categorie</h1>
          <label htmlFor="flutter">
            <input type="radio" name="cat" value="flutter" id="flutter" />
            Flutter
          </label>
          <label htmlFor="flutter">
            <input type="radio" name="cat" value="node" id="node" />
            Node
          </label>
          <label htmlFor="flutter">
            <input type="radio" name="cat" value="react" id="react" />
            React
          </label>
          <label htmlFor="flutter">
            <input type="radio" name="cat" value="autre" id="autre" />
            Autre
          </label>
        </div>
        <Button
          variant="contained"
          sx={{
            border: "2px solid #a158b1",
            color: "#ffff",
            backgroundColor: "#a158b1",
          }}
          onClick={handleSubmite}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
}
