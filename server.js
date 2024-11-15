const dotenv = require('dotenv');

dotenv.config({ path: './configure.env' });
const app = require('./app');

/*START SERVER*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
