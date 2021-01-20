const mongoose = require("mongoose")                                                                                                                 
const blogSchema = mongoose.Schema({
	title:{                                 
		type: String,                   
		unique: 1,                       
		required: true                   
	},              
	headline: String,
	blog: {          
		type: String,          
		required: true                  
	},                                      
	publish:{
		type:   Boolean,
                default:0,
                required: true
        }
})

mongoose.model("blogs", blogSchema)
