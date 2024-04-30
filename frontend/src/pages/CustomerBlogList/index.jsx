import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerBlogList.css"; // Import your CSS file

export default function CustomerBlogList() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/blogs/posts");
      setBlogs(response.data);
      setPending(false);
    } catch (error) {
      setPending(false);
      setError(error.response.data.message || "Error fetching blogs");
    }
  };

  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="customer-blog-list">
      {/* ... Pending and Error Display ... */}
      <div className="blog-card-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <img
              src={blog.image || "/placeholder-blog.jpg"}
              alt={blog.title}
              className="blog-card__image"
            />
            <div className="blog-card__title">{blog.title}</div>
            <button
              className="admin-add-button"
              onClick={() => handleReadMore(blog._id)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
