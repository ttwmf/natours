const express = require('express');
const tourController = require('../controllers/tourContoller');

const tourRouter = express.Router();

tourRouter.param('id', tourController.checkId);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addTour);

tourRouter
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
