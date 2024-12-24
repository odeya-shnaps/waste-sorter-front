import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
//import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectIsUploading, uploadImages } from "../slices/imageSlice";
import Loader from "./Loader"; // Import your custom Loader component
//import { AppDispatch, RootState } from "../app/store"; // Adjust the import path based on your project structure

const ImageUploader = () => {
  const dispatch = useAppDispatch();
  const isUploading = useAppSelector(selectIsUploading);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      dispatch(uploadImages(acceptedFiles));
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUploadedImage(imageUrl);
    },
    [dispatch],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] }, // Restrict to image files
      maxFiles: 5,
    });

  // Explicitly type dropzoneStyle with React.CSSProperties
  const dropzoneStyle: React.CSSProperties = {
    border: "2px dashed",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    borderColor: isDragAccept
      ? "#4caf50"
      : isDragActive
        ? "#ff9800"
        : "#007BFF",
    backgroundColor: isDragActive ? "#f0f8ff" : "#ffffff",
  };
  return (
    <div>
      {isUploading ? (
        <Loader loading={isUploading} /> // Show loader when uploading
      ) : (
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? isDragAccept
                ? "Drop the image files here..."
                : "Only image files are accepted!"
              : "Drag & drop image files here, or click to select files"}
          </p>
        </div>
      )}
      {!isUploading && uploadedImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{ maxWidth: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

/*
        <h2>Uploaded Images:</h2>
        <ul>
          {images.map((image, index) => (
            <li key={index}>{image.name}</li>
          ))}
        </ul>
*/
