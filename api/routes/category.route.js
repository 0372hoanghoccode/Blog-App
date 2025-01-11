import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createCategory);
router.get('/get', getCategories);
router.put('/update/:categoryId', verifyToken, updateCategory);
router.delete('/delete/:categoryId', verifyToken, deleteCategory);

export default router;