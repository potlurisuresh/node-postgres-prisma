const express = require("express");
const router = express.Router();
const prisma = require("../db");

// create a blog
router.post("/post", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please input Title and Content" });
    }

    const blog = await prisma.post.create({ data: { title, content } });
    return res
      .status(201)
      .json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog" });
  }
});

// get all blogs
router.get("/posts", async (req, res) => {
  try {
    const blogs = await prisma.post.findMany();
    return res.status(200).json({ data: blogs.length, blogs });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blogs" });
  }
});

// get single blog by title
router.get("/get", async (req, res) => {
  const { title } = req.query;
  try {
    const blog = await prisma.post.findFirst({ where: { title } });
    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching blog" });
  }
});

// update a blog by id
router.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedBlog = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
    return res.json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating blog" });
  }
});

// delete a blog by id
router.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id: parseInt(id) } });
    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting blog" });
  }
});

module.exports = router;
