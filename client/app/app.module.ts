/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 11:18
 */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CitiesComponent } from "./components/cities/cities.component";
import {
	CollapseDirective, AlertComponent, ComponentsHelper, ModalModule
} from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule } from "./app.routing.module";
import { NewGameComponent } from "./components/newgame/newgame.component";
import { RulesComponent } from "./components/rules/rules.component";
import { GameCityComponent } from "./components/game/game-city.component";
import { CitiesService } from "./services/cities.service";
import { AddCityComponent } from "./components/addcity/addcity.component";
import { FormsModule } from "@angular/forms";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { MultiplayerService } from "./services/multiplayer.service";
import { ConnectGamesComponent } from "./components/connect/games-connect.component";
import { ToastModule } from "ng2-toastr";

let toastrOptions: any = {
	animate: 'fade',
	toastLife: 5000,
	showCloseButton: true
};

@NgModule({
	imports: [ BrowserModule, HttpModule, AppRoutingModule, ModalModule, FormsModule, ToastModule.forRoot(toastrOptions) ],
	declarations: [
		AppComponent,
		CitiesComponent,
		NewGameComponent,
		RulesComponent,
		GameCityComponent,
		AddCityComponent,
		ConnectGamesComponent,

		CollapseDirective,
		AlertComponent,
		FileSelectDirective,
		FileDropDirective

	],
	providers: [ CitiesService, MultiplayerService, ComponentsHelper ],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}