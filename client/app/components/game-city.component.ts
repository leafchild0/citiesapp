/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:08
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CitiesService } from "../services/cities.service";
import { City } from "../data/city.model";
import { ModalDirective } from "ng2-bootstrap";

@Component({
	moduleId: module.id,
	selector: 'city',
	templateUrl: 'game-city.component.html'
})

export class GameCityComponent implements OnInit {

	city: City;
	tries: number;
	showSuccessAlert: boolean;
	showErrorAlert: boolean;
	solved: boolean;

	@ViewChild('childModal')
	public childModal:ModalDirective;

	public alerts:Array<Object> = [
		{
			type: 'danger',
			msg: 'Неправильный ответ. Спробуйте ще',
			closable: true
		},
		{
			type: 'success',
			msg: 'Ура!!! Правильный ответ! Абсолютно верно',
			closable: true
		}
	];

	constructor(private route: ActivatedRoute, private router:Router, private citiesService:CitiesService) {
	}

	ngOnInit() {
		this.tries = 3;
		this.city = {};
		this.showErrorAlert = false;
		this.showSuccessAlert = false;
		this.solved = false;

		this.route.params.forEach((params: Params) => {
			this.citiesService.getCity(params['id'])
				.subscribe(city => {
					this.city = city;
				});
		});
	}

	public closeAlert(i:number):void {
		if(i == 0) this.showErrorAlert = false;
		if(i == 1) this.showSuccessAlert = false;
	}


	guestCity(e, guess: HTMLInputElement): void {
		e.preventDefault();
		this.showErrorAlert = false;
		this.showSuccessAlert = false;
		//Remove all punc from user guess and city name
		if(this.removePunct(guess.value) ===
			this.removePunct(this.city.name)) {
			console.log('Hooray!! You right');
			this.showSuccessAlert = true;
			this.solved = true;
		} else {
			console.log('Try again');
			this.showErrorAlert = true;
		}

		if(this.solved || this.tries >= 0) {
			this.showChildModal();
		}
		guess.value = '';
		this.tries -= 1;
	}

	private removePunct(value:string): string {
		value = value.replace(/[^\w\s]|_/g, "")
			.replace(/\s+/g, " ");
		return value;
	}

	public showChildModal():void {
		this.childModal.show();
	}

	public hideChildModal():void {
		this.childModal.hide();
	}
}