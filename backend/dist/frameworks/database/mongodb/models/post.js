"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.FileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
});
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: exports.FileSchema,
        required: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
    authorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        thumbsUp: {
            type: Number,
            default: 0,
        },
        like: {
            type: Number,
            default: 0,
        },
        heart: {
            type: Number,
            default: 0,
        },
    },
    likedBy: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            reactionType: {
                type: String,
                enum: ['thumbsUp', 'like', 'heart'],
            },
        },
    ],
    savedPosts: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    },
    reportCount: {
        type: Number,
        default: 0,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        default: [],
    },
});
const Post = mongoose_1.default.model('Post', postSchema, 'posts');
exports.default = Post;
//# sourceMappingURL=post.js.map