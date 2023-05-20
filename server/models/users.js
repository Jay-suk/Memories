import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
});


//turn the schema into a model to use 
const User = mongoose.model('User',userSchema);

export default User;