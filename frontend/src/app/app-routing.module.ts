import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddPlayerComponent} from "./add-player/add-player.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'add-player', component: AddPlayerComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
