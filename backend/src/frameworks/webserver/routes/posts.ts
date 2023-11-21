import express from 'express';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';

const postRouter = () => {
    const router = express.Router();

    router.route('/posts').post(jwtAuthMiddleware)
};

export default postRouter;
