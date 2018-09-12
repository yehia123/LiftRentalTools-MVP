import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';


/**
 * @title Basic menu
 */
@Component({
  selector: 'app-toolbar-button',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolBarComponent implements OnInit {

    public user: SocialUser;
    public loggedIn: boolean;



    constructor(private authService: AuthService, public dialog: MatDialog) { }

    /** Add event emitter to pass the fb user to create-list component
     * Pass the user variable to child component create-post
     */
    @Output() fbUser: EventEmitter<any> = new EventEmitter();


    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(MyDialogComponent, {
        width: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signInWithLinkedIn(): void {
      this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
      setTimeout(() => {
        this.authService.signOut();
        this.loggedIn = false;
      }, 3000);
    }

}

