import { Post } from './post.model';
/** Subject is similar to event emitter
 * instance of http client
*/
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/** Injectable can be used to directly put it in providers array */

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();
  /** get http client */
  public constructor(
    private http: HttpClient,
    private router: Router
  ) {}

/** Spraed operator
* Uses this in provider array to allow use in different component
* Uses http get (generic method) to connect with express backend
* to listen you need subscribe(neew data, error, when it completes)
* get formats the data for us
* Pipe() is an operator that maps
* takes the data posted maps it into the new array with specified content with map() method
*/
  public getPosts() {
    this.http
    .get<{message: string, posts: any}>(
      'https://liftrentaltools.com:444/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            fbImagePath: post.fbImagePath,
            fbName: post.fbName
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  /** Returns an object (obserable) that we can listen to */
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  /**
   * pull out all the objects in the arrray, then fetch it into the post service
   * @param id for rout
   * gets the observable
   */
  getPost(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string}>(
      'https://liftrentaltools.com:444/api/posts');
  }
  /** Async posts if succesful from server side by addingt it
   * in subscribe method
   * added ID for posts
   * the id gets fetched from response data (app.js)
   * */
  addPost(title: string, content: string, image: File, fbImagePath: string, fbName: string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    postData.append('fbImagePath', fbImagePath);
    postData.append('fbName', fbName);
    this.http
      .post<{message: string, post: Post}>(
        'https://liftrentaltools.com:444/api/posts',
        postData
      )
      .subscribe((responseData) => {
        const post: Post = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: responseData.post.imagePath,
          fbImagePath: responseData.post.fbImagePath,
          fbName: responseData.post.fbName
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  /**
   * service to updat the post
   * EDIT BUTTON DOES NOT WORK YET... EDITS TO BE MADE

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content, imagePath: null, fbImagePath: null, fbName: null };
    this.http.put('https://liftrentaltools.com:445/api/posts' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
 }
   */
  /**
   * sends request with post ID to delete whichever post chosen
   * makes a copy of the posts list after deleting post with correct id
   * to DO! authroization
  */
  deletePost(postId: string) {
    this.http.delete('https://liftrentaltools.com:444/api/posts' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
