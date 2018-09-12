/** import express */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts")


const app = express();
// Need
mongoose.connect("mongodb+srv://jb:QyedOIEb9mEyHxYm@cluster0-ykbqi.mongodb.net/test?retryWrites=true",  {useNewUrlParser: true})
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('connection failed');
  });

/** always infront of post request
 * returns valid express middleware
 * OR can be written using urlencoded
 * BUILT middleware in request/express
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));
/** For all incoming requests
 * you add the header and what files to target
 * you can choose as many origin or take out as much needed
 * next() called to move onto the next request
 * Methods allowed such as GET POST PATCH DELETE ETC
 * include OPTIONS as it might be passed without explicity using it
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", 'index.html'));
});

/** export class */
module.exports = app;
