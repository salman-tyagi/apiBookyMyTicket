import Rating from '../models/ratingModel.js';
import AppError from '../utils/appError.js';

export const getAllRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find();

    res.status(200).json({
      status: 'success',
      const: ratings.length,
      data: ratings,
    });
  } catch (err) {
    next(err);
  }
};

export const createRating = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const payload = { ...req.body, user: userId, movie: id };

    const rating = await Rating.create(payload);

    res.status(201).json({
      status: 'success',
      data: rating,
    });
  } catch (err) {
    next(err);
  }
};

export const getRating = async (req, res, next) => {
  try {
    const rating = await Rating.findOne({ _id: req.params.id })
      .populate({
        path: 'movie',
        select: 'title',
      })
      .populate({ path: 'user', select: 'email' });

    res.status(200).json({
      status: 'success',
      data: rating,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const rating = await Rating.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!rating) return next(new AppError("Can't update other's rating", 403));

    res.status(201).json({
      status: 'success',
      data: rating,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRating = async (req, res, next) => {
  try {
    const rating = await Rating.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!rating) return next(new AppError("Cant't delete other's rating", 403));

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};