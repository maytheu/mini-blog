const mongoose = require("mongoose");

const userAuth = require("../middleware/userAuth.js");
const Blog = mongoose.model("blogs");

module.exports = (app) => {
  app.post("/api/user/post", userAuth, (req, res) => {
    const post = new Blog({
      title: req.body.title,
      headline: req.body.headline,
      publish: req.body.publish,
      blog: req.body.blog,
      publishedDate: req.body.publishedDate,
    });
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

  //accept query params of title
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

  app.post("/api/post_comment", (req, res) => {
    let title = req.query.title;
    const comment = new Blog({
      comment: req.body.comment,
      commentName: req.body.commentName,
      commentDate: req.body.commentDate,
    });
    Blog.findOneAndUpdate({ title }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      comment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true });
      });
    });
  });

  app.get('/api/share', (req, res) =>{
//returns shareable url
  })

  app.get("/api/like", (req, res) => {
    let title = req.query.title;
    Blog.findOneAndUpdate({ title }, { $inc: { like: 1 } }).exec(
      (err, likes) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, likes });
      }
    );
  });

  app.get("/api/dislike", (req, res) => {
    let title = req.query.title;
    Blog.findOneAndUpdate({ title }, { $inc: { dislike: 1 } }).exec(
      (err, dislikes) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, dislikes });
      }
    );
  });
};
