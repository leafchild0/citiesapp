/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:08
 */

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CitiesService } from "../../services/cities.service";
import { City } from "../../data/city.model";
import { ModalDirective } from "ng2-bootstrap";
import { MultiplayerService } from "../../services/multiplayer.service";
import { ToastsManager } from "ng2-toastr";

@Component({
	moduleId: module.id,
	selector: 'city',
	templateUrl: 'game-city.component.html'
})

export class GameCityComponent implements OnInit, OnDestroy {

	city: City;
	tries: number;
	solved: boolean;
	userConn: any;
	gamesConn: any;
	users = [];
	currentuser: string;
	displayPhoto: string;
	hints: number;
	winner: string;

	@ViewChild('smModal')
	public bsModal: ModalDirective;

	public alerts: Array<Object> = [
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

	constructor(private route: ActivatedRoute,
	            private citiesService: CitiesService,
	            private multiplayerService: MultiplayerService,
				private toastr: ToastsManager) {
	}

	ngOnInit() {
		this.tries = 3;
		this.hints = 0;
		this.solved = false;

		this.route.params.forEach((params: Params) => {
			this.citiesService.getCity(params[ 'id' ])
				.subscribe(city => {
					this.city = city;
					this.constructPhotosPath();
					this.displayPhoto = city.photos[ 0 ];
				});
			this.currentuser = params[ 'username' ];
		});

		this.userConn = this.multiplayerService.userInGame().subscribe(data => {
			this.users.push(data);
			this.toastr.info('Новая фигура в игре - ' + data, 'У нас новый игрок!');
		});

		this.gamesConn = this.multiplayerService.gameResults().subscribe(data => {
			if (data.result) {
				this.winner = data.user;
				if(this.winner != this.currentuser)
					this.toastr.warning('Игрок ' + this.winner + ' выиграл', 'Игра окончена');
				this.showChildModal();
			}
			else {
				this.toastr.warning('Игрок ' + data.user + ' выбывает из игры', 'Обновление игроков');
			}

		});
	}

	ngOnDestroy() {
		this.userConn.unsubscribe();
		this.gamesConn.unsubscribe();
	}

	private constructPhotosPath() {
		this.city.photos.forEach((photo, index) => this.city.photos[ index ] = this.city.path + '/' + photo);
	}

	guestCity(e, guess: HTMLInputElement): void {
		e.preventDefault();
		let self = this;
		//Remove all punc from user guess and city name
		if (this.removePunct(guess.value) ===
			this.removePunct(this.city.name)) {
			self.solved = true;
			this.toastr.success('Вы выиграли', 'Игра окончена');
			this.multiplayerService.gameCompleted({ user: this.currentuser, result: true });
		} else {
			this.toastr.error('Спробуйте ще. Осталось ' + (this.tries - 1), 'Неправильно');
		}

		guess.value = '';
		this.tries -= 1;

		if (this.tries <= 0) {
			this.multiplayerService.gameCompleted({ user: this.currentuser, result: false });
			this.toastr.error('Вы проиграли. Но всегда можно попробовать снова', 'Игра окончена');
			this.showChildModal();
		}
	}

	private removePunct(value: string): string {
		value = value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
			.replace(/\s{2,}/g," ");
		return value;
	}

	public showChildModal(): void {
		this.bsModal.show();
	}

	public hideChildModal(): void {
		this.bsModal.hide();
	}

	public showNextPhoto() {
		this.hints += 1;
		let index = this.city.photos.length > this.hints
			? this.hints : this.hints % this.city.photos.length;
		this.displayPhoto = this.city.photos[ index ];
	}
}