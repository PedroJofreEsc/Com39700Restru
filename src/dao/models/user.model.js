import mongoose from 'mongoose';

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        require: true,
        enum: ["user", "admin"]

    }
});

export const UserModel = mongoose.model(userCollection, userSchema);