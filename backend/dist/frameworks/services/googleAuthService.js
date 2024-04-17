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
exports.googleAuthService = void 0;
const google_auth_library_1 = require("google-auth-library");
const config_1 = __importDefault(require("../../config"));
const client = new google_auth_library_1.OAuth2Client(config_1.default.GOOGLE_CLIENT_ID);
const googleAuthService = () => {
    const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstName: '',
            lastName: '',
            email: '',
            profilePic: {
                url: '',
                name: '',
            },
            isVerifiedEmail: false,
            isGoogleUser: true,
        };
        const ticket = yield client.verifyIdToken({
            idToken: token,
        });
        const payload = ticket.getPayload();
        if ((payload === null || payload === void 0 ? void 0 : payload.given_name) &&
            (payload.family_name || (payload === null || payload === void 0 ? void 0 : payload.name)) &&
            (payload === null || payload === void 0 ? void 0 : payload.email) &&
            (payload === null || payload === void 0 ? void 0 : payload.picture) &&
            (payload === null || payload === void 0 ? void 0 : payload.email_verified)) {
            user.firstName = payload.given_name || '';
            user.lastName = payload.family_name || payload.name || '';
            user.email = payload.email;
            user.profilePic.url = payload.picture;
            user.profilePic.name = payload.given_name || '';
            user.isVerifiedEmail = payload.email_verified;
        }
        return user;
    });
    return {
        verify,
    };
};
exports.googleAuthService = googleAuthService;
//# sourceMappingURL=googleAuthService.js.map