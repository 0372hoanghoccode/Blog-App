import Category from '../models/category.model.js';
import { errorHandler } from '../utils/error.js';

export const createCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create categories'));
  }
  
  try {
    const { name, description } = req.body;
    if (!name) {
      return next(errorHandler(400, 'Category name is required'));
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9-\s]/g, '')
      .replace(/\s+/g, '-');

    const newCategory = new Category({
      name,
      slug,
      description: description || '',
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to update categories'));
  }

  try {
    const { name, description } = req.body;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9-\s]/g, '')
      .replace(/\s+/g, '-');

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          name,
          slug,
          description: description || '',
        },
      },
      { new: true }
    );

    if (!updatedCategory) {
      return next(errorHandler(404, 'Category not found'));
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to delete categories'));
  }

  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json('Category has been deleted');
  } catch (error) {
    next(error);
  }
};
