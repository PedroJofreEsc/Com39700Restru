import mongoose from 'mongoose';

export const userCollection = "users";

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
        enum: ["user", "admin", "premium"]

    }
});

export const UserModel = mongoose.model(userCollection, userSchema);