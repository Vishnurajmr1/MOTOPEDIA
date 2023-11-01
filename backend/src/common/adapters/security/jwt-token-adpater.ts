import jwt from 'jsonwebtoken';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { createFutureDate } from '~/common/helpers/date/create-future-date';
export class JwtTokenAdapter implements JwtToken{
    constructor(
        private readonly secret:string,
        private readonly refreshSecret:string,
        private readonly accessTokenExpirationInSeconds=600,//10 minutes default
        private readonly refreshTokenExpirationInSecons=691200,//8 days default
    ){}
    signAccessToken(userId: string) {
         const expirationDate=createFutureDate(
            new Date(),
            this.accessTokenExpirationInSeconds,
         );
         const token=jwt.sign({id:userId},this.secret,{
            expiresIn:this.accessTokenExpirationInSeconds,
         });
         return {token,expirationDate};
    }
    signRefreshToken(userId: string) {
        const expirationDate=createFutureDate(
            new Date(),
            this.refreshTokenExpirationInSecons,
        );
        const token=jwt.sign({id:userId},this.refreshSecret,{
            expiresIn:this.refreshTokenExpirationInSecons,
        })
        return {token,expirationDate}
    }
    verify(token: string, isAccessToken=true): string {
        const secret=isAccessToken?this.secret:this.refreshSecret;
        const userData=jwt.verify(token,secret) as {id:string};
        return userData.id;
    }
}

const secret=process.env.JWT_SECRET as string;
const refreshSecret=process.env.JWT_SECRET_REFRESH as string;

const secretExpiration=parseInt(process.env.JWT_SECRET_EXPIRATION_SECS as string);
const refreshSecretExpiration=parseInt(process.env.JWT_SECRET_REFRESH_EXPIRATION_SECS as string);

export const jwtTokenAdapterSingleton=new JwtTokenAdapter(
    secret,
    refreshSecret,
    secretExpiration,
    refreshSecretExpiration
)