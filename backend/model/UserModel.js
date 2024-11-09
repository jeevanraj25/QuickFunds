import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }

});


const User= mongoose.models.User || mongoose.model("User",UserSchema);

export default User;


