import mongoose from 'mongoose';

//creating the schema of our database -- blueprint of the structure of database
//each post is going to have these fields
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

//turn the schema into a model to use 
const PostMessage = mongoose.model('PostMessage',postSchema);

//exporting a mongoose model to run commands on it later on
export default PostMessage;