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
exports.getAvailableUsersUsingSearch = exports.searchUserUseCase = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const searchUserUseCase = (searchQuery, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!searchQuery) {
        throw new appError_1.default('Please Provide a search query', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const searchResult = yield userDbRepository.searchUser(searchQuery);
    return searchResult;
});
exports.searchUserUseCase = searchUserUseCase;
const getAvailableUsersUsingSearch = (userid, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userid) {
        throw new appError_1.default('Please provide a valid userId', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const searchResult = yield userDbRepository.searchAvailableUsers(userid);
    return searchResult;
});
exports.getAvailableUsersUsingSearch = getAvailableUsersUsingSearch;
//# sourceMappingURL=search.js.map