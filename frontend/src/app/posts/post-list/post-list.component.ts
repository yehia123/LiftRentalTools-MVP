import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

/**
 * Parent component for ou
 */
@Component({
  selector: 'app-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  /** JS Object which has the different
  * @Input connects it only to the direct component on the parent
  */
  // posts = [
  //  { title: 'ForkLift', content: 'One Week, No Shipping, 500$'},
  //   {title: 'Drill', content: 'Two Weeks, Shipping, 200$'},
  //  { title: 'BobCat', content: 'three Weeks, No Shipping, 900$'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;


  public user: SocialUser;
  public loggedIn: boolean;



  constructor(public postsService: PostService, public authService: AuthService) {}
  /** The\
   * Subscrption allows it to render
   */
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
      });
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
