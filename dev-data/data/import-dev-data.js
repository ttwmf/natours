const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs/promises');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './configure.env' });

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(() => console.log('DB connection successfully!'));

const importTours = async () => {
  try {
    const data = await fs.readFile(
      'dev-data//data//tours-simple.json',
      'utf-8',
    );
    const tours = JSON.parse(data);
    await Tour.create(tours);
    console.log('Import data successfuly!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteTours = async () => {
  try {
    await Tour.deleteMany();
    console.log('Delete data successfully!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}
