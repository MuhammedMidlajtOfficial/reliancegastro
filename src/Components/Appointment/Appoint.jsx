import React, { useEffect, useState } from 'react';

const Appoint = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Fetch the image from the API
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/image/getImage?id=672ca0f3b2933194f4235cc1');

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        // Convert the response to a blob
        const imageBlob = await response.blob();

        // Create a URL for the image blob
        const imageObjectURL = URL.createObjectURL(imageBlob);

        // Set the image URL in the state
        setImageSrc(imageObjectURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      <h1>Appoint</h1>
      {imageSrc ? (
        <img src={imageSrc} alt="Fetched from API" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default Appoint;
