import React, { useState } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const HandleFile: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      onFileUpload(file);
      setUploadedFile(file);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: dragging ? "2px dashed blue" : "2px solid black",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      {uploadedFile ? (
        <>
          <p>업로드된 파일: {uploadedFile.name}</p>
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
          />
        </>
      ) : (
        <p>파일을 드래그앤 드랍하세요!</p>
      )}
    </div>
  );
};

export default HandleFile;
