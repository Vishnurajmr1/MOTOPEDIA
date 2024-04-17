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
exports.editUserDetailsUseCase = exports.getUserDetailUseCase = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const getUserDetailUseCase = (id, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new appError_1.default('Please provide a valid user id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const userDetails = yield userDbRepository.getUserById(id);
    if (userDetails) {
        userDetails.password = 'no password';
    }
    return userDetails;
});
exports.getUserDetailUseCase = getUserDetailUseCase;
const editUserDetailsUseCase = (id, userData, profilePic, cloudService, authService, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new appError_1.default('Please provide a valid user id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const userDetails = yield userDbRepository.getUserById(id);
    let query = {};
    if (profilePic) {
        const response = yield cloudService.upload(profilePic, 'Profile_photo');
        query['profilePic'] = response;
    }
    else {
        if (!userData.currentPassword) {
            throw new appError_1.default('Current Password is required', HttpStatusCodes_1.default.BAD_REQUEST);
        }
        query = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            mobile: userData.mobile,
        };
        if (Object.keys(userData).length === 0) {
            throw new appError_1.default('At least update a single field', HttpStatusCodes_1.default.BAD_REQUEST);
        }
        if (userData && userDetails) {
            const checkPassword = yield authService.comparePassword(userData.currentPassword, userDetails.password);
            if (!checkPassword) {
                throw new appError_1.default('Current Password is incorrect', HttpStatusCodes_1.default.BAD_REQUEST);
            }
            if (userData.password) {
                const newPassword = yield authService.hashPassword(userData.password);
                query['password'] = newPassword;
            }
        }
    }
    const updatedProfile = yield userDbRepository.updateProfile(userDetails === null || userDetails === void 0 ? void 0 : userDetails._id, query);
    return updatedProfile;
});
exports.editUserDetailsUseCase = editUserDetailsUseCase;
//# sourceMappingURL=user.js.map