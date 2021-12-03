
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const middlewares = require('./middlewares');
const router = require('./routes')
require('dotenv').config('./.env');

const app = express();

const { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_ATLAS, PORT } = process.env
app.use(middlewares);
app.use('/api', router)

// connect DB

const db = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@masterdegree.xomet.mongodb.net/masterdegree?retryWrites=true&w=majority`
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(db, options).then(() => console.log(`Connected to ${db}...`));


require('./middleware/passport')(passport);

// Server static assets if in production
if (NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


process.on("unhandledRejection", (ex) => {
  throw ex;
});
