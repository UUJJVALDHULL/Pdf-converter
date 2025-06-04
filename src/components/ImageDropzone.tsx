import React from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import pdfConvertImg from "../assets/pdf-convert.png"; // Add your illustration here

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".bmp", ".tiff"],
    },
    multiple: true,
  });

  let dropzoneClassName =
    "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white";

  if (isDragActive && isDragAccept) {
    dropzoneClassName += " border-blue-500 bg-blue-50";
  } else if (isDragReject) {
    dropzoneClassName += " border-red-500 bg-red-50";
  } else {
    dropzoneClassName +=
      " border-gray-300 hover:border-blue-400 hover:bg-blue-50";
  }

  return (
    <div {...getRootProps()} className={dropzoneClassName}>
      <input {...getInputProps()} />

      <img
        src={pdfConvertImg}
        alt="PDF Conversion"
        className="w-44 h-44 mb-6 object-contain"
      />

      <div className="text-center">
        {isDragActive ? (
          <FileUp className="h-10 w-10 text-blue-500 mb-3 mx-auto" />
        ) : null}

        <p className="text-xl font-semibold text-gray-700 mb-1">
          {isDragActive ? "Drop images here" : "Upload your images"}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Drag & drop or{" "}
          <span className="text-blue-600 font-medium">browse files</span>
        </p>
        <p className="text-xs text-gray-400">
          Supported formats: JPG, PNG, GIF, WEBP, and more
        </p>
      </div>
    </div>
  );
};

export default ImageDropzone;
