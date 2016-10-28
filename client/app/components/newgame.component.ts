/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 14:10
 */

import { Component, OnInit } from '@angular/core';
import { City } from "../data/city.model";
import { CitiesService } from "../services/cities.service";
import { Router } from "@angular/router";

@Component({
	moduleId: module.id,
	selector: 'newgame',
	templateUrl: 'newgame.component.html'
})

export class NewGameComponent implements OnInit {
	cities: City[] = [];
	
	constructor(private citiesService:CitiesService, private router:Router) {}
	
	ngOnInit() {
		this.citiesService.getCities()
			.subscribe(cities => {
				this.cities = cities;
			});
	}

	pickRandomCity(): void {
		let randomCity:City = this.getRandomCity();
		this.startTheGame(randomCity);
	}

	private getRandomCity(): City {
		let number = Math.floor(Math.random() * (this.cities.length));
		return this.cities[number];
	}
	
	
	pickCityManually(): void {
		//Get user choice from modal
		let userChoise:City = null;
		this.startTheGame(userChoise);
	}
	
	private startTheGame(city:City): void {
		if(city === null || city._id === null) return;
		let link = ['/city', city._id];
		this.router.navigate(link);	
	}

	
}