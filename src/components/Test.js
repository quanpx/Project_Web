import React, { useState } from "react";
import { getStorage,ref } from "firebase/storage";



const Test = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload =()=>{
    console.log(image);
    console.log(image);
  }

  console.log("image: ", image);

  return (
    <div>
      Hello
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
    </div>
  );
};

export default React.memo(Test);