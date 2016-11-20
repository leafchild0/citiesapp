/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:04
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewGameComponent } from "./components/newgame/newgame.component";
import { GameCityComponent } from "./components/game/game-city.component";
import { RulesComponent } from "./components/rules/rules.component";
import { CitiesComponent } from "./components/cities/cities.component";
import { AddCityComponent } from "./components/addcity/addcity.component";
import { ConnectGamesComponent } from "./components/connect/games-connect.component";

const routes: Routes = [
	{ path: '', redirectTo: '/cities', pathMatch: 'full' },
	{ path: 'cities', component: CitiesComponent },
	{ path: 'newgame', component: NewGameComponent },
	{ path: 'connect', component: ConnectGamesComponent },
	{ path: 'rules', component: RulesComponent },
	{ path: 'city/:id', component: GameCityComponent },
	{ path: 'addcity', component: AddCityComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}