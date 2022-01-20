import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/subreddit/create-post/create-post.component';
import { CreateSubredditComponent } from './components/subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './components/subreddit/list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './components/subreddit/view-post/view-post.component';
 import { UserProfileComponent } from './components/auth/user-profile/user-profile.component';
 import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path:'',component:HomeComponent,
  },
  {
    path:'signup',component:SignupComponent,
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'create-subreddit',component:CreateSubredditComponent,canActivate:[AuthGuard]
  },
  {
    path:'create-post',component:CreatePostComponent,canActivate:[AuthGuard]
  },
  {
    path:'view-post/:id',component:ViewPostComponent
  },
  {
    path:'login',component:CreatePostComponent
  },
  {
    path:'list-subreddits',component:ListSubredditsComponent
  },
  {
    path:'user-profile/:name',component:UserProfileComponent,canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
