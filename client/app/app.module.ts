/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 11:18
 */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CitiesComponent } from "./components/cities.component";
import {
	CollapseDirective, AlertComponent, ComponentsHelper, ModalModule
} from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule } from "./app.routing.module";
import { NewGameComponent } from "./components/newgame.component";
import { RulesComponent } from "./components/rules.component";
import { GameCityComponent } from "./components/game-city.component";
import { CitiesService } from "./services/cities.service";
import { AddCityComponent } from "./components/addcity.component";
import { FormsModule } from "@angular/forms";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
	imports: [ BrowserModule, HttpModule, AppRoutingModule, ModalModule, FormsModule ],
	declarations: [
		AppComponent,
		CitiesComponent,
		NewGameComponent,
		RulesComponent,
		GameCityComponent,
		AddCityComponent,

		CollapseDirective,
		AlertComponent,
		FileSelectDirective,
		FileDropDirective

	],
	providers: [ CitiesService, ComponentsHelper ],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}