import express from "express";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
// import path from "path";

import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { Server } from "socket.io";

import newsletterRoutes from "./routes/newsletterRoutes.js";

const app = express();

connectDb();
// Set the 'views' directory for your EJS templates
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", path.join(__dirname, "views"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(passport.initialize());

app.use(cors());
app.use("/stripe", stripeRoutes);
app.use(express.json());

app.get("/blog/:postId", (req, res) => {
  // Fetch blog post data (replace with your database logic)
  const postData = findPostById(req.params.postId);
  res.render("blog-post.ejs", { post: postData });
});

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/blogs/", blogRoutes);

const httpServer = app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// sendNewsletters();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`); // Add logging
  });

  socket.on("sendMessage", (chatId, messageData) => {
    io.to(chatId).emit("newMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
