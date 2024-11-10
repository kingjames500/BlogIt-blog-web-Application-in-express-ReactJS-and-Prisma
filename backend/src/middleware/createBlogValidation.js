const createBlogValidation = (req, res, next) => {
  const { title, imageUrl, excerpt, content } = req.body;
  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  if (!imageUrl) {
    res.status(400).json({ message: "Image URL is required" });
    return;
  }
  if (!excerpt) {
    res.status(400).json({ message: "Excerpt is required" });
    return;
  }
  if (!content) {
    res.status(400).json({ message: "Content is required" });
    return;
  }
  next();
};

export default createBlogValidation;
