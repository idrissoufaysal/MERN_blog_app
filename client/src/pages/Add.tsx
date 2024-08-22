import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Axios from "../utils/fecth";
import { useAuth } from "../context/authContext";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../utils/Snackbar";

export default function Add() {
  // const [value, setValue] = useState({
  //   title: "",
  //   desc: "",
  // });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);

  const [img, setImg] = useState<File | string>("");

  const handleCategoryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

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
  formData.append("category", category);
  formData.append("image", img);

  const handleSubmite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await Axios.post("/post", formData, {
        headers: {
          Authorization: "Bearer " + currentUser?.token,
        },
      });
      console.log(res);
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      {open && (
        <SnackbarAlert
          message="Post ajouter avec succes"
          severity="success"
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
      <div className="content">
        <input
          type="text"
          placeholder="title"
          onChange={(e: { target: { value: string } }) => {
            setTitle(e.target.value);
          }}
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
            <input
              type="file"
              name="file"
              id="file"
              className="uploadFile"
              onChange={handleFile}
            />
          </Button>
        </div>
        <div className="cat">
          <h1>Categorie</h1>
          <label htmlFor="dart">
            <input type="radio" name="cat" value="Dart" id="dart" onChange={handleCategoryChange} />
            Dart
          </label>
          <label htmlFor="javascript">
            <input type="radio" name="cat" value="Javascript" id="node" onChange={handleCategoryChange} />
            Javascript
          </label>
          <label htmlFor="python">
            <input type="radio" name="cat" value="Python" id="react" onChange={handleCategoryChange}/>
            Python
          </label>
          <label htmlFor="autre">
            <input type="radio" name="cat" value="Autre" id="autre" onChange={handleCategoryChange} />
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
          Ajouter
        </Button>
      </div>
    </div>
  );
}
