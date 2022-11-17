import useStorage from "../../hooks/useStorage";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setImgUrl, setIsUploading, setUploadError }) => {
  const { progress, url, error } = useStorage(file);
  //kada se uploaduje slika i dobije url od useStorage custom hook-a izvrsava se ovaj useEffect i prosledjuje url
  useEffect(() => {
    if (url) {
      setImgUrl(url);
      setIsUploading(false);
      setUploadError(error);
    }
  }, [url, setImgUrl, setIsUploading, error, setUploadError]);

  return (
    <div style={{ marginRight: "20px", marginTop: "30px" }}>
      <h3>{progress !== 100 ? `Progres upload: ${progress.toFixed(0) + " % "}` : " 100%  Please wait.."} </h3>
      <motion.div
        style={{ width: progress + "%", backgroundColor: "rgb(100, 113, 150)", height: "3px" }}
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
