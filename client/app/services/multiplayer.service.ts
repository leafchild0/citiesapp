/**
 * Created by: leaf
 * Date: 16/11/16
 * Time: 12:30
 */

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Settings} from "../settings";

export class MultiplayerService {
	private url: string;
	private socket: any;

	constructor() {
		this.url = Settings.api_url;
		this.socket = io(this.url);
	}

	connectToGame(data, callback) {
		this.socket.emit('user-new', data, callback);
	}

	leavingGame(data, callback) {
		this.socket.emit('user-left', data, callback);
	}

	newGame(game, callback) {
		this.socket.emit('game-new', game, callback);
	}

	gameCompleted(result, callback) {
		this.socket.emit('game-over', result, callback);
	}

	gamesAvailable() {
		return new Observable(observer => {
			this.socket.on('add-game', (game) => {
				observer.next(game);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

	userJoin() {
		return new Observable(observer => {
			this.socket.on('user-new', (username) => {
				observer.next(username);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

	userLeft() {
		return new Observable(observer => {
			this.socket.on('user-left', (username) => {
				observer.next(username);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

	gameResults() {
		return new Observable(observer => {
			this.socket.on('game-over', (data) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

}