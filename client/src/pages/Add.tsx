import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function Add() {
  const [value, setValue] = useState('');

  return (
    <div className="add">
      <div className="content">
        <input type="text"  placeholder="title"/>
        <div className="editorContainer">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="file">
            <input type="file" name="file" id="file" />
          <label htmlFor="file">
            Telecharger une image
          </label>
        </div>
        <div className="cat">
d
        </div>
      </div>
    </div>
  )
}
