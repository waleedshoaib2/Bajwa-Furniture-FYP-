import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import AIIcon from "./AIIcon";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import EditorToolbar, { modules, formats } from "./toolbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [formHeight, setFormHeight] = useState("auto");
  const [promptText, setPromptText] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
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

  const handlePromptSelection = (e) => {
    setSelectedPrompt(e.target.value);
  };

  const generatePrompt = async () => {
    try {
      let prompt = promptText;
      switch (selectedPrompt) {
        case "Product Showcase":
          prompt = `Introduce our flagship furniture product, highlighting its exquisite design, superior craftsmanship, and unique features. ${promptText}`;
          break;
        case "Interior Design Inspiration":
          prompt = `Curate a collection of stunning interior design inspirations featuring our furniture pieces, tailored to different decor styles such as modern, minimalist, or eclectic. ${promptText}`;
          break;
        case "Sustainable Furniture Solutions":
          prompt = `Educate our audience about sustainable furniture practices, showcasing eco-friendly materials, production methods, and our commitment to environmental responsibility. ${promptText}`;
          break;
        case "Furniture Care & Maintenance Guide":
          prompt = `Offer expert advice on furniture care and maintenance, covering cleaning techniques, stain removal, and protection measures for different types of materials like wood, leather, and upholstery. ${promptText}`;
          break;
        case "Furniture Customization Ideas":
          prompt = `Inspire creativity with a variety of furniture customization ideas, including DIY projects, color schemes, fabric choices, and decorative accents for a personalized touch. ${promptText}`;
          break;
        case "Furniture Buying Tips for First-Time Homeowners":
          prompt = `Provide valuable insights and guidance for first-time homeowners navigating the process of furnishing their space, addressing budgeting, space planning, quality considerations, and versatile furniture choices. ${promptText}`;
          break;
        default:
          break;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        "can you generate a really good detailed seo optimized blog outline by using the following blog nature and keywords, make sure the prompt you generate is of high quality" +
          prompt
      );
      const response = result.response.text();
      console.log(response);
      const blog = await model.generateContent(
        "Write an engaging seo optimized blog using the following outline, the blog should be of around 1000 words" +
          response
      );
      console.log(blog.response.text());
      const ideas = blog.response.text();
      setContent(ideas);
    } catch (error) {
      console.error("Error generating prompt:", error);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleIdeaGenerationClick = async () => {
    setIsGeneratingIdeas(true);

    if (promptText && selectedPrompt) {
      await generatePrompt(); // Generate the prompt based on user input and selected prompt
      try {
        // Now that we have the prompt, we can use it to generate the blog post
        // No need to generate content again, as we already have it from the prompt
        // await submitBlogPost(content); // Pass the generated content directly
      } catch (error) {
        console.error("Error generating blog post:", error);
      } finally {
        setIsGeneratingIdeas(false);
      }
    } else {
      setIsGeneratingIdeas(false);
    }
  };

  const submitBlogPost = async (blogContent) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/blogs/posts",
        { title, content: blogContent, image: imageURL }
      );
      console.log("New post created:", response.data);
      navigate(`/getallblogs`);
    } catch (error) {
      console.error("Error creating post:", error);
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

  const handleInputChange = (e) => setPromptText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Instead of generating the blog content here, we generate it in handleIdeaGenerationClick
      // and submit it using submitBlogPost function
      await handleIdeaGenerationClick();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <div className="create-post-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a topic or keywords"
          value={promptText}
          onChange={handleInputChange}
        />
        <select onChange={handlePromptSelection} value={selectedPrompt}>
          <option value="">Select Prompt</option>
          <option value="Product Showcase">Product Showcase</option>
          <option value="Interior Design Inspiration">
            Interior Design Inspiration
          </option>
          <option value="Sustainable Furniture Solutions">
            Sustainable Furniture Solutions
          </option>
          <option value="Furniture Care & Maintenance Guide">
            Furniture Care & Maintenance Guide
          </option>
          <option value="Furniture Customization Ideas">
            Furniture Customization Ideas
          </option>
          <option value="Furniture Buying Tips for First-Time Homeowners">
            Furniture Buying Tips for First-Time Homeowners
          </option>
        </select>
        <button
          className="AI-button"
          onClick={handleSubmit} // Now calling handleSubmit instead of handleIdeaGenerationClick directly
          disabled={isGeneratingIdeas}
        >
          <AIIcon />
        </button>
      </div>
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
