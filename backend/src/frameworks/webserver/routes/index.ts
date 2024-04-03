import { Application } from 'express';
import userRouter from './user';
import authRouter from './auth';
import refreshRouter from './refresh';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import adminRouter from './admin';
import postRouter from './posts';
import chatRouter from './chat';
import messageRouter from './message';
import paymentRouter from './payment';
import subscriptionRouter from './subscription';
import notificationRouter from './notification';

const routes = (app: Application) => {
    app.use('/api/auth', authRouter());
    app.use('/api/all/refresh-token', refreshRouter());
    app.use('/api/admin', jwtAuthMiddleware, roleCheckMiddleware('admin'), adminRouter());
    app.use('/api/user', userRouter());
    app.use('/api/posts', postRouter());
    app.use('/api/notification', notificationRouter());
    app.use('/api/chat', chatRouter());
    app.use('/api/messages', messageRouter());
    app.use('/api/subscription', subscriptionRouter());
    app.use('/api/payment', jwtAuthMiddleware, paymentRouter());
};

export default routes;
