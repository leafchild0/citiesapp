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

@Component({
	moduleId: module.id,
	selector: 'connect',
	templateUrl: 'games-connect.component.html'
})

export class ConnectGamesComponent implements OnInit, OnDestroy {
	games = [];
	connection;
	username: string = 'Гость';

	constructor(private router: Router,
	            private citiesService: CitiesService,
	            private multiplayerService: MultiplayerService) {}

	ngOnInit() {

		//Get data from server
		this.citiesService.getGames()
			.subscribe(games => {
				this.games = games;
				this.games.forEach((game) => {
					this.constructPhotoPath(game.city);
				});
			});

		//Listen for new games
		this.connection = this.multiplayerService.gamesAvailable().subscribe(data => {
			this.constructPhotoPath(data.city);
			this.games.push(data);
		});
	}

	private constructPhotoPath(data) {
		data.photos.forEach((photo, index) => data.photos[ index ] = data.path + '/' + photo);
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

	connectToGame(gameId) {
		let self = this;
		let params = { username: this.username };
		this.multiplayerService.connectToGame({ game_id: gameId, user: this.username }, function () {
			self.router.navigate([ '/city', gameId, params ]);
		});

	}

	previewImage(image) {

	}

}