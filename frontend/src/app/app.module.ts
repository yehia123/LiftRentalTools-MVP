import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {
  SocialLoginModule,
  AuthServiceConfig
} from 'angularx-social-login';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { ToolBarComponent } from './signin/toolbar/toolbar.component';
import { CreateTextComponent } from './posts/text/create-text-post.component';
import { CreatePostComponent } from './posts/create/create-post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { AppRoutingModule } from './app-routing.module';



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebook);


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('136274820776-d0vnpmb4l92sbarbm36k7d549pttkuu7.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1701896999876359')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    CreateTextComponent,
    CreatePostComponent,
    PostListComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    SocialLoginModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
