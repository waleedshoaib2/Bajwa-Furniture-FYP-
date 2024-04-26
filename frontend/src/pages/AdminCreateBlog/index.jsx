import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import AIIcon from "./AIIcon";
import "./CreatePost.css";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import EditorToolbar, { modules, formats } from "./toolbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [formHeight, setFormHeight] = useState("auto");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCoZ7Oc7MxLX6K_2D55wJqZ7zqor9Awtt4"
  );

  useEffect(() => {
    const handleResize = () => {
      const form = document.getElementById("create-post-form");
      if (form) {
        setFormHeight(`${form.scrollHeight}px`);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const markdownToHtml = (markdownContent) => {
    return marked(markdownContent);
  };
  const handleIdeaGenerationClick = async () => {
    setIsGeneratingIdeas(true);

    const promptText = window.prompt("Enter a topic or keywords:");

    if (promptText) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        const ideas = response.text();
        const htmlContent = markdownToHtml(ideas);
        setContent(htmlContent);
      } catch (error) {
        console.error("Error generating ideas:", error);
      } finally {
        setIsGeneratingIdeas(false);
      }
    } else {
      setIsGeneratingIdeas(false); // Set isGeneratingIdeas back to false if user cancels prompt
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => {
    setContent(value);
    setFormHeight(
      `${document.getElementById("create-post-form").scrollHeight}px`
    );
  };
  const handleImageChange = (e) => setImageURL(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/blogs/posts",
        { title, content, image: imageURL }
      );
      console.log("New post created:", response.data);
      navigate(`/getallblogs`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-container">
      <button
        className="AI-button"
        onClick={handleIdeaGenerationClick}
        disabled={isGeneratingIdeas}
      >
        <AIIcon />
      </button>

      {generatedIdeas.length > 0 && (
        <ul>
          {generatedIdeas.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>
      )}
      <form
        id="create-post-form"
        onSubmit={handleSubmit}
        className="create-post-form"
        style={{ height: formHeight }}
      >
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter a captivating title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="text-editor">
          <label htmlFor="content">Content:</label>
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </div>
        <div className="form-field">
          <label htmlFor="image-url">Image URL:</label>
          <input
            type="text"
            id="image-url"
            placeholder="Add an image to enhance your post"
            value={imageURL}
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="publish-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
