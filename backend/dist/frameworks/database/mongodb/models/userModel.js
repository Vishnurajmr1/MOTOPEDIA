"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        requried: true,
    },
    key: {
        type: String,
    },
    url: {
        type: String,
    },
});
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    profilePic: {
        type: ProfileSchema,
        required: false,
    },
    mobile: {
        type: String,
        required: function () {
            return !this.isGoogleUser;
        },
        trim: true,
        sparse: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    password: {
        type: String,
        required: function () {
            return !this.isGoogleUser;
        },
        minlength: 8,
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    isGoogleUser: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    blockedReason: {
        type: String,
        default: '',
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    savedPost: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        default: [],
    },
    paymentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Payment',
    },
    online: {
        type: Boolean,
        default: false,
    },
    premium: {
        type: Boolean,
        default: false,
    },
});
const User = (0, mongoose_1.model)('User', UserSchema, 'user');
exports.default = User;
//# sourceMappingURL=userModel.js.map