import { NotificationActionType } from '../../../../types/common';
import mongoose, { Schema, Model, model } from 'mongoose';

const notificationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        message: {
            type: String,
            required: true,
        },
        readBy: {
            type: Boolean,
            default: false,
        },
        actionType: {
            type: String,
            enum: Object.values(NotificationActionType),
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret._v;
            },
        },
        timestamps: true,
    },
);

const Notification = model('Notification', notificationSchema);
export default Notification;
