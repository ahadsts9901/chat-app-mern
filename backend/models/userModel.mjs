import { Schema, model } from "mongoose";
import { defaultProfilePicture, emailPattern, userNamePattern } from "../utils/core.mjs";

let userSchema = new Schema({

    profilePhoto: {
        type: String,
        default: defaultProfilePicture,
        maxlength: 1000,
    },

    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        trim: true,
        match: userNamePattern
    },

    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
        match: emailPattern,
        index: true,
    },

    password: {
        type: String,
    },

    isActive: {
        type: Boolean,
        default: false
    },

    createdOn: {
        type: Date,
        default: Date.now
    }

});

userSchema.pre('save', function (next) {

    if (this?.email) {

        this.email = this?.email?.toLowerCase();

    }

    next();

});

let userModel;

try {

    userModel = model('users');

} catch (error) {

    userModel = model('users', userSchema);

}

export { userModel };