import { OAuth2Client } from 'google-auth-library';
import configKeys from '@src/config';
const client = new OAuth2Client(configKeys.GOOGLE_CLIENT_ID);

export const googleAuthService = () => {
    const verify = async (token: string) => {
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
        const ticket = await client.verifyIdToken({
            idToken: token,
        });
        const payload = ticket.getPayload();
        if (
            payload?.given_name &&
            (payload.family_name || payload?.name) &&
            payload?.email &&
            payload?.picture &&
            payload?.email_verified
        ) {
            user.firstName = payload.given_name || '';
            user.lastName = payload.family_name || payload.name || '';
            user.email = payload.email;
            user.profilePic.url = payload.picture;
            user.profilePic.name = payload.given_name || '';
            user.isVerifiedEmail = payload.email_verified;
        }
        return user;
    };
    return verify;
};


export type GoogleAuthService=typeof googleAuthService;