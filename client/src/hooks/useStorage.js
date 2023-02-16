import { useState, useEffect } from "react";
import { blogsStorage, blogsFirestore, timestamp } from "../firebase/firebaseConfig";

const UseStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(0);
  const [url, setUrl] = useState(0);

  useEffect(() => {
    const storageRef = blogsStorage.ref(file.name);
    const collectionRef = blogsFirestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          collectionRef.add({url, createdAt})
        setUrl(url);
      }
    );
  }, [file]);
  return { error, progress, url };
};

export default UseStorage;
