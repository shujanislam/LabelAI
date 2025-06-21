"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function LabelerUpload() {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(""); // ✅ NEW: holds server response

  const handleFiles = (newFiles) => {
    const fileList = Array.from(newFiles);
    setFiles((prev) => [...prev, ...fileList]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(files);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setFiles(reordered);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!prompt || files.length === 0) {
      alert("Please enter a prompt and add at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      setLoading(true);
      setResult(""); // clear old result
      const res = await fetch("http://localhost:8080/api/v1/upload-data", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Server response:", data);

      // ✅ Save server result
      setResult(data.output || "No result returned.");
    } catch (error) {
      console.error("Error uploading:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-md">
      <label className="block mb-4 font-semibold text-gray-700">
        Enter Prompt for Labeling
      </label>
      <input
        type="text"
        placeholder="E.g. Extract names and dates"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="files">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition ${
                snapshot.isDraggingOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <input
                type="file"
                multiple
                onChange={handleInputChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-gray-600 hover:text-blue-600"
              >
                Drag files here or{" "}
                <span className="text-blue-600 font-semibold">browse</span>
              </label>

              <ul className="w-full mt-4 space-y-2">
                {files.map((file, index) => (
                  <Draggable
                    key={file.name + index}
                    draggableId={file.name + index}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`px-4 py-2 rounded-md border border-gray-200 bg-white shadow-sm ${
                          snapshot.isDragging ? "bg-blue-100" : ""
                        }`}
                      >
                        {file.name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Labeling..." : "Label It"}
      </button>

      {/* ✅ NEW: show result */}
      {result && (
        <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Labeling Result:</h2>
          <pre className="whitespace-pre-wrap break-words text-gray-800">{result}</pre>
        </div>
      )}
    </div>
  );
}
