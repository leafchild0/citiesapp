/**
 * Created by: leaf
 * Date: 16/11/16
 * Time: 12:30
 */

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class MultiplayerService {
	private url = 'http://192.168.1.104:3000';
	private socket = io(this.url);

	connectToGame(user, callback) {
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('user-connected', user, callback);
	}

	newGame(game, callback) {
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('new-game', game, callback);
	}

	gameCompleted(result) {
		if(!this.socket.connected) this.socket = io(this.url);
		this.socket.emit('game-over', result);
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

	userInGame() {
		return new Observable(observer => {
			this.socket.on('new-user', (username) => {
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