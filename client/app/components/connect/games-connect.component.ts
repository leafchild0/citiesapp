/**
 * Created by: leaf
 * Date: 16/11/16
 * Time: 13:17
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from "../../data/city.model";
import { CitiesService } from "../../services/cities.service";
import { Router } from "@angular/router";
import { MultiplayerService } from "../../services/multiplayer.service";
import {Game} from "../../data/game.model";
import {Settings} from "../../settings";

@Component({
	moduleId: module.id,
	selector: 'connect',
	templateUrl: 'games-connect.component.html'
})

export class ConnectGamesComponent implements OnInit, OnDestroy {
	games: any[];
	connection: any;
	username: string;
	stubPhoto: string;

	constructor(private router: Router,
	            private citiesService: CitiesService,
	            private multiplayerService: MultiplayerService) {
		this.username = 'Гость ' + Date.now();
		this.stubPhoto = Settings.stub_photo;
		this.games = [];
	}

	ngOnInit() {
		//Get data from server
		this.citiesService.getGames()
			.subscribe(games => {
				games.forEach((game) => {
					this.addGame(game);
				});
			});

		//Listen for new games
		this.connection = this.multiplayerService.gamesAvailable().subscribe(data => {
			this.addGame(data);
		});
	}

	private addGame(game) {
		this.constructPhotoPath(game.city);
		this.games.push(game);
	}

	private constructPhotoPath(city) {
		city.photos.forEach((photo, index) => city.photos[ index ] = city.path + '/' + photo);
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

	connectToGame(gameId) {
		let self = this;
		let params = { username: this.username };
		this.multiplayerService.connectToGame({ game_id: gameId, user: this.username }, function () {
			self.router.navigate([ '/game', gameId, params ]);
		});

	}

}