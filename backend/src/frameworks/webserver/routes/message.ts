import express from 'express'
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware'


const messageRouter=()=>{
   const router=express.Router();

   router.route('/chatList')
   return router;
}

export default messageRouter;