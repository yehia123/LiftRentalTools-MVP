import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { CreatePostComponent } from './posts/create/create-post.component';
/** Empty means slash nothing
 * www.lift.com/
 */
const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'edit/:postId', component: CreatePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
