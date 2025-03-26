import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { ManageComponent } from './manage/manage.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path : "", component:HomeComponent},
    {path : "manage", component:ManageComponent},
    {path : "game/:id", component:GameComponent},
];



@NgModule({
    declarations:[
        HeaderComponent,
        HomeComponent,
        AlertComponent,
        ManageComponent,
        SpinnerComponent,
        GameComponent
    ],
    imports: [RouterModule.forRoot(routes),FormsModule,CommonModule],
    exports: [RouterModule],
    providers:[]

})
export class AppRoutingModule { }