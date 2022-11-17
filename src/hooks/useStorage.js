import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storage = getStorage();
    const imgName = new Date().getTime();
    const imagesRef = ref(storage, `image/profile photo/${imgName}`);

    const uploadTask = uploadBytesResumable(imagesRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
        // await collectionRef.add({ url: url, createdAt: createdAt });
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
