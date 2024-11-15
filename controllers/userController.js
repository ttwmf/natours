const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    data: {
      result: users.length,
      users,
    },
  });
};
exports.addUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);

  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    }
  );
};

exports.getUserById = (req, res) => {
  const id = req.params.id * 1;
  const tour = users.find((x) => x.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const tour = users.find((x) => x.id === id);
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
exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  const newUsers = users.filter((x) => x.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(newUsers),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
