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
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('user-connected', data, callback);
	}

	leavingGame(data, callback) {
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('user-disconnected', data, callback);
	}

	newGame(game, callback) {
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('new-game', game, callback);
	}

	gameCompleted(result, callback) {
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('game-over', result, callback);
	}

	gamesAvailable() {
		return new Observable(observer => {
            if(!this.socket.connected) this.socket = io(this.url);
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
            if(!this.socket.connected) this.socket = io(this.url);
			this.socket.on('new-user', (username) => {
				observer.next(username);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

	userLeft() {
		return new Observable(observer => {
            if(!this.socket.connected) this.socket = io(this.url);
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
			this.socket.on('end-game', (data) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

}