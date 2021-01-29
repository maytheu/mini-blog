const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors')

require("dotenv").config();

const app = express();

app.use(cors())

require("./model/userSchema.js");
require("./model/blogSchema.js");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check mongoose connection
console.log(mongoose.connection.readyState);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

require("./route/user.js")(app);
require("./route/blog.js")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
