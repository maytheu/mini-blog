const mongoose = require("mongoose")                                          
const userAuth = require("../middleware/userAuth.js")                     
const Blog = mongoose.model("blogs")                                                        
module.exports = app =>{
	app.post("/api/user/post", userAuth,  (req, res) =>{
		const post = new Blog({
			title :"Teet0", 
			headline: "A test damole ofbtye blog post",
			blog:"Tue full hlogbpost will be loaded in thr bext oage",
			publish: 0
	})
		post.save((err, doc) =>{
                        if (err) return res.json({ success: false, err });                              res.status(200).json({ success: true });                      })                                        })

	//display all post for admin
	app.get("/api/user/view", userAuth, (req, res) =>{
		Blog.find({}, (err, post) =>{
		if (err) return res.json({ success: false, err });                                                  res.status(200).json({ success: true, post });
		})
	})

	//display only the published post
	app.get("/api/view", (req, res) =>{     
		Blog.find({}, (err, post) =>{   
			if (err) return res.json({ success: false, err });                          
			post.map(published => {
				if(published.publish){
					res.status(200).json({ success: true, published });
				}
			})
		})                               
	})

	app.get("/api/post", (req, res) =>{
		let title = req.query.title
		Blog.findOne({title}, (err, post) =>{
			if (err) return res.json({success: false, err})
			if(post.publish){
				res.status(200).json({ success: true, post });
			}else{
			res.json({ success: false, message:"Youre nit allowed here" });
			}
		})
	})

	app.post("/api/user/edit", userAuth, (req, res) =>{
		let title = req.query.title
		Blog.findOneAndUpdate({title}, {$set: req.body}, {new: true}, (err, post) =>{
			if (err) return res.json({success: false, err})
			return res.status(200).send({ success: true, post })
		})
	})

	app.get("/api/user/delete", userAuth, (req, res) =>{
		let title = req.query.title
		Blog.deleteOne({title}, (err, post) =>{
			if (err) return res.json({success: false, err})
			return res.status(200).send({ success: true, post })
		})
	})
}
