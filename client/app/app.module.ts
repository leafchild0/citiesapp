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
import { CollapseDirective, ModalDirective, AlertComponent, ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule } from "./app.routing.module";
import { NewGameComponent } from "./components/newgame.component";
import { RulesComponent } from "./components/rules.component";
import { GameCityComponent } from "./components/game-city.component";
import { CitiesService } from "./services/cities.service";

@NgModule({
	imports: [ BrowserModule, HttpModule, AppRoutingModule ],
	declarations: [
		AppComponent,
		CitiesComponent,
		NewGameComponent,
		RulesComponent,
		GameCityComponent,

		CollapseDirective,
		AlertComponent,
		ModalDirective
	],
	providers: [ CitiesService, ComponentsHelper ],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}