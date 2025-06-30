import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f && f.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setError("");
    // Here you would handle the post creation logic (API call, etc)
    alert("Post created!\nTitle: " + title + "\nDescription: " + description + (file ? `\nFile: ${file.name}` : ""));
    setTitle("");
    setDescription("");
    setFile(null);
    setPreviewUrl(null);
  };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-950 flex items-center justify-center p-2 sm:p-0">
                <form
                    className="w-full max-w-lg bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="block text-white font-semibold mb-2">Title</label>
                        <input
                            className="w-full px-3 sm:px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter post title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-2">Description</label>
                        <textarea
                            className="w-full px-3 sm:px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter post description"
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-2">Add File (image, doc, etc)</label>
                        <input
                            className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            type="file"
                            accept="*"
                            onChange={handleFileChange}
                        />
                        {previewUrl && (
                            <img src={previewUrl} alt="Preview" className="mt-4 max-h-40 rounded border border-gray-700 w-full object-contain" />
                        )}
                        {file && !previewUrl && (
                            <div className="mt-4 text-gray-400">Selected file: {file.name}</div>
                        )}
                    </div>
                    {error && <div className="text-red-400 font-semibold">{error}</div>}
                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow"
                    >
                        Create Post
                    </button>
                </form>
            </main>
        </>
      
  );
};

export default CreatePost;
