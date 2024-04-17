"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPosts = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const addPosts = (userId, postInfo, files, cloudService, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || !postInfo || !files || files.length === 0) {
        throw new appError_1.default('Invalid input data', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        let uploadedFile;
        if (file.mimetype.includes('image')) {
            uploadedFile = yield cloudService.upload(file, 'Posts/photo');
            postInfo.image = uploadedFile;
        }
        if (file.mimetype.includes('video')) {
            uploadedFile = yield cloudService.upload(file, 'Posts/video');
        }
    }));
    yield Promise.all(uploadPromises);
    postInfo.authorId = userId;
    const postId = yield postDbRepository.addPost(postInfo);
    if (!postId) {
        throw new appError_1.default('Unable to add Post', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
    }
    return postId;
});
exports.addPosts = addPosts;
//# sourceMappingURL=addPost.js.map