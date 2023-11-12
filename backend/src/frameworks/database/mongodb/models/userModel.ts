import mongoose, { Schema, Document, model } from 'mongoose';

interface ProfilePic {
    name: string;
    key?: string;
    url?: string;
}

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    profilePic: ProfilePic;
    mobile?: string;
    password: string;
    dateJoined: Date;
    isGoogleUser: boolean;
    isBlocked: boolean;
    blockedReason: string;
    isVerifiedEmail: boolean;
    otp?: string;
}

const ProfileSchema = new Schema<ProfilePic>({
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

const UserSchema = new Schema<IUser>({
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
        required: function (this: IUser) {
            return !this.isGoogleUser;
        },
        trim: true,
        sparse: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    password: {
        type: String,
        required: function (this: IUser) {
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
});

const User = model<IUser>('User', UserSchema, 'user');

export default User;
