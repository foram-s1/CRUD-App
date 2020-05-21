import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }  from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BdayListComponent } from './bday-list/bday-list.component';
import { BdayListService } from './bday-list.service';

@NgModule({
  declarations: [
    AppComponent,
    BdayListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BdayListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
