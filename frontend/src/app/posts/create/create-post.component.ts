import { Component, OnInit } from '@angular/core';

import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { mimeType } from './mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';


import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

/* Component which creates a rental post
* onAddPost() currently uses two way binding with enteredValue
* EventEmitter
*/
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enteredTitle = '';
  enteredDesc = '';

  imagePreview: string;
  private post: Post;

  public user: SocialUser;
  public loggedIn: boolean;
  public fbPhoto: string;
  public fullName: string;

  constructor(
    public postsService: PostService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  /** Control form using Reactive Forms
   * async Validator to check if it is the right type of file
   */
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl(null, {
      validators:
       [Validators.required],
       asyncValidators: [mimeType]
    }),
    fbImagePath: new FormControl('', Validators.required),
    fbName: new FormControl('', Validators.required)
  });
  /** Method in intake the uplaoded image using HTMLInputElement method which
   * gives us access to the files[] array.
   * in this case only the first image uploaded is chosen
   * patchValue() target single control
   */
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
   /** Transform image to url for preview */
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;
   };
   reader.readAsDataURL(file);
  }
  /**  */
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.form.patchValue({
      fbImagePath: this.user.photoUrl,
      fbName: this.user.name
    });
  }
  /**
   * Add error handling
   */
  onSavePost() {
    /** exits the method and the post does not get added */
    if (this.form.invalid) {
      return;
    }
      this.postsService.addPost(
        this.form.controls.title.value,
        this.form.controls.content.value,
        this.form.controls.image.value,
        this.form.controls.fbImagePath.value,
        this.form.controls.fbName.value
      );

    this.form.reset();

  }
}
