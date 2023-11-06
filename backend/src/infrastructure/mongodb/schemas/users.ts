import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    phone:{
        type:Number,
    }
});

const User = mongoose.model('User', UserSchema);
export default User;
