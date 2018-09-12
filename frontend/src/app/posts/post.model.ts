/** Making a model helps us shape how the object that is going to be craeted it will look lik
 * such as when going bsck to the data you can remember what data type was usde
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  fbImagePath: string;
  fbName: string;
}

export interface DialogData {
  animal: string;
  name: string;
}
