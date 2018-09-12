const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();
 /**
  * Server side code
  * uses mime type to check what type of file
  */
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
/**
 * Multer is used to store files
 * callback function passes null along with local storage destination
 * use multer to store file url in the database
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

/** post request
 * Post model is passed with newPost({})
 * extract post byusing req.body
 * data managed by mongoose to make it easier to connect it to database
 * return response so it doenst time out
 * post.save() saves it in database (mongoose package)
 * 201 usually means everything is ok
 * add then() next to save to control result of subscribtion
 * pass multer storage with image for it to detect the post
 * when doing so
 */
router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    fbImagePath: req.body.fbImagePath,
    fbName: req.body.fbName
  });
  /**
   * instead of calling each variable from post we can usew this instead
   * post : { ...createdPost, id: CreatedPost._id }
   */
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'post added',
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,
        fbImagePath: createdPost.fbImagePath,
        fbName: createdPost.fbName
      }
    });
  });
});


/** add Middleware
app.use((req, res, next)=> {
  console.log('first middleware');
  next();
});*/
/** res.send() send back response
 * which uses /posts url to reach this code
 * initilize posts in the backend
 * in posts we create some new objects
 * we can USE or GET here (fetching posts)
 * Post model method (mongoose) with find() to fetch the data and return all entries
*/
router.get("", (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'posts fetched success',
        posts: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
/**
 * put request puts a new resources and replaces with it
 * uses updateOne method to edit the object
 * then() handles the case if it is succesful
 */
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Updated!"});
  });
});

/** To delete documents,send ID as part of the url NOT request body
 * deleting the item through mongoose query
 * still need to automatically update the front end after deleting
*/
router.delete("/:id", (req, res, next ) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted" });
  });
});


module.exports = router;
