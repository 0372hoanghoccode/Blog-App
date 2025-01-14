import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
    createComment,
    getPostComments,
    likeComment,
    editComment,
    deleteComment,
    getcomments,
    createreply,
    getcommentreplies
  } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);
router.post("/reply", verifyToken, createreply);
router.get("/replies/:commentId", getcommentreplies);

export default router;