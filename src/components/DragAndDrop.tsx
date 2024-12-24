import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
//import Loader from "./Loader";

export default function DragAndDrop({ className }: { className: string }) {
  const onDrop = useCallback(() => {
    //console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: className })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & drop some files here, or click to select files</p>
      )}
    </div>
  );
}
