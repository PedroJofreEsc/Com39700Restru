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

    },
    documents: {
        type: [{
            name: {
                type: String,
                required: true
            },
            reference: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    last_connection: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        required: true,
        enums: ["completo", "incompleto", "pendiente"],
        default: "pendiente"
    },
    avatar: {
        type: String,
        default: ""
    },
    cart: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "carts"
        }],
        default: []
    }

});

export const UserModel = mongoose.model(userCollection, userSchema);