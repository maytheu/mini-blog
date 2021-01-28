const mongoose = require("mongoose");

const userAuth = require("../middleware/userAuth.js");
const Author = mongoose.model("authors");

module.exports = (app) => {
  app.post("/api/sign_up", (req, res) => {
    const author = new Author();
    author.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });

  app.get("/api/sign_in", (req, res) => {
    Author.findOne({ user: req.body.email }, (err, user) => {
      if (!user)
        return res.json({ loginSuccess: false, message: "User not found" });

      user.comparePassword(eq.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "Incorrect password",
          });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
          });
        });
      });
    });
  });

  app.get("/api/sign_out", userAuth, (req, res) => {
    Author.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
        });
      }
    );
  });
};
