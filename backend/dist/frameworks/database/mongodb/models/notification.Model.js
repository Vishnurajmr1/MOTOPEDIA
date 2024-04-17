"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../types/common");
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(common_1.NotificationActionType),
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret._v;
        },
    },
    timestamps: true,
});
const Notification = (0, mongoose_1.model)('Notification', notificationSchema);
exports.default = Notification;
//# sourceMappingURL=notification.Model.js.map