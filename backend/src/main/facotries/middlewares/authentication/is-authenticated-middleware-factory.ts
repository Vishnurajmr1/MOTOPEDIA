import { jwtTokenAdapterSingleton } from "~/common/adapters/security/jwt-token-adpater";
import { IsAuthenticatedMiddleware } from "~/presentation/middlewares/is_authenticated";

export const IsAuthenticatedMiddlewareFactory=()=>{
    const jwtAdapter=jwtTokenAdapterSingleton;
    const isAuthenticatedMiddleware=new IsAuthenticatedMiddleware(jwtAdapter);

    return {
        isAuthenticatedMiddleware
    }
}