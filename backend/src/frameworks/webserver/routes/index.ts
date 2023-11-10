import express,{Application} from 'express';

import userRouter from './user';
import authRouter from './auth';
import refreshRouter from './refresh';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import adminRouter from './admin';

const routes=(app:Application)=>{
    app.use('/api/auth',authRouter());
    app.use('/api/all/refresh-token',refreshRouter());
    app.use('/api/admin',jwtAuthMiddleware,roleCheckMiddleware('admin'),adminRouter());
    // app.use('/api/admin',adminRouter());
    app.use('/api/user',userRouter());
}

export default routes;