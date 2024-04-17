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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDbRepository = void 0;
const postDbRepository = (repository) => {
    const addPost = (postInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addPost(postInfo); });
    const editPost = (postId, editInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.editPost(postId, editInfo); });
    const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPostById(postId); });
    const deletePostById = (postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deletePost(postId); });
    const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllPost(); });
    const getPostByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPostByUser(userId); });
    const getSavedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSavedPostsByUser(userId); });
    return {
        addPost,
        editPost,
        getPostById,
        getAllPosts,
        deletePostById,
        getPostByUser,
        getSavedPosts
    };
};
exports.postDbRepository = postDbRepository;
//# sourceMappingURL=postDBRepository.js.map