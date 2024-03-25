import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Axios from "../utils/fecth";
import { useAuth } from "../context/userHook";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../utils/Snackbar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Add() {
  // const [value, setValue] = useState({
  //   title: "",
  //   desc: "",
  // });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
      const res = await Axios.post("/post", formData, {
        headers: {
          Authorization: "Bearer " + currentUser?.token,
        },
      });
      console.log(res);
      setOpen(true)
      setTimeout(() => {
      
        navigate("/");
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      {open && <SnackbarAlert message="Post ajouter avec succes" severity="success"/>}
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
          <input type="file" name="file" id="file" onChange={handleFile} />
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
            Uploader file
            <VisuallyHiddenInput type="file" onChange={handleFile} />
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
          Ajouter
        </Button>
      </div>
    </div>
  );
}
