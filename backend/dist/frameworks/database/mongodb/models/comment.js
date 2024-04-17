"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500,
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'comment',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.comment = (0, mongoose_1.model)('Comment', commentSchema, 'comment');
//# sourceMappingURL=comment.js.map