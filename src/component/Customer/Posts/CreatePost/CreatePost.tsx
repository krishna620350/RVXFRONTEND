import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiUploadCloud, FiX } from "react-icons/fi";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f) {
      setFile(f);
      if (f.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(f));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0] || null;
    if (f) {
      setFile(f);
      if (f.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(f));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setError("");
    alert("Post created!\nTitle: " + title + "\nDescription: " + description + (file ? `\nFile: ${file.name}` : ""));
    setTitle("");
    setDescription("");
    setFile(null);
    setPreviewUrl(null);
    navigate(-1); // Go back to the previous page instead of home
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto bg-gray-900/60 border border-gray-700/50 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the modal
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Create a New Post</h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white"
        >
          <FiX size={24} />
        </button>
      </div>
      <div>
        <label className="block text-gray-300 font-semibold mb-2">Title</label>
        <input
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 placeholder-gray-400"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300 font-semibold mb-2">
          Description
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 placeholder-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share your thoughts..."
          rows={5}
          required
        />
      </div>
      <div>
        <label className="block text-gray-300 font-semibold mb-2">
          Attachment
        </label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-gray-800"
              : "hover:border-gray-500 hover:bg-gray-800/50"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf,.doc,.docx,text/plain,video/*,audio/*"
          />
          {previewUrl ? (
            <div className="relative group">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 rounded-lg mx-auto shadow-lg object-contain"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX size={18} />
              </button>
            </div>
          ) : file ? (
            <div className="relative group flex items-center justify-center">
              <div className="flex items-center justify-center gap-3 text-gray-400">
                <FiFileText size={32} />
                <span>{file.name}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX size={20} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
              <FiUploadCloud size={40} />
              <p className="font-semibold">
                Drag & drop a file here, or click to select
              </p>
              <p className="text-xs">
                Images, Videos, Documents, and Audio supported
              </p>
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-400 font-semibold text-center animate-pulse">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
