import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BdayListComponent } from './bday-list/bday-list.component';


const routes: Routes = [
  {path:'', redirectTo: '/bdays', pathMatch: 'full'},
  {path:'bdays', component: BdayListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
