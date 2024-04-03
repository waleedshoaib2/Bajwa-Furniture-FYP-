import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blogs/posts/${id}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch post");
        }
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error, e.g., set an error state
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or another loading indicator
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default Blog;
