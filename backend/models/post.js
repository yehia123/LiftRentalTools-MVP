const mongoose = require('mongoose');
/** Schema created
 * Different type of schema metho can be accessed
 * check mongodb documentation
 */
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true},
  fbImagePath: { type: String, required: true},
  fbName: { type: String, required: true}
});

/** Turn it into a model by using a model() function
 * use module.exports so it can be used outside the class
*/
module.exports = mongoose.model('Post', postSchema);
