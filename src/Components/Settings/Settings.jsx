import { useEffect, useState } from "react";

const Settings = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          "https://relience-test-backend.onrender.com/api/v1/image/getImage?id=672dc97f642680964eb40c8a"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const imageData = await response.json();

        const imageObjectURL = imageData.imageData;

        setImageSrc(imageObjectURL);
        console.log(imageData);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <img src={imageSrc} alt="Fetched from API" />
    </div>
  );
};

export default Settings;
