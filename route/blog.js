const mongoose = require("mongoose");
const userAuth = require("../middleware/userAuth.js");
const Blog = mongoose.model("blogs");
module.exports = (app) => {
  app.get("/api/user/post", userAuth, (req, res) => {
    const post = new Blog();
    post.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });

  //display all post for admin
  app.get("/api/user/view", userAuth, (req, res) => {
    Blog.find({}, (err, post) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, post });
    });
  });

  //display only the published post
  app.get("/api/view", (req, res) => {
    Blog.find({ publish: true }, (err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(post);
    });
  });

  //query for individual poat
  app.get("/api/post", (req, res) => {
    let title = req.query.title;
    Blog.findOne({ title, publish: true }, (err, post) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, post });
    });
  });

  app.post("/api/user/edit", userAuth, (req, res) => {
    let title = req.query.title;
    Blog.findOneAndUpdate(
      { title },
      { $set: req.body },
      { new: true },
      (err, post) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true, post });
      }
    );
  });

  app.get("/api/user/delete", userAuth, (req, res) => {
    let title = req.query.title;
    Blog.deleteOne({ title }, (err, post) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true, post });
    });
  });
};
