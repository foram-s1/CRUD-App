import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule }  from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BdayListComponent } from './bday-list/bday-list.component';
import { BdayListService } from './bday-list.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bdays', component:BdayListComponent, canActivate:[AuthGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    BdayListComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BdayListService, AuthGuardService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
