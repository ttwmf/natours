const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Bad request.',
    });
  }
  next();
};

exports.checkId = (req, res, next, val) => {
  console.log(`Check Id ${val}`);
  if (val * 1 >= tours.length) {
    return res.status(404).json({
      stautus: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};

exports.addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    data: {
      result: tours.length,
      tours,
    },
  });
};
exports.getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((x) => x.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((x) => x.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour data here',
    },
  });
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const newTours = tours.filter((x) => x.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
