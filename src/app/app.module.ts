import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { PostTitleComponent } from './components/shared/post-title/post-title.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { VoteButtonComponent } from './components/shared/vote-button/vote-button.component';
import { SubredditSideBarComponent } from './components/subreddit-side-bar/subreddit-side-bar.component';
import { CreateSubredditComponent } from './components/subreddit/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './components/subreddit/create-post/create-post.component';
import { ListSubredditsComponent } from './components/subreddit/list-subreddits/list-subreddits.component';
// import { EditorModule } from '@tinymce/tinymce-angular';
import {EditorModule} from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './components/subreddit/view-post/view-post.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/auth/user-profile/user-profile.component';

const routes:Routes=[

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTitleComponent,
    SideBarComponent,
    VoteButtonComponent,
    SubredditSideBarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    UserProfileComponent
  ],
  imports: [
BrowserModule,
NgxWebstorageModule.forRoot(),
ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes,{enableTracing:false}),
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
