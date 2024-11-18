const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './configure.env' });
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(() => console.log('DB connection successfully!'));

/*START SERVER*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
