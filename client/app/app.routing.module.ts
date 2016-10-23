/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:04
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewGameComponent } from "./components/newgame.component";
import { GameCityComponent } from "./components/game-city.component";
import { RulesComponent } from "./components/rules.component";
import { CitiesComponent } from "./components/cities.component";

const routes: Routes = [
	{ path: '', redirectTo: '/cities', pathMatch: 'full' },
	{ path: 'cities', component: CitiesComponent },
	{ path: 'newgame', component: NewGameComponent },
	{ path: 'rules', component: RulesComponent },
	{ path: 'city/:id', component: GameCityComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}